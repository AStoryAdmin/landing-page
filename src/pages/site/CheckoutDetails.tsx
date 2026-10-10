/**
 * The few details we ask for before Stripe.
 *
 * Since the offers went live (2026-10-01) a signed-out visitor went straight
 * from "Reserve for $1" to Stripe, and nothing reached `waitlist_signups` —
 * the table that had held every lead until then. Stripe kept the payment and
 * the email; we kept nothing, and anybody who opened checkout and left was
 * gone without a trace.
 *
 * This asks for a name, an email and, optionally, a phone number, writes them
 * to `waitlist_signups` the same way the old waitlist form did (lib/leads.ts),
 * and then goes on to Stripe with the email already filled in. So:
 *
 *   - every checkout that is started leaves a row, paid or not;
 *   - the row and the Stripe payment share an email, which is how the two are
 *     matched — by hand in the Dashboard today, and by
 *     supabase/functions/landing-checkout-webhook once it is deployed;
 *   - `client_reference_id` is left exactly as founding.ts sets it, because
 *     the app's own Stripe webhook reads that field.
 *
 * Signed-in visitors never see this: their account already holds all of it,
 * and the place is written onto the account when they come back.
 *
 * Saving the lead must never cost the sale. The write gets a few seconds, and
 * if it fails or is slow the visitor goes on to Stripe all the same.
 */
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import styled from "styled-components";
import { splitName } from "../../lib/auth";
import { looksLikeEmail, looksLikePhone, submitLead } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { ArrowIcon } from "./kit/kit";
import { PrimaryButton } from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

export type CheckoutIntent = {
  /** "reserve" or "founding" — kept loose so this file does not own the offer list. */
  offer: string;
  /** "Reserve", "Founding Family" — shown in the heading. */
  name: string;
  /** "$1", "$29". */
  price: string;
  /** The Payment Link, exactly as the page would have opened it. */
  href: string;
  /** The founding week chosen, when there is one. */
  cohort?: number | null;
  /** "the week of 19 October", for the note on the row. */
  week?: string | null;
};

/** How long the lead write may hold up checkout before we go anyway. */
const SAVE_BUDGET_MS = 3500;

const Sheet = styled.dialog`
  width: min(520px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: ${color.paperPure};
  color: ${color.body};
  box-shadow:
    0 30px 80px -20px rgba(42, 31, 24, 0.55),
    0 2px 6px rgba(42, 31, 24, 0.12);
  overflow: auto;
  overscroll-behavior: contain;

  &::backdrop {
    background: color-mix(in srgb, ${color.night} 72%, transparent);
    backdrop-filter: blur(3px);
  }
  &[open] {
    animation: sheet-in 320ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[open]::backdrop {
    animation: veil-in 240ms ease-out;
  }
  @keyframes sheet-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
  }
  @keyframes veil-in {
    from {
      opacity: 0;
    }
  }

  /* The invitation card's double gold keyline, as on /sign-up and /start. */
  .card {
    position: relative;
    margin: 10px;
    padding: clamp(28px, 5vw, 44px) clamp(22px, 5vw, 44px) clamp(24px, 4vw, 36px);
    border: 1px solid color-mix(in srgb, ${color.gold} 70%, transparent);
    outline: 1px solid color-mix(in srgb, ${color.gold} 32%, transparent);
    outline-offset: 4px;
  }

  .close {
    position: absolute;
    top: 6px;
    right: 6px;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: ${color.bodyMuted};
    cursor: pointer;
    transition: color ${motion.base}, background ${motion.base};
  }
  @media (hover: hover) {
    .close:hover {
      color: ${color.primary};
      background: ${color.primaryWash};
    }
  }

  header {
    text-align: center;
  }
  .tag {
    font: 600 11px/1.4 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  h2 {
    margin-top: 10px;
    font: 400 ${display.sm} / 1.15 ${font.display};
    color: ${color.primary};
  }
  h2 em {
    font-style: italic;
    color: ${color.accentText};
  }
  header p {
    margin: 12px auto 0;
    max-width: 36ch;
    font: 400 16px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  .orn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 120px;
    margin: 18px auto 0;
  }
  .orn::before,
  .orn::after {
    content: "";
    flex: 1;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 70%, transparent);
  }
  .orn i {
    width: 6px;
    height: 6px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }

  form {
    display: grid;
    gap: 22px;
    margin-top: 26px;
  }
  /* Fields as underlines — the same as /start and /sign-up. */
  .field {
    display: grid;
    gap: 6px;
  }
  .field > span {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .field > span small {
    font: inherit;
    letter-spacing: 0.1em;
    color: ${color.faint};
  }
  .field input {
    width: 100%;
    min-height: 48px;
    padding: 6px 0 8px;
    border: 0;
    border-bottom: 1px solid ${color.primaryLineStrong};
    border-radius: 0;
    background: transparent;
    font: 400 22px/1.2 ${font.display};
    color: ${color.primary};
    transition: border-color ${motion.slow};
  }
  .field input:focus {
    outline: none;
    border-bottom: 2px solid ${color.gold};
  }
  .field[data-invalid="true"] input {
    border-bottom-color: ${color.error};
  }
  .hint {
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .error {
    padding: 12px 14px;
    border-left: 2px solid ${color.error};
    background: color-mix(in srgb, ${color.error} 7%, ${color.paperPure});
    font: 400 15px/1.5 ${font.body};
    color: ${color.error};
  }

  .go {
    width: 100%;
    justify-content: center;
    margin-top: 4px;
  }
  .fine {
    text-align: center;
    font: 400 13px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }

  ${media.sm} {
    h2 {
      font-size: 1.75rem;
    }
    .field input {
      font-size: 20px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    &[open],
    &[open]::backdrop {
      animation: none;
    }
  }
`;

/** The Payment Link with the email filled in, so nobody types it twice. */
const withEmail = (href: string, email: string) => {
  const url = new URL(href);
  url.searchParams.set("prefilled_email", email);
  return url.toString();
};

export default function CheckoutDetails({
  intent,
  onClose,
}: {
  intent: CheckoutIntent | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [invalid, setInvalid] = useState<"name" | "email" | "phone" | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /* An error belongs to the attempt that caused it; typing starts a new one. */
  const edit = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value);
    if (problem) setProblem(null);
    if (invalid) setInvalid(null);
  };

  /* Open and close the native dialog from the intent, so focus is trapped,
     Escape closes it and the page behind is inert, all by the browser. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (intent && !el.open) {
      setProblem(null);
      setInvalid(null);
      setBusy(false);
      el.showModal();
      /* showModal focuses the first control, which is the close button; the
         name field is where they start. */
      first.current?.focus();
    } else if (!intent && el.open) {
      el.close();
    }
  }, [intent]);

  /* A click on the veil, not the card, closes it. */
  const onBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && !busy) ref.current?.close();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!intent || busy) return;
    setProblem(null);
    if (!name.trim()) {
      setInvalid("name");
      return setProblem("Your name, please - it is how we will greet you.");
    }
    if (!looksLikeEmail(email)) {
      setInvalid("email");
      return setProblem("That email does not look quite right. It is where your receipt and your place go.");
    }
    if (phone.trim() && !looksLikePhone(phone)) {
      setInvalid("phone");
      return setProblem("That phone number looks short. Leave it blank if you would rather.");
    }
    setInvalid(null);
    setBusy(true);

    const { firstName, lastName } = splitName(name);
    const cleanEmail = email.trim().toLowerCase();
    const save = submitLead({
      firstName,
      lastName,
      email: cleanEmail,
      phone: phone.trim(),
      source: `${intent.offer}:checkout`,
      note: [
        `Started ${intent.name} checkout (${intent.price})`,
        intent.week ? `week of ${intent.week}` : null,
        intent.cohort ? `cohort ${intent.cohort}` : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }).catch(() => null);
    const res = await Promise.race([
      save,
      new Promise<null>((r) => setTimeout(() => r(null), SAVE_BUDGET_MS)),
    ]);

    track("checkout_details", {
      offer: intent.offer,
      saved: res ? String(res.ok) : "timeout",
      phone: phone.trim() ? "yes" : "no",
    });

    window.location.assign(withEmail(intent.href, cleanEmail));
  };

  const founding = intent?.offer === "founding";

  return (
    <Sheet
      ref={ref}
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-lead`}
      onClose={onClose}
      onCancel={(e) => busy && e.preventDefault()}
      onClick={onBackdrop}
    >
      {intent && (
        <div className="card">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => ref.current?.close()}
            disabled={busy}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <header>
            <p className="tag">
              {intent.name} · {intent.price}
              {intent.week ? ` · week of ${intent.week}` : ""}
            </p>
            <h2 id={`${uid}-title`}>
              First, <em>whose place is this?</em>
            </h2>
            <p id={`${uid}-lead`}>
              {founding
                ? "So we can set up your first call by hand. Then you pay through Stripe."
                : "So your place has a name on it. Then you pay through Stripe."}
            </p>
            <span className="orn" aria-hidden="true">
              <i />
            </span>
          </header>

          <form onSubmit={submit} noValidate>
            <label className="field" htmlFor={`${uid}-name`} data-invalid={invalid === "name"}>
              <span>Your name</span>
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={edit(setName)}
                aria-invalid={invalid === "name"}
                required
                ref={first}
              />
            </label>
            <label className="field" htmlFor={`${uid}-email`} data-invalid={invalid === "email"}>
              <span>Email</span>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={edit(setEmail)}
                aria-invalid={invalid === "email"}
                aria-describedby={`${uid}-email-hint`}
                required
              />
              <small className="hint" id={`${uid}-email-hint`}>
                Use this one at checkout and when you make your account - it is how your place finds you.
              </small>
            </label>
            <label className="field" htmlFor={`${uid}-phone`} data-invalid={invalid === "phone"}>
              <span>
                Phone <small>Optional</small>
              </span>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={edit(setPhone)}
                aria-invalid={invalid === "phone"}
              />
            </label>

            {problem && (
              <p className="error" role="alert">
                {problem}
              </p>
            )}

            <PrimaryButton type="submit" className="go" disabled={busy}>
              {busy ? "Opening Stripe…" : `Continue to pay ${intent.price}`} <ArrowIcon />
            </PrimaryButton>
            <p className="fine">
              Apple Pay, Google Pay or card, through Stripe.{" "}
              {founding ? "Refunded any time before the first call." : "Refunded any time before launch."}
            </p>
          </form>
        </div>
      )}
    </Sheet>
  );
}

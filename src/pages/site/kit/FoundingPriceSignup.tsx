/**
 * "Get the founding price" - what stands where a figure would while prices
 * are private (lib/pricing.ts, PRICES_PUBLIC). Added 2026-10-26.
 *
 * A name and an email, nothing else. It goes through the same function as
 * the contact form (lib/demoRequest.ts, sendMessage), so each request is a
 * row in waitlist_signups AND an email in Daniel's inbox he can answer
 * himself. If the function is unreachable the row is still written straight
 * from the browser (lib/leads.ts); if that fails too, a filled-in mailto.
 *
 * The rows to write to at launch, in the order people asked:
 *
 *   select first_name, email, note, created_at from waitlist_signups
 *   where source like '%:founding-price' order by created_at;
 */
import { useId, useState, type FormEvent } from "react";
import styled from "styled-components";
import { DEMO_EMAIL, sendMessage } from "../../../lib/demoRequest";
import { looksLikeEmail, submitLead } from "../../../lib/leads";
import { track } from "../../../lib/analytics";
import { ArrowIcon } from "./kit";
import { PrimaryButton, TextAnchor } from "./kit.styles";
import { Form } from "./form.styles";
import { color, display, font, media, type } from "../../../styles/theme";

const Box = styled.div`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr) auto;
    gap: 20px 24px;
    align-items: end;
  }
  &[data-compact="true"] .row {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }
  &[data-compact="true"] form {
    gap: 14px;
  }
  .done b {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .done p {
    margin-top: 8px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const splitName = (n: string) => {
  const [firstName = "", ...rest] = n.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
};

export default function FoundingPriceSignup({
  source,
  plan,
  compact = false,
  cta = "Send me the prices",
}: {
  /** The page it sits on, e.g. "pricing"; stored as `<source>:founding-price`. */
  source: string;
  /** The plan the visitor was looking at, if any, so Daniel knows. */
  plan?: string;
  /** One column, for a narrow card. */
  compact?: boolean;
  cta?: string;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [invalid, setInvalid] = useState<"name" | "email" | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  const tag = `${source}:founding-price`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setInvalid("name");
    if (!looksLikeEmail(email)) return setInvalid("email");
    setInvalid(null);
    setFallback(null);
    setBusy(true);
    const wants = plan ? `Looking at: ${plan}.` : "";
    const sent = await sendMessage({
      name,
      email,
      topic: "Founding price",
      message:
        `Please send me the founding prices before launch. ${wants}`.trim(),
      website,
      source: tag,
    });
    let ok = sent.ok;
    if (!ok && !website) {
      /* The function is down or unconfigured: keep the lead anyway. */
      const saved = await submitLead({
        ...splitName(name),
        email,
        phone: "",
        note: `Asked for the founding prices. ${wants}`.trim(),
        source: tag,
      });
      ok = saved.ok;
    }
    setBusy(false);
    if (ok) {
      setDone(true);
      track("founding_price_signup", { source, plan: plan ?? "none" });
      return;
    }
    if (!sent.ok) setFallback(sent.fallbackMailto);
    track("founding_price_failed", { source });
  };

  return (
    <Box data-compact={compact}>
      {done ? (
        <div className="done" role="status">
          <b>Thank you, {splitName(name).firstName}.</b>
          <p>
            The founding prices will reach <strong>{email.trim()}</strong>{" "}
            before launch, from Daniel. Nothing else, and no list you did not
            ask for.
          </p>
        </div>
      ) : (
        <Form onSubmit={submit} noValidate>
          <div className="row">
            <label
              className="field"
              htmlFor={`${uid}-name`}
              data-invalid={invalid === "name"}
            >
              <span>Your name</span>
              <input
                id={`${uid}-name`}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={invalid === "name"}
                required
              />
            </label>
            <label
              className="field"
              htmlFor={`${uid}-email`}
              data-invalid={invalid === "email"}
            >
              <span>Email</span>
              <input
                id={`${uid}-email`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={invalid === "email"}
                required
              />
            </label>
            <PrimaryButton type="submit" className="go" disabled={busy}>
              {busy ? "Sending…" : cta} <ArrowIcon />
            </PrimaryButton>
          </div>
          <label className="trap" aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
          {invalid && (
            <p className="error" role="alert">
              {invalid === "name"
                ? "Your name, please - it is how Daniel will greet you."
                : "That email does not look quite right."}
            </p>
          )}
          {fallback && (
            <p className="error" role="alert">
              That did not go through on our side.{" "}
              <TextAnchor href={fallback}>Email {DEMO_EMAIL}</TextAnchor>{" "}
              instead and we will send them.
            </p>
          )}
        </Form>
      )}
    </Box>
  );
}

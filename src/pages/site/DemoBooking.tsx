/**
 * The demo booking form on /organizations (#book). Added 2026-10-20.
 *
 * It replaced "Request a demonstration" on /start, which saved a name and a
 * phone number and emailed nobody (lib/demoRequest.ts). An institution
 * asking for a demo is the most valuable lead the site gets, and it was the
 * only one nobody was told about.
 *
 * "Book", honestly: there is no shared calendar behind it, so the visitor
 * picks the days and times of day that suit them and Daniel writes back
 * within a working day to confirm one. The days start two working days out,
 * so nobody picks a slot that has already gone by the time the email is read.
 *
 * Asks only what a first reply needs: who, where, how to answer them. The
 * rest is optional and says so.
 */
import { useId, useMemo, useState, type FormEvent } from "react";
import styled from "styled-components";
import { requestDemo, DEMO_EMAIL, INSTITUTION_KINDS } from "../../lib/demoRequest";
import { looksLikeEmail } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { ArrowIcon } from "./kit/kit";
import { PrimaryButton, TextAnchor } from "./kit/kit.styles";
import { color, font, media, motion } from "../../styles/theme";

const SIZES = ["Under 10", "10 - 50", "50 - 200", "200 or more", "Not sure yet"] as const;
const PARTS = ["Morning", "Midday", "Afternoon"] as const;

/** The next eight weekdays, starting two working days from today. */
const upcomingDays = (now = new Date()): string[] => {
  const out: string[] = [];
  const d = new Date(now);
  let skip = 2;
  while (out.length < 8) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd === 0 || wd === 6) continue;
    if (skip > 0) {
      skip -= 1;
      continue;
    }
    out.push(d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
  }
  return out;
};

const Form = styled.form`
  display: grid;
  gap: 26px;
  .two {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 26px 28px;
  }
  .field {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .field > span,
  legend {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 0;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .field > span small,
  legend small {
    font: inherit;
    letter-spacing: 0.1em;
    color: ${color.faint};
  }
  input,
  select,
  textarea {
    width: 100%;
    min-height: 48px;
    padding: 6px 0 8px;
    border: 0;
    border-bottom: 1px solid ${color.primaryLineStrong};
    border-radius: 0;
    background: transparent;
    font: 400 20px/1.3 ${font.display};
    color: ${color.primary};
    transition: border-color ${motion.slow};
  }
  select {
    appearance: none;
    cursor: pointer;
    background: linear-gradient(45deg, transparent 50%, ${color.bodyMuted} 50%) calc(100% - 12px) 55% / 6px 6px
        no-repeat,
      linear-gradient(-45deg, transparent 50%, ${color.bodyMuted} 50%) calc(100% - 6px) 55% / 6px 6px no-repeat;
    padding-right: 28px;
  }
  textarea {
    min-height: 96px;
    resize: vertical;
    line-height: 1.45;
  }
  input::placeholder,
  textarea::placeholder {
    color: ${color.faint};
    font-style: italic;
    opacity: 0.75;
  }
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-bottom: 2px solid ${color.gold};
  }
  .field[data-invalid="true"] input {
    border-bottom-color: ${color.error};
  }
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }
  legend {
    width: 100%;
    margin-bottom: 12px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    position: relative;
  }
  .chip input {
    position: absolute;
    inset: 0;
    opacity: 0;
    min-height: 0;
    cursor: pointer;
  }
  .chip span {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 999px;
    font: 500 15px/1 ${font.body};
    color: ${color.primary};
    transition:
      background ${motion.slow},
      border-color ${motion.slow};
  }
  .chip input:checked + span {
    background: ${color.primary};
    border-color: ${color.primary};
    color: ${color.ivory};
  }
  .chip input:focus-visible + span {
    outline: 3px solid ${color.gold};
    outline-offset: 2px;
  }
  .hint {
    margin-top: 10px;
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .trap {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .error {
    padding: 12px 14px;
    border-left: 2px solid ${color.error};
    background: color-mix(in srgb, ${color.error} 7%, ${color.paperPure});
    font: 400 15px/1.5 ${font.body};
    color: ${color.error};
  }
  .go {
    justify-self: start;
  }
  .fine {
    font: 400 14px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.sm} {
    .two {
      grid-template-columns: minmax(0, 1fr);
    }
    .go {
      justify-self: stretch;
      justify-content: center;
    }
  }
`;

const Done = styled.div`
  h3 {
    font: 400 clamp(1.6rem, 1.3rem + 1vw, 2.2rem) / 1.15 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 14px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 46ch;
  }
`;

export default function DemoBooking({ initialKind = "" }: { initialKind?: string }) {
  const uid = useId();
  const days = useMemo(() => upcomingDays(), []);
  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "";
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [kind, setKind] = useState(initialKind);
  const [size, setSize] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [parts, setParts] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");

  const [invalid, setInvalid] = useState<"name" | "email" | "organization" | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  /* "Tue, Oct 27 - morning or afternoon", one line per day, in the order shown. */
  const times = days
    .filter((d) => picked.includes(d))
    .map((d) => (parts.length ? `${d} - ${PARTS.filter((p) => parts.includes(p)).join(" or ").toLowerCase()}` : d));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setInvalid("name");
    if (!organization.trim()) return setInvalid("organization");
    if (!looksLikeEmail(email)) return setInvalid("email");
    setInvalid(null);
    setFallback(null);
    setBusy(true);
    const result = await requestDemo({
      name,
      email,
      phone,
      organization,
      role,
      kind,
      size,
      times,
      timezone,
      note,
      website,
      source: "organizations:demo",
    });
    setBusy(false);
    if (result.ok) {
      setDone(true);
      track("demo_requested", { kind: kind || "unspecified", size: size || "unspecified" });
      return;
    }
    setFallback(result.fallbackMailto);
    track("demo_failed");
  };

  if (done) {
    return (
      <Done role="status">
        <h3>Thank you. It is with Daniel now.</h3>
        <p>
          Daniel, our co-founder, will write to <strong>{email.trim()}</strong> within a working day to confirm a
          time{times.length ? " from the ones you picked" : ""}. If it is sooner than that, write to{" "}
          <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>.
        </p>
      </Done>
    );
  }

  return (
    <Form onSubmit={submit} noValidate aria-describedby={`${uid}-fine`}>
      <div className="two">
        <label className="field" htmlFor={`${uid}-name`} data-invalid={invalid === "name"}>
          <span>Your name</span>
          <input id={`${uid}-name`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field" htmlFor={`${uid}-role`}>
          <span>
            Your role <small>optional</small>
          </span>
          <input
            id={`${uid}-role`}
            autoComplete="organization-title"
            placeholder="Alumni director"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <label className="field" htmlFor={`${uid}-org`} data-invalid={invalid === "organization"}>
          <span>Institution</span>
          <input
            id={`${uid}-org`}
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>
        <label className="field" htmlFor={`${uid}-kind`}>
          <span>
            What kind <small>optional</small>
          </span>
          <select id={`${uid}-kind`} value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">Choose one</option>
            {INSTITUTION_KINDS.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="field" htmlFor={`${uid}-email`} data-invalid={invalid === "email"}>
          <span>Work email</span>
          <input
            id={`${uid}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field" htmlFor={`${uid}-phone`}>
          <span>
            Phone <small>optional</small>
          </span>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>

      <fieldset>
        <legend>
          How many people would take part <small>optional</small>
        </legend>
        <div className="chips">
          {SIZES.map((s) => (
            <label className="chip" key={s}>
              <input type="radio" name={`${uid}-size`} checked={size === s} onChange={() => setSize(s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Days that suit you <small>pick any</small>
        </legend>
        <div className="chips">
          {days.map((d) => (
            <label className="chip" key={d}>
              <input type="checkbox" checked={picked.includes(d)} onChange={() => toggle(picked, setPicked, d)} />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Time of day <small>pick any</small>
        </legend>
        <div className="chips">
          {PARTS.map((p) => (
            <label className="chip" key={p}>
              <input type="checkbox" checked={parts.includes(p)} onChange={() => toggle(parts, setParts, p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
        <p className="hint">
          Thirty minutes on a video call{timezone ? `, in your time (${timezone.replace(/_/g, " ")})` : ""}. We
          confirm one of these by email.
        </p>
      </fieldset>

      <label className="field" htmlFor={`${uid}-note`}>
        <span>
          Whose stories, and why now <small>optional</small>
        </span>
        <textarea
          id={`${uid}-note`}
          placeholder="Our 50th reunion class, before the anniversary next spring."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <label className="trap" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>

      {invalid && (
        <p className="error" role="alert">
          {invalid === "name"
            ? "Please add your name."
            : invalid === "organization"
              ? "Please add your institution."
              : "That email does not look quite right."}
        </p>
      )}
      {fallback && (
        <p className="error" role="alert">
          That did not go through on our side. <TextAnchor href={fallback}>Send it by email instead</TextAnchor> -
          everything you wrote is already in it.
        </p>
      )}

      <PrimaryButton className="go" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Book a demo"} <ArrowIcon />
      </PrimaryButton>
      <p className="fine" id={`${uid}-fine`}>
        No payment, and no mailing list. We use these details only to arrange the demo.
      </p>
    </Form>
  );
}

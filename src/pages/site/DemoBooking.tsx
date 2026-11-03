/**
 * The demo booking form on /organizations and /care-communities (#book,
 * kit/DemoSection.tsx). Added 2026-10-20.
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
 *
 * Round 3 (Builder 3, panel: Denise): a page may pass its own `kinds` (the
 * care page offers care settings, not colleges), `orgLabel` ("Community"
 * instead of "Institution"), `sizeLegend`, and `compact`, which sets the
 * same fields as one step with no numbered legends. The field names and
 * the payload are unchanged (npm run test:contracts); `kind` was always a
 * free string on the server (supabase/functions/demo-request, clip 80).
 */
import { useId, useMemo, useState, type FormEvent } from "react";
import {
  requestDemo,
  DEMO_EMAIL,
  INSTITUTION_KINDS,
} from "../../lib/demoRequest";
import { looksLikeEmail } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { ArrowIcon } from "./kit/kit";
import { PrimaryButton, TextAnchor } from "./kit/kit.styles";
import { Done, Form } from "./kit/form.styles";
import styled from "styled-components";
import { color, display, font, space } from "../../styles/theme";

const SIZES = [
  "Under 10",
  "10 - 50",
  "50 - 200",
  "200 or more",
  "Not sure yet",
] as const;
const PARTS = ["Morning", "Midday", "Afternoon"] as const;

/* Two steps on one page (2026-11-02, design-spec §4C): who you are, then
   the demo itself. Plain fieldsets with a legend each, no wizard; the
   fields, names and payload are unchanged (npm run test:contracts). */
const Steps = styled(Form)`
  gap: ${space.xl};
  fieldset.step {
    display: grid;
    gap: ${space.lg};
  }
  /* A legend and its "optional" are a flex row in the kit; at 320 with
     large text the care legend ("How many residents might take part")
     fills the row and the small spilt past the edge (round-3 tester,
     scrollWidth 346 of 320). It may wrap onto its own line instead. */
  legend,
  .field > span {
    flex-wrap: wrap;
    row-gap: 2px;
  }
  legend.step-legend {
    margin-bottom: ${space.md};
    padding-bottom: ${space.xs};
    border-bottom: 1px solid ${color.primaryLine};
    font: 400 ${display.sm} / 1.2 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.primary};
  }
  /* A wide screen reads the two steps at a glance; tighter rows keep the
     card near one screen (spec §4C page lengths). */
  @media (min-width: 1025px) {
    gap: ${space.lg};
    fieldset.step {
      gap: ${space.md};
    }
    .two {
      row-gap: ${space.md};
    }
    legend.step-legend {
      margin-bottom: ${space.xs};
    }
  }
  @media (max-width: 860px) {
    gap: ${space.lg};
    fieldset.step {
      gap: ${space.md};
    }
    legend.step-legend {
      margin-bottom: ${space.sm};
    }
  }
  /* One step: the same fields, the step legends read by assistive
     technology only (a legend ignores the global .sr-only clip and spilt
     past the viewport at 390, so it is hidden here, in place). */
  &[data-compact] {
    gap: ${space.lg};
    fieldset.step {
      gap: ${space.md};
    }
    legend.step-legend {
      position: absolute;
      left: 0;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
`;

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
    out.push(
      d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    );
  }
  return out;
};

export default function DemoBooking({
  initialKind = "",
  source = "organizations:demo",
  rolePlaceholder = "Alumni director",
  notePlaceholder = "Our 50th reunion class, before the anniversary next spring.",
  kinds = INSTITUTION_KINDS,
  orgLabel = "Institution",
  sizeLegend = "How many people would take part",
  compact = false,
}: {
  initialKind?: string;
  /** Where the request came from, stored with the row ("care:demo"). */
  source?: string;
  rolePlaceholder?: string;
  notePlaceholder?: string;
  /** The "What kind" options; a page may pass its own. */
  kinds?: readonly string[];
  /** The label of the organization field ("Community" on /care-communities). */
  orgLabel?: string;
  sizeLegend?: string;
  /** One step: the same fields with no numbered legends. */
  compact?: boolean;
}) {
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
  /* A "Who we work with" tile on /organizations picks the kind after the
     form has mounted (adjusting state while rendering, not in an effect). */
  const [seenKind, setSeenKind] = useState(initialKind);
  if (initialKind !== seenKind) {
    setSeenKind(initialKind);
    if (initialKind) setKind(initialKind);
  }
  const [size, setSize] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [parts, setParts] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");

  const [invalid, setInvalid] = useState<
    "name" | "email" | "organization" | null
  >(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  /* "Tue, Oct 27 - morning or afternoon", one line per day, in the order shown. */
  const times = days
    .filter((d) => picked.includes(d))
    .map((d) =>
      parts.length
        ? `${d} - ${PARTS.filter((p) => parts.includes(p))
            .join(" or ")
            .toLowerCase()}`
        : d,
    );

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
      source,
    });
    setBusy(false);
    if (result.ok) {
      setDone(true);
      track("demo_requested", {
        kind: kind || "unspecified",
        size: size || "unspecified",
      });
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
          Daniel, our co-founder, will write to <strong>{email.trim()}</strong>{" "}
          within a working day to confirm a time
          {times.length ? " from the ones you picked" : ""}. If it is sooner
          than that, write to <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>.
        </p>
      </Done>
    );
  }

  return (
    <Steps
      onSubmit={submit}
      noValidate
      aria-describedby={`${uid}-fine`}
      data-compact={compact || undefined}
    >
      <fieldset className="step">
        <legend className="step-legend">
          {compact ? "About you" : "1. About you"}
        </legend>
        <div className="two">
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
            />
          </label>
          <label className="field" htmlFor={`${uid}-role`}>
            <span>
              Your role <small>optional</small>
            </span>
            <input
              id={`${uid}-role`}
              autoComplete="organization-title"
              placeholder={rolePlaceholder}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <label
            className="field"
            htmlFor={`${uid}-org`}
            data-invalid={invalid === "organization"}
          >
            <span>{orgLabel}</span>
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
            <select
              id={`${uid}-kind`}
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              <option value="">Choose one</option>
              {kinds.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <label
            className="field"
            htmlFor={`${uid}-email`}
            data-invalid={invalid === "email"}
          >
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
      </fieldset>

      <fieldset className="step">
        <legend className="step-legend">
          {compact ? "The demo" : "2. The demo"}
        </legend>
        <fieldset>
          <legend>
            {sizeLegend} <small>optional</small>
          </legend>
          <div className="chips">
            {SIZES.map((s) => (
              <label className="chip" key={s}>
                <input
                  type="radio"
                  name={`${uid}-size`}
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
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
                <input
                  type="checkbox"
                  checked={picked.includes(d)}
                  onChange={() => toggle(picked, setPicked, d)}
                />
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
                <input
                  type="checkbox"
                  checked={parts.includes(p)}
                  onChange={() => toggle(parts, setParts, p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
          <p className="hint">
            Thirty minutes on a video call
            {timezone ? `, in your time (${timezone.replace(/_/g, " ")})` : ""}.
            We confirm one of these by email.
          </p>
        </fieldset>

        <label className="field" htmlFor={`${uid}-note`}>
          <span>
            Whose stories, and why now <small>optional</small>
          </span>
          <textarea
            id={`${uid}-note`}
            placeholder={notePlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </fieldset>

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
            ? "Please add your name."
            : invalid === "organization"
              ? `Please add your ${orgLabel.toLowerCase()}.`
              : "That email does not look quite right."}
        </p>
      )}
      {fallback && (
        <p className="error" role="alert">
          That did not go through on our side.{" "}
          <TextAnchor href={fallback}>Send it by email instead</TextAnchor> -
          everything you wrote is already in it.
        </p>
      )}

      <PrimaryButton
        className="go"
        type="submit"
        disabled={busy}
        aria-busy={busy || undefined}
      >
        {busy ? "Sending…" : "Book a demo"} <ArrowIcon />
      </PrimaryButton>
      <p className="fine" id={`${uid}-fine`}>
        No payment, and no mailing list. We use these details only to arrange
        the demo.
      </p>
    </Steps>
  );
}

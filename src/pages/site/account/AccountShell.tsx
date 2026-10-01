/**
 * The frame every account page stands in — /sign-up, /sign-in, /account.
 *
 * It is /start's composition (Pass 11h), because signing up is the same act
 * as joining used to be: a dark photograph on the left with the title and
 * what happens next on a gold thread; on the right, the form as an
 * invitation card with the double gold keyline, fields set as underlines,
 * and the site's pill button with its gold coin. Somebody who has seen
 * /start should not be able to tell these were built later.
 *
 * The fields are plain inputs rather than LeadForm, which is a two-box lead
 * form with its own submission; a password and an emailed code are not
 * leads. They are styled here, once, so the three pages cannot drift.
 */
import { useState, type ReactNode } from "react";
import styled from "styled-components";
import { CODE_LEN } from "../../../lib/auth";
import { Picture } from "../kit/kit";
import { useReveals } from "../kit/reveals";
import { Eyebrow } from "../kit/kit.styles";
import { color, display, font, media, motion } from "../../../styles/theme";

const Page = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: calc(100vh - 76px);
  background: ${color.ivory};

  /* ── Left: the photograph, the title, what happens next ── */
  .story {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 48px;
    padding: clamp(56px, 7vw, 110px) clamp(28px, 5vw, 88px);
    color: ${color.ivory};
    --label: ${color.gold};
  }
  .story .bg {
    position: absolute;
    inset: 0;
    z-index: -2;
  }
  .story .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .story::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, ${color.night} 72%, transparent),
      color-mix(in srgb, ${color.night} 92%, transparent) 60%
    );
  }
  h1 {
    margin-top: 18px;
    font: 400 ${display.xl} / 1 ${font.display};
    letter-spacing: -0.03em;
    color: ${color.ivory};
  }
  h1 em {
    font-style: italic;
    color: ${color.gold};
  }
  .lead {
    margin-top: 24px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: ${color.onDarkMuted};
    max-width: 40ch;
  }
  .next {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 460px;
  }
  .next::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 16px;
    bottom: 16px;
    width: 1px;
    background: color-mix(in srgb, ${color.gold} 55%, transparent);
  }
  .next li {
    position: relative;
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 18px;
    align-items: start;
    padding: 12px 0;
    font: 400 17px/1.5 ${font.body};
    color: ${color.ivory};
  }
  .next li b {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${color.night};
    box-shadow: inset 0 0 0 1px ${color.gold};
    font: italic 400 15px/1 ${font.display};
    color: ${color.gold};
  }
  .motto {
    padding-top: 22px;
    border-top: 1px solid ${color.nightLine};
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.ivory};
  }
  .motto i {
    color: ${color.gold};
  }

  /* ── Right: the invitation card ── */
  .desk {
    display: grid;
    place-items: center;
    padding: clamp(48px, 6vw, 96px) clamp(20px, 5vw, 88px);
    background:
      radial-gradient(
        ellipse 70% 60% at 50% 45%,
        ${color.paperPure},
        transparent 75%
      ),
      ${color.ivory};
  }
  .card {
    position: relative;
    width: min(100%, 520px);
    padding: clamp(36px, 4.5vw, 60px) clamp(28px, 4vw, 56px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 2px rgba(42, 31, 24, 0.06),
      0 50px 90px -60px rgba(42, 31, 24, 0.6);
  }
  .card::before,
  .card::after {
    content: "";
    position: absolute;
    pointer-events: none;
    border: 1px solid color-mix(in srgb, ${color.gold} 70%, transparent);
  }
  .card::before {
    inset: 10px;
  }
  .card::after {
    inset: 14px;
    border-color: color-mix(in srgb, ${color.gold} 35%, transparent);
  }
  .card > * {
    position: relative;
  }
  .card-head {
    text-align: center;
    margin-bottom: 30px;
  }
  .card-head small {
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .card-head h2 {
    margin-top: 12px;
    font: 400 ${display.md} / 1.15 ${font.display};
    color: ${color.primary};
  }
  .card-head p {
    margin-top: 12px;
    font: 400 16px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  .card-head .orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 120px;
    margin: 16px auto 0;
  }
  .card-head .orn::before,
  .card-head .orn::after {
    content: "";
    flex: 1;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 70%, transparent);
  }
  .card-head .orn i {
    width: 6px;
    height: 6px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }

  /* Fields as underlines, the same as /start's. */
  form {
    display: grid;
    gap: 22px;
  }
  .field {
    display: grid;
    gap: 6px;
  }
  .field > span {
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
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
  .field .with-toggle {
    position: relative;
  }
  .field .with-toggle input {
    padding-right: 72px;
  }
  .field .with-toggle button {
    position: absolute;
    right: 0;
    bottom: 8px;
    min-height: 36px;
    padding: 0 10px;
    border: 0;
    background: transparent;
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
    cursor: pointer;
  }
  .field .code {
    font: 400 30px/1.2 ${font.display};
    letter-spacing: 0.5em;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .hint {
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .check {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    font: 400 16px/1.4 ${font.body};
    color: ${color.body};
    cursor: pointer;
  }
  .check input {
    width: 18px;
    height: 18px;
    accent-color: ${color.primary};
  }
  .error {
    padding: 12px 14px;
    border-left: 2px solid ${color.error};
    background: color-mix(in srgb, ${color.error} 7%, ${color.paperPure});
    font: 400 15px/1.5 ${font.body};
    color: ${color.error};
  }
  .error a {
    color: inherit;
  }

  /* The site's pill with its gold coin, full width inside the card. */
  .card form > button[type="submit"],
  .card .go {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 58px;
    margin-top: 6px;
    padding: 0 8px 0 28px;
    border: 0;
    border-radius: 999px;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 13px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 16px 30px -18px
      color-mix(in srgb, ${color.primary} 80%, transparent);
    transition: background ${motion.slow};
  }
  /* The coin, with the site's own arrow drawn into it — /start's (Pass 13d),
     which replaced a Unicode "→" that every platform draws differently. */
  .card form > button[type="submit"]::after,
  .card .go::after {
    content: "";
    display: block;
    width: 42px;
    height: 42px;
    flex: none;
    border-radius: 50%;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M3 10h13m-5-5 5 5-5 5' stroke='${encodeURIComponent(
          color.primary,
        )}' stroke-width='1.6'/%3E%3C/svg%3E")
        center / 20px 20px no-repeat,
      ${color.gold};
    transition: transform ${motion.reveal};
  }
  .card form > button[type="submit"]:hover,
  .card .go:hover {
    background: ${color.night};
  }
  .card form > button[type="submit"]:hover::after,
  .card .go:hover::after {
    transform: rotate(-45deg);
  }
  .card form > button[type="submit"]:disabled {
    opacity: 0.6;
    cursor: default;
  }
  .card form > button[type="submit"]:focus-visible,
  .card .go:focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 4px;
  }

  .quiet {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 16px;
  }
  .quiet button,
  .quiet a {
    padding: 4px 0;
    border: 0;
    background: none;
    font: 600 14px/1.4 ${font.body};
    color: ${color.primaryMid};
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
  }
  .quiet button:disabled {
    color: ${color.bodyMuted};
    text-decoration: none;
    cursor: default;
  }
  .legal,
  .switch {
    text-align: center;
    font: 500 14px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  .legal a,
  .switch a {
    color: ${color.primary};
    text-underline-offset: 4px;
  }
  .switch {
    margin-top: 24px;
  }
  .reassure {
    text-align: center;
    font: italic 400 16px/1.5 ${font.display};
    color: ${color.primaryMid};
  }

  /* The account page's own details. */
  dl.details {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px 24px;
    margin: 0;
    padding: 20px 0;
    border-block: 1px solid ${color.primaryLine};
  }
  dl.details dt {
    font: 600 11px/1.9 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  dl.details dd {
    margin: 0;
    font: 400 18px/1.5 ${font.display};
    color: ${color.primary};
    overflow-wrap: anywhere;
  }

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }
`;

/**
 * `steps` go on the gold thread under the title; `motto` closes the column.
 * The card's own head is `label` (small capitals) and `heading` (serif).
 */
export default function AccountShell({
  labelledBy,
  photo,
  eyebrow,
  title,
  lead,
  steps,
  label,
  heading,
  intro,
  children,
  after,
}: {
  labelledBy: string;
  /** A mission-library photograph id — see src/lib/mission.ts. */
  photo: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  steps?: ReactNode[];
  label: string;
  heading: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** Under the card, on the ivory: "Already have an account?" and the like. */
  after?: ReactNode;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Page ref={ref} aria-labelledby={labelledBy}>
      <div className="story">
        <div className="bg" aria-hidden="true">
          <Picture id={photo} alt="" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        </div>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id={labelledBy} data-lines>
            {title}
          </h1>
          {lead && (
            <p className="lead" data-rise>
              {lead}
            </p>
          )}
        </div>
        {steps && (
          <ol className="next" data-rise aria-label="What happens next">
            {steps.map((s, i) => (
              <li key={i}>
                <b aria-hidden="true">{["i", "ii", "iii", "iv"][i]}</b>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="motto" data-rise>
          Not a memoir to finish — <i>A Story</i> to keep, and to carry on.
        </p>
      </div>

      <div className="desk">
        <div style={{ width: "min(100%, 520px)" }}>
          <div className="card" data-rise>
            <div className="card-head">
              <small>{label}</small>
              <h2>{heading}</h2>
              {intro && <p>{intro}</p>}
              <span className="orn" aria-hidden="true">
                <i />
              </span>
            </div>
            {children}
          </div>
          {after && <p className="switch">{after}</p>}
        </div>
      </div>
    </Page>
  );
}

/**
 * A password box with Show, in place of the app's "confirm your password".
 * On a keyboard, seeing what you typed catches the typo a second box would,
 * and password managers fill one box more reliably than two. Named by its
 * label text alone — the label also wraps the button and the hint.
 */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  invalid,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: "new-password" | "current-password";
  invalid?: boolean;
  hint?: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <label className="field" htmlFor={id} data-invalid={invalid}>
      <span id={`${id}-label`}>{label}</span>
      <div className="with-toggle">
        <input
          id={id}
          type={shown ? "text" : "password"}
          name="password"
          autoComplete={autoComplete}
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-labelledby={`${id}-label`}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-pressed={shown}
          aria-label={shown ? "Hide password" : "Show password"}
        >
          {shown ? "Hide" : "Show"}
        </button>
      </div>
      {hint && (
        <span className="hint" id={`${id}-hint`} style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

/**
 * The emailed code. `one-time-code` lets phones offer it straight from Mail;
 * non-digits are dropped, so a pasted "Your code is 123456" still works —
 * which is also why there is no maxLength, which would cut that paste short.
 */
export function CodeField({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  return (
    <label className="field" htmlFor={id} data-invalid={invalid}>
      <span id={`${id}-label`}>{CODE_LEN}-digit code</span>
      <input
        id={id}
        className="code"
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, CODE_LEN))}
        aria-invalid={invalid}
        aria-labelledby={`${id}-label`}
      />
    </label>
  );
}

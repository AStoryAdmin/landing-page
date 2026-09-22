/**
 * Start — the waitlist, as an invitation (Pass 11h: the founder called the
 * old page the weakest design on the site).
 *
 * A full-height split. Left: a dark photograph (two people talking across a
 * kitchen table) with the title, the three things that happen next on a
 * gold thread, and the namecard motto. Right: the form as an invitation card
 * on ivory — double gold keyline, "Tell us who to call", fields set as
 * underlines, the site's pill button with its gold coin.
 *
 * The form itself is LeadForm, unchanged (submission, validation, errors,
 * the done state); this page only restyles it from the outside. Plan and
 * intent are still read from the URL. Complete without motion.
 */
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import LeadForm from "../../components/ui/LeadForm";
import { PLANS } from "../../lib/pricing";
import { Picture } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Eyebrow } from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

const Page = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: calc(100vh - 76px);
  background: ${color.ivory};

  /* ── Left: the photograph and what happens next ── */
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
    font: 400 ${display.hero} / 0.98 ${font.display};
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
    max-width: 38ch;
  }
  .next {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 440px;
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
  .selection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 26px;
    padding: 12px 16px;
    border-radius: 999px;
    background: ${color.ivory};
    font: 500 15px/1.3 ${font.body};
    color: ${color.primary};
  }
  .selection a {
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.accentText};
  }

  /* LeadForm, restyled from outside: underline fields, a pill button. */
  .card form {
    display: grid;
    gap: 22px;
  }
  .card label {
    display: grid;
    gap: 6px;
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .card label .opt {
    letter-spacing: 0.04em;
    text-transform: none;
    font-weight: 400;
  }
  .card input {
    width: 100%;
    min-height: 48px;
    padding: 6px 0 8px;
    border: 0;
    border-bottom: 1px solid ${color.primaryLineStrong};
    border-radius: 0;
    background: transparent;
    font: 400 22px/1.2 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.primary};
    transition: border-color ${motion.slow};
  }
  .card input:focus {
    outline: none;
    border-bottom: 2px solid ${color.gold};
  }
  .card input:focus-visible {
    outline: none;
  }
  .card button[type="submit"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 58px;
    margin-top: 10px;
    padding: 0 8px 0 28px;
    border: 0;
    border-radius: 999px;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 13px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 16px 30px -18px
      color-mix(in srgb, ${color.primary} 80%, transparent);
    transition: background ${motion.slow};
  }
  .card button[type="submit"]::after {
    content: "→";
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${color.gold};
    color: ${color.primary};
    font: 400 18px/1 ${font.body};
    letter-spacing: 0;
    transition: transform ${motion.reveal};
  }
  .card button[type="submit"]:hover {
    background: ${color.night};
  }
  .card button[type="submit"]:hover::after {
    transform: rotate(-45deg);
  }
  .card button[type="submit"]:focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 4px;
  }
  .card form > p:last-child {
    text-align: center;
    font: italic 400 16px/1.5 ${font.display};
    color: ${color.primaryMid};
  }
  .privacy {
    margin-top: 22px;
    text-align: center;
    font: 500 13px/1.5 ${font.body};
  }
  .privacy a {
    color: ${color.bodyMuted};
    text-underline-offset: 4px;
  }

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }
`;

const NEXT = [
  "We call you to talk it through — who it’s for, and when.",
  "We help you choose a plan and set things up when you’re ready.",
  "Nothing is paid today, and nothing starts until you say so.",
];

export default function Start() {
  const [params] = useSearchParams();
  const plan = params.get("plan") ?? "";
  const base = plan.replace("+book", "");
  const planLabel =
    PLANS.find((x) => x.id === base)?.name ??
    (
      {
        monthly: "Monthly",
        book: "the hardcover book",
        one: "Individual",
        free: "Free",
      } as Record<string, string>
    )[base] ??
    "";
  const intent = params.get("intent") === "demo" ? "demo" : "start";
  const source = planLabel ? `start:plan:${plan}` : "start:hero";
  const ref = useReveals<HTMLElement>();
  const demo = intent === "demo";

  return (
    <Page ref={ref} aria-labelledby="start-title">
      <EditorialSeo
        title={demo ? "Request a demonstration" : "Join the A Story waitlist"}
        path="/start"
        description="Leave your name and phone number. We’ll speak with you about getting started with A Story. No payment is taken."
      />
      <div className="story">
        <div className="bg" aria-hidden="true">
          <Picture
            id={demo ? "34" : "33"}
            alt=""
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <Eyebrow>
            {demo ? "For your community or organization" : "A place to begin"}
          </Eyebrow>
          <h1 id="start-title" data-lines>
            {demo ? (
              <>
                Request a <em>demonstration.</em>
              </>
            ) : (
              <>
                Join the <em>waitlist.</em>
              </>
            )}
          </h1>
          <p className="lead" data-rise>
            {demo
              ? "Tell us how to reach you. We’ll arrange a demonstration around your community or organization."
              : "We’re opening to a few families at a time. Leave your details and we’ll call you about availability."}
          </p>
        </div>
        <ol className="next" data-rise aria-label="What happens next">
          {NEXT.map((n, i) => (
            <li key={n}>
              <b aria-hidden="true">{["i", "ii", "iii"][i]}</b>
              {n}
            </li>
          ))}
        </ol>
        <p className="motto" data-rise>
          Not a memoir to finish — <i>A Story</i> to keep, and to carry on.
        </p>
      </div>

      <div className="desk">
        <div className="card" data-rise>
          <div className="card-head">
            <small>{demo ? "A demonstration" : "Your family’s place"}</small>
            <h2>Tell us who to call.</h2>
            <span className="orn" aria-hidden="true">
              <i />
            </span>
          </div>
          {planLabel && (
            <p className="selection">
              <span>
                {planLabel}
                {plan.includes("+book")
                  ? base === "family"
                    ? " · three books"
                    : " · with the book"
                  : ""}
              </span>
              <Link to="/pricing">Change</Link>
            </p>
          )}
          <LeadForm
            source={source}
            intent={intent}
            reassure="No payment today. We’ll speak with you before anything is set up."
          />
          <p className="privacy">
            <Link to="/privacy">How we handle your information</Link>
          </p>
        </div>
      </div>
    </Page>
  );
}

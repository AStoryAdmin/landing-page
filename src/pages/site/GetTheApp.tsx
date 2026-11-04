/**
 * /get-the-app - the one action's page (phone-first plan, 2026-11-04).
 *
 * Every primary button on the site ("Get the iPhone app", lib/app.ts) ends
 * here. One screen on a phone: what the beta is, in lines the site already
 * says (faqData.ts:69), a two-question form, and the privacy promise from
 * the policy's own summary (privacy.tsx:101-102). The form writes to
 * `waitlist_signups` through lib/leads.ts with the intent "iphone_invite";
 * if that cannot send (no Supabase, an error), the visitor gets the same
 * request as a ready-written email to contact@astoryapp.com, so the button
 * always does something. The thank-you says where the invite goes and
 * promises no date.
 *
 * Below the first screen: the phone during a call (public/app/talk.webp,
 * cropped above the call-time counter as on /care-communities), what
 * happens after you ask (faqData.ts:69, :40), and the door for relatives
 * who already have an invitation from their family (/join).
 *
 * Nothing here says "Start free" or links to the web app's create-account
 * page: the web app is the family's side, reached through their link.
 */
import { useId, useState, type FormEvent } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { INVITE_INTENT, looksLikeEmail, submitLead } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { SITE } from "../../lib/seo";
import { Phone } from "./app/Phone";
import { ArrowIcon } from "./kit/kit";
import {
  Chapter,
  Frame,
  PrimaryAnchor,
  PrimaryButton,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import { Form } from "./kit/form.styles";
import {
  color,
  display,
  font,
  media,
  radius,
  shadow,
  space,
  type,
} from "../../styles/theme";

const ANSWERS = [
  ["yes", "Yes"],
  ["no", "No"],
  ["not-sure", "Not sure"],
] as const;
type Answer = (typeof ANSWERS)[number][0];

const Opening = styled(Chapter)`
  padding: calc(clamp(40px, 5vw, 96px) * var(--sy)) 0
    calc(clamp(56px, 6vw, 120px) * var(--sy));
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(${space.xl}, 6vw, 128px);
    align-items: center;
  }
  .kicker {
    margin: 0 0 ${space.md};
    font: 600 ${type.label} / 1.4 ${font.ui};
    color: var(--label);
  }
  h1 {
    margin: 0;
    font: 600 ${display.lg} / 1.02 ${font.display};
    letter-spacing: -0.015em;
    color: var(--ink);
    text-wrap: balance;
  }
  h1 em {
    font-style: normal;
    color: var(--mark);
  }
  .lead {
    margin: ${space.md} 0 0;
    max-width: 44ch;
    font: 400 ${type.lead} / 1.45 ${font.text};
    color: var(--text);
    text-wrap: pretty;
  }
  /* The form on a leaf of paper lying on the cloth. */
  .sheet {
    margin-top: clamp(${space.lg}, 2.6vw, ${space.xxl});
    max-width: 560px;
    padding: clamp(20px, 2.4vw, 36px);
    border-radius: ${radius.lg};
    background: ${color.paper};
    color: ${color.body};
    box-shadow: ${shadow.lie};
    --ring: ${color.chocolate};
  }
  /* Sentence-case labels here (taste rule 4), the kit's fields otherwise. */
  ${Form} {
    gap: 20px;
  }
  ${Form} .field > span,
  ${Form} legend {
    font: 600 ${type.ui} / 1.35 ${font.ui};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.primary};
  }
  ${Form} legend {
    margin-bottom: 10px;
  }
  ${Form} .chip span {
    min-width: 72px;
    justify-content: center;
  }
  .when-no {
    margin: 10px 0 0;
    font: 400 ${type.note} / 1.5 ${font.text};
    color: ${color.bodyMuted};
  }
  .go {
    justify-self: stretch;
    justify-content: center;
  }
  .privacy {
    margin: 0;
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: ${color.bodyMuted};
  }
  .privacy a {
    color: ${color.primary};
    text-underline-offset: 3px;
  }
  .done h2 {
    margin: 0;
    font: 600 ${display.md} / 1.1 ${font.display};
    color: ${color.primary};
  }
  .done p {
    margin: ${space.sm} 0 0;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.body};
  }
  .done b {
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .done .next {
    margin-top: ${space.lg};
  }
  .fallback {
    display: grid;
    gap: ${space.sm};
  }
  .fallback p {
    margin: 0;
    font: 400 ${type.note} / 1.5 ${font.body};
    color: ${color.body};
  }

  /* The phone during a call: the app itself, as on /care-communities. */
  .shot {
    display: grid;
    justify-items: center;
    gap: ${space.sm};
    margin: 0;
  }
  .device {
    width: min(100%, 320px);
  }
  /* The screen stops under the microphone, so the capture's call-time
     counter never shows (the same crop as Care.tsx, round 3 fix 1). */
  .device {
    aspect-ratio: 1 / 1.58;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, #000 97%, transparent 100%);
  }
  .device img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: block;
  }
  .shot figcaption {
    max-width: 30ch;
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
    text-align: center;
    text-wrap: balance;
  }

  ${media.md} {
    padding-top: calc(28px * var(--sy));
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.xxl};
    }
    h1 {
      font-size: clamp(2.25rem, 9vw, 2.75rem);
    }
    .lead {
      font-size: 18px;
      margin-top: ${space.sm};
    }
    .sheet {
      margin-top: ${space.lg};
      padding: 20px 18px;
    }
    .device {
      width: min(100%, 280px);
    }
  }
`;

/* After you ask: three short steps and the door for invited relatives. */
const After = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(${space.xl}, 6vw, 128px);
    align-items: start;
  }
  h2 {
    margin: 0;
    font: 600 ${display.md} / 1.1 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0;
    counter-reset: step;
  }
  li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: ${space.md};
    padding: ${space.lg} 0;
    border-top: 1px solid var(--line);
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  li::before {
    content: counter(step);
    font: 600 ${display.sm} / 1 ${font.display};
    font-variant-numeric: lining-nums;
    color: var(--mark);
  }
  .also {
    margin: ${space.xl} 0 0;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text);
    max-width: 56ch;
  }
  .invited {
    margin: ${space.lg} 0 0;
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.lg};
    }
    li {
      padding: ${space.md} 0;
    }
  }
`;

type Sent =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; email: string }
  | { state: "fallback"; mailto: string };

export default function GetTheApp() {
  const ids = useId();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState<Answer | "">("");
  const [trap, setTrap] = useState("");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState<Sent>({ state: "idle" });

  const emailOk = looksLikeEmail(email);
  const answerOk = answer !== "";

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setTried(true);
    if (!emailOk || !answerOk || sent.state === "sending") return;
    const clean = email.trim();
    /* A filled honeypot is a bot: thank it and send nothing. */
    if (trap) {
      setSent({ state: "done", email: clean });
      return;
    }
    setSent({ state: "sending" });
    const label = ANSWERS.find(([v]) => v === answer)![1];
    const result = await submitLead({
      firstName: "",
      lastName: "",
      email: clean,
      phone: "",
      note: `Their iPhone: ${label}`,
      source: `get-the-app${INVITE_INTENT}`,
    });
    if (result.ok) {
      track("lead_submitted", { source: "get-the-app", intent: "iphone_invite" });
      setSent({ state: "done", email: clean });
    } else {
      setSent({ state: "fallback", mailto: result.fallbackMailto });
    }
  };

  return (
    <>
      <EditorialSeo
        title="Get the iPhone app - A Story"
        path="/get-the-app"
        description="Ask for an invite to the A Story iPhone app. A Story calls your parent, asks about their life, and keeps what they tell in a private book the whole family can add to."
      />
      <Opening $ground="cloth" aria-labelledby="page-title">
        <Frame className="row">
          <div>
            <p className="kicker">Private beta, by invite</p>
            <h1 id="page-title">
              Get the A Story <em>iPhone app.</em>
            </h1>
            <p className="lead">
              A Story rings your parent in the A Story app on their iPhone, asks
              about their life, and keeps what they tell in a private book the
              whole family can add to.
            </p>

            <div className="sheet" aria-live="polite">
              {sent.state === "done" ? (
                <div className="done">
                  <h2>Thank you.</h2>
                  <p>
                    We’ll send your invite to <b>{sent.email}</b>.
                  </p>
                  <p className="next">
                    <TextAnchor href="/samples">
                      Turn the pages of a sample book <ArrowIcon />
                    </TextAnchor>
                  </p>
                </div>
              ) : sent.state === "fallback" ? (
                <div className="fallback">
                  <p>
                    The form couldn’t send just now. Your request is written as
                    an email instead; press send and it reaches us.
                  </p>
                  <PrimaryAnchor href={sent.mailto} className="go">
                    Open the email <ArrowIcon />
                  </PrimaryAnchor>
                  <p>
                    Or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                  </p>
                </div>
              ) : (
                <Form onSubmit={onSubmit} noValidate>
                  <label
                    className="field"
                    data-invalid={tried && !emailOk ? "true" : undefined}
                  >
                    <span>Your email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={tried && !emailOk ? true : undefined}
                      aria-describedby={tried && !emailOk ? `${ids}-email` : undefined}
                    />
                  </label>
                  {tried && !emailOk && (
                    <p className="error" id={`${ids}-email`}>
                      Check the email address.
                    </p>
                  )}
                  <fieldset
                    aria-describedby={tried && !answerOk ? `${ids}-answer` : undefined}
                  >
                    <legend>Does the person you’ll call have an iPhone?</legend>
                    <div className="chips">
                      {ANSWERS.map(([value, label]) => (
                        <label className="chip" key={value}>
                          <input
                            type="radio"
                            name="iphone"
                            value={value}
                            checked={answer === value}
                            onChange={() => setAnswer(value)}
                            required
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                    {/* faqData.ts:48 ("Before launch, A Story can only ring an iPhone.") */}
                    {answer === "no" && (
                      <p className="when-no">
                        For now, A Story can only ring an iPhone. Ask anyway:
                        the family can read and add in any browser.
                      </p>
                    )}
                  </fieldset>
                  {tried && !answerOk && (
                    <p className="error" id={`${ids}-answer`}>
                      Choose yes, no or not sure.
                    </p>
                  )}
                  <label className="trap" aria-hidden="true">
                    Leave this empty
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                    />
                  </label>
                  <PrimaryButton
                    type="submit"
                    className="go"
                    disabled={sent.state === "sending"}
                  >
                    {sent.state === "sending" ? "Sending…" : "Ask for my invite"}{" "}
                    <ArrowIcon />
                  </PrimaryButton>
                  {/* privacy.tsx:101-102, the policy's own summary. */}
                  <p className="privacy">
                    We never sell data, and there is no advertising in A
                    Story.{" "}
                    <a href="/privacy/#legal-short">Privacy, in short</a>
                  </p>
                </Form>
              )}
            </div>
          </div>

          <figure className="shot">
            <div className="device">
              <Phone
                width="100%"
                lightStatus
                label="The A Story app during a call. On screen: the question “What’s something you remember Rose always doing?”, a button “Rose is here with me”, and “Listening — just start talking”."
              >
                <img src="/app/talk.webp" alt="" loading="lazy" decoding="async" />
              </Phone>
            </div>
            <figcaption>
              A call in the A Story app: it asks, then listens. Someone can sit
              beside them.
            </figcaption>
          </figure>
        </Frame>
      </Opening>

      <After $ground="ivory" $tight aria-labelledby="after-title">
        <Frame className="row">
          <h2 id="after-title">After you ask</h2>
          <div>
            {/* faqData.ts:69 and :40. */}
            <ol>
              <li>We email your invite to the address you gave.</li>
              <li>
                Your parent installs the app once on their iPhone, and we help
                you set it up.
              </li>
              <li>
                After that, the app rings at the hour your family picked, and
                they answer and talk.
              </li>
            </ol>
            <p className="also">
              To read or add to the archive, no app is needed: any browser
              works. There is no fee per relative.
            </p>
            <p className="invited">
              Already invited by your family?{" "}
              <TextLink to="/join">
                Open your invitation <ArrowIcon />
              </TextLink>
            </p>
          </div>
        </Frame>
      </After>
    </>
  );
}


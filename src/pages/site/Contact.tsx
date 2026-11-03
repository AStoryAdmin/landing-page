/**
 * /contact - write to us, and a person reads it. Added 2026-10-20.
 *
 * "Get in touch" was a mailto to contact@astoryapp.com: on a phone with no
 * mail app set up it did nothing, and on a laptop it opened Outlook. The
 * founder asked that anyone on the site can reach him directly (since
 * 2026-11-02 the address shown is contact@astoryapp.com, so his own inbox
 * stays off the page). So the page does both: a form that sends from the page (the
 * `demo-request` function, `type: "contact"`, lib/demoRequest.ts), and the
 * address itself, large, with a button that copies it.
 *
 * The other doors - book a demo, reserve, questions - are beside the form,
 * so someone who came here for one of those finds it without writing.
 *
 * 2026-11-02 (design-spec §4C): the doors are named by what people came
 * for ("Reserve for $1", "Book a demo", "Questions & answers"), with no
 * discount. On a phone the letter and its signature come first, then the
 * form, then the address and the doors. Visual system (spec §3): labels in
 * sentence case, sizes from theme tokens only, and the two blocks below the
 * opening arrive together, as one group. The doors keep their row arrow, as the
 * kit's "Where to next" rows do.
 */
import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { DEMO_EMAIL, sendMessage } from "../../lib/demoRequest";
import { looksLikeEmail } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryAnchor,
  PrimaryButton,
  SecondaryButton,
  TextAnchor,
} from "./kit/kit.styles";
import { Done, Form } from "./kit/form.styles";
import { color, curve, display, font, media, shadow, space, type } from "../../styles/theme";

const TOPICS = [
  "A question",
  "For my family",
  "Institutions and partnerships",
  "Press",
  "Help with the app",
  "Something else",
] as const;

/* The other doors, by what people came for (design-spec §4C). The $1 line
   is lib/founding.ts INCLUDES.reserve: no discount is mentioned. */
const DOORS = [
  [
    "Reserve for $1",
    "It holds your place in line, and the dollar comes off your first year.",
    "/reserve",
  ],
  [
    "Book a demo",
    "For a school, library, company or care community.",
    "/organizations#book",
  ],
  [
    "Questions & answers",
    "The practical things are answered here.",
    "/questions",
  ],
] as const;

/* The opening's object: the person who reads the message (jury 1 #4, #7:
   Daniel's own round portrait, not a stock kitchen photograph). */
const Reader = styled.figure`
  display: grid;
  justify-items: center;
  gap: ${space.md};
  margin: 0;
  text-align: center;
  img {
    width: clamp(150px, 13vw, 220px);
    height: clamp(150px, 13vw, 220px);
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 30%;
    box-shadow:
      0 0 0 5px ${color.paperPure},
      0 0 0 6px color-mix(in srgb, ${color.gold} 60%, transparent),
      ${shadow.lie};
  }
  p {
    display: grid;
    gap: ${space.xxs};
  }
  b {
    font: 500 ${display.sm} / 1 ${font.script};
    color: var(--ink);
  }
  span {
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
  }
`;

const Body = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(${space.xl}, 6vw, calc(${space.xxxl} + ${space.xxl}));
    align-items: start;
  }
  .side {
    position: sticky;
    top: 112px;
  }
  .address {
    display: grid;
    gap: ${space.sm};
    padding: clamp(${space.lg}, 2.6vw, ${space.xl}) 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .address small {
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.01em;
    text-transform: none;
    color: var(--label);
  }
  .address a.big {
    display: inline-block;
    /* 43px measured with space.xs; 44 is the floor (taste rule 20). */
    min-height: 44px;
    padding: ${space.xs} 0;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: color 160ms ${curve.out};
  }
  ${media.hover} {
    .address a.big:hover {
      color: var(--mark);
    }
  }
  .address .acts {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.sm};
  }
  .address p {
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .doors {
    display: grid;
    margin: clamp(${space.lg}, 3vw, ${space.xl}) 0 0;
    padding: 0;
    list-style: none;
  }
  .doors a {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: ${space.md};
    padding: ${space.md} 0;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    color: var(--ink);
  }
  .doors b {
    display: block;
    font: 400 ${type.d5} / 1.3 ${font.display};
  }
  .doors span {
    display: block;
    margin-top: ${space.xxs};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--muted);
  }
  .doors svg {
    width: 18px;
    height: 18px;
    transition: transform 240ms ${curve.out};
  }
  ${media.hover} {
    .doors a:hover svg {
      transform: translateX(4px);
    }
  }
  .card {
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.06),
      0 40px 80px -48px rgba(42, 31, 24, 0.45);
  }
  .card-head {
    margin-bottom: clamp(${space.lg}, 3vw, ${space.xl});
    padding-bottom: clamp(${space.md}, 2.4vw, ${space.lg});
    border-bottom: 1px solid ${color.primaryLine};
  }
  .card-head small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.01em;
    text-transform: none;
    color: ${color.accentText};
  }
  .card-head h2 {
    margin-top: ${space.xs};
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      position: static;
      order: 2;
    }
  }
`;

export default function Contact() {
  const uid = useId();
  const reveal = useReveals<HTMLElement>();
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [invalid, setInvalid] = useState<"name" | "email" | "message" | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_EMAIL);
      setCopied(true);
      track("contact_copy_email");
    } catch {
      /* The address is on screen to copy by hand. */
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setInvalid("name");
    if (!looksLikeEmail(email)) return setInvalid("email");
    if (!message.trim()) return setInvalid("message");
    setInvalid(null);
    setFallback(null);
    setBusy(true);
    const result = await sendMessage({
      name,
      email,
      topic,
      message,
      website,
      source: "contact",
    });
    setBusy(false);
    if (result.ok) {
      setDone(true);
      track("contact_sent", { topic: topic || "unspecified" });
      return;
    }
    setFallback(result.fallbackMailto);
    track("contact_failed");
  };

  return (
    <>
      <EditorialSeo
        title="Contact A Story"
        path="/contact"
        description="Write to A Story. Messages from this page go straight to Daniel, our co-founder, and are answered within a working day."
      />
      <PageOpening
        variant="letter"
        title={
          <>
            A person reads every <em>message.</em>
          </>
        }
        lead="Messages from this page go straight to Daniel, our co-founder and CEO, and are answered within a working day."
        actions={
          <>
            <PrimaryAnchor href="#write">
              Send a message <ArrowIcon />
            </PrimaryAnchor>
            <TextAnchor
              href={`mailto:${DEMO_EMAIL}`}
              onClick={() => track("contact_mailto")}
            >
              {DEMO_EMAIL}
            </TextAnchor>
          </>
        }
        object={
          <Reader>
            <img
              src="/our-story/daniel-320.webp"
              alt="Daniel Hoang Nguyen"
              width={320}
              height={320}
              decoding="async"
            />
            <p>
              <b>Daniel Hoang Nguyen</b>
              <span>Co-founder and CEO. He reads every message.</span>
            </p>
          </Reader>
        }
      />

      <Body
        ref={reveal}
        $ground="ivory"
        id="write"
        aria-label="Write to us"
        style={{ scrollMarginTop: 80 }}
      >
        <Frame className="row">
          <div className="side" data-rise>
            <Eyebrow>Or write directly</Eyebrow>
            <div className="address">
              <small>Daniel Hoang Nguyen, co-founder and CEO</small>
              <a
                className="big"
                href={`mailto:${DEMO_EMAIL}`}
                onClick={() => track("contact_mailto")}
              >
                {DEMO_EMAIL}
              </a>
              <div className="acts">
                <SecondaryButton type="button" onClick={copy}>
                  {copied ? "Copied" : "Copy the address"}
                </SecondaryButton>
              </div>
              <p>From any email app. It is the same inbox as the form.</p>
            </div>
            <ul className="doors">
              {DOORS.map(([t, d, to]) => (
                <li key={to}>
                  <Link to={to}>
                    <div>
                      <b>{t}</b>
                      <span>{d}</span>
                    </div>
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Plate className="card" data-rise>
            {done ? (
              <Done role="status">
                <h3>Thank you. It is with Daniel now.</h3>
                <p>
                  You will hear back at <strong>{email.trim()}</strong> within a
                  working day. If it cannot wait, write to{" "}
                  <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>.
                </p>
              </Done>
            ) : (
              <>
                <div className="card-head">
                  <small>A message</small>
                  <h2>What would you like to ask?</h2>
                </div>
                <Form onSubmit={submit} noValidate>
                  <fieldset>
                    <legend>
                      About <small>optional</small>
                    </legend>
                    <div className="chips">
                      {TOPICS.map((t) => (
                        <label className="chip" key={t}>
                          <input
                            type="radio"
                            name={`${uid}-topic`}
                            checked={topic === t}
                            onChange={() => setTopic(t)}
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                    {topic === "Institutions and partnerships" && (
                      <p className="hint">
                        Booking a demo?{" "}
                        <Link to="/organizations#book">
                          Pick a time for a demo
                        </Link>{" "}
                        - or write here, either is fine.
                      </p>
                    )}
                  </fieldset>
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
                    <label
                      className="field"
                      htmlFor={`${uid}-email`}
                      data-invalid={invalid === "email"}
                    >
                      <span>Your email</span>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                  <label
                    className="field"
                    htmlFor={`${uid}-message`}
                    data-invalid={invalid === "message"}
                  >
                    <span>Message</span>
                    <textarea
                      id={`${uid}-message`}
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
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
                        : invalid === "email"
                          ? "That email does not look quite right."
                          : "Please write a message."}
                    </p>
                  )}
                  {fallback && (
                    <p className="error" role="alert">
                      That did not go through on our side.{" "}
                      <TextAnchor href={fallback}>
                        Send it by email instead
                      </TextAnchor>{" "}
                      - your message is already in it.
                    </p>
                  )}
                  <PrimaryButton
                    className="go"
                    type="submit"
                    disabled={busy}
                    aria-busy={busy || undefined}
                  >
                    {busy ? "Sending…" : "Send to Daniel"} <ArrowIcon />
                  </PrimaryButton>
                  <p className="fine">
                    No mailing list. We use your email only to answer you.
                  </p>
                </Form>
              </>
            )}
          </Plate>
        </Frame>
      </Body>
    </>
  );
}

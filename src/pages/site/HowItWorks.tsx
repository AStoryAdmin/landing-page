/**
 * How it works — the mechanism, in three acts.
 *
 * Home proves the idea once (three calls, one layer at a time). This page is
 * for the reader who wants to see all of it: I, who does what and why the
 * storyteller never has to operate anything; II, the complete conversations,
 * with the interviewer's reasoning set in the margin beside every question
 * the way an editor annotates a manuscript; III, what the family actually
 * receives — the card, the words underneath it, the voice — and what the
 * family adds afterwards.
 *
 * Pass 10's five-tab "workbench" repeated Home's lake example as a form to
 * fill in. It explained the product instead of demonstrating it, and it is
 * gone; the lake belongs to Home and For families.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * VOICE IS AHEAD OF THE APP. demoScripts.ts says so in its header: storing
 * the storyteller's own audio is being built. Wherever this page shows the
 * voice layer it carries the "In development" mark. Do not remove it until
 * the app keeps the audio.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useState } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { DEPTHS, SCENARIOS, SENSITIVE_LABEL } from "../../lib/demoScripts";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  Plate,
  PrimaryLink,
  SecondaryLink,
  SplitHead,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Soon = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 3px 8px;
  border: 1px solid currentColor;
  border-radius: 2px;
  font: 600 11px/1.2 ${font.body};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: middle;
  color: ${color.accentText};
`;

/* ── Act I ───────────────────────────────────────────────────────────── */

const Person = styled(Chapter)`
  .person-quote {
    font: italic 400 ${display.xl} / 1.05 ${font.display};
    color: ${color.primary};
    letter-spacing: -0.02em;
  }
  .person-quote span {
    display: block;
    font-style: normal;
    color: ${color.accent};
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid var(--line);
  }
  li {
    padding: 30px clamp(20px, 3vw, 44px) 0 0;
  }
  li + li {
    padding-left: clamp(20px, 3vw, 44px);
    border-left: 1px solid ${color.primaryLine};
  }
  li b {
    display: block;
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.accent};
    margin-bottom: 22px;
  }
  li h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    margin-bottom: 12px;
  }
  li p {
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
    max-width: 34ch;
  }
  ${media.md} {
    ol {
      grid-template-columns: minmax(0, 1fr);
    }
    li + li {
      border-left: 0;
      padding-left: 0;
    }
  }
`;

const PERSON = [
  {
    n: "I",
    title: "One install, done by somebody else.",
    text: "A couple of minutes on their phone or tablet. You can do the whole thing while they’re in the next room, and choose the hour A Story should ring.",
  },
  {
    n: "II",
    title: "Then it calls them.",
    text: "At the hour they picked, their phone rings and A Story is on the other end. Answer or don’t — nothing breaks, and there is always another day.",
  },
  {
    n: "III",
    title: "Talking is the whole job.",
    text: "Nothing to open, save or file. Twenty minutes is a real session, and the next call picks up where the last one stopped.",
  },
];

/* ── Act II ──────────────────────────────────────────────────────────── */

const Calls = styled(Chapter)`
  .picker {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    margin-bottom: clamp(48px, 6vw, 88px);
  }
  .picker button {
    display: grid;
    gap: 8px;
    padding: 22px clamp(12px, 2vw, 28px) 22px 0;
    min-height: 120px;
    text-align: left;
    background: none;
    border: 0;
    border-top: 3px solid transparent;
    margin-top: -2px;
    color: ${color.bodyMuted};
    cursor: pointer;
    transition: color 300ms, border-color 300ms;
  }
  .picker button + button {
    padding-left: clamp(12px, 2vw, 28px);
    border-left: 1px solid ${color.primaryLine};
  }
  .picker small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .picker b {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .picker span {
    font: 400 15px/1.45 ${font.body};
  }
  .picker button[aria-pressed="true"] {
    color: ${color.teal};
    border-top-color: ${color.teal};
  }
  .picker button:focus-visible {
    outline: 3px solid ${color.teal};
    outline-offset: 4px;
  }

  .call {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: start;
  }
  .call-side {
    position: sticky;
    top: calc(var(--nav-total) + 32px);
  }
  .cover {
    font: italic 400 ${display.md} / 1.3 ${font.display};
    color: ${color.primary};
    margin: 0 0 16px;
  }
  .cover-by {
    font: 500 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .ladder {
    list-style: none;
    margin: 36px 0 0;
    padding: 18px 0 0;
    border-top: 1px solid var(--line);
  }
  .ladder small {
    display: block;
    margin-bottom: 12px;
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .ladder li {
    display: flex;
    gap: 14px;
    align-items: baseline;
    padding: 6px 0;
    font: 400 17px/1.4 ${font.body};
    color: ${color.body};
  }
  .ladder li b {
    width: 22px;
    font: 400 17px/1 ${font.display};
    color: ${color.teal};
  }
  .ladder p {
    margin-top: 12px;
    font: 400 15px/1.55 ${font.body};
    color: ${color.bodyMuted};
    max-width: 36ch;
  }

  .script {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .script li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
    gap: clamp(20px, 3vw, 44px);
    padding: 22px 0;
    border-top: 1px solid ${color.primaryLine};
  }
  .script .who {
    display: block;
    margin-bottom: 8px;
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .script .ai p {
    font: 400 17px/1.6 ${font.body};
    color: ${color.primary};
  }
  .script .user p {
    font: 400 clamp(1.15rem, 1rem + 0.35vw, 1.3rem) / 1.5 ${font.display};
    color: ${color.primary};
  }
  .script .user .who {
    color: ${color.accentText};
  }
  .sensitive {
    margin-bottom: 8px;
    font: italic 400 15px/1.45 ${font.display};
    color: ${color.accentText};
  }
  /* The interviewer's reasoning, set in the margin like an editor's note. */
  .margin {
    padding-left: 16px;
    border-left: 2px solid ${color.goldDeep};
  }
  .margin b {
    display: block;
    margin-bottom: 4px;
    font: 600 13px/1.3 ${font.body};
    color: ${color.primary};
  }
  .margin p {
    font: italic 400 15px/1.5 ${font.display};
    color: ${color.bodyMuted};
  }
  .about {
    margin-top: clamp(40px, 5vw, 72px);
    text-align: center;
  }
  .about p {
    font: 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primary};
    max-width: 44ch;
    margin: auto;
  }
  ${media.md} {
    .picker,
    .call,
    .script li {
      grid-template-columns: minmax(0, 1fr);
    }
    .picker button + button {
      border-left: 0;
      padding-left: 0;
      border-top: 1px solid ${color.primaryLine};
    }
    .call-side {
      position: static;
    }
  }
`;

/* ── Act III ─────────────────────────────────────────────────────────── */

const Receives = styled(Chapter)`
  .layers {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.1fr);
    gap: clamp(20px, 3vw, 44px);
    align-items: stretch;
  }
  .layer {
    background: ${color.paperPure};
    padding: clamp(24px, 2.6vw, 36px);
    box-shadow: 0 1px 1px rgba(42, 31, 24, 0.06), 0 18px 36px -24px rgba(42, 31, 24, 0.4);
  }
  .layer h3 {
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
    margin-bottom: 18px;
  }
  .layer h4 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
    margin-bottom: 6px;
  }
  .layer .meta {
    font: 500 14px/1.4 ${font.body};
    color: ${color.bodyMuted};
    margin-bottom: 16px;
  }
  .layer p {
    font: 400 16px/1.6 ${font.body};
    color: ${color.body};
  }
  .transcript p + p {
    margin-top: 12px;
  }
  .transcript time {
    display: block;
    font: 500 12px/1.3 ${font.body};
    color: ${color.bodyMuted};
    font-variant-numeric: tabular-nums;
  }
  .voice {
    background: ${color.night};
    color: ${color.ivory};
  }
  .voice h3 {
    color: ${color.gold};
  }
  .voice blockquote {
    margin: 0 0 16px;
    font: italic 400 ${display.sm} / 1.35 ${font.display};
  }
  .voice p {
    color: ${color.onDarkMuted};
    font-size: 15px;
  }
  .voice ${Soon} {
    color: ${color.gold};
  }
  .family {
    margin-top: clamp(64px, 7vw, 110px);
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(32px, 6vw, 110px);
  }
  .family ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .family li {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 18px;
    padding: 22px 0;
    border-top: 1px solid ${color.primaryLine};
  }
  .family li:last-child {
    border-bottom: 1px solid ${color.primaryLine};
  }
  .initial {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font: 400 22px/1 ${font.display};
    color: ${color.ivory};
    background: ${color.primaryMid};
  }
  .family li:nth-child(2) .initial {
    background: ${color.teal};
  }
  .family li p {
    font: 400 17px/1.55 ${font.body};
    color: ${color.body};
  }
  .family li b {
    color: ${color.primary};
  }
  .family li small {
    display: block;
    margin-top: 6px;
    font: 500 14px/1.4 ${font.body};
    color: ${color.accentText};
  }
  .shared {
    margin-top: 22px;
    font: italic 400 18px/1.5 ${font.display};
    color: ${color.primaryMid};
  }
  ${media.lg} {
    .layers {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.md} {
    .family {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Guides = styled(Chapter)`
  padding: clamp(64px, 7vw, 104px) 0;
  .guides {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: end;
    gap: 24px 48px;
  }
  .guides p {
    font: 400 18px/1.6 ${font.body};
    color: var(--muted);
    max-width: 48ch;
    margin-top: 14px;
  }
`;

const CALL_META = [
  { id: "faith", move: "Hears the aside" },
  { id: "childhood", move: "Takes the no" },
  { id: "love", move: "Follows the detail" },
];

export default function HowItWorks() {
  const [pick, setPick] = useState(2);
  const story = SCENARIOS.find((s) => s.id === CALL_META[pick].id)!;
  const person = useReveals<HTMLElement>();
  const calls = useReveals<HTMLElement>();
  const receives = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story works — a conversation becomes a family archive"
        path="/how-it-works"
        description="Set it up once. A Story calls, listens and follows what they actually say. Read three complete conversations and see what the family receives."
      />
      <PageOpening
        eyebrow="How it works"
        title={
          <>
            You make time. A Story does the <em>asking.</em>
          </>
        }
        lead="Set it up once. After that their phone rings at the hour they chose, and a patient voice asks about their life — then follows whatever they actually say."
        actions={
          <>
            <PrimaryLink to="/start">
              Join the waitlist <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/how-it-works#calls">Read a conversation</SecondaryLink>
          </>
        }
        media={
          <Print
            id="33"
            alt="Two adults talking across a kitchen table"
            sizes="(max-width: 860px) 92vw, 44vw"
            priority
          />
        }
      />

      <Person ref={person} $ground="sand" aria-labelledby="person-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Built for the person, not the phone</Eyebrow>
              <h2 id="person-title" className="person-quote" data-lines>
                “She’s not good with these things.”
                <span>Good. Neither is this.</span>
              </h2>
            </div>
            <Lead data-rise>
              No dashboard, no typing, no password to remember. The app is
              installed once — by you, if you like — and after that A Story
              rings them at the hour they chose.
            </Lead>
          </SplitHead>
          <ol>
            {PERSON.map((p) => (
              <li key={p.n} data-rise>
                <b aria-hidden="true">{p.n}</b>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </Frame>
      </Person>

      <Calls ref={calls} $ground="paper" id="calls" aria-labelledby="calls-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>The complete conversations</Eyebrow>
              <Statement id="calls-title" $size="xl" data-lines>
                Good listening changes the next <em>question.</em>
              </Statement>
            </div>
            <Lead data-rise>
              Every question here comes from the app’s own bank. Beside each
              one, the reason it was asked — and why it stayed with the
              subject instead of moving on.
            </Lead>
          </SplitHead>

          <div className="picker" aria-label="Choose a conversation">
            {CALL_META.map((c, i) => {
              const s = SCENARIOS.find((x) => x.id === c.id)!;
              return (
                <button key={c.id} aria-pressed={pick === i} aria-controls="call-script" onClick={() => setPick(i)}>
                  <small>{c.move}</small>
                  <b>
                    {s.teller} · {s.label}
                  </b>
                  <span>{s.watch}</span>
                </button>
              );
            })}
          </div>

          <div className="call">
            <aside className="call-side">
              <p className="cover">“{story.cover.quote}”</p>
              <p className="cover-by">{story.cover.attribution}</p>
              <div className="ladder">
                <small>How deep it goes</small>
                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {DEPTHS.map((d, i) => (
                    <li key={d}>
                      <b>{i + 1}</b>
                      {d}
                    </li>
                  ))}
                </ol>
                <p>
                  The interview climbs a rung only once the one below it has been
                  answered — which is why the last question lands.
                </p>
              </div>
            </aside>
            <ol className="script" id="call-script" aria-live="polite" key={story.id}>
              {story.script.map((t, i) => (
                <li key={i} className={t.role} data-rise>
                  <div>
                    {t.sensitiveKind && <p className="sensitive">{SENSITIVE_LABEL[t.sensitiveKind]}</p>}
                    <span className="who">
                      {t.role === "ai" ? `A Story${t.depth ? ` · ${DEPTHS[t.depth - 1]}` : ""}` : story.teller}
                    </span>
                    <p>{t.text}</p>
                  </div>
                  {t.role === "ai" && t.stay ? (
                    <div className="margin">
                      {t.method && <b>{t.method}</b>}
                      <p>{t.stay}</p>
                    </div>
                  ) : (
                    <span />
                  )}
                </li>
              ))}
            </ol>
          </div>
          {story.about && (
            <Plate className="about" data-rise>
              <p>{story.about}</p>
            </Plate>
          )}
        </Frame>
      </Calls>

      <Receives ref={receives} $ground="ivory" aria-labelledby="receives-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>What the family receives</Eyebrow>
              <Statement id="receives-title" $size="xl" data-lines>
                A memory to read. Every word underneath. The <em>voice.</em>
              </Statement>
            </div>
            <Lead data-rise>
              The card is organised so it can be found again. It never
              replaces what was said — the transcript stays underneath it.
            </Lead>
          </SplitHead>

          <div className="layers">
            <article className="layer" data-rise>
              <h3>The card</h3>
              <h4>{story.label}</h4>
              <p className="meta">
                {story.chapter} · {story.dateLine}
              </p>
              <p>{story.summary.split(/(?<=\.)\s+/).slice(0, 2).join(" ")}</p>
            </article>
            <article className="layer transcript" data-rise>
              <h3>The transcript</h3>
              {story.transcript.slice(0, 3).map((l, i) => (
                <p key={i}>
                  <time>
                    {l.at} · {l.who}
                  </time>
                  {l.text}
                </p>
              ))}
            </article>
            <article className="layer voice" data-rise>
              <h3>
                {story.clip.label} · {story.clip.duration}
                <Soon>In development</Soon>
              </h3>
              <blockquote>“{story.excerpt}”</blockquote>
              <p>{story.clip.note}</p>
            </article>
          </div>

          <div className="family">
            <div data-rise>
              <Statement as="h3" $size="md">
                Then the family adds what they <em>know.</em>
              </Statement>
              <p className="shared">{story.shared}</p>
            </div>
            <ul>
              {story.family.map((f) => (
                <li key={f.name} data-rise>
                  <span className="initial" aria-hidden="true">
                    {f.name.replace(/^(Her|His) \w+ /, "")[0]}
                  </span>
                  <div>
                    <p>
                      <b>{f.name}</b> {f.text}
                    </p>
                    <small>{f.pending ?? (f.kind === "edit" ? "Invited · can edit" : "Added")}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </Receives>

      <Guides $ground="sand" aria-labelledby="guides-title">
        <Frame className="guides">
          <div>
            <Statement id="guides-title" $size="md">
              Not sure what to ask first?
            </Statement>
            <p>Conversation guides for parents, photographs, hard subjects and the ordinary days nobody thinks to record.</p>
          </div>
          <TextLink to="/guides">
            Explore the guides <ArrowIcon />
          </TextLink>
        </Frame>
      </Guides>

      <Invitation />
    </>
  );
}

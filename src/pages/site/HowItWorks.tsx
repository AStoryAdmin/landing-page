/**
 * How it works - shown, not told.
 *
 * Fix round 2 (2026-10-23, YC juries 1 #3 #13, 2 U5, 3 B2, 4 #2 #7 #8): the
 * page was 9 screens at 1920 and still spoke phase 1 - five numbered steps
 * with pill labels hanging on a connector line beside a drawn iPhone with a
 * 9:41 status bar, the old 10 October app screens, a voice player for a
 * feature still in development and a four-screen tour of the old screens.
 * It is now about six screens:
 *
 * 1. Opening, on the cloth: the call itself as the object - the question
 *    that rings in the A Story app at the hour the family chose.
 * 2. Four moments, as ruled rows (no numerals, no pills, no thread), beside
 *    what one call leaves: the app's own memory card (app/MemoryCard.tsx,
 *    ported line for line from the web app) and the transcript under it.
 *    This merges the old walkthrough and "Each call leaves a memory".
 * 3. Sample calls (home/Listen.tsx), labelled as samples.
 * 4. Everyone has a way in: four ways, in words, on one row.
 * 5. The book.
 *
 * Premium pass (2026-11-02, design spec §4A): the film (kit/Film.tsx) after
 * the opening; the lead cut to two sentences with the "today" note under the
 * actions; "If you're the one being asked" for the storyteller after the
 * four moments; the ways in as a Scroller on a phone; the closing offers
 * /samples, /pricing and /for-families.
 *
 * Round 2 (2026-11-03, CHIEF-LOG B2.3): the storyteller's section is
 * #being-asked, straight after the hero and before the film; the hero keeps
 * two actions; the Start free row under the film is gone, and the sample
 * call is a text link in Four moments; the call card sits at the top.
 *
 * Product truth (Bao's rulings, 2026-10-23): the calls ring in the A Story
 * iPhone app, in a private beta, and the parent installs it. Never a regular
 * phone call, never "no app". Voice clips are in development: the page says
 * so once and promises the card and the transcript.
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { SCENARIOS } from "../../lib/demoScripts";
import { BOOK } from "../../lib/pricing";
import CallStills from "./home/Listen";
import MemoryCard from "./app/MemoryCard";
import { ArrowIcon, Invitation, PageOpening, Picture } from "./kit/kit";
import Film from "./kit/Film";
import Scroller from "./kit/Scroller";
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Chapter,
  Frame,
  Lead,
  PrimaryLink,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import { color, display, font, media, shadow, space, type } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";
import { TODAY_NOTE } from "../../lib/today";

const love = SCENARIOS.find((s) => s.id === "love")!;
const QUESTION = "What did the garage smell like when you were fixing things?";

/* ── The opening's object: the call, as it arrives ────────────────────── */

const Slip = styled.figure`
  position: relative;
  width: min(100%, 820px);
  margin: 0;
  padding: clamp(30px, 3.2vw, 64px) clamp(28px, 3.2vw, 56px)
    clamp(26px, 2.6vw, 44px);
  color: ${color.primary};
  background: ${color.paperPure};
  box-shadow: ${shadow.lie};
  transform: rotate(-1.2deg);
  &::before {
    content: "";
    position: absolute;
    inset: clamp(8px, 0.8vw, 14px);
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  .when {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 14px;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  /* A slow ring: the dot breathes while the call waits to be answered. */
  .when i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${color.teal};
  }
  @media (prefers-reduced-motion: no-preference) {
    .when i {
      animation: ring 1.6s cubic-bezier(0.23, 1, 0.32, 1) infinite;
    }
  }
  @keyframes ring {
    0% {
      box-shadow: 0 0 0 0 color-mix(in srgb, ${color.teal} 55%, transparent);
    }
    100% {
      box-shadow: 0 0 0 14px transparent;
    }
  }
  blockquote {
    margin: clamp(18px, 2vw, 28px) 0 0;
    font: italic 400 ${display.md} / 1.16 ${font.display};
    letter-spacing: -0.01em;
    text-wrap: balance;
  }
  figcaption {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 6px 20px;
    margin-top: clamp(22px, 2.4vw, 34px);
    padding-top: 16px;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.bodyMuted};
  }
  figcaption b {
    font-weight: 500;
    color: ${color.primary};
  }
  /* On a phone the question is a statement, not a headline: 24px, three
     lines (jury 2 R2 U7, taste-skill's statement rule). */
  ${media.sm} {
    blockquote {
      font-size: 1.5rem;
    }
  }
  ${media.motion} {
    transform: none;
  }
`;

function CallSlip() {
  return (
    <Slip aria-label="A sample call arriving in the A Story app">
      <p className="when">
        <i aria-hidden="true" /> Tuesday, 10:00 · A Story is calling
      </p>
      <blockquote>“{QUESTION}”</blockquote>
      <figcaption>
        <span>
          <b>In the A Story app</b>, on their iPhone
        </span>
        <span>They answer, and talk.</span>
      </figcaption>
    </Slip>
  );
}

/* The call card sits at the top of its column, level with the title, so
   the right side of the hero is not an empty field above it (CHIEF-LOG
   B2.3). `display: contents` keeps the wrapper out of the layout. */
const HeroTop = styled.div`
  display: contents;
  section[data-variant="object"] .opening-grid:not(.solo) {
    align-items: start;
  }
  section[data-variant="object"] .opening-object {
    align-items: start;
  }
`;

/* ── Four moments, beside what one call leaves ─────────────────────────── */

const STEPS = [
  {
    who: "You",
    title: "Set it up once.",
    text: "Your parent installs A Story on their iPhone, and you choose the hour it rings. That is your whole job.",
  },
  {
    who: "Them",
    title: "Their phone rings.",
    text: "The call comes through the A Story app at that hour. They answer and talk. Nothing to type.",
  },
  {
    who: "A Story",
    title: "It listens, and follows.",
    text: "It follows what they actually say, and lets go when they say no. Each call becomes a memory to read.",
  },
  {
    who: "Everyone",
    title: "The family adds theirs.",
    text: "One link, no account. Their photos and versions sit beside the original, which stays as it was.",
  },
];

const Moments = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 140px);
    align-items: start;
    margin-top: calc(clamp(32px, 4vw, 64px) * var(--sy));
  }
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 0.32fr) minmax(0, 1fr);
    gap: 6px clamp(18px, 2.4vw, 40px);
    padding: clamp(18px, 2vw, 28px) 0;
    border-top: 1px solid ${color.primaryLine};
  }
  li:last-child {
    border-bottom: 1px solid ${color.primaryLine};
  }
  .sample {
    margin-top: ${space.md};
  }
  .who {
    padding-top: 0.55em;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  h3 {
    font: 400 ${display.md} / 1.1 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primary};
  }
  li p:not(.who) {
    margin-top: 8px;
    max-width: 40ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  /* What one call leaves: the card, and the typed sheet laid under it. */
  .leaves {
    position: relative;
    display: grid;
    gap: 0;
    padding-top: 6px;
  }
  .leaves > p.label {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
    margin-bottom: 14px;
  }
  .card {
    position: relative;
    z-index: 2;
    width: min(100%, 640px);
  }
  .sheet {
    position: relative;
    z-index: 1;
    width: min(92%, 560px);
    margin: -10px 0 0 auto;
    padding: 30px clamp(22px, 2.4vw, 34px) 26px;
    background: ${color.paperPure};
    box-shadow: 0 30px 50px -30px rgba(42, 31, 24, 0.55);
    transform: rotate(1deg);
  }
  .sheet-head {
    margin-bottom: 10px;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  .sheet p:not(.sheet-head) {
    padding: 10px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.primary};
  }
  .sheet time {
    display: block;
    margin-bottom: 2px;
    font: 500 ${type.label} / 1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  .kept {
    margin-top: 22px;
    max-width: 48ch;
    font: 400 ${type.note} / 1.55 ${font.ui};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    li {
      grid-template-columns: minmax(0, 1fr);
    }
    .who {
      padding-top: 0;
    }
  }
  ${media.motion} {
    .sheet {
      transform: none;
    }
  }
  /* Supervisor ruling (CHIEF-LOG, §4A length): on a phone the typed sheet
     stays out; the card and the "full transcript" note carry the claim. */
  @media (max-width: 640px) {
    .sheet {
      display: none;
    }
  }
`;

function FourMoments() {
  const ref = useReveals<HTMLElement>();
  return (
    <Moments ref={ref} $ground="ivory" $tight aria-labelledby="moments-title">
      <Frame>
        <SplitHead>
          <Statement id="moments-title" $size="lg" data-lines>
            Four moments. You’re in <em>the first.</em>
          </Statement>
          <Lead data-rise>
            Follow one family from the two-minute setup to everyone adding what
            they remember.
          </Lead>
        </SplitHead>
        <div className="row">
          <div data-rise>
            <ol>
              {STEPS.map((s) => (
                <li key={s.title}>
                  <p className="who">{s.who}</p>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {/* The one way to the sample calls (CHIEF-LOG B2.3). */}
            <p className="sample">
              <TextAnchor href="#calls">See a sample call</TextAnchor>
            </p>
          </div>
          <div className="leaves" data-rise="settle">
            <p className="label">What one call leaves, in the app</p>
            <MemoryCard
              className="card"
              memory={{
                photo: "/mission/02-640.webp",
                chapter: love.chapter,
                title: love.title,
                date: love.dateLine,
                words: love.excerpt,
                people: ["Joan", "Ray", "Paul"],
                teller: "Joan",
              }}
            />
            <div className="sheet" aria-label="The transcript, word for word">
              <p className="sheet-head">The transcript, word for word</p>
              {love.transcript.slice(0, 2).map((l, i) => (
                <p key={i}>
                  <time>
                    {l.at} · {l.who}
                  </time>
                  {l.text}
                </p>
              ))}
            </div>
            <p className="kept">
              Every call keeps the card and the full transcript. Clips in the
              storyteller’s own voice are in development. Joan is a sample.
            </p>
          </div>
        </div>
      </Frame>
    </Moments>
  );
}

/* ── For the storyteller ────────────────────────────────────────────────── */

/*
 * Harold's section (spec §4A): four lines for the person being asked, made
 * only of sentences already on the site, turned to "you":
 *   home/ThreeSteps.tsx:47  "It rings in the app at the hour you picked.
 *                            Nothing to type or save. They just talk."
 *   home/FamilyLoop.tsx:47  "Nothing appears until the storyteller says yes."
 *   the old nav hint        "Their story belongs to them."
 * No new facts (no call length, no device claim).
 */
const Asked = styled(Chapter)`
  .asked {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${space.lg} ${space.xxl};
  }
  ul {
    display: grid;
    gap: ${space.sm};
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.md} {
    .asked {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function BeingAsked() {
  return (
    <Asked
      id="being-asked"
      $ground="ivory"
      $tight
      aria-labelledby="asked-title"
    >
      <Frame className="asked">
        <Statement id="asked-title" $size="md">
          If you’re the one being asked.
        </Statement>
        <ul>
          <li>
            It rings in the app at the hour you picked. Nothing to type or
            save. You just talk.
          </li>
          <li>Nothing appears until you say yes.</li>
          <li>
            Your story belongs to you.{" "}
            <TextLink to="/privacy/">Read our privacy policy</TextLink>
          </li>
        </ul>
      </Frame>
    </Asked>
  );
}

/* ── Everyone has a way in ─────────────────────────────────────────────── */

const WAYS = [
  {
    k: "Telling about someone",
    t: "“Rose is here with me.”",
    d: "A cousin or an aunt talks with A Story about Rose. The questions turn around for them, and what they add is credited to them.",
  },
  {
    k: "Writing it down",
    t: "A companion for the blank page.",
    d: "A question to answer, another if that one doesn’t fit, and tidying that leaves your words yours.",
  },
  {
    k: "Already written",
    t: "Bring in the memoir.",
    d: "A Word or text file becomes one memory per chapter. A Story reads it first, so it never asks again what’s there.",
  },
  {
    k: "Together",
    t: "Call the family together.",
    d: "Up to four phones on one call in the app. Everyone talks, and A Story keeps what’s said.",
  },
];

/* Under the heading, one line from docs/mission.md "Phrases worth keeping",
   verbatim (spec S27): many voices on one moment. */
const NARRATORS = "Not one narrator, but everyone who was in the room.";

const Ways = styled(Chapter)`
  .narrators {
    margin-top: ${space.lg};
    font: italic 400 ${type.lead} / 1.4 ${font.display};
    color: ${color.primary};
  }
  .list {
    margin-top: calc(${space.xxl} * var(--sy));
  }
  /* A Scroller on a phone (spec §3.9: one row, the next way peeking). From
     641px the same list is a grid of four, then of two. */
  @media (min-width: 641px) {
    .scroller {
      margin-inline: 0;
      overflow: visible;
      mask-image: none;
    }
    .scroller .scroller-track {
      grid-auto-flow: row;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: ${space.xxl};
      width: auto;
      padding-inline: 0;
    }
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    .scroller .scroller-track {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  /* Spec §4A cut: three ways in at 390 (the fourth only from 641px). */
  @media (max-width: 640px) {
    .scroller li:nth-child(n + 4) {
      display: none;
    }
  }
  li {
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  h3 {
    margin-top: 12px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 10px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
`;

/* ── The book ──────────────────────────────────────────────────────────── */

const Volume = styled(Chapter)`
  .vol {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: center;
  }
  .vol img {
    display: block;
    width: 100%;
    max-width: 1100px;
    height: auto;
  }
  /* Running text, not a statement: six lines of display serif read as a
     headline (taste-skill statement rule). */
  .price {
    margin: 22px 0 28px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px 32px;
  }
  ${media.md} {
    .vol {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function HowItWorks() {
  const ways = useReveals<HTMLElement>();
  const volume = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story works - a conversation becomes a family archive"
        path="/how-it-works"
        description="Set it up once. A Story calls in its iPhone app, listens and follows what they actually say. See a sample call, then what the family keeps."
      />
      <HeroTop>
      <PhonePairs>
        <PageOpening
          variant="object"
          title={
            <>
              A Story does the <em>asking.</em>
            </>
          }
          lead="You set it up once and choose the hour. A Story calls, asks about their life and follows whatever they say."
          note={TODAY_NOTE}
          actions={
            <>
              {/* Two actions (CHIEF-LOG B2.3); the sample call is a text
                  link in Four moments. */}
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              <TextAnchor href="#film">Watch the film · 49 s</TextAnchor>
            </>
          }
          object={<CallSlip />}
        />
      </PhonePairs>
      </HeroTop>

      {/* The storyteller's door, straight after the hero (CHIEF-LOG B2.3);
          /join and the menu link to #being-asked. */}
      <BeingAsked />

      <Film />

      <FourMoments />

      {/* One gold word for every other h2 at most (spec §3.1): this title
          and "a way in" stay plain. */}
      <CallStills
        id="calls"
        more={false}
        title={<>Good listening changes the next question.</>}
      />

      <Ways ref={ways} $ground="paper" $tight aria-labelledby="ways-title">
        <Frame>
          <SplitHead>
            <div>
              <Statement id="ways-title" $size="lg" data-lines>
                Everyone in the family has a way in.
              </Statement>
              <p className="narrators">{NARRATORS}</p>
            </div>
            <Lead data-rise>
              Everyone who knows her stories can add their part, and a memoir
              someone typed years ago comes in as it is.
            </Lead>
          </SplitHead>
          <div className="list" data-rise>
            <Scroller label="Ways in">
              {WAYS.map((w) => (
                <li key={w.k}>
                  <small>{w.k}</small>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                </li>
              ))}
            </Scroller>
          </div>
        </Frame>
      </Ways>

      <Volume ref={volume} $ground="sand" $tight aria-labelledby="volume-title">
        <Frame className="vol">
          <div data-print data-drift="4">
            <Picture
              id="37"
              alt="An open A Story volume"
              sizes="(max-width: 860px) 92vw, 50vw"
            />
          </div>
          <div>
            <Statement id="volume-title" $size="lg" data-lines>
              When a chapter is ready, make it a <em>volume.</em>
            </Statement>
            <div data-rise>
              {/* Two sentences (spec §4A). The plans that include a
                  hardcover are on /pricing. */}
              <p className="price">
                The stories and photographs, bound as a book. Print it at home
                free, or order a printed edition from {BOOK.from} once ordering
                opens.
              </p>
              <div className="links">
                {/* /samples is a page in public/, outside the router: a plain anchor. */}
                <TextAnchor href="/samples">
                  Flip through three sample books
                </TextAnchor>
                <TextLink to="/pricing#book">See book options</TextLink>
              </div>
            </div>
          </div>
        </Frame>
      </Volume>

      <Invitation next={["/samples", "/pricing", "/for-families"]} />
    </>
  );
}

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
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Chapter,
  Frame,
  Lead,
  PrimaryLink,
  SecondaryAnchor,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import { color, display, font, media, shadow, type } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";

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
    font: italic 400 clamp(1.7rem, 1.1rem + 1.9vw, 3.4rem) / 1.16
      ${font.display};
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
  .who {
    padding-top: 0.55em;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
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
    letter-spacing: 0.16em;
    text-transform: uppercase;
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
    letter-spacing: 0.16em;
    text-transform: uppercase;
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
`;

function FourMoments() {
  const ref = useReveals<HTMLElement>();
  return (
    <Moments ref={ref} $ground="ivory" aria-labelledby="moments-title">
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
          <ol>
            {STEPS.map((s) => (
              <li key={s.title} data-rise>
                <p className="who">{s.who}</p>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
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
    t: "Bring in what’s already written.",
    d: "A Word or text file becomes one memory per chapter. A Story reads it first, so it never asks again what’s there.",
  },
  {
    k: "Together",
    t: "Call the family together.",
    d: "Up to four phones on one call in the app. Everyone talks, and A Story keeps what’s said.",
  },
];

const Ways = styled(Chapter)`
  ul {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 56px);
    margin: calc(clamp(28px, 3.4vw, 56px) * var(--sy)) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
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
  ${media.lg} {
    ul {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    ul {
      grid-template-columns: minmax(0, 1fr);
    }
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
    font: 400 clamp(1.15rem, 1.05rem + 0.35vw, 1.4rem) / 1.55 ${font.text};
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
      <PhonePairs>
        <PageOpening
          variant="object"
          title={
            <>
              A Story does the <em>asking.</em>
            </>
          }
          lead="You set it up once and choose the hour. A Story calls, asks about their life and follows whatever they say. For now the calls ring through the A Story app on iPhone, in a private beta. Writing, the family archive and the book work in any browser today."
          actions={
            <>
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              <SecondaryAnchor href="#calls">See a sample call</SecondaryAnchor>
            </>
          }
          object={<CallSlip />}
        />
      </PhonePairs>

      <FourMoments />

      <CallStills
        id="calls"
        more={false}
        title={
          <>
            Good listening changes the next <em>question.</em>
          </>
        }
      />

      <Ways ref={ways} $ground="paper" aria-labelledby="ways-title">
        <Frame>
          <SplitHead>
            <Statement id="ways-title" $size="lg" data-lines>
              Everyone in the family has a way <em>in.</em>
            </Statement>
            <Lead data-rise>
              Everyone who knows her stories can add their part, and a life story
              someone typed years ago comes in as it is.
            </Lead>
          </SplitHead>
          <ul>
            {WAYS.map((w) => (
              <li key={w.k} data-rise>
                <small>{w.k}</small>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </Frame>
      </Ways>

      <Volume ref={volume} $ground="sand" aria-labelledby="volume-title">
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
            <p className="price" data-rise>
              The stories and photographs, bound as a book. Print it at home
              free, or order a printed edition from {BOOK.from} once ordering
              opens. Individual, Family and Express include a Classic Hardcover.
            </p>
            <div className="links" data-rise>
              {/* /samples is a page in public/, outside the router: a plain anchor. */}
              <TextAnchor href="/samples">
                Flip through three sample books <ArrowIcon />
              </TextAnchor>
              <TextLink to="/pricing#book">
                See book options <ArrowIcon />
              </TextLink>
            </div>
          </div>
        </Frame>
      </Volume>

      <Invitation />
    </>
  );
}

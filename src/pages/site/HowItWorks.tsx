/**
 * How it works — shown, not told.
 *
 * Pass 11 set this page as three acts of text: steps as paragraphs, three
 * complete transcripts with margin notes, then the family's receipts. The
 * founder's verdict: "all text, and I can't retain anything." This version
 * is built so a reader leaves with five moments and three verbs:
 *
 * 1. The walkthrough — one phone stays on screen while five short steps
 *    scroll past it (You set it up · Their phone rings · It listens and
 *    follows · It becomes a memory · The family adds theirs), and the phone
 *    changes to that moment in the app. One line per step.
 * 2. The calls, played — the same three phones as Home (app/CallTrio.tsx):
 *    press play and watch it ask, listen, follow and remember.
 * 3. How deep it goes — the five rungs as a staircase, not a list.
 * 4. What the family receives — the card, the transcript and the voice as
 *    three objects, then the family adding to it.
 * 5. The book.
 *
 * Phase 2 (2026-10-23): the QR section, "She's not good with these things",
 * the shared "more ways" block and the family list under the receipts were
 * cut, and so was the five-rung "it goes deeper" staircase (the calls above
 * already show the follow-up) - each repeated a beat around it - and the claims were brought in line
 * with what the product does today (calls on iPhone in the private beta,
 * voice in development, hardcovers on the plans that include them).
 *
 * The complete annotated transcripts are gone from this page (the founder:
 * too lengthy); three short cards keep the point — the one move each call
 * turns on. A QR section shows how the family joins: scan the code, land on
 * the family's story (real Figma screens, public/app).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * VOICE IS AHEAD OF THE APP. demoScripts.ts says so in its header: storing
 * the storyteller's own audio is being built. Wherever this page shows the
 * voice layer it carries the "In development" mark. Do not remove it until
 * the app keeps the audio.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { SCENARIOS } from "../../lib/demoScripts";
import { BOOK } from "../../lib/pricing";
import CallStills from "./home/Listen";
import { AppShot, Phone } from "./app/Phone";
import { CallScreen, IncomingScreen } from "./app/screens";
import { ArrowIcon, Invitation, PageOpening, Picture, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import AppTour, { type TourStop } from "./kit/AppTour";
import {
  Chapter,
  Frame,
  Lead,
  PrimaryLink,
  SecondaryLink,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";

/* Everyone else in the family, on the app's own screens (added 2026-10-09;
   kit/AppTour.tsx says where the screens come from). */
const WAYS_IN: TourStop[] = [
  {
    shot: "talk",
    k: "Telling about someone",
    t: "“Rose is here with me.”",
    d: "A cousin or an aunt can talk with A Story about Rose. The questions turn around for them, and what they add is credited to them.",
    dark: true,
  },
  {
    shot: "write",
    k: "Writing it down",
    t: "A companion for the blank page.",
    d: "A question to answer out loud, another if that one doesn’t fit, and tidying that leaves your words yours.",
  },
  {
    shot: "import",
    k: "Already written",
    t: "Bring in the memoir.",
    d: "A Word or text file becomes one memory per chapter, and A Story reads it first, so it never asks again what’s there.",
  },
  {
    shot: "group-call",
    dark: true,
    k: "Together",
    t: "Call the family together.",
    d: "Up to four phones on one call. Everyone talks, and A Story keeps what’s said.",
  },
];

const love = SCENARIOS.find((s) => s.id === "love")!;
const QUESTION = "What did the garage smell like when you were fixing things?";

const Soon = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 3px 8px;
  border: 1px solid currentColor;
  border-radius: 2px;
  font: 600 13px/1.2 ${font.body};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: middle;
  color: ${color.accentText};
`;

/* ── The opening: a kitchen table, and the call arriving ──────────────── */

const OpeningArt = styled.div`
  position: relative;
  padding-bottom: 12%;
  .incoming {
    position: absolute;
    left: -8%;
    bottom: 0;
    filter: drop-shadow(0 30px 40px rgba(20, 12, 6, 0.35));
  }
  ${media.md} {
    padding-bottom: 0;
    .incoming {
      display: none;
    }
  }
`;

/* ── 1. The walkthrough ────────────────────────────────────────────────── */

const STEPS = [
  {
    who: "You",
    title: "Set it up once.",
    text: "Two minutes on their phone. Choose the hour A Story should ring - that’s your whole job.",
  },
  {
    who: "Them",
    title: "Their phone rings.",
    text: "Nothing to type and no password to remember. They answer and talk.",
  },
  {
    who: "A Story",
    title: "It listens, and follows.",
    text: "It follows what they actually say, and lets go when they say no.",
  },
  {
    who: "A Story",
    title: "It becomes a memory.",
    text: "A card to read, with every word they said underneath it.",
  },
  {
    who: "Everyone",
    title: "The family adds theirs.",
    text: "One link, no account. Their photos and versions sit beside the original - nothing replaces anything.",
  },
];

/**
 * Each moment on the founder's real Figma screens (public/app) where the
 * file draws one — Home, the memory page, the Archive with family
 * contributions waiting. The incoming call and the live call are moments the
 * file doesn't draw, so those two stay as HTML screens in the same style.
 */
function StepScreen({ n }: { n: number }) {
  if (n === 0) return <AppShot name="home" />;
  if (n === 1)
    return <IncomingScreen when="Tuesday, 10:00" question={QUESTION} />;
  if (n === 2)
    return (
      <CallScreen
        teller={love.teller}
        title={love.label}
        chapter={love.chapter}
        ask={love.script[2].text}
        answer={love.script[3].text}
        follow={love.script[4].text}
        kept={["The card", "The transcript", "Voice · in development"]}
      />
    );
  if (n === 3) return <AppShot name="memory" />;
  return <AppShot name="archive" scroll />;
}

/** Screens whose top is dark (the status bar sits on chocolate). */
const DARK_TOP = [0, 1];

const Walk = styled(Chapter)`
  .walk {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(32px, 6vw, 110px);
  }
  .sticky {
    align-self: start;
    position: sticky;
    top: calc(var(--nav-total, 80px) + 3vh);
    height: calc(100vh - var(--nav-total, 80px) - 6vh);
    display: grid;
    place-items: center;
  }
  .sticky .scr {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 500ms ease;
  }
  .sticky .scr.on {
    opacity: 1;
  }
  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }
  /* The thread down the side of the steps. */
  .steps::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10vh;
    bottom: 10vh;
    width: 1px;
    background: var(--line);
  }
  .step {
    position: relative;
    /* 74vh made five steps 3.7 screens on a laptop (2026-10-14); 50svh
       still made them 2.5 (2026-10-23). */
    min-height: 36svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: clamp(28px, 3vw, 48px);
  }
  .step::before {
    content: "";
    position: absolute;
    left: -5px;
    top: 50%;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${color.ivory};
    border: 1px solid ${color.primaryLineStrong};
    transition:
      background 400ms,
      border-color 400ms,
      transform 400ms;
  }
  .step.on::before {
    background: ${color.accent};
    border-color: ${color.accent};
    transform: scale(1.3);
  }
  /*
   * The step you are not on recedes by colour, not by opacity. At 0.3 the
   * heading fell to 1.7:1 against the ivory and the sentence under it to
   * 1.6 - a reader with low vision lost every step but one. Holding the ink
   * at the lighter chocolates keeps the same recession and stays readable.
   */
  @media (prefers-reduced-motion: no-preference) {
    .step:not(.on) > h3 {
      color: ${color.primaryLight};
    }
    .step:not(.on) > p:not(.num) {
      color: ${color.faint};
    }
    .step:not(.on) > .num b {
      color: color-mix(in srgb, ${color.accent} 46%, ${color.ivoryDeep});
    }
  }
  .step > h3,
  .step > p,
  .step > .num b {
    transition: color 500ms ease;
  }
  .num {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }
  .num b {
    font: 400 clamp(2.4rem, 1.6rem + 2vw, 3.6rem) / 1 ${font.display};
    color: ${color.accent};
    font-variant-numeric: lining-nums;
  }
  .num span {
    padding: 6px 12px;
    border-radius: 99px;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
    font: 600 13px/1 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .step > h3 {
    font: 400 ${display.lg} / 1.05 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .step > p:not(.num) {
    margin-top: 16px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.text};
    color: ${color.body};
    max-width: 34ch;
  }
  .mini {
    display: none;
  }
  ${media.md} {
    .walk {
      grid-template-columns: minmax(0, 1fr);
    }
    .sticky {
      display: none;
    }
    .step {
      min-height: 0;
      padding: 40px 0 40px 28px;
    }
    .mini {
      display: block;
      margin-top: 28px;
    }
  }
`;

function Walkthrough() {
  const [on, setOn] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const reveal = useReveals<HTMLElement>();

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>(".step");
    if (!items) return;
    // The step crossing the middle of the screen is the one the phone shows.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setOn(Number((e.target as HTMLElement).dataset.n));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Walk ref={reveal} $ground="ivory" aria-labelledby="walk-title">
      <Frame>
        <SplitHead>
          <div>
            <Statement id="walk-title" $size="xl" data-lines>
              Five moments. You’re in <em>one.</em>
            </Statement>
          </div>
          <Lead data-rise>
            From the first two minutes to the family adding what they remember -
            follow it on the phone.
          </Lead>
        </SplitHead>

        <div className="walk">
          <div className="sticky" aria-hidden="true">
            <Phone
              width="min(360px, calc((100svh - 200px) * 0.4756))"
              lightStatus={DARK_TOP.includes(on)}
            >
              {STEPS.map((_, n) => (
                <div key={n} className={`scr${on === n ? " on" : ""}`}>
                  <StepScreen n={n} />
                </div>
              ))}
            </Phone>
          </div>
          <ol className="steps" ref={list}>
            {STEPS.map((s, n) => (
              <li
                key={s.title}
                className={`step${on === n ? " on" : ""}`}
                data-n={n}
              >
                <p className="num">
                  <b aria-hidden="true">{String(n + 1).padStart(2, "0")}</b>
                  <span>{s.who}</span>
                </p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="mini" aria-hidden="true">
                  <Phone
                    width="min(240px, 70vw)"
                    lightStatus={DARK_TOP.includes(n)}
                  >
                    <StepScreen n={n} />
                  </Phone>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Frame>
    </Walk>
  );
}

/* ── 2. The call, played ───────────────────────────────────────────────── */

/* ── 4. What the family receives ───────────────────────────────────────── */

const Receives = styled(Chapter)`
  .objects {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 48px);
    margin-top: calc(clamp(32px, 4vw, 72px) * var(--sy));
  }
  .obj {
    display: flex;
    flex-direction: column;
  }
  .stage {
    display: grid;
    place-items: start center;
    height: clamp(300px, min(38vw, 50svh), 560px);
    overflow: hidden;
    padding-top: 28px;
    border-radius: 22px;
    background: radial-gradient(
      ellipse at 50% 100%,
      color-mix(in srgb, ${color.gold} 30%, ${color.ivory}),
      ${color.paperPure} 72%
    );
    mask-image: linear-gradient(#000 84%, transparent);
  }
  /* The transcript as a typed sheet, set down at a slight angle. */
  .sheet-stage {
    place-items: center;
    padding: 28px;
  }
  .sheet {
    width: min(100%, 340px);
    padding: 26px 26px 30px;
    background: ${color.paperPure};
    box-shadow: 0 30px 50px -30px rgba(42, 31, 24, 0.55);
    transform: rotate(-1.2deg);
  }
  .sheet-head {
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${color.primaryLineStrong};
    font: 600 13px/1.2 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .sheet p:not(.sheet-head) {
    padding: 9px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 15px/1.5 ${font.display};
    color: ${color.primary};
  }
  .sheet-head + p {
    border-top: 0 !important;
  }
  .sheet time {
    display: block;
    margin-bottom: 3px;
    font: 600 13px/1.2 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  /* Joan's words laid into the player where the Figma file has placeholder text. */
  .player-copy {
    position: absolute;
    left: 7cqw;
    right: 7cqw;
    top: 83cqw;
    display: grid;
    justify-items: center;
    gap: 1.6cqw;
    text-align: center;
  }
  .player-copy b {
    font: 700 6cqw/1.2 ${font.body};
    color: ${color.primary};
  }
  .player-copy span {
    font: 500 3.8cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
  }
  .player-copy q {
    margin-top: 3cqw;
    font: italic 400 4.4cqw/1.45 ${font.display};
    color: ${color.primary};
  }
  .obj > small {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.primary};
  }
  .obj > small i {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.ivory};
    font: 600 13px/1 ${font.body};
    font-style: normal;
    letter-spacing: 0;
  }
  .obj > small ${Soon} {
    margin-left: 0;
  }
  .cap {
    margin-top: 10px;
    font: 400 16px/1.55 ${font.text};
    color: ${color.body};
    max-width: 36ch;
  }
  .family {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: start;
    margin-top: calc(clamp(44px, 6vw, 120px) * var(--sy));
  }
  .family ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 12px;
  }
  .family li {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 16px 18px;
    border-radius: 14px;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
  }
  .initial {
    display: grid;
    place-items: center;
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 14px/1 ${font.body};
  }
  .family li p {
    font: 400 16px/1.5 ${font.text};
    color: ${color.body};
  }
  .family li small {
    display: block;
    margin-top: 4px;
    font: 600 13px/1.3 ${font.body};
    color: ${color.accentText};
  }
  ${media.lg} {
    .objects,
    .family {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── 5. The book ─────────────────────────────────────────────────────────── */

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
    height: auto;
  }
  .price {
    margin: 22px 0 28px;
    font: 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primary};
    max-width: 30ch;
  }
  .price b {
    font-weight: 500;
    color: ${color.accentText};
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
  const receives = useReveals<HTMLElement>();
  const waysIn = useReveals<HTMLElement>();
  const volume = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story works - a conversation becomes a family archive"
        path="/how-it-works"
        description="Set it up once. A Story calls, listens and follows what they actually say. Watch a call, then see what the family receives."
      />
      <PageOpening
        title={
          <>
            A Story does the <em>asking.</em>
          </>
        }
        lead="You set it up once and choose the hour. Then A Story calls, asks about their life and follows whatever they actually say. Calls ring on iPhone in our private beta. Writing, the family archive and the book work in your browser today."
        actions={
          <>
            <PrimaryLink to={START_HREF}>
              {START_LABEL} <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/how-it-works#calls">Watch a call</SecondaryLink>
          </>
        }
        media={
          <OpeningArt>
            <Print
              id="33"
              alt="Two adults talking across a kitchen table"
              sizes="(max-width: 860px) 92vw, 44vw"
              priority
            />
            <Phone className="incoming" width="min(200px, 16vw)" lightStatus>
              <IncomingScreen when="Tuesday, 10:00" question={QUESTION} />
            </Phone>
          </OpeningArt>
        }
      />

      <Walkthrough />

      <CallStills
        id="calls"
        more={false}
        title={
          <>
            Good listening changes the next <em>question.</em>
          </>
        }
      />

      <Receives ref={receives} $ground="sand" aria-labelledby="receives-title">
        <Frame>
          <SplitHead>
            <Statement id="receives-title" $size="lg" data-lines>
              Each call leaves a memory to <em>read.</em>
            </Statement>
            <Lead data-rise>
              The card is organized so it can be found again, and the transcript
              stays underneath it, word for word.
            </Lead>
          </SplitHead>

          {/* Illustrated with the app itself (founder's Figma, public/app):
              the memory page, the words underneath, and the voice player. */}
          <div className="objects">
            <article className="obj" data-rise>
              <div className="stage">
                <Phone width="min(300px, 86%)">
                  <AppShot name="memory" />
                </Phone>
              </div>
              <small>
                <i aria-hidden="true">1</i>The card
              </small>
              <p className="cap">
                A memory page to read - the date, the chapter, the voice, and
                who told it.
              </p>
            </article>
            <article className="obj" data-rise>
              <div className="stage sheet-stage">
                <div className="sheet">
                  <p className="sheet-head">{love.label} · transcript</p>
                  {love.transcript.slice(0, 3).map((l, i) => (
                    <p key={i}>
                      <time>
                        {l.at} · {l.who}
                      </time>
                      {l.text}
                    </p>
                  ))}
                </div>
              </div>
              <small>
                <i aria-hidden="true">2</i>The transcript
              </small>
              <p className="cap">
                Every word underneath, timed to the call. The card never
                replaces it.
              </p>
            </article>
            <article className="obj" data-rise>
              <div className="stage">
                <Phone width="min(300px, 86%)">
                  <AppShot name="player" />
                  <div className="player-copy">
                    <b>{love.label}</b>
                    <span>{love.chapter}</span>
                    <q>{love.excerpt}</q>
                  </div>
                </Phone>
              </div>
              <small>
                <i aria-hidden="true">3</i>
                {love.clip.label} · {love.clip.duration}
                <Soon>In development</Soon>
              </small>
              <p className="cap">{love.clip.note}</p>
            </article>
          </div>
        </Frame>
      </Receives>

      <Chapter ref={waysIn} $ground="paper" aria-labelledby="ways-in-title">
        <Frame>
          <SplitHead>
            <Statement id="ways-in-title" $size="lg" data-lines>
              Everyone in the family has a way <em>in.</em>
            </Statement>
            <Lead data-rise>
              The people who know her stories tell their part, the one who
              writes gets help, and whoever typed it up years ago doesn’t type
              it twice.
            </Lead>
          </SplitHead>
          <AppTour stops={WAYS_IN} />
        </Frame>
      </Chapter>

      <Volume ref={volume} $ground="paper" aria-labelledby="volume-title">
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
              The archive keeps growing after the book is printed.
            </p>
            <div className="links" data-rise>
              {/* /samples is a page in public/, outside the router: a plain anchor. */}
              <TextAnchor href="/samples">
                Flip through three sample books <ArrowIcon />
              </TextAnchor>
              <TextLink to="/pricing#book">
                See book options <ArrowIcon />
              </TextLink>
              <TextLink to="/guides">
                Conversation guides <ArrowIcon />
              </TextLink>
            </div>
          </div>
        </Frame>
      </Volume>

      <Invitation />
    </>
  );
}

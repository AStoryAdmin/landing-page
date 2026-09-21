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
 * 5. Built for the person, not the phone — and the book.
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
import { DEPTHS, SCENARIOS } from "../../lib/demoScripts";
import { PRICE } from "../../lib/pricing";
import CallTrio from "./app/CallTrio";
import { AppShot, Phone } from "./app/Phone";
import { CallScreen, IncomingScreen } from "./app/screens";
import { ArrowIcon, Invitation, PageOpening, Picture, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  PrimaryLink,
  SecondaryLink,
  SplitHead,
  Statement,
  TextLink,
  grounds,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const love = SCENARIOS.find((s) => s.id === "love")!;
const QUESTION = "What did the garage smell like when you were fixing things?";

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
    text: "Two minutes on their phone. Choose the hour A Story should ring — that’s your whole job.",
  },
  {
    who: "Them",
    title: "Their phone rings.",
    text: "No app to open, no typing, no password. They answer and talk.",
  },
  {
    who: "A Story",
    title: "It listens, and follows.",
    text: "Not a questionnaire. It follows what they actually say — or lets go when they say no.",
  },
  {
    who: "A Story",
    title: "It becomes a memory.",
    text: "A card to read, every word underneath it, and the voice itself.",
  },
  {
    who: "Everyone",
    title: "The family adds theirs.",
    text: "One link, no account. Their photos and versions sit beside the original — nothing replaces anything.",
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
  if (n === 3) return <AppShot name="memory" scroll />;
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
    min-height: 74vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: clamp(28px, 3vw, 48px);
    transition: opacity 500ms ease;
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
  @media (prefers-reduced-motion: no-preference) {
    .step:not(.on) {
      opacity: 0.3;
    }
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
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .step h3 {
    font: 400 ${display.lg} / 1.05 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .step p {
    margin-top: 16px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
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
      opacity: 1 !important;
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
            <Eyebrow>The whole thing</Eyebrow>
            <Statement id="walk-title" $size="xl" data-lines>
              Five moments. You’re in <em>one.</em>
            </Statement>
          </div>
          <Lead data-rise>
            From the first two minutes to the family adding what they remember —
            follow it on the phone.
          </Lead>
        </SplitHead>

        <div className="walk">
          <div className="sticky" aria-hidden="true">
            <Phone
              width="min(360px, calc((100vh - 200px) * 0.4756))"
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
                <p>
                  {s.text}
                  {n === 3 && <Soon>Voice · in development</Soon>}
                </p>
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

const Listen = styled.section`
  --ink: ${grounds.teal.ink};
  --muted: ${grounds.teal.muted};
  --line: ${grounds.teal.line};
  --mark: ${grounds.teal.mark};
  --label: ${grounds.teal.label};
  background: ${color.teal};
  color: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0 clamp(80px, 9vw, 140px);
  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
`;

/* ── Three moves worth noticing (was "Want every word?") ──────────────── */

/*
 * The complete annotated transcripts were a long wall of text under the
 * player; the founder asked to keep only the point. Each call turns on one
 * move — the three cards name it, quote the words it turned on, and say in a
 * line what happened (the scenario's own `watch` line).
 */
const MOVES = [
  {
    id: "faith",
    move: "Hears the aside",
    detail: "Even the winter she wouldn’t look at Father Dolan.",
  },
  {
    id: "childhood",
    move: "Takes the no",
    detail:
      "I’d rather not go into what she had, if that’s all right with you.",
  },
  { id: "love", move: "Follows the detail", detail: "All but one." },
];

const Moves = styled(Chapter)`
  .moves {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    margin-top: clamp(32px, 4vw, 56px);
  }
  .move {
    padding: clamp(24px, 2.6vw, 36px);
    border-top: 2px solid ${color.teal};
    background: ${color.paperPure};
  }
  .move small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .move blockquote {
    margin: 16px 0;
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
  }
  .move blockquote mark {
    color: inherit;
    background: linear-gradient(
        color-mix(in srgb, ${color.warmGold} 55%, transparent),
        color-mix(in srgb, ${color.warmGold} 55%, transparent)
      )
      0 90% / 100% 0.35em no-repeat;
  }
  .move p {
    font: 400 16px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    .moves {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── Share the family's code ────────────────────────────────────────────── */

/*
 * Scanning a family's QR code opens their story (Figma: "Hillestor Family's
 * Story" and The Archive, public/app). Shown as two real screens with a scan
 * line passing over the code, and three short steps.
 */
const Scan = styled(Chapter)`
  .scan {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: center;
  }
  .steps3 {
    list-style: none;
    margin: clamp(28px, 3vw, 44px) 0 0;
    padding: 0;
    counter-reset: s;
  }
  .steps3 li {
    counter-increment: s;
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 16px;
    align-items: baseline;
    padding: 16px 0;
    border-top: 1px solid var(--line);
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  .steps3 li::before {
    content: counter(s, decimal-leading-zero);
    font: 400 20px/1 ${font.display};
    color: ${color.accent};
  }
  .pair {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(12px, 2vw, 32px);
  }
  .arrow {
    display: grid;
    place-items: center;
    flex: none;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.ivory};
  }
  .arrow svg {
    width: 20px;
    height: 20px;
  }
  .qr {
    position: relative;
  }
  /* The camera's scan line, passing over the code. */
  .qr::after {
    content: "";
    position: absolute;
    left: 18%;
    right: 18%;
    top: 24%;
    height: 2px;
    background: ${color.accent};
    box-shadow: 0 0 12px 2px
      color-mix(in srgb, ${color.accent} 60%, transparent);
    opacity: 0;
  }
  @media (prefers-reduced-motion: no-preference) {
    .qr::after {
      animation: scanline 2.6s ease-in-out infinite;
    }
  }
  @keyframes scanline {
    0% {
      top: 24%;
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      top: 52%;
      opacity: 0;
    }
  }
  ${media.md} {
    .scan {
      grid-template-columns: minmax(0, 1fr);
    }
    .arrow {
      transform: rotate(90deg);
    }
    .pair {
      flex-direction: column;
    }
  }
`;

/* ── 3. How deep it goes ───────────────────────────────────────────────── */

/*
 * The five rungs drawn as a DESCENT. Pass 11e drew bars of rising height and
 * the founder couldn't read them. Here the section itself deepens as you read
 * down — ivory at the surface, teal at the bottom — and each rung is one real
 * question from the scripts (demoScripts.ts, quoted exactly), stepping further
 * in. A gauge on the left marks surface to depth.
 */
const RUNGS = [
  "A way in.",
  "Back in the room.",
  "The people in it.",
  "What it cost.",
  "What they make of it now.",
];
/** One real question per rung: [scenario id, turn index]. */
const RUNG_QUESTIONS: [string, number][] = [
  ["childhood", 2],
  ["faith", 6],
  ["faith", 10],
  ["childhood", 10],
  ["faith", 14],
];

const Depth = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  position: relative;
  padding: clamp(96px, 11vw, 176px) 0 clamp(110px, 12vw, 190px);
  /* Two clean tones, not a blend (any ivory→teal blend goes sage in the
     middle): the lower rungs sink below a curved "surface" into teal. */
  background: ${color.ivory};
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: 0;
    height: var(--below, 46%);
    background: ${color.teal};
    border-radius: 50% 50% 0 0 / 90px 90px 0 0;
  }
  > * {
    position: relative;
    z-index: 1;
  }
  .descent {
    position: relative;
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    gap: clamp(20px, 3vw, 48px);
    margin-top: clamp(48px, 6vw, 88px);
  }
  /* The gauge: surface to depth. */
  .gauge {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px 0;
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .gauge::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 26px;
    bottom: 26px;
    width: 2px;
    background: linear-gradient(
      ${color.warmGold},
      ${color.warmGold} 40%,
      ${color.ivory} 60%
    );
    border-radius: 2px;
  }
  .gauge span {
    padding-left: 20px;
  }
  .gauge span:first-child {
    color: ${color.primaryMid};
  }
  .gauge span:last-child {
    color: ${color.ivory};
  }
  .rungs {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: clamp(14px, 1.6vw, 22px);
  }
  .rung {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    gap: clamp(16px, 2vw, 28px);
    align-items: center;
    width: min(760px, 100%);
    margin-left: calc(var(--i) * clamp(0px, 5vw, 80px));
    padding: clamp(18px, 2vw, 26px) clamp(20px, 2.4vw, 32px);
    border-radius: 18px;
    background: ${color.paperPure};
    box-shadow: 0 30px 50px -36px rgba(20, 30, 32, 0.7);
  }
  .rung .n {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--nb);
    color: var(--nc);
    font: 400 26px/1 ${font.display};
    font-variant-numeric: lining-nums;
  }
  .rung header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
  }
  .rung b {
    font: 600 12px/1.2 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .rung header span {
    font: 400 14px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .rung q {
    display: block;
    margin-top: 8px;
    font: italic 400 clamp(1.1rem, 0.95rem + 0.5vw, 1.4rem) / 1.4
      ${font.display};
    color: ${color.primary};
  }
  .rung small {
    display: block;
    margin-top: 6px;
    font: 500 13px/1.3 ${font.body};
    color: ${color.accentText};
  }
  .bottom {
    margin-top: clamp(40px, 5vw, 64px);
    text-align: center;
    font: italic 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.ivory};
  }
  ${media.md} {
    .descent {
      grid-template-columns: minmax(0, 1fr);
    }
    .gauge {
      display: none;
    }
    .rung {
      margin-left: 0;
      grid-template-columns: 48px minmax(0, 1fr);
    }
    .rung .n {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }
  }
`;

/* ── 4. What the family receives ───────────────────────────────────────── */

const Receives = styled(Chapter)`
  .objects {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    margin-top: clamp(40px, 5vw, 72px);
  }
  .obj {
    display: flex;
    flex-direction: column;
  }
  .obj > small {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .obj > small i {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.ivory};
    font: 600 12px/1 ${font.body};
    font-style: normal;
    letter-spacing: 0;
  }
  .face {
    flex: 1;
    padding: clamp(22px, 2.4vw, 32px);
    border-radius: 18px;
    background: ${color.paperPure};
    box-shadow: 0 24px 50px -30px rgba(42, 31, 24, 0.45);
  }
  .card h4 {
    font: 700 20px/1.25 ${font.body};
    color: ${color.primary};
  }
  .card .meta {
    margin: 6px 0 14px;
    font: 500 13px/1.3 ${font.body};
    color: ${color.accentText};
  }
  .card p {
    font: 400 16px/1.6 ${font.body};
    color: ${color.body};
  }
  .transcript p {
    padding: 10px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 16px/1.5 ${font.display};
    color: ${color.primary};
  }
  .transcript p:first-child {
    border-top: 0;
    padding-top: 0;
  }
  .transcript time {
    display: block;
    margin-bottom: 4px;
    font: 600 11px/1.2 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .voice {
    display: flex;
    flex-direction: column;
    background: ${color.teal};
    color: ${color.ivory};
  }
  .wave {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 64px;
    margin-bottom: 20px;
  }
  .wave i {
    flex: 1;
    border-radius: 2px;
    background: ${color.warmGold};
    opacity: 0.85;
  }
  .voice blockquote {
    margin: 0;
    font: italic 400 20px/1.45 ${font.display};
  }
  .voice p {
    margin-top: auto;
    padding-top: 16px;
    font: 500 13px/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .voice ${Soon} {
    margin: 0 0 14px;
    align-self: flex-start;
    color: ${color.gold};
  }
  .family {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: start;
    margin-top: clamp(64px, 8vw, 120px);
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
    font: 400 16px/1.5 ${font.body};
    color: ${color.body};
  }
  .family li small {
    display: block;
    margin-top: 4px;
    font: 600 12px/1.3 ${font.body};
    color: ${color.accentText};
  }
  ${media.lg} {
    .objects,
    .family {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── 5. Built for the person, and the book ─────────────────────────────── */

const Person = styled(Chapter)`
  .person {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: center;
  }
  .quote {
    font: italic 400 ${display.xl} / 1.05 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .quote span {
    display: block;
    margin-top: 0.2em;
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  .nos {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nos li {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .nos li::before {
    content: "";
    width: 22px;
    height: 1.5px;
    background: ${color.accent};
  }
  .nos + p {
    margin-top: 24px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
  }
  ${media.md} {
    .person {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

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
  const listen = useReveals<HTMLElement>();
  const moves = useReveals<HTMLElement>();
  const scan = useReveals<HTMLElement>();
  const depth = useReveals<HTMLElement>();
  const receives = useReveals<HTMLElement>();
  const person = useReveals<HTMLElement>();
  const volume = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story works — a conversation becomes a family archive"
        path="/how-it-works"
        description="Set it up once. A Story calls, listens and follows what they actually say. Watch a call, then see what the family receives."
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

      <Listen ref={listen} id="calls" aria-labelledby="calls-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Watch a call</Eyebrow>
              <Statement id="calls-title" $size="xl" data-lines>
                Good listening changes the next <em>question.</em>
              </Statement>
            </div>
            <p className="lead" data-rise>
              Every question comes from the app’s own bank. Each call turns on a
              different move — pick one and watch.
            </p>
          </SplitHead>
          <CallTrio />
        </Frame>
      </Listen>

      <Moves ref={moves} $ground="paper" $tight aria-labelledby="moves-title">
        <Frame>
          <Statement id="moves-title" $size="md" data-lines>
            Three calls, three <em>moves.</em>
          </Statement>
          <div className="moves">
            {MOVES.map((m) => {
              const s = SCENARIOS.find((x) => x.id === m.id)!;
              return (
                <article key={m.id} className="move" data-rise>
                  <small>
                    {s.teller} · {m.move}
                  </small>
                  <blockquote>
                    “<mark>{m.detail}</mark>”
                  </blockquote>
                  <p>{s.watch}</p>
                </article>
              );
            })}
          </div>
        </Frame>
      </Moves>

      <Depth ref={depth} aria-labelledby="depth-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>How deep it goes</Eyebrow>
              <Statement id="depth-title" $size="lg" data-lines>
                It goes deeper, one step at a <em>time.</em>
              </Statement>
            </div>
            <Lead data-rise>
              The interview only goes a step further once the one before has
              been answered — which is why the last question lands.
            </Lead>
          </SplitHead>
          <div className="descent">
            <p className="gauge" aria-hidden="true">
              <span>Surface</span>
              <span>Deep</span>
            </p>
            <ol className="rungs">
              {DEPTHS.map((d, i) => {
                const [id, turn] = RUNG_QUESTIONS[i];
                const sc = SCENARIOS.find((x) => x.id === id)!;
                return (
                  <li
                    key={d}
                    className="rung"
                    data-rise
                    style={{
                      ["--i" as string]: i,
                      ["--nb" as string]: [
                        color.sand,
                        color.sand,
                        color.warmGold,
                        color.teal,
                        color.teal,
                      ][i],
                      ["--nc" as string]: i >= 3 ? color.ivory : color.primary,
                    }}
                  >
                    <span className="n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <header>
                        <b>{d}</b>
                        <span>{RUNGS[i]}</span>
                      </header>
                      <q>{sc.script[turn].text}</q>
                      <small>Asked of {sc.teller}</small>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="bottom" data-rise>
            By the last step, they’re telling you what it all meant.
          </p>
        </Frame>
      </Depth>

      <Receives ref={receives} $ground="sand" aria-labelledby="receives-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>What the family receives</Eyebrow>
              <Statement id="receives-title" $size="xl" data-lines>
                A memory to read. Every word underneath. The <em>voice.</em>
              </Statement>
            </div>
            <Lead data-rise>
              The card is organised so it can be found again. It never replaces
              what was said — the transcript stays underneath it.
            </Lead>
          </SplitHead>

          <div className="objects">
            <article className="obj" data-rise>
              <small>
                <i aria-hidden="true">1</i>The card
              </small>
              <div className="face card">
                <h4>{love.label}</h4>
                <p className="meta">
                  {love.chapter} · {love.dateLine}
                </p>
                <p>
                  {love.summary
                    .split(/(?<=\.)\s+/)
                    .slice(0, 2)
                    .join(" ")}
                </p>
              </div>
            </article>
            <article className="obj" data-rise>
              <small>
                <i aria-hidden="true">2</i>The transcript
              </small>
              <div className="face transcript">
                {love.transcript.slice(0, 3).map((l, i) => (
                  <p key={i}>
                    <time>
                      {l.at} · {l.who}
                    </time>
                    {l.text}
                  </p>
                ))}
              </div>
            </article>
            <article className="obj" data-rise>
              <small>
                <i aria-hidden="true">3</i>
                {love.clip.label} · {love.clip.duration}
              </small>
              <div className="face voice">
                <Soon>In development</Soon>
                <span className="wave" aria-hidden="true">
                  {Array.from({ length: 36 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        height: `${22 + Math.abs(Math.sin(i * 1.7) * 60 + Math.cos(i * 0.6) * 18)}%`,
                      }}
                    />
                  ))}
                </span>
                <blockquote>“{love.excerpt}”</blockquote>
                <p>{love.clip.note}</p>
              </div>
            </article>
          </div>

          <div className="family">
            <div data-rise>
              <Statement as="h3" $size="md">
                Then the family adds what they <em>know.</em>
              </Statement>
              <Lead style={{ marginTop: 16 }}>{love.shared}</Lead>
            </div>
            <ul>
              {love.family.map((f) => (
                <li key={f.name} data-rise>
                  <span className="initial" aria-hidden="true">
                    {f.name.replace(/^(Her|His) \w+ /, "")[0]}
                  </span>
                  <div>
                    <p>
                      <b>{f.name}</b> {f.text}
                    </p>
                    <small>
                      {f.pending ??
                        (f.kind === "edit" ? "Invited · can edit" : "Added")}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </Receives>

      <Scan ref={scan} $ground="ivory" aria-labelledby="scan-title">
        <Frame className="scan">
          <div>
            <Eyebrow>Bring the family in</Eyebrow>
            <Statement id="scan-title" $size="lg" data-lines>
              One scan, and they’re <em>in the story.</em>
            </Statement>
            <ol className="steps3" data-rise>
              <li>Open your family’s code in the app.</li>
              <li>They scan it with their phone camera.</li>
              <li>They land on your family’s story — and can add their own.</li>
            </ol>
          </div>
          <div className="pair" data-rise>
            <div className="qr">
              <Phone width="min(260px, 40vw)">
                <AppShot name="qr" />
              </Phone>
            </div>
            <span className="arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
            <Phone width="min(260px, 40vw)">
              <AppShot name="archive" scroll />
            </Phone>
          </div>
        </Frame>
      </Scan>

      <Person ref={person} $ground="ivory" aria-labelledby="person-title">
        <Frame className="person">
          <div>
            <Eyebrow>Built for the person, not the phone</Eyebrow>
            <h2 id="person-title" className="quote" data-lines>
              “She’s not good with these things.”
              <span>Good. Neither is this.</span>
            </h2>
          </div>
          <div data-rise>
            <ul className="nos">
              <li>No dashboard</li>
              <li>No typing</li>
              <li>No password to remember</li>
            </ul>
            <p>
              The app is installed once — by you, if you like — and after that A
              Story rings them at the hour they chose.
            </p>
          </div>
        </Frame>
      </Person>

      <Volume ref={volume} $ground="paper" aria-labelledby="volume-title">
        <Frame className="vol">
          <div data-print>
            <Picture
              id="37"
              alt="An open A Story volume"
              sizes="(max-width: 860px) 92vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>And when you’re ready</Eyebrow>
            <Statement id="volume-title" $size="lg" data-lines>
              When a chapter is ready, make it a <em>volume.</em>
            </Statement>
            <p className="price" data-rise>
              A beautifully bound edition of the stories, photographs and voices
              that shaped it — <b>{PRICE.book}</b> for {PRICE.bookPages}. The
              archive keeps growing after the book is printed.
            </p>
            <div className="links" data-rise>
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

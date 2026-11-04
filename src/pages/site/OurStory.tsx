/**
 * Our story - two letters on the bench.
 *
 * Phase 2 (2026-10-23, "need serious check... condense my part much harder"):
 * the page is the web app's world. One stretch of chocolate bookcloth holds
 * the opening (the headline beside two album prints) and the founders' two
 * notes, side by side on a wide screen as sheets of the book's paper; on a
 * phone they stack. Then one closing line on the ivory page with the two
 * doors. About 3.5 screens at 1920x1080 (5.4 before, with the shared
 * invitation band, which this page no longer repeats under its own close).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DANIEL'S LETTER IS VERBATIM from the earliest site (09142026, architecture
 * baseline, story.tsx: "A note from Daniel Hoang Nguyen"). Don't edit it.
 * BAO'S LETTER is his own text, condensed 2026-10-23 (Codex draft checked
 * against WRITING-VOICE.md). Keep it exactly.
 * The gold highlighter marks were dropped in review (2026-10-23).
 * The sheets carry no titles of their own: both earlier titles repeated a
 * line of the letter beneath them.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Each note is signed by hand at its foot, with a small round portrait of
 * its writer and one line of credentials (Bao's ruling, 2026-10-23: a
 * round portrait, never a posed hero). The "why now" band of statistics
 * was removed in panel round 2 (CHIEF-LOG B1.4). The prints are illustrative album photographs (public/our-story,
 * from the pitch decks, and mission 34).
 */
import { useLayoutEffect, useRef, type ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, Bond } from "./kit/kit";
import { Actions, Frame, PrimaryLink, SecondaryLink } from "./kit/kit.styles";
import { color, display, font, media, space, type } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";
import { DEMO_EMAIL } from "../../lib/demoRequest";
import { useScene } from "../../lib/scrollMotion";
import { Snapshot } from "./our-story/Snapshot";
import { benchCloth, benchVars } from "./our-story/bench";
import { cssOut, layDown, riseIn } from "./our-story/motion";

/* The printed frame of the book's page: a foil hairline with a corner
   flourish at each corner (web-app astory.css `.page-frame`). */
const corner = (t: string) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g fill='none' stroke='${color.gold}' stroke-width='1' transform='${t}'><path d='M2 30 V12 C2 6 6 2 12 2 H30'/><path d='M7 30 V14 C7 10 10 7 14 7 H30' stroke-width='.7'/><circle cx='12' cy='12' r='1.6' fill='${color.gold}' stroke='none'/></g></svg>`,
  )}")`;

const Bench = styled.section`
  ${benchCloth};
  ${benchVars};
  position: relative;
  overflow: clip;
  padding: calc(clamp(56px, 6vw, 110px) * var(--sy)) 0
    calc(clamp(64px, 7vw, 128px) * var(--sy));

  /* ── The opening: the headline beside two album prints ── */
  .opening {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
    gap: clamp(32px, 5vw, 96px);
    align-items: center;
  }
  /* The headline is sized by its own column, so it keeps to two lines at
     every width (taste-skill rule 1): about twenty characters a line. */
  .opening > div:first-child {
    container-type: inline-size;
  }
  h1 {
    font: 500 clamp(2.2rem, 10.4cqi, 6rem) / 1 ${font.display};
    letter-spacing: -0.022em;
    color: ${color.ivory};
    text-wrap: balance;
  }
  h1 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.goldDeep};
  }
  .lead {
    margin-top: clamp(20px, 2.2vw, 32px);
    max-width: 40ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.onDarkMuted};
  }
  .who {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 26px;
    margin-top: clamp(22px, 2.4vw, 34px);
    font: 500 ${type.note} / 1.4 ${font.body};
    color: ${color.onDarkFaint};
  }
  .who a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    color: ${color.ivory};
    text-decoration: none;
  }
  .who a span {
    background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px
      no-repeat;
    transition: background-size 240ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .who a:hover span {
      background-size: 100% 1px;
    }
  }
  .who svg {
    width: 14px;
    height: 14px;
    transform: rotate(90deg);
    color: ${color.gold};
  }

  .prints {
    position: relative;
    min-height: 0;
    padding: 0 0 clamp(40px, 6vw, 110px) clamp(0px, 4vw, 80px);
  }
  .prints .album {
    width: min(100%, 640px);
    margin-left: auto;
  }
  /* The caption sits clear of the smaller print laid over the album's edge. */
  .prints .album figcaption {
    justify-content: flex-end;
    padding-right: 10px;
  }
  .prints .table {
    position: absolute;
    left: 0;
    top: 46%;
    width: min(42%, 280px);
  }

  /* ── The two notes, side by side on the bench ── */
  .letters {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 3.4vw, 64px);
    align-items: stretch;
    margin-top: calc(clamp(56px, 6vw, 110px) * var(--sy));
  }
  /* Bond, the founder's dog, asleep on the letters' ledge: the one place he
     appears on the marketing site off home (spec §3.8, §4D). */
  .letters > img {
    z-index: 3;
  }

  ${media.lg} {
    .opening {
      grid-template-columns: minmax(0, 1fr);
    }
    .prints {
      max-width: 720px;
    }
    .letters {
      grid-template-columns: minmax(0, 1fr);
      max-width: 760px;
      margin-inline: auto;
    }
  }
  /* Phones (spec §4D, ≤ 5 screens at 390 with the letters folded): the
     bench's spacing tightens; the letters' words are untouched. */
  ${media.sm} {
    padding: calc(${space.xl} * var(--sy)) 0 calc(${space.xl} * var(--sy));
    .letters {
      margin-top: calc(${space.xl} * var(--sy));
    }
    .prints {
      padding: 0 0 72px;
    }
    .prints .album {
      width: 94%;
    }
    .prints .table {
      width: 52%;
    }
  }
`;

/* A sheet of the book's paper, set like the printed page. */
const Sheet = styled.article<{ $tilt: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(36px, 3.6vw, 64px) clamp(26px, 3.6vw, 64px)
    clamp(36px, 3.4vw, 60px);
  color: ${color.primary};
  background: ${color.paperPure};
  transform: rotate(${({ $tilt }) => $tilt}deg);
  box-shadow:
    0 1px 0 ${color.ivory},
    0 2px 0 ${color.ivoryDeep},
    0 24px 50px -24px rgba(16, 10, 6, 0.7);
  &::before {
    content: "";
    position: absolute;
    inset: 14px;
    pointer-events: none;
    border: 1px solid color-mix(in srgb, ${color.gold} 40%, transparent);
    background:
      ${corner("")} top left / 24px no-repeat,
      ${corner("translate(32 0) scale(-1 1)")} top right / 24px no-repeat,
      ${corner("translate(0 32) scale(1 -1)")} bottom left / 24px no-repeat,
      ${corner("translate(32 32) scale(-1 -1)")} bottom right / 24px no-repeat;
  }
  > * {
    position: relative;
  }

  /* The note is signed by hand at its foot: the name in the house's
     handwriting, the role and where to find the writer under it. */
  .sign {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 6px 20px;
    margin-top: auto;
    padding-top: clamp(22px, 2.4vw, 36px);
  }
  /* The writer: a small round portrait beside the signature (a round
     portrait, never a hero; DESIGN-TASTE), then the role and one line of
     credentials (Bao's ruling, 2026-10-23). */
  .who-signs {
    display: flex;
    align-items: center;
    gap: clamp(14px, 1.4vw, 20px);
    min-width: 0;
  }
  .who-signs img {
    flex: none;
    width: clamp(56px, 4.4vw, 68px);
    height: clamp(56px, 4.4vw, 68px);
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 30%;
    box-shadow:
      0 0 0 3px ${color.paperPure},
      0 0 0 4px color-mix(in srgb, ${color.gold} 60%, transparent);
  }
  .sign b {
    display: block;
    font: 500 ${display.md} / 1 ${font.script};
    color: ${color.primary};
    transform: rotate(-2deg);
    transform-origin: left bottom;
  }
  .sign small {
    display: block;
    margin-top: 8px;
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  .sign .cred {
    margin-top: 6px;
    max-width: 42ch;
    font: 400 ${type.note} / 1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .sign a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 2px;
    font: 500 ${type.note} / 1 ${font.body};
    color: ${color.bodyMuted};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.gold} 70%, transparent);
    text-underline-offset: 5px;
    transition: color 160ms ${cssOut};
  }
  @media (hover: hover) and (pointer: fine) {
    .sign a:hover {
      color: ${color.primary};
    }
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  p.body {
    font: 400 ${type.read} / 1.66 ${font.text};
    color: ${color.primary};
  }
  p.body + p.body {
    margin-top: 0.95em;
  }
  p.body.turn,
  p.body.turn + p.body {
    margin-top: 1.1em;
  }
  /* Drop caps only on a wide screen (spec §4D); on a phone the letter
     starts as plain text. */
  ${media.up.md} {
    p.first::first-letter {
      float: left;
      margin: 0.06em 0.1em 0 0;
      font: 400 3.5em/0.8 ${font.display};
      color: ${color.teal};
    }
  }
  p.body.turn {
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.accent};
  }
  /* The rest of the letter. On a phone it folds after the first three
     paragraphs ("Read the whole letter"); on a wide screen it is always
     open and the fold's summary is not shown. The words are all in the DOM
     either way. */
  .more > summary {
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    min-height: 44px;
    margin-top: ${space.md};
    font: 600 ${type.note} / 1.3 ${font.ui};
    color: ${color.primary};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.gold} 70%, transparent);
    text-underline-offset: 5px;
    cursor: pointer;
    list-style: none;
  }
  .more > summary::-webkit-details-marker {
    display: none;
  }
  .more[open] > summary {
    display: none;
  }
  .more > p.body:first-of-type {
    margin-top: 0.95em;
  }
  ${media.up.md} {
    .more > summary {
      display: none;
    }
  }
  ${media.lg} {
    transform: none;
  }
  ${media.sm} {
    padding: 34px 24px 32px;
    &::before {
      inset: 9px;
    }
    .sign {
      gap: 2px 16px;
    }
  }
`;

/* ── The close, on the ivory page ── */
const Close = styled.section`
  --ink: ${color.primary};
  --muted: ${color.bodyMuted};
  --mark: ${color.accent};
  background: ${color.ivory};
  color: ${color.primary};
  padding: calc(clamp(64px, 7vw, 128px) * var(--sy)) 0;
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
    gap: clamp(36px, 6vw, 120px);
    align-items: center;
  }
  .dock {
    width: min(100%, 560px);
    justify-self: end;
  }
  h2 {
    font: 400 ${display.lg} / 1.04 ${font.display};
    letter-spacing: -0.022em;
    max-width: 16ch;
    text-wrap: balance;
  }
  h2 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  p {
    margin-top: clamp(18px, 2vw, 28px);
    max-width: 42ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.bodyMuted};
  }
  p.write {
    margin-top: 14px;
    font: 400 ${type.note} / 1.55 ${font.body};
  }
  p.write a {
    display: inline-block;
    padding: 10px 0;
    color: ${color.primary};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.gold} 70%, transparent);
    text-underline-offset: 4px;
    overflow-wrap: anywhere;
  }
  .doors {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 18px;
    margin-top: clamp(26px, 3vw, 40px);
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .dock {
      justify-self: start;
      width: min(92%, 520px);
    }
  }
  /* Premium pass (spec §4D, ≤ 5 screens at 390): on a phone the close is
     the words and the two doors; the dock print shows from 641px up. The
     doors are the kit's Actions, so on a phone the secondary is a text link
     under the full-width primary (spec §3.3). */
  ${media.sm} {
    padding: calc(${space.xl} * var(--sy)) 0;
    .dock {
      display: none;
    }
  }
`;

/**
 * The rest of a letter (premium pass, spec §4D): folded on a phone behind
 * "Read the whole letter", always open on a wide screen. The prerender
 * (1280 wide) captures it open, so every word is in the static HTML.
 */
const PHONE = "(max-width: 860px)";
function Fold({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    const mq = window.matchMedia(PHONE);
    const set = () => {
      d.open = !mq.matches;
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return (
    <details ref={ref} className="more" open>
      <summary>Read the whole letter</summary>
      {children}
    </details>
  );
}

function Note({
  from,
  name,
  role,
  cred,
  photo,
  link,
  tilt,
  children,
}: {
  from: string;
  name: string;
  role: string;
  cred: string;
  photo: string;
  link: string;
  tilt: number;
  children: ReactNode;
}) {
  const id = `note-${from.toLowerCase()}`;
  return (
    <Sheet $tilt={tilt} aria-labelledby={id} data-sheet>
      <h2 className="sr" id={id}>
        A note from {name}
      </h2>
      {children}
      <footer className="sign">
        <div className="who-signs">
          <img
            src={photo}
            alt={name}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
          />
          <div>
            <b>{name}</b>
            <small>{role}</small>
            <p className="cred">{cred}</p>
          </div>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </footer>
    </Sheet>
  );
}

export default function OurStory() {
  const bench = useScene<HTMLElement>((root) => {
    /* Panel round 2 (CHIEF-LOG B1.1): the title, lead and note links are
       there on first paint; only the prints are laid down. */
    layDown([...root.querySelectorAll(".prints [data-snap]")], { delay: 0.2 });
    layDown([...root.querySelectorAll("[data-sheet]")], {
      trigger: root.querySelector(".letters") ?? undefined,
      start: "top 88%",
    });
  });
  const close = useScene<HTMLElement>((root) => {
    layDown([...root.querySelectorAll("[data-snap]")]);
    riseIn([...root.querySelectorAll("h2, p, .doors")], {
      trigger: root.querySelector(".row") ?? undefined,
    });
  });

  return (
    <>
      <EditorialSeo
        title="Our story"
        path="/our-story"
        description="Why Daniel Hoang Nguyen and Bao Vo are building A Story: a place for the conversations, memories, and voices a family wants to keep."
      />
      <Bench ref={bench} aria-labelledby="story-title">
        <Frame>
          <div className="opening">
            <div>
              <h1 id="story-title">
                The conversations we thought <em>could wait.</em>
              </h1>
              <p className="lead">
                Why Daniel Hoang Nguyen and Bao Vo are building a place for the
                conversations, memories and voices a family wants to keep.
              </p>
              <p className="who">
                <a href="#note-daniel">
                  <ArrowIcon />
                  <span>Daniel’s note</span>
                </a>
                <a href="#note-bao">
                  <ArrowIcon />
                  <span>Bao’s note</span>
                </a>
              </p>
            </div>
            <div className="prints">
              <Snapshot
                className="album"
                src="/our-story/album-1100.webp"
                srcSet="/our-story/album-640.webp 640w, /our-story/album-1100.webp 1100w"
                width={1100}
                height={825}
                sizes="(max-width: 1024px) 90vw, 640px"
                alt="Older hands turning the pages of a family album from the 1960s, loose snapshots on the kitchen table"
                caption="Which summer was this?"
                tilt={-2.4}
                priority
              />
              <Snapshot
                className="table"
                id="34"
                sizes="(max-width: 640px) 52vw, 300px"
                alt="A family leaning over old photographs spread across a dining table, one of them pointing"
                tilt={4}
              />
            </div>
          </div>

          <div className="letters">
            <Bond pose="sleep" ledge="right" width={112} />
            <Note
              from="Daniel"
              name="Daniel Hoang Nguyen"
              role="Co-founder & CEO"
              cred="BS Mathematics and Data Science, Bowling Green State University"
              photo="/our-story/daniel-320.webp"
              link="https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/"
              tilt={-0.5}
            >
              <p className="body first">
                Two of my uncles had strokes within months of each other. They
                lived - I want to say that first, because what follows is not a
                story about dying.
              </p>
              <p className="body">
                I watched men who had carried our family’s history, who knew the
                names and the reasons and the way we got here, struggle to find
                words that had always come easily.
              </p>
              <p className="body turn">I had never thought to ask.</p>
              <Fold>
                <p className="body">
                  I did not know how my grandparents met. I did not know what my
                  uncles had been afraid of, or proudest of, or what they would
                  have done differently. I am a finance researcher. I had spent
                  years learning to understand systems, without turning that same
                  attention toward the people who made my life.
                </p>
                <p className="body">
                  So I started building A Story: someone to ask, time to listen,
                  and a place for a family to keep the answers.
                </p>
              </Fold>
            </Note>

            <Note
              from="Bao"
              name="Bao Vo"
              role="Co-founder, COO & CTO"
              cred="MS ECE, University of Michigan, doctoral fellow. Market-entry strategy for four biotech startups."
              photo="/our-story/bao-320.webp"
              link="https://www.linkedin.com/in/gbaovo/"
              tilt={0.45}
            >
              <p className="body first">
                In my family, a story rarely belonged to one person. Someone
                would start telling it at dinner. Someone else would interrupt,
                because they remembered it differently. A name would get
                corrected. Most of what we heard stayed in that room.
              </p>
              <p className="body">
                Both of my grandfathers were soldiers during the Vietnam War. My
                parents built a life in Saigon from almost nothing.
              </p>
              <p className="body turn">
                I knew what happened. I didn’t always know what it felt like.
              </p>
              <Fold>
                <p className="body">
                  I want A Story to keep all of that without asking a family to
                  become archivists. My parents should just be able to talk.
                </p>
                <p className="body turn">
                  A family is not a résumé. A life shouldn’t become one when we
                  preserve it.
                </p>
              </Fold>
            </Note>
          </div>
        </Frame>
      </Bench>

      <Close ref={close} aria-labelledby="close-title">
        <Frame className="row">
          <Snapshot
            className="dock"
            src="/our-story/dock-1100.webp"
            srcSet="/our-story/dock-640.webp 640w, /our-story/dock-1100.webp 1000w"
            width={1000}
            height={750}
            sizes="(max-width: 860px) 90vw, 560px"
            alt="A summer in the early 1960s: a boy jumps off a wooden dock into a lake while three girls laugh and cheer"
            caption="Everyone on the dock saw a different jump."
            tilt={-2}
          />
          <div>
            <h2 id="close-title">
              A family archive is <em>never finished.</em>
            </h2>
            <p>
              What began as a way to preserve older stories became a place for
              the whole family’s memories.
            </p>
            <p className="write">
              Write to us at{" "}
              <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>. We answer every
              email ourselves.
            </p>
            <Actions className="doors">
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
            </Actions>
          </div>
        </Frame>
      </Close>
    </>
  );
}

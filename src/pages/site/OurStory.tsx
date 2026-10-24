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
 * round portrait, never a posed hero). A short "why now" band with two
 * sourced numbers sits between the letters and the close (on this page
 * only). The prints are illustrative album photographs (public/our-story,
 * from the pitch decks, and mission 34).
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon } from "./kit/kit";
import { Frame, PrimaryLink, SecondaryLink } from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";
import { DEMO_EMAIL } from "../../lib/demoRequest";
import { riseLines, useScene } from "../../lib/scrollMotion";
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
    font: 400 clamp(1.1rem, 1rem + 0.4vw, 1.35rem) / 1.55 ${font.text};
    color: ${color.onDarkMuted};
  }
  .who {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 26px;
    margin-top: clamp(22px, 2.4vw, 34px);
    font: 500 14px/1.4 ${font.body};
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
  .who a:focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 4px;
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
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 3.4vw, 64px);
    align-items: stretch;
    margin-top: calc(clamp(56px, 6vw, 110px) * var(--sy));
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
  ${media.sm} {
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
    font: 500 clamp(30px, 2.3vw, 42px) / 1 ${font.script};
    color: ${color.primary};
    transform: rotate(-2deg);
    transform-origin: left bottom;
  }
  .sign small {
    display: block;
    margin-top: 8px;
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .sign .cred {
    margin-top: 6px;
    max-width: 42ch;
    font: 400 14px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .sign a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 2px;
    font: 500 14px/1 ${font.body};
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
  .sign a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 3px;
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
    font: 400 clamp(1.12rem, 1rem + 0.4vw, 1.36rem) / 1.66 ${font.text};
    color: ${color.primary};
  }
  p.body + p.body {
    margin-top: 0.95em;
  }
  p.body.turn,
  p.body.turn + p.body {
    margin-top: 1.1em;
  }
  p.first::first-letter {
    float: left;
    margin: 0.06em 0.1em 0 0;
    font: 400 3.5em/0.8 ${font.display};
    color: ${color.teal};
  }
  p.body.turn {
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.accent};
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

/* ── Why now: two sourced numbers, on the paper (Bao's ruling, 2026-10-23:
   on /our-story only, never Home). A ratio and a count, each with its unit
   and its source linked. ── */
const WhyNow = styled.section`
  background: ${color.sand};
  color: ${color.primary};
  padding: calc(clamp(56px, 6vw, 112px) * var(--sy)) 0;
  .why {
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 2fr);
    gap: clamp(28px, 5vw, 110px);
    align-items: start;
  }
  h2 {
    font: 400 ${display.lg} / 1 ${font.display};
    letter-spacing: -0.02em;
  }
  h2 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 4vw, 96px);
    margin: 0;
  }
  dl > div {
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  dt {
    font: 500 clamp(2.6rem, 1.6rem + 3vw, 5.4rem) / 1 ${font.display};
    letter-spacing: -0.02em;
    font-variant-numeric: lining-nums;
    color: ${color.primary};
  }
  dt span[aria-hidden] {
    color: ${color.accent};
    font-weight: 400;
  }
  dd {
    margin: 14px 0 0;
    max-width: 38ch;
    font: 400 clamp(1.05rem, 1rem + 0.25vw, 1.25rem) / 1.5 ${font.text};
    color: ${color.body};
  }
  /* Each source is a 44px target (jury 2 R2 N3). */
  dd a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0;
    font: 500 14px/1.4 ${font.body};
    color: ${color.bodyMuted};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.gold} 70%, transparent);
    text-underline-offset: 4px;
    transition: color 160ms ${cssOut};
  }
  @media (hover: hover) and (pointer: fine) {
    dd a:hover {
      color: ${color.primary};
    }
  }
  dd a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 3px;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  ${media.md} {
    .why,
    dl {
      grid-template-columns: minmax(0, 1fr);
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
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.text};
    color: ${color.bodyMuted};
  }
  p.write {
    margin-top: 14px;
    font: 400 15px/1.55 ${font.body};
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
  ${media.sm} {
    .doors > * {
      flex: 1 1 100%;
    }
  }
`;

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
    const h1 = root.querySelector("h1");
    if (h1) riseLines(h1, { trigger: false });
    riseIn([...root.querySelectorAll(".opening .lead, .opening .who")], {
      delay: 0.25,
    });
    layDown([...root.querySelectorAll(".prints [data-snap]")], { delay: 0.2 });
    layDown([...root.querySelectorAll("[data-sheet]")], {
      trigger: root.querySelector(".letters") ?? undefined,
      start: "top 88%",
    });
  });
  const why = useScene<HTMLElement>((root) => {
    riseIn([...root.querySelectorAll("[data-why]")], {
      trigger: root.querySelector(".why") ?? undefined,
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
              <p className="body">
                I want A Story to keep all of that without asking a family to
                become archivists. My parents should just be able to talk.
              </p>
              <p className="body turn">
                A family is not a résumé. A life shouldn’t become one when we
                preserve it.
              </p>
            </Note>
          </div>
        </Frame>
      </Bench>

      <WhyNow ref={why} aria-labelledby="why-title">
        <Frame className="why">
          <h2 id="why-title" data-why>
            Why <em>now.</em>
          </h2>
          <dl>
            <div data-why>
              <dt>
                18% <span aria-hidden="true">→</span>
                <span className="sr">to</span> 30%
              </dt>
              <dd>
                Adults 50 and over who use generative AI, 2024 to 2025.{" "}
                <a
                  href="https://www.aarp.org/2026techtrends"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AARP, 2026 Tech Trends
                </a>
              </dd>
            </div>
            <div data-why>
              <dt>11,200</dt>
              <dd>
                Americans turn 65 every day, through 2027.{" "}
                <a
                  href="https://www.limraconsumer.com/peak65/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alliance for Lifetime Income, Peak 65
                </a>
              </dd>
            </div>
            <div data-why>
              <dt>Voice AI</dt>
              <dd>
                Can now hold an unhurried conversation, ask a follow-up about
                what it just heard, and know when to stop.
              </dd>
            </div>
          </dl>
        </Frame>
      </WhyNow>

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
              Write to Daniel at{" "}
              <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>. We answer every
              email ourselves.
            </p>
            <div className="doors">
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
            </div>
          </div>
        </Frame>
      </Close>
    </>
  );
}

/**
 * The audience page, Pass 11g — one composition for Care communities,
 * Organizations and Your own story, so the three rooms share the home page's
 * finish (the founder asked for all three to be redone).
 *
 * 1. Opening — on the chocolate cloth, as every page opens (jury 1 #5):
 *    title, lead and actions left; a layered collage of three prints right
 *    (white border, photo corners), set down at angles.
 * 2. Moments — the situations this is for, in one of two rooms so the two
 *    pages that use this template do not read as one (jury 1 #10):
 *      momentsLayout="ledger"  ruled rows: a small print, the line, the text
 *      momentsLayout="wall"    three prints of different sizes across the
 *                              width, each with its words under it
 * 3. In the app — a real Figma screen in a phone beside three short steps.
 * 4. A statement band — one line to remember, on chocolate, with the
 *    namecard ornament.
 * 5. Before you begin — a short checklist card and the one action.
 *
 * Every scene is complete without motion (useReveals only adds it).
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { AppShot, Phone } from "../app/Phone";
import { Print, Invitation } from "./kit";
import { useReveals } from "./reveals";
import { Actions, Chapter, Eyebrow, Frame, Title, onDarkActions } from "./kit.styles";
import { color, display, font, media, type } from "../../../styles/theme";

export type Moment = {
  photo: string;
  alt: string;
  /** Kept for the callers; not shown (a label above a heading says nothing the heading does not). */
  eyebrow?: string;
  title: string;
  body: string;
};

/** The drawn tick used in the checklist: one stroke weight, like the arrow. */
function TickIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12.5l4.6 4.6L19.5 6.8" />
    </svg>
  );
}

const Opening = styled(Chapter)`
  ${onDarkActions};
  padding: calc(clamp(64px, 7vw, 132px) * var(--sy)) 0
    calc(clamp(80px, 8vw, 140px) * var(--sy));
  overflow: clip;
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 140px);
    align-items: center;
  }
  h1 {
    max-width: 16ch;
  }
  h1 em {
    font-style: normal;
    color: var(--mark);
  }
  .lead {
    margin-top: clamp(22px, 2.4vw, 32px);
    font: 400 clamp(1.25rem, 1.1rem + 0.42vw, 1.55rem) / 1.5 ${font.text};
    color: var(--text);
    max-width: 42ch;
  }
  /* Three prints laid down on the cloth, overlapping a little. */
  .collage {
    position: relative;
    aspect-ratio: 1 / 0.92;
    width: min(100%, 980px);
    justify-self: end;
  }
  .collage > figure {
    position: absolute;
  }
  .collage > figure:nth-child(1) {
    left: 0;
    top: 7%;
    width: 58%;
    z-index: 1;
  }
  .collage > figure:nth-child(2) {
    right: 0;
    top: 0;
    width: 42%;
    z-index: 2;
  }
  .collage > figure:nth-child(3) {
    left: 22%;
    bottom: 0;
    width: 48%;
    z-index: 3;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .collage {
      justify-self: stretch;
    }
  }
`;

const Moments = styled(Chapter)`
  h2 {
    font: 600 ${display.lg} / 1.06 ${font.display};
    letter-spacing: -0.01em;
    color: var(--ink);
    max-width: 20ch;
  }
  h2 em {
    font-style: normal;
    color: var(--mark);
  }
  h3 {
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  p {
    margin-top: 12px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--text);
    max-width: 46ch;
    text-wrap: pretty;
  }

  /* ledger: ruled rows across the width - a small print, the line, the text. */
  .ledger {
    margin-top: calc(clamp(36px, 4vw, 64px) * var(--sy));
    border-top: 1px solid var(--line);
  }
  .ledger article {
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 0.85fr) minmax(0, 1fr);
    gap: clamp(24px, 4vw, 96px);
    align-items: center;
    padding: calc(clamp(24px, 2.6vw, 44px) * var(--sy)) 0;
    border-bottom: 1px solid var(--line);
  }
  .ledger figure {
    width: min(100%, 360px);
  }
  .ledger h3 {
    max-width: 16ch;
    font-size: ${display.md};
  }
  .ledger p {
    font-size: 20px;
  }
  .ledger p {
    margin-top: 0;
  }

  /* wall: three prints of different sizes across the width, the words under each. */
  .wall {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr) minmax(0, 1fr);
    gap: clamp(28px, 4vw, 96px);
    align-items: start;
    margin-top: calc(clamp(40px, 4.6vw, 80px) * var(--sy));
  }
  .wall article:nth-child(2) {
    margin-top: clamp(40px, 7vw, 150px);
  }
  .wall article:nth-child(3) {
    margin-top: clamp(16px, 2.4vw, 52px);
  }
  .wall h3 {
    margin-top: clamp(22px, 2.2vw, 34px);
  }
  ${media.md} {
    .ledger article {
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      align-items: start;
    }
    .ledger article p {
      grid-column: 2;
    }
    .wall {
      grid-template-columns: minmax(0, 1fr);
    }
    .wall article:nth-child(n) {
      margin-top: 0;
    }
    .wall figure {
      width: min(100%, 520px);
    }
  }
  ${media.sm} {
    .ledger article {
      grid-template-columns: minmax(0, 1fr);
      gap: 18px;
    }
    .ledger article p {
      grid-column: auto;
    }
  }
`;

const InApp = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  .stage {
    display: grid;
    place-items: start center;
    height: clamp(460px, 42vw, 620px);
    overflow: hidden;
    padding-top: 36px;
    border-radius: 24px;
    background: radial-gradient(
      ellipse at 50% 100%,
      color-mix(in srgb, ${color.gold} 32%, ${color.ivory}),
      ${color.paperPure} 72%
    );
    mask-image: linear-gradient(#000 84%, transparent);
  }
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  h2 em {
    font-style: normal;
    color: var(--mark);
  }
  ol {
    list-style: none;
    margin: clamp(28px, 3vw, 44px) 0 0;
    padding: 0;
    counter-reset: s;
  }
  li {
    counter-increment: s;
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 18px;
    padding: 20px 0;
    border-top: 1px solid var(--line);
  }
  li::before {
    content: counter(s, decimal-leading-zero);
    font: 400 26px/1 ${font.display};
    color: ${color.accent};
  }
  li b {
    display: block;
    font: 400 ${display.sm} / 1.25 ${font.display};
    color: var(--ink);
  }
  li span {
    display: block;
    margin-top: 6px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Statement = styled.section`
  padding: clamp(96px, 11vw, 170px) var(--page-gutter);
  background:
    radial-gradient(
      ellipse 60% 70% at 50% 50%,
      color-mix(in srgb, ${color.warmGold} 12%, ${color.primary}),
      transparent 70%
    ),
    ${color.primary};
  color: ${color.ivory};
  text-align: center;
  p {
    margin: 0 auto;
    font: italic 400 ${display.xl} / 1.1 ${font.display};
    letter-spacing: -0.02em;
    max-width: 18ch;
  }
  p b {
    font-style: normal;
    font-weight: 400;
    color: ${color.gold};
  }
  .orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    width: min(260px, 60vw);
    margin: 0 auto clamp(28px, 3vw, 40px);
  }
  .orn::before,
  .orn::after {
    content: "";
    flex: 1;
    height: 3px;
    border-top: 1px solid color-mix(in srgb, ${color.gold} 80%, transparent);
    border-bottom: 1px solid color-mix(in srgb, ${color.gold} 40%, transparent);
  }
  .orn i {
    width: 8px;
    height: 8px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
`;

const Begin = styled(Chapter)`
  .card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(28px, 5vw, 80px);
    align-items: start;
    padding: clamp(32px, 5vw, 72px);
    border-radius: 28px;
    background: ${color.paperPure};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 40px 80px -60px rgba(42, 31, 24, 0.6);
  }
  h2 {
    margin-top: 12px;
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .card > div > p {
    margin: 16px 0 28px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: ${color.body};
    max-width: 42ch;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 14px;
    padding: 16px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.primary};
  }
  /*
   * A drawn tick, in the teal. It was a Unicode "✓" in a sand disc, which on
   * paper read khaki - a colour this site does not have - and which no icon
   * set on the page matches.
   */
  ul li svg {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    color: ${color.teal};
  }
  ${media.md} {
    .card {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/** Where each of the three collage prints is cut and how it is turned. */
const COLLAGE = [
  { ratio: 4 / 3.2, tilt: -2.5 },
  { ratio: 4 / 5, tilt: 3 },
  { ratio: 4 / 3, tilt: 1 },
] as const;
const TILTS = [-1.2, 1, -0.6] as const;
const WALL_RATIOS = [4 / 5, 1, 4 / 3] as const;

export function AudiencePage({
  eyebrow,
  momentsLayout = "ledger",
  title,
  lead,
  actions,
  collage,
  momentsTitle,
  moments,
  appShot,
  appTitle,
  steps,
  statement,
  beginEyebrow,
  beginTitle,
  beginBody,
  checklist,
  beginAction,
  ground = "ivory",
}: {
  /** Optional: leave it out where the title already says who the page is for. */
  eyebrow?: string;
  /** How the moments are laid out; give the two audience pages different rooms. */
  momentsLayout?: "ledger" | "wall";
  title: ReactNode;
  lead: string;
  actions: ReactNode;
  collage: { photo: string; alt: string }[];
  momentsTitle: ReactNode;
  moments: Moment[];
  appShot: { name: string; scroll?: boolean; light?: boolean };
  appTitle: ReactNode;
  steps: [string, string][];
  statement: ReactNode;
  beginEyebrow?: string;
  beginTitle: ReactNode;
  beginBody: string;
  checklist: string[];
  beginAction: ReactNode;
  /** The ground of the closing "Before you begin" section. The opening is
   * always the cloth. */
  ground?: "ivory" | "sand";
}) {
  const r1 = useReveals<HTMLElement>();
  const r2 = useReveals<HTMLElement>();
  const r3 = useReveals<HTMLElement>();
  const r4 = useReveals<HTMLElement>();
  const r5 = useReveals<HTMLElement>();
  return (
    <>
      <Opening ref={r1} $ground="cloth" aria-labelledby="aud-title">
        <Frame className="grid">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Title id="aud-title" data-lines>
              {title}
            </Title>
            <p className="lead" data-rise>
              {lead}
            </p>
            <Actions data-rise>{actions}</Actions>
          </div>
          <div className="collage" data-rise>
            {collage.slice(0, 3).map((c, i) => (
              <Print
                key={c.photo}
                id={c.photo}
                alt={c.alt}
                ratio={COLLAGE[i].ratio}
                tilt={COLLAGE[i].tilt}
                sizes="(max-width: 860px) 60vw, 28vw"
                priority={i === 0}
              />
            ))}
          </div>
        </Frame>
      </Opening>

      <Moments ref={r2} $ground="paper" aria-labelledby="moments-title">
        <Frame>
          <h2 id="moments-title" data-lines>
            {momentsTitle}
          </h2>
          <div className={momentsLayout}>
            {moments.map((m, i) => (
              <article key={m.title} data-rise>
                <Print
                  id={m.photo}
                  alt={m.alt}
                  ratio={momentsLayout === "wall" ? WALL_RATIOS[i % 3] : 4 / 3}
                  tilt={TILTS[i % 3]}
                  sizes={
                    momentsLayout === "wall"
                      ? "(max-width: 860px) 92vw, 34vw"
                      : "(max-width: 640px) 92vw, 360px"
                  }
                />
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </Frame>
      </Moments>

      <InApp ref={r3} $ground="ivory" aria-labelledby="inapp-title">
        <Frame className="grid">
          <div className="stage" data-rise aria-hidden="true">
            <Phone width="min(330px, 86%)" lightStatus={appShot.light}>
              <AppShot name={appShot.name} scroll={appShot.scroll} />
            </Phone>
          </div>
          <div>
            <h2 id="inapp-title" data-lines>
              {appTitle}
            </h2>
            <ol>
              {steps.map(([b, t]) => (
                <li key={b} data-rise>
                  <div>
                    <b>{b}</b>
                    <span>{t}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Frame>
      </InApp>

      {/*
        The one line. It rises as a block rather than line by line: splitting
        it puts an aria-label on the paragraph, which is prohibited on a <p>
        with no role, and the statement is short enough that a block arrival
        reads the same.
      */}
      <Statement ref={r4} aria-label="In one line">
        <span className="orn" aria-hidden="true">
          <i />
        </span>
        <p data-rise>{statement}</p>
      </Statement>

      <Begin ref={r5} $ground={ground} aria-labelledby="begin-title">
        <Frame>
          <div className="card" data-rise>
            <div>
              {beginEyebrow && <Eyebrow>{beginEyebrow}</Eyebrow>}
              <h2 id="begin-title">{beginTitle}</h2>
              <p>{beginBody}</p>
              {beginAction}
            </div>
            <ul>
              {checklist.map((c) => (
                <li key={c}>
                  <TickIcon />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </Begin>

      <Invitation />
    </>
  );
}

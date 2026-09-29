/**
 * The audience page, Pass 11g — one composition for Care communities,
 * Organizations and Your own story, so the three rooms share the home page's
 * finish (the founder asked for all three to be redone).
 *
 * 1. Opening — title, lead and actions left; a layered collage of prints
 *    right (two or three library photographs, set down at angles).
 * 2. Moments — three illustrated cards: the situations this is for.
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
import { Picture, Invitation } from "./kit";
import { useReveals } from "./reveals";
import { Actions, Chapter, Eyebrow, Frame, Title } from "./kit.styles";
import { color, display, font, media } from "../../../styles/theme";

export type Moment = {
  photo: string;
  alt: string;
  eyebrow: string;
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
  padding: clamp(72px, 9vw, 150px) 0 clamp(80px, 9vw, 150px);
  overflow: hidden;
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  h1 em {
    font-style: italic;
  }
  .lead {
    margin-top: clamp(22px, 2.4vw, 32px);
    font: 400 clamp(1.15rem, 1.02rem + 0.45vw, 1.4rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
  .collage {
    position: relative;
    aspect-ratio: 1 / 0.95;
    margin-right: 2%;
  }
  .collage figure {
    position: absolute;
    margin: 0;
    padding: 2%;
    background: ${color.paperPure};
    box-shadow: 0 40px 70px -40px rgba(42, 31, 24, 0.7);
  }
  .collage img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .collage figure:nth-child(1) {
    left: 0;
    top: 6%;
    width: 62%;
    aspect-ratio: 4 / 3.2;
    transform: rotate(-2.5deg);
    z-index: 1;
  }
  .collage figure:nth-child(2) {
    right: 0;
    top: 0;
    width: 46%;
    aspect-ratio: 4 / 5;
    transform: rotate(3deg);
    z-index: 2;
  }
  .collage figure:nth-child(3) {
    left: 18%;
    bottom: 0;
    width: 52%;
    aspect-ratio: 4 / 3;
    transform: rotate(1deg);
    z-index: 3;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Moments = styled(Chapter)`
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    letter-spacing: -0.02em;
    color: var(--ink);
    max-width: 20ch;
  }
  h2 em {
    font-style: italic;
    color: var(--mark);
  }
  /*
   * Three moments, not three cards. The row of identical white tiles — photo,
   * label, heading, paragraph — is the most templated shape on the web, and
   * it was carrying four of this site's pages. These sit directly on the
   * ground instead: one taken larger because it matters more, each print in
   * the house's own keyline frame, with the gold rule between the picture and
   * what is said about it. No container, no label above the heading.
   */
  .cards {
    display: grid;
    grid-template-columns: minmax(0, 1.22fr) minmax(0, 1fr);
    gap: clamp(30px, 3.6vw, 64px) clamp(34px, 4.4vw, 78px);
    margin-top: clamp(40px, 5vw, 72px);
  }
  .card:first-child {
    grid-row: span 2;
  }
  .card .img {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: ${color.ivoryDeep};
    box-shadow: 0 26px 54px -34px rgba(42, 31, 24, 0.7);
  }
  .card:first-child .img {
    aspect-ratio: 4 / 4.3;
  }
  .card .img::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(42, 31, 24, 0.16);
    pointer-events: none;
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .card:hover img {
      transform: scale(1.035);
    }
  }
  /* The house rule, between the picture and what is said about it. */
  .card h3 {
    position: relative;
    margin-top: clamp(22px, 2.2vw, 32px);
    padding-top: clamp(18px, 1.8vw, 26px);
    font: 400 ${display.sm} / 1.22 ${font.display};
    color: ${color.primary};
  }
  .card:first-child h3 {
    font-size: ${display.md};
  }
  .card h3::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 52px;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 78%, transparent);
  }
  .card p {
    margin-top: 12px;
    font: 400 17px/1.62 ${font.body};
    color: ${color.body};
    max-width: 46ch;
  }
  ${media.md} {
    .cards {
      grid-template-columns: minmax(0, 1fr);
    }
    .card:first-child {
      grid-row: auto;
    }
    .card:first-child .img {
      aspect-ratio: 16 / 10;
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
    font-style: italic;
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
    font: 400 16px/1.6 ${font.body};
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
    font: 400 17px/1.65 ${font.body};
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
    font: 400 17px/1.5 ${font.body};
    color: ${color.primary};
  }
  /*
   * A drawn tick, in the teal. It was a Unicode "✓" in a sand disc, which on
   * paper read khaki — a colour this site does not have — and which no icon
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

export function AudiencePage({
  eyebrow,
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
  eyebrow: string;
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
  beginEyebrow: string;
  beginTitle: ReactNode;
  beginBody: string;
  checklist: string[];
  beginAction: ReactNode;
  ground?: "ivory" | "sand";
}) {
  const r1 = useReveals<HTMLElement>();
  const r2 = useReveals<HTMLElement>();
  const r3 = useReveals<HTMLElement>();
  const r4 = useReveals<HTMLElement>();
  const r5 = useReveals<HTMLElement>();
  return (
    <>
      <Opening ref={r1} $ground={ground} aria-labelledby="aud-title">
        <Frame className="grid">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title id="aud-title" data-lines>
              {title}
            </Title>
            <p className="lead" data-rise>
              {lead}
            </p>
            <Actions data-rise>{actions}</Actions>
          </div>
          <div className="collage" data-rise>
            {collage.map((c, i) => (
              <figure key={c.photo}>
                <Picture
                  id={c.photo}
                  alt={c.alt}
                  sizes="(max-width: 860px) 60vw, 30vw"
                  priority={i === 0}
                />
              </figure>
            ))}
          </div>
        </Frame>
      </Opening>

      <Moments ref={r2} $ground="paper" aria-labelledby="moments-title">
        <Frame>
          <h2 id="moments-title" data-lines>
            {momentsTitle}
          </h2>
          <div className="cards">
            {moments.map((m) => (
              <article key={m.title} className="card" data-rise>
                <div className="img">
                  <Picture
                    id={m.photo}
                    alt={m.alt}
                    sizes="(max-width: 860px) 92vw, 30vw"
                  />
                </div>
                <div className="txt">
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
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

      <Begin ref={r5} $ground="ivory" aria-labelledby="begin-title">
        <Frame>
          <div className="card" data-rise>
            <div>
              <Eyebrow>{beginEyebrow}</Eyebrow>
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

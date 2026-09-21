/**
 * The opening of /compare. Pass 11 used the plain text PageOpening and left
 * half the screen empty; the founder asked for a redesign. The page's whole
 * argument fits in one picture, so the opening draws it: a single family
 * photograph (the lake, 2024) in a gold-matted print, and around it the four
 * people who remember that night differently, each version kept in their own
 * words. Beside it, the position line in two voices — what most products do,
 * set quiet; what A Story does, set large.
 *
 * Chocolate ground and gold keylines, like the namecard. The voices arrive
 * once on load; with reduced motion they are simply there.
 */
import styled from "styled-components";
import { LAKE_MONSTER as M } from "../../../lib/homeExamples";
import { gsap, useScene } from "../../../lib/scrollMotion";
import { avatarTints } from "../app/tokens";
import { Picture } from "../kit/kit";
import { Eyebrow, Frame } from "../kit/kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const VOICES = [
  {
    ...M.teller,
    role: "Told it first",
    quote: "I never thought she’d believe me for three whole summers.",
    tint: color.teal,
  },
  ...M.added.map((a, i) => ({
    name: a.name,
    initial: a.initial,
    role: a.kind,
    quote: a.quote,
    tint: avatarTints[i % avatarTints.length],
  })),
];

const Opening = styled.section`
  --ink: ${color.ivory};
  --label: ${color.gold};
  --mark: ${color.gold};
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      ellipse 55% 70% at 75% 50%,
      color-mix(in srgb, ${color.warmGold} 14%, ${color.night}),
      transparent 70%
    ),
    ${color.night};
  color: ${color.ivory};
  padding: clamp(64px, 8vw, 128px) 0 clamp(80px, 9vw, 140px);

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  .quiet {
    margin-top: 22px;
    font: italic 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.onDarkMuted};
  }
  h1 {
    margin-top: 10px;
    font: 400 ${display.xl} / 1.02 ${font.display};
    letter-spacing: -0.025em;
    color: ${color.ivory};
  }
  h1 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.gold};
  }
  .lead {
    margin-top: clamp(22px, 2.4vw, 32px);
    padding-top: 22px;
    border-top: 1px solid ${color.nightLine};
    font: 400 18px/1.6 ${font.body};
    color: ${color.onDarkMuted};
    max-width: 40ch;
  }

  /* The picture: one print, four voices round it. */
  .scene {
    position: relative;
    aspect-ratio: 1 / 0.92;
  }
  .print {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 58%;
    transform: translate(-50%, -50%) rotate(-1.5deg);
    padding: 2.2%;
    padding-bottom: 7%;
    background: ${color.paperPure};
    box-shadow:
      0 0 0 1px color-mix(in srgb, ${color.gold} 60%, transparent),
      0 40px 70px -30px rgba(0, 0, 0, 0.8);
  }
  .print img {
    display: block;
    width: 100%;
    height: auto;
  }
  .print figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2.2%;
    text-align: center;
    font: italic 400 clamp(13px, 1.1vw, 16px) / 1 ${font.display};
    color: ${color.primaryMid};
  }
  .voice {
    position: absolute;
    width: min(46%, 250px);
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 12px 14px;
    border-radius: 14px;
    background: color-mix(in srgb, ${color.ivory} 96%, transparent);
    color: ${color.primary};
    box-shadow: 0 20px 40px -24px rgba(0, 0, 0, 0.8);
  }
  .voice:nth-of-type(1) {
    left: 0;
    top: 2%;
  }
  .voice:nth-of-type(2) {
    right: 0;
    top: 10%;
  }
  .voice:nth-of-type(3) {
    left: 2%;
    bottom: 6%;
  }
  .voice:nth-of-type(4) {
    right: 0;
    bottom: 0;
  }
  .voice i {
    display: grid;
    place-items: center;
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--tint);
    color: ${color.ivory};
    font: 600 13px/1 ${font.body};
    font-style: normal;
  }
  .voice b {
    display: block;
    font: 600 12px/1.2 ${font.body};
    color: ${color.primary};
  }
  .voice small {
    font: 500 11px/1.2 ${font.body};
    color: ${color.accentText};
  }
  .voice p {
    margin-top: 4px;
    font: italic 400 14px/1.35 ${font.display};
    color: ${color.primary};
  }
  .tag {
    position: absolute;
    left: 50%;
    bottom: -4%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 14px;
    white-space: nowrap;
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  .tag::before,
  .tag::after {
    content: "";
    width: 36px;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 60%, transparent);
  }

  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .scene {
      aspect-ratio: auto;
      display: grid;
      gap: 12px;
      padding-bottom: 40px;
    }
    .print,
    .voice {
      position: static;
      transform: none;
      width: 100%;
    }
    .print {
      margin-bottom: 8px;
    }
  }
`;

export default function CompareOpening() {
  const ref = useScene<HTMLElement>(() => {
    gsap
      .timeline({ delay: 0.2 })
      .from(".opening-copy > *", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
      })
      .from(
        ".print",
        { scale: 0.9, opacity: 0, duration: 1.1, ease: "expo.out" },
        0.2,
      )
      .from(
        ".voice",
        {
          scale: 0.85,
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.8)",
          stagger: 0.18,
        },
        0.7,
      )
      .from(".tag", { opacity: 0, duration: 0.8 }, 1.4);
  });

  return (
    <Opening ref={ref} aria-labelledby="compare-title">
      <Frame className="grid">
        <div className="opening-copy">
          <Eyebrow>How A Story is different</Eyebrow>
          <p className="quiet">Most products preserve a storyteller.</p>
          <h1 id="compare-title">
            A&nbsp;Story preserves the family <em>record.</em>
          </h1>
          <p className="lead">
            One moment doesn’t need one official version. Everyone who was there
            keeps their own — side by side, in their own words.
          </p>
        </div>
        <div
          className="scene"
          role="img"
          aria-label="One family photograph from the lake in 2024, with four family members’ different memories of that night around it"
        >
          <figure className="print">
            <Picture
              id={M.photo}
              alt=""
              sizes="(max-width: 860px) 90vw, 420px"
              priority
            />
            <figcaption>The lake · 2024</figcaption>
          </figure>
          {VOICES.map((v) => (
            <div
              className="voice"
              key={v.name}
              style={{ ["--tint" as string]: v.tint }}
            >
              <i aria-hidden="true">{v.initial}</i>
              <div>
                <b>{v.name}</b>
                <small>{v.role}</small>
                <p>“{v.quote}”</p>
              </div>
            </div>
          ))}
          <span className="tag">One moment · four witnesses</span>
        </div>
      </Frame>
    </Opening>
  );
}

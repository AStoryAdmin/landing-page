/**
 * It's the everyday: the photo wall (2026-10-23).
 *
 * One screen. The milestones line is folded into the paragraph instead of
 * being a section of its own: the wedding, the graduation and the first house
 * are the photographs every family already keeps, so they are named and set
 * aside, and the wall is everything else - the dough on the table, the dog
 * in the sun, the drive home asleep in the back seat. Ten prints laid edge to
 * edge across the whole width, each turned a little by hand, with the
 * headline holding the first block of the wall.
 *
 * `id="why-a-story"` keeps the old /why-it-matters redirect landing here.
 * Photographs: the mission library (AI-generated illustrations, as the
 * footer says once).
 */
import styled from "styled-components";
import { Frame } from "../kit/kit.styles";
import { Print } from "./bench";
import { gsap, useScene } from "../../../lib/scrollMotion";
import { arrive, lines, OUT } from "./motion";
import { color, font, media } from "../../../styles/theme";

/** Where each print sits on the 12-column wall: [column, row] spans and its tilt. */
const WALL = [
  { id: "05", alt: "Hands kneading dough on a floured kitchen table", col: "5 / 8", row: "1", tilt: -0.8 },
  { id: "12", alt: "A woman leaning in a hallway doorway, mid-conversation", col: "8 / 10", row: "1 / 3", tilt: 1.1, focus: "50% 30%" },
  { id: "17", alt: "A family kitchen in the morning, a teenager at the counter", col: "10 / 13", row: "1", tilt: -0.6 },
  { id: "06", alt: "A dog asleep in a patch of sun on the living-room rug", col: "5 / 8", row: "2", tilt: 0.9 },
  { id: "14", alt: "A mother hanging washing on the line while her daughter runs past", col: "10 / 13", row: "2", tilt: 0.7 },
  { id: "07", alt: "A boy looking out of the car window on a long drive", col: "1 / 3", row: "3", tilt: 1.2 },
  { id: "21", alt: "A packed lunchbox being closed on the kitchen counter", col: "3 / 5", row: "3", tilt: -1.1 },
  { id: "11", alt: "Hands playing cards around a kitchen table", col: "5 / 7", row: "3", tilt: 0.6, mobile: false },
  { id: "20", alt: "Two children asleep in the back seat of the car", col: "7 / 10", row: "3", tilt: -0.7 },
  { id: "16", alt: "A view over the steering wheel down an empty country road", col: "10 / 13", row: "3", tilt: 0.9, mobile: false },
];

const Section = styled.section`
  --ink: ${color.primary};
  position: relative;
  background: ${color.ivory};
  color: ${color.primary};
  padding: calc(clamp(56px, 6vw, 96px) * var(--sy)) 0;

  .wall {
    container-type: inline-size;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: repeat(3, min(13.5cqw, calc((100svh - 150px) / 3)));
    gap: 1.5cqw;
  }
  .words {
    grid-column: 1 / 5;
    grid-row: 1 / 3;
    align-self: center;
    padding-right: 1.5cqw;
  }
  h2 {
    margin: 0;
    font: 600 clamp(44px, 5.4cqw, 112px) / 0.98 ${font.display};
    letter-spacing: -0.015em;
    color: ${color.primary};
    text-wrap: balance;
  }
  h2 em {
    font-style: normal;
    color: ${color.accent};
  }
  .words p {
    margin: clamp(18px, 1.8cqw, 30px) 0 0;
    max-width: 30ch;
    font: 400 clamp(17px, 1.35cqw, 26px) / 1.5 ${font.text};
    color: ${color.body};
    text-wrap: pretty;
  }
  /* On the wall a print fills its cell; the crop is the print's. */
  .grid figure {
    height: 100%;
    --border: clamp(6px, 0.6cqw, 11px);
    --corner: clamp(14px, 1.4cqw, 24px);
  }
  .grid .print-in,
  .grid .face {
    height: 100%;
  }
  .grid img {
    height: 100%;
    aspect-ratio: auto;
  }
  .grid .face {
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.14),
      0 14px 24px -16px rgba(42, 31, 24, 0.5);
  }

  ${media.md} {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: none;
      grid-auto-rows: auto;
      gap: 14px;
    }
    .grid figure,
    .grid .print-in,
    .grid .face {
      height: auto;
    }
    .grid img {
      height: auto;
      aspect-ratio: 4 / 3;
    }
    .words {
      grid-column: 1 / -1;
      grid-row: auto;
      padding: 0 0 12px;
    }
    .grid figure {
      grid-column: auto !important;
      grid-row: auto !important;
    }
    .grid figure.wide-only {
      display: none;
    }
    h2 {
      font-size: 44px;
    }
  }
`;

export default function Everyday() {
  const ref = useScene<HTMLElement>((root) => {
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".words p"), { delay: 0.2 });
    const prints = root.querySelectorAll(".grid figure");
    gsap.from(prints, {
      y: 36,
      rotation: (i: number) => (i % 2 ? 3 : -3),
      scale: 0.96,
      opacity: 0,
      duration: 1,
      ease: OUT,
      stagger: { each: 0.06, from: "random" },
      scrollTrigger: { trigger: root.querySelector(".grid"), start: "top 78%", once: true },
    });
  });

  return (
    <Section ref={ref} id="why-a-story" aria-labelledby="everyday-title">
      <Frame className="wall">
        <div className="grid">
          <div className="words">
            <h2 id="everyday-title">
              It’s the <em>everyday.</em>
            </h2>
            <p>
              The wedding, the graduation and the first house usually survive.
              The Tuesday dinners, the drive home and what Grandpa said at the
              workbench slip away, unless someone asks.
            </p>
          </div>
          {WALL.map((p) => (
            <Print
              key={p.id}
              id={p.id}
              alt={p.alt}
              tilt={p.tilt}
              focus={p.focus}
              sizes="(max-width: 860px) 46vw, 22vw"
              style={{ gridColumn: p.col, gridRow: p.row }}
              className={p.mobile === false ? "wide-only" : undefined}
            />
          ))}
        </div>
      </Frame>
    </Section>
  );
}

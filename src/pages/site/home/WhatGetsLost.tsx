/**
 * Movement 1 — the problem (mission.md): the milestones get photographed,
 * the everyday slips away.
 *
 * The formal trio (02 wedding, 04 graduation, 03 first house) sits inside the
 * sentence as small matted prints: they are what families already keep, and
 * they should look small next to the argument. Then "But…" turns the page,
 * and the three things that go missing each get one row and one print, in the
 * mission's own words. The prints alternate sides and lean a degree or two,
 * the way photographs lie on a table; nothing is captioned, because the line
 * beside each print already says what it is for.
 *
 * The section's top edge rises over the hero like the cream panels in the
 * app's onboarding — the one arch on the page, and it means "turn the page".
 */
import styled from "styled-components";
import { Picture, Print } from "../kit/kit";
import { Frame, RisingEdge } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  position: relative;
  z-index: 1;
  background: ${color.ivory};
  padding: clamp(64px, 8vw, 128px) 0 clamp(96px, 11vw, 176px);

  .milestones {
    font: 400 ${display.lg} / 1.18 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
    max-width: 24ch;
  }
  .keep {
    white-space: nowrap;
  }
  /* Inline prints: a mat and a hairline, sized to the cap height so they read as words. */
  .inline-print {
    display: inline-block;
    vertical-align: -0.1em;
    height: 0.95em;
    margin-left: 0.2em;
    padding: 3px;
    background: ${color.paperPure};
    box-shadow: 0 6px 12px -8px rgba(42, 31, 24, 0.6);
    overflow: hidden;
  }
  .inline-print img {
    height: 100%;
    width: auto;
  }
  .but {
    display: block;
    margin: clamp(56px, 7vw, 110px) 0 clamp(24px, 3vw, 48px);
    font: italic 400 ${display.xl} / 1 ${font.display};
    color: ${color.accent};
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(28px, 6vw, 110px);
    align-items: center;
    padding: clamp(40px, 5vw, 80px) 0;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  li:nth-child(even) .lost-print {
    order: -1;
  }
  h3 {
    font: 400 ${display.md} / 1.2 ${font.display};
    letter-spacing: -0.015em;
    color: ${color.primary};
    max-width: 22ch;
  }
  h3 + p {
    margin-top: 18px;
    font: 400 18px/1.6 ${font.body};
    color: ${color.body};
    max-width: 38ch;
  }
  .lost-print {
    width: min(100%, var(--w));
    justify-self: center;
  }

  .coda {
    padding-top: clamp(48px, 6vw, 88px);
    border-top: 1px solid ${color.primaryLineStrong};
    text-align: center;
  }
  .coda p {
    margin: auto;
    font: 400 ${display.md} / 1.3 ${font.display};
    color: ${color.primary};
    max-width: 26ch;
  }
  .coda em {
    font-style: normal;
    color: ${color.accent};
  }

  ${media.md} {
    li {
      grid-template-columns: minmax(0, 1fr);
    }
    li:nth-child(even) .lost-print {
      order: 0;
    }
    .lost-print {
      justify-self: start;
      width: min(92%, var(--w));
    }
  }
`;

const lost = [
  {
    line: "…the reason everyone was laughing in that photo.",
    more: "The picture kept the faces. Nobody kept the joke.",
    id: "28",
    alt: "People sharing a laugh in a living room, around 1986",
    width: "520px",
    tilt: -1.4,
  },
  {
    line: "…the story told at dinner and never written down.",
    more: "Told so often it felt permanent. Then one year nobody could quite remember how it went.",
    id: "29",
    alt: "An ordinary afternoon at a kitchen table, around 1982",
    width: "470px",
    tilt: 1.2,
  },
  {
    line: "…the small ordinary day that turns out to matter later.",
    more: "The breakfast nobody photographed on purpose. Whoever was still at the table.",
    id: "17",
    alt: "The aftermath of breakfast on a kitchen table, around 1996",
    width: "500px",
    tilt: -0.8,
  },
];

export default function WhatGetsLost() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector(".milestones")!);
    gsap.from(root.querySelectorAll(".inline-print img"), {
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".milestones", start: "top 80%", once: true },
    });
    gsap.from(".but", {
      xPercent: -6,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: ".but", start: "top 85%", once: true },
    });
    root.querySelectorAll("li").forEach((row, i) => {
      // The words arrive, then the print is set down on the table beside them.
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true } })
        .from(row.querySelector("h3"), { y: 36, opacity: 0, duration: 1.1, ease: "expo.out" }, 0)
        .from(row.querySelector("h3 + p"), { y: 24, opacity: 0, duration: 1.1, ease: "expo.out" }, 0.12)
        .from(
          row.querySelector(".lost-print"),
          { y: 60, rotate: i % 2 ? -5 : 5, opacity: 0, duration: 1.5, ease: "expo.out" },
          0.05,
        );
    });
    riseLines(root.querySelector(".coda p")!);
  });

  return (
    <Scene ref={ref} id="why-a-story" aria-labelledby="lost-title">
      <RisingEdge $to="ivory" />
      <Frame>
        <h2 id="lost-title" className="milestones">
          {/* Each print is glued to its word, so a line never starts on a photograph. */}
          <span className="keep">
            The wedding
            <span className="inline-print">
              <Picture id="02" alt="" sizes="120px" />
            </span>
            ,
          </span>{" "}
          <span className="keep">
            the graduation
            <span className="inline-print">
              <Picture id="04" alt="" sizes="120px" />
            </span>
            ,
          </span>{" "}
          <span className="keep">
            the first house
            <span className="inline-print">
              <Picture id="03" alt="" sizes="160px" />
            </span>
          </span>{" "}
          — the big milestones get photographed.
        </h2>
        <span className="but" aria-hidden="true">
          But…
        </span>
        <ol aria-label="What slips away">
          {lost.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.line}</h3>
                <p>{item.more}</p>
              </div>
              <div className="lost-print" style={{ ["--w" as string]: item.width }}>
                <Print
                  id={item.id}
                  alt={item.alt}
                  tilt={item.tilt}
                  sizes={`(max-width: 860px) 90vw, ${item.width}`}
                />
              </div>
            </li>
          ))}
        </ol>
        <div className="coda">
          <p>
            Those slip away quietly. A Story exists to <em>catch them.</em>
          </p>
        </div>
      </Frame>
    </Scene>
  );
}

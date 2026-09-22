/**
 * Why we started — the founders, on the homepage (after Remento's "Our Story"
 * block, which the founder pointed to): one photograph on the left, a few
 * lines of Daniel's own letter on the right, his signature, and a way into
 * the full letter at /our-story.
 *
 * THE LETTER IS DANIEL'S (the earliest version, 2026-09-15 baseline). Quote
 * it exactly; don't tidy it. The photograph is from the illustrative library
 * — a dinner-table storyteller — not the founder's family, so it carries no
 * caption — a hallway telephone, 1981: the call nobody made. Swap in a real
 * photo of Daniel when there is one.
 */
import styled from "styled-components";
import { ArrowIcon, Picture } from "../kit/kit";
import { Eyebrow, Frame, PrimaryLink } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivoryDeep};
  padding: clamp(96px, 11vw, 176px) 0;

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  .photo {
    position: relative;
    justify-self: center;
    width: min(100%, 460px);
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4 / 4.8;
    box-shadow: 0 40px 80px -50px rgba(42, 31, 24, 0.7);
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 38% center;
    filter: sepia(0.12);
  }
  .photo::after {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px solid color-mix(in srgb, ${color.ivory} 55%, transparent);
    border-radius: 12px;
    pointer-events: none;
  }
  h2 {
    margin-top: 14px;
    font: 400 ${display.lg} / 1.08 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  h2 em {
    font-style: italic;
    color: ${color.accent};
  }
  .letter {
    margin-top: clamp(22px, 2.4vw, 32px);
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.25rem) / 1.7 ${font.display};
    color: ${color.primary};
    max-width: 44ch;
  }
  .letter + .letter {
    margin-top: 14px;
  }
  .sign {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: clamp(28px, 3vw, 40px) 0;
  }
  .sign i {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.gold};
    font: italic 400 24px/1 ${font.display};
    box-shadow:
      0 0 0 3px ${color.ivoryDeep},
      0 0 0 4px color-mix(in srgb, ${color.gold} 60%, transparent);
  }
  .sign b {
    display: block;
    font: 400 20px/1.2 ${font.display};
    color: ${color.primary};
  }
  .sign small {
    font: 500 14px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function Founders() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll(".photo, .letter, .sign, .go"), {
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="founders-title">
      <Frame className="grid">
        <div className="photo">
          <Picture id="12" alt="" sizes="(max-width: 860px) 92vw, 46vw" />
        </div>
        <div>
          <Eyebrow>Why we started</Eyebrow>
          <h2 id="founders-title">
            The conversations we thought <em>could wait.</em>
          </h2>
          <p className="letter">
            Two of my uncles had strokes within months of each other. They lived
            — I want to say that first, because what follows is not a story
            about dying.
          </p>
          <p className="letter">
            I did not know how my grandparents met. I had never thought to ask.
            So I started building A Story: someone to ask, time to listen, and a
            place for a family to keep the answers.
          </p>
          <div className="sign">
            <i aria-hidden="true">D</i>
            <div>
              <b>Daniel Hoang Nguyen</b>
              <small>Co-founder &amp; CEO</small>
            </div>
          </div>
          <div className="go">
            <PrimaryLink to="/our-story">
              Read our story <ArrowIcon />
            </PrimaryLink>
          </div>
        </div>
      </Frame>
    </Scene>
  );
}

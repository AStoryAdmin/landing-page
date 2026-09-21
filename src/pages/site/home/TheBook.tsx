/**
 * Movement 5 — the object, and the open end (mission.md): any chapter can
 * become a book; the story does not stop when the book is made.
 *
 * The book is staged the way a jeweller shows a piece — on the namecard's
 * dark ground under a warm pool of light — so the teal binding reads as
 * precious rather than off-palette (design-brief §9a). Teal therefore means
 * two things on this site and nothing else: the conversation, and the book.
 * The slipcase stays out of the marketing presentation.
 *
 * The headline says the book is a chapter before it says anything about the
 * object, so the physical thing never reads as the product's finish line.
 * Figures come from `pricing.ts` and are never restated by hand.
 */
import { useState } from "react";
import styled from "styled-components";
import { PRICE } from "../../../lib/pricing";
import { ArrowIcon } from "../kit/kit";
import { Eyebrow, Frame, Statement, TextLink, grounds } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";

const VIEWS = {
  closed: { label: "The cover", w: 1200, h: 1609, alt: "The A Story hardcover, closed, in its teal binding" },
  open: { label: "Inside", w: 1200, h: 709, alt: "The A Story hardcover open to a spread of photographs and text" },
} as const;
type View = keyof typeof VIEWS;

const Scene = styled.section`
  --ink: ${grounds.night.ink};
  --muted: ${grounds.night.muted};
  --line: ${grounds.night.line};
  --mark: ${grounds.night.mark};
  --label: ${grounds.night.label};
  background: radial-gradient(ellipse 55% 60% at 70% 50%, color-mix(in srgb, ${color.gold} 14%, ${color.night}) 0%, ${color.night} 70%);
  color: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0;
  overflow: hidden;

  .book-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: center;
  }
  .book-lead {
    margin-top: 26px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 40ch;
  }
  .price {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin: 34px 0 8px;
    padding-top: 22px;
    border-top: 1px solid var(--line);
  }
  .price b {
    font: 400 clamp(2.4rem, 1.8rem + 1.6vw, 3.4rem) / 1 ${font.display};
    color: ${color.ivory};
  }
  .price span {
    font: 400 16px/1.4 ${font.body};
    color: var(--muted);
  }
  .book-stage {
    display: grid;
    justify-items: center;
    gap: 28px;
  }
  .book-object {
    width: 100%;
    height: clamp(320px, 42vw, 560px);
    display: grid;
    place-items: center;
  }
  .book-object img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    filter: drop-shadow(0 50px 40px rgba(0, 0, 0, 0.55));
    will-change: transform;
  }
  .views {
    display: flex;
    gap: 28px;
  }
  .views button {
    min-height: 48px;
    padding: 10px 0;
    border: 0;
    border-bottom: 1px solid transparent;
    background: none;
    color: var(--muted);
    font: 500 16px/1 ${font.body};
    cursor: pointer;
  }
  .views button[aria-pressed="true"] {
    color: ${color.ivory};
    border-bottom-color: ${color.gold};
  }
  .views button:focus-visible {
    outline: 3px solid ${color.gold};
    outline-offset: 4px;
  }
  ${media.md} {
    .book-grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .book-stage {
      order: -1;
    }
  }
`;

export default function TheBook() {
  const [view, setView] = useState<View>("closed");
  const v = VIEWS[view];
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(".book-lead, .price, .book-copy a", {
      y: 24,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
    // The book rises into the light as the section crosses the viewport.
    gsap.fromTo(
      ".book-object",
      { yPercent: 16, rotate: -4 },
      {
        yPercent: -6,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <Scene ref={ref} id="book" aria-labelledby="book-title">
      <Frame className="book-grid">
        <div className="book-copy">
          <Eyebrow>Something to hold</Eyebrow>
          <Statement id="book-title" $size="xl">
            The book is a <em>chapter.</em> The archive keeps going.
          </Statement>
          <p className="book-lead">
            Print any chapter as a hardcover when you’re ready — not when the
            story is over. The conversations, photographs and voices keep
            growing around it.
          </p>
          <p className="price">
            <b>{PRICE.book}</b>
            <span>
              The Keepsake book · {PRICE.bookPages}
            </span>
          </p>
          <TextLink to="/pricing#book">
            See book options <ArrowIcon />
          </TextLink>
        </div>
        <div className="book-stage">
          <div className="book-object">
            <img
              src={`/book-objects/${view}-1200.webp`}
              srcSet={`/book-objects/${view}-640.webp 640w, /book-objects/${view}-1200.webp 1200w, /book-objects/${view}-1800.webp 1800w`}
              sizes="(max-width: 860px) 80vw, 600px"
              width={v.w}
              height={v.h}
              alt={v.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="views" aria-label="Book views">
            {(Object.keys(VIEWS) as View[]).map((k) => (
              <button key={k} aria-pressed={view === k} onClick={() => setView(k)}>
                {VIEWS[k].label}
              </button>
            ))}
          </div>
        </div>
      </Frame>
    </Scene>
  );
}

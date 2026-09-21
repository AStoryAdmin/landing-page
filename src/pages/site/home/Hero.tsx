/**
 * The first screen. It must answer three things before any scrolling
 * (design-brief §3): why this exists — the headline, the company's own
 * opening line (mission.md; not to be rewritten); what it is — one sentence;
 * and what to do — one primary action and one way to see the product.
 *
 * Photograph 27 is the thing A Story is trying to catch: someone mid-story at
 * dinner, everyone listening, nobody writing it down. It earns a full-bleed
 * crop (registry cropMode permits controlled crops for openings). No caption:
 * the photograph and the headline say the same thing, so a caption would
 * only narrate what is already visible.
 *
 * The headline is set in Source Serif, as on the namecard and in the app's
 * onboarding, with one word in brass — the word the whole product answers.
 */
import styled from "styled-components";
import { introReleased } from "./introSignal";
import { ArrowIcon, Picture } from "../kit/kit";
import { Frame, PrimaryLink, TextLink, onDarkActions } from "../kit/kit.styles";
import {
  gsap,
  openMasks,
  SplitText,
  useScene,
} from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.ivory};
  --mark: ${color.gold};
  position: relative;
  /* The header floats over the photograph on this route only. */
  margin-top: calc(-1 * var(--nav-total));
  min-height: max(100svh, 680px);
  display: flex;
  align-items: flex-end;
  color: ${color.ivory};
  background: ${color.primary};
  overflow: hidden;
  ${onDarkActions};

  .hero-photo {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .hero-photo img {
    width: 100%;
    height: 118%;
    object-fit: cover;
    object-position: 50% 38%;
    will-change: transform;
  }
  /* Legibility comes from the brand chocolate, never a neutral black wash. */
  .hero-photo::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to top,
        color-mix(in srgb, ${color.primary} 94%, transparent) 0%,
        color-mix(in srgb, ${color.primary} 55%, transparent) 38%,
        transparent 68%
      ),
      linear-gradient(
        to bottom,
        color-mix(in srgb, ${color.black} 50%, transparent),
        transparent 22%
      );
  }

  .hero-body {
    position: relative;
    padding-bottom: clamp(72px, 9vw, 132px);
  }
  h1 {
    font: 400 ${display.hero} / 0.98 ${font.display};
    letter-spacing: -0.03em;
    color: ${color.ivory};
    max-width: 20ch;
    margin: 0 0 clamp(28px, 3vw, 44px) -0.03em;
  }
  h1 em {
    white-space: nowrap;
    font-style: italic;
    color: ${color.gold};
  }
  .hero-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: clamp(24px, 4vw, 72px);
    align-items: end;
  }
  .hero-lead {
    font: 400 clamp(1.15rem, 1rem + 0.45vw, 1.4rem) / 1.5 ${font.body};
    color: ${color.ivory};
    max-width: 40ch;
  }
  .hero-actions {
    display: flex;
    gap: 16px 32px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  ${media.md} {
    min-height: max(100svh, 620px);
    .hero-photo img {
      object-position: 42% 30%;
    }
    .hero-row {
      grid-template-columns: minmax(0, 1fr);
    }
    .hero-actions a:first-child {
      flex: 1 1 100%;
    }
  }
`;

export default function Hero() {
  const ref = useScene<HTMLElement>((root) => {
    const photo = root.querySelector(".hero-photo img");
    const title = root.querySelector("h1")!;
    const rest = root.querySelectorAll(".hero-row > *");
    gsap.set(rest, { opacity: 0, y: 24 });
    gsap.set(photo, { scale: 1.18 });
    // Lines are held down until the intro cover starts lifting. A re-split
    // (font swap, resize) builds a fresh tween, so keep only the latest.
    let released = false;
    let disposed = false;
    let entrance: gsap.Context | undefined;
    let rise: gsap.core.Tween | undefined;
    SplitText.create(title, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (split) => {
        openMasks(split.masks);
        return (rise = gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          paused: !released,
        }));
      },
    });
    introReleased.then(() => {
      if (disposed) return;
      released = true;
      rise?.play();
      entrance = gsap.context(() => {
        gsap.to(photo, { scale: 1, duration: 2.4, ease: "expo.out" });
        gsap.to(rest, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.45,
        });
      }, root);
    });
    // Leaving: the photograph drifts slower than the page, the words go first.
    gsap.to(".hero-photo img", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".hero-body", {
      yPercent: -18,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "35% top",
        end: "bottom top",
        scrub: true,
      },
    });
    // Navigation can unmount the hero before the intro promise resolves.
    return () => {
      disposed = true;
      entrance?.kill(false);
    };
  });

  return (
    <Scene ref={ref} aria-labelledby="hero-title">
      <div className="hero-photo">
        <Picture
          id="27"
          alt="Someone telling a story at a dinner table while everyone listens, around 1980"
          sizes="100vw"
          priority
        />
      </div>
      <Frame className="hero-body">
        <h1 id="hero-title">
          Most of a life goes <em>undocumented.</em>
        </h1>
        <div className="hero-row">
          <div>
            <p className="hero-lead">
              A Story calls someone you love, listens, and follows up the way
              someone who knows them would. What they say becomes a private
              archive the whole family can add to.
            </p>
            <div className="hero-actions">
              <PrimaryLink to="/start">
                Join the waitlist <ArrowIcon />
              </PrimaryLink>
              <TextLink to="/#listen">Hear a conversation</TextLink>
            </div>
          </div>
        </div>
      </Frame>
    </Scene>
  );
}

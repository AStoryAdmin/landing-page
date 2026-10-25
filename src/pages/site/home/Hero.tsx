/**
 * The first screen (2026-10-24, back from the past home, bd23f2f, at Bao's
 * request: "the home page is much stronger in the past ver").
 *
 * Photograph 27 fills the window under the bar: someone mid-story at Sunday
 * dinner, everyone listening, nobody writing it down - the thing A Story is
 * trying to catch. 2026-10-25 (Plan 2, section 1): the eyebrow names the
 * category ("The AI biographer for families"), the headline is the slogan,
 * and the sentence is the daily habit - a relative's question in their own
 * voice, answered just by talking. Before, the headline was the app's own
 * line ("Every life holds a story worth keeping.", Bao 2026-10-23) and the
 * sentence said A Story "calls your parents". Then the two doors and the
 * honest small print: the iPhone app is in private beta, and the simple
 * link comes next (copy wording for Daniel and Bao to approve).
 *
 * Type floor (Bao, 2026-10-24: "i despised the small text everywhere"): the
 * sentence is EB Garamond at 20px or more (18px on a phone), the small print
 * 16px, the buttons 16px.
 *
 * Motion: the photograph settles from a slight scale, the headline rises by
 * line and the rest follows, about a second and a half, with nothing waiting
 * on a 5-second cover (Intro.tsx stays off Home). Scrolling away, the
 * photograph drifts slower than the page. Under reduced motion the screen is
 * simply there.
 */
import styled from "styled-components";
import { ArrowIcon, Picture } from "../kit/kit";
import { Eyebrow, Frame, PrimaryLink, TextLink, onDarkActions } from "../kit/kit.styles";
import { gsap, openMasks, SplitText, useScene } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";
import { START_HREF, START_LABEL } from "../../../lib/app";
import { OFFERS } from "../../../lib/founding";

const Scene = styled.section`
  --ink: ${color.onDark};
  --focus: ${color.gold};
  --focus-halo: ${color.chocolateDeep};
  --mark: ${color.gold};
  --label: ${color.gold};
  position: relative;
  min-height: max(calc(100svh - var(--nav-total, 88px)), 640px);
  display: flex;
  align-items: flex-end;
  color: ${color.onDark};
  background: ${color.chocolate};
  overflow: hidden;
  ${onDarkActions};

  .hero-photo {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .hero-photo img {
    width: 100%;
    height: 116%;
    object-fit: cover;
    object-position: 50% 34%;
  }
  /* Legibility comes from the brand chocolate, never a neutral black wash. */
  .hero-photo::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to top,
        color-mix(in srgb, ${color.chocolateInk} 96%, transparent) 0%,
        color-mix(in srgb, ${color.chocolateInk} 70%, transparent) 34%,
        color-mix(in srgb, ${color.chocolateInk} 12%, transparent) 64%,
        transparent 80%
      ),
      linear-gradient(
        to right,
        color-mix(in srgb, ${color.chocolateInk} 55%, transparent),
        transparent 62%
      );
  }

  .hero-body {
    position: relative;
    padding: clamp(96px, 14svh, 180px) 0 clamp(56px, 8svh, 112px);
  }
  h1 {
    margin: 0 0 clamp(22px, 2.6vw, 40px) -0.02em;
    font: 600 clamp(3.2rem, 1.1rem + 5.4vw, 9.5rem) / 0.98 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.onDark};
    max-width: 22ch;
    text-wrap: balance;
  }
  h1 em {
    font-style: normal;
    white-space: nowrap;
    color: ${color.gold};
  }
  .hero-lead {
    font: 400 clamp(1.25rem, 1.05rem + 0.5vw, 1.75rem) / 1.5 ${font.text};
    color: ${color.onDark};
    max-width: 40ch;
    text-wrap: pretty;
  }
  .hero-actions {
    display: flex;
    gap: 14px 32px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: clamp(26px, 2.6vw, 40px);
  }
  /* The text door on the photograph: ivory, 16px. */
  .hero-actions a + a {
    font-size: 16px;
    color: ${color.onDark};
  }
  .hero-small {
    margin-top: clamp(20px, 2vw, 28px);
    max-width: 52ch;
    font: 400 16px/1.6 ${font.ui};
    color: ${color.onDarkMuted};
  }

  ${media.md} {
    .hero-photo img {
      object-position: 70% 30%;
    }
    .hero-body {
      padding-top: clamp(220px, 34svh, 320px);
    }
    h1 {
      font-size: clamp(2.5rem, 10.2vw, 3.6rem);
    }
    .hero-lead {
      font-size: 18px;
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
    const rest = root.querySelectorAll(".hero-eyebrow, .hero-lead, .hero-actions, .hero-small");
    gsap.fromTo(photo, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "house-out" });
    gsap.fromTo(
      rest,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 1.1, ease: "house-out", stagger: 0.08, delay: 0.45 },
    );
    SplitText.create(title, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (split) => {
        openMasks(split.masks);
        return gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: "house-out",
          stagger: 0.1,
          delay: 0.1,
        });
      },
    });
    // Leaving: the photograph drifts slower than the page.
    gsap.to(photo, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="hero-title">
      <div className="hero-photo">
        <Picture
          id="27"
          alt="A grandfather telling a story at Sunday dinner while the whole family listens, around 1980"
          sizes="100vw"
          priority
        />
      </div>
      <Frame className="hero-body">
        <Eyebrow className="hero-eyebrow">The AI biographer for families</Eyebrow>
        <h1 id="hero-title">
          Your Family’s <em>Living Memories</em>
        </h1>
        <p className="hero-lead">
          Each day, someone in the family sends Grandma a question in their own
          voice. She answers just by talking - in the app or from a simple
          link, in Vietnamese or English. A Story asks the follow-up a good
          biographer would, and keeps every story and lesson in her own voice,
          for a printed book.
        </p>
        <div className="hero-actions">
          <PrimaryLink to={START_HREF}>
            {START_LABEL} <ArrowIcon />
          </PrimaryLink>
          <TextLink to="/reserve">
            Reserve for {OFFERS.reserve.price} <ArrowIcon />
          </TextLink>
        </div>
        <p className="hero-small">
          Start free in your browser, no card. The A Story iPhone app is in
          private beta, and answering from a simple link comes next. Reserve,
          and we email you when it opens.
        </p>
      </Frame>
    </Scene>
  );
}

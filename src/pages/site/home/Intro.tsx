/**
 * The first-visit opening: THE GATHERING.
 *
 * A brass rule lies across the dark, the years running along it. As the count
 * climbs, photographs rise out of the rule at the year they were taken — a
 * life, scattered, the way a family actually holds it. Then they gather,
 * oldest first, into one block at the centre, boards close around them, and
 * the block *is* the keepsake volume in the cover the product prints. The
 * name resolves above it and the whole thing lifts away on the curved edge
 * the rest of the site turns its pages with.
 *
 * The scene is WebGL (introGather.ts). It was a namecard, then a CSS-3D book,
 * then a CSS-3D corridor; all three read as flat rectangles, because what the
 * opening has to sell is depth and CSS perspective cannot light a surface.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TEAL AND BRASS ONLY. The site's chocolate goes muddy against the teal and
 * has no part in this scene. The room is the namecard's teal at the bottom
 * of its range; everything that catches light is brass.
 *
 * THE COVER IS PAINTED BEFORE REACT BOOTS. `index.html` adds `html.intro`
 * from an inline script (first home visit per session, motion allowed) and a
 * CSS rule paints the ground immediately, so the prerendered hero never
 * flashes underneath. This component takes over that cover and must always
 * remove the class, or the page stays behind it. The inline script also has
 * its own timeout for when this bundle never arrives.
 *
 * Under `prefers-reduced-motion` the inline script never sets the class, so
 * none of this is built and the homepage is simply the homepage. Any input —
 * a key, a wheel, a touch — runs the remainder out at speed, and there is a
 * Skip that says so: an opening nobody can leave is a toll gate.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "../../../lib/scrollMotion";
import {
  LOGO_LETTER_PATH,
  LOGO_WAVEFORM_PATH,
  SIMPLE_NAME_STORY_PATH,
} from "../../../components/ui/logoPaths";
import geometry from "../../../components/ui/logoGeometry.json";
import { color, font, media } from "../../../styles/theme";
import type { Gather } from "./introGather";
import { releaseIntro as release } from "./introSignal";

type SceneState = Gather["state"];

const SEEN = "astory-intro-seen";
const FIRST_YEAR = 1952;
const THIS_YEAR = 2026;
/** Marks along the rule; each lights as the running year passes it. */
const DECADES = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
const at = (year: number) =>
  ((year - FIRST_YEAR) / (THIS_YEAR - FIRST_YEAR)) * 100;

/** The bottom of the teal range: the room, and anything not yet lit. */
const ROOM = "#04161C";
/**
 * When the scene starts getting out of the way. A skip seeks here rather than
 * cutting: the reader still gets the page-turn onto the homepage, which is
 * the same exit they would have seen, just now.
 */
const EXIT = 4.0;

const Cover = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  color: ${color.ivory};
  clip-path: ellipse(160% 150% at 50% 0%);
  background:
    radial-gradient(
      ellipse 56% 52% at 42% 30%,
      rgba(216, 174, 77, 0.13),
      transparent 66%
    ),
    radial-gradient(ellipse 130% 100% at 50% 56%, #0c3d49 0%, ${ROOM} 78%);

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  /* ── The name, arriving above the plate it was made from ───────────── */
  .arrival {
    position: absolute;
    left: 50%;
    top: 21%;
    width: min(56vw, 96vh);
    translate: -50% -50%;
    display: grid;
    justify-items: center;
    text-align: center;
  }
  .arrival svg {
    width: min(30vw, 34vh);
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.55));
  }
  .arrival .tagline {
    margin-top: 0.7em;
    font: 400 clamp(13px, 0.6rem + 0.7vw, 22px) / 1.3 ${font.body};
    letter-spacing: 0.04em;
    color: ${color.onDarkMuted};
  }
  .arrival .keyline {
    width: clamp(48px, 5vw, 84px);
    height: 1px;
    margin: clamp(16px, 2.6vh, 32px) 0;
    background: ${color.warmGold};
  }
  .arrival .motto {
    font: 400 clamp(1.2rem, 0.8rem + 1.6vw, 2.7rem) / 1.3 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.ivory};
    text-shadow: 0 6px 28px rgba(0, 0, 0, 0.6);
  }
  .arrival .motto i {
    color: ${color.warmGold};
  }

  /* ── The rule at the foot: the years, counted ───────────────────────── */
  .foot {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    gap: clamp(14px, 2vh, 22px);
    padding: 0 clamp(24px, 6vw, 96px) clamp(26px, 4.5vh, 52px);
  }
  /* A scrim, so the rule and the year survive the light passing behind. */
  .foot::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 170%;
    background: linear-gradient(
      to top,
      ${ROOM} 8%,
      rgba(4, 22, 28, 0.62) 44%,
      transparent 100%
    );
    pointer-events: none;
  }
  .foot > * {
    position: relative;
  }
  .foot-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
    font: italic 400 clamp(15px, 0.7rem + 0.6vw, 22px) / 1.3 ${font.display};
    color: ${color.onDarkMuted};
  }
  .year {
    font: 400 clamp(2.2rem, 1.2rem + 2.8vw, 4.6rem) / 1 ${font.display};
    font-style: normal;
    font-variant-numeric: lining-nums tabular-nums;
    letter-spacing: -0.02em;
    color: ${color.warmGold};
    min-width: 4.6ch;
    text-align: right;
  }

  /*
   * The timeline, set like a book's ornamental rule: a double keyline, capped
   * with diamonds, a lozenge at every decade that fills in brass as the year
   * passes it, and a glowing brass bead riding the head of the fill.
   */
  .timeline {
    position: relative;
    height: clamp(40px, 5vh, 56px);
    margin: 0 8px;
  }
  .track,
  .fill {
    position: absolute;
    left: 0;
    right: 0;
    top: 6px;
    height: 5px;
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
  .track {
    border-color: color-mix(in srgb, ${color.warmGold} 28%, transparent);
  }
  .fill {
    border-color: ${color.warmGold};
    transform: scaleX(0);
    transform-origin: left;
  }
  .cap,
  .lozenge i,
  .bead {
    position: absolute;
    top: 8.5px;
    width: 9px;
    height: 9px;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .cap {
    background: ${color.warmGold};
  }
  .cap.end {
    left: 100%;
    background: ${ROOM};
    border: 1px solid ${color.warmGold};
  }
  .cap.start {
    left: 0;
  }
  .lozenge {
    position: absolute;
    top: 0;
  }
  .lozenge i {
    left: 0;
    width: 7px;
    height: 7px;
    background: ${ROOM};
    border: 1px solid color-mix(in srgb, ${color.warmGold} 55%, transparent);
    transition:
      background 350ms,
      border-color 350ms;
  }
  .lozenge span {
    position: absolute;
    top: 22px;
    left: 0;
    transform: translateX(-50%);
    font: italic 400 clamp(13px, 0.6rem + 0.45vw, 17px) / 1 ${font.display};
    font-variant-numeric: oldstyle-nums;
    color: color-mix(in srgb, ${color.onDarkMuted} 70%, transparent);
    transition: color 350ms;
  }
  .lozenge.passed i {
    background: ${color.warmGold};
    border-color: ${color.warmGold};
  }
  .lozenge.passed span {
    color: ${color.warmGold};
  }
  .bead {
    left: 0;
    width: 13px;
    height: 13px;
    background: ${color.warmGold};
    box-shadow:
      0 0 0 4px color-mix(in srgb, ${color.warmGold} 22%, transparent),
      0 0 22px 4px color-mix(in srgb, ${color.warmGold} 45%, transparent);
  }

  /* The way out. Always offered, never in the way. */
  /*
   * The way out, said plainly. A click anywhere does the same thing, but the
   * reader should not have to guess that, so this reads as a control rather
   * than as a watermark.
   */
  .skip {
    position: absolute;
    /* Top right: the foot belongs to the years, and the rule runs under it. */
    right: clamp(20px, 3vw, 44px);
    top: clamp(20px, 3vh, 40px);
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-height: 40px;
    padding: 0 18px;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 42%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, ${ROOM} 55%, transparent);
    backdrop-filter: blur(6px);
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${color.onDarkMuted};
    cursor: pointer;
    transition:
      color 200ms ease,
      border-color 200ms ease,
      background 200ms ease;
  }
  .skip svg {
    width: 13px;
    height: 13px;
  }
  @media (hover: hover) and (pointer: fine) {
    .skip:hover {
      color: ${color.warmGold};
      border-color: ${color.warmGold};
      background: color-mix(in srgb, ${ROOM} 80%, transparent);
    }
  }
  .skip:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }
  .skip:focus-visible {
    outline: 2px solid ${color.warmGold};
    outline-offset: 4px;
  }

  ${media.md} {
    .arrival {
      width: min(88vw, 82vh);
      top: 19%;
    }
    .arrival svg {
      width: min(58vw, 26vh);
    }
    .lozenge span {
      display: none;
    }
    .foot-row > span:first-child {
      max-width: 18ch;
    }
  }
`;

/**
 * The lockup, drawn inline. The site's Logo component is a link to the
 * homepage; the intro is a cover, not navigation, so it draws the same paths
 * with the same geometry and no anchor around them.
 */
function Mark() {
  return (
    <svg viewBox={geometry.viewBox} aria-hidden="true">
      <g transform={geometry.markTransform}>
        <path d={LOGO_LETTER_PATH} fill={color.onDark} fillRule="evenodd" />
        <path d={LOGO_WAVEFORM_PATH} fill={color.warmGold} fillRule="evenodd" />
      </g>
      <path
        transform={geometry.storyTransform}
        d={SIMPLE_NAME_STORY_PATH}
        fill={color.gold}
        fillRule="evenodd"
      />
    </svg>
  );
}

function introRequested() {
  return document.documentElement.classList.contains("intro");
}

export default function Intro() {
  const [active, setActive] = useState(introRequested);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const year = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!active || !el) {
      html.classList.remove("intro");
      release();
      return;
    }
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* Private mode: the intro may play again, which is harmless. */
    }
    // This component's cover now stands where the inline one was.
    html.classList.remove("intro");
    document.body.style.overflow = "hidden";

    const q = gsap.utils.selector(el);
    const ticks = q(".lozenge") as HTMLElement[];
    const counter = { value: FIRST_YEAR };
    let tl: gsap.core.Timeline | undefined;
    let ctx: ReturnType<typeof gsap.context> | undefined;
    let scene: { state: SceneState; dispose: () => void } | null = null;
    let cancelled = false;

    const build = (
      createScene: (c: HTMLCanvasElement) => {
        state: SceneState;
        dispose: () => void;
      } | null,
    ) => {
      if (cancelled || !canvas.current) return;
      scene = createScene(canvas.current);

      // A context, so cleanup reverts every from() to its authored state —
      // StrictMode's rehearsal run would otherwise leave the contents at 0.
      ctx = gsap.context(() => {
        tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setActive(false);
          },
        });

        /* 1. The plate resolves out of the dark, lying in raking light. */
        tl.from(q("canvas"), { opacity: 0, duration: 0.7, ease: "power2.out" });

        /*
         * The name is there from the first second and stays there. It was
         * arriving small and zooming up at the end, which put the reading at
         * the busiest moment and made the whole opening feel hurried. Now the
         * page says what it is immediately, and the life accumulates around
         * it while it holds.
         */
        const arrival = q(".arrival");

        /* The name, up front and held. */
        tl.from(
          arrival,
          { opacity: 0, y: 22, duration: 0.95, ease: "expo.out" },
          0.12,
        );

        if (scene) {
          const st = scene.state;
          /*
           * The volume is already there, shut. All that happens is that a
           * life fades up around it, one photograph at a time, and then goes
           * into it. Nothing binds and the camera does not move.
           */
          tl.to(st, { reveal: 1, duration: 2.1, ease: "none" }, 0.5)
            .to(st, { dust: 1, duration: 1.6, ease: "power2.out" }, 0.6)
            /* And at the end, they go in. */
            .to(st, { gather: 1, duration: 1.05, ease: "power2.inOut" }, 2.75);
        }

        /*
         * The years, counted along the foot. They run for exactly as long as
         * the prints are rising, because they are the same event: each print
         * comes up at the year the counter is reading.
         */
        tl.to(
          counter,
          {
            value: THIS_YEAR,
            duration: 2.1,
            ease: "none",
            onUpdate: () => {
              const y = Math.round(counter.value);
              if (year.current) year.current.textContent = String(y);
              ticks.forEach((t) =>
                t.classList.toggle("passed", Number(t.dataset.year) <= y),
              );
            },
          },
          0.5,
        )
          .to(q(".fill"), { scaleX: 1, duration: 2.1, ease: "none" }, 0.5)
          .fromTo(
            q(".bead"),
            { left: "0%" },
            { left: "100%", duration: 2.1, ease: "none" },
            0.5,
          )
          .add(() => {
            if (year.current) year.current.textContent = "Today";
          }, 2.7)
          /*
           * Leaving. The scene lifts on the curved edge the rest of the site
           * turns its pages with, onto the photograph underneath.
           */
          .add(() => release(), EXIT)
          .to(
            el,
            {
              clipPath: "ellipse(160% 0% at 50% 0%)",
              duration: 0.8,
              ease: "expo.inOut",
            },
            EXIT,
          );
      }, el);
    };

    /*
     * If the scene cannot be fetched at all — offline after the shell was
     * cached, a blocked chunk — the opening still runs on its flat ground and
     * still gets out of the way, because build() does not depend on it.
     */
    import("./introGather")
      .then((m) => build(m.createGather))
      .catch(() => build(() => null));

    /*
     * Skip means skip. It used to run the remainder at 6x, which is still
     * most of a second of watching something you asked to leave. It now seeks
     * to the exit — every tween lands on its final state on the way past, and
     * the page-turn plays out from there.
     */
    const skip = () => {
      if (!tl || tl.time() >= EXIT) return;
      tl.seek(EXIT - 0.01, false);
      tl.play();
    };
    skipRef.current = skip;
    /*
     * A stray click no longer dismisses this. Clicking anywhere is not a
     * request to leave — people click to focus a window, to stop a scroll, by
     * accident — and having the opening vanish under them reads as a bug.
     * The button says what it does; Escape and a scroll are the only other
     * signals that unambiguously mean "I want the page".
     */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", skip, { passive: true });

    // No release() in cleanup: StrictMode's rehearsal unmount would start the
    // hero under a cover that is about to be rebuilt.
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", skip);
      ctx?.revert();
      scene?.dispose();
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;
  return (
    <Cover ref={root}>
      <canvas ref={canvas} aria-hidden="true" />

      <div className="arrival" aria-hidden="true">
        <Mark />
        <p className="tagline">Your Family’s Living Memories</p>
        <span className="keyline" />
        <p className="motto">
          Not a memoir to finish —
          <br />
          <i>A Story</i> to keep, and to carry on.
        </p>
      </div>

      <div className="foot" aria-hidden="true">
        <div className="foot-row">
          <span>A story of you, by you, and yours</span>
          <span className="year" ref={year}>
            {FIRST_YEAR}
          </span>
        </div>
        <div className="timeline">
          <span className="track" />
          <span className="fill" />
          <span className="cap start" />
          <span className="cap end" />
          {DECADES.map((d) => (
            <span
              key={d}
              className="lozenge"
              data-year={d}
              style={{ left: `${at(d)}%` }}
            >
              <i />
              <span>{d}</span>
            </span>
          ))}
          <span className="bead" />
        </div>
      </div>

      <button type="button" className="skip" onClick={() => skipRef.current()}>
        Skip intro
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 5l7 7-7 7M13 5l7 7-7 7" />
        </svg>
      </button>
    </Cover>
  );
}

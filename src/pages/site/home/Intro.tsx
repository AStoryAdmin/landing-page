/**
 * The first-visit intro: the A Story namecard, set as the whole screen.
 *
 * The founder asked for the card's design at full size — not a card floating
 * on a background (Namecard_astory.pdf, teal edition). So the viewport is the
 * card: the teal ground, the ivory-and-brass lockup centred with "Your
 * Family's Living Memories", the line from the card's back — "Not a memoir to
 * finish, A Story to keep, and to carry on" — beneath it, and the card's two
 * small lines at its foot. Where the card prints the web address, the year
 * runs from 1952 to Today along a timeline rule whose decade marks light as
 * they are passed. Then the whole card lifts off the opening photograph.
 *
 * The printer's crop marks from the PDF proof are deliberately absent: they
 * are production marks, not part of the design.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE COVER IS PAINTED BEFORE REACT BOOTS. `index.html` adds `html.intro`
 * from an inline script (first home visit per session, motion allowed) and a
 * CSS rule paints this teal immediately, so the prerendered hero never
 * flashes underneath. This component takes over that cover and must always
 * remove the class, or the page stays behind it. The inline script also has
 * its own timeout for when this bundle never arrives.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logo from "../../../components/ui/Logo";
import { gsap } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";
import { releaseIntro as release } from "./introSignal";

const SEEN = "astory-intro-seen";
const FIRST_YEAR = 1952;
const THIS_YEAR = 2026;
/** Marks along the rule; each lights as the running year passes it. */
const DECADES = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
const at = (year: number) =>
  ((year - FIRST_YEAR) / (THIS_YEAR - FIRST_YEAR)) * 100;

const Cover = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  grid-template-rows: 1fr auto;
  background: ${color.teal};
  color: ${color.ivory};
  clip-path: inset(0 0 0 0);
  padding: 0 clamp(24px, 6vw, 96px) clamp(28px, 5vh, 56px);

  .centre {
    display: grid;
    justify-items: center;
    align-content: center;
    text-align: center;
  }
  .centre a {
    pointer-events: none;
  }
  /* Sized against both width and height, so the card fills a laptop or a tall phone. */
  .centre svg {
    height: min(19vw, 27vh);
    width: auto;
  }
  .tagline {
    margin-top: 0.5em;
    font: 400 clamp(16px, 0.8rem + 0.9vw, 28px) / 1.3 ${font.body};
    letter-spacing: 0.03em;
    color: ${color.onDarkMuted};
  }
  .keyline {
    width: clamp(56px, 6vw, 96px);
    height: 1px;
    margin: clamp(28px, 5vh, 56px) 0;
    background: ${color.warmGold};
    transform-origin: center;
  }
  .motto {
    font: 400 clamp(1.6rem, 0.9rem + 2.5vw, 3.8rem) / 1.28 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.ivory};
  }
  .motto i {
    color: ${color.warmGold};
  }

  .foot {
    display: grid;
    gap: clamp(14px, 2vh, 22px);
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
    height: clamp(44px, 6vh, 60px);
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
    background: ${color.teal};
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
    background: ${color.teal};
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
  ${media.sm} {
    .lozenge span {
      display: none;
    }
    .foot-row > span:first-child {
      max-width: 18ch;
    }
  }
`;

function introRequested() {
  return document.documentElement.classList.contains("intro");
}

export default function Intro() {
  const [active, setActive] = useState(introRequested);
  const root = useRef<HTMLDivElement>(null);
  const year = useRef<HTMLSpanElement>(null);

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

    // A context, so cleanup reverts every from() to its authored state —
    // StrictMode's rehearsal run would otherwise leave the contents at 0.
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setActive(false);
          },
        })
        .from(q(".centre svg"), {
          y: 24,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
        })
        .from(
          q(".tagline"),
          { y: 12, opacity: 0, duration: 0.9, ease: "expo.out" },
          0.2,
        )
        .from(
          q(".keyline"),
          { scaleX: 0, duration: 0.9, ease: "expo.inOut" },
          0.35,
        )
        .from(
          q(".motto"),
          { y: 16, opacity: 0, duration: 1, ease: "expo.out" },
          0.5,
        )
        .from(q(".foot"), { opacity: 0, duration: 0.7 }, 0.5)
        .to(
          counter,
          {
            value: THIS_YEAR,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              const y = Math.round(counter.value);
              if (year.current) year.current.textContent = String(y);
              ticks.forEach((t) =>
                t.classList.toggle("passed", Number(t.dataset.year) <= y),
              );
            },
          },
          0.8,
        )
        .to(q(".fill"), { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.8)
        .fromTo(
          q(".bead"),
          { left: "0%" },
          { left: "100%", duration: 2, ease: "power2.inOut" },
          0.8,
        )
        .add(() => {
          if (year.current) year.current.textContent = "Today";
        })
        .add(() => release(), "+=0.6")
        .to(
          el,
          { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.inOut" },
          "<",
        );
    }, el);

    // No release() in cleanup: StrictMode's rehearsal unmount would start the
    // hero under a cover that is about to be rebuilt.
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;
  return (
    <Cover ref={root} aria-hidden="true">
      <div className="centre">
        <Logo tone="dark" height={140} />
        <p className="tagline">Your Family’s Living Memories</p>
        <span className="keyline" />
        <p className="motto">
          Not a memoir to finish —
          <br />
          <i>A Story</i> to keep, and to carry on.
        </p>
      </div>
      <div className="foot">
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
    </Cover>
  );
}

import {
  arrival,
  gsap,
  refreshWhenSettled,
  riseLines,
  useScene,
} from "../../../lib/scrollMotion";
import { IN_MAIN } from "./premium";

/*
 * Premium pass, panel round 2 (CHIEF-LOG B1.1): off home every arrival
 * takes 300 ms or less, with no cascade, and a headline fades up as one
 * block instead of rising line by line. The page opening's first screen
 * has no arrival at all there (kit.tsx PageOpening). Home keeps the
 * timings below unchanged.
 */
const QUICK = 0.3;

/**
 * The shared arrivals for every route (phase 2, 2026-10-23). Mark elements
 * and the kind of thing they are decides how they arrive, so a page is not
 * one identical fade-up on every block:
 *
 *   data-lines            a headline rises line by line from its mask
 *                         (`data-lines="0.2"` holds it back 0.2s)
 *   data-rise             a block lifts in (0.7s). Siblings arrive together
 *                         as a cascade from one trigger, 60ms apart.
 *   data-rise="row"       a list row: a shorter lift, a quicker cascade
 *   data-rise="settle"    a picture or an object: it settles from 3% larger
 *                         as if laid down on the table (0.9s)
 *   data-print            a print laid down by hand: it drops the last few
 *                         pixels and takes its turn (0.9s)
 *   data-drift="5"        the one scrubbed move: a photograph crossing the
 *                         window a few per cent slower than the words
 *
 * All on the house curve ("house-out"), transform and opacity only. Nothing
 * is hidden in CSS: under reduced motion, in the prerender and without
 * script every element is simply there. A block whose start the page can
 * never scroll to (the foot of a short page) arrives at once (`arrival`),
 * and positions are re-measured once fonts and images settle.
 */
export function useReveals<T extends HTMLElement>() {
  return useScene<T>((root) => {
    const quick = !!root.closest(IN_MAIN);
    /* Off home, whatever starts on the first screen (and the page's H1,
       wherever it sits) is simply there: no arrival to wait for. */
    const still = (el: HTMLElement) =>
      quick &&
      (el.tagName === "H1" ||
        el.getBoundingClientRect().top + window.scrollY < window.innerHeight);
    /* Round 3 fix 2 (item 12c, Denise #7): off home, every arrival is kept
       so it can be finished at once (below). */
    const made: gsap.core.Tween[] = [];
    const keep = (t: gsap.core.Tween) => {
      if (quick) made.push(t);
      return t;
    };
    root.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) => {
      if (still(el)) return;
      if (!quick) {
        riseLines(el, { delay: Number(el.dataset.lines) || 0 });
        return;
      }
      keep(gsap.fromTo(el, { y: 12, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: QUICK,
        clearProps: "transform,opacity",
        scrollTrigger: arrival(el, "top 88%"),
      }));
    });
    root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) =>
      drift(el, Number(el.dataset.drift) || 5),
    );

    const groups = new Map<Element, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      if (still(el)) return;
      const parent = el.parentElement ?? root;
      const group = groups.get(parent);
      if (group) group.push(el);
      else groups.set(parent, [el]);
    });

    groups.forEach((els) => {
      const kind = els[0].dataset.rise;
      const many = els.length > 1;
      const trigger = arrival(els[0]);
      if (kind === "settle") {
        keep(gsap.fromTo(els, { opacity: 0, scale: 1.03 }, {
          opacity: 1,
          scale: 1,
          duration: quick ? QUICK : 0.8,
          stagger: many && !quick ? 0.08 : 0,
          clearProps: "transform,opacity",
          scrollTrigger: trigger,
        }));
        return;
      }
      /* fromTo, not from: an element whose CSS has an opacity transition
         (a text link) could otherwise read its own half-faded value as the
         end state and stay at 0. */
      keep(gsap.fromTo(els, { y: kind === "row" ? 12 : many ? 18 : 24, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: quick ? QUICK : kind === "row" ? 0.6 : 0.7,
        stagger: many && !quick ? (kind === "row" ? 0.05 : 0.06) : 0,
        /* hand the element back to its own CSS (a tilt, a hover lift) */
        clearProps: "transform,opacity",
        scrollTrigger: trigger,
      }));
    });

    /*
     * A print is laid down rather than switched on: it drops the last few
     * pixels, takes the last of its turn and its shadow comes with it.
     */
    root.querySelectorAll<HTMLElement>("[data-print]").forEach((el) => {
      if (still(el)) return;
      const turn = Number(gsap.getProperty(el, "rotation")) || 0;
      keep(gsap.fromTo(
        el,
        { opacity: 0, y: 14, rotation: turn - 1.2, scale: 1.02 },
        {
          opacity: 1,
          y: 0,
          rotation: turn,
          scale: 1,
          duration: quick ? QUICK : 0.85,
          clearProps: "transform,opacity",
          scrollTrigger: arrival(el),
        },
      ));
    });

    /* Lazy pictures land after the triggers are measured; measure again. */
    const settle = refreshWhenSettled();
    if (!quick) return settle;

    /*
     * Round 3 fix 2 (item 12c, Denise #7: "One circle" and "Know the
     * person" printed and screenshotted as empty bands). Off home, nothing
     * waits for a scroll that may never come: printing finishes every
     * arrival first (beforeprint; PrintSheet.tsx also forces them visible
     * in print CSS), and a page left unscrolled for a second, as in a
     * full-page capture, shows every block in its final state. Home keeps
     * its arrivals exactly as before.
     */
    const finish = () => {
      for (const t of made) {
        if (t.progress() >= 1) continue;
        t.scrollTrigger?.kill();
        t.progress(1);
      }
    };
    /* A reader who scrolls in the first second keeps the arrivals. */
    let scrolled = false;
    const moved = () => {
      scrolled = true;
    };
    window.addEventListener("scroll", moved, { once: true, passive: true });
    window.addEventListener("beforeprint", finish);
    const timer = window.setTimeout(() => {
      if (!scrolled) finish();
    }, 1000);
    return () => {
      settle();
      window.removeEventListener("scroll", moved);
      window.removeEventListener("beforeprint", finish);
      window.clearTimeout(timer);
    };
  });
}

/**
 * A photograph drifting against the page: `amount` per cent of its own height
 * down as it enters, up as it leaves, linear with the scroll. Used by
 * `[data-drift]` here and by the homepage scenes that author their own motion.
 */
export function drift(el: Element, amount = 5) {
  return gsap.fromTo(
    el,
    { yPercent: amount },
    {
      yPercent: -amount,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}

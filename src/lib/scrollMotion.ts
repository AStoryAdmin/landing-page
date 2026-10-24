/**
 * Scroll-authored motion for the homepage.
 *
 * Pass 9 animated with CSS keyframes that played once on mount, so every
 * section behaved the same whether the reader was looking at it or not. The
 * reference work this pass answers to (Bearplus: CargoKite, Binder) ties
 * movement to the reader's position instead — a scene pins, a sentence fills
 * in as it is read, a photograph opens as you arrive at it. That needs a
 * scroll timeline, and GSAP's ScrollTrigger is the one that survives resizes,
 * pinning and route changes without us re-deriving every edge case.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY SCENE MUST BE COMPLETE WITHOUT MOTION. `scripts/prerender.mjs`
 * snapshots each route with `reducedMotion: 'reduce'`, and so do real readers
 * who ask for it. Motion is only ever added inside `MOTION` below, so under
 * that preference nothing is hidden, pinned, or waiting for a scroll that
 * will never animate it. Never set an element's hidden state in CSS.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

/*
 * The house curves (Bao's Standard rule 23; styles/theme.ts `curve`), so
 * scripted motion lands exactly like the CSS: "house-out" for every
 * entrance, "house-move" for anything that travels while staying on screen.
 * They are the default; a tween that names no ease arrives on house-out.
 */
CustomEase.create("house-out", "0.23,1,0.32,1");
CustomEase.create("house-move", "0.77,0,0.175,1");
gsap.defaults({ ease: "house-out" });

export { gsap, ScrollTrigger, SplitText, CustomEase };

/** Conditions a scene can build against. Keys become booleans on `context.conditions`. */
export const MOTION = {
  motion: "(prefers-reduced-motion: no-preference)",
  wide: "(prefers-reduced-motion: no-preference) and (min-width: 861px) and (min-height: 800px)",
  narrow: "(prefers-reduced-motion: no-preference) and (max-width: 860px)",
} as const;

export type Conditions = { [K in keyof typeof MOTION]: boolean };

/**
 * Builds a section's scroll scene against its own root, and tears all of it
 * down — triggers, pins, split text — when the section unmounts or a media
 * condition flips (rotate a tablet and the wide scene is reverted before the
 * narrow one is built).
 */
export function useScene<T extends HTMLElement>(
  build: (root: T, conditions: Conditions) => void | (() => void),
) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(MOTION, (context) => {
      const conditions = context.conditions as Conditions;
      if (!conditions.motion) return;
      return build(root, conditions);
    });
    return () => mm.revert();
    // The scene is authored once per mount; its inputs are the DOM, not props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/**
 * Masked line reveal. Lines are re-split when the font loads or the width
 * changes, which is the reason for SplitText over hand-authored line spans:
 * a headline that wraps differently on a phone must still rise line by line.
 */
export function riseLines(
  target: Element | Element[],
  vars: { delay?: number; stagger?: number; trigger?: Element | false } = {},
) {
  const { delay = 0, stagger = 0.08, trigger } = vars;
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit: (split) => {
      openMasks(split.masks);
      return gsap.from(split.lines, {
        yPercent: 105,
        duration: 0.85,
        ease: "house-out",
        stagger,
        delay,
        scrollTrigger:
          trigger === false
            ? undefined
            : arrival(trigger ?? target, "top 88%"),
      });
    },
  });
}

/**
 * The ScrollTrigger for a one-shot arrival. Its start is "top 90%", and if
 * the page can never scroll that far (a block at the foot of a short page,
 * or a tall window) the arrival plays at once, so nothing is ever left
 * hidden waiting for a scroll that cannot happen (Bao's Standard 25).
 */
export function arrival(trigger: Element | Element[], start = "top 90%") {
  return {
    trigger: Array.isArray(trigger) ? trigger[0] : trigger,
    start,
    once: true,
    onRefresh: (self: ScrollTrigger) => {
      if (self.start > ScrollTrigger.maxScroll(window) - 2)
        self.animation?.progress(1);
    },
  };
}

/**
 * A line mask clips at the line box, which cuts the descenders of y, g and p
 * in tightly set serif headlines. Give each mask room below the baseline and
 * take the same room back, so the layout does not move.
 */
export function openMasks(masks: Element[] | undefined) {
  masks?.forEach((m) => {
    const el = m as HTMLElement;
    el.style.paddingBottom = "0.16em";
    el.style.marginBottom = "-0.16em";
  });
}

/** After fonts and images settle, pinned scenes need their measurements redone. */
export function refreshWhenSettled() {
  let active = true;
  const refresh = () => {
    if (active) ScrollTrigger.refresh();
  };
  document.fonts?.ready.then(refresh);
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });
  return () => {
    active = false;
    window.removeEventListener("load", refresh);
  };
}

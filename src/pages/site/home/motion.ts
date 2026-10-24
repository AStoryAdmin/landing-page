/**
 * The home page's motion, on the house curves (2026-10-23).
 *
 * Bao's rule, from the web app (BAOS-STANDARD.md 23): entrances on
 * cubic-bezier(0.23, 1, 0.32, 1), movement on cubic-bezier(0.77, 0, 0.175, 1),
 * transform and opacity only, and every effect with a reduced-motion
 * fallback. lib/scrollMotion.ts registers the two curves as CustomEases
 * named "house-out" and "house-move". Everything below runs inside `useScene` (lib/
 * scrollMotion.ts), which builds only when motion is allowed, so under
 * `prefers-reduced-motion` - and in the prerender, which runs with it - the
 * page is simply complete. Nothing is ever hidden in CSS.
 *
 * Arrivals are one-shot (`once: true`): a section plays as it comes into
 * view and then stays put. No scrubbed fades, so nothing can be left
 * half-faded where a reader stops.
 */
import { gsap, openMasks, SplitText } from "../../../lib/scrollMotion";

/** Entrances: fast out of the gate, a long soft landing (registered in lib/scrollMotion.ts). */
export const OUT = "house-out";
/** Movement across the screen: eased at both ends. */
export const MOVE = "house-move";

/** Where a section's arrival starts: its top a little above the fold. */
const START = "top 92%";

/**
 * A group of elements rising into place in reading order, 70ms apart.
 * `trigger` is the element whose arrival starts them (default: the first).
 */
export function arrive(
  els: Element[] | NodeListOf<Element>,
  {
    trigger,
    y = 28,
    delay = 0,
    stagger = 0.07,
    duration = 0.9,
  }: {
    trigger?: Element | null;
    y?: number;
    delay?: number;
    stagger?: number;
    duration?: number;
  } = {},
) {
  const list = Array.from(els);
  if (!list.length) return;
  return gsap.from(list, {
    y,
    opacity: 0,
    duration,
    ease: OUT,
    stagger,
    delay,
    scrollTrigger: { trigger: trigger ?? list[0], start: START, once: true },
  });
}

/**
 * Prints laid down on the page: each comes in from a little lower and a
 * little more turned than where it rests, so it reads as an object being set
 * down rather than switched on. The final tilt is the print's own CSS.
 */
export function layDown(
  els: Element[] | NodeListOf<Element>,
  { trigger, delay = 0, stagger = 0.08 }: { trigger?: Element | null; delay?: number; stagger?: number } = {},
) {
  const list = Array.from(els);
  if (!list.length) return;
  return gsap.from(list, {
    y: 40,
    rotation: (i: number) => (i % 2 ? 3 : -3),
    scale: 0.97,
    opacity: 0,
    duration: 1.05,
    ease: OUT,
    stagger,
    delay,
    scrollTrigger: trigger === null ? undefined : { trigger: trigger ?? list[0], start: START, once: true },
  });
}

/**
 * A headline rising line by line from behind its own mask. Re-split on a
 * font swap or a resize, so a headline that wraps differently on a phone
 * still rises by line.
 */
export function lines(
  el: Element | null,
  { delay = 0, trigger, paused = false }: { delay?: number; trigger?: Element | false; paused?: boolean } = {},
) {
  if (!el) return;
  let tween: gsap.core.Tween | undefined;
  let released = !paused;
  const split = SplitText.create(el, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit: (s) => {
      openMasks(s.masks);
      tween = gsap.from(s.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: OUT,
        stagger: 0.08,
        delay,
        paused: !released,
        scrollTrigger:
          trigger === false || paused
            ? undefined
            : { trigger: trigger ?? el, start: START, once: true },
      });
      return tween;
    },
  });
  return {
    split,
    play: () => {
      released = true;
      tween?.play();
    },
  };
}

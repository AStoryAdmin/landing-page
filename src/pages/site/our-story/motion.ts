/**
 * The house curves for the pages builder's routes (Bao's rule: entrances on
 * cubic-bezier(0.23, 1, 0.32, 1), movement on cubic-bezier(0.77, 0, 0.175, 1)),
 * registered once with GSAP so scripted motion and CSS agree.
 */
import { CustomEase } from "gsap/CustomEase";
import { arriveIfVisible, gsap } from "../../../lib/scrollMotion";

gsap.registerPlugin(CustomEase);

export const HOUSE_OUT = CustomEase.create("pages-house-out", "0.23,1,0.32,1");
export const HOUSE_MOVE = CustomEase.create(
  "pages-house-move",
  "0.77,0,0.175,1",
);

/** CSS twins of the two curves. */
export const cssOut = "cubic-bezier(0.23, 1, 0.32, 1)";
export const cssMove = "cubic-bezier(0.77, 0, 0.175, 1)";

/**
 * A print laid down on the bench: it arrives a few degrees further turned
 * and a touch larger, then settles to its own angle. Transform and opacity.
 */
export function layDown(
  els: Element[],
  vars: { trigger?: Element; delay?: number; start?: string } = {},
) {
  if (!els.length) return;
  // fromTo, so a tween killed half way (a remount, StrictMode) can never
  // leave a print or a link stuck at opacity 0.
  // Each print's own turn (from its CSS), read before anything moves it.
  const base = els.map((el) => Number(gsap.getProperty(el, "rotation")) || 0);
  return gsap.fromTo(
    els,
    {
      opacity: 0,
      y: 28,
      scale: 1.04,
      rotation: (i: number) => base[i] + (i % 2 ? 3 : -3),
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: (i: number) => base[i],
      duration: 0.8,
      ease: HOUSE_OUT,
      stagger: 0.1,
      delay: vars.delay ?? 0,
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: vars.trigger ?? els[0],
        start: vars.start ?? "top 92%",
        once: true,
        // Already on screen at load (the letters at 1920): play at once
        // rather than wait for a scroll (jury 2, B2).
        onRefresh: arriveIfVisible,
      },
    },
  );
}

/** Parts of a block rising in order: heading, words, action. */
export function riseIn(
  els: Element[],
  vars: { trigger?: Element; delay?: number; start?: string } = {},
) {
  if (!els.length) return;
  return gsap.fromTo(
    els,
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: HOUSE_OUT,
      stagger: 0.08,
      delay: vars.delay ?? 0,
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: vars.trigger ?? els[0],
        start: vars.start ?? "top 92%",
        once: true,
        // Already on screen at load (the letters at 1920): play at once
        // rather than wait for a scroll (jury 2, B2).
        onRefresh: arriveIfVisible,
      },
    },
  );
}

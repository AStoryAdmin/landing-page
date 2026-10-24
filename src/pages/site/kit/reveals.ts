import {
  arrival,
  gsap,
  refreshWhenSettled,
  riseLines,
  useScene,
} from "../../../lib/scrollMotion";

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
    root.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) =>
      riseLines(el, { delay: Number(el.dataset.lines) || 0 }),
    );
    root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) =>
      drift(el, Number(el.dataset.drift) || 5),
    );

    const groups = new Map<Element, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
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
        gsap.fromTo(els, { opacity: 0, scale: 1.03 }, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: many ? 0.08 : 0,
          clearProps: "transform,opacity",
          scrollTrigger: trigger,
        });
        return;
      }
      /* fromTo, not from: an element whose CSS has an opacity transition
         (a text link) could otherwise read its own half-faded value as the
         end state and stay at 0. */
      gsap.fromTo(els, { y: kind === "row" ? 12 : many ? 18 : 24, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: kind === "row" ? 0.6 : 0.7,
        stagger: many ? (kind === "row" ? 0.05 : 0.06) : 0,
        /* hand the element back to its own CSS (a tilt, a hover lift) */
        clearProps: "transform,opacity",
        scrollTrigger: trigger,
      });
    });

    /*
     * A print is laid down rather than switched on: it drops the last few
     * pixels, takes the last of its turn and its shadow comes with it.
     */
    root.querySelectorAll<HTMLElement>("[data-print]").forEach((el) => {
      const turn = Number(gsap.getProperty(el, "rotation")) || 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: 14, rotation: turn - 1.2, scale: 1.02 },
        {
          opacity: 1,
          y: 0,
          rotation: turn,
          scale: 1,
          duration: 0.85,
          clearProps: "transform,opacity",
          scrollTrigger: arrival(el),
        },
      );
    });

    /* Lazy pictures land after the triggers are measured; measure again. */
    return refreshWhenSettled();
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

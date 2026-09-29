import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";

/**
 * The shared motion for secondary routes: headlines rise line by line,
 * marked blocks lift in as they arrive, prints open from the bottom. Quicker
 * and quieter than the homepage, which is the one place scenes pin. Mark
 * elements with `data-lines`, `data-rise` and `data-print`.
 *
 * Siblings arrive together, in order. Before, every `[data-rise]` carried its
 * own trigger, so a row of four cards — which share a top edge — crossed the
 * line in the same frame and landed as one slab. Grouping them by parent and
 * staggering from the group's own trigger gives the row the left-to-right
 * cascade a reader expects and costs three triggers instead of four.
 */
export function useReveals<T extends HTMLElement>() {
  return useScene<T>((root) => {
    root.querySelectorAll("[data-lines]").forEach((el) => riseLines(el));

    const groups = new Map<Element, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      const parent = el.parentElement ?? root;
      const group = groups.get(parent);
      if (group) group.push(el);
      else groups.set(parent, [el]);
    });

    groups.forEach((els) => {
      gsap.from(els, {
        y: els.length > 1 ? 26 : 32,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: els.length > 1 ? 0.08 : 0,
        scrollTrigger: { trigger: els[0], start: "top 90%", once: true },
      });
    });

    /*
     * A print opens from the bottom edge and settles the last per cent of the
     * way in, the way a photograph does when it is laid down rather than
     * switched on. Scale rides the same tween so the two read as one gesture.
     */
    root.querySelectorAll<HTMLElement>("[data-print]").forEach((el) =>
      gsap.from(el, {
        clipPath: "inset(100% 0 0 0)",
        scale: 1.035,
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }),
    );
  });
}

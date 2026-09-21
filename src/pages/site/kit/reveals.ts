import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";

/**
 * The shared motion for secondary routes: headlines rise line by line,
 * marked blocks lift in as they arrive, prints open from the bottom. Quicker
 * and quieter than the homepage, which is the one place scenes pin. Mark
 * elements with `data-lines`, `data-rise` and `data-print`.
 */
export function useReveals<T extends HTMLElement>() {
  return useScene<T>((root) => {
    root.querySelectorAll("[data-lines]").forEach((el) => riseLines(el));
    root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) =>
      gsap.from(el, {
        y: 32,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }),
    );
    root.querySelectorAll<HTMLElement>("[data-print]").forEach((el) =>
      gsap.from(el, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }),
    );
  });
}

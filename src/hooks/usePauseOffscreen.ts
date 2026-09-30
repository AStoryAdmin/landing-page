import { useEffect, useRef } from "react";

/**
 * Stops the loops inside an element while it is off screen.
 *
 * The app mockups run six perpetual animations between them — typing dots, a
 * pulsing live mark, a scan line, and the slow drift over the two large
 * screenshots. Browsers do not reliably throttle those when they scroll out
 * of view, so on a long page they keep compositing for the whole visit, on a
 * laptop battery, for something nobody is looking at.
 *
 * The element carries `data-paused` whenever it is outside the viewport, and
 * one rule in `styles/global.ts` pauses every animation beneath it. Pausing
 * rather than cancelling means a loop resumes where it left off, so nothing
 * jumps when the reader scrolls back.
 */
export function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.toggleAttribute("data-paused", !entry.isIntersecting);
      },
      /* A margin, so it is already running by the time it is looked at. */
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

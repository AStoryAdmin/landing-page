/**
 * A horizontal scroller (premium pass, design spec §3.9). Accessible: a
 * focusable, labelled region around a real list, so keyboard users can
 * scroll it with the arrow keys (axe `scrollable-region-focusable`).
 *
 *   <Scroller label="Occasions">
 *     {items.map((i) => <li key={i.id}>…</li>)}
 *   </Scroller>
 *
 * renders
 *   <div role="region" aria-label="Occasions" tabindex="0" class="scroller"
 *        data-overflow="end|none">
 *     <ul class="scroller-track"><li>…</li>…</ul>
 *   </div>
 *
 * Items take min(80%, 340px), so the next one always peeks. The end fades
 * (CSS mask) while there is more to the right; no arrows, no dots, no
 * "Scroll" hint. The track runs to the window's edges and starts on the page
 * gutter, so place it directly inside a <Frame>.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollerRegion } from "./kit.styles";

export default function Scroller({
  label,
  children,
  className,
}: {
  /** Names the region for assistive tech. Required. */
  label: string;
  /** The items, as <li> elements. */
  children: ReactNode;
  className?: string;
}) {
  const region = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const r = region.current,
      t = track.current;
    if (!r || !t) return;
    const update = () => {
      const more = r.scrollLeft + r.clientWidth < r.scrollWidth - 2;
      r.dataset.overflow = more ? "end" : "none";
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(t);
    ro.observe(r);
    r.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      r.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <ScrollerRegion
      ref={region}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={["scroller", className].filter(Boolean).join(" ")}
      data-overflow="none"
    >
      <ul ref={track} className="scroller-track">
        {children}
      </ul>
    </ScrollerRegion>
  );
}

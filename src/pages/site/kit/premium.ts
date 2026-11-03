/**
 * The premium pass is opt-in for every page but home (design spec §3.00,
 * 2026-11-02). Home (`/`) must stay pixel-identical outside the header and
 * footer, and it imports most of the kit, so no kit change may be global.
 *
 * The marketing layout (App.tsx) sets:
 *   - `data-premium` on <main> for every route except `/`;
 *   - `data-premium` on <body> too, for the pieces that sit outside main or
 *     are fixed to the window (the sticky bar, the header's neighbours);
 *   - this context, for components with logic (Invitation, StickyStart).
 *
 * Styled components put every new rule under `main[data-premium] &` (or
 * `body[data-premium] &`); the un-scoped base style is the old one, byte for
 * byte. When the flag is false a component renders exactly what it rendered
 * before the pass.
 */
import { createContext, useContext, useEffect } from "react";
import { bare } from "../../../lib/nav";
import { color } from "../../../styles/theme";

/** Home is the only marketing route left out of the premium pass. */
export const isPremiumPath = (pathname: string) => bare(pathname) !== "/";

export const PremiumContext = createContext(false);

/** True on every marketing page except home. */
export const usePremium = () => useContext(PremiumContext);

/** The scope selectors, so every rule spells them the same way. */
export const IN_MAIN = "main[data-premium]";
export const IN_BODY = "body[data-premium]";

/* ---- The focus ring, set by the ground it is drawn on (spec §3.3, S11) ----
 *
 * A section ground sets `--ring` (kit.styles groundVars), but a light sheet
 * inside a cloth section, a page-local dark band or the teal ground does not,
 * so an inherited ring could land ivory on ivory (1.16:1) or chocolate on
 * chocolate (1.18:1). The ring is drawn 3px outside the element, on whatever
 * its ancestors paint. So on focus we read the colour actually behind the
 * element and set `--ring` on it: chocolate or ivory, whichever stands out
 * more. Only inside main[data-premium]; home never runs this. */

type Rgba = [number, number, number, number];

const parseColor = (value: string): Rgba | null => {
  const rgb = value.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const p = rgb[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  }
  const srgb = value.match(/^color\(srgb ([^)]+)\)$/);
  if (srgb) {
    const p = srgb[1]
      .split(/[\s/]+/)
      .filter(Boolean)
      .map(Number);
    return [p[0] * 255, p[1] * 255, p[2] * 255, p.length > 3 ? p[3] : 1];
  }
  return null;
};

const hex = (h: string): Rgba => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
  1,
];

const luminance = ([r, g, b]: Rgba) => {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const contrast = (a: Rgba, b: Rgba) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/**
 * The opaque colour painted where the ring is drawn: the backgrounds of the
 * ancestors that reach past the element by the ring's offset and width
 * (5px), composited. A wrapper exactly the element's size (a player frame)
 * does not paint under the ring, so it is skipped.
 */
export const groundBehind = (el: Element): Rgba => {
  const box = el.getBoundingClientRect();
  const reach = 5;
  const layers: Rgba[] = [];
  for (let n = el.parentElement; n; n = n.parentElement) {
    const r = n.getBoundingClientRect();
    const covers =
      n === document.body ||
      n === document.documentElement ||
      (r.left <= box.left - reach &&
        r.top <= box.top - reach &&
        r.right >= box.right + reach &&
        r.bottom >= box.bottom + reach);
    if (!covers) continue;
    const c = parseColor(getComputedStyle(n).backgroundColor);
    if (!c || c[3] === 0) continue;
    layers.push(c);
    if (c[3] >= 0.999) break;
  }
  let out = hex(color.ivory);
  for (let i = layers.length - 1; i >= 0; i--) {
    const [r, g, b, a] = layers[i];
    out = [
      r * a + out[0] * (1 - a),
      g * a + out[1] * (1 - a),
      b * a + out[2] * (1 - a),
      1,
    ];
  }
  return out;
};

const RINGS = [color.chocolate, color.ivory];

/** The ring colour for an element: whichever of chocolate and ivory contrasts more with its ground. */
export const ringFor = (el: Element) => {
  const ground = groundBehind(el);
  return RINGS.reduce((best, c) =>
    contrast(hex(c), ground) > contrast(hex(best), ground) ? c : best,
  );
};

/** Sets `--ring` on each element as it takes focus inside main[data-premium]. */
export const useGroundRing = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof HTMLElement) || !el.closest(IN_MAIN)) return;
      el.style.setProperty("--ring", ringFor(el));
    };
    document.addEventListener("focusin", onFocus, true);
    return () => document.removeEventListener("focusin", onFocus, true);
  }, [active]);
};

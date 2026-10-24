/**
 * Site tokens, phase 2 (2026-10-23): the site becomes the web app's world,
 * "the book on the bench" (docs/PHASE2-DIRECTION-2026-10-23.md). Colours,
 * faces and curves are the app's own (web-app/src/styles/astory.css §1 and
 * the signed-out sheet); if a value changes there, change it here.
 *
 * Pages never write a raw hex or a raw curve. If a value is needed that is
 * not here, lift it into this file first.
 */
import brand from "../lib/brand.json";
export const palette = brand;

export const color = {
  teal: palette.teal,
  tealWash: `color-mix(in srgb, ${palette.teal} 8%, ${palette.ivory})`,
  warmGold: palette.warmGold,
  /** The bench: the brand chocolate, the cloth's own colour. */
  chocolate: palette.chocolate,
  chocolateDeep: "#3B291D",
  chocolateInk: "#2B2116",
  primary: palette.chocolate,
  primaryHover: "#3B291D",
  primaryDeep: palette.chocolate,
  primaryMid: "#70503B",
  primaryLight: "#84634E",
  primaryWash: "#EDE2D2",
  primaryLine: "rgba(74, 51, 39, 0.16)",
  primaryLineStrong: "rgba(74, 51, 39, 0.32)",
  controlBorder: "#86766A",
  accent: palette.terracotta,
  accentHover: "#963E1A",
  accentText: "#9E4420",
  accentWash: "#EFDFD0",
  accentLine: "rgba(184, 81, 38, 0.28)",
  /** The app's highlight on paper: the key phrase of a headline ("worth keeping"). */
  ochre: "#BF7F1A",
  /** Ochre deep enough for small text on ivory (4.6:1). */
  ochreText: "#8A5A0F",
  gold: palette.brass,
  goldDeep: "#D8AE4D",
  goldWash: `color-mix(in srgb, ${palette.brass} 20%, ${palette.ivory})`,
  goldText: palette.brass,
  goldOnLight: "#765014",
  /** The book's foil: hairline frames and rules on the ivory page. */
  foil: "rgba(201, 161, 90, 0.55)",
  ink: palette.chocolate,
  body: "#2A2320",
  bodyMuted: "#685848",
  faint: "#786655",
  ivory: palette.ivory,
  /** The laid paper of the book's pages (the signed-out title page). */
  paper: "#FBF8F1",
  paperPure: "#FFFDF8",
  ivoryDeep: "#E9DECC",
  onDark: "#F6F0E6",
  onDarkMuted: "#DCD0C0",
  onDarkFaint: "#CDBCA8",
  onDarkLine: "rgba(246, 240, 230, 0.22)",
  live: "#817347",
  error: "#AC3023",
  success: "#2E7D4F",
  white: "#FFFFFF",
  black: "#231910",
  /**
   * Retired 2026-10-23: the butter-yellow band (#F0DDA8) clashed with the
   * app. The name stays so existing code compiles; it is now the app's
   * tinted sheet, a quiet cream a step down from the page.
   */
  sand: "#EAE0CF",
  /** The deepest ground: the chocolate cloth in shadow. Prefer the cloth itself (kit/cloth.ts). */
  night: "#3B291D",
  nightLine: "rgba(246, 240, 230, 0.16)",
  /** Photo corners: the album's black paper. */
  photoCorner: "#1D1714",
} as const;

/**
 * The app's own inks, for the one place the site draws an app surface
 * exactly as the app does: the memory card (pages/site/app/MemoryCard.tsx,
 * ported from web-app/src/components/MemoryCard.tsx and astory.css §9).
 */
export const app = {
  card: "#FBF7EE",
  ink: "#2A2320",
  inkSoft: "#6B625B",
  paperButter: "#F8F3DF",
  bookSage: "#55745A",
  bookSageBg: "#E4E8DC",
  bookPrint: "#FFFDF8",
  support: "#E9E2D8",
} as const;

/**
 * The app's four faces, each with one job (Bao's Standard rule 14):
 * - display: Cormorant Garamond, every heading. Loaded at 600 and 700 only,
 *   so a heading written at 400 or 500 is set at 600, the app's weight.
 * - text: EB Garamond, anything meant to be read: leads, paragraphs, quotes.
 * - body / ui: Montserrat, the interface: buttons, nav, labels, small print.
 * - script: Caveat, handwritten captions under prints. Nothing else.
 */
export const font = {
  display: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
  text: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
  body: "'Montserrat', 'Segoe UI', system-ui, -apple-system, sans-serif",
  ui: "'Montserrat', 'Segoe UI', system-ui, -apple-system, sans-serif",
  script: "'Caveat', 'Segoe Script', 'Bradley Hand', cursive",
} as const;
export const type = {
  d1: "clamp(2.8rem, 1.3rem + 4.6vw, 5.7rem)",
  d2: "clamp(2.1rem, 1.2rem + 3vw, 4rem)",
  d3: "clamp(1.9rem, 1.3rem + 1.8vw, 3rem)",
  d4: "clamp(1.4rem, 1.2rem + 0.9vw, 2rem)",
  d5: "1.375rem",
  lead: "clamp(1.25rem, 1.1rem + 0.4vw, 1.5rem)",
  base: "clamp(1rem, 0.96rem + 0.12vw, 1.0625rem)",
  sm: "1rem",
  xs: "0.9375rem",
  caption: "0.8125rem",
  eyebrow: "0.75rem",
} as const;

/**
 * The display sizes are CSS custom properties, declared in `global.ts`, so
 * one rule can retune the whole scale for a short screen. `--vs` (type) and
 * `--sy` (section rhythm) are 1 on a tall screen and step down as height runs
 * out. Cormorant sets narrower and with a smaller x-height than the old
 * serif, so the ramp sits a step larger and still breaks fewer lines.
 */
export const display = {
  hero: "var(--d-hero)",
  xl: "var(--d-xl)",
  lg: "var(--d-lg)",
  md: "var(--d-md)",
  sm: "var(--d-sm)",
} as const;

/** The same ramp as literal clamps, for the custom properties in global.ts. */
/* Each step keeps growing to about 2350px wide, so a 2560 display gets
   larger type, not just wider margins (2026-10-23 review). */
export const displayBase = {
  hero: "clamp(3.1rem, 1.2rem + 5.6vw, 9.5rem)",
  xl: "clamp(2.7rem, 1.3rem + 3.9vw, 7rem)",
  lg: "clamp(2.35rem, 1.35rem + 2.7vw, 5.25rem)",
  md: "clamp(1.75rem, 1.25rem + 1.3vw, 3rem)",
  sm: "clamp(1.4rem, 1.2rem + 0.6vw, 2.1rem)",
} as const;

export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const leading = {
  tight: 1.04,
  snug: 1.14,
  normal: 1.6,
  relaxed: 1.65,
} as const;

export const tracking = {
  display: "-0.01em",
  normal: "0",
  wide: "0.04em",
  eyebrow: "0.16em",
} as const;

/* -- Space, radius, shadow, motion ----------------------------------------- */

export const space = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
  section: "clamp(48px, 7vw, 112px)",
  sectionLg: "clamp(80px, 6vw + 48px, 152px)",
  gutter: "var(--page-gutter, 80px)",
} as const;

export const radius = {
  sm: "3px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  /** The app's big sheets and the curve where the page rises over the cloth. */
  sheet: "28px",
  pill: "999px",
} as const;

export const shadow = {
  xs: "0 1px 2px rgba(42, 35, 32, 0.06)",
  sm: "0 2px 8px rgba(42, 35, 32, 0.07)",
  md: "0 10px 28px -12px rgba(42, 35, 32, 0.22)",
  lg: "0 24px 60px -28px rgba(42, 35, 32, 0.35)",
  /** A print or a leaf lying on the cloth (book material, the app's --lie). */
  lie: "0 1px 1px rgba(0, 0, 0, 0.3), 0 18px 32px -14px rgba(0, 0, 0, 0.55)",
  /** Lifted under the hand. */
  lift: "0 1px 2px rgba(0, 0, 0, 0.3), 0 30px 46px -20px rgba(0, 0, 0, 0.6)",
  nav: "0 1px 0 rgba(0, 0, 0, 0.18), 0 14px 30px -22px rgba(0, 0, 0, 0.7)",
  focus: "0 0 0 3px rgba(184, 81, 38, 0.55)",
} as const;

/**
 * The house curves (Bao's Standard rule 23; the app's --ease-out and
 * --ease-in-out). Entrances and every state change land on `out`; anything
 * that travels on screen while staying visible moves on `move`. Never
 * ease-in, never a bounce. Controls stay under 300ms.
 */
export const curve = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  move: "cubic-bezier(0.77, 0, 0.175, 1)",
} as const;

export const motion = {
  /** A press: the button answers the hand. */
  press: `120ms ${curve.out}`,
  fast: `160ms ${curve.out}`,
  base: `200ms ${curve.out}`,
  /** The longest a control may take (fields, chips, panels). */
  slow: `280ms ${curve.out}`,
  /** On-screen movement: the bar tucking away, a menu sheet, a sheet sliding. */
  move: `320ms ${curve.move}`,
  /** Arrivals authored by the page (scroll-in, image settle). Never on a control. */
  reveal: `720ms ${curve.out}`,
} as const;

/**
 * GSAP names for the same curves. Registered with CustomEase in
 * lib/scrollMotion.ts ("house-out", "house-move"); import from there so the
 * registration has run.
 */
export const ease = {
  out: "house-out",
  soft: "house-out",
  inOut: "house-move",
} as const;

/* -- Layout ------------------------------------------------------------------ */

/**
 * The wide grid (2026-10-23, "use the screen"). Frame spans the window less
 * its gutters, up to `frame` (2080px): at 1920 the content is ~1730px wide,
 * at 2560 it is 2080px with 240px margins. Reading measures are set per
 * block in `ch`, never by narrowing the frame. `maxWidth` is the older
 * container (components/ui) and follows at 1600px.
 */
export const layout = {
  frame: "2080px",
  maxWidth: "1600px",
  maxWidthWide: "2080px",
  maxWidthText: "68ch",
  navHeight: "72px",
} as const;

export const bp = {
  xs: "480px",
  sm: "640px",
  md: "860px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1680px",
} as const;

/** `${media.md} { ... }` reads better than repeating the query. */
export const media = {
  nav: "@media (max-width: 1100px)",
  xs: `@media (max-width: ${bp.xs})`,
  sm: `@media (max-width: ${bp.sm})`,
  md: `@media (max-width: ${bp.md})`,
  lg: `@media (max-width: ${bp.lg})`,
  xl: `@media (max-width: ${bp.xl})`,
  up: {
    md: `@media (min-width: 861px)`,
    lg: `@media (min-width: 1025px)`,
    xl: `@media (min-width: 1281px)`,
    /** A big display: add a column rather than enlarging what is there. */
    xxl: `@media (min-width: ${bp.xxl})`,
  },
  /** Hover effects only where there is a pointer to hover with. */
  hover: "@media (hover: hover) and (pointer: fine)",
  motion: "@media (prefers-reduced-motion: reduce)",
} as const;

const theme = {
  palette,
  color,
  app,
  font,
  type,
  display,
  weight,
  leading,
  tracking,
  space,
  radius,
  shadow,
  curve,
  motion,
  ease,
  layout,
  bp,
  media,
};

export default theme;

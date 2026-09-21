/** Exact namecard identity; semantic surfaces below derive from these seven colors. */
import brand from "../lib/brand.json";
export const palette = brand;

export const color = {
  teal: palette.teal,
  tealWash: `color-mix(in srgb, ${palette.teal} 8%, ${palette.ivory})`,
  warmGold: palette.warmGold,
  primary: palette.chocolate,
  primaryHover: "#563A28",
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
  gold: palette.brass,
  goldDeep: "#D8AE4D",
  goldWash: `color-mix(in srgb, ${palette.brass} 20%, ${palette.ivory})`,
  goldText: palette.brass,
  goldOnLight: "#765014",
  ink: palette.chocolate,
  body: palette.charcoal,
  bodyMuted: "#685848",
  faint: "#786655",
  ivory: palette.ivory,
  paper: "#FAF5EC",
  paperPure: "#FFFDF8",
  ivoryDeep: "#E9DECC",
  onDark: palette.ivory,
  onDarkMuted: "#DCD0C0",
  onDarkFaint: "#CDBCA8",
  onDarkLine: "rgba(243, 235, 221, 0.22)",
  live: "#817347",
  error: "#AC3023",
  white: "#FFFFFF",
  black: "#231910",
  /**
   * Sand — the soft yellow of the app's mission screens (design-brief palette
   * #F0DDA8). The panel colour for closings; brass is for keylines only.
   */
  sand: "#F0DDA8",
  /** The namecard's front: the deepest ground, for the intro, openings and footer. */
  night: "#2A1F18",
  nightLine: "rgba(243, 235, 221, 0.14)",
} as const;

/** Website typography is distinct from the immutable app/print artwork. */
export const font = {
  display: "'Source Serif 4', Georgia, serif",
  text: "'Source Serif 4', Georgia, serif",
  body: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  script: "Georgia, serif",
} as const;
export const type = {
  d1: "clamp(2.8rem, 1.3rem + 4.6vw, 5.7rem)",
  d2: "clamp(2.1rem, 1.2rem + 3vw, 4rem)",
  d3: "clamp(1.9rem, 1.3rem + 1.8vw, 3rem)",
  d4: "clamp(1.4rem, 1.2rem + 0.9vw, 2rem)",
  d5: "1.375rem",
  lead: "clamp(1.25rem, 1.1rem + 0.4vw, 1.4375rem)",
  base: "clamp(1.0625rem, 1rem + 0.14vw, 1.125rem)",
  sm: "1.0625rem",
  xs: "0.9375rem",
  caption: "0.8125rem",
  eyebrow: "0.6875rem",
} as const;

/**
 * The editorial scale (Pass 11). Display sizes are set in Source Serif 4,
 * the voice of the app's onboarding and the namecard ("Not a memoir to
 * finish"). Pass 10 set them in very large Figtree, which read as a tech
 * launch rather than a family archive; the grotesque now carries interface,
 * explanation and labels only. Each size is one clamp, so nothing jumps.
 */
export const display = {
  hero: "clamp(3rem, 1.2rem + 5.6vw, 7.25rem)",
  xl: "clamp(2.5rem, 1.2rem + 3.9vw, 5.25rem)",
  lg: "clamp(2.2rem, 1.3rem + 2.6vw, 4rem)",
  md: "clamp(1.6rem, 1.15rem + 1.3vw, 2.4rem)",
  sm: "clamp(1.3rem, 1.1rem + 0.6vw, 1.65rem)",
} as const;

export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const leading = {
  tight: 1.06,
  snug: 1.16,
  normal: 1.6,
  relaxed: 1.65,
} as const;

export const tracking = {
  display: "-0.02em",
  normal: "0",
  wide: "0.04em",
  eyebrow: "0.18em",
} as const;

/* 笏笏 Space, radius, shadow, motion 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏 */

export const space = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
  section: "clamp(48px, 7vw, 104px)",
  sectionLg: "clamp(80px, 6vw + 48px, 144px)",
  gutter: "var(--page-gutter, 80px)",
} as const;

export const radius = {
  sm: "3px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  pill: "10px",
} as const;

export const shadow = {
  xs: "0 1px 2px rgba(74, 51, 39, 0.06)",
  sm: "0 2px 8px rgba(74, 51, 39, 0.07)",
  md: "0 10px 28px -12px rgba(74, 51, 39, 0.22)",
  lg: "0 24px 60px -28px rgba(74, 51, 39, 0.35)",
  nav: "0 1px 0 rgba(74, 51, 39, 0.10), 0 8px 28px -20px rgba(74, 51, 39, 0.45)",
  focus: "0 0 0 3px rgba(184, 81, 38, 0.55)",
} as const;

export const motion = {
  fast: "180ms cubic-bezier(0.22, 0.61, 0.36, 1)",
  base: "220ms cubic-bezier(0.22, 0.61, 0.36, 1)",
  slow: "520ms cubic-bezier(0.22, 0.61, 0.36, 1)",
  /** Long, decelerating arrivals — the house curve for scroll-authored movement. */
  reveal: "900ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

/** GSAP names for the same curves, so CSS and scripted motion agree. */
export const ease = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
} as const;

/* 笏笏 Layout 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏 */

export const layout = {
  maxWidth: "1280px",
  maxWidthWide: "1480px",
  maxWidthText: "68ch",
  navHeight: "74px",
} as const;

export const bp = {
  xs: "480px",
  sm: "640px",
  md: "860px",
  lg: "1024px",
  xl: "1280px",
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
  },
  motion: "@media (prefers-reduced-motion: reduce)",
} as const;

const theme = {
  palette,
  color,
  font,
  type,
  display,
  weight,
  leading,
  tracking,
  space,
  radius,
  shadow,
  motion,
  layout,
  bp,
  media,
};

export default theme;

/**
 * A Story — brand design tokens.
 *
 * Source of truth: "A Complete Guideline for Brand A Story", Version Teal (2026).
 * Every color, type step and spacing value on this site resolves back to this
 * file. Nothing should hard-code a hex value outside of it.
 *
 * The guideline ships two approved color versions:
 *   • Version Teal (2026)      — Deep Teal primary, Terracotta + Warm Gold accents
 *   • Version Terracotta       — Terracotta primary, Deep Chocolate + Vintage Brass
 * Teal is the current system: it carries the institutional credibility the
 * organization-facing side of the product needs, while Terracotta keeps the
 * warmth the family-facing side is built on. `palette.terracottaVersion` below
 * preserves the alternate set so a swap is a one-line change.
 */

/* ── Raw brand colors, exactly as specified ───────────────────────────── */

export const palette = {
    /* Version Teal — 2026 */
    deepTeal: '#0F4A58', // Pantone 3165 C — primary
    terracotta: '#B85126', // Pantone 7584 C — accent
    warmGold: '#E0A03F', // Pantone 484 C — highlight
    charcoal: '#4C4C4C', // Pantone 7540 C — body copy
    softIvory: '#F3EBDD', // Pantone 663 C — ground

    /* Version Terracotta — retained per guideline, not currently applied */
    terracottaVersion: {
        terracotta: '#B85126',
        deepChocolate: '#4A3327',
        vintageBrass: '#EBC86A',
        charcoal: '#4C4C4C',
        softIvory: '#F3EBDD',
    },
} as const;

/* ── Semantic color tokens ───────────────────────────────────────────────
 * Tints and shades are derived from the five brand colors; they are never
 * new hues, only lighter/darker steps of the approved set.
 */

export const color = {
    /* Primary — Deep Teal */
    primary: palette.deepTeal,
    primaryHover: '#0B3945',
    primaryDeep: '#082B34', // darkest ground, for full-bleed sections
    primaryMid: '#17667A',
    primaryLight: '#2E8298',
    primaryWash: '#E4EDEF', // 6% teal on ivory — quiet section ground
    primaryLine: 'rgba(15, 74, 88, 0.14)',
    primaryLineStrong: 'rgba(15, 74, 88, 0.28)',

    /* Accent — Terracotta */
    accent: palette.terracotta,
    accentHover: '#9E4420',
    /**
     * Terracotta at 14px on Soft Ivory measures 4.13:1 — short of AA for small
     * text. Small accent copy uses this darker step (5.3:1) instead.
     */
    accentText: '#9E4420',
    accentWash: '#F7E6DC',
    accentLine: 'rgba(184, 81, 38, 0.24)',

    /* Highlight — Warm Gold.
     *
     * Warm Gold is a fill and a display color, not a small-text color: at
     * 12–14px it measures 4.33:1 on Deep Teal and 1.91:1 on Soft Ivory. Text
     * uses one of the two steps below instead, both drawn from the guideline's
     * approved set.
     */
    gold: palette.warmGold,
    goldDeep: '#C8862B',
    goldWash: '#FBF0DC',
    /** Vintage Brass — gold text on dark grounds. 6.1:1 on Deep Teal. */
    goldText: palette.terracottaVersion.vintageBrass,
    /** Warm Gold darkened — the rare gold-toned text on a light ground. 5:1. */
    goldOnLight: '#8A5A12',

    /* Neutrals — Charcoal / Soft Ivory */
    ink: '#1F2A2E', // headings on light grounds: charcoal cooled toward teal
    body: palette.charcoal,
    /**
     * Muted and faint are the lightest grays that still clear 4.5:1 on every
     * light ground in this system (Soft Ivory being the darkest of them).
     * Nothing lighter is used for text at any size.
     */
    bodyMuted: '#5E5E5E',
    faint: '#606060',

    ivory: palette.softIvory,
    paper: '#FAF5EC', // one step lighter than ivory, for raised cards
    paperPure: '#FFFDF8',
    ivoryDeep: '#EAE0CE', // one step darker, for alternating bands

    /* On dark grounds */
    onDark: palette.softIvory,
    onDarkMuted: 'rgba(243, 235, 221, 0.72)',
    onDarkFaint: 'rgba(243, 235, 221, 0.68)',
    onDarkLine: 'rgba(243, 235, 221, 0.18)',

    /* Status */
    live: '#59A67F',
    error: '#B3402B',

    white: '#FFFFFF',
    black: '#0B0B0B',
} as const;

/* ── Typography ───────────────────────────────────────────────────────────
 * Guideline scale: Bold 84 / Medium 60 / Small 48 / Additional 32 /
 * Minimum 24, body 12–30, captions 6–10pt. Rendered fluidly so the ratios
 * hold from a 360px phone to a 1600px desktop.
 */

export const font = {
    display: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif",
    body: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    script: "'Caveat', 'Dancing Script', cursive",
} as const;

export const type = {
    /* Display — Cormorant Garamond */
    d1: 'clamp(2.75rem, 1.6rem + 4.6vw, 5.25rem)', // → 84px
    d2: 'clamp(2.25rem, 1.45rem + 3.2vw, 3.75rem)', // → 60px
    d3: 'clamp(1.875rem, 1.35rem + 2.1vw, 3rem)', // → 48px
    d4: 'clamp(1.5rem, 1.2rem + 1.2vw, 2rem)', // → 32px
    d5: 'clamp(1.3125rem, 1.15rem + 0.6vw, 1.5rem)', // → 24px, guideline minimum

    /* Body — Figtree */
    lead: 'clamp(1.0625rem, 1rem + 0.4vw, 1.3125rem)',
    base: '1.0625rem',
    sm: '0.9375rem',
    xs: '0.8125rem',
    caption: '0.75rem',

    /* Eyebrow / label */
    eyebrow: '0.75rem',
} as const;

export const weight = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
} as const;

export const leading = {
    tight: 1.05,
    snug: 1.18,
    normal: 1.5,
    relaxed: 1.7,
} as const;

export const tracking = {
    display: '-0.02em',
    normal: '0',
    wide: '0.04em',
    eyebrow: '0.18em',
} as const;

/* ── Space, radius, shadow, motion ────────────────────────────────────── */

export const space = {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
    section: 'clamp(64px, 4vw + 44px, 112px)',
    sectionLg: 'clamp(80px, 6vw + 48px, 144px)',
    gutter: 'clamp(20px, 4vw, 40px)',
} as const;

export const radius = {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    pill: '999px',
} as const;

export const shadow = {
    xs: '0 1px 2px rgba(15, 74, 88, 0.06)',
    sm: '0 2px 8px rgba(15, 74, 88, 0.07)',
    md: '0 10px 28px -12px rgba(15, 74, 88, 0.22)',
    lg: '0 24px 60px -28px rgba(15, 74, 88, 0.35)',
    nav: '0 1px 0 rgba(15, 74, 88, 0.10), 0 8px 28px -20px rgba(15, 74, 88, 0.45)',
    focus: '0 0 0 3px rgba(224, 160, 63, 0.55)',
} as const;

export const motion = {
    fast: '160ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    base: '260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
    slow: '520ms cubic-bezier(0.22, 0.61, 0.36, 1)',
} as const;

/* ── Layout ───────────────────────────────────────────────────────────── */

export const layout = {
    maxWidth: '1180px',
    maxWidthWide: '1320px',
    maxWidthText: '68ch',
    navHeight: '72px',
} as const;

export const bp = {
    xs: '480px',
    sm: '640px',
    md: '860px',
    lg: '1024px',
    xl: '1280px',
} as const;

/** `${media.md} { ... }` reads better than repeating the query. */
export const media = {
    xs: `@media (max-width: ${bp.xs})`,
    sm: `@media (max-width: ${bp.sm})`,
    md: `@media (max-width: ${bp.md})`,
    lg: `@media (max-width: ${bp.lg})`,
    xl: `@media (max-width: ${bp.xl})`,
    up: {
        md: `@media (min-width: 861px)`,
        lg: `@media (min-width: 1025px)`,
    },
    motion: '@media (prefers-reduced-motion: reduce)',
} as const;

const theme = { palette, color, font, type, weight, leading, tracking, space, radius, shadow, motion, layout, bp, media };

export default theme;

/* Hallmark · system: A Story site kit, phase 2 · genre: editorial · theme: studied-DNA (source: app.astoryapp.com)
 * paper #F3EBDD · cloth #4A3327 · display Cormorant Garamond 600 · text EB Garamond · ui Montserrat
 * states: default · hover · focus · active · disabled · loading (aria-busy) · error · success (data-state)
 */
/**
 * The site kit, phase 2 (2026-10-23): the site is the web app's own world,
 * "the family book open on a bookbinder's bench". Every route is built from
 * these pieces; pages compose, they do not restyle.
 *
 * QUICK USAGE
 *   <Chapter $ground="cloth">       chocolate bookcloth band (heroes, dark bands)
 *   <Chapter $ground="ivory">       the reading page (default)
 *   <Chapter $ground="paper">       the book's laid paper, a step lighter
 *   <Chapter $ground="sand">        the app's tinted sheet, a step darker (no more butter yellow)
 *   <Chapter $ground="teal">        teal cloth, for the book's own moments
 *   ("night" is kept as an alias of "cloth".)
 *   <Frame>                         the wide grid: the window less the gutters, up to 2080px
 *   <Title> <Statement> <Heading>   Cormorant Garamond 600; one <em> keyword takes the mark colour
 *   <Lead> <Body>                   EB Garamond, full ink; <Note> Montserrat 14px small print
 *   <Eyebrow>                       Montserrat 12px tracked small caps, only where it carries information
 *   <PrimaryLink|Button|Anchor>     the chocolate pill (ivory on cloth); <Secondary…> the outline pill
 *   <TextLink|TextAnchor>           a Montserrat link whose underline draws away on hover
 *   <BookPage>                      an ivory leaf lying on the cloth: foil frame, laid paper, a lie shadow
 *   <Cloth>                         a section on the chocolate cloth (= <Chapter $ground="cloth">)
 *   <PrintMat> / <Print> (kit.tsx)  a white-bordered print held by black photo corners, Caveat caption
 *
 * TYPE HAS THREE VOICES, AND THEY DO NOT SWAP. Cormorant Garamond for every
 * heading; EB Garamond for anything meant to be read; Montserrat for the
 * interface (buttons, nav, labels, small print). Caveat only under a print.
 */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  color,
  curve,
  display,
  font,
  media,
  motion,
  radius,
  shadow,
  type,
} from "../../../styles/theme";
import { chocolateCloth, tealCloth } from "./cloth";

/** The grounds a section can stand on. Each has a job; see Chapter below. */
export type Ground = "ivory" | "paper" | "night" | "teal" | "sand" | "cloth";

type GroundTokens = {
  bg: string;
  /** Headings and anything that must read as the page's ink. */
  ink: string;
  /** Running text: the full ink on paper, ivory on cloth (rule: reading comes first). */
  text: string;
  muted: string;
  line: string;
  /** A keyword in a large headline (3:1 is enough at that size). */
  mark: string;
  /** Small coloured text (eyebrows, tags): must reach 4.5:1. */
  label: string;
  /** The keyboard focus ring and its halo, so it stays visible on this ground. */
  focus: string;
  focusHalo: string;
};

const clothTokens: GroundTokens = {
  bg: color.chocolate,
  ink: color.onDark,
  text: color.onDark,
  muted: color.onDarkMuted,
  line: color.nightLine,
  mark: color.gold,
  label: color.gold,
  focus: color.gold,
  focusHalo: color.chocolateDeep,
};

export const grounds: Record<Ground, GroundTokens> = {
  ivory: {
    bg: color.ivory,
    ink: color.primary,
    text: color.body,
    muted: color.bodyMuted,
    line: color.primaryLineStrong,
    mark: "#A86E12",
    label: color.accentText,
    focus: color.accentText,
    focusHalo: color.paperPure,
  },
  paper: {
    bg: color.paper,
    ink: color.primary,
    text: color.body,
    muted: color.bodyMuted,
    line: color.primaryLineStrong,
    mark: "#A86E12",
    label: color.accentText,
    focus: color.accentText,
    focusHalo: color.ivory,
  },
  sand: {
    bg: color.sand,
    ink: color.primary,
    text: color.body,
    muted: color.bodyMuted,
    line: color.primaryLineStrong,
    mark: color.accentText,
    label: color.accentText,
    focus: color.accentText,
    focusHalo: color.paperPure,
  },
  cloth: clothTokens,
  night: clothTokens,
  teal: {
    bg: color.teal,
    ink: color.onDark,
    text: color.onDark,
    /* Small text on teal needs 7:1 (type floor, 2026-10-24). */
    muted: color.onTealMuted,
    line: color.onDarkLine,
    mark: color.gold,
    label: color.goldOnTeal,
    focus: color.gold,
    focusHalo: color.teal,
  },
};

/** The surface a ground paints: cloth grounds carry the woven texture and the faint A. */
export const groundSurface = (g: Ground = "ivory") =>
  g === "cloth" || g === "night"
    ? chocolateCloth
    : g === "teal"
      ? tealCloth
      : css`
          background: ${grounds[g].bg};
        `;

/** The custom properties a ground sets for everything inside it. */
export const groundVars = (g: Ground = "ivory") => css`
  --ink: ${grounds[g].ink};
  --text: ${grounds[g].text};
  --muted: ${grounds[g].muted};
  --line: ${grounds[g].line};
  --mark: ${grounds[g].mark};
  --label: ${grounds[g].label};
  --focus: ${grounds[g].focus};
  --focus-halo: ${grounds[g].focusHalo};
`;

/**
 * The wide grid (2026-10-23, "use the screen"): the window less the fluid
 * gutters (global.ts), up to 2080px. At 1920 that is ~1730px, at 2560
 * 2080px. Widen and add columns inside it; set reading measures per block
 * in `ch`. Never narrow the Frame itself to make a text column.
 */
export const Frame = styled.div`
  width: var(--frame, min(2080px, calc(100% - var(--page-gutter, 24px) * 2)));
  margin-inline: auto;
  min-width: 0;
`;

/**
 * A section and its ground. Cloth is the bench (heroes, dark bands, the
 * moments the page wants the reader to stop); ivory is the reading page;
 * paper a lighter leaf; sand the app's tinted sheet; teal is reserved for
 * the book itself.
 */
export const Chapter = styled.section<{ $ground?: Ground; $tight?: boolean }>`
  ${({ $ground = "ivory" }) => groundVars($ground)};
  position: relative;
  ${({ $ground = "ivory" }) => groundSurface($ground)};
  color: var(--ink);
  padding: ${({ $tight }) =>
    $tight
      ? "calc(clamp(64px, 6.5vw, 120px) * var(--sy)) 0"
      : "calc(clamp(88px, 9vw, 168px) * var(--sy)) 0"};
`;

/** A section on the chocolate bookcloth. Same API as Chapter, ground fixed. */
export const Cloth = styled(Chapter).attrs({ $ground: "cloth" as Ground })``;

/**
 * The page rising over the cloth, as in the app: the ivory sheet's rounded
 * top edge, laid at the top of the section that follows a cloth band.
 * Absolute; place it as the first child of a positioned section.
 */
export const RisingEdge = styled.div<{ $to?: Ground }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${radius.sheet};
  transform: translateY(calc(-100% + 1px));
  background: ${({ $to = "ivory" }) => grounds[$to].bg};
  border-radius: ${radius.sheet} ${radius.sheet} 0 0;
  pointer-events: none;
`;

/**
 * The book's small capitals: Montserrat 12px, tracked, in the ground's
 * label colour. Only where the word carries information the heading does
 * not (a page name that repeats the nav's active item carries none).
 */
export const Eyebrow = styled.p`
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  gap: 12px;
  margin: 0 0 clamp(18px, 2vw, 28px);
  font: 600 ${type.label} / 1.4 ${font.ui};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--label, ${color.accentText});
  &::before {
    content: "";
    width: 24px;
    height: 1px;
    background: currentColor;
    opacity: 0.7;
  }
`;

const serif = css`
  font-family: ${font.display};
  font-weight: 600;
  color: var(--ink, ${color.primary});
  letter-spacing: -0.01em;
  text-wrap: balance;
  /* The keyword, as the app sets "worth keeping": upright, in the mark colour. */
  em {
    font-style: normal;
    font-weight: inherit;
    color: var(--mark, ${color.accent});
  }
  i {
    font-style: italic;
  }
`;
/** Page-opening headline. One per route. Two lines at most: cut words first. */
export const Title = styled.h1`
  ${serif};
  font-size: ${display.xl};
  line-height: 1;
`;
/** A section's statement: the one line a reader should leave with. */
export const Statement = styled.h2<{ $size?: "xl" | "lg" | "md" }>`
  ${serif};
  font-size: ${({ $size = "lg" }) => display[$size]};
  line-height: 1.04;
`;
/** A small serif heading inside a section. */
export const Heading = styled.h3`
  ${serif};
  font-size: ${display.sm};
  line-height: 1.14;
  letter-spacing: -0.005em;
`;
/** The person's own words. Cormorant italic, never the product's voice. */
export const Quote = styled.blockquote`
  margin: 0;
  font: italic 500 ${display.md} / 1.22 ${font.display};
  color: var(--ink, ${color.primary});
  text-wrap: balance;
`;
/** The paragraph that follows a statement: EB Garamond, the full ink. */
export const Lead = styled.p`
  font: 400 ${type.lead} / 1.5 ${font.text};
  color: var(--text, ${color.body});
  max-width: 50ch;
  text-wrap: pretty;
`;
export const Body = styled.p`
  font: 400 ${type.read} / 1.58 ${font.text};
  color: var(--text, ${color.body});
  max-width: 66ch;
  text-wrap: pretty;
  & + & {
    margin-top: 0.9em;
  }
`;
/** Small print that is still meant to be read: Montserrat 14px, quiet. */
export const Note = styled.p`
  font: 400 ${type.note} / 1.55 ${font.ui};
  color: var(--muted, ${color.bodyMuted});
`;

/**
 * The second header family: the statement, a short foil rule, then the
 * explanation at a reading measure, down the page. Alternate it with
 * SplitHead; never run three of either together.
 */
export const StackHead = styled.div<{ $center?: boolean }>`
  display: grid;
  justify-items: ${({ $center }) => ($center ? "center" : "start")};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  margin-bottom: clamp(44px, 5vw, 88px);
  > :first-child {
    max-width: 24ch;
  }
  .lead,
  > p {
    position: relative;
    margin-top: clamp(22px, 2.2vw, 32px);
    padding-top: clamp(22px, 2.2vw, 32px);
    max-width: 58ch;
    font: 400 clamp(1.2rem, 1.08rem + 0.36vw, 1.45rem) / 1.55 ${font.text};
    color: var(--text, ${color.body});
  }
  .lead::before,
  > p::before {
    content: "";
    position: absolute;
    top: 0;
    left: ${({ $center }) => ($center ? "50%" : "0")};
    transform: ${({ $center }) => ($center ? "translateX(-50%)" : "none")};
    width: 56px;
    height: 1px;
    background: ${color.foil};
  }
  ${media.md} {
    > :first-child {
      max-width: none;
    }
  }
`;

/** Statement left, explanation right, aligned on the last line. */
export const SplitHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: clamp(28px, 6vw, 140px);
  align-items: end;
  margin-bottom: calc(clamp(40px, 4.6vw, 96px) * var(--sy));
  > p {
    font: 400 clamp(1.15rem, 1.05rem + 0.3vw, 1.4rem) / 1.55 ${font.text};
    color: var(--text, ${color.body});
    max-width: 48ch;
  }
  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

/* -- Actions ----------------------------------------------------------------
 * As the app's "Sign in": flat, one fill, fully round, Montserrat 600 in
 * sentence case, pressed to 0.97 in 120ms. Primary is chocolate (ivory on a
 * dark ground); secondary is the outline pill. An ArrowIcon inside sits as a
 * plain arrow that steps forward under the pointer. Every state is drawn:
 * hover (pointer devices only), focus-visible, active, disabled /
 * aria-disabled, loading (aria-busy="true": a turning ring, the label
 * stays), error and success (data-state="error" | "success").
 */
const spin = css`
  @keyframes kit-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const actionBase = css`
  ${spin};
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 28px;
  border-radius: ${radius.pill};
  font: 600 ${type.ui} / 1.2 ${font.ui};
  letter-spacing: 0.005em;
  text-transform: none;
  text-decoration: none;
  white-space: nowrap;
  max-width: 100%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  ${media.sm} {
    white-space: normal;
    text-wrap: balance;
    text-align: center;
  }
  transition:
    background-color ${motion.base},
    border-color ${motion.base},
    color ${motion.base},
    transform ${motion.press};
  &:has(svg) {
    padding-right: 24px;
  }
  svg {
    width: 18px;
    height: 18px;
    flex: none;
    transition: transform ${motion.base};
  }
  ${media.hover} {
    &:hover svg {
      transform: translateX(3px);
    }
  }
  &:active {
    transform: scale(0.97);
  }
  &:focus-visible {
    outline: 2px solid var(--focus, ${color.accentText});
    outline-offset: 3px;
    box-shadow: 0 0 0 3px var(--focus-halo, ${color.paperPure});
  }
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
  &[aria-busy="true"] {
    cursor: progress;
    pointer-events: none;
    opacity: 0.85;
    transform: none;
  }
  &[aria-busy="true"] svg {
    display: none;
  }
  &[aria-busy="true"]::after {
    content: "";
    width: 16px;
    height: 16px;
    flex: none;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: kit-spin 700ms linear infinite;
  }
  &[data-state="error"] {
    background: ${color.error};
    border-color: ${color.error};
    color: ${color.white};
  }
  &[data-state="success"] {
    background: ${color.success};
    border-color: ${color.success};
    color: ${color.white};
  }
  ${media.motion} {
    &[aria-busy="true"]::after {
      animation-duration: 1.6s;
    }
  }
`;
const primary = css`
  ${actionBase};
  border: 1px solid transparent;
  background-color: var(--action-bg, ${color.chocolate});
  color: var(--action-ink, ${color.onDark});
  ${media.hover} {
    &:hover {
      background-color: var(--action-hover, ${color.chocolateDeep});
    }
  }
`;
const secondary = css`
  ${actionBase};
  border: 1px solid color-mix(in srgb, var(--ink, ${color.primary}) 42%, transparent);
  background-color: transparent;
  color: var(--ink, ${color.primary});
  ${media.hover} {
    &:hover {
      border-color: var(--ink, ${color.primary});
    }
  }
`;
export const PrimaryLink = styled(Link)`
  ${primary}
`;
export const PrimaryButton = styled.button`
  ${primary}
`;
export const PrimaryAnchor = styled.a`
  ${primary}
`;
export const SecondaryLink = styled(Link)`
  ${secondary}
`;
export const SecondaryButton = styled.button`
  ${secondary}
`;
export const SecondaryAnchor = styled.a`
  ${secondary}
`;
/**
 * A link set in the interface face. The underline is a real text underline,
 * so when the link wraps on a phone every line is underlined under its own
 * words; the old background-image rule ran through the second line and made
 * "November, 15% off" look struck out (jury 3, B1). It fades under the
 * pointer. Inline, with vertical padding for a 44px target.
 */
const textLink = css`
  display: inline;
  padding-block: 12px;
  font: 600 ${type.note} / 1.45 ${font.ui};
  color: var(--ink, ${color.primary});
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.28em;
  text-decoration-color: currentColor;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  /* No opacity transition here: reveals tween opacity on links. */
  transition: text-decoration-color ${motion.base};
  ${media.hover} {
    &:hover {
      text-decoration-color: transparent;
    }
  }
  &:active {
    opacity: 0.7;
  }
  svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 8px;
    vertical-align: -0.2em;
    transition: transform ${motion.base};
  }
  ${media.hover} {
    &:hover svg {
      transform: translateX(3px);
    }
  }
  &:focus-visible {
    outline: 2px solid var(--focus, ${color.accentText});
    outline-offset: 3px;
    border-radius: 2px;
  }
  &[aria-disabled="true"] {
    opacity: 0.55;
    pointer-events: none;
  }
`;
export const TextLink = styled(Link)`
  ${textLink}
`;
/** The same text action for plain links (mailto, external). */
export const TextAnchor = styled.a`
  ${textLink}
`;
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 24px;
  margin-top: clamp(26px, 2.6vw, 38px);
  ${media.sm} {
    > a:first-child,
    > button:first-child {
      flex: 1 1 100%;
    }
  }
`;
/** On cloth and teal the primary turns ivory, as the app's hero buttons do. */
export const onDarkActions = css`
  --action-bg: ${color.onDark};
  --action-ink: ${color.chocolate};
  --action-hover: ${color.white};
`;

/* -- Prints, pages and plates ---------------------------------------------- */

/**
 * A photograph as a print, as the app mounts them: a white border, four
 * black-paper photo corners, a slight turn, the shadow of paper lying on a
 * surface, and a handwritten Caveat caption under it. Use through `Print`
 * (kit.tsx); for a custom print, render
 *   <PrintMat $tilt={-2}><span className="pc tl"/>…<div className="print-window"><img/></div>
 *   <figcaption>…</figcaption></PrintMat>
 * `$bare` drops the border and corners (a photograph that is not an object).
 */
export const PrintMat = styled.figure<{ $bare?: boolean; $tilt?: number }>`
  margin: 0;
  position: relative;
  min-width: 0;
  /* Never wider than the file (Print sets --print-max to its natural
     width): the border's two sides are added on top. */
  max-width: calc(var(--print-max, 100000px) + 2 * clamp(8px, 0.8vw, 14px));
  --tilt: ${({ $tilt = 0 }) => $tilt}deg;
  transform: rotate(var(--tilt));
  .print-face {
    position: relative;
    padding: ${({ $bare }) => ($bare ? "0" : "clamp(8px, 0.8vw, 14px)")};
    background: ${({ $bare }) => ($bare ? "transparent" : color.paperPure)};
    box-shadow: ${({ $bare }) => ($bare ? "none" : shadow.lie)};
  }
  .print-window {
    overflow: hidden;
    position: relative;
  }
  .print-window::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(42, 31, 24, 0.1);
    pointer-events: none;
  }
  /* The album's black-paper corners, tucked over the print's corners. */
  .pc {
    position: absolute;
    z-index: 1;
    width: clamp(18px, 1.6vw, 28px);
    height: clamp(18px, 1.6vw, 28px);
    background: ${color.photoCorner};
    pointer-events: none;
  }
  .pc.tl {
    left: -3px;
    top: -3px;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  .pc.tr {
    right: -3px;
    top: -3px;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
  .pc.bl {
    left: -3px;
    bottom: -3px;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
  .pc.br {
    right: -3px;
    bottom: -3px;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  /* ratio: the print cut to a shape, the crop held at --print-focus. */
  &[data-crop] .print-window {
    aspect-ratio: var(--print-ratio);
  }
  &[data-crop] .print-window img {
    height: 100%;
    object-fit: cover;
    object-position: var(--print-focus, 50% 50%);
  }
  figcaption {
    margin-top: 12px;
    font: 500 clamp(19px, 1.2rem + 0.2vw, 24px) / 1.15 ${font.script};
    color: var(--ink, ${color.primary});
    text-align: center;
    text-wrap: balance;
  }
  /* Under the hand a print straightens and lifts a little (pointer devices only). */
  ${media.hover} {
    transition: transform 280ms ${curve.out};
    .print-face {
      transition: box-shadow 280ms ${curve.out};
    }
    &:not([data-bare]):hover {
      transform: rotate(calc(var(--tilt) * 0.3)) translateY(-5px);
    }
    &:not([data-bare]):hover .print-face {
      box-shadow: ${shadow.lift};
    }
  }
`;

/**
 * An ivory leaf of the book lying on the cloth: laid paper, a foil hairline
 * frame inset from the edge, the shadow of a page lying on cloth. Put
 * reading, letters and forms on it. `$tilt` turns it a fraction of a
 * degree; `$pad` overrides the inner padding.
 *   <Cloth><Frame><BookPage $tilt={-0.4}>…</BookPage></Frame></Cloth>
 */
export const BookPage = styled.div<{ $tilt?: number; $pad?: string }>`
  ${groundVars("paper")};
  position: relative;
  color: var(--ink);
  background:
    radial-gradient(120% 90% at 50% 40%, transparent 60%, rgba(120, 90, 50, 0.08)),
    ${color.paper};
  padding: ${({ $pad }) => $pad ?? "clamp(32px, 4vw, 72px)"};
  border-radius: 3px;
  box-shadow: ${shadow.lie};
  transform: rotate(${({ $tilt = 0 }) => $tilt}deg);
  &::after {
    content: "";
    position: absolute;
    inset: clamp(10px, 1vw, 16px);
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
`;

/**
 * The old-book plate: a double foil keyline around something the family
 * should treat as precious: a quotation, the voice passage, the book.
 */
export const Plate = styled.div`
  position: relative;
  padding: clamp(28px, 3.4vw, 52px);
  border: 1px solid color-mix(in srgb, ${color.gold} 70%, transparent);
  outline: 1px solid color-mix(in srgb, ${color.gold} 40%, transparent);
  outline-offset: 5px;
`;

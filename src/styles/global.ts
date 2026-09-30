import { createGlobalStyle } from "styled-components";
import {
  color,
  displayBase,
  font,
  layout,
  leading,
  media,
  motion,
  radius,
  type,
} from "./theme";

/**
 * Global reset + brand defaults. Deliberately small: everything visual beyond
 * this lives in component styles that read from the token file.
 */
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    --page-gutter: 80px;
    --nav-total: 76px;
    /* Type scale and section rhythm; see the note on "display" in theme.ts. */
    --vs: 1;
    --sy: 1;
    --d-hero: calc(${displayBase.hero} * var(--vs));
    --d-xl: calc(${displayBase.xl} * var(--vs));
    --d-lg: calc(${displayBase.lg} * var(--vs));
    --d-md: calc(${displayBase.md} * var(--vs));
    --d-sm: calc(${displayBase.sm} * var(--vs));
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }
  @media(max-width:1350px) { html { --page-gutter: 56px; } }
  @media(max-width:1100px) { html { --page-gutter: 40px; } }
  @media(max-width:860px) { html { --page-gutter: 30px; } }
  @media(max-width:480px) { html { --page-gutter: 20px; } }

  /*
   * Short screens. A laptop is a wide viewport with a short one's height, and
   * the width-driven ramp above has no way to know that. Below roughly the
   * height of a 16" laptop the display scale and the space between chapters
   * come back a step at a time, so a section still reads as one composition
   * instead of arriving in pieces. Width is guarded so a phone in landscape —
   * where the layout has already gone to one column — keeps its own sizes.
   */
  @media (min-width: 1025px) and (max-height: 940px) { html { --vs: 0.94; --sy: 0.9; } }
  @media (min-width: 1025px) and (max-height: 840px) { html { --vs: 0.88; --sy: 0.82; } }
  @media (min-width: 1025px) and (max-height: 760px) { html { --vs: 0.83; --sy: 0.76; } }
  @media (min-width: 1025px) and (max-height: 680px) { html { --vs: 0.78; --sy: 0.7; } }

  ${media.nav} { html { --nav-total: 68px; } }

  /*
   * Loops inside something scrolled out of view stop until it comes back.
   * Set by hooks/usePauseOffscreen; see the note there for why.
   */
  [data-paused], [data-paused] * {
    animation-play-state: paused !important;
  }

  ${media.motion} {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: ${color.ivory};
    color: ${color.body};
    font-family: ${font.body};
    font-size: ${type.base};
    line-height: ${leading.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    /*
     * Scroll anchoring fights the route transition: when a lazy route's
     * placeholder is replaced by the real page, the browser "helpfully" keeps
     * the reader's position, leaving every navigation a little below the top.
     */
    overflow-anchor: none;
  }

  h1, h2, h3, h4 {
    font-family: ${font.body};
    color: ${color.ink};
    margin: 0;
    font-weight: 500;
    text-wrap: balance;
  }

  p { margin: 0; text-wrap: pretty; }
  figure { margin: 0; }
  main { min-width: 0; }
  input, textarea, p, h1, h2, h3 { overflow-wrap: break-word; }

  img, svg, video { max-width: 100%; display: block; }
  img { height: auto; }

  a { color: inherit; }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
  }

  .route-error { padding: 80px 24px; max-width: 760px; margin: auto; }
  .route-error h1 { font-size: 42px; margin-bottom: 24px; }
  .route-error p { margin-bottom: 24px; }
  .route-error button, .route-error a { display: inline-flex; align-items: center; min-height: 48px; margin-right: 24px; }

  /* Anchor targets clear the measured sticky navbar. */
  [id] { scroll-margin-top: calc(var(--nav-total, ${layout.navHeight}) + 24px); }

  /*
   * The surfaces we did not draw. A selection highlight, a caret, a
   * scrollbar and an underline all ship with a browser default that belongs
   * to no design system; left alone they are the giveaway that a page was
   * assembled rather than made. Each one is set from the namecard palette.
   */
  ::selection {
    background: ${color.gold};
    color: ${color.primaryDeep};
  }

  html {
    scrollbar-color: ${color.primaryLight} ${color.ivory};
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar { width: 11px; height: 11px; }
  ::-webkit-scrollbar-track { background: ${color.ivory}; }
  ::-webkit-scrollbar-thumb {
    border: 3px solid ${color.ivory};
    border-radius: 999px;
    background: ${color.primaryLight};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${color.primary}; }
  ::-webkit-scrollbar-corner { background: ${color.ivory}; }

  input, textarea { caret-color: ${color.accent}; }

  /* Underlines sit off the baseline and keep the weight of a drawn rule. */
  a:not([class]) {
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
    text-decoration-color: ${color.primaryLineStrong};
    transition: text-decoration-color ${motion.base};
  }
  a:not([class]):hover { text-decoration-color: currentColor; }

  /*
   * Figures the reader compares — prices, dates, durations — set on a fixed
   * advance so a column of them lines up instead of shimmering.
   */
  table, time, .tnum { font-variant-numeric: tabular-nums; }

  /*
   * One keyboard focus ring, in the ink of whichever ground it lands on:
   * chocolate on the light rooms, brass on night and teal, where a chocolate
   * ring is invisible and a paper halo is a flashbulb.
   */
  :focus-visible {
    outline: 2px solid var(--focus, ${color.primary});
    outline-offset: 3px;
    box-shadow: 0 0 0 3px var(--focus-halo, ${color.paperPure});
    border-radius: ${radius.sm};
  }
  :focus:not(:focus-visible) { outline: none; }

  /* Skip link — first tab stop on every page. */
  .skip-link {
    position: absolute;
    left: 16px;
    top: -100px;
    z-index: 1000;
    padding: 12px 20px;
    border-radius: ${radius.pill};
    background: ${color.primary};
    color: ${color.onDark};
    font-size: ${type.sm};
    font-weight: 600;
    text-decoration: none;
    transition: top ${motion.fast};
  }
  .skip-link:focus { top: 16px; }

  /* Visually hidden but read by screen readers. */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyle;

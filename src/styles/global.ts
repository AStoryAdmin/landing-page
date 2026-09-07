import { createGlobalStyle } from 'styled-components';
import { color, font, layout, leading, media, motion, radius, type } from './theme';

/**
 * Global reset + brand defaults. Deliberately small: everything visual beyond
 * this lives in component styles that read from the token file.
 */
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
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
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: ${font.display};
    color: ${color.ink};
    margin: 0;
    font-weight: 400;
    text-wrap: balance;
  }

  p { margin: 0; text-wrap: pretty; }

  img, svg, video { max-width: 100%; display: block; }
  img { height: auto; }

  a { color: inherit; }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
  }

  /* Anchor targets clear the fixed navbar. */
  [id] { scroll-margin-top: calc(${layout.navHeight} + 24px); }

  ::selection {
    background: ${color.gold};
    color: ${color.primaryDeep};
  }

  /* One consistent, always-visible keyboard focus ring. */
  :focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 3px;
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

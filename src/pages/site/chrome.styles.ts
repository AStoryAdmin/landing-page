/**
 * Header and footer, Pass 10.
 *
 * The header used to be an 80px ivory bar plus a teal announcement strip —
 * 112px of chrome permanently over every photograph. Now it is a single thin
 * row that sits transparent over the home opening (`is-over-dark`), steps
 * out of the way while the reader scrolls down (`is-tucked`) and returns the
 * moment they scroll up. The announcement moved into the hero, where it is
 * read once instead of seen on every screen.
 *
 * Below 1100px the menu is a full-screen brown sheet with the destinations
 * set large, instead of a dropdown list.
 */
import styled from "styled-components";
import { color, display, font, media, motion } from "../../styles/theme";

export const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  color: ${color.primary};
  background: color-mix(in srgb, ${color.ivory} 92%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${color.primaryLine};
  /* The namecard's double keyline, under the bar. */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 32%, transparent);
  }
  &.is-over-dark::after {
    background: color-mix(in srgb, ${color.gold} 26%, transparent);
  }
  transition:
    transform ${motion.reveal},
    background 400ms,
    color 400ms,
    border-color 400ms;

  &.is-over-dark {
    color: ${color.ivory};
    background: transparent;
    backdrop-filter: none;
    border-bottom-color: transparent;
  }
  &.is-tucked {
    transform: translateY(-100%);
  }
  /*
   * Once the reader has left the top, the bar settles: a little shorter, with
   * the weight of something resting on the page rather than cut into it. It
   * gives a short screen back sixteen pixels of page, which is most of a line.
   */
  &.is-condensed {
    box-shadow: 0 18px 40px -34px rgba(42, 31, 24, 0.75);
  }

  .gf-nav-inner {
    width: min(1520px, calc(100% - var(--page-gutter) * 2));
    margin: auto;
    min-height: 84px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    transition: min-height ${motion.slow};
  }
  &.is-condensed .gf-nav-inner {
    min-height: 68px;
  }
  .gf-nav-inner > span svg {
    height: 40px;
    width: auto;
    transition: height ${motion.slow};
  }
  &.is-condensed .gf-nav-inner > span svg {
    height: 34px;
  }
  nav,
  .gf-nav-links {
    display: flex;
    align-items: center;
    gap: clamp(18px, 2.2vw, 34px);
  }
  /* Links: the serif, quietly - no capitals, no lozenge (Pass 11k). The page
     you are on is terracotta with a fine gold rule under the word. */
  .gf-nav-links > a,
  .more-toggle {
    position: relative;
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    background: none;
    border: 0;
    color: inherit;
    font: 400 18px/1 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    text-decoration: none;
    cursor: pointer;
    transition: color 300ms;
  }
  .gf-nav-links > a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 9px;
    height: 1px;
    background: ${color.gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 200ms ease-out;
  }
  .gf-nav-links > a:hover::after {
    transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  /* The rule draws in under the word the pointer is on, and withdraws. */
  @media (hover: hover) {
    .gf-nav-links > a:hover::after {
      transform: scaleX(1);
    }
    .gf-nav-links > a:not([aria-current="page"])::after {
      transform-origin: right;
    }
    .gf-nav-links > a:not([aria-current="page"]):hover::after {
      transform-origin: left;
    }
  }
  .gf-nav-links > a:hover,
  .more-toggle:hover {
    color: ${color.accent};
  }
  .gf-nav-links > a[aria-current="page"] {
    color: ${color.accent};
  }
  .gf-nav-links > a[aria-current="page"]::after {
    transform: scaleX(1);
  }
  &.is-over-dark .gf-nav-links > a:hover,
  &.is-over-dark .more-toggle:hover,
  &.is-over-dark .gf-nav-links > a[aria-current="page"] {
    color: ${color.gold};
  }
  .more-chevron {
    width: 15px;
    height: 15px;
    opacity: 0.6;
    transition: transform 250ms;
  }
  .more-toggle[aria-expanded="true"] .more-chevron {
    transform: rotate(180deg);
  }
  .more-wrap {
    position: relative;
  }

  /* The More panel: two columns of rooms and a feature card. */
  .more-panel {
    position: absolute;
    top: calc(100% + 18px);
    right: -120px;
    width: min(820px, 92vw);
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 28px;
    padding: 28px;
    border-radius: 22px;
    background: ${color.paperPure};
    color: ${color.primary};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 40px 80px -40px color-mix(in srgb, ${color.primary} 70%, transparent);
    /*
     * The panel belongs to the word that opened it, so it grows from that
     * corner rather than from its own middle, and it never arrives from
     * nothing: 0.97 is a panel already the right shape, just not yet set down.
     * Leaving is quicker than arriving - the reader has already decided.
     */
    transform-origin: top right;
    transition:
      opacity 170ms ease-out,
      transform 210ms cubic-bezier(0.23, 1, 0.32, 1),
      display 210ms allow-discrete;
  }
  @starting-style {
    .more-panel:not([hidden]) {
      opacity: 0;
      transform: scale(0.97) translateY(-6px);
    }
  }
  .more-panel[hidden] {
    display: none;
    opacity: 0;
    transform: scale(0.97) translateY(-6px);
    transition-duration: 120ms, 120ms, 120ms;
  }
  .more-groups {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
  .more-groups h2,
  .gf-mobile-more h2 {
    margin-bottom: 8px;
    font: 600 11px/1.4 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .more-groups a {
    display: block;
    padding: 10px 12px;
    margin: 0 -12px;
    border-radius: 12px;
    text-decoration: none;
    transition: background 250ms;
  }
  .more-groups a:hover {
    background: ${color.ivory};
  }
  .more-groups strong {
    display: block;
    font: 400 18px/1.25 ${font.display};
    color: ${color.primary};
  }
  .more-groups small {
    display: block;
    margin-top: 2px;
    font: 400 13px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .more-feature {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 260px;
    padding: 22px;
    border-radius: 16px;
    overflow: hidden;
    color: ${color.ivory};
    text-decoration: none;
    isolation: isolate;
  }
  .more-feature img {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .more-feature::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      transparent 30%,
      color-mix(in srgb, ${color.night} 88%, transparent)
    );
  }
  .more-feature:hover img {
    transform: scale(1.04);
  }
  .more-feature small {
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  .more-feature b {
    margin-top: 8px;
    font: 400 22px/1.2 ${font.display};
  }
  .more-feature span {
    margin-top: 10px;
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  /* Reserve for $1: the site's primary pill, a size smaller. */
  .gf-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 6px 0 20px;
    border-radius: 999px;
    background: ${color.primary};
    color: ${color.ivory};
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, ${color.ivory} 18%, transparent);
    font: 600 11.5px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background 300ms,
      color 300ms;
  }
  .gf-button svg {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding: 9px;
    border-radius: 50%;
    background: ${color.gold};
    color: ${color.primary};
    transition: transform ${motion.reveal};
  }
  .gf-button:hover {
    background: ${color.night};
  }
  .gf-button:hover svg {
    transform: rotate(-45deg);
  }
  &.is-over-dark .gf-button {
    background: ${color.ivory};
    color: ${color.primary};
  }
  &.is-over-dark .gf-button:hover {
    background: ${color.paperPure};
  }

  .gf-menu-toggle,
  .gf-mobile-more {
    display: none;
  }

  ${media.nav} {
    .gf-nav-inner {
      min-height: 64px;
    }
    .gf-nav-inner > span svg {
      height: 34px;
    }
    .gf-menu-toggle {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      padding: 0 4px;
      background: none;
      border: 0;
      color: inherit;
      font: 500 15px/1 ${font.body};
      cursor: pointer;
      position: relative;
      z-index: 2;
    }
    .gf-menu-toggle i {
      position: relative;
      width: 22px;
      height: 10px;
    }
    .gf-menu-toggle i::before,
    .gf-menu-toggle i::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 1.5px;
      background: currentColor;
      transition: transform 400ms;
    }
    .gf-menu-toggle i::before {
      top: 0;
    }
    .gf-menu-toggle i::after {
      bottom: 0;
    }
    &.is-open .gf-menu-toggle i::before {
      transform: translateY(4.25px) rotate(45deg);
    }
    &.is-open .gf-menu-toggle i::after {
      transform: translateY(-4.25px) rotate(-45deg);
    }
    /* backdrop-filter and transform would both make the header the
       containing block for the fixed sheet below, clipping it to 64px. */
    &.is-open {
      color: ${color.ivory};
      background: transparent;
      backdrop-filter: none;
      border-bottom-color: transparent;
      transform: none;
    }
    &.is-open .gf-nav-inner > span {
      position: relative;
      z-index: 2;
    }

    nav {
      position: fixed;
      inset: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 96px var(--page-gutter) 40px;
      background: ${color.primary};
      color: ${color.ivory};
      overflow-y: auto;
      clip-path: inset(0 0 100% 0);
      visibility: hidden;
      transition:
        clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1),
        visibility 0s 700ms;
    }
    &.is-open nav {
      clip-path: inset(0 0 0 0);
      visibility: visible;
      transition: clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1);
    }
    .gf-nav-links {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }
    .gf-nav-links > a {
      font: 400 ${display.md} / 1.1 ${font.display};
      letter-spacing: -0.01em;
      text-transform: none;
      opacity: 1;
      padding: 14px 0;
      border-bottom: 1px solid ${color.onDarkLine};
    }
    .gf-nav-links > a::after {
      display: none;
    }
    .more-wrap {
      display: none;
    }
    .gf-button {
      order: 3;
      margin-top: 28px;
      min-height: 56px;
      justify-content: space-between;
      padding: 0 8px 0 24px;
      background: ${color.ivory};
      color: ${color.primary};
      font-size: 13px;
    }
    .gf-mobile-more {
      order: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 32px;
    }
    .gf-mobile-more h2 {
      color: ${color.onDarkMuted};
    }
    .gf-mobile-more a {
      display: flex;
      align-items: center;
      min-height: 40px;
      font-size: 15px;
      color: ${color.ivory};
      text-decoration: none;
    }
  }
  ${media.motion} {
    nav {
      transition: none !important;
    }
  }
`;

/**
 * The footer is the back of the namecard: the night ground, the lockup, and
 * the card's own line — "Not a memoir to finish, A Story to keep, and to
 * carry on." Compact, because the invitation above it already asked; the
 * one disclosure about the examples lives here, once, behind a toggle.
 */
export const FooterShell = styled.footer`
  background: ${color.night};
  --focus: ${color.gold};
  --focus-halo: ${color.night};
  color: ${color.onDarkMuted};
  padding: clamp(64px, 7vw, 104px) 0 28px;
  border-top: 1px solid color-mix(in srgb, ${color.gold} 35%, transparent);

  .gf-width {
    width: min(1440px, calc(100% - var(--page-gutter) * 2));
    margin: auto;
  }
  .gf-footer-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: clamp(40px, 6vw, 110px);
  }
  .footer-line {
    margin-top: 26px;
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.ivory};
  }
  .footer-line .nb {
    white-space: nowrap;
  }
  .footer-line i {
    color: ${color.gold};
  }
  .footer-contact {
    margin-top: 22px;
    font: 400 15px/1.6 ${font.body};
  }
  .footer-contact a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${color.ivory};
    text-underline-offset: 4px;
  }
  /*
   * The Inception credential. It sits under the contact line rather than in
   * the link columns because it is a fact about the company, not a
   * destination - and it is held to NVIDIA's rules: their own artwork at its
   * own colours, smaller than our logo above it, with clear space of its own.
   */
  .footer-credential {
    margin-top: 20px;
    --line: ${color.onDarkLine};
    --muted: ${color.onDarkMuted};
    --ink: ${color.ivory};
  }
  .footer-credential a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    text-decoration: none;
    color: ${color.onDarkMuted};
  }
  @media (hover: hover) {
    .footer-credential a:hover {
      .credit-name {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }

  .gf-footer-links {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
  .gf-footer-links h2 {
    font: italic 400 18px/1.4 ${font.display};
    color: ${color.gold};
    margin-bottom: 12px;
  }
  .gf-footer-links a {
    display: flex;
    align-items: center;
    min-height: 40px;
    width: fit-content;
    font: 400 15px/1.3 ${font.body};
    color: ${color.ivory};
    text-decoration: none;
    background: linear-gradient(currentColor, currentColor) 0 80% / 0 1px
      no-repeat;
    transition: background-size ${motion.reveal};
  }
  .gf-footer-links a:hover {
    background-size: 100% 1px;
  }
  .gf-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 16px 32px;
    margin-top: clamp(48px, 5vw, 72px);
    padding-top: 20px;
    border-top: 1px solid ${color.nightLine};
    font: 400 14px/1.5 ${font.body};
  }
  /*
   * NVIDIA require this attribution wherever their marks appear. It is said
   * once, at the foot of the site, in the smallest voice the page has - a
   * colophon line, not a disclaimer stuck under the badge.
   */
  .footer-trademark {
    /*
     * Its own line under the colophon. A max-width here would defeat that:
     * max-width is resolved after the flex basis, so a capped item shrinks
     * back onto the row it was supposed to clear.
     */
    flex: 0 0 100%;
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.6;
    color: ${color.onDarkFaint};
  }

  .footer-about {
    max-width: 440px;
  }
  .footer-about summary {
    cursor: pointer;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  .footer-about p {
    line-height: 1.6;
    padding-bottom: 12px;
  }
  ${media.lg} {
    .gf-footer-top {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    .gf-footer-links {
      grid-template-columns: 1fr 1fr;
      row-gap: 32px;
    }
    .gf-footer-bottom {
      flex-direction: column;
    }
  }
`;

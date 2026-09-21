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

  .gf-nav-inner {
    width: min(1520px, calc(100% - var(--page-gutter) * 2));
    margin: auto;
    min-height: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }
  .gf-nav-inner > span svg {
    height: 40px;
    width: auto;
  }
  nav,
  .gf-nav-links {
    display: flex;
    align-items: center;
    gap: clamp(18px, 2.2vw, 34px);
  }
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
    font: 500 15px/1 ${font.body};
    text-decoration: none;
    cursor: pointer;
  }
  /* The rule draws in from the left, and leaves to the right. */
  .gf-nav-links > a::after,
  .more-toggle::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform ${motion.reveal};
  }
  .gf-nav-links > a:hover::after,
  .gf-nav-links > a[aria-current="page"]::after,
  .more-toggle:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .more-chevron {
    width: 16px;
    height: 16px;
    transition: transform 250ms;
  }
  .more-toggle[aria-expanded="true"] .more-chevron {
    transform: rotate(180deg);
  }
  .more-wrap {
    position: relative;
  }
  .more-panel {
    position: absolute;
    top: calc(100% + 18px);
    right: -24px;
    width: 620px;
    padding: 28px;
    background: ${color.paperPure};
    color: ${color.primary};
    border: 1px solid ${color.primaryLine};
    box-shadow: 0 30px 60px -30px ${color.primary};
  }
  .more-panel[hidden] {
    display: none;
  }
  .more-groups {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .more-groups h2,
  .gf-mobile-more h2 {
    font: 500 12px/1.4 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
    margin-bottom: 10px;
  }
  .more-groups a {
    display: block;
    padding: 10px 0;
    text-decoration: none;
    border-top: 1px solid ${color.primaryLine};
  }
  .more-groups strong {
    display: block;
    font: 500 16px/1.35 ${font.body};
  }
  .more-groups small {
    display: block;
    font-size: 13px;
    color: ${color.bodyMuted};
  }
  .more-groups a:hover strong {
    color: ${color.accentText};
  }
  .more-start {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid ${color.primaryLineStrong};
    font-size: 14px;
  }
  .more-start small {
    font: 500 12px ${font.body};
    letter-spacing: 0.12em;
    color: ${color.bodyMuted};
  }

  .gf-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 2px;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 14px/1 ${font.body};
    text-decoration: none;
    transition: background 300ms, color 300ms;
  }
  .gf-button:hover {
    background: ${color.accent};
  }
  &.is-over-dark .gf-button {
    background: ${color.ivory};
    color: ${color.primary};
  }
  &.is-over-dark .gf-button:hover {
    background: ${color.gold};
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
      font: 500 ${display.md} / 1.1 ${font.body};
      letter-spacing: -0.04em;
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
      justify-content: center;
      background: ${color.ivory};
      color: ${color.primary};
      font-size: 16px;
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
    max-width: 22ch;
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
    background: linear-gradient(currentColor, currentColor) 0 80% / 0 1px no-repeat;
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

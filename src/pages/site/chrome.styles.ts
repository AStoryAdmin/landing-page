/**
 * Header and footer, phase 2 (2026-10-23): the bench's cloth, as the web
 * app's top bar.
 *
 * The header is a fixed-height bar of the chocolate bookcloth, darker than
 * the cloth of the page openings and finished by a foil hairline, the way a
 * book's headband finishes the top of the block. Wordmark left (ivory A,
 * gold Story, as the app), the rooms in the middle in Montserrat, "Sign in"
 * and the one ivory pill at the right. It follows the reader and condenses:
 * past the top it settles (the wordmark scales, a shadow fades in); while
 * the reader moves down it slides up to a 56px strip with everything still
 * in it, and opens back out on the way up. It never leaves the window, so
 * no shadow is left hanging at the top edge (jury 1 #16). Only transform and
 * opacity move. It is its own View Transition layer, so it holds still
 * while the page under it changes.
 *
 * Below 1100px the rooms open on a full-screen sheet of the same cloth.
 *
 * The footer is the back board: the same cloth, quiet. The wordmark at an
 * ordinary size, the link columns, the five program badges, and one line
 * of colophon with the company's legal name.
 */
import styled from "styled-components";
import {
  color,
  curve,
  display,
  font,
  media,
  motion,
  shadow,
  type,
} from "../../styles/theme";
import { A_PATTERN, CLOTH_CHOCOLATE } from "./kit/cloth";

/* The bar's cloth: the weave, a shade darker than an opening, no pattern
   (a 72px band would cut the A in half). */
const barCloth = `
  background-color: ${color.chocolateDeep};
  background-image:
    linear-gradient(rgba(43, 33, 22, 0.42), rgba(43, 33, 22, 0.42)),
    ${CLOTH_CHOCOLATE};
  background-size: auto, 512px 512px;
`;

export const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  view-transition-name: site-header;
  color: ${color.onDark};
  ${barCloth};
  --focus: ${color.gold};
  --focus-halo: ${color.chocolateDeep};
  /* The bar's full height, and how far it slides up to leave a 56px strip. */
  --bar-h: clamp(64px, 2.4vw + 26px, 88px);
  --bar-d: calc(var(--bar-h) - 56px);
  transition: transform ${motion.move};
  /* The headband: a foil hairline under the bar. */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 34%, transparent);
    pointer-events: none;
  }
  /* The settled bar's shadow: a layer that fades in, never a repaint of the bar. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: ${shadow.nav};
    opacity: 0;
    transition: opacity ${motion.slow};
    pointer-events: none;
  }
  &.is-condensed::before {
    opacity: 1;
  }
  /* Condensed while scrolling down: the bar slides up by --bar-d and its
     contents slide down by half that, so they sit centred in the strip
     that stays. Transform only. */
  &.is-tucked {
    transform: translateY(calc(-1 * var(--bar-d)));
  }
  .gf-nav-inner {
    transition: transform ${motion.move};
  }
  &.is-tucked .gf-nav-inner {
    transform: translateY(calc(var(--bar-d) / 2));
  }

  .gf-nav-inner {
    position: relative;
    width: var(--frame);
    margin: auto;
    /* A little taller and larger on a big display, so the bar keeps its
       weight at 2560 (rem-free: browser zoom scales it with the page). */
    height: var(--bar-h);
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .gf-nav-inner > span {
    display: inline-flex;
    flex: none;
  }
  /* The link keeps a 44px target while the bar condenses: only the drawing
     inside it shrinks (round 3, jury 2 N3: the scaled link measured 40px). */
  .gf-nav-inner > span a {
    min-height: 44px;
  }
  .gf-nav-inner > span svg {
    height: clamp(34px, 1vw + 19px, 46px);
    width: auto;
    transform-origin: left center;
    transition: transform ${motion.slow};
  }
  &.is-condensed .gf-nav-inner > span svg {
    transform: scale(0.9);
  }
  /* The rooms sit in the middle of the room the wordmark and the actions leave. */
  nav {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .gf-nav-links {
    margin-inline: auto;
    display: flex;
    align-items: center;
    gap: clamp(14px, 1.7vw, 34px);
  }
  .gf-nav-right {
    display: flex;
    align-items: center;
    gap: clamp(16px, 1.6vw, 28px);
  }
  /* The rooms: Montserrat, quiet ivory; the room you are in is full ivory
     with a gold rule under the word. */
  .gf-nav-links > a,
  .more-toggle,
  .gf-signin {
    position: relative;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    background: none;
    border: 0;
    color: ${color.onDarkMuted};
    font: 500 clamp(16px, 0.2vw + 13.3px, 18px) / 1 ${font.ui};
    letter-spacing: 0.01em;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: color ${motion.base};
  }
  .gf-nav-links > a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    height: 1px;
    background: ${color.gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${motion.base};
  }
  ${media.hover} {
    .gf-nav-links > a:hover,
    .more-toggle:hover,
    .gf-signin:hover {
      color: ${color.onDark};
    }
    .gf-nav-links > a:hover::after {
      transform: scaleX(1);
    }
  }
  .gf-nav-links > a[aria-current="page"] {
    color: ${color.onDark};
  }
  .gf-nav-links > a[aria-current="page"]::after {
    transform: scaleX(1);
  }
  .gf-nav-links > a:active,
  .more-toggle:active,
  .gf-signin:active {
    opacity: 0.7;
  }
  .more-chevron {
    width: 14px;
    height: 14px;
    opacity: 0.7;
    transition: transform ${motion.base};
  }
  .more-toggle[aria-expanded="true"] {
    color: ${color.onDark};
  }
  .more-toggle[aria-expanded="true"] .more-chevron {
    transform: rotate(180deg);
  }
  .more-wrap {
    position: relative;
  }

  /* The More panel: a leaf of paper laid under the bar, from the word that opened it. */
  .more-panel {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    width: min(820px, 92vw);
    margin-left: calc(min(820px, 92vw) / -2);
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 28px;
    padding: 28px;
    border-radius: 6px;
    background: ${color.paper};
    color: ${color.primary};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 40px 80px -40px rgba(0, 0, 0, 0.6);
    transform-origin: top center;
    transition:
      opacity 160ms ${curve.out},
      transform 200ms ${curve.out},
      display 200ms allow-discrete;
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
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .more-groups a {
    display: block;
    padding: 10px 12px;
    margin: 0 -12px;
    border-radius: 6px;
    text-decoration: none;
    transition: background-color ${motion.fast};
  }
  ${media.hover} {
    .more-groups a:hover {
      background: ${color.ivory};
    }
  }
  .more-groups strong {
    display: block;
    font: 600 22px/1.15 ${font.display};
    color: ${color.primary};
  }
  .more-groups small {
    display: block;
    margin-top: 2px;
    font: 400 ${type.note} / 1.45 ${font.ui};
    color: ${color.bodyMuted};
  }
  .more-feature {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 260px;
    padding: 22px;
    border-radius: 4px;
    overflow: hidden;
    color: ${color.onDark};
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
    transition: transform ${motion.slow};
  }
  .more-feature::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      transparent 30%,
      color-mix(in srgb, ${color.chocolateInk} 88%, transparent)
    );
  }
  ${media.hover} {
    .more-feature:hover img {
      transform: scale(1.03);
    }
  }
  .more-feature small {
    font: 600 ${type.label} / 1 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  .more-feature b {
    margin-top: 8px;
    font: 600 24px/1.15 ${font.display};
  }
  .more-feature span {
    margin-top: 10px;
    font: 600 ${type.note} / 1 ${font.ui};
  }

  /* The one action: the ivory pill, as the app's buttons on the cloth. */
  .gf-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: clamp(44px, 0.8vw + 30px, 52px);
    padding: 0 clamp(18px, 0.5vw + 12px, 26px);
    border-radius: 999px;
    background: ${color.onDark};
    color: ${color.chocolate};
    font: 600 clamp(16px, 0.2vw + 13.3px, 18px) / 1 ${font.ui};
    letter-spacing: 0.01em;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color ${motion.base},
      transform ${motion.press};
  }
  .gf-button svg {
    width: 16px;
    height: 16px;
    transition: transform ${motion.base};
  }
  ${media.hover} {
    .gf-button:hover {
      background: ${color.white};
    }
    .gf-button:hover svg {
      transform: translateX(3px);
    }
  }
  .gf-button:active {
    transform: scale(0.97);
  }

  .gf-menu-toggle,
  .gf-mobile-more {
    display: none;
  }

  ${media.nav} {
    .gf-nav-inner {
      height: 64px;
      justify-content: space-between;
    }
    .gf-nav-inner > span svg {
      height: 32px;
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
      font: 500 ${type.ui} / 1 ${font.ui};
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
      transition: transform ${motion.base};
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
    /* A transform on the header would make it the containing block of the
       fixed sheet below and clip it to the bar. */
    &.is-open {
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
      padding: 88px var(--page-gutter) 40px;
      background-color: ${color.chocolate};
      background-image: ${A_PATTERN}, ${CLOTH_CHOCOLATE};
      background-size:
        84px 92px,
        384px 384px;
      color: ${color.onDark};
      overflow-y: auto;
      opacity: 0;
      transform: translateY(-12px);
      visibility: hidden;
      transition:
        opacity 200ms ${curve.out},
        transform 240ms ${curve.move},
        visibility 0s 240ms;
    }
    &.is-open nav {
      opacity: 1;
      transform: none;
      visibility: visible;
      transition:
        opacity 200ms ${curve.out},
        transform 240ms ${curve.move};
    }
    .gf-nav-links,
    .gf-nav-right {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      margin: 0;
    }
    .gf-nav-links > a,
    .gf-signin {
      font: 600 ${display.md} / 1.1 ${font.display};
      letter-spacing: -0.005em;
      color: ${color.onDark};
      padding: 12px 0;
      border-bottom: 1px solid ${color.onDarkLine};
    }
    .gf-nav-links > a::after {
      display: none;
    }
    .gf-nav-links > a[aria-current="page"] {
      color: ${color.gold};
    }
    .more-wrap {
      display: none;
    }
    .gf-nav-right {
      order: 3;
    }
    .gf-button {
      margin-top: 28px;
      min-height: 56px;
      justify-content: center;
      font-size: 16px;
    }
    .gf-mobile-more {
      order: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 28px;
    }
    .gf-mobile-more h2 {
      color: ${color.gold};
    }
    .gf-mobile-more a {
      display: flex;
      align-items: center;
      min-height: 44px;
      font: 500 ${type.ui} / 1.3 ${font.ui};
      color: ${color.onDarkMuted};
      text-decoration: none;
    }
  }
  ${media.motion} {
    nav,
    &,
    .gf-nav-inner,
    .gf-nav-inner > span svg {
      transition: none !important;
    }
  }
`;

/**
 * The back board. Quiet: small print in Montserrat, the link headings in
 * the book's small capitals, the badges at their own height under our
 * wordmark (NVIDIA's rules: never larger than the A Story logo beside them).
 */
export const FooterShell = styled.footer`
  ${barCloth};
  --focus: ${color.gold};
  --focus-halo: ${color.chocolateDeep};
  position: relative;
  color: ${color.onDarkMuted};
  padding: clamp(56px, 5vw, 96px) 0 28px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: color-mix(in srgb, ${color.gold} 30%, transparent);
  }

  .gf-width {
    width: var(--frame);
    margin: auto;
  }
  .gf-footer-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
    gap: clamp(40px, 6vw, 160px);
  }
  .footer-line {
    margin-top: 18px;
    max-width: 30ch;
    font: 400 ${type.read} / 1.45 ${font.text};
    color: ${color.onDarkMuted};
  }
  .footer-contact {
    margin-top: 10px;
    font: 400 ${type.note} / 1.6 ${font.ui};
  }
  .footer-contact a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${color.onDark};
    text-decoration: underline;
    text-decoration-color: ${color.onDarkLine};
    text-underline-offset: 4px;
    transition: text-decoration-color ${motion.base};
  }
  ${media.hover} {
    .footer-contact a:hover {
      text-decoration-color: currentColor;
    }
  }

  /* The rooms: four balanced columns of four or five. */
  .gf-footer-links {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
  .gf-footer-links h2,
  .gf-footer-fold h2 {
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.gold};
    margin-bottom: 6px;
  }
  .gf-footer-links a,
  .gf-footer-fold a {
    display: flex;
    align-items: center;
    min-height: 44px;
    width: fit-content;
    font: 400 ${type.ui} / 1.3 ${font.ui};
    color: ${color.onDarkMuted};
    text-decoration: none;
    transition: color ${motion.base};
  }
  ${media.hover} {
    .gf-footer-links a:hover,
    .gf-footer-fold a:hover {
      color: ${color.onDark};
    }
  }

  /* On a phone the rooms fold into two groups (hidden above 640px). */
  .gf-footer-fold {
    display: none;
  }
  .gf-footer-fold details {
    border-top: 1px solid ${color.nightLine};
  }
  .gf-footer-fold details:last-child {
    border-bottom: 1px solid ${color.nightLine};
  }
  .gf-footer-fold summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    list-style: none;
    cursor: pointer;
    font: 600 16px/1.3 ${font.ui};
    color: ${color.onDark};
  }
  .gf-footer-fold summary::-webkit-details-marker {
    display: none;
  }
  .gf-footer-fold summary svg {
    width: 20px;
    height: 20px;
    transition: transform 200ms ${curve.out};
  }
  .gf-footer-fold details[open] summary svg {
    transform: rotate(180deg);
  }
  .gf-footer-fold .fold-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px 20px;
    padding: 4px 0 18px;
  }

  /*
   * The five program marks on one cream plate (round 3, jury 1 #5: never one
   * mark alone on a row). The plate is sized from the footer's width:
   *   - one row, 40-48px, where the five fit with their clear space;
   *   - three and two where they don't (the narrow three on top);
   *   - two by two on a phone, NVIDIA at its 30px digital minimum, with
   *     "What each one is" in the sixth cell.
   * Each badge keeps NVIDIA's clear space (0.22 of 48px a side).
   */
  .footer-credential {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin-top: clamp(40px, 4vw, 64px);
  }
  .footer-programs {
    margin: 0;
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.onDarkMuted};
  }
  .footer-plate {
    display: block;
    width: fit-content;
    max-width: 100%;
    padding: 6px 20px;
    border-radius: 4px;
    background: ${color.paper};
    box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.55);
    color: ${color.chocolate};
    text-decoration: none;
    transition: transform ${motion.press};
  }
  .footer-plate:active {
    transform: scale(0.99);
  }
  .footer-marks {
    /* 20.49 = the five marks' widths over their height; 106px their clear
       space; 40px the plate's padding. */
    --mark-h: min(48px, calc((100cqw - 146px) / 20.49));
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  .footer-marks img {
    height: var(--mark-h) !important;
    width: auto;
  }
  .footer-plate-more {
    display: none;
    align-items: center;
    gap: 6px;
    font: 600 ${type.note} / 1.3 ${font.ui};
    color: ${color.chocolate};
  }
  .footer-plate-more svg {
    width: 16px;
    height: 16px;
    flex: none;
    transition: transform ${motion.base};
  }
  ${media.hover} {
    .footer-plate:hover .footer-plate-more svg {
      transform: translateX(3px);
    }
  }
  @container (max-width: 965px) {
    .footer-marks {
      /* The first row (NVIDIA, Google, AssemblyAI) sets the height. */
      --mark-h: min(48px, calc((100cqw - 104px) / 10.64));
      flex-wrap: wrap;
    }
    .footer-marks > span:nth-child(n + 4) {
      order: 2;
    }
    .footer-marks::after {
      content: "";
      order: 1;
      flex-basis: 100%;
      height: 0;
    }
  }
  @container (max-width: 440px) {
    .footer-plate {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: center;
      justify-items: center;
      gap: 10px 8px;
      width: 100%;
      padding: 12px 10px;
    }
    .footer-marks {
      display: contents;
    }
    .footer-marks::after {
      content: none;
    }
    .footer-marks > span,
    .footer-marks > span:nth-child(n + 4) {
      order: 0;
      max-width: 100%;
      padding: 0 !important;
    }
    .footer-marks > span:first-child {
      padding: 7px !important;
    }
    .footer-marks img {
      height: 30px !important;
      max-width: 100%;
      object-fit: contain;
    }
    .footer-plate-more {
      display: inline-flex;
    }
  }

  /* One legal line; the note about the examples closes it, inline. */
  .gf-footer-bottom {
    margin-top: clamp(36px, 3.6vw, 56px);
    padding-top: 18px;
    border-top: 1px solid ${color.nightLine};
    font: 400 ${type.note} / 1.6 ${font.ui};
  }
  .footer-legal {
    padding-block: 12px;
    max-width: 120ch;
    color: ${color.onDarkMuted};
  }
  /*
   * NVIDIA require this attribution wherever their marks appear: said once,
   * at the foot of the site, in the smallest voice the page has.
   */
  .footer-trademark {
    color: ${color.onDarkMuted};
  }
  .footer-about {
    display: inline;
  }
  .footer-about summary {
    /* A 44px target that does not open up the line it sits in. */
    display: inline-block;
    padding-block: 12px;
    margin-block: -12px;
    line-height: 20px;
    cursor: pointer;
    list-style: none;
    color: ${color.onDark};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
    text-underline-offset: 3px;
    white-space: nowrap;
    transition: text-decoration-color ${motion.base};
  }
  .footer-about summary::-webkit-details-marker {
    display: none;
  }
  ${media.hover} {
    .footer-about summary:hover {
      text-decoration-color: currentColor;
    }
  }
  .footer-about p {
    display: block;
    max-width: 62ch;
    margin-top: 8px;
    line-height: 1.6;
    color: ${color.onDarkMuted};
  }
  ${media.lg} {
    .gf-footer-top {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    padding-top: 48px;
    .gf-footer-top {
      gap: 28px;
    }
    .gf-footer-links {
      display: none;
    }
    .gf-footer-fold {
      display: block;
    }
  }
`;

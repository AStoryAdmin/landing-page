/**
 * Movements 2 and 5 together — today is part of it, and the book is a
 * chapter — as one object you can open.
 *
 * The founder liked the idea of the timeline-as-book and not the look of it:
 * an open teal frame with sparse type didn't read as a book anyone would
 * want, or as their own family. So:
 *
 * - It arrives CLOSED — teal cloth, a gold-foil frame and title, the way the
 *   printed volume actually looks (mission CP02) — and opens itself when it
 *   comes into view (or on "Open the book"). Behind the cover: an endpaper
 *   with a bookplate, then a title page.
 * - Each spread is a memory laid out like the app's memory page: a print with
 *   photo corners and a caption on the left; on the right the date, tags,
 *   the teller's own words with a drop cap, and a second family member's
 *   line beneath — a documentary, not a diary.
 * - The last spread is the mission's ending (CM06, CM09): the family's years
 *   as a contact sheet with an empty frame for what's next — "Today belongs
 *   here too" — and "The story keeps going. Because so do you."
 *
 * Turn the pages with the arrows, the timeline under the book, the arrow
 * keys, or a click on either page. Wide screens get a true spread with 3D
 * page turns; narrow screens, and reduced motion, show one spread at a time
 * and start already open, so nothing is hidden behind a gesture.
 * Content: `homeExamples.ts` (SPREADS). Price: `pricing.ts`.
 */
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPREADS } from "../../../lib/homeExamples";
import { PRICE } from "../../../lib/pricing";
import { ArrowIcon, Picture } from "../kit/kit";
import {
  Eyebrow,
  Frame,
  SplitHead,
  Statement,
  TextLink,
} from "../kit/kit.styles";
import { riseLines, useScene, gsap } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

type Entry = (typeof SPREADS)[number];
const N = SPREADS.length;
/** Spreads: 0 closed, 1 endpaper + title page, 2…N+1 the memories, N+2 the ending. */
const LAST = N + 2;
const LEAVES = LAST; // leaf k turns from spread k to k+1
const LABELS = ["Cover", "Title", ...SPREADS.map((s) => s.year), "Next"];
const ROMAN = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
  "xiii",
  "xiv",
  "xv",
  "xvi",
];
/** How long a page takes to turn; the moving leaf stays on top for this long. */
const TURN_MS = 1100;

const reduced = () =>
  typeof window !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  position: relative;
  background:
    radial-gradient(
      ellipse 70% 55% at 50% 64%,
      ${color.paperPure},
      transparent 70%
    ),
    ${color.ivoryDeep};
  padding: clamp(96px, 11vw, 176px) 0;
  overflow: hidden;

  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: ${color.body};
    max-width: 44ch;
  }

  .book-wrap {
    margin-top: clamp(24px, 3vw, 48px);
  }
  .stage {
    position: relative;
    width: min(1160px, 100%);
    margin: 0 auto;
  }
  /* The shadow the book casts on the table; it widens as the book opens. */
  .stage::after {
    content: "";
    position: absolute;
    z-index: 0;
    left: var(--shadow-l, 2%);
    right: var(--shadow-r, 2%);
    bottom: -3%;
    height: 12%;
    background: radial-gradient(
      closest-side,
      rgba(42, 31, 24, 0.45),
      transparent
    );
    filter: blur(10px);
    transition:
      left ${TURN_MS}ms ease,
      right ${TURN_MS}ms ease;
  }
  .stage.closed::after {
    --shadow-l: 26%;
    --shadow-r: 26%;
  }

  .book {
    position: relative;
    z-index: 1;
    aspect-ratio: 1.5;
    /* % (of the stage), not cqw: cqw here would resolve against the viewport,
       not the book, and the cover's inside would sit a few px off the case. */
    padding: 1.4%;
    perspective: 2800px;
    container-type: inline-size;
    transition: transform ${TURN_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .stage.closed .book {
    transform: translateX(-25%);
  }
  /* The back board of the case, teal cloth. There is no separate front board:
     the cover leaf IS the front board, and its inside (endpaper on cloth)
     becomes the left side of the open book — so nothing appears or scales in
     behind the cover as it turns (the "second layer" the founder saw). */
  .board {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background:
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0 1px,
        transparent 1px 3px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.04) 0 1px,
        transparent 1px 3px
      ),
      ${color.teal};
    box-shadow: 0 2px 0 color-mix(in srgb, ${color.teal} 55%, ${color.black});
  }
  .board.r {
    right: 0;
    border-radius: 0 8px 8px 0;
  }
  .pages {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
  }
  .page,
  .face {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background: radial-gradient(
      ellipse at 50% 40%,
      ${color.paperPure},
      color-mix(in srgb, ${color.paper} 70%, ${color.ivory})
    );
    overflow: hidden;
  }
  .page.right {
    right: 0;
  }
  /* The gutter: paper curving into the spine. */
  .left-shade::after,
  .right-shade::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 14%;
    pointer-events: none;
  }
  .left-shade::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(42, 31, 24, 0.2),
      rgba(42, 31, 24, 0.04) 40%,
      transparent
    );
  }
  .right-shade::after {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(42, 31, 24, 0.2),
      rgba(42, 31, 24, 0.04) 40%,
      transparent
    );
  }
  .leaf {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    transform-origin: left center;
    transform-style: preserve-3d;
    transition: transform ${TURN_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;
  }
  .leaf.turned {
    transform: rotateY(-180deg);
  }
  .leaf .face {
    left: 0;
    width: 100%;
    backface-visibility: hidden;
  }
  .leaf .face.back {
    transform: rotateY(180deg);
  }
  /* The cover is the board itself: it reaches the edge of the case. */
  .leaf .face.cover {
    top: -1.4cqw;
    left: -0.2cqw;
    width: calc(100% + 1.6cqw);
    height: calc(100% + 2.8cqw);
    border-radius: 0 8px 8px 0;
    background: none;
  }
  /* The inside of the cover: cloth with the endpaper pasted down, a board's
     width of cloth showing round the outer three edges. In the face's own
     coordinates the outer edge is its left (the face is mirrored twice). */
  .leaf .face.back.inside {
    top: -1.4cqw;
    left: -0.2cqw;
    width: calc(100% + 1.6cqw);
    height: calc(100% + 2.8cqw);
    border-radius: 8px 0 0 8px;
    background:
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0 1px,
        transparent 1px 3px
      ),
      ${color.teal};
  }
  .leaf .face.back.inside .endpaper {
    inset: 1.4cqw 0.2cqw 1.4cqw 1.4cqw;
    box-shadow: inset -1.2cqw 0 1.4cqw -1cqw rgba(0, 0, 0, 0.35);
  }

  /* ── The cover ── */
  .cover-art {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background:
      linear-gradient(90deg, rgba(0, 0, 0, 0.22), transparent 7%),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0 1px,
        transparent 1px 3px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.04) 0 1px,
        transparent 1px 3px
      ),
      ${color.teal};
    color: ${color.warmGold};
  }
  .cover-art::before,
  .cover-art::after {
    content: "";
    position: absolute;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 80%, transparent);
    pointer-events: none;
  }
  .cover-art::before {
    inset: 4cqw 3.4cqw 4cqw 4.2cqw;
  }
  .cover-art::after {
    inset: 4.7cqw 4.1cqw 4.7cqw 4.9cqw;
    border-color: color-mix(in srgb, ${color.warmGold} 45%, transparent);
  }
  .cover-inner {
    display: grid;
    justify-items: center;
    gap: 2.2cqw;
    text-align: center;
  }
  .cover-inner small {
    font: 600 1cqw/1 ${font.body};
    letter-spacing: 0.4em;
    text-transform: uppercase;
  }
  .cover-inner h3 {
    font: 400 4.6cqw/1.05 ${font.display};
    letter-spacing: 0.01em;
    color: ${color.warmGold};
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  }
  .cover-inner .orn {
    width: 10cqw;
    height: 1px;
    background: ${color.warmGold};
    position: relative;
  }
  .cover-inner .orn::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1cqw;
    height: 1cqw;
    border: 1px solid ${color.warmGold};
    background: ${color.teal};
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .cover-inner .logo {
    font: 500 2cqw/1 ${font.display};
    letter-spacing: 0.04em;
    color: ${color.warmGold};
  }
  .cover-inner p {
    font: italic 400 1.5cqw/1.3 ${font.display};
    color: color-mix(in srgb, ${color.warmGold} 85%, ${color.ivory});
  }
  .open-btn {
    margin-top: 1.6cqw;
    padding: 1.1cqw 2.4cqw;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 70%, transparent);
    border-radius: 99px;
    background: transparent;
    color: ${color.ivory};
    font: 600 1.1cqw/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .open-btn:hover {
    background: color-mix(in srgb, ${color.warmGold} 18%, transparent);
  }

  /* ── Endpaper and title page ── */
  .endpaper {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background:
      radial-gradient(
          circle at 25% 25%,
          color-mix(in srgb, ${color.warmGold} 35%, transparent) 0.18cqw,
          transparent 0.22cqw
        )
        0 0 / 3cqw 3cqw,
      radial-gradient(
          circle at 75% 75%,
          color-mix(in srgb, ${color.warmGold} 25%, transparent) 0.18cqw,
          transparent 0.22cqw
        )
        0 0 / 3cqw 3cqw,
      color-mix(in srgb, ${color.teal} 88%, ${color.black});
  }
  .bookplate {
    width: 58%;
    padding: 3cqw 2.4cqw;
    background: ${color.paperPure};
    outline: 1px solid ${color.goldDeep};
    outline-offset: -0.8cqw;
    text-align: center;
    box-shadow: 0 1cqw 2cqw -1cqw rgba(0, 0, 0, 0.5);
  }
  .bookplate small {
    font: 600 0.95cqw/1 ${font.body};
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .bookplate p {
    margin-top: 1.4cqw;
    font: italic 400 1.9cqw/1.3 ${font.display};
    color: ${color.primary};
  }
  .title-page {
    position: absolute;
    inset: 0;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 1.8cqw;
    padding: 6cqw;
    text-align: center;
  }
  .title-page small {
    font: 600 1cqw/1 ${font.body};
    letter-spacing: 0.34em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .title-page h3 {
    font: 400 4.4cqw/1.05 ${font.display};
    color: ${color.primary};
  }
  .title-page .orn {
    width: 8cqw;
    height: 1px;
    background: ${color.goldDeep};
  }
  .title-page p {
    font: italic 400 1.7cqw/1.4 ${font.display};
    color: ${color.primaryMid};
    max-width: 26ch;
  }

  /* ── Memory spreads ── */
  .photo-page,
  .text-page,
  .end-page {
    position: absolute;
    inset: 0;
    padding: 5cqw 4.6cqw 3.4cqw;
    display: flex;
    flex-direction: column;
  }
  .running {
    display: flex;
    justify-content: space-between;
    font: italic 400 1.1cqw/1 ${font.display};
    color: ${color.bodyMuted};
    letter-spacing: 0.04em;
  }
  .folio {
    margin-top: auto;
    text-align: center;
    font: italic 400 1.15cqw/1 ${font.display};
    color: ${color.bodyMuted};
  }
  .print {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 1.6cqw;
    padding: 1.6cqw 0;
  }
  .print figure {
    position: relative;
    margin: 0;
    width: fit-content;
    max-width: 100%;
    display: grid;
    padding: 0.8cqw;
    background: ${color.white};
    box-shadow: 0 0.8cqw 1.8cqw -0.9cqw rgba(42, 31, 24, 0.55);
    transform: rotate(var(--tilt, -0.8deg));
  }
  .print img {
    max-width: 100%;
    max-height: 30cqw;
    width: auto;
    height: auto;
    min-height: 0;
    object-fit: contain;
  }
  /* Album photo corners, gold. */
  .corner {
    position: absolute;
    width: 2.4cqw;
    height: 2.4cqw;
    background: linear-gradient(135deg, ${color.goldDeep} 50%, transparent 50%);
    filter: drop-shadow(0 0.1cqw 0.1cqw rgba(0, 0, 0, 0.25));
  }
  .corner.tl {
    top: -0.5cqw;
    left: -0.5cqw;
  }
  .corner.tr {
    top: -0.5cqw;
    right: -0.5cqw;
    transform: rotate(90deg);
  }
  .corner.br {
    bottom: -0.5cqw;
    right: -0.5cqw;
    transform: rotate(180deg);
  }
  .corner.bl {
    bottom: -0.5cqw;
    left: -0.5cqw;
    transform: rotate(270deg);
  }
  .print figcaption {
    font: italic 400 1.5cqw/1.2 ${font.display};
    color: ${color.primaryMid};
    text-align: center;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8cqw;
    margin-top: 3cqw;
    font: 500 1.1cqw/1 ${font.body};
    color: ${color.bodyMuted};
  }
  .meta span + span {
    padding: 0.5cqw 1.1cqw;
    border-radius: 99px;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
  }
  .meta span + span::before {
    content: "";
    display: inline-block;
    width: 0.7cqw;
    height: 0.7cqw;
    margin-right: 0.6cqw;
    border-radius: 50%;
    background: ${color.teal};
    vertical-align: 0.05em;
  }
  .meta span:last-child::before {
    background: ${color.accent};
  }
  .title {
    margin-top: 2.2cqw;
    font: 400 3.2cqw/1.1 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primary};
  }
  .rule {
    width: 5cqw;
    height: 1px;
    margin: 2cqw 0;
    background: ${color.goldDeep};
  }
  .words {
    font: 400 1.62cqw/1.55 ${font.display};
    color: ${color.primary};
  }
  .words::first-letter {
    float: left;
    margin: 0.25cqw 0.8cqw 0 0;
    font: 400 4.6cqw/0.8 ${font.display};
    color: ${color.teal};
  }
  .by {
    margin-top: 1.6cqw;
    font: 600 1cqw/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .also {
    display: flex;
    gap: 1.2cqw;
    align-items: flex-start;
    margin-top: 2.6cqw;
    padding: 1.6cqw 1.8cqw;
    border-radius: 1.4cqw;
    background: color-mix(in srgb, ${color.sand} 45%, ${color.paperPure});
  }
  .also i {
    display: grid;
    place-items: center;
    flex: none;
    width: 3cqw;
    height: 3cqw;
    border-radius: 50%;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 1.2cqw/1 ${font.body};
    font-style: normal;
  }
  .also b {
    display: block;
    font: 600 1cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
    margin-bottom: 0.4cqw;
  }
  .also p {
    font: italic 400 1.45cqw/1.4 ${font.display};
    color: ${color.primary};
  }

  /* ── The ending ── */
  .sheet {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-content: center;
    gap: 2.4cqw 1.4cqw;
    padding: 2cqw 0 1cqw;
  }
  .sheet figure {
    margin: 0;
  }
  .sheet .thumb {
    aspect-ratio: 4 / 3;
    padding: 0.4cqw;
    background: ${color.white};
    box-shadow: 0 0.5cqw 1cqw -0.6cqw rgba(42, 31, 24, 0.55);
  }
  .sheet img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .sheet figcaption {
    margin-top: 0.7cqw;
    font: 500 1cqw/1 ${font.body};
    color: ${color.bodyMuted};
  }
  .sheet .next .thumb {
    display: grid;
    place-items: center;
    background: transparent;
    box-shadow: none;
    outline: 1px dashed ${color.accent};
    outline-offset: -1px;
    color: ${color.accent};
    font: 300 3cqw/1 ${font.body};
  }
  .sheet .next figcaption {
    color: ${color.accentText};
    font-weight: 600;
  }
  .today {
    padding-top: 1.4cqw;
    border-top: 1px solid ${color.primaryLine};
    font: 400 1.9cqw/1.2 ${font.display};
    color: ${color.primary};
  }
  .today b {
    font-weight: 600;
    color: ${color.accent};
  }
  .end-page.right {
    justify-content: center;
    padding-inline: 5.4cqw;
  }
  .end-page .held {
    font: italic 400 1.8cqw/1.5 ${font.display};
    color: ${color.primaryMid};
  }
  .end-page .not-end {
    margin-top: 2cqw;
    font: 400 1.8cqw/1.4 ${font.display};
    color: ${color.primary};
  }
  .end-page h3 {
    margin-top: 2.4cqw;
    font: 400 5.2cqw/1.02 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .end-page h3 em {
    display: block;
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
    background: linear-gradient(
        100deg,
        ${color.accent} 40%,
        ${color.warmGold} 50%,
        ${color.accent} 60%
      )
      0 0 / 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    padding-bottom: 0.14em;
    margin-bottom: -0.14em;
    -webkit-text-fill-color: transparent;
  }
  .stage.at-end .end-page h3 em {
    animation: foil 2.6s 0.9s ease-in-out;
  }
  @keyframes foil {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
  .end-page .because {
    margin-top: 1.6cqw;
    font: italic 400 2.4cqw/1.2 ${font.display};
    color: ${color.primaryMid};
  }
  .end-page .begin {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 1cqw;
    margin-top: 3.4cqw;
    padding: 1.4cqw 2.4cqw;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 1.25cqw/1 ${font.body};
    text-decoration: none;
  }
  .end-page .begin svg {
    width: 1.4cqw;
    height: 1.4cqw;
  }
  .end-page .begin:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 3px;
  }
  .stage.at-end .book {
    animation: glow 2.4s ease-out;
  }
  @keyframes glow {
    30% {
      filter: drop-shadow(
        0 0 2.4cqw color-mix(in srgb, ${color.warmGold} 55%, transparent)
      );
    }
  }

  /* ── The timeline under the book ── */
  .scrub {
    display: flex;
    align-items: center;
    gap: clamp(12px, 2vw, 28px);
    width: min(980px, 100%);
    margin: clamp(40px, 4vw, 64px) auto 0;
  }
  .rail {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  .rail::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7px;
    height: 1px;
    background: ${color.primaryLineStrong};
  }
  .rail .fill {
    position: absolute;
    left: 22px;
    bottom: 7px;
    height: 1px;
    background: ${color.teal};
    transition: width ${TURN_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .rail button {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 10px;
    min-width: 44px;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    font: italic 400 17px/1 ${font.display};
    font-variant-numeric: lining-nums;
    color: ${color.bodyMuted};
    transition: color 300ms;
  }
  .rail button::after {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${color.ivoryDeep};
    border: 1px solid ${color.primaryLineStrong};
    transform: rotate(45deg);
    border-radius: 1px;
    transition:
      background 300ms,
      border-color 300ms,
      transform 300ms;
  }
  .rail button.passed::after {
    border-color: ${color.teal};
    background: ${color.teal};
  }
  .rail button[aria-current="true"] {
    color: ${color.teal};
  }
  .rail button[aria-current="true"]::after {
    background: ${color.warmGold};
    border-color: ${color.goldDeep};
    transform: rotate(45deg) scale(1.5);
  }
  .turn {
    display: grid;
    place-items: center;
    flex: none;
    width: 52px;
    height: 52px;
    padding: 0;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 50%;
    background: ${color.paperPure};
    color: ${color.primary};
    cursor: pointer;
  }
  .turn:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .turn.prev svg {
    transform: scaleX(-1);
  }
  .turn svg {
    width: 18px;
    height: 18px;
  }
  .scrub button:focus-visible,
  .book:focus-visible,
  .open-btn:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }

  .print-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px 40px;
    margin-top: clamp(56px, 6vw, 96px);
    padding-top: 24px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .print-line p {
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
    max-width: 44ch;
  }
  .print-line b {
    font-weight: 500;
    color: ${color.accentText};
  }

  /* Narrow screens: one spread at a time, stacked, no 3D. */
  .single {
    display: none;
  }
  ${media.md} {
    .stage {
      display: none;
    }
    .single {
      display: grid;
      max-width: 480px;
      margin: 0 auto;
      box-shadow: 0 40px 70px -40px rgba(42, 31, 24, 0.55);
    }
    .single > div {
      position: relative;
      aspect-ratio: 3 / 4;
      container-type: inline-size;
      background: ${color.paperPure};
      border: 8px solid ${color.teal};
    }
    .single > div + div {
      border-top-width: 0;
    }
    .single .photo-page,
    .single .text-page,
    .single .end-page,
    .single .title-page {
      padding: 8cqw 8cqw 6cqw;
    }
    .single .running,
    .single .folio,
    .single .by,
    .single .meta,
    .single .also b,
    .single .sheet figcaption,
    .single .cover-inner small {
      font-size: 2.6cqw;
    }
    .single .title,
    .single .title-page h3 {
      font-size: 7cqw;
    }
    .single .words {
      font-size: 3.6cqw;
    }
    .single .also p,
    .single .print figcaption,
    .single .held,
    .single .not-end,
    .single .today,
    .single .title-page p,
    .single .bookplate p,
    .single .cover-inner p {
      font-size: 3.6cqw;
    }
    .single .end-page h3,
    .single .cover-inner h3 {
      font-size: 10cqw;
    }
    .single .because {
      font-size: 5cqw;
    }
    .single .begin,
    .single .open-btn {
      font-size: 3cqw;
      padding: 3cqw 5cqw;
    }
    .single .also i {
      width: 7cqw;
      height: 7cqw;
      font-size: 3cqw;
    }
    .scrub {
      flex-wrap: wrap;
      justify-content: center;
    }
    .rail {
      order: -1;
      flex-basis: 100%;
    }
    .rail button {
      min-width: 0;
      font-size: 0;
    }
    .rail button[aria-current="true"] {
      font-size: 14px;
    }
  }
`;

function Running({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <p className="running">
      <span>{left}</span>
      <span>{right}</span>
    </p>
  );
}

function CoverPage({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="cover-art">
      <div className="cover-inner">
        <small>Volume I</small>
        <h3>
          The Hartley
          <br />
          Family
        </h3>
        <span className="orn" />
        <p>1952 — still being written</p>
        <span className="logo">A Story</span>
        {onOpen && (
          <button
            type="button"
            className="open-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            Open the book
          </button>
        )}
      </div>
    </div>
  );
}

function Endpaper() {
  return (
    <div className="endpaper">
      <div className="bookplate">
        <small>Ex libris</small>
        <p>Walt &amp; Ruth Hartley — and everyone who came after</p>
      </div>
    </div>
  );
}

function TitlePage() {
  return (
    <div className="title-page">
      <small>A Story</small>
      <h3>The Hartley Family</h3>
      <span className="orn" />
      <p>
        In their own words, and in each other’s. Told in calls, kept by
        everyone.
      </p>
    </div>
  );
}

function PhotoPage({ e, n }: { e: Entry; n: number }) {
  return (
    <div className="photo-page">
      <Running left="The Hartley family" right={e.year} />
      <div className="print">
        <figure style={{ ["--tilt" as string]: `${n % 2 ? 0.9 : -0.8}deg` }}>
          <Picture
            id={e.photo}
            alt={e.alt}
            sizes="(max-width: 860px) 80vw, 460px"
          />
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner br" />
          <span className="corner bl" />
        </figure>
        <figcaption>{e.caption}</figcaption>
      </div>
      <p className="folio">{ROMAN[n * 2]}</p>
    </div>
  );
}

function TextPage({ e, n }: { e: Entry; n: number }) {
  return (
    <div className="text-page">
      <Running left={e.title} right="A Story" />
      <p className="meta">
        <span>{e.date}</span>
        {e.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </p>
      <h3 className="title">{e.title}</h3>
      <span className="rule" />
      <p className="words">{e.words}</p>
      <p className="by">{e.by}</p>
      <div className="also">
        <i aria-hidden="true">{e.also.initial}</i>
        <div>
          <b>{e.also.name} remembers</b>
          <p>“{e.also.quote}”</p>
        </div>
      </div>
      <p className="folio">{ROMAN[n * 2 + 1]}</p>
    </div>
  );
}

function EndLeft() {
  return (
    <div className="end-page">
      <Running left="The Hartley family" right="1952 —" />
      <div className="sheet">
        {SPREADS.map((s) => (
          <figure key={s.year}>
            <div className="thumb">
              <img
                src={`/mission/${s.photo}-640.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{s.year}</figcaption>
          </figure>
        ))}
        <figure className="next">
          <div className="thumb" aria-hidden="true">
            +
          </div>
          <figcaption>Next</figcaption>
        </figure>
      </div>
      <p className="today">
        <b>Today</b> belongs here too.
      </p>
    </div>
  );
}

function EndRight() {
  return (
    <div className="end-page right">
      <p className="held">
        Made to be held.
        <br />
        Made to be passed on.
      </p>
      <p className="not-end">But this is not the end.</p>
      <h3>
        The story <em>keeps going.</em>
      </h3>
      <p className="because">Because so do you.</p>
      <Link className="begin" to="/start" onClick={(e) => e.stopPropagation()}>
        Begin your story <ArrowIcon />
      </Link>
    </div>
  );
}

/** Right-hand page of spread s (the front of leaf s), and left-hand page (the back of leaf s-1). */
function RightPage({ s, onOpen }: { s: number; onOpen?: () => void }) {
  if (s === 0) return <CoverPage onOpen={onOpen} />;
  if (s === 1) return <TitlePage />;
  if (s === LAST) return <EndRight />;
  return <TextPage e={SPREADS[s - 2]} n={s - 2} />;
}
function LeftPage({ s }: { s: number }) {
  if (s === 1) return <Endpaper />;
  if (s === LAST) return <EndLeft />;
  if (s >= 2) return <PhotoPage e={SPREADS[s - 2]} n={s - 2} />;
  return null;
}

export default function FamilyBook() {
  const [spread, setSpread] = useState(() => (reduced() ? 1 : 0));
  const [moving, setMoving] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const stageRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (to: number, byHand = true) => {
    if (byHand) touched.current = true;
    const next = Math.max(0, Math.min(LAST, to));
    if (next === spread) return;
    // The leaf that moves is the one between the two spreads nearest the target.
    setMoving(next > spread ? spread : spread - 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMoving(null), TURN_MS);
    setSpread(next);
  };
  const onKey = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowRight") go(spread + 1);
    if (ev.key === "ArrowLeft") go(spread - 1);
  };

  // The book opens itself the first time it is seen.
  useEffect(() => {
    if (reduced() || !stageRef.current) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        t = window.setTimeout(() => go(1, false), 700);
      },
      { threshold: 0.6 },
    );
    io.observe(stageRef.current);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(".stage, .single", {
      y: 70,
      opacity: 0,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: ".book-wrap", start: "top 85%", once: true },
    });
  });

  const label = LABELS[spread];
  return (
    <Scene ref={ref} id="book" aria-labelledby="book-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>Not a memoir</Eyebrow>
            <Statement id="book-title" $size="xl">
              Your story isn’t behind you. <em>You’re still inside it.</em>
            </Statement>
          </div>
          <p className="lead">
            The mistake is thinking a life becomes worth recording only when
            it’s nearly over. You’re already living the part you’ll miss later.
            Open one family’s archive — 1952 to this morning.
          </p>
        </SplitHead>

        <div className="book-wrap">
          {/* Wide: the book, with 3D page turns. */}
          <div
            ref={stageRef}
            className={`stage${spread === 0 ? " closed" : ""}${spread === LAST ? " at-end" : ""}`}
          >
            <div
              className="book"
              tabIndex={0}
              role="group"
              aria-roledescription="book"
              aria-label={`The Hartley family archive — ${label}. Use the arrow keys to turn the page.`}
              onKeyDown={onKey}
            >
              <span className="board r" />
              <div className="pages">
                <div
                  className="page right right-shade"
                  onClick={() => go(spread + 1)}
                >
                  <RightPage s={LAST} />
                </div>
                {Array.from({ length: LEAVES }, (_, j) => {
                  const turned = j < spread;
                  const z =
                    moving === j ? 999 : turned ? 200 + j : 100 + (LEAVES - j);
                  const visible = j === spread || j === spread - 1;
                  return (
                    <div
                      key={j}
                      className={`leaf ${turned ? "turned" : ""}`}
                      style={{ zIndex: z }}
                      onClick={() => go(turned ? spread - 1 : spread + 1)}
                      aria-hidden={!visible}
                      inert={!visible}
                    >
                      <div
                        className={`face front ${j === 0 ? "cover" : "right-shade"}`}
                      >
                        <RightPage s={j} onOpen={() => go(1)} />
                      </div>
                      <div
                        className={`face back ${j === 0 ? "inside" : "left-shade"}`}
                      >
                        <LeftPage s={j + 1} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Narrow: one spread, stacked. */}
          <div className="single" aria-live="polite" key={spread}>
            {spread > 0 && (
              <div>
                <LeftPage s={spread} />
              </div>
            )}
            <div>
              <RightPage s={spread} onOpen={() => go(1)} />
            </div>
          </div>

          <div className="scrub" aria-label="Turn the pages">
            <button
              type="button"
              className="turn prev"
              onClick={() => go(spread - 1)}
              disabled={spread === 0}
              aria-label="Previous page"
            >
              <ArrowIcon />
            </button>
            <div className="rail">
              <span
                className="fill"
                style={{ width: `calc((100% - 44px) * ${spread / LAST})` }}
              />
              {LABELS.map((l, i) => (
                <button
                  key={l}
                  type="button"
                  className={i < spread ? "passed" : undefined}
                  aria-current={i === spread}
                  aria-label={i === 0 ? "Close the book" : l}
                  onClick={() => go(i)}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="turn"
              onClick={() => go(spread + 1)}
              disabled={spread === LAST}
              aria-label="Next page"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="print-line">
          <p>
            Some chapters deserve to leave the screen. When one is ready, make
            it a volume — <b>{PRICE.book}</b> for {PRICE.bookPages}. The archive
            keeps growing after the book is printed.
          </p>
          <TextLink to="/pricing#book">
            See book options <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Scene>
  );
}

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
 *   comes into view (or on "Open the book"). Behind the cover: the real
 *   book's endpaper (the A Story mark on cloth, as /samples prints it), then
 *   a title page in the sample books' style carrying the dedication.
 * - Each spread is one memory, kept light (2026-10-15): a large print with
 *   photo corners on the left; on the right a chapter line, the title, the
 *   teller's words set big with a drop cap, and one other voice hung at the
 *   foot — a documentary, not a diary.
 * - The last spread is the mission's ending (CM06, CM09): the family's years
 *   as a contact sheet with an empty frame for what's next — "Today belongs
 *   here too" — and "The story keeps going. The family adds the next page."
 *
 * Turn the pages with the arrows, the timeline under the book, the arrow
 * keys, or a click on either page. Wide screens get a true spread with 3D
 * page turns; narrow screens, and reduced motion, show one spread at a time
 * and start already open, so nothing is hidden behind a gesture.
 * Content: `homeExamples.ts` (SPREADS). Price: `pricing.ts`.
 *
 * 2026-10-24: back on Home from the past build (bd23f2f) at Bao's request,
 * with these changes. The type floor: every label in the book is 14px or
 * more and the words 20px or more (18px on a phone), and the book is as
 * large as the window allows so it still reads as a book. The words are set
 * in EB Garamond, the book's reading face; captions under prints in Caveat.
 * The headline is new ("Your story isn't behind you" was a not-X-but-Y
 * line) and there is no eyebrow. The print line no longer promises a
 * hardcover with every plan: print at home free, printed editions from
 * pricing.ts. The foil-gradient title and the glow are gone (no gradient
 * text). The Hartleys are a sample family, and the page says so.
 */
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import styled from "styled-components";
import { SPREADS } from "../../../lib/homeExamples";
import { BOOK } from "../../../lib/pricing";
import { ArrowIcon, Picture } from "../kit/kit";
import {
  Frame,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "../kit/kit.styles";
import { riseLines, useScene, gsap } from "../../../lib/scrollMotion";
import { color, curve, display, font, media, motion } from "../../../styles/theme";
import { clothBoard, clothLayer } from "../kit/cloth";
import { START_HREF, START_LABEL } from "../../../lib/app";

/*
 * The pages as Home shows them: US spelling ("Mom" in the 1952 spread), and
 * two lines reworded so no page turns on a not-X-but-Y contrast (house
 * style, 2026-10-24): the canoe trip is told as Dan's version against Sam's,
 * and Mia's question as two questions.
 */
const WORDS: Record<string, string> = {
  "1998":
    "Sam says we were lost. I say we took the long way round the lake, and I’d do it again.",
  "2019":
    "Mia asked where the moon goes in the daytime. Then she asked who keeps it company while we can’t see it. Writing it down before I forget how she said it.",
};
const PAGES = SPREADS.map((e) => ({
  ...e,
  words: WORDS[e.year] ?? e.words,
  also: { ...e.also, quote: e.also.quote.replace(/\bMum\b/g, "Mom") },
}));
type Entry = (typeof PAGES)[number];
const N = SPREADS.length;
/** Spreads: 0 closed, 1 endpaper + title page, 2…N+1 the memories, N+2 the ending. */
const LAST = N + 2;
const LEAVES = LAST; // leaf k turns from spread k to k+1
const LABELS = ["Cover", "Title", ...PAGES.map((s) => s.year), "Next"];
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
  padding: calc(clamp(80px, 9vw, 160px) * var(--sy)) 0
    calc(clamp(64px, 7vw, 120px) * var(--sy));
  overflow: hidden;

  .lead {
    font: 400 clamp(1.25rem, 1.08rem + 0.4vw, 1.6rem) / 1.5 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }

  .book-wrap {
    margin-top: calc(clamp(20px, 2.6vw, 48px) * var(--sy));
  }
  /* Height-aware (2026-10-14). The book is 1.5 : 1, so at full width it was
     779px tall in a 720px laptop window and could never be seen whole. Its
     inside is sized in cqw, so capping the width by the screen's height
     scales the entire volume down together — the open book always fits. */
  .stage {
    position: relative;
    width: min(1240px, 100%, calc((100svh - 210px) * 1.5));
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
      left ${TURN_MS}ms ${curve.move},
      right ${TURN_MS}ms ${curve.move};
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
    transition: transform ${TURN_MS}ms ${curve.move};
  }
  .stage.closed .book {
    transform: translateX(-25%);
  }
  /* The back board of the case, teal cloth. There is no separate front board:
     the cover leaf IS the front board, and its inside (endpaper on cloth)
     becomes the left side of the open book - so nothing appears or scales in
     behind the cover as it turns (the "second layer" the founder saw). */
  .board {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    ${clothBoard("15cqw")}
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
    /* Before it opens, the cover lifts a few degrees with the reader's scroll
       (--lift, written by the scene below); the turn itself stays a
       transition, and starts from wherever the lift has got to. */
    transform: rotateY(var(--lift, 0deg));
    transition: transform ${TURN_MS}ms ${curve.move};
    cursor: pointer;
  }
  /* While scroll is driving the lift, the transition must not chase it. */
  .stage.lifting .cover-leaf {
    transition: none;
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
    ${clothBoard("15cqw")}
  }
  .leaf .face.back.inside .endpaper {
    inset: 1.4cqw 0.2cqw 1.4cqw 1.4cqw;
    box-shadow: inset -1.2cqw 0 1.4cqw -1cqw rgba(0, 0, 0, 0.35);
  }

  /* ── The cover ── */
  /* The cover follows the founder's cover design (coverbook.pdf): title in
     tracked capitals top left, the date, the names in italic, a stack of
     prints at the right, a line along the foot. Teal cloth. */
  .cover-art {
    position: absolute;
    inset: 0;
    padding: 5.5cqw 4.4cqw 4.6cqw 5.2cqw;
    display: flex;
    flex-direction: column;
    /* The printed volume's own cloth (kit/cloth.ts). */
    ${clothBoard("15cqw")}
    color: ${color.ivory};
    /* The bevel of a cloth-covered board. */
    box-shadow:
      inset 0 0 0 0.25cqw rgba(255, 255, 255, 0.04),
      inset 0 0 3cqw rgba(0, 0, 0, 0.18);
  }
  .cover-art h3 {
    font: 700 2.6cqw/1.05 ${font.ui};
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${color.ivory};
  }
  .cover-art .date {
    margin-top: 0.8cqw;
    font: 500 max(14px, 0.95cqw) / 1 ${font.ui};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: color-mix(in srgb, ${color.ivory} 70%, transparent);
  }
  .cover-art .names {
    margin-top: 2.6cqw;
    font: italic 600 max(20px, 2.2cqw) / 1 ${font.display};
    color: ${color.gold};
  }
  .cover-stack {
    position: relative;
    flex: 1;
    margin: 1.4cqw 0 1.6cqw;
  }
  .cover-stack img {
    position: absolute;
    display: block;
    object-fit: cover;
    padding: 0.5cqw 0.5cqw 1.6cqw;
    background: ${color.paperPure};
    box-shadow: 0 1cqw 2cqw -0.8cqw rgba(0, 0, 0, 0.6);
    filter: grayscale(0.85) sepia(0.2);
  }
  .cover-stack img:nth-child(1) {
    right: 1cqw;
    top: 8%;
    width: 17cqw;
    height: 15cqw;
    transform: rotate(4deg);
  }
  .cover-stack img:nth-child(2) {
    right: 10cqw;
    top: 20%;
    width: 18cqw;
    height: 21cqw;
    transform: rotate(-3deg);
    z-index: 2;
  }
  .cover-stack img:nth-child(3) {
    right: 2cqw;
    top: 42%;
    width: 15cqw;
    height: 17cqw;
    transform: rotate(2deg);
    z-index: 3;
  }
  .cover-foot {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2cqw;
  }
  .cover-foot p {
    font: italic 500 max(18px, 1.8cqw) / 1.2 ${font.display};
    color: ${color.ivory};
  }
  .cover-foot .mark {
    font: 600 max(18px, 1.5cqw) / 1 ${font.display};
    color: ${color.gold};
  }
  .open-btn {
    position: absolute;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    left: 5.2cqw;
    bottom: 8.4cqw;
    padding: 1.1cqw 2.4cqw;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 70%, transparent);
    border-radius: 99px;
    background: transparent;
    color: ${color.ivory};
    font: 600 16px/1 ${font.ui};
    cursor: pointer;
    transition:
      background-color ${motion.base},
      transform ${motion.press};
  }
  @media (hover: hover) and (pointer: fine) {
    .open-btn:hover {
      background: color-mix(in srgb, ${color.warmGold} 18%, transparent);
    }
  }
  .open-btn:active {
    transform: scale(0.97);
  }

  /* ── Endpaper and title page ── */
  /* The inside cover is the real book's endpaper (2026-10-15, founder: "we
     need that texture"): the A Story mark repeated across cloth in the cover
     colour, as /samples prints it, on the same cloth as the cover.
     Nothing written on it; the dedication moved to the title page. */
  .endpaper {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: ${color.teal};
  }
  .endpaper::before,
  .endpaper::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .endpaper::before {
    background: ${color.ivory};
    opacity: 0.11;
    -webkit-mask: url("/book-objects/a-mark.png") 0 0 / 4cqw 4.4cqw space;
    mask: url("/book-objects/a-mark.png") 0 0 / 4cqw 4.4cqw space;
  }
  .endpaper::after {
    ${clothLayer("15cqw")}
  }
  /* The title page, set like the sample books': the mark, the series in
     tracked capitals, the family's name large, the years, the dedication. */
  .title-page {
    position: absolute;
    inset: 0;
    display: grid;
    align-content: center;
    justify-items: center;
    padding: 6cqw 5cqw;
    text-align: center;
  }
  .title-page .a-mark {
    width: 3.6cqw;
    height: 4cqw;
    background: ${color.teal};
    -webkit-mask: url("/book-objects/a-mark.png") center / contain no-repeat;
    mask: url("/book-objects/a-mark.png") center / contain no-repeat;
  }
  .title-page small {
    margin-top: 2.4cqw;
    font: 600 max(14px, 0.95cqw) / 1 ${font.ui};
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .title-page h3 {
    margin-top: 1.4cqw;
    font: 600 4.8cqw/1 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primary};
  }
  .title-page .years {
    margin-top: 1.2cqw;
    font: italic 400 max(17px, 1.5cqw) / 1.3 ${font.text};
    color: ${color.primaryMid};
  }
  .title-page .orn {
    width: 6cqw;
    height: 1px;
    margin: 3.2cqw 0 2.6cqw;
    background: ${color.goldDeep};
  }
  .title-page .for {
    font: 600 max(14px, 0.9cqw) / 1 ${font.ui};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .title-page .ded {
    margin-top: 1cqw;
    font: italic 600 max(22px, 2.4cqw) / 1.15 ${font.display};
    color: ${color.teal};
  }
  .title-page .why {
    margin-top: 1cqw;
    max-width: 24ch;
    font: italic 400 max(17px, 1.5cqw) / 1.45 ${font.text};
    color: ${color.primaryMid};
  }

  /* ── Memory spreads ── */
  /* Lighter since 2026-10-15 ("the Hartley demo deserves the best, but its
     content should not be dense"): no running heads, no tag chips, no boxed
     second voice. Left: the print, large. Right: a chapter line, the title,
     the words set big enough to read from across the room, and one other
     voice hung at the foot. The rhythm of the sample books, not the app. */
  .photo-page,
  .text-page,
  .end-page {
    position: absolute;
    inset: 0;
    padding: 5cqw 4.8cqw 3.2cqw;
    display: flex;
    flex-direction: column;
  }
  .folio {
    margin-top: auto;
    text-align: center;
    font: 400 max(14px, 1.05cqw) / 1 ${font.text};
    font-variant-numeric: oldstyle-nums;
    color: ${color.bodyMuted};
  }
  .print {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 1.8cqw;
    padding: 0.6cqw 0 1.2cqw;
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
    max-height: 40cqw;
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
    font: 500 max(20px, 2.1cqw) / 1.1 ${font.script};
    color: ${color.primary};
    text-align: center;
  }

  .chapter {
    margin-top: 1.4cqw;
    font: 600 max(14px, 0.95cqw) / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .title {
    margin-top: 1.6cqw;
    font: 600 4.2cqw/1.05 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primary};
  }
  .rule {
    width: 5cqw;
    height: 1px;
    margin: 2.2cqw 0;
    background: ${color.goldDeep};
  }
  .words {
    font: 400 max(20px, 2.3cqw) / 1.45 ${font.text};
    color: ${color.body};
  }
  .words::first-letter {
    float: left;
    margin: 0.3cqw 0.9cqw 0 0;
    font: 600 6.6cqw/0.8 ${font.display};
    color: ${color.teal};
  }
  .by {
    margin-top: 1.6cqw;
    font: 500 max(14px, 1.05cqw) / 1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  /* The second voice: hung at the foot of the page, a gold rule beside it. */
  .also {
    margin: auto 0 0;
    padding: 0.2cqw 0 0.2cqw 1.8cqw;
    border-left: 2px solid ${color.warmGold};
  }
  .also p {
    font: italic 500 max(18px, 2cqw) / 1.35 ${font.display};
    color: ${color.teal};
  }
  .also cite {
    display: block;
    margin-top: 0.8cqw;
    font: 600 max(14px, 1.05cqw) / 1.2 ${font.ui};
    font-style: normal;
    color: ${color.accentText};
  }
  .text-page .folio {
    margin-top: 2.4cqw;
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
    font: 500 max(14px, 1.1cqw) / 1 ${font.ui};
    color: ${color.bodyMuted};
  }
  .sheet .next .thumb {
    display: grid;
    place-items: center;
    background: transparent;
    box-shadow: none;
    outline: 1px dashed ${color.accent};
    outline-offset: -1px;
    color: ${color.accentText};
    font: 300 3cqw/1 ${font.ui};
  }
  .sheet .next figcaption {
    color: ${color.accentText};
    font-weight: 600;
  }
  .today {
    padding-top: 1.4cqw;
    border-top: 1px solid ${color.primaryLine};
    font: 600 max(19px, 2cqw) / 1.2 ${font.display};
    color: ${color.primary};
  }
  .today b {
    font-weight: 600;
    color: ${color.accentText};
  }
  .end-page.right {
    justify-content: center;
    padding-inline: 5.4cqw;
  }
  .end-page .held {
    font: italic 400 max(18px, 1.8cqw) / 1.5 ${font.text};
    color: ${color.primaryMid};
  }
  .end-page .not-end {
    margin-top: 2cqw;
    font: 400 max(18px, 1.8cqw) / 1.4 ${font.text};
    color: ${color.primary};
  }
  .end-page h3 {
    margin-top: 2.4cqw;
    font: 600 5.2cqw/1.02 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .end-page h3 em {
    font-style: normal;
    color: ${color.accentText};
  }
  .end-page .because {
    margin-top: 1.6cqw;
    font: italic 500 max(20px, 2.4cqw) / 1.2 ${font.display};
    color: ${color.primaryMid};
  }
  .end-page .begin {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    gap: 1cqw;
    margin-top: 3.4cqw;
    padding: 1.4cqw 2.4cqw;
    border-radius: 99px;
    background: ${color.primary};
    color: ${color.onDark};
    font: 600 16px/1 ${font.ui};
    text-decoration: none;
    transition:
      background-color ${motion.base},
      transform ${motion.press};
  }
  @media (hover: hover) and (pointer: fine) {
    .end-page .begin:hover {
      background: ${color.chocolateDeep};
    }
  }
  .end-page .begin:active {
    transform: scale(0.97);
  }
  .end-page .begin svg {
    width: 18px;
    height: 18px;
  }
  .end-page .begin:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 3px;
  }
  /* ── The timeline under the book ── */
  .scrub {
    display: flex;
    align-items: center;
    gap: clamp(12px, 2vw, 28px);
    width: min(980px, 100%);
    margin: calc(clamp(28px, 3.4vw, 64px) * var(--sy)) auto 0;
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
    transition: width ${TURN_MS}ms ${curve.move};
  }
  .rail button {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 10px;
    min-width: 44px;
    min-height: 44px;
    align-content: end;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    font: italic 400 18px/1 ${font.text};
    font-variant-numeric: lining-nums;
    color: ${color.bodyMuted};
    transition: color ${motion.base};
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
      background-color ${motion.base},
      border-color ${motion.base},
      transform ${motion.base};
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
    transition:
      border-color ${motion.base},
      transform ${motion.press};
  }
  @media (hover: hover) and (pointer: fine) {
    .turn:not(:disabled):hover {
      border-color: ${color.primary};
    }
  }
  .turn:not(:disabled):active {
    transform: scale(0.95);
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
    font: 600 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
    max-width: 44ch;
  }
  .print-line .links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 32px;
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
    /* The endpaper alone is a band, not a whole page of pattern. */
    .single > div.ep {
      aspect-ratio: 3 / 1;
    }
    .single .endpaper::before {
      -webkit-mask-size: 8cqw 8.8cqw;
      mask-size: 8cqw 8.8cqw;
    }
    .single .folio,
    .single .by,
    .single .chapter,
    .single .also cite,
    .single .title-page small,
    .single .title-page .for,
    .single .sheet figcaption {
      font-size: max(14px, 2.8cqw);
    }
    .single .title,
    .single .title-page h3 {
      font-size: max(30px, 8.4cqw);
    }
    .single .title-page .a-mark {
      width: 7cqw;
      height: 8cqw;
    }
    .single .words {
      font-size: max(18px, 4.6cqw);
    }
    .single .words::first-letter {
      font-size: 12cqw;
    }
    .single .also p,
    .single .held,
    .single .not-end,
    .single .today,
    .single .title-page .years,
    .single .title-page .why {
      font-size: max(17px, 4.2cqw);
    }
    .single .print figcaption {
      font-size: max(22px, 5.4cqw);
    }
    .single .title-page .ded {
      font-size: max(24px, 5.8cqw);
    }
    /* Pages with words grow with them on a phone, rather than clip. */
    .single > div.flow {
      aspect-ratio: auto;
    }
    .single > div.flow > .text-page,
    .single > div.flow > .end-page,
    .single > div.flow > .title-page {
      position: relative;
      inset: auto;
    }
    .single > div.flow > .text-page .also {
      margin-top: 8cqw;
    }
    .single .print img {
      max-height: 80cqw;
    }
    .single .end-page h3 {
      font-size: 10cqw;
    }
    .single .because {
      font-size: 5cqw;
    }
    .single .begin,
    .single .open-btn {
      min-height: 48px;
      font-size: 16px;
      padding: 0 22px;
    }
    .single .open-btn {
      display: inline-flex;
      align-items: center;
    }
    /* One page wide here, not two: the cover's cqw sizes double. */
    .single .cover-art {
      padding: 10cqw 8cqw 9cqw 10cqw;
    }
    .single .cover-art h3 {
      font-size: 5.6cqw;
    }
    .single .cover-art .date {
      font-size: max(14px, 2.6cqw);
    }
    .single .cover-art .names {
      margin-top: 5cqw;
      font-size: 4.6cqw;
    }
    .single .cover-stack img:nth-child(1) {
      right: 2cqw;
      width: 34cqw;
      height: 30cqw;
    }
    .single .cover-stack img:nth-child(2) {
      right: 20cqw;
      width: 36cqw;
      height: 42cqw;
    }
    .single .cover-stack img:nth-child(3) {
      right: 4cqw;
      width: 30cqw;
      height: 34cqw;
    }
    .single .cover-foot p {
      font-size: max(17px, 4cqw);
    }
    .single .cover-foot .mark {
      font-size: max(17px, 3.6cqw);
    }
    .single .open-btn {
      left: 10cqw;
      bottom: 17cqw;
    }
    .scrub {
      flex-wrap: wrap;
      justify-content: center;
    }
    .rail {
      order: -1;
      flex-basis: 100%;
    }
    /* Each stop shares the rail's width (about 40 x 44 on a 390 phone)
       rather than shrinking to its 9px diamond. */
    .rail button {
      flex: 1 1 0;
      min-width: 0;
      font-size: 0;
    }
    .rail button[aria-current="true"] {
      font-size: 14px;
    }
  }
`;

function CoverPage({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="cover-art">
      <h3>Moments &amp; Memories</h3>
      <span className="date">1952 - still being written</span>
      <span className="names">The Hartleys</span>
      <div className="cover-stack" aria-hidden="true">
        <img src="/mission/01-640.webp" alt="" loading="lazy" />
        <img src="/mission/H02-640.webp" alt="" loading="lazy" />
        <img src="/mission/H04-640.webp" alt="" loading="lazy" />
      </div>
      <div className="cover-foot">
        <p>Family is everything to us.</p>
        <span className="mark">A Story</span>
      </div>
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
  );
}

function Endpaper() {
  return <div className="endpaper" aria-hidden="true" />;
}

function TitlePage() {
  return (
    <div className="title-page">
      <span className="a-mark" aria-hidden="true" />
      <small>Moments &amp; Memories</small>
      <h3>The Hartley Family</h3>
      <span className="years">1952 - still being written</span>
      <span className="orn" />
      <span className="for">For</span>
      <p className="ded">Walt &amp; Ruth</p>
      <p className="why">Who sat on the porch steps and told every story twice.</p>
    </div>
  );
}

const CHAPTER = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];

function PhotoPage({ e, n }: { e: Entry; n: number }) {
  return (
    <div className="photo-page">
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
      <p className="folio">{n * 2 + 6}</p>
    </div>
  );
}

function TextPage({ e, n }: { e: Entry; n: number }) {
  return (
    <div className="text-page">
      <p className="chapter">
        Chapter {CHAPTER[n]} · {e.date}
      </p>
      <h3 className="title">{e.title}</h3>
      <span className="rule" />
      <p className="words">{e.words}</p>
      <p className="by">{e.by}</p>
      <blockquote className="also">
        <p>“{e.also.quote}”</p>
        <cite>{e.also.name}</cite>
      </blockquote>
      <p className="folio">{n * 2 + 7}</p>
    </div>
  );
}

function EndLeft() {
  return (
    <div className="end-page">
      <div className="sheet">
        {PAGES.map((s) => (
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
      <h3>
        The story <em>keeps going.</em>
      </h3>
      <p className="because">The family adds the next page.</p>
      <a className="begin" href={START_HREF} onClick={(e) => e.stopPropagation()}>
        {START_LABEL} <ArrowIcon />
      </a>
    </div>
  );
}

/** Right-hand page of spread s (the front of leaf s), and left-hand page (the back of leaf s-1). */
function RightPage({ s, onOpen }: { s: number; onOpen?: () => void }) {
  if (s === 0) return <CoverPage onOpen={onOpen} />;
  if (s === 1) return <TitlePage />;
  if (s === LAST) return <EndRight />;
  return <TextPage e={PAGES[s - 2]} n={s - 2} />;
}
function LeftPage({ s }: { s: number }) {
  if (s === 1) return <Endpaper />;
  if (s === LAST) return <EndLeft />;
  if (s >= 2) return <PhotoPage e={PAGES[s - 2]} n={s - 2} />;
  return null;
}

export default function FamilyBook() {
  const [spread, setSpread] = useState(() => (reduced() ? 1 : 0));
  const [moving, setMoving] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const stageRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  /* The scroll-driven lift of the cover (2026-10-16): the tween, and whether
     scroll is driving it right now (then the cover's transition is off). */
  const lift = useRef<gsap.core.Tween | null>(null);
  const [lifting, setLifting] = useState(false);
  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (to: number, byHand = true) => {
    if (byHand) touched.current = true;
    const next = Math.max(0, Math.min(LAST, to));
    if (next === spread) return;
    // Once the book has been opened by anyone, the cover stops answering to
    // scroll; closed again by hand, it closes flat.
    if (spread === 0 && lift.current) {
      const targets = lift.current.targets();
      lift.current.scrollTrigger?.kill();
      lift.current.kill();
      lift.current = null;
      gsap.set(targets, { "--lift": "0deg" });
      setLifting(false);
    }
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

  const ref = useScene<HTMLElement>((root, { narrow }) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(".stage, .single", {
      y: 70,
      opacity: 0,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: ".book-wrap", start: "top 85%", once: true },
    });
    /*
     * The cover lifts - up to twenty-two degrees, toward the reader - as the
     * closed book rises into view, so the reader's scroll is the hand on the
     * cover and the book is already stirring before it opens itself. The
     * opening (the observer above, or "Open the book") takes over from
     * wherever the lift has got to. Narrow screens show one spread with no
     * leaves to lift, and reduced motion starts the book open.
     */
    const cover = root.querySelector<HTMLElement>(".cover-leaf");
    if (cover && !narrow) {
      lift.current = gsap.fromTo(
        cover,
        { "--lift": "0deg" },
        {
          "--lift": "-22deg",
          ease: "none",
          scrollTrigger: {
            trigger: ".stage",
            start: "top 92%",
            end: "top 32%",
            scrub: 0.5,
            onToggle: (self) => setLifting(self.isActive),
          },
        },
      );
    }
    return () => {
      lift.current = null;
    };
  });

  const label = LABELS[spread];
  const stageClass = [
    "stage",
    spread === 0 && "closed",
    spread === 0 && lifting && moving === null && "lifting",
    spread === LAST && "at-end",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Scene ref={ref} id="book" aria-labelledby="book-title">
      <Frame>
        <SplitHead>
          <Statement id="book-title" $size="xl">
            Seventy years, <em>still being written.</em>
          </Statement>
          <p className="lead">
            The Hartleys are a sample family. Each page is a memory one of them
            told on a call, with what someone else in the family remembers
            beside it. Turn the pages.
          </p>
        </SplitHead>

        <div className="book-wrap">
          {/* Wide: the book, with 3D page turns. */}
          <div ref={stageRef} className={stageClass}>
            <div
              className="book"
              tabIndex={0}
              role="group"
              aria-roledescription="book"
              aria-label={`The Hartley family's book, a sample - ${label}. Use the arrow keys to turn the page.`}
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
                      className={`leaf${j === 0 ? " cover-leaf" : ""}${turned ? " turned" : ""}`}
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
              <div className={spread === 1 ? "ep" : spread === LAST ? "flow" : undefined}>
                <LeftPage s={spread} />
              </div>
            )}
            <div className={spread > 0 ? "flow" : undefined}>
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
            One day it leaves the screen. Print it at home for free, or order
            a printed edition from {BOOK.from}.
          </p>
          <div className="links">
            {/* /samples is a page in public/, outside the router: a plain anchor. */}
            <TextAnchor href="/samples">
              Flip through three sample books <ArrowIcon />
            </TextAnchor>
            <TextLink to="/pricing#book">
              See book options <ArrowIcon />
            </TextLink>
          </div>
        </div>
      </Frame>
    </Scene>
  );
}

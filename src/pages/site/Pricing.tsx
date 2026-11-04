/**
 * Pricing — how the economics work, and nothing else.
 *
 * Every figure and allowance comes from `pricing.ts` (which mirrors the
 * app) and every destination from `checkout.ts`; the page only arranges
 * them. Choose a plan, and the one action at the bottom follows the choice
 * to checkout or — while checkout is unconfigured — to Start free.
 *
 * Until 2026-10-01 each plan also had an "Include the book" checkbox that
 * swapped its price for a bundle ($154, $319). The app never sold those: a
 * hardcover comes with every plan, and a member pays only the shipping
 * (pricing.ts, BOOK). The checkbox became a line saying what is included.
 *
 * Composition: the three annual/one-time plans side by side with the default
 * (Individual) set inside the gold plate; the two quiet options beneath; the
 * full side-by-side comparison table under them (Pass 11e); the
 * promise that the app stays yours given a section of its own, because it is
 * the argument that makes the price make sense; the book staged last.
 * Motion is limited to selection feedback — this is a page for deciding.
 *
 * 2026-10-16: the page opens with the same ladder as Home (kit/PriceLadder)
 * - the archive, the calls, the book - so the dollar and the founding place
 * are read as early access to the calls before the plans are compared.
 * (2026-11-02, spec D3: the trusted-person and letter lines left this page.)
 * The book section says what a printed book
 * is: Volume I.
 *
 * Premium pass (2026-11-02, design spec §4B): the opening is on the ivory
 * with a sample book beside the price card; the buying state is said once,
 * directly under the h1, with one gift line and one primary action after it
 * (chief log B3.1); then the plan cards (the kit's Card), what stays yours, the film
 * link, the comparison (one block per plan on a phone, one DOM), the book
 * editions as open columns, and the questions last.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import {
  FOREVER,
  FREE_TIER,
  OTHER_PLANS,
  PLANS,
  BOOK,
  BOOK_EDITIONS,
} from "../../lib/pricing";
import { checkoutFor, isCheckoutLive } from "../../lib/checkout";
import { START_HREF, START_LABEL } from "../../lib/app";
import { QUESTION_COUNT } from "../../lib/product";
import TodayNow from "./TodayNow";
import { WHO_HEARS_SHORT } from "../../lib/hears";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Card,
  Chapter,
  Frame,
  PrimaryAnchor,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import {
  color,
  display,
  font,
  measure,
  media,
  motion,
  radius,
  shadow,
  space,
  tracking,
  type,
} from "../../styles/theme";

const Plans = styled(Chapter)`
  padding-top: 0;
  .plans {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    align-items: stretch;
  }
  /* Each plan is the kit's Card (spec §3.4): paper on the ivory, a hairline,
     no shadow. Selection and the Recommended keyline sit on top of it. */
  .plan {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition:
      border-color ${motion.base},
      box-shadow ${motion.slow};
  }
  ${media.hover} {
    .plan:hover {
      border-color: ${color.primaryLineStrong};
    }
  }
  .plan.featured {
    border-color: color-mix(in srgb, ${color.gold} 80%, transparent);
    outline: 1px solid color-mix(in srgb, ${color.gold} 45%, transparent);
    outline-offset: 5px;
  }
  .plan.is-selected {
    border-color: ${color.primary};
    box-shadow: inset 0 0 0 1px ${color.primary};
  }
  .plan-top {
    display: flex;
    /* "Recommended" drops under the name at 150% text instead of past the
       card's edge (round 3, B4; scrollWidth 425 of 390). */
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .plan h2 {
    font: 400 ${display.md} / 1.1 ${font.display};
    color: ${color.primary};
  }
  .plan .tag {
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: ${tracking.eyebrowPremium};
    text-transform: uppercase;
    color: ${color.goldOnLight};
  }
  /* Round 3 fix 2 (item 4b): Express's "One time" labels its own "nothing
     renews" line, in the tag's type and the card's quiet ink (not the
     gold of "Recommended", which stays on the yearly plan). */
  .plan .tag.quiet {
    color: ${color.bodyMuted};
  }
  /* Round 3 fix 2 (items 4a, 4c): the Express card answers "can I buy it"
     and "what about after" itself, in the card's serif. */
  .plan .card-note {
    margin-top: 10px;
    font: 400 ${type.read} / 1.45 ${font.text};
    color: ${color.body};
  }
  .plan .card-note a {
    display: inline-block;
    padding-block: 11px;
    color: ${color.primary};
    font-weight: 500;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }
  .plan .card-note + .card-note {
    margin-top: 0;
  }
  .who {
    margin-top: 8px;
    font: 400 ${type.read} / 1.45 ${font.text};
    color: ${color.bodyMuted};
  }
  .price {
    margin: 28px 0 4px;
    font: 400 ${display.lg} / 1 ${font.display};
    color: ${color.primary};
    font-variant-numeric: tabular-nums lining-nums;
  }
  .period {
    font: 500 ${type.read} / 1.4 ${font.text};
    color: ${color.bodyMuted};
  }
  .meter {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid ${color.primaryLine};
    font: 600 ${type.ui} / 1.4 ${font.body};
    color: ${color.primary};
  }
  .meter-note {
    margin-top: 6px;
    font: italic 400 ${type.read} / 1.45 ${font.display};
    color: ${color.primaryMid};
  }
  ul {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
  }
  li {
    position: relative;
    padding: 6px 0 6px 22px;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.body};
  }
  li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 14px;
    width: 8px;
    height: 1px;
    background: ${color.accent};
  }
  .bundle {
    margin-top: auto;
    padding-top: 24px;
  }
  .bundle p {
    padding: 14px 0 0;
    border-top: 1px solid ${color.primaryLine};
    font: 500 ${type.read} / 1.45 ${font.text};
    color: ${color.primary};
  }
  .bundle small {
    display: block;
    margin-top: 4px;
    font: 400 ${type.note} / 1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .choose {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  /* The radio is invisible, so its card carries the shared ring (§3.3). */
  .plan:has(.choose:focus-visible),
  .other:has(.choose:focus-visible) {
    outline: 2px solid var(--ring, ${color.chocolate});
    outline-offset: 3px;
  }

  .others {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    &.solo {
      grid-template-columns: minmax(0, 1fr);
    }
    gap: clamp(16px, 2vw, 28px);
    margin-top: clamp(16px, 2vw, 28px);
  }
  .other {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 6px 24px;
    align-items: baseline;
    padding: 22px 28px;
    border: 1px solid ${color.primaryLine};
    cursor: pointer;
    transition: border-color ${motion.base};
  }
  .other.is-selected {
    border-color: ${color.primary};
    box-shadow: inset 0 0 0 1px ${color.primary};
  }
  .other b {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .other span {
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.bodyMuted};
  }

  .decide {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 32px;
    margin-top: clamp(28px, 3vw, 44px);
    padding: 18px 18px 18px 28px;
    background: ${color.night};
    color: ${color.ivory};
    box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.6);
    --action-bg: ${color.ivory};
    --action-ink: ${color.primary};
    --action-hover: ${color.paperPure};
    --focus: ${color.gold};
    --focus-halo: ${color.night};
  }
  /* Until a plan is chosen by hand the bar would only repeat the opening's
     two actions, so it waits (spec §4B screen target). */
  .decide:not(.float) {
    display: none;
  }
  .decide.float {
    position: sticky;
    bottom: 16px;
  }
  .decide strong {
    display: block;
    font: 600 ${type.ui} / 1.3 ${font.body};
  }
  .decide small {
    font: 400 ${type.read} / 1.4 ${font.text};
    color: ${color.onDarkMuted};
  }
  .decide-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 24px;
  }
  .all-plans {
    margin-top: 18px;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    .plans {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  /* On a phone the card keeps its price, allowance, features and book; the
     allowance note, which the comparison table repeats word for word, stays
     in the table (spec §4B screen target). */
  ${media.sm} {
    .plans {
      gap: ${space.md};
    }
    .price {
      margin-top: ${space.md};
    }
    .meter {
      margin-top: ${space.md};
      padding-top: ${space.sm};
    }
    .meter-note {
      display: none;
    }
    li {
      padding-block: ${space.xxs};
    }
    li::before {
      top: calc(${space.xxs} + 0.75em);
    }
    .bundle {
      padding-top: ${space.md};
    }
    ul {
      margin-top: ${space.sm};
    }
    .other {
      padding: ${space.md} ${space.lg};
    }
  }
  ${media.md} {
    .others {
      grid-template-columns: minmax(0, 1fr);
    }
    .other {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  /* Phone-first fix 2 (item 11b): "What's included" is a fold on a phone
     only. From 641 px the summary is hidden and the details stay open, so
     the laptop card is as it was. */
  .included > summary {
    display: none;
  }
  @media (min-width: 641px) {
    .included::details-content {
      content-visibility: visible;
      display: contents;
    }
  }
  ${media.sm} {
    .included {
      margin-top: ${space.md};
      border-top: 1px solid ${color.primaryLine};
    }
    /* Above the card's invisible radio, so a tap opens the fold. */
    .included > summary {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${space.md};
      min-height: 44px;
      padding: ${space.xs} 0;
      cursor: pointer;
      list-style: none;
      color: ${color.primary};
      font: 600 ${type.ui} / 1.3 ${font.ui};
    }
    .included > summary::-webkit-details-marker {
      display: none;
    }
    .included > summary::after {
      content: "+";
      font: 400 ${type.lead} / 1 ${font.display};
      color: ${color.primaryMid};
    }
    .included[open] > summary::after {
      content: "−";
    }
    .included > summary:focus-visible {
      outline: 2px solid ${color.primary};
      outline-offset: 2px;
    }
    .included .meter {
      margin-top: ${space.xxs};
      padding-top: 0;
      border-top: 0;
    }
  }
`;

const INCLUDED_FOLD = "(max-width: 640px)";

/*
 * Compare every plan — the founder asked for a layout that makes the plans
 * comparable at a glance. One table, one row per question a buyer actually
 * asks, every cell from pricing.ts (nothing invented: Monthly is left out of
 * the grid because its allowances aren't itemised there). Clicking a column
 * head selects that plan, the same as the cards above.
 */
const Compare = styled.div`
  margin-top: ${space.xl};
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 64px;
    padding: 8px 0;
    border-top: 1px solid ${color.primaryLineStrong};
    border-bottom: 1px solid ${color.primaryLineStrong};
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary span {
    position: relative;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${color.primaryLineStrong};
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  summary span::before,
  summary span::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 14px;
    height: 1.5px;
    background: ${color.primary};
    transform: translate(-50%, -50%);
  }
  summary span::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  details[open] summary span {
    transform: rotate(45deg);
  }
  ${media.hover} {
    summary:hover span {
      border-color: ${color.primary};
    }
  }
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  details[open] .grid {
    margin-top: 28px;
  }
  .grid {
    border-radius: ${radius.lg};
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
    overflow-x: auto;
  }
  table {
    width: 100%;
    min-width: 860px;
    border-collapse: separate;
    border-spacing: 0;
  }
  th,
  td {
    padding: 16px 18px;
    border-bottom: 1px solid ${color.primaryLine};
    text-align: left;
    vertical-align: top;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.body};
  }
  tbody tr:last-child > * {
    border-bottom: 0;
  }
  tbody th {
    width: 20%;
    font: 600 ${type.label} / 1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  thead th {
    padding: 22px 18px 18px;
    vertical-align: bottom;
  }
  thead button {
    all: unset;
    box-sizing: border-box;
    display: grid;
    gap: 6px;
    width: 100%;
    cursor: pointer;
  }
  thead button b {
    font: 600 ${type.ui} / 1.3 ${font.body};
    color: ${color.primary};
  }
  thead button span {
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.primary};
  }
  thead button small {
    font: 500 ${type.label} / 1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .sel {
    background: color-mix(in srgb, ${color.gold} 14%, ${color.paperPure});
  }
  thead .sel {
    border-radius: 14px 14px 0 0;
    box-shadow: inset 0 3px 0 ${color.accent};
  }
  td strong {
    display: block;
    font: 600 ${type.ui} / 1.4 ${font.body};
    color: ${color.primary};
  }
  /*
   * A drawn tick, matching the comparison table's. It was a Unicode "✓" in a
   * ::before, which matches no icon anywhere else on the site and renders
   * differently on every platform.
   */
  .yes {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .yes svg {
    width: 15px;
    height: 15px;
    flex: none;
    color: ${color.teal};
  }
  /* From 641px the question column stays put while the plans scroll. */
  @media (min-width: 641px) {
    tbody th,
    thead th:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
      background: ${color.paperPure};
    }
  }
  /* To 640px (spec §4B, S12): the same table, one block per plan - its
     name and price, then each row as "question: answer" (the question from
     the cell's data-label). The cells are reordered by plan with CSS
     (--o); there is no second copy of the table. */
  ${media.sm} {
    .grid {
      overflow: visible;
      border-radius: 0;
      background: none;
      box-shadow: none;
    }
    table {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      min-width: 0;
    }
    thead,
    tbody,
    tr {
      display: contents;
    }
    thead th:first-child,
    tbody th {
      display: none;
    }
    thead th {
      order: var(--o);
      margin-top: ${space.lg};
      padding: ${space.md} 0 ${space.xs};
      border-bottom: 1px solid ${color.primaryLineStrong};
      border-radius: 0;
    }
    thead th:nth-child(2) {
      margin-top: 0;
    }
    td {
      order: var(--o);
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      gap: ${space.md};
      padding: ${space.sm} 0;
    }
    td::before {
      content: attr(data-label);
      font: 600 ${type.label} / 1.4 ${font.ui};
      color: ${color.bodyMuted};
    }
    tbody tr:last-child > td {
      border-bottom: 1px solid ${color.primaryLine};
    }
    .sel,
    thead .sel {
      background: none;
      box-shadow: none;
    }
  }
`;

const Forever = styled(Chapter)`
  .kept {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(28px, 5vw, 80px);
  }
  .kept li {
    padding: 20px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.primary};
  }
  /* The film link (spec §2.1): one line under what stays yours. */
  .film {
    margin-top: ${space.xl};
  }
  main[data-premium] & .film {
    max-inline-size: ${measure.lead};
  }
  ${media.md} {
    .kept {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    .kept li {
      padding: ${space.xs} 0;
    }
  }
`;

/* The practical questions, last (spec §4B), with the two context links that
   replace the old "More" menu. */
const Asked = styled.section`
  margin-top: ${space.xxl};
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 ${space.xl};
    margin-top: ${space.lg};
  }
  main[data-premium] & .links {
    max-inline-size: ${measure.lead};
  }
  /* The two links wrap onto two lines on a phone: 8px between them
     (taste rule 20; round 3, B4 fix pass 2). */
  main[data-premium] & .links {
    row-gap: 8px;
  }
  details {
    border-top: 1px solid ${color.primaryLineStrong};
    border-bottom: 1px solid ${color.primaryLineStrong};
    align-self: start;
  }
  summary {
    min-height: 64px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font: 500 ${type.read} / 1.4 ${font.text};
    color: ${color.primary};
  }
  details p {
    /* 28px above the answer, so a link in its first line ("Book a demo")
       keeps 8px clear of the question's 64px row above at 1440 too, where
       the reading line is 36px (round 3 fix, taste rule 20). */
    padding: 28px 0 20px;
    font: 400 ${type.read} / 1.65 ${font.text};
    color: ${color.body};
  }
  main[data-premium] & details p a:not([class]) {
    padding-block: 0 26px;
  }
  /* The two questions side by side across the width, not a half column. */
  .questions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(28px, 5vw, 80px);
  }
  ${media.sm} {
    margin-top: ${space.xl};
  }
  ${media.md} {
    .questions {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* The teal volume on sand, lit from behind — teal on chocolate was muddy. */
const Book = styled(Chapter)`
  background:
    radial-gradient(
      ellipse 45% 60% at 28% 55%,
      ${color.paperPure} 0%,
      transparent 70%
    ),
    ${color.sand};
  .book {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(36px, 7vw, 130px);
    align-items: center;
  }
  .book img {
    width: min(100%, 460px);
    height: auto;
    justify-self: center;
    transform: rotate(-2deg);
    box-shadow:
      0 2px 3px rgba(42, 31, 24, 0.25),
      0 40px 60px -30px rgba(42, 31, 24, 0.55);
  }
  /* Scoped under .book so the .book p body rule below cannot shrink it. */
  .book .book-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 16px;
    max-width: none;
    margin: 28px 0 10px;
    font: 400 ${display.lg} / 1 ${font.display};
    color: ${color.primary};
  }
  .book .book-price span {
    font: 400 ${type.read} / 1.4 ${font.text};
    color: ${color.bodyMuted};
  }
  .book p {
    font: 400 ${type.read} / 1.65 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }
  .book p + p {
    margin-top: 12px;
  }
  /* Round 3 fix 1 (item 9, Maya, Denise, Tuan): the six editions fold
     into one closed row; the prices inside are pricing.ts BOOK_EDITIONS,
     unchanged. */
  .editions-fold {
    margin-top: ${space.xl};
    border-top: 1px solid ${color.primaryLine};
    border-bottom: 1px solid ${color.primaryLine};
  }
  .editions-fold > summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${space.md};
    min-height: 56px;
    padding-block: ${space.sm};
    cursor: pointer;
    list-style: none;
    font: 600 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .editions-fold > summary::-webkit-details-marker {
    display: none;
  }
  .editions-fold > summary::after {
    content: "+";
    flex: none;
    font: 400 1.5rem / 1 ${font.ui};
    color: ${color.accentText};
  }
  .editions-fold[open] > summary::after {
    content: "−";
  }
  .editions-fold[open] {
    padding-bottom: ${space.lg};
  }
  .editions-fold:focus-within > summary:focus-visible {
    outline: 2px solid var(--ring, ${color.chocolate});
    outline-offset: 3px;
  }
  .editions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 24px);
    margin: ${space.xxl} 0 0;
    padding: 0;
    list-style: none;
  }
  /* Open columns with a hairline top, not boxes (spec §3.4, S23). */
  .editions li {
    display: flex;
    flex-direction: column;
    padding: ${space.lg} 0 0;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .editions .badge {
    font: 600 ${type.label} / 1.2 ${font.body};
    letter-spacing: 0.01em;
    color: ${color.accentText};
    min-height: 1.2em;
  }
  .editions h3 {
    margin-top: 12px;
    font: 400 ${display.md} / 1.15 ${font.display};
    color: ${color.primary};
  }
  .editions .cost {
    margin-top: 10px;
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.primary};
  }
  .editions .cost small {
    display: block;
    margin-top: ${space.xs};
    font: 400 ${type.label} / 1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .editions .tag {
    margin-top: 10px;
    font: italic 400 ${type.read} / 1.45 ${font.display};
    color: ${color.primaryMid};
  }
  .editions ul {
    flex: 1;
    display: grid;
    gap: 8px;
    align-content: start;
    margin: 16px 0 0;
    padding: 0;
    list-style: none;
  }
  .editions ul li {
    padding: 0 0 0 16px;
    border-top: 0;
    position: relative;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.body};
  }
  .editions ul li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 7px;
    height: 1px;
    background: ${color.accent};
  }
  .editions .when {
    margin-top: 16px;
    font: 500 ${type.label} / 1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  /* One full-width line under the editions (it sat alone on a half row). */
  .members {
    margin-top: clamp(24px, 3vw, 36px);
    padding-top: 20px;
    border-top: 1px solid ${color.primaryLineStrong};
    font: 400 ${type.read} / 1.6 ${font.text};
    color: ${color.body};
  }
  ${media.lg} {
    .editions {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  /* Two columns on a phone, so every price shows without a scroller (S24). */
  ${media.sm} {
    .editions {
      gap: ${space.xl} ${space.md};
      margin-top: ${space.xl};
    }
    .editions li {
      padding-top: ${space.md};
    }
    .editions ul {
      gap: ${space.xxs};
    }
    .editions .when {
      margin-top: ${space.xs};
    }
    /* Each card already names its book and that you pay only the shipping,
       so the summary line under the editions is for wider screens. */
    .members {
      display: none;
    }
    .editions h3 {
      margin-top: ${space.xs};
      font: 500 ${type.read} / 1.3 ${font.text};
    }
    /* The tagline is a mood line; on a phone the list under it says what
       the edition is (spec §4B screen target). */
    .editions .tag {
      display: none;
    }
    .editions ul li {
      font-size: ${type.note};
    }
  }
  ${media.md} {
    .book {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  /* On a phone the opening already shows a sample book; the editions
     carry this section (spec §4B screen target). */
  ${media.sm} {
    .book img {
      display: none;
    }
  }
`;

/*
 * The hero's object (juries 1 #6, 4 #10): what A Story costs, as one printed
 * price card lying on the cloth - the archive, the calls, the book - so the
 * empty right half of the opening holds the real thing. It is the summary;
 * the plan cards below carry the detail, and nothing else on the page
 * repeats it.
 */
/* Premium pass (spec §4B): the opening is on the ivory, so the sheet is a
   step lighter with a hairline, not a shadow; a sample book's cover sits
   beside it (above it on a phone) as the page's real object. */
const HeroObject = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.3fr) minmax(0, 1fr);
  gap: ${space.xl};
  align-items: center;
  /* The sample book's cover with its caption (round 3, supervisor: taste
     rule 12 wants a real object in the first screen; the caption is what
     the stray thumbnail lacked). The caption is set in the print caption's
     own hand, kit.styles.ts figcaption. */
  .cover {
    margin: 0;
  }
  .cover img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: ${radius.sm};
    box-shadow: ${shadow.md};
  }
  .after {
    grid-column: 1 / -1;
    display: grid;
    justify-items: start;
    gap: ${space.xs};
  }
  .after p {
    margin: 0;
    max-width: 60ch;
    font: 400 ${type.note} / 1.55 ${font.ui};
    color: var(--muted);
  }
  .after .care-link {
    display: inline-block;
    padding-block: 11px;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 3px;
  }
  .cover figcaption {
    margin-top: 12px;
    font: 500 clamp(19px, 1.2rem + 0.2vw, 24px) / 1.15 ${font.script};
    color: ${color.primary};
    text-align: center;
    text-wrap: balance;
  }
  .cover figcaption a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.14em;
  }
  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
    gap: ${space.lg};
    /* On a phone the cover and its caption share one short row above the
       sheet, so the object stays inside the first screen. */
    .cover {
      display: grid;
      grid-template-columns: 96px minmax(0, 1fr);
      align-items: center;
      column-gap: ${space.md};
    }
    .cover figcaption {
      margin-top: 0;
      text-align: left;
    }
  }
  /* Phone-first fix 1 (item 6, Maya #6): at 640 px and below the first
     screen is the h1, the lead, the price card and the care and
     organizations link, with no leftovers. The small Ledger cover stays
     from 641 px (and at 1440); the film stays at /how-it-works#film. */
  ${media.sm} {
    .cover,
    .film-link {
      display: none;
    }
  }
`;

const Sheet = styled.div`
  position: relative;
  color: ${color.primary};
  background: ${color.paperPure};
  border: 1px solid ${color.primaryLine};
  &::before {
    content: "";
    position: absolute;
    inset: clamp(8px, 0.8vw, 14px);
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  .cols {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .cols li {
    padding: clamp(26px, 2.6vw, 44px) clamp(22px, 2.6vw, 48px);
  }
  .cols li + li {
    border-left: 1px solid ${color.primaryLine};
  }
  .k {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  .p {
    margin-top: 12px;
    font: 500 ${display.lg} / 1 ${font.display};
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums lining-nums;
  }
  .p small {
    margin-left: 8px;
    font: 400 ${type.note} / 1.3 ${font.text};
    letter-spacing: 0;
    color: ${color.bodyMuted};
  }
  .l {
    margin-top: 12px;
    max-width: 30ch;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.body};
  }
  /* The sheet's foot (round 3, supervisor): who hears the recordings
     (lib/hears.ts), the privacy link and the currency, one quiet line under
     the three columns, so the hero note above stays one line. */
  .foot {
    margin: 0;
    padding: ${space.md} clamp(22px, 2.6vw, 48px);
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.note} / 1.55 ${font.ui};
    color: ${color.bodyMuted};
  }
  .foot a {
    color: ${color.primary};
    text-underline-offset: 3px;
  }
  ${media.md} {
    .cols {
      grid-template-columns: minmax(0, 1fr);
    }
    .cols li + li {
      border-left: 0;
      border-top: 1px solid ${color.primaryLine};
    }
    .cols li {
      padding-block: 22px;
    }
  }
  /* On a phone each column is one compact row: the name and the figure on
     one line, the sentence under them. */
  ${media.sm} {
    .cols li {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: baseline;
      column-gap: ${space.md};
      padding: ${space.md} ${space.lg};
    }
    .p {
      margin-top: 0;
      font-size: ${display.md};
    }
    .l {
      grid-column: 1 / -1;
      margin-top: ${space.xs};
      font-size: ${type.note};
    }
    .foot {
      padding: ${space.md} ${space.lg};
    }
  }
`;

/* The opening's words (chief log B3.1): the status line and the gift line
   share the lead, each on its own line; the gift line is a step quieter.
   The film is a text link beside the one primary action. */
const HeroWords = styled(PhonePairs)`
  .opening-lead .status,
  .opening-lead .gift {
    display: block;
  }
  .opening-lead .status a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
    /* The link sits inside a span, so the page states its own 44px hit
       area (measured 26px at 390; taste rule 20, round 3 fix). */
    padding-block: 13px;
  }
  .opening-lead .gift {
    /* Its link and the status line's keep their 44px hit areas 8px apart. */
    margin-top: 32px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .opening-lead .gift a {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
    padding-block: 13px;
  }
  /* Round 3 fix 1 (item 9): on a phone the price card comes before the
     sample cover, and its row for the calls (Express, $79, one time, nothing
     renews) comes first, so Express is in the first screen. Visual order
     only (taste rule 19); the DOM is unchanged. */
  ${media.sm} {
    .opening-object .cover {
      order: 2;
    }
    .opening-object .after {
      order: 3;
    }
    .opening-object .cols > li:nth-child(2) {
      order: -1;
      border-top: 0;
    }
    .opening-object .cols > li:first-child {
      border-top: 1px solid ${color.primaryLine};
    }
  }
  ${media.sm} {
    .film-link {
      flex: 0 1 auto !important;
    }
  }
`;

/*
 * Round 3 (B2, Maya and Tuan): the first screen carried six figures ($0,
 * $19.99, $119, $79, $39 and the $1). It now carries two: the $1 in the
 * status line and Express, the one-time plan, which is the figure the
 * subscription-wary reader is looking for. The monthly and yearly plans
 * are named, not priced, until the cards. Every figure is still read from
 * pricing.ts (Express: price, period; relatives free: PLANS[0].features[2]).
 */
function PriceCard() {
  const express = PLANS.find((p) => p.id === "express")!;
  const [once, days] = express.period.split(" · ");
  return (
    <Sheet>
      <ul className="cols" aria-label="What A Story costs">
        <li>
          <p className="k">The archive</p>
          <p className="p">Free</p>
          <p className="l">
            For as long as you like, and for every relative you invite to read
            and add.
          </p>
        </li>
        <li>
          <p className="k">The calls</p>
          <p className="p">
            {express.price}
            <small>
              {once}, {days}
            </small>
          </p>
          <p className="l">
            {express.name}: nothing renews. Or a plan by the month or the
            year, side by side below.
          </p>
        </li>
        <li>
          <p className="k">The book</p>
          <p className="p">Free</p>
          <p className="l">
            To print at home, every page. Printed editions are below.
          </p>
        </li>
      </ul>
      <p className="foot wide">
        {WHO_HEARS_SHORT} <TextLink to="/privacy">Our privacy promises</TextLink>
        {" · "}Prices in US dollars.
      </p>
    </Sheet>
  );
}

/* The hero's object: a real sample book's cover ("The Ledger", one of the
   three books on /samples) beside the price card, with its caption (round
   3: the thumbnail without one read as a stray, Maya). An existing asset;
   /samples is a page in public/, outside the router, so a plain anchor. */
function HeroPrice() {
  return (
    <HeroObject>
      <figure className="cover">
        <img
          src="/book-objects/sample-raymond-720.webp"
          srcSet="/book-objects/sample-raymond-360.webp 360w, /book-objects/sample-raymond-720.webp 720w"
          sizes="(max-width: 860px) 96px, 22vw"
          width={720}
          height={720}
          alt="The cover of a sample A Story book, The Ledger, for Raymond and Elena"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Round 3 fix 2 (item 5, Maya #10): no caption; the sample
            books are linked lower on the page. */}
      </figure>
      <PriceCard />
      {/* Round 3 fix 2 (item 5, Maya #4): the today note, the film and the
          organizations' door moved here from under the opening's one
          button, so the first screen is one action, one link, then the
          prices. Words unchanged. */}
      <div className="after">
        <p>
          {/* Phone-first plan (supervisor review): TODAY_NOTE left this
              line; the opening's status line and the TodayNow block say it. */}
          <Link to="/care-communities" className="care-link">
            Care communities and organizations{" "}→
          </Link>
        </p>
        <TextLink to="/how-it-works#film" className="film-link">
          Watch the film · 49 s
        </TextLink>
      </div>
    </HeroObject>
  );
}

const individual = PLANS.find((p) => p.id === "individual")!;
const family = PLANS.find((p) => p.id === "family")!;
const express = PLANS.find((p) => p.id === "express")!;
/** The gift line's "one time", from pricing.ts ("one time · 30 days"). No price:
    the first phone screen shows at most two (chief log B3.1), and the plan
    cards below give it. */
const expressOnce = express.period.split(" · ")[0];
const free = OTHER_PLANS.find((p) => p.id === "free")!;
/* Round 3 (B2, Maya): the one-time plan comes first on the page, so the
   person who fears renewals meets it before the yearly plans. Individual
   keeps its "Recommended" tag and its place in the middle. pricing.ts and
   its order are untouched. */
const PLAN_ORDER = [express, individual, family];

/** Columns of the comparison, in reading order: from nothing paid to the most shared. */
const COLS = [
  {
    id: "free",
    name: "Free",
    price: free.price,
    period: "for as long as you like",
  },
  {
    id: "express",
    name: express.name,
    price: express.price,
    period: express.period,
  },
  {
    id: "individual",
    name: individual.name,
    price: individual.price,
    period: `${individual.period} · ${individual.monthlyEquivalent}`,
  },
  {
    id: "family",
    name: family.name,
    price: family.price,
    period: `${family.period} · ${family.monthlyEquivalent}`,
  },
];

/** The tick in the comparison grid — one stroke weight, like the arrow. */
function YesTick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12.5l4.6 4.6L19.5 6.8" />
    </svg>
  );
}

/** Rows: each cell is [strong line, detail]; `yes` rows carry the tick. */
const ROWS: { label: string; cells: [string, string?][]; yes?: boolean }[] = [
  {
    label: "Who it’s for",
    cells: [
      ["Writing in your own words"],
      [express.who],
      [individual.who],
      [family.who],
    ],
  },
  {
    label: "Guided calls",
    cells: [
      ["One ten-minute conversation", "To begin, on us"],
      [express.meter, express.meterNote],
      [individual.meter, individual.meterNote],
      [family.meter, family.meterNote],
    ],
  },
  {
    label: "Questions",
    cells: [
      [FREE_TIER.includes[1]],
      [`All ${QUESTION_COUNT}, every chapter`],
      [`All ${QUESTION_COUNT}, every chapter`],
      [`All ${QUESTION_COUNT}, every chapter`],
    ],
  },
  {
    label: "Writing",
    cells: [["Unlimited"], ["Unlimited"], ["Unlimited"], ["Unlimited"]],
    yes: true,
  },
  {
    label: "Family reading & adding",
    cells: [
      ["Unlimited, free"],
      ["Unlimited, free"],
      ["Unlimited, free"],
      ["Unlimited, free"],
    ],
    yes: true,
  },
  {
    label: "Photos",
    cells: [
      [FREE_TIER.includes[4]],
      ["Unlimited"],
      ["Unlimited"],
      ["Unlimited"],
    ],
  },
  {
    label: "The printed book",
    cells: [
      ["Print at home, free", `Printed editions from ${BOOK.from}`],
      ["Classic Hardcover included", "One with the pass · you pay shipping"],
      ["Classic Hardcover included", "One every year · you pay shipping"],
      ["Classic Hardcover included", "One a year for each storyteller"],
    ],
  },
  {
    label: "Digital Edition",
    cells: [
      [BOOK_EDITIONS[1].price, "Print-ready, for any print shop"],
      ["Included"],
      ["Included"],
      ["Included"],
    ],
  },
  {
    label: "Renews",
    cells: [
      ["Never - it’s free"],
      ["Never - one time"],
      ["Yearly"],
      ["Yearly"],
    ],
  },
];

export default function Pricing() {
  const [selected, setPlan] = useState("individual");
  /* The decision bar floats only once a plan has been chosen by hand: before
     that it sat over the plan cards on a laptop and hid their prices. */
  const [chosen, setChosen] = useState(false);
  const setSelected = (id: string) => {
    setPlan(id);
    setChosen(true);
  };
  const selectedId = selected;
  const name =
    PLANS.find((x) => x.id === selected)?.name ??
    OTHER_PLANS.find((x) => x.id === selected)?.label ??
    selected;
  const plans = useReveals<HTMLElement>();
  const forever = useReveals<HTMLElement>();
  const book = useReveals<HTMLElement>();
  /* Phone-first fix 2 (item 11b, Maya #3): on a phone each card's
     allowance and features fold under "What's included". The page ships
     them open (prerendered, and readable without script); after hydration
     a phone folds them, and leaving the phone width opens them again,
     because from 641 px the summary is hidden. */
  const cards = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia(INCLUDED_FOLD);
    const folds = () =>
      cards.current?.querySelectorAll<HTMLDetailsElement>("details.included") ?? [];
    if (mq.matches) for (const d of folds()) d.open = false;
    const unfold = (e: MediaQueryListEvent) => {
      if (!e.matches) for (const d of folds()) d.open = true;
    };
    mq.addEventListener("change", unfold);
    return () => mq.removeEventListener("change", unfold);
  }, []);

  return (
    <>
      <EditorialSeo
        title="A Story pricing - plans, family participation and books"
        path="/pricing"
        description="Compare Individual, Family, Express, Monthly and Free: the call minutes, which plans include a hardcover, and what stays yours whatever you choose."
      />
      {/* Group B round 2 (chief log B3.1): on a phone the first screen says
          the buying state right under the h1, then one gift line, then one
          primary action, before any price card. */}
      <HeroWords>
        <PageOpening
          variant="wide"
          ground="ivory"
          title={
            <>
              Free for the family. Plans for the <em>calls.</em>
            </>
          }
          lead={
            <>
              {/* Phone-first plan task 4: the family's side is what is free,
                  not the way in. Sources: pricing.ts START.lead (no card;
                  inviting, writing and reading never cost extra; the calls
                  ring in the A Story iPhone app, in a private beta),
                  faqData.ts "no fee per relative", plan :16 (by invite). */}
              <span className="status">
                Relatives you invite read and add free, with no card. The
                calls ring in the A Story iPhone app, by invite in a private
                beta, and aren’t on sale yet.
              </span>
              {/* Round 3 fix 1 (item 9): the Express line goes to its card
                  (#express), the first card in the DOM (PLAN_ORDER). */}
              <span className="gift">
                Giving it, or wary of renewals?{" "}
                <a href="#express">
                  {express.name} is {expressOnce}, and nothing renews.
                </a>
              </span>
            </>
          }
          /* Round 3 fix 2 (item 5): one action here. The film link, the
             today note and the organizations' door (fix 1, item 9) sit
             under the price strip (HeroPrice). */
          actions={
            <PrimaryAnchor href={START_HREF}>
              {START_LABEL} <ArrowIcon />
            </PrimaryAnchor>
          }
          object={<HeroPrice />}
        />
      </HeroWords>

      <Plans ref={plans} $ground="ivory" aria-label="Plans">
        <Frame>
          <div
            ref={cards}
            className="plans"
            role="radiogroup"
            aria-label="Choose your preferred plan"
            data-rise
          >
            {PLAN_ORDER.map((p) => (
              <Card
                as="article"
                $ground="ivory"
                key={p.id}
                id={p.id === "express" ? "express" : undefined}
                className={`plan ${p.featured ? "featured" : ""} ${selected === p.id ? "is-selected" : ""}`}
                onClick={() => setSelected(p.id)}
              >
                <input
                  className="choose"
                  type="radio"
                  name="preferred-plan"
                  checked={selected === p.id}
                  onChange={() => setSelected(p.id)}
                  aria-label={`Select ${p.name}, ${p.price} ${p.period}`}
                />
                <div className="plan-top">
                  <h2>{p.name}</h2>
                  {p.featured && <span className="tag">Recommended</span>}
                  {/* Round 3 fix 2 (item 4b): labels the "one time ·
                      nothing renews" line (pricing.ts express.period).
                      Not a recommendation. */}
                  {p.id === "express" && (
                    <span className="tag quiet">One time</span>
                  )}
                </div>
                <p className="who">{p.who}</p>
                <p className="price">{p.price}</p>
                <p className="period">
                  {p.period}
                  {p.monthlyEquivalent && ` · ${p.monthlyEquivalent}`}
                </p>
                {/* Round 3 fix 2 (items 4a, 4c, Maya #4-#6), Express only.
                    Phone-first fix 2 (item 11a, Maya #3), in the positive
                    and as one price story:
                      "Whatever you choose, it stays yours."  the #yours
                        section below (the archive stays with or without a
                        plan, orgQuestions.ts ORG_GROUP "How long is it
                        kept?", privacy.tsx section 9)
                      "Prices for when the calls go on sale; today it is by
                        invite."  the status line above ("by invite in a
                        private beta, and aren’t on sale yet"); no date.
                    Nothing about leftover minutes (blocked on Daniel). */}
                {p.id === "express" && (
                  <>
                    <p className="card-note">
                      <a href="#yours">Whatever you choose, it stays yours.</a>
                    </p>
                    {!isCheckoutLive(p.id) && (
                      <p className="card-note">
                        Prices for when the calls go on sale; today it is by
                        invite.
                      </p>
                    )}
                  </>
                )}
                <details className="included" open>
                  <summary>What’s included</summary>
                  <p className="meter">{p.meter}</p>
                  <p className="meter-note">{p.meterNote}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </details>
                <div className="bundle">
                  <p>
                    {p.book}
                    <small>
                      Plus the Digital Edition · you pay only the shipping
                    </small>
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="others solo">
            {OTHER_PLANS.filter((p) => p.id !== "free").map((p) => (
              <div
                key={p.id}
                className={`other ${selected === p.id ? "is-selected" : ""}`}
                onClick={() => setSelected(p.id)}
              >
                <input
                  className="choose"
                  type="radio"
                  name="preferred-plan"
                  style={{ position: "absolute", inset: 0, opacity: 0 }}
                  checked={selected === p.id}
                  onChange={() => setSelected(p.id)}
                  aria-label={`Select ${p.label}, ${p.price}`}
                />
                <b>
                  {p.label} · {p.price}
                </b>
                <span>{p.sub}. Billed monthly.</span>
              </div>
            ))}
          </div>

          <div className={`decide${chosen ? " float" : ""}`} aria-live="polite">
            <div>
              <strong>{name}</strong>
              {/* The buying state is said once on this page (spec §4B, S2),
                  in the opening under the h1, so a paid plan that cannot be
                  bought yet gets no second line here. */}
              {selectedId === "free" ? (
                <small>
                  No card. The family’s side: reading, writing and adding, in
                  any browser.
                </small>
              ) : isCheckoutLive(selectedId) ? (
                <small>Continue with your selected plan.</small>
              ) : null}
            </div>
            <div className="decide-actions">
              {/* One primary action on this page (lib/app.ts START_*).
                  Plans that cannot be bought yet show it too. */}
              {isCheckoutLive(selectedId) ? (
                <PrimaryAnchor href={checkoutFor(selectedId)}>
                  Choose {name} <ArrowIcon />
                </PrimaryAnchor>
              ) : (
                <PrimaryAnchor href={START_HREF}>
                  {START_LABEL} <ArrowIcon />
                </PrimaryAnchor>
              )}
            </div>
          </div>
        </Frame>
      </Plans>

      {/* Phone-first plan task 4: what works now, what comes by invite. */}
      <TodayNow action={false} />

      {/* What stays yours sits right after the cards (benchmarks-convert
          §2.5), then the film link. The heading stays "Stop paying, and it
          is still yours." by chief ruling (CHIEF-LOG B3), over the spec
          §4B:477 rename. */}
      <Forever
        ref={forever}
        $ground="paper"
        id="yours"
        aria-labelledby="forever-title"
        style={{ scrollMarginTop: 80 }}
      >
        <Frame>
          <SplitHead>
            <Statement id="forever-title" $size="lg" data-lines>
              Stop paying, and it is still <em>yours.</em>
            </Statement>
          </SplitHead>
          <ul className="kept" data-rise>
            {FOREVER.kept.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
          <p className="film">
            <TextLink to="/how-it-works#film">
              Not sure yet? Watch the 49-second film
            </TextLink>
          </p>
          <Compare>
            <details>
              <summary>
                <h2 id="compare-title">Compare every plan, side by side</h2>
                <span aria-hidden="true" />
              </summary>
              <div
                className="grid"
                tabIndex={0}
                role="region"
                aria-label="Plan comparison, scrollable"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="sr-only">Plan</span>
                      </th>
                      {COLS.map((c, ci) => (
                        <th
                          key={c.id}
                          scope="col"
                          className={selected === c.id ? "sel" : undefined}
                          style={{ ["--o" as string]: (ci + 1) * 100 }}
                        >
                          <button
                            type="button"
                            onClick={() => setSelected(c.id)}
                            aria-pressed={selected === c.id}
                          >
                            <b>{c.name}</b>
                            <span>{c.price}</span>
                            <small>{c.period}</small>
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r, ri) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        {r.cells.map(([main, sub], i) => (
                          <td
                            key={i}
                            className={
                              selected === COLS[i].id ? "sel" : undefined
                            }
                            data-label={r.label}
                            style={{ ["--o" as string]: (i + 1) * 100 + ri + 1 }}
                          >
                            <div>
                              <strong className={r.yes ? "yes" : undefined}>
                                {r.yes && <YesTick />}
                                {main}
                              </strong>
                              {sub && <span>{sub}</span>}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </Compare>
        </Frame>
      </Forever>

      <Book ref={book} $ground="sand" id="book" aria-labelledby="book-title">
        <Frame className="book">
          {/* The cover of a real sample book (the /samples page), not the
              product mock-up whose cover still read "Family name". */}
          <img
            src="/book-objects/sample-carolyn-720.webp"
            srcSet="/book-objects/sample-carolyn-360.webp 360w, /book-objects/sample-carolyn-720.webp 720w"
            sizes="(max-width: 640px) 56vw, (max-width: 860px) 92vw, 460px"
            width={720}
            height={720}
            alt="The cover of a sample A Story book, Moments & Memories, with family photographs on navy linen"
            loading="lazy"
          />
          <div>
            <Statement id="book-title" $size="lg" data-lines>
              Six ways to hold the <em>book.</em>
            </Statement>
            <p>
              From a PDF you print at the library to a linen Heirloom in its
              box, or an editor of ours doing all of it. {BOOK.pages}.
            </p>
            <p>
              {/* /samples is a page in public/, outside the router: a plain anchor. */}
              <TextAnchor href="/samples">
                Flip through three sample books
              </TextAnchor>
            </p>
          </div>
        </Frame>
        <Frame>
          <details className="editions-fold">
          <summary>
            Printed books, from {BOOK_EDITIONS[0].price} to{" "}
            {BOOK_EDITIONS[BOOK_EDITIONS.length - 1].price}
          </summary>
          <ul className="editions" aria-label="Book editions">
            {BOOK_EDITIONS.map((e) => (
              <li key={e.id}>
                <span className="badge">{e.badge ?? ""}</span>
                <h3>{e.name}</h3>
                <p className="cost">
                  {e.price}
                  {e.extra && <small>{e.extra} each extra copy</small>}
                </p>
                <p className="tag">{e.tagline}</p>
                <ul>
                  {e.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="when">{e.delivery}</p>
              </li>
            ))}
          </ul>
          </details>
          <p className="members">
            <strong>With a plan:</strong> {BOOK.members} {BOOK.allowance}.
          </p>
          <Asked aria-label="Questions">
          <div className="questions">
            <details>
              <summary>What is included in Free?</summary>
              <p>
                {FREE_TIER.includes.join(". ")}. {FREE_TIER.excludes} are not
                included.
              </p>
            </details>
            <details>
              <summary>Care communities and organizations</summary>
              <p>
                Program pricing is quoted individually.{" "}
                <TextLink to="/organizations#book">Book a demo</TextLink> to
                talk about participants, consent and access.
              </p>
            </details>
          </div>
          <p className="links">
            <TextLink to="/compare">Compare A Story with others</TextLink>
            <TextLink to="/questions">All questions &amp; answers</TextLink>
          </p>
          </Asked>
        </Frame>
      </Book>
    </>
  );
}

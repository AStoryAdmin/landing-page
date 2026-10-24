/**
 * Pricing — how the economics work, and nothing else.
 *
 * Every figure and allowance comes from `pricing.ts` (which mirrors the
 * app) and every destination from `checkout.ts`; the page only arranges
 * them. Choose a plan, and the one action at the bottom follows the choice
 * to checkout or — while checkout is unconfigured — to /reserve with the
 * choice carried along.
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
 * are read as early access to the calls before the plans are compared. Two
 * lines the app already supports sit with "What stays yours": the trusted
 * person, and a letter for later. The book section says what a printed book
 * is: Volume I.
 */
import { useState } from "react";
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
import {
  OFFERS,
  RESERVE_DEADLINE_LABEL,
  reserveDiscountOpen,
} from "../../lib/founding";
import { QUESTION_COUNT } from "../../lib/product";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Chapter,
  Frame,
  PrimaryAnchor,
  SecondaryLink,
  SplitHead,
  Statement,
  TextAnchor,
  TextLink,
} from "./kit/kit.styles";
import {
  color,
  curve,
  display,
  font,
  media,
  motion,
  shadow,
} from "../../styles/theme";

const Plans = styled(Chapter)`
  padding-top: 0;
  .plans {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    align-items: stretch;
  }
  .plan {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: clamp(28px, 3vw, 44px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    cursor: pointer;
    transition:
      border-color ${motion.base},
      box-shadow ${motion.slow},
      transform ${motion.slow};
  }
  .plan:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 50px -32px rgba(42, 31, 24, 0.45);
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
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .plan h2 {
    font: 400 ${display.md} / 1.1 ${font.display};
    color: ${color.primary};
  }
  .plan .tag {
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.goldOnLight};
  }
  .who {
    margin-top: 8px;
    font: 400 16px/1.45 ${font.text};
    color: ${color.bodyMuted};
  }
  .price {
    margin: 28px 0 4px;
    font: 400 clamp(2.8rem, 2rem + 2vw, 4rem) / 1 ${font.display};
    color: ${color.primary};
    font-variant-numeric: lining-nums;
  }
  .period {
    font: 500 15px/1.4 ${font.text};
    color: ${color.bodyMuted};
  }
  .meter {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid ${color.primaryLine};
    font: 600 16px/1.4 ${font.body};
    color: ${color.primary};
  }
  .meter-note {
    margin-top: 6px;
    font: italic 400 16px/1.45 ${font.display};
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
    font: 400 15px/1.5 ${font.text};
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
    font: 500 15px/1.45 ${font.text};
    color: ${color.primary};
  }
  .bundle small {
    display: block;
    margin-top: 4px;
    font: 400 13.5px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .choose {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  .plan:has(.choose:focus-visible) {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
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
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .other span {
    font: 400 15px/1.5 ${font.text};
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
  .decide.float {
    position: sticky;
    bottom: 16px;
  }
  .decide strong {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
  }
  .decide small {
    font: 400 15px/1.4 ${font.text};
    color: ${color.onDarkMuted};
  }
  .decide-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 24px;
  }
  /* An inline link with a real underline, so a wrapped second line is
     underlined under its words, never struck through (jury 3, B1). */
  .decide .reserve {
    display: inline-block;
    padding: 12px 0;
    background: none;
    font: 500 15px/1.4 ${font.body};
    color: ${color.ivory};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: color-mix(in srgb, ${color.gold} 80%, transparent);
    text-underline-offset: 5px;
  }
  .decide .reserve svg {
    display: none;
  }
  .all-plans {
    margin-top: 18px;
    font: 400 15px/1.5 ${font.text};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    .plans {
      grid-template-columns: minmax(0, 1fr);
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
`;

/*
 * Compare every plan — the founder asked for a layout that makes the plans
 * comparable at a glance. One table, one row per question a buyer actually
 * asks, every cell from pricing.ts (nothing invented: Monthly is left out of
 * the grid because its allowances aren't itemised there). Clicking a column
 * head selects that plan, the same as the cards above.
 */
const Compare = styled.div`
  margin-top: clamp(40px, 5vw, 72px);
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
  @media (hover: hover) {
    summary:hover span {
      border-color: ${color.primary};
    }
  }
  summary:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 4px;
  }
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  details[open] .grid {
    margin-top: 28px;
  }
  .grid {
    border-radius: 20px;
    background: ${color.paperPure};
    box-shadow:
      inset 0 0 0 1px ${color.primaryLine},
      0 40px 80px -60px rgba(42, 31, 24, 0.45);
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
    font: 400 15px/1.5 ${font.text};
    color: ${color.body};
  }
  tbody tr:last-child > * {
    border-bottom: 0;
  }
  tbody th {
    width: 20%;
    font: 600 13px/1.4 ${font.body};
    letter-spacing: 0.06em;
    text-transform: uppercase;
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
    font: 400 24px/1.1 ${font.display};
    color: ${color.primary};
  }
  thead button span {
    font: 400 28px/1 ${font.display};
    color: ${color.primary};
  }
  thead button small {
    font: 500 13px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  thead button:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
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
    font: 600 15px/1.4 ${font.body};
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
  .note {
    margin-top: 12px;
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    tbody th {
      position: sticky;
      left: 0;
      z-index: 1;
      background: ${color.paperPure};
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
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
  }
  .stops {
    margin-top: clamp(40px, 5vw, 64px);
    font: 400 18px/1.7 ${font.text};
    color: ${color.body};
    max-width: 62ch;
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
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  summary:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  details p {
    padding-bottom: 20px;
    font: 400 17px/1.65 ${font.text};
    color: ${color.body};
  }
  /* The two questions side by side across the width, not a half column. */
  .questions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(28px, 5vw, 80px);
    margin-top: clamp(48px, 5vw, 88px);
  }
  ${media.md} {
    .kept,
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
    font: 400 17px/1.4 ${font.text};
    color: ${color.bodyMuted};
  }
  .book p {
    font: 400 18px/1.65 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }
  .book p + p {
    margin-top: 12px;
  }
  .editions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 24px);
    margin: clamp(48px, 6vw, 88px) 0 0;
    padding: 0;
    list-style: none;
  }
  .editions li {
    display: flex;
    flex-direction: column;
    padding: clamp(22px, 2.4vw, 32px);
    background: ${color.paperPure};
    box-shadow: 0 1px 2px rgba(42, 31, 24, 0.06);
  }
  .editions .badge {
    font: 600 13px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
    min-height: 11px;
  }
  .editions h3 {
    margin-top: 12px;
    font: 400 ${display.sm} / 1.15 ${font.display};
    color: ${color.primary};
  }
  .editions .cost {
    margin-top: 10px;
    font: 400 28px/1 ${font.display};
    color: ${color.primary};
  }
  .editions .cost small {
    margin-left: 8px;
    font: 400 14px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .editions .tag {
    margin-top: 10px;
    font: italic 400 17px/1.45 ${font.display};
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
    background: none;
    box-shadow: none;
    position: relative;
    font: 400 15px/1.5 ${font.text};
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
    font: 500 13px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  /* One full-width line under the editions (it sat alone on a half row). */
  .members {
    margin-top: clamp(24px, 3vw, 36px);
    padding-top: 20px;
    border-top: 1px solid ${color.primaryLineStrong};
    font: 400 17px/1.6 ${font.text};
    color: ${color.body};
  }
  ${media.lg} {
    .editions {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    .editions {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.md} {
    .book {
      grid-template-columns: minmax(0, 1fr);
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
const Sheet = styled.div`
  position: relative;
  color: ${color.primary};
  background: ${color.paperPure};
  box-shadow: ${shadow.lie};
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
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .p {
    margin-top: 12px;
    font: 500 clamp(2.6rem, 1.8rem + 2.2vw, 4.6rem) / 1 ${font.display};
    letter-spacing: -0.02em;
    font-variant-numeric: lining-nums;
  }
  .p small {
    margin-left: 8px;
    font: 400 clamp(1rem, 0.95rem + 0.2vw, 1.15rem) / 1.3 ${font.text};
    letter-spacing: 0;
    color: ${color.bodyMuted};
  }
  .l {
    margin-top: 12px;
    max-width: 30ch;
    font: 400 clamp(1.02rem, 0.98rem + 0.2vw, 1.2rem) / 1.5 ${font.text};
    color: ${color.body};
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 6px 28px;
    margin: 0 clamp(22px, 2.6vw, 48px);
    padding: 16px 0 clamp(22px, 2.2vw, 34px);
    border-top: 1px solid ${color.primaryLine};
    font: 400 15px/1.5 ${font.text};
    color: ${color.body};
  }
  /* A 44px target, the underline where it was (jury 2 R2 N3). */
  .foot a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0;
    font: 600 14px/1.3 ${font.ui};
    color: ${color.primary};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.gold} 80%, transparent);
    text-underline-offset: 5px;
    white-space: nowrap;
    transition: color 160ms ${curve.out};
  }
  @media (hover: hover) and (pointer: fine) {
    .foot a:hover {
      color: ${color.accentText};
    }
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
`;

/*
 * One opening price for the calls, the same as Home's close (fix round 3,
 * jury 1 R2 #9): "Calls from $19.99 a month". The yearly plan and Express
 * stay in view as the other ways in. Every figure is read from pricing.ts.
 */
const monthly = OTHER_PLANS.find((p) => p.id === "monthly")!;
/** "$19.99/mo" -> "$19.99" */
const monthlyPrice = monthly.price.replace(/\/mo$/, "");

function PriceCard() {
  const individual = PLANS.find((p) => p.id === "individual")!;
  const express = PLANS.find((p) => p.id === "express")!;
  return (
    <Sheet>
      <ul className="cols" aria-label="What A Story costs">
        <li>
          <p className="k">The archive</p>
          <p className="p">$0</p>
          <p className="l">
            Free for as long as you like. Read, write and invite the whole
            family.
          </p>
        </li>
        <li>
          <p className="k">The calls, from</p>
          <p className="p">
            {monthlyPrice}
            <small>a month</small>
          </p>
          <p className="l">
            Or {individual.price} a year for one storyteller, or{" "}
            {express.price} once for 30 days. Every plan is side by side below.
          </p>
        </li>
        <li>
          <p className="k">The book</p>
          <p className="p">Free</p>
          <p className="l">
            To print at home, every page. Printed editions from {BOOK.from}.
          </p>
        </li>
      </ul>
      <p className="foot">
        <span>
          Plans aren’t on sale yet. {OFFERS.reserve.price} holds your place in
          line
          {reserveDiscountOpen()
            ? `, and ${OFFERS.reserve.discount}% off your first year if you reserve by ${RESERVE_DEADLINE_LABEL}.`
            : "."}
        </span>
        <Link to="/reserve">How reserving works</Link>
      </p>
    </Sheet>
  );
}

const individual = PLANS.find((p) => p.id === "individual")!;
const family = PLANS.find((p) => p.id === "family")!;
const express = PLANS.find((p) => p.id === "express")!;
const free = OTHER_PLANS.find((p) => p.id === "free")!;

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

  return (
    <>
      <EditorialSeo
        title="A Story pricing - plans, family participation and books"
        path="/pricing"
        description="Compare Individual, Family, Express, Monthly and Free: the call minutes, which plans include a hardcover, and what stays yours whatever you choose."
      />
      <PhonePairs>
        <PageOpening
          variant="wide"
          title={
            <>
              Free to start. Pay for <em>calls.</em>
            </>
          }
          lead={`No card and no time limit. Calls from ${monthlyPrice} a month, and inviting family, writing and reading never cost extra.`}
          actions={
            <>
              <PrimaryAnchor href={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryAnchor>
              <SecondaryLink to="/reserve">
                Reserve for {OFFERS.reserve.price}
              </SecondaryLink>
            </>
          }
          note="Prices in US dollars. The calls ring in the A Story iPhone app, in a private beta."
          object={<PriceCard />}
        />
      </PhonePairs>

      <Plans ref={plans} $ground="ivory" aria-label="Plans">
        <Frame>
          <div
            className="plans"
            role="radiogroup"
            aria-label="Choose your preferred plan"
          >
            {PLANS.map((p) => (
              <article
                key={p.id}
                data-rise
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
                </div>
                <p className="who">{p.who}</p>
                <p className="price">{p.price}</p>
                <p className="period">
                  {p.period}
                  {p.monthlyEquivalent && ` · ${p.monthlyEquivalent}`}
                </p>
                <p className="meter">{p.meter}</p>
                <p className="meter-note">{p.meterNote}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="bundle">
                  <p>
                    {p.book}
                    <small>
                      Plus the Digital Edition · you pay only the shipping
                    </small>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="others solo">
            {OTHER_PLANS.filter((p) => p.id !== "free").map((p) => (
              <div
                key={p.id}
                className={`other ${selected === p.id ? "is-selected" : ""}`}
                onClick={() => setSelected(p.id)}
                data-rise
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
                      {COLS.map((c) => (
                        <th
                          key={c.id}
                          scope="col"
                          className={selected === c.id ? "sel" : undefined}
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
                    {ROWS.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        {r.cells.map(([main, sub], i) => (
                          <td
                            key={i}
                            className={
                              selected === COLS[i].id ? "sel" : undefined
                            }
                          >
                            <strong className={r.yes ? "yes" : undefined}>
                              {r.yes && <YesTick />}
                              {main}
                            </strong>
                            {sub && <span>{sub}</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </Compare>

          <div className={`decide${chosen ? " float" : ""}`} aria-live="polite">
            <div>
              <strong>{name}</strong>
              <small>
                {selectedId === "free"
                  ? "No card. Make your account in your browser and begin today."
                  : isCheckoutLive(selectedId)
                    ? "Continue with your selected plan."
                    : "Plans open at launch."}
              </small>
            </div>
            <div className="decide-actions">
              {/* One primary action on this page: Start free. Plans that
                  cannot be bought yet offer the $1 reservation beside it, the
                  only place on the site that still does. */}
              {isCheckoutLive(selectedId) ? (
                <PrimaryAnchor href={checkoutFor(selectedId)}>
                  Choose {name} <ArrowIcon />
                </PrimaryAnchor>
              ) : (
                <PrimaryAnchor href={START_HREF}>
                  {START_LABEL} <ArrowIcon />
                </PrimaryAnchor>
              )}
              {selectedId !== "free" && !isCheckoutLive(selectedId) && (
                <Link to={checkoutFor(selectedId)} className="reserve">
                  {reserveDiscountOpen()
                    ? `Or reserve for ${OFFERS.reserve.price}, ${OFFERS.reserve.discount}% off`
                    : `Or reserve for ${OFFERS.reserve.price}`}
                </Link>
              )}
            </div>
          </div>
        </Frame>
      </Plans>

      <Forever ref={forever} $ground="paper" aria-labelledby="forever-title">
        <Frame>
          <SplitHead>
            <Statement id="forever-title" $size="lg" data-lines>
              Stop paying, and it is still <em>yours.</em>
            </Statement>
          </SplitHead>
          <ul className="kept">
            {FOREVER.kept.map((k) => (
              <li key={k} data-rise>
                {k}
              </li>
            ))}
            <li data-rise>
              Name a trusted person, who receives what you wrote if you can’t
            </li>
            <li data-rise>
              Write a letter to one person, delivered on the date you choose
            </li>
          </ul>

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
        </Frame>
      </Forever>

      <Book ref={book} $ground="sand" id="book" aria-labelledby="book-title">
        <Frame className="book">
          {/* The cover of a real sample book (the /samples page), not the
              product mock-up whose cover still read "Family name". */}
          <img
            data-rise
            data-drift="5"
            src="/book-objects/sample-carolyn-720.webp"
            srcSet="/book-objects/sample-carolyn-360.webp 360w, /book-objects/sample-carolyn-720.webp 720w"
            sizes="(max-width: 860px) 92vw, 460px"
            width={720}
            height={720}
            alt="The cover of a sample A Story book, Moments & Memories, with family photographs on navy linen"
            loading="lazy"
          />
          <div>
            <Statement id="book-title" $size="lg" data-lines>
              Six ways to hold the <em>book.</em>
            </Statement>
            <p data-rise>
              From a PDF you print at the library to a linen Heirloom in its
              box, or an editor of ours doing all of it. {BOOK.pages}.
            </p>
            <p data-rise>
              {/* /samples is a page in public/, outside the router: a plain anchor. */}
              <TextAnchor href="/samples">
                Flip through three sample books <ArrowIcon />
              </TextAnchor>
            </p>
          </div>
        </Frame>
        <Frame>
          <ul className="editions" aria-label="Book editions">
            {BOOK_EDITIONS.map((e) => (
              <li key={e.id} data-rise>
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
          <p className="members" data-rise>
            <strong>With a plan:</strong> {BOOK.members} {BOOK.allowance}.
            Ordering opens soon.
          </p>
        </Frame>
      </Book>
    </>
  );
}

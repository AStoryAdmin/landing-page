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
 */
import { useState } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import {
  FOREVER,
  FREE_TIER,
  OTHER_PLANS,
  PLANS,
  BOOK,
  BOOK_EDITIONS,
  START,
} from "../../lib/pricing";
import { anyCheckoutLive, buyLabel, checkoutFor } from "../../lib/checkout";
import { CHAPTER_COUNT, QUESTION_COUNT } from "../../lib/product";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  PrimaryAnchor,
  SplitHead,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

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
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.goldOnLight};
  }
  .who {
    margin-top: 8px;
    font: 400 16px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .price {
    margin: 28px 0 4px;
    font: 400 clamp(2.8rem, 2rem + 2vw, 4rem) / 1 ${font.display};
    color: ${color.primary};
    font-variant-numeric: lining-nums;
  }
  .period {
    font: 500 15px/1.4 ${font.body};
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
    font: 400 15px/1.5 ${font.body};
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
    font: 500 15px/1.45 ${font.body};
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
    font: 400 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }

  .decide {
    position: sticky;
    bottom: 16px;
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
  .decide strong {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
  }
  .decide small {
    font: 400 14px/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .all-plans {
    margin-top: 18px;
    font: 400 15px/1.5 ${font.body};
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
  margin-top: clamp(56px, 7vw, 104px);
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  h2 + p {
    margin: 10px 0 28px;
    font: 400 16px/1.6 ${font.body};
    color: ${color.bodyMuted};
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
    font: 400 15px/1.5 ${font.body};
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
    font: 400 18px/1.7 ${font.body};
    color: ${color.body};
    max-width: 62ch;
  }
  details {
    border-top: 1px solid ${color.primaryLineStrong};
    max-width: 760px;
  }
  details:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
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
    font: 400 17px/1.65 ${font.body};
    color: ${color.body};
  }
  .questions {
    margin-top: clamp(64px, 7vw, 110px);
  }
  ${media.md} {
    .kept {
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
    width: min(100%, 420px);
    height: auto;
    justify-self: center;
    filter: drop-shadow(0 40px 36px rgba(42, 31, 24, 0.35));
  }
  .book-price {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin: 28px 0 10px;
    font: 400 ${display.lg} / 1 ${font.display};
    color: ${color.primary};
  }
  .book-price span {
    font: 400 17px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .book p {
    font: 400 18px/1.65 ${font.body};
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
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.2em;
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
    font: 400 15px/1.5 ${font.body};
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
  .members {
    margin-top: clamp(28px, 3vw, 40px);
    padding: 20px 24px;
    border-left: 2px solid ${color.gold};
    background: ${color.paperPure};
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 72ch;
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
      ["No calls", FREE_TIER.includes[0]],
      [express.meter, express.meterNote],
      [individual.meter, individual.meterNote],
      [family.meter, family.meterNote],
    ],
  },
  {
    label: "Questions",
    cells: [
      [FREE_TIER.includes[0]],
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
      [FREE_TIER.includes[3]],
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
  const [selected, setSelected] = useState("individual");
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
        description="Compare Individual, Family, Express, Monthly and Free. See call allowances, the printed book every plan includes, and what stays in your archive."
      />
      <PageOpening
        eyebrow="Pricing · USD"
        title={
          <>
            Everyone starts free. Only the <em>calls</em> are paid for.
          </>
        }
        lead={`${START.headline} - ${START.detail} Inviting family, writing and reading are never charged by the person.`}
      />

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
                  {p.featured && <span className="tag">Most families</span>}
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
                    <small>Plus the Digital Edition · you pay only the shipping</small>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="others">
            {OTHER_PLANS.map((p) => (
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
                <span>
                  {p.sub}.{" "}
                  {p.id === "free"
                    ? `${FREE_TIER.includes[3]}.`
                    : "Billed monthly."}
                </span>
              </div>
            ))}
          </div>

          <p className="all-plans">
            Every paid plan includes all {QUESTION_COUNT} questions across{" "}
            {CHAPTER_COUNT} chapters, unlimited writing and unlimited
            photographs.
          </p>

          <Compare aria-labelledby="compare-title">
            <h2 id="compare-title">Compare every plan</h2>
            <p>
              Monthly is {OTHER_PLANS[0].price} with no yearly commitment.
              Everything else is side by side below.
            </p>
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
            <p className="note">
              {START.headline}. {START.detail}
            </p>
          </Compare>

          <div className="decide" aria-live="polite">
            <div>
              <strong>{name}</strong>
              <small>
                {anyCheckoutLive()
                  ? "Continue with your selected plan."
                  : "Before launch: reserve for $1 by 30 November and hold 15% off this plan's first year, or start now as a founding family."}
              </small>
            </div>
            <PrimaryAnchor
              href={checkoutFor(selectedId)}
              aria-label={buyLabel(
                selectedId,
                `Choose ${name}`,
                `Reserve for $1 - ${name}`,
              )}
            >
              {buyLabel(selectedId, `Choose ${name}`)} <ArrowIcon />
            </PrimaryAnchor>
          </div>
        </Frame>
      </Plans>

      <Forever ref={forever} $ground="paper" aria-labelledby="forever-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>What stays yours</Eyebrow>
              <Statement id="forever-title" $size="xl" data-lines>
                The app is yours. It does not stop being <em>yours.</em>
              </Statement>
            </div>
          </SplitHead>
          <ul className="kept">
            {FOREVER.kept.map((k) => (
              <li key={k} data-rise>
                {k}
              </li>
            ))}
          </ul>
          <p className="stops" data-rise>
            {FOREVER.stops}
          </p>

          <div className="questions">
            <details>
              <summary>Is there a free trial?</summary>
              <p>
                No - there is a Free tier that never runs out. {START.detail}
              </p>
            </details>
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
                <TextLink to="/start?intent=demo">Talk with us</TextLink> about
                participants, consent and access.
              </p>
            </details>
          </div>
        </Frame>
      </Forever>

      <Book ref={book} $ground="sand" id="book" aria-labelledby="book-title">
        <Frame className="book">
          <img
            data-rise
            src="/book-objects/closed-1200.webp"
            srcSet="/book-objects/closed-640.webp 640w, /book-objects/closed-1200.webp 1200w"
            sizes="(max-width: 860px) 70vw, 420px"
            width={1200}
            height={1609}
            alt="The A Story hardcover book in its teal binding"
            loading="lazy"
          />
          <div>
            <Statement id="book-title" $size="lg" data-lines>
              Printed when a chapter is worth <em>holding.</em>
            </Statement>
            <p className="book-price" data-rise>
              Free <span>to print at home - or six ways to hold it</span>
            </p>
            <p data-rise>
              From a PDF you print at the library to a linen Heirloom in its
              box, or an editor of ours doing all of it. {BOOK.pages}.
            </p>
            <p data-rise>
              Choose the stories and photographs whenever you’re ready. The
              archive keeps growing afterwards, and the book can be printed
              again.
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
            <strong>With a plan:</strong> {BOOK.members}{" "}
            {BOOK.allowance}. Ordering opens soon.
          </p>
        </Frame>
      </Book>
    </>
  );
}

/**
 * Price and close (2026-10-23): one plain line about what it costs, the two
 * doors, and where to go next - then the footer. It replaces the price
 * ladder (which stays at the top of Pricing) and the closing Invitation, so
 * the home page says its price once and invites once.
 *
 * Every figure comes from lib/pricing.ts and lib/founding.ts, which mirror
 * the app and Stripe. Nothing here promises a book with a plan: which plans
 * include which edition is Pricing's to say, in full.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import { Frame, PrimaryLink, SecondaryLink } from "../kit/kit.styles";
import { useScene } from "../../../lib/scrollMotion";
import { arrive, lines } from "./motion";
import { color, font, media } from "../../../styles/theme";
import { START_HREF, START_LABEL } from "../../../lib/app";
import { OTHER_PLANS, PLANS, PRICES_PUBLIC } from "../../../lib/pricing";
import {
  OFFERS,
  RESERVE_DEADLINE_LABEL,
  reserveDiscountOpen,
} from "../../../lib/founding";

const individual = PLANS.find((p) => p.id === "individual")!;
const express = PLANS.find((p) => p.id === "express")!;
const monthly = OTHER_PLANS.find((p) => p.id === "monthly")!;
/** "$19.99/mo" -> "$19.99": the cheapest way in to the calls, stated as a month. */
const monthlyPrice = monthly.price.replace(/\/mo$/, "");

const NEXT = [
  {
    to: "/pricing",
    title: "Pricing",
    hint: "Every plan, and what each one includes.",
  },
  {
    to: "/how-it-works",
    title: "How it works",
    hint: "The call, the memory, the book.",
  },
  {
    to: "/our-story",
    title: "Our story",
    hint: "Built by Daniel Hoang Nguyen and Bao Vo.",
  },
];

const Section = styled.section`
  --ink: ${color.primary};
  --focus: ${color.accentText};
  position: relative;
  background: ${color.ivory};
  color: ${color.primary};
  padding: calc(clamp(72px, 8vw, 136px) * var(--sy)) 0;

  .close {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 140px);
    align-items: center;
  }
  h2 {
    margin: 0;
    font: 600 clamp(40px, 4.2vw, 92px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.primary};
    max-width: 21ch;
    text-wrap: balance;
  }
  h2 em {
    font-style: normal;
    color: ${color.accent};
  }
  .plain {
    margin: clamp(18px, 1.6vw, 28px) 0 0;
    max-width: 58ch;
    font: 400 clamp(17px, 1.2vw, 21px) / 1.5 ${font.text};
    color: ${color.body};
    text-wrap: pretty;
  }
  .doors {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 18px;
    margin-top: clamp(26px, 2.4vw, 40px);
  }
  /* Where to next: three ruled rows, a title, one line, an arrow. */
  .next {
    display: grid;
  }
  .next a {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 20px;
    min-height: 44px;
    padding: 18px 0;
    border-top: 1px solid ${color.primaryLineStrong};
    color: inherit;
    text-decoration: none;
  }
  .next a:last-child {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  .next b {
    display: block;
    font: 600 clamp(22px, 1.6vw, 30px) / 1.15 ${font.display};
    color: ${color.primary};
    transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .next small {
    display: block;
    margin-top: 4px;
    font: 400 14px / 1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .next svg {
    width: 18px;
    height: 18px;
    color: ${color.accentText};
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .next a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 4px;
  }
  @media (hover: hover) and (pointer: fine) {
    .next a:hover b {
      color: ${color.accent};
    }
    .next a:hover svg {
      transform: translateX(5px);
    }
  }
  .next a:active svg {
    transform: translateX(2px) scale(0.94);
  }

  ${media.md} {
    .close {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function Close() {
  const ref = useScene<HTMLElement>((root) => {
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".plain, .doors"), { delay: 0.2 });
    arrive(root.querySelectorAll(".next a"), {
      trigger: root.querySelector(".next"),
      delay: 0.3,
    });
  });

  return (
    <Section ref={ref} aria-labelledby="close-title">
      <Frame className="close">
        <div>
          <h2 id="close-title">
            {PRICES_PUBLIC ? (
              <>
                Start free. Calls from <em>{monthlyPrice} a month.</em>
              </>
            ) : (
              <>
                Start free. The calls, <em>at a founding price.</em>
              </>
            )}
          </h2>
          <p className="plain">
            Free is the family archive and writing, in your browser, with no
            card and no time limit. A plan adds the guided calls
            {PRICES_PUBLIC
              ? `: ${monthlyPrice} a month, ${individual.price} a year, or ${express.price} for 30 days. `
              : ` - monthly, yearly, or ${express.name} for 30 days, with founding prices by email before launch. `}
            They ring in the A Story app on your parent’s iPhone, in private
            beta.{" "}
            {reserveDiscountOpen()
              ? `A dollar holds your place in line and ${OFFERS.reserve.discount}% off your first year, if you reserve by ${RESERVE_DEADLINE_LABEL}. We email you when the calls open.`
              : `A dollar holds your place in line, and we email you when the calls open.`}
          </p>
          <div className="doors">
            <PrimaryLink to={START_HREF}>
              {START_LABEL} <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/reserve">
              Reserve for {OFFERS.reserve.price} <ArrowIcon />
            </SecondaryLink>
          </div>
        </div>
        <nav className="next" aria-label="Where to next">
          {NEXT.map((n) => (
            <Link key={n.to} to={n.to}>
              <span>
                <b>{n.title}</b>
                <small>{n.hint}</small>
              </span>
              <ArrowIcon />
            </Link>
          ))}
        </nav>
      </Frame>
    </Section>
  );
}

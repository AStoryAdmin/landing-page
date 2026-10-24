/**
 * The price ladder — what A Story costs, said once (2026-10-16).
 *
 * Until now the home page quoted a price in three places and in three
 * registers: "Reserve for $1" under the hero with a founding line beside it,
 * "Guided calls from $119 a year" closing "You do step one", and a night
 * section selling the $29 founding place with the dollar beside it. Read in
 * one scroll they looked like three products. There are three things, and
 * only one of them is paid for, so they are set down together, in three
 * columns, on Home and at the top of Pricing:
 *
 *   The archive   free, for everyone, forever - read, add, remember, invite.
 *   The calls     the guided phone conversations, from $119 a year. The
 *                 founding place ($29) and the reservation ($1) are explained
 *                 here as what they are: early access to the same calls, not
 *                 a different product.
 *   The book      print at home free; the printed editions and their prices.
 *
 * Every figure is from lib/pricing.ts and lib/founding.ts, which mirror the
 * app and Stripe; nothing is quoted here that is not there. One sentence
 * under the columns says what stays free.
 */
import styled from "styled-components";
import { BOOK, BOOK_EDITIONS, FREE_TIER, PLANS } from "../../../lib/pricing";
import { OFFERS, RESERVE_DEADLINE_LABEL } from "../../../lib/founding";
import { useFoundingStatus } from "./foundingStatus";
import { useReveals } from "./reveals";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  SecondaryLink,
  SplitHead,
  Statement,
  type Ground,
} from "./kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const individual = PLANS.find((p) => p.id === "individual")!;
const family = PLANS.find((p) => p.id === "family")!;
const express = PLANS.find((p) => p.id === "express")!;
/* Only counted now: the editions themselves are listed once, on Pricing's
   own editions grid (YC juries 1 #14 and 3 #15: prices said once). */
const printed = BOOK_EDITIONS.filter((e) => e.id !== "home");

const Section = styled(Chapter)`
  .ladder {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--line, ${color.primaryLineStrong});
  }
  .rung {
    display: flex;
    flex-direction: column;
    padding: calc(28px * var(--sy)) clamp(20px, 3vw, 48px) 0 0;
  }
  .rung + .rung {
    padding-left: clamp(20px, 3vw, 48px);
    border-left: 1px solid var(--line, ${color.primaryLine});
  }
  .k {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    font: 600 12px/1.4 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .k small {
    font: 500 13px/1.4 ${font.body};
    letter-spacing: 0;
    text-transform: none;
    color: var(--muted, ${color.bodyMuted});
  }
  h3 {
    margin-top: 14px;
    font: 600 ${display.md} / 1.1 ${font.display};
    letter-spacing: -0.005em;
    color: var(--ink, ${color.primary});
  }
  /* The figure, in the serif, with its unit beside it in the product voice. */
  .price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
    margin-top: 18px;
    font: 600 ${display.lg} / 1 ${font.display};
    letter-spacing: -0.01em;
    color: var(--ink, ${color.primary});
    font-variant-numeric: lining-nums;
  }
  /* The unit in the interface face, at its own spacing: inheriting the
     figure's tracking crushed "no card, no clock" (2026-10-23 review). */
  .price span {
    font: 400 15px/1.4 ${font.ui};
    letter-spacing: normal;
    color: var(--muted, ${color.bodyMuted});
  }
  .line {
    margin-top: 14px;
    font: 400 19px/1.5 ${font.text};
    color: var(--muted, ${color.body});
    max-width: 34ch;
  }
  /* One quiet line per rung pointing at the full detail below, instead of
     the old per-plan lists that said every price a second time. */
  .more {
    margin-top: 12px;
    font: 400 15px/1.5 ${font.body};
    color: var(--muted, ${color.bodyMuted});
    max-width: 40ch;
  }
  /* Before launch: the two early ways into the same calls, under a hairline. */
  .early {
    margin-top: auto;
    padding-top: 18px;
  }
  .early > div {
    padding-top: 16px;
    border-top: 1px solid var(--line, ${color.primaryLine});
  }
  .early p {
    font: 400 15px/1.5 ${font.body};
    color: var(--muted, ${color.body});
  }
  .early p + p {
    margin-top: 8px;
  }
  .early b {
    font-weight: 600;
    color: var(--ink, ${color.primary});
  }
  .stays {
    margin-top: calc(clamp(32px, 4vw, 56px) * var(--sy));
    padding-top: 22px;
    border-top: 1px solid var(--line, ${color.primaryLineStrong});
    font: 400 clamp(1.2rem, 1.1rem + 0.3vw, 1.45rem) / 1.45 ${font.text};
    color: var(--ink, ${color.primary});
    max-width: 60ch;
    text-wrap: pretty;
  }
  ${media.md} {
    .ladder {
      grid-template-columns: minmax(0, 1fr);
    }
    .rung {
      padding-right: 0;
      padding-bottom: calc(28px * var(--sy));
    }
    .rung + .rung {
      padding-left: 0;
      border-left: 0;
      border-top: 1px solid var(--line, ${color.primaryLine});
    }
    .early {
      margin-top: 0;
    }
  }
`;

/**
 * `title` is the section's statement (Home); Pricing opens with its own
 * title, so it passes none and the ladder starts at the columns. `onward`
 * adds the actions under the ladder - Home sends people to Reserve and to
 * the full comparison; Pricing has the plans straight underneath.
 */
export default function PriceLadder({
  ground = "paper",
  title = true,
  onward = true,
  early = false,
  id = "price-ladder",
}: {
  ground?: Ground;
  title?: boolean;
  onward?: boolean;
  /** The $1 reservation and the $29 founding place: on Pricing only (2026-10-18). */
  early?: boolean;
  id?: string;
}) {
  const reveal = useReveals<HTMLElement>();
  const { open: foundingOpen, line: foundingLine } = useFoundingStatus();
  const { reserve, founding } = OFFERS;

  return (
    <Section
      ref={reveal}
      $ground={ground}
      $tight={!title}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <Frame>
        {/* Without the visible title (on Pricing, under the page's h1) the
            section still needs its h2, or the rungs' h3s skip a level. */}
        {!title && (
          <h2 id={`${id}-title`} className="sr-only">
            What A Story costs
          </h2>
        )}
        {title && (
          <SplitHead>
            <div>
              <Eyebrow>What it costs</Eyebrow>
              <Statement id={`${id}-title`} $size="lg" data-lines>
                Three things. Only the <em>calls</em> are paid for.
              </Statement>
            </div>
            <Lead data-rise>
              The archive is free for everyone, for as long as you like. A
              plan adds A Story doing the asking. The book is yours to print
              either way.
            </Lead>
          </SplitHead>
        )}

        <ul className="ladder">
          <li className="rung" data-rise>
            <p className="k">
              The archive <small>everyone</small>
            </p>
            <h3>Free, for as long as you like.</h3>
            <p className="price">
              $0 <span>no card, no time limit</span>
            </p>
            <p className="line">
              Read, add what you remember, invite the family, keep it. The
              same archive on every plan, including this one.
            </p>
            <p className="more">
              {FREE_TIER.includes[0]}, then three guided questions a day.
            </p>
          </li>

          <li className="rung" data-rise>
            <p className="k">
              The calls <small>a plan</small>
            </p>
            <h3>A Story does the asking.</h3>
            <p className="price">
              {individual.price} <span>a year, one storyteller</span>
            </p>
            <p className="line">
              The guided calls, ringing in the A Story iPhone app, and the
              card and the transcript that come of each one.
            </p>
            <p className="more">
              {individual.name}, {family.name} and {express.name} are side by
              side below.
            </p>
            {early && (
            <div className="early">
              <div>
                {foundingOpen ? (
                  <>
                    <p>
                      <b>Plans are not sold on the web yet. Two early ways into the same calls.</b>
                    </p>
                    <p>
                      A founding family pays <b>{founding.price}</b> and
                      starts now, set up by hand, with {founding.discount}% off the
                      first year. Set up in the order families join;{" "}
                      {foundingLine}.
                    </p>
                    <p>
                      A reservation is <b>{reserve.price}</b>: a place in
                      line, and {reserve.discount}% off the first year if you
                      reserve by {RESERVE_DEADLINE_LABEL}.
                    </p>
                    <p>
                      Neither is a different product. Whatever you pay today
                      comes off that first year.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <b>Plans aren’t on sale yet.</b> The founding places are
                      filled. <b>{reserve.price}</b> still holds a place in line
                      and {reserve.discount}% off your first year if you
                      reserve by {RESERVE_DEADLINE_LABEL}, and the dollar comes
                      off that year. We email you when the calls open, in the
                      order families reserved.
                    </p>
                  </>
                )}
              </div>
            </div>
            )}
          </li>

          <li className="rung" data-rise>
            <p className="k">
              The book <small>when you want one</small>
            </p>
            <h3>Printed when it is worth holding.</h3>
            <p className="price">
              Free <span>to print at home, every page</span>
            </p>
            <p className="line">
              Printed editions from {BOOK.from}. Individual, Family and
              Express include a Classic Hardcover; you pay the shipping.
            </p>
            <p className="more">
              {printed.length + 1} editions, from free to done for you, are
              below.
            </p>
          </li>
        </ul>

        <p className="stays" data-rise>
          Reading, writing, adding what you remember, inviting the family and
          printing at home stay free; a plan buys one thing, the calls.
        </p>

        {onward && (
          <Actions data-rise>
            {/* Home's one primary action is in the hero and the closing
                invitation; here, only the way to the details. */}
            <SecondaryLink to="/pricing">Every plan, side by side</SecondaryLink>
          </Actions>
        )}
      </Frame>
    </Section>
  );
}

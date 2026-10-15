/**
 * The founding offer on the homepage. Added 2026-10-09 when the founding
 * places became one rolling group of twenty-five (lib/founding.ts).
 *
 * It sits after "The easiest way", where a visitor has just seen what the
 * app does for each person in a family, and asks the one question left:
 * do you want it now? The limit is the true one, counted live once it is
 * worth saying (foundingStatus.ts); there is no countdown and no date. The
 * dollar stays beside it for anyone who is not ready.
 *
 * Once the places are taken, or the date passes, it says so and offers the
 * dollar.
 *
 * Since 2026-10-14 the places are a new group for Hope College families,
 * until Wednesday 21 October, as applications: ten families are picked
 * and go free, the rest are refunded (lib/founding.ts, "Hope College").
 */
import styled from "styled-components";
import {
  FOUNDING_DEADLINE_DAY,
  FOUNDING_FOR,
  FOUNDING_PICK,
  FOUNDING_PLACES,
  FULL_PRICE,
  INCLUDES,
  OFFERS,
  foundingClosedLine,
} from "../../../lib/founding";
import { useReveals } from "../kit/reveals";
import { ArrowIcon } from "../kit/kit";
import { useFoundingStatus } from "../kit/foundingStatus";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryLink,
  SecondaryLink,
  Statement,
  onDarkActions,
} from "../kit/kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const Section = styled(Chapter)`
  ${onDarkActions};
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: clamp(36px, 5vw, 88px);
    align-items: center;
  }
  p.lead {
    margin-top: 22px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 46ch;
  }
  .acts {
    margin-top: clamp(28px, 3vw, 40px);
  }
  .card {
    color: ${color.ivory};
  }
  .price {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 6px 14px;
  }
  .price b {
    font: 400 ${display.xl} / 0.9 ${font.display};
    letter-spacing: -0.03em;
  }
  .price span {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  .then {
    margin-top: 14px;
    font: 400 16px/1.55 ${font.body};
    color: ${color.onDarkMuted};
  }
  .then s {
    color: ${color.onDarkFaint};
  }
  ul {
    display: grid;
    gap: 12px;
    margin: 24px 0 0;
    padding: 22px 0 0;
    border-top: 1px solid ${color.onDarkLine};
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: 14px 1fr;
    gap: 14px;
    font: 400 16px/1.5 ${font.body};
    color: ${color.onDarkMuted};
  }
  li::before {
    content: "";
    width: 7px;
    height: 7px;
    margin: 8px 0 0 3px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function FoundingBand() {
  const reveal = useReveals<HTMLElement>();
  const { open, line } = useFoundingStatus();
  const { founding, reserve } = OFFERS;

  return (
    <Section ref={reveal} $ground="night" aria-labelledby="founding-band-title">
      <Frame className="row">
        <div data-rise>
          <Eyebrow>Founding families · {FOUNDING_FOR.short} · {open ? line : foundingClosedLine()}</Eyebrow>
          {open ? (
            <>
              <Statement id="founding-band-title" $size="lg">
                {FOUNDING_FOR.families}: {FOUNDING_PLACES} places, <em>{FOUNDING_PICK} go free.</em>
              </Statement>
              <p className="lead">
                The first founding group is closed. For Hope's family weekend, {FOUNDING_PLACES}{" "}
                {FOUNDING_FOR.families} can put their name down for {founding.price} by {FOUNDING_DEADLINE_DAY}. We
                pick {FOUNDING_PICK} and set them up free, by hand, with one of us on the first call. Everyone else
                gets the {founding.price} back, in full.
              </p>
              <Actions className="acts">
                <PrimaryLink to="/reserve#founding">
                  Put my name down for {founding.price} <ArrowIcon />
                </PrimaryLink>
                <SecondaryLink to="/reserve">Or hold a place for {reserve.price}</SecondaryLink>
              </Actions>
            </>
          ) : (
            <>
              <Statement id="founding-band-title" $size="lg">
                The {FOUNDING_FOR.short} places <em>are closed.</em>
              </Statement>
              <p className="lead">
                Thank you. A dollar still holds your place for launch, and comes off your first year.
              </p>
              <Actions className="acts">
                <PrimaryLink to="/reserve">
                  Reserve for {reserve.price} <ArrowIcon />
                </PrimaryLink>
              </Actions>
            </>
          )}
        </div>
        {open && (
          <Plate className="card" data-rise>
            <p className="price">
              <b>{founding.price}</b>
              <span>once · {FOUNDING_FOR.families} · comes back to you either way</span>
            </p>
            <p className="then">
              Picked, your first year is free - <s>{FULL_PRICE.individual}</s> $0 - and the {founding.price} is
              refunded. Not picked, the {founding.price} is refunded too.
            </p>
            <ul>
              {INCLUDES.founding.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Plate>
        )}
      </Frame>
    </Section>
  );
}

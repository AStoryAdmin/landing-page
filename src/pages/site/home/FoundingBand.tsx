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
 * Once the twenty-five are taken it says so and offers the dollar.
 */
import styled from "styled-components";
import { FOUNDING_BALANCE, FOUNDING_PLACES, FULL_PRICE, INCLUDES, OFFERS } from "../../../lib/founding";
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
          <Eyebrow>Founding families · {open ? line : `all ${FOUNDING_PLACES} taken`}</Eyebrow>
          {open ? (
            <>
              <Statement id="founding-band-title" $size="lg">
                Twenty-five families start <em>now.</em>
              </Statement>
              <p className="lead">
                Before launch, we are setting A Story up by hand for {FOUNDING_PLACES} families, with one of us on
                your first call. No week to wait for: we write within a working day of you joining, and places go
                in the order families join.
              </p>
              <Actions className="acts">
                <PrimaryLink to="/reserve#founding">
                  Start now for {founding.price} <ArrowIcon />
                </PrimaryLink>
                <SecondaryLink to="/reserve">Or hold a place for {reserve.price}</SecondaryLink>
              </Actions>
            </>
          ) : (
            <>
              <Statement id="founding-band-title" $size="lg">
                The founding places <em>are taken.</em>
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
              <span>once · refundable until your first call</span>
            </p>
            <p className="then">
              Then half off your first year - <s>{FULL_PRICE.individual}</s> {founding.individual}, and the{" "}
              {founding.price} counts, so {FOUNDING_BALANCE.individual} more whenever you choose.
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

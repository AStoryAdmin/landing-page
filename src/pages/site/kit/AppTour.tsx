/**
 * A row of real app screens, each with a short label and one line. Added
 * 2026-10-09 to show what the app does now — group calls, the family tree,
 * a person's page, family codes, a relative telling their part, the writing
 * companion, memoir import — on the screens themselves rather than in prose.
 *
 * The screens in public/app are captured from the app (review-fixes
 * 21f0365, Expo web, the ?screenshot=1 harness and ?demo=1), 860px wide
 * with a band on top where the phone frame draws its status bar. Recapture
 * them when the app's screens change.
 *
 * Desktop shows the row; on a phone it becomes a sideways scroll, so four
 * phones never stack into four screens of scrolling.
 *
 * 2026-10-14 (Hallmark redesign): the screens are shown as themselves — a
 * rounded screen with a hairline, cropped to the top seventy per cent and
 * fading out — instead of inside a drawn phone. The drawn bezels were most of
 * the height of this row (four of the eleven phones on the home page) and
 * said nothing the screen did not; the crop keeps the text the same size at
 * about forty per cent less height.
 */
import styled from "styled-components";
import { color, display, font, media } from "../../../styles/theme";

export type TourStop = {
  /** public/app/<shot>.webp */
  shot: string;
  k: string;
  t: string;
  d: string;
  /** The screen's top is dark, so the status bar is drawn light. */
  dark?: boolean;
  scroll?: boolean;
};

const Row = styled.ul<{ $n: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $n }) => $n}, minmax(0, 1fr));
  gap: clamp(20px, 2.6vw, 40px);
  margin: clamp(40px, 5vw, 72px) 0 0;
  padding: 0;
  list-style: none;
  li {
    display: grid;
    align-content: start;
    justify-items: center;
    text-align: center;
  }
  .screen {
    width: min(250px, 100%);
    aspect-ratio: 860 / 1300;
    margin: 0;
    border-radius: 22px;
    overflow: hidden;
    background: ${color.paperPure};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 24px 40px -28px rgba(42, 31, 24, 0.5);
    mask-image: linear-gradient(#000 80%, transparent);
  }
  .screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  .k {
    margin-top: 22px;
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  h3 {
    margin-top: 10px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    letter-spacing: -0.012em;
    color: var(--ink, ${color.primary});
    text-wrap: balance;
  }
  p.d {
    margin-top: 8px;
    max-width: 30ch;
    font: 400 17px/1.55 ${font.text};
    color: var(--muted, ${color.bodyMuted});
  }
  ${media.md} {
    display: flex;
    gap: 20px;
    margin-inline: calc(-1 * var(--page-gutter, 16px));
    padding: 0 var(--page-gutter, 16px) 8px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    li {
      flex: 0 0 min(250px, 68vw);
      scroll-snap-align: center;
    }
  }
`;

export default function AppTour({ stops }: { stops: TourStop[] }) {
  return (
    /* Focusable and named: on a phone this row scrolls sideways, and a
       keyboard has to be able to reach it to scroll it. */
    <Row $n={stops.length} tabIndex={0} aria-label="Screens from the A Story app">
      {stops.map((s) => (
        <li key={s.shot} data-rise>
          <figure className="screen">
            <img
              src={`/app/${s.shot}.webp`}
              alt=""
              width={860}
              height={1300}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className="k">{s.k}</p>
          <h3>{s.t}</h3>
          <p className="d">{s.d}</p>
        </li>
      ))}
    </Row>
  );
}

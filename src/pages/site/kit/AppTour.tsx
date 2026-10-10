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
 */
import styled from "styled-components";
import { AppShot, Phone } from "../app/Phone";
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
  .k {
    margin-top: 22px;
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.2em;
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
    font: 400 15px/1.55 ${font.body};
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
    <Row $n={stops.length}>
      {stops.map((s) => (
        <li key={s.shot} data-rise>
          <Phone width="min(250px, 100%)" lightStatus={s.dark}>
            <AppShot name={s.shot} scroll={s.scroll} />
          </Phone>
          <p className="k">{s.k}</p>
          <h3>{s.t}</h3>
          <p className="d">{s.d}</p>
        </li>
      ))}
    </Row>
  );
}

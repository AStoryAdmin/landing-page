/**
 * The demo booking room (#book), shared by /organizations and
 * /care-communities. Added 2026-10-29.
 *
 * It used to live only on /organizations, so the care page sent its
 * readers to another page to book, and ended on the family close ("The
 * archive is free...") instead. Now each page books its demo where the
 * reader already is: the words and what happens next on the left, kept in
 * view, the form on a card on the right.
 *
 *   <DemoSection title={<>Thirty minutes, <em>with a founder.</em></>}
 *     kind="Senior living or care community" source="care:demo" />
 *
 * `aside` replaces the "what happens next" list when a page has its own
 * (the care page's "what we agree before anyone is called").
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import DemoBooking from "../DemoBooking";
import { DEMO_EMAIL } from "../../../lib/demoRequest";
import { Chapter, Frame, Plate, Statement, type Ground } from "./kit.styles";
import { color, display, font, media, type } from "../../../styles/theme";

const NEXT: [string, string][] = [
  ["You send this form.", "It goes to Daniel, our co-founder and CEO."],
  [
    "Daniel writes back.",
    "Within a working day, to confirm one of the times you picked.",
  ],
  ["Thirty minutes together.", "A live call, a real archive, and your questions."],
  [
    "Start small.",
    "A program can begin with one class, one floor or one team.",
  ],
];

const Book = styled(Chapter)`
  scroll-margin-top: 80px;
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: start;
  }
  .side {
    position: sticky;
    top: 112px;
  }
  /* Focused by script when a tile sends the reader here; not a control. */
  #book-title:focus {
    outline: none;
  }
  .side > p.lead {
    margin-top: 16px;
    max-width: 40ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .side ol,
  .side ul {
    display: grid;
    margin: clamp(30px, 3vw, 44px) 0 0;
    padding: 0;
    list-style: none;
  }
  .side li {
    padding: 16px 0;
    border-top: 1px solid var(--line);
  }
  .side b {
    display: block;
    font: 400 20px/1.3 ${font.display};
    color: var(--ink);
  }
  .side li span {
    display: block;
    margin-top: 4px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .side .write {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .side .write a {
    display: inline-block;
    padding: 10px 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  .card {
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.06),
      0 40px 80px -48px rgba(42, 31, 24, 0.45);
  }
  .card-head {
    margin-bottom: clamp(26px, 3vw, 36px);
    padding-bottom: clamp(20px, 2.4vw, 28px);
    border-bottom: 1px solid ${color.primaryLine};
  }
  .card-head small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .card-head h3 {
    margin-top: 10px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      position: static;
    }
  }
`;

export default function DemoSection({
  title,
  lead,
  aside,
  footer,
  kind = "",
  source,
  cardLabel = "A demo for your institution",
  cardTitle = "Tell us where you are, and when suits you.",
  ground = "ivory",
  rolePlaceholder,
  notePlaceholder,
}: {
  title: ReactNode;
  lead?: ReactNode;
  /** Replaces the "what happens next" list. */
  aside?: ReactNode;
  /** A line under the email address, such as a door to another page. */
  footer?: ReactNode;
  kind?: string;
  source?: string;
  cardLabel?: string;
  cardTitle?: string;
  ground?: Ground;
  rolePlaceholder?: string;
  notePlaceholder?: string;
}) {
  return (
    <Book $ground={ground} id="book" aria-labelledby="book-title">
      <Frame className="row">
        <div className="side" data-rise>
          <Statement id="book-title" $size="lg" tabIndex={-1}>
            {title}
          </Statement>
          {lead && <p className="lead">{lead}</p>}
          {aside ?? (
            <ol>
              {NEXT.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          )}
          <p className="write">
            Rather write? <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>
            {footer && (
              <>
                <br />
                {footer}
              </>
            )}
          </p>
        </div>
        <Plate className="card" data-rise>
          <div className="card-head">
            <small>{cardLabel}</small>
            <h3>{cardTitle}</h3>
          </div>
          <DemoBooking
            initialKind={kind}
            source={source}
            rolePlaceholder={rolePlaceholder}
            notePlaceholder={notePlaceholder}
          />
        </Plate>
      </Frame>
    </Book>
  );
}

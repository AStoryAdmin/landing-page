/**
 * Rooms for the two audience pages, Care communities and Your own story
 * (fix round 2, 2026-10-23). Until today both were the same five-section
 * template (kit/Audience.tsx): an ivory opening with a collage, a zigzag of
 * three photographs, a drawn phone with an old app screen, a night quote and
 * a checklist. Jury 1 (#5, #9, #10, #24) asked for each page to be its own
 * room on the cloth, with every photograph a cornered print at no more than
 * its own size. These are the pieces they shared; since fix round 3
 * (2026-10-24, jury 1 R2 #7) only Care uses them, and Your story closes on a
 * room of its own (the memory card over its print, on teal).
 *
 *   <RuledSteps steps={[[title, line], …]} />   ruled rows, no numerals
 *   <QuoteBand quote title steps ground flip />  one line to remember, beside three rows
 *   <BeginCard title body checklist action />   before you begin
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { useReveals } from "../kit/reveals";
import { Chapter, Frame } from "../kit/kit.styles";
import { color, display, font, media, type } from "../../../styles/theme";

const Steps = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 6px clamp(18px, 2.4vw, 40px);
    padding: clamp(16px, 1.8vw, 24px) 0;
    border-top: 1px solid var(--line);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  b {
    font: 500 ${display.sm} / 1.25 ${font.display};
    color: var(--ink);
  }
  span {
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, var(--muted));
  }
  ${media.sm} {
    li {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export function RuledSteps({ steps }: { steps: [string, string][] }) {
  return (
    <Steps>
      {steps.map(([b, t]) => (
        <li key={b} data-rise>
          <b>{b}</b>
          <span>{t}</span>
        </li>
      ))}
    </Steps>
  );
}

const Band = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(36px, 6vw, 140px);
    align-items: center;
  }
  blockquote {
    margin: 0;
    font: italic 400 ${display.xl} / 1.08 ${font.display};
    letter-spacing: -0.02em;
    color: var(--ink);
    max-width: 16ch;
    text-wrap: balance;
  }
  blockquote b {
    font-style: normal;
    font-weight: 500;
    color: var(--mark);
  }
  h2 {
    margin-bottom: clamp(16px, 2vw, 24px);
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label);
  }
  &[data-flip] blockquote {
    order: 2;
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    &[data-flip] blockquote {
      order: 0;
    }
  }
`;

/** One line to remember, on the cloth, beside how it works in three rows. */
export function QuoteBand({
  quote,
  title,
  steps,
  ground = "cloth",
  flip = false,
}: {
  quote: ReactNode;
  title: string;
  steps: [string, string][];
  /** Care stands on the cloth; Your story on the teal of the conversation. */
  ground?: "cloth" | "teal";
  /** The steps first, the line on the right. */
  flip?: boolean;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Band
      ref={ref}
      $ground={ground}
      data-flip={flip || undefined}
      aria-label={title}
    >
      <Frame className="row">
        <blockquote data-rise>{quote}</blockquote>
        <div>
          <h2>{title}</h2>
          <RuledSteps steps={steps} />
        </div>
      </Frame>
    </Band>
  );
}

function TickIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 12.5l4.6 4.6L19.5 6.8" />
    </svg>
  );
}

const Begin = styled(Chapter)`
  .card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(28px, 5vw, 80px);
    align-items: start;
  }
  h2 {
    font: 400 ${display.lg} / 1.08 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
    max-width: 16ch;
  }
  .card > div > p {
    margin: 16px 0 28px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: ${color.body};
    max-width: 42ch;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 14px;
    padding: 16px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.primary};
  }
  ul li:last-child {
    border-bottom: 1px solid ${color.primaryLine};
  }
  ul li svg {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    color: ${color.teal};
  }
  ${media.md} {
    .card {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export function BeginCard({
  id,
  title,
  body,
  checklist,
  action,
}: {
  id: string;
  title: ReactNode;
  body: string;
  checklist: string[];
  action: ReactNode;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Begin ref={ref} $ground="ivory" aria-labelledby={id} id={id + "-room"}>
      <Frame className="card">
        <div data-rise>
          <h2 id={id}>{title}</h2>
          <p>{body}</p>
          {action}
        </div>
        <ul>
          {checklist.map((c) => (
            <li key={c} data-rise>
              <TickIcon />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Frame>
    </Begin>
  );
}

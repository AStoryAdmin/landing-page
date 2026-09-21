/**
 * The professional-audience composition (Care communities, Organizations).
 *
 * These pages answer "would this work for us?", so they are organised as a
 * short list of situations the reader recognises, each a numbered row: the
 * statement set large in the serif on the left, the practical detail on the
 * right. Then one closing block for what to agree before beginning, with the
 * one action. Quieter than the family pages on purpose — it is a decision
 * page for a professional reader — but built from the same kit.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { useReveals } from "./reveals";
import { Chapter, Eyebrow, Frame, Plate, type Ground } from "./kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const Rows = styled(Chapter)`
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: situation;
  }
  li {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(20px, 4vw, 72px);
    padding: clamp(36px, 4vw, 64px) 0;
    border-top: 1px solid var(--line);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  .n {
    font: 400 ${display.md} / 1 ${font.display};
    color: var(--mark);
  }
  h2 {
    font: 400 ${display.md} / 1.15 ${font.display};
    color: var(--ink);
    letter-spacing: -0.015em;
  }
  .copy p {
    font: 400 18px/1.65 ${font.body};
    color: var(--muted);
    max-width: 48ch;
  }
  .copy p + p {
    margin-top: 14px;
  }
  .copy a {
    margin-top: 12px;
  }
  ${media.md} {
    li {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }
  }
`;

const ROMAN = ["I", "II", "III", "IV", "V"];

export type Situation = { eyebrow: string; title: ReactNode; body: ReactNode; id?: string };

export function Situations({ items, ground = "ivory" }: { items: Situation[]; ground?: Ground }) {
  const ref = useReveals<HTMLElement>();
  return (
    <Rows ref={ref} $ground={ground} $tight aria-label="Situations">
      <Frame>
        <ol>
          {items.map((s, i) => (
            <li key={s.eyebrow} id={s.id} data-rise>
              <span className="n" aria-hidden="true">
                {ROMAN[i]}
              </span>
              <div>
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <h2>{s.title}</h2>
              </div>
              <div className="copy">{s.body}</div>
            </li>
          ))}
        </ol>
      </Frame>
    </Rows>
  );
}

const Close = styled(Chapter)`
  .close {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(28px, 6vw, 110px);
    align-items: center;
  }
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    color: ${color.primary};
  }
  h2 em {
    font-style: normal;
    color: ${color.accent};
  }
  .plate-body {
    margin-top: 22px;
  }
  p {
    font: 400 18px/1.65 ${font.body};
    color: ${color.body};
    max-width: 48ch;
  }
  p + p {
    margin-top: 14px;
  }
  ${media.md} {
    .close {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/** What to agree before beginning — the plate, and the one action. */
export function BeforeYouBegin({
  title,
  children,
  art,
}: {
  title: ReactNode;
  children: ReactNode;
  art?: ReactNode;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Close ref={ref} $ground="paper" aria-label="Before you begin">
      <Frame className="close">
        {art ?? <span />}
        <Plate data-rise>
          <h2>{title}</h2>
          <div className="plate-body">{children}</div>
        </Plate>
      </Frame>
    </Close>
  );
}

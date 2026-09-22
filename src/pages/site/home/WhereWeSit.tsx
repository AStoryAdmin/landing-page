/**
 * A Story beside the products people recognise — homepage.
 *
 * Only Storyworth, Remento and Storii (positioning guide, Sept 2026), in the
 * founder's reference table style (Quippy): six plain rows, one per core
 * value, readable in a few seconds. The section ends with one editorial line and the
 * link to /compare — no second matrix, no documentary-vs-diary table.
 * Table: compare/CompareTable; data: lib/landscape.ts (HOME_*).
 */
import styled from "styled-components";
import { AS_OF, HOME_COLUMNS, HOME_ROWS } from "../../../lib/landscape";
import CompareTable, { CompareLegend } from "../compare/CompareTable";
import { ArrowIcon } from "../kit/kit";
import {
  Eyebrow,
  Frame,
  SplitHead,
  Statement,
  TextLink,
} from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.paperPure};
  padding: clamp(96px, 11vw, 176px) 0;

  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: ${color.body};
    max-width: 46ch;
  }
  .close {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 20px 48px;
    align-items: end;
    margin-top: clamp(48px, 6vw, 88px);
    padding-top: 28px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .close h3 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .close p {
    margin-top: 10px;
    font: italic 400 18px/1.5 ${font.display};
    color: ${color.primaryMid};
    max-width: 56ch;
  }
  .note {
    margin-top: 18px;
    font: 400 13px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  @media (max-width: 860px) {
    .close {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function WhereWeSit() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll("tbody tr"), {
      y: 14,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: { trigger: "table", start: "top 80%", once: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="sit-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>How A Story compares</Eyebrow>
            <Statement id="sit-title" $size="lg">
              A memoir keeps one voice. A&nbsp;Story keeps the whole{" "}
              <em>family.</em>
            </Statement>
          </div>
          <p className="lead">
            Memoir apps turn one storyteller’s answers into a finished book. A
            Story calls, follows what they say, and keeps every version of the
            family’s story — and it keeps going.
          </p>
        </SplitHead>

        <CompareTable
          columns={HOME_COLUMNS}
          rows={HOME_ROWS}
          label="A Story compared with Storyworth, Remento and Storii, scrollable"
        />
        <CompareLegend />

        <div className="close">
          <div>
            <h3>One moment does not need one official version.</h3>
            <p>
              Mom remembers it one way. Her brother remembers another. The
              photograph adds something else. A Story keeps all three attached
              to the same memory.
            </p>
          </div>
          <TextLink to="/compare">
            See the full comparison <ArrowIcon />
          </TextLink>
        </div>
        <p className="note">
          From each company’s public pages, {AS_OF}. Features change; we update
          this as they do.
        </p>
      </Frame>
    </Scene>
  );
}

/**
 * A Story beside its direct competitors, as one table (homepage).
 *
 * The founder's reference is Remento's own comparison with Storyworth: named
 * products across the top, each row a bold benefit with one plain line
 * under it, then a short "The details" block of text rows. No lead
 * paragraph — the table is the argument. The category-level version (memoir
 * books, genealogy sites…) lives on /compare (compare/CategoryTable).
 *
 * Every mark follows `lib/landscape.ts` (the founders' research, September
 * 2026). Tone rules from that document still hold: no red crosses (a product
 * that doesn't do something gets a quiet dash — "not a focus"), rows where
 * others do as well are kept, and the printed book is shown honestly as
 * their core product. Rows avoid what A Story is still building (keeping the
 * voice as audio; linking people and places — see demoScripts.ts).
 */
import styled from "styled-components";
import { AS_OF } from "../../../lib/landscape";
import { ArrowIcon } from "../kit/kit";
import { Eyebrow, Frame, Statement, TextLink } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";

/** 2 = yes, 1 = in part, 0 = not a focus. */
type Level = 0 | 1 | 2;
const COLUMNS = ["A Story", "Storyworth", "Remento", "Spomen"];
const ROWS: { title: string; line: string; marks: Level[] }[] = [
  {
    title: "Asks, then follows up",
    line: "Questions that follow what was actually said, not a fixed list",
    marks: [2, 2, 0, 2],
  },
  {
    title: "The whole family, one record",
    line: "Relatives add to the same memories, each in their own name",
    marks: [2, 1, 1, 2],
  },
  {
    title: "Every version kept",
    line: "When people remember it differently, both accounts stay — side by side",
    marks: [2, 0, 0, 1],
  },
  {
    title: "Today counts too",
    line: "Built for the life being lived now, not only the past",
    marks: [2, 1, 1, 2],
  },
  {
    title: "Keeps growing",
    line: "A living archive that carries on after anything is printed",
    marks: [2, 1, 1, 2],
  },
  {
    title: "A story you can read",
    line: "Each conversation turned into a written memory",
    marks: [2, 2, 2, 2],
  },
];
const DETAILS: { title: string; cells: string[] }[] = [
  {
    title: "How they answer",
    cells: ["A phone call", "Phone", "A web link", "A private link"],
  },
  {
    title: "Printed book",
    cells: [
      "Any chapter, when you’re ready",
      "The core product",
      "The core product",
      "PDF",
    ],
  },
];
const SAY = ["Not a focus", "In part", "Yes"];

/*
 * Pass 11g (founder: "I don't like the table design quality"). Editorial,
 * not app-like: no card, hairline rows on paper, product names in the serif,
 * a fine check stroke for yes, "Partly" in italic for in part, a thin rule
 * for not a focus. A Story's column is a raised teal slab that stands a
 * little above and below the table.
 */
const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.paperPure};
  padding: clamp(96px, 11vw, 176px) 0;

  h2 {
    max-width: 18ch;
  }
  .wrap {
    margin-top: clamp(48px, 6vw, 80px);
    padding: 18px 0;
    overflow-x: auto;
  }
  .wrap:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  table {
    width: 100%;
    min-width: 760px;
    border-collapse: separate;
    border-spacing: 0;
  }
  th,
  td {
    padding: 24px 18px;
    border-bottom: 1px solid ${color.primaryLine};
    text-align: center;
    vertical-align: middle;
  }
  thead th {
    padding: 0 18px 22px;
    vertical-align: bottom;
    border-bottom: 1px solid ${color.primaryLineStrong};
    font: 400 21px/1.1 ${font.display};
    color: ${color.primaryMid};
  }
  tbody th {
    width: 42%;
    padding-left: 0;
    text-align: left;
    font-weight: 400;
  }
  tbody th b {
    display: block;
    font: 400 20px/1.25 ${font.display};
    color: ${color.primary};
  }
  tbody th span {
    display: block;
    margin-top: 4px;
    font: 400 15px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  /* A Story: the raised slab. */
  .us {
    width: 15%;
    background: ${color.teal};
    color: ${color.ivory};
    border-bottom-color: ${color.onDarkLine};
    box-shadow: 0 0 0 0 transparent;
  }
  thead .us {
    position: relative;
    padding-top: 30px;
    border-radius: 18px 18px 0 0;
    border-bottom-color: ${color.onDarkLine};
    font: 500 24px/1 ${font.display};
    color: ${color.ivory};
  }
  thead .us small {
    display: block;
    margin-bottom: 10px;
    font: 600 10.5px/1 ${font.body};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  tbody tr:last-child .us {
    border-radius: 0 0 18px 18px;
    padding-bottom: 34px;
  }
  tbody tr:last-child > * {
    border-bottom: 0;
  }
  /* "The details" — a quiet small-caps divider, not a coloured band. */
  .band th {
    padding: 34px 0 12px;
    border-bottom-color: ${color.primaryLineStrong};
    text-align: left;
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .band td {
    border-bottom-color: ${color.primaryLineStrong};
  }
  .band .us {
    border-bottom-color: ${color.onDarkLine};
  }
  td.text {
    font: italic 400 17px/1.35 ${font.display};
    color: ${color.primaryMid};
  }
  td.text.us {
    font: 400 18px/1.3 ${font.display};
    font-style: normal;
    color: ${color.ivory};
  }
  .mk {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }
  .l2 svg {
    width: 26px;
    height: 26px;
    color: ${color.primary};
  }
  .us .l2 svg {
    color: ${color.gold};
  }
  .l1 {
    font: italic 400 17px/1 ${font.display};
    color: ${color.primaryMid};
  }
  .l0 {
    width: 18px;
    height: 1px;
    background: ${color.primaryLineStrong};
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 14px 32px;
    margin-top: 28px;
  }
  .note {
    font: 400 13px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    tbody th {
      position: sticky;
      left: 0;
      z-index: 1;
      min-width: 220px;
      padding-right: 16px;
      background: ${color.paperPure};
    }
  }
`;

function Mark({ level }: { level: Level }) {
  if (level === 1)
    return (
      <span className="mk l1" role="img" aria-label={SAY[1]}>
        Partly
      </span>
    );
  if (level === 0)
    return <span className="mk l0" role="img" aria-label={SAY[0]} />;
  return (
    <span className="mk l2" role="img" aria-label={SAY[2]}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

export default function WhereWeSit() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll("tbody tr"), {
      y: 14,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: { trigger: ".card", start: "top 80%", once: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="sit-title">
      <Frame>
        <Eyebrow>How A Story compares</Eyebrow>
        <Statement id="sit-title" $size="lg">
          Built for the whole family, <em>not one storyteller.</em>
        </Statement>

        <div
          className="wrap"
          tabIndex={0}
          role="region"
          aria-label="Comparison with Storyworth, Remento and Spomen, scrollable"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {COLUMNS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={i === 0 ? "us" : undefined}
                  >
                    {i === 0 && <small>Built for this</small>}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.title}>
                  <th scope="row">
                    <b>{r.title}</b>
                    <span>{r.line}</span>
                  </th>
                  {r.marks.map((m, i) => (
                    <td key={i} className={i === 0 ? "us" : undefined}>
                      <Mark level={m} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="band">
                <th scope="rowgroup" colSpan={1}>
                  The details
                </th>
                <td className="us" />
                <td colSpan={3} />
              </tr>
              {DETAILS.map((d) => (
                <tr key={d.title}>
                  <th scope="row">
                    <b>{d.title}</b>
                  </th>
                  {d.cells.map((c, i) => (
                    <td key={i} className={`text${i === 0 ? " us" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="foot">
          <p className="note">
            From each company’s public pages, {AS_OF}. Features change; we
            update this as they do.
          </p>
          <TextLink to="/compare">
            See the full comparison <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Scene>
  );
}

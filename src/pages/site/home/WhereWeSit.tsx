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

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.paperPure};
  padding: clamp(96px, 11vw, 176px) 0;

  h2 {
    max-width: 18ch;
  }
  .card {
    margin-top: clamp(40px, 5vw, 64px);
    border-radius: 22px;
    background: ${color.ivory};
    box-shadow:
      inset 0 0 0 1px ${color.primaryLine},
      0 40px 80px -60px rgba(42, 31, 24, 0.5);
    overflow-x: auto;
  }
  .card:focus-visible {
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
    padding: 22px 18px;
    border-bottom: 1px solid ${color.primaryLine};
    text-align: center;
    vertical-align: middle;
  }
  thead th {
    padding: 26px 18px 24px;
    font: 400 22px/1.1 ${font.display};
    color: ${color.primary};
  }
  tbody th {
    width: 44%;
    padding-left: clamp(20px, 2.6vw, 40px);
    text-align: left;
    font-weight: 400;
  }
  tbody th b {
    display: block;
    font: 600 17px/1.3 ${font.body};
    color: ${color.primary};
  }
  tbody th span {
    display: block;
    margin-top: 4px;
    font: 400 15px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  /* A Story's column. */
  .us {
    width: 14%;
    background: ${color.teal};
    color: ${color.ivory};
    border-bottom-color: ${color.onDarkLine};
  }
  thead .us {
    border-radius: 16px 16px 0 0;
    color: ${color.ivory};
  }
  tbody tr:last-child .us {
    border-radius: 0 0 16px 16px;
  }
  tbody tr:last-child > * {
    border-bottom: 0;
  }
  /* "The details" band. */
  .band th {
    padding: 14px clamp(20px, 2.6vw, 40px);
    background: color-mix(in srgb, ${color.gold} 26%, ${color.ivory});
    text-align: left;
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${color.primaryMid};
  }
  .band .us {
    background: color-mix(in srgb, ${color.teal} 88%, ${color.black});
  }
  td.text {
    font: 400 15px/1.4 ${font.body};
    color: ${color.body};
  }
  td.text.us {
    font: 500 16px/1.35 ${font.display};
    color: ${color.ivory};
  }
  .mk {
    display: inline-grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .mk svg {
    width: 16px;
    height: 16px;
  }
  .l2 {
    background: ${color.primaryMid};
    color: ${color.ivory};
  }
  .us .l2 {
    background: ${color.warmGold};
    color: ${color.primary};
  }
  .l1 {
    width: 22px;
    height: 22px;
    border: 1.5px solid ${color.primaryMid};
    background: linear-gradient(
      90deg,
      ${color.primaryMid} 50%,
      transparent 50%
    );
  }
  .l0 {
    width: 30px;
    height: 30px;
    border: 1.5px solid ${color.primaryLineStrong};
  }
  .l0::after {
    content: "";
    width: 10px;
    height: 1.5px;
    background: ${color.primaryLineStrong};
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 14px 32px;
    margin-top: 20px;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 22px;
    font: 500 14px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .legend span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .legend .mk {
    transform: scale(0.75);
  }
  .note {
    margin-top: 10px;
    font: 400 13px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    tbody th {
      position: sticky;
      left: 0;
      z-index: 1;
      min-width: 220px;
      background: ${color.ivory};
    }
    .band th {
      position: static;
    }
  }
`;

function Mark({ level }: { level: Level }) {
  return (
    <span className={`mk l${level}`} role="img" aria-label={SAY[level]}>
      {level === 2 && (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      )}
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
          className="card"
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
          <p className="legend" aria-hidden="true">
            <span>
              <Mark level={2} /> Yes
            </span>
            <span>
              <Mark level={1} /> In part
            </span>
            <span>
              <Mark level={0} /> Not a focus
            </span>
          </p>
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

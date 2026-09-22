/**
 * The comparison table, shared by Home (4 columns) and /compare (7 columns),
 * in the founder's reference style (Quippy): a clean white card, one plain
 * benefit per row, three marks — ✓ yes (teal), ~ partly (terracotta), × no
 * (soft grey, never red) — and A Story's column tinted with a teal rule
 * under its name. Easy to follow in a few seconds. Data: lib/landscape.ts.
 */
import styled from "styled-components";
import type { Level, Row } from "../../../lib/landscape";
import { color, font, media } from "../../../styles/theme";

const Card = styled.div`
  border-radius: 20px;
  background: ${color.paperPure};
  box-shadow:
    0 0 0 1px ${color.primaryLine},
    0 40px 80px -60px rgba(42, 31, 24, 0.45);
  overflow-x: auto;
  &:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  table {
    width: 100%;
    min-width: var(--min, 720px);
    border-collapse: collapse;
  }
  th,
  td {
    padding: 20px 16px;
    border-bottom: 1px solid ${color.primaryLine};
    text-align: center;
    vertical-align: middle;
  }
  tbody tr:last-child > * {
    border-bottom: 0;
  }
  thead th {
    padding: 26px 16px 22px;
    border-bottom: 1px solid ${color.primaryLineStrong};
    font: 500 15px/1.2 ${font.body};
    color: ${color.primaryMid};
  }
  tbody th {
    width: var(--label-w, 38%);
    padding-left: clamp(18px, 2vw, 28px);
    text-align: left;
    font: 400 16.5px/1.45 ${font.body};
    color: ${color.primary};
  }
  .us {
    width: var(--us-w, 16%);
    background: color-mix(in srgb, ${color.teal} 7%, ${color.paperPure});
  }
  thead .us {
    border-bottom: 2px solid ${color.teal};
    font: 500 22px/1 ${font.display};
    color: ${color.teal};
  }
  .m {
    display: inline-block;
    font: 400 22px/1 ${font.body};
  }
  .m2 {
    color: ${color.teal};
  }
  .m2 svg {
    width: 22px;
    height: 22px;
  }
  .m1 {
    color: ${color.accent};
    font-weight: 600;
  }
  .m0 {
    color: color-mix(in srgb, ${color.bodyMuted} 70%, transparent);
  }
  .m0 svg {
    width: 16px;
    height: 16px;
  }
  ${media.md} {
    tbody th {
      position: sticky;
      left: 0;
      z-index: 1;
      min-width: 200px;
      background: ${color.paperPure};
    }
  }
`;

const Legend = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 22px;
  margin-top: 18px;
  padding-left: 14px;
  border-left: 2px solid ${color.primaryLine};
  font: italic 400 16px/1.4 ${font.display};
  color: ${color.primaryMid};
  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .m2 {
    color: ${color.teal};
  }
  .m1 {
    color: ${color.accent};
    font: 600 18px/1 ${font.body};
    font-style: normal;
  }
  .m0 {
    color: ${color.bodyMuted};
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Tick = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const Cross = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const SAY = ["No", "Partly", "Yes"];

function Mark({ v }: { v: Level }) {
  return (
    <span className={`m m${v}`} role="img" aria-label={SAY[v]}>
      {v === 2 ? <Tick /> : v === 1 ? "~" : <Cross />}
    </span>
  );
}

export function CompareLegend() {
  return (
    <Legend aria-hidden="true">
      <span>
        <span className="m2">
          <Tick />
        </span>
        yes
      </span>
      <span>
        <span className="m1">~</span>
        partly
      </span>
      <span>
        <span className="m0">
          <Cross />
        </span>
        no
      </span>
    </Legend>
  );
}

export default function CompareTable({
  columns,
  rows,
  label,
  minWidth,
  labelWidth,
  usWidth,
}: {
  columns: readonly string[];
  rows: Row[];
  label: string;
  minWidth?: string;
  labelWidth?: string;
  usWidth?: string;
}) {
  return (
    <Card
      tabIndex={0}
      role="region"
      aria-label={label}
      style={{
        ["--min" as string]: minWidth,
        ["--label-w" as string]: labelWidth,
        ["--us-w" as string]: usWidth,
      }}
    >
      <table>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">What you get</span>
            </th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={i === 0 ? "us" : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.cells.map((v, i) => (
                <td key={i} className={i === 0 ? "us" : undefined}>
                  <Mark v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

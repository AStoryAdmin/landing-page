/**
 * The comparison table, shared by Home (4 columns) and /compare (7 columns),
 * in the founder's reference style (Quippy): a clean white card, one plain
 * benefit per row, three marks — ✓ yes (teal), ~ partly (terracotta), × no
 * (soft grey, never red) — and A Story's column tinted with a teal rule
 * under its name. Easy to follow in a few seconds. Data: lib/landscape.ts.
 */
import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { Level, Row } from "../../../lib/landscape";
import { IN_MAIN, usePremium } from "../kit/premium";
import { color, font, media, radius, space, type } from "../../../styles/theme";

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
    font: 500 18px / 1.2 ${font.text};
    color: ${color.primaryMid};
  }
  tbody th {
    width: var(--label-w, 38%);
    padding-left: clamp(18px, 2vw, 28px);
    text-align: left;
    font: 400 ${type.read} / 1.45 ${font.text};
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
    font: 400 22px/1 ${font.text};
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

  /* Premium pass (spec §4B /compare, S12), off home only. Home's table
     (home/WhereWeSit) keeps everything above, unchanged.
     - From 641px: the feature column stays put while the rest scrolls, and
       the right edge fades while there is more to see.
     - To 640px: the same table reflows into one block per feature: the
       feature, then A Story, then each company as "Name: mark", read from
       each cell's data-label. One DOM, no hidden second copy. */
  ${IN_MAIN} & {
    thead th {
      font-size: ${type.read};
    }
    thead .us {
      font-weight: 600;
    }
    /* Token sizes off home (spec §3.1); home keeps its px marks. */
    .m {
      font-size: ${type.read};
    }
    .m1 {
      font-size: ${type.ui};
    }
    tbody th {
      position: sticky;
      left: 0;
      z-index: 1;
      background: ${color.paperPure};
    }
  }
  ${IN_MAIN} &[data-overflow="end"] {
    mask-image: linear-gradient(to right, #000 calc(100% - ${space.xxl}), transparent);
  }
  ${media.sm} {
    ${IN_MAIN} & {
      overflow: visible;
      mask-image: none;
    }
    ${IN_MAIN} & table,
    ${IN_MAIN} & tbody,
    ${IN_MAIN} & tr {
      display: block;
      min-width: 0;
    }
    ${IN_MAIN} & thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
    ${IN_MAIN} & tr {
      padding: ${space.md} ${space.md} ${space.sm};
      border-bottom: 1px solid ${color.primaryLine};
    }
    ${IN_MAIN} & tbody tr:last-child {
      border-bottom: 0;
    }
    ${IN_MAIN} & tbody th {
      display: block;
      position: static;
      width: auto;
      min-width: 0;
      padding: 0 0 ${space.xs};
      border: 0;
      background: none;
    }
    ${IN_MAIN} & td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${space.md};
      width: auto;
      min-height: 0;
      padding: ${space.xxs} 0;
      border: 0;
      text-align: left;
    }
    ${IN_MAIN} & td::before {
      content: attr(data-label);
      font: 500 ${type.note} / 1.3 ${font.ui};
      color: ${color.bodyMuted};
    }
    ${IN_MAIN} & td.us {
      margin-inline: calc(-1 * ${space.xs});
      padding-inline: ${space.xs};
      border-radius: ${radius.sm};
    }
    ${IN_MAIN} & td.us::before {
      font-weight: 600;
      color: ${color.teal};
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
  font: italic 400 ${type.read} / 1.4 ${font.display};
  color: ${color.bodyMuted};
  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .m2 {
    color: ${color.teal};
  }
  .m1 {
    color: ${color.accentText};
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
    <path d="M8 12h8" />
  </svg>
);
const SAY = ["Not listed", "Partly", "Yes"];

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
        not listed
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
  /* Off home: mark the right edge while the table has more to show (the
     end fade, spec §4B). Home never runs this. */
  const premium = usePremium();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!premium || !el) return;
    const update = () => {
      const more = el.scrollWidth - el.clientWidth - el.scrollLeft > 2;
      el.dataset.overflow = more ? "end" : "none";
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [premium]);
  return (
    <Card
      ref={ref}
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
                <td
                  key={i}
                  className={i === 0 ? "us" : undefined}
                  data-label={columns[i]}
                >
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

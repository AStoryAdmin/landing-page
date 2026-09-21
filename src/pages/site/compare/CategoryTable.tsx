/**
 * The category picture on /compare — A Story beside the KINDS of tool a
 * family already uses. (It began on the homepage; the founder moved it here
 * and asked for direct competitors on Home instead — see home/WhereWeSit.)
 *
 * The founder asked for a comparison table (Quippy's is the reference) and
 * for the tone to polish A Story rather than make anyone else look bad. So:
 * the rows are what a family needs, written as benefits; the other columns
 * are CATEGORIES (memoir books, family archive apps, genealogy sites, voice
 * memos and photo apps), never named products; and there are no crosses —
 * a category either does it, does it in part, or simply isn't built for it.
 * Several rows are ones other products do well too; that fairness is what
 * makes the A Story column believable.
 *
 * Judgements follow `lib/landscape.ts` (the founders' research, September
 * 2026) at the category level. Rows avoid what the app is still building
 * (keeping the voice as audio; linking people and places) — see
 * demoScripts.ts. The full, product-by-product view is at /compare.
 */
import styled from "styled-components";
import { AS_OF } from "../../../lib/landscape";
import { Eyebrow, Frame, SplitHead, Statement } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";

/** 2 = built for it, 1 = in part, 0 = not what it's for. */
type Level = 0 | 1 | 2;
const COLUMNS = [
  "A Story",
  "Memoir books",
  "Family archive apps",
  "Genealogy sites",
  "Voice memos & photo apps",
];
const ROWS: { need: string; marks: Level[] }[] = [
  {
    need: "A real conversation — it calls them, nothing to type",
    marks: [2, 2, 1, 0, 0],
  },
  { need: "Follows up on what was actually said", marks: [2, 1, 2, 0, 0] },
  {
    need: "Their real words — never an AI imitation of them",
    marks: [2, 2, 1, 2, 2],
  },
  {
    need: "Everyone who was there adds their own version",
    marks: [2, 1, 2, 0, 1],
  },
  {
    need: "Versions kept side by side — no single official story",
    marks: [2, 0, 1, 0, 0],
  },
  { need: "Today’s life belongs, not only the past", marks: [2, 1, 2, 0, 2] },
  { need: "A printed book when a chapter is ready", marks: [2, 2, 1, 1, 0] },
  { need: "Keeps growing after the book is printed", marks: [2, 1, 2, 1, 1] },
];
const SAY = ["Not what it’s for", "In part", "Yes"];

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0;

  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: ${color.body};
    max-width: 44ch;
  }
  .card {
    margin-top: clamp(40px, 5vw, 72px);
    border-radius: 20px;
    background: ${color.paperPure};
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
    min-width: 820px;
    border-collapse: separate;
    border-spacing: 0;
  }
  th,
  td {
    padding: 18px 16px;
    text-align: center;
    border-bottom: 1px solid ${color.primaryLine};
  }
  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: 0;
  }
  thead th {
    padding-top: 24px;
    padding-bottom: 22px;
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
    vertical-align: bottom;
  }
  tbody th {
    width: 34%;
    padding-left: clamp(20px, 2.4vw, 36px);
    text-align: left;
    font: 400 clamp(1rem, 0.95rem + 0.25vw, 1.15rem) / 1.4 ${font.display};
    color: ${color.primary};
  }
  /* The A Story column: teal, the one the eye lands on. */
  .us {
    width: 15%;
    background: ${color.teal};
    color: ${color.ivory};
    border-bottom-color: ${color.onDarkLine};
  }
  thead .us {
    border-radius: 14px 14px 0 0;
    font: 400 22px/1 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.ivory};
  }
  thead .us small {
    display: block;
    margin-bottom: 8px;
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.gold};
  }
  tbody tr:last-child .us {
    border-radius: 0 0 14px 14px;
  }
  .mk {
    display: inline-grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .mk svg {
    width: 14px;
    height: 14px;
  }
  .l2 {
    background: color-mix(in srgb, ${color.teal} 14%, transparent);
    color: ${color.teal};
  }
  .l1 {
    width: 18px;
    height: 18px;
    border: 1.5px solid ${color.primaryMid};
    background: linear-gradient(
      90deg,
      ${color.primaryMid} 50%,
      transparent 50%
    );
  }
  .l0 {
    width: 14px;
    height: 1.5px;
    border-radius: 0;
    background: ${color.primaryLineStrong};
  }
  .us .l2 {
    background: ${color.warmGold};
    color: ${color.primary};
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px 32px;
    margin-top: 22px;
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
      min-width: 200px;
      background: ${color.paperPure};
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

export default function CategoryTable() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll("tbody tr"), {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: { trigger: ".card", start: "top 80%", once: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="cat-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>By kind of product</Eyebrow>
            <Statement id="cat-title" $size="lg">
              Everything a family story needs, <em>in one place.</em>
            </Statement>
          </div>
          <p className="lead">
            Memoir books, family apps and genealogy sites each do part of this
            well. A Story was built to do all of it together — around the
            family, not a single storyteller.
          </p>
        </SplitHead>

        <div
          className="card"
          tabIndex={0}
          role="region"
          aria-label="Comparison table, scrollable"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">What a family needs</span>
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
                <tr key={r.need}>
                  <th scope="row">{r.need}</th>
                  {r.marks.map((m, i) => (
                    <td key={i} className={i === 0 ? "us" : undefined}>
                      <Mark level={m} />
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
              <Mark level={0} /> Not what it’s for
            </span>
          </p>
        </div>
        <p className="note">
          By category, from leading products’ public pages, {AS_OF}. Individual
          products differ.
        </p>
      </Frame>
    </Scene>
  );
}

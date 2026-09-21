/**
 * How A Story is different — the competitive landscape, for families.
 *
 * Built from the founders' research (`src/lib/landscape.ts`, locked content).
 * The page follows that document's own design rules: product models before
 * feature lists, no logo wall, no red crosses, no "only A Story" claims —
 * Storyworth and Remento built this category; Spomen and Heirloom show it
 * moving toward living archives; A Story takes the documentary position.
 *
 * Order: the one-line position → the three product models side by side (the
 * primary comparison, readable in ten seconds) → documentary vs memoir → the
 * what one memory can hold → beside the tools families already use → the
 * full matrix, folded → side-by-side answers. (The 2×2 philosophy map was
 * removed at the founder's request; questions read "A Story and X" rather
 * than "Why not X?" — the page polishes A Story, it doesn't knock anyone.)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TWO A STORY CAPABILITIES ARE AHEAD OF THE APP. demoScripts.ts: keeping the
 * storyteller's own audio, and linking memories to people and places, are
 * being built. The matrix keeps the founders' values and says so beneath it.
 * ─────────────────────────────────────────────────────────────────────────
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import {
  AS_OF,
  A_STORY_LOOP,
  DOCUMENTARY_MODEL,
  MATRIX,
  MATRIX_COLUMNS,
  MEMOIR_MODEL,
  MEMORY_HOLDS,
  MODELS,
  WHY_NOT,
} from "../../lib/landscape";
import { ArrowIcon, Invitation } from "./kit/kit";
import CategoryTable from "./compare/CategoryTable";
import CompareOpening from "./compare/CompareOpening";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  Plate,
  PrimaryLink,
  SecondaryLink,
  SplitHead,
  Statement,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

/* ── The three models ──────────────────────────────────────────────────── */

const Models = styled(Chapter)`
  .models {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1.1fr);
    gap: clamp(16px, 2vw, 28px);
    align-items: stretch;
  }
  .col {
    padding: clamp(24px, 2.6vw, 36px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
  }
  .col h3 {
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .col > p {
    margin: 8px 0 20px;
    font: italic 400 17px/1.45 ${font.display};
    color: ${color.primaryMid};
  }
  .col dl {
    margin: 0;
  }
  .col dt {
    margin-top: 18px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .col dd {
    margin: 6px 0 0;
    padding-bottom: 16px;
    border-bottom: 1px solid ${color.primaryLine};
    font: 400 15px/1.5 ${font.body};
    color: ${color.body};
  }
  .col.us {
    background: ${color.teal};
    border-color: ${color.teal};
    color: ${color.ivory};
  }
  .col.us h3 {
    color: ${color.gold};
  }
  .col.us h4 {
    margin: 10px 0 24px;
    font: 400 ${display.md} / 1.15 ${font.display};
    color: ${color.ivory};
  }
  .loop {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .loop li {
    position: relative;
    padding: 10px 0 10px 28px;
    font: 400 17px/1.35 ${font.body};
    color: ${color.onDarkMuted};
  }
  .loop li::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 17px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid ${color.gold};
  }
  .loop li:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 8px;
    top: 26px;
    bottom: -8px;
    width: 1px;
    background: color-mix(in srgb, ${color.gold} 45%, transparent);
  }
  .loop .end {
    margin-top: 6px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.gold};
  }
  .loop .end::before {
    background: ${color.gold};
  }
  .statement {
    margin-top: clamp(40px, 5vw, 72px);
    text-align: center;
  }
  .statement p {
    font: 400 ${display.lg} / 1.15 ${font.display};
    color: ${color.primary};
  }
  .statement em {
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  ${media.lg} {
    .models {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── Documentary vs memoir ─────────────────────────────────────────────── */

const Contrast = styled(Chapter)`
  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .pair > div {
    padding: 28px clamp(16px, 3vw, 48px) 0 0;
  }
  .pair > div + div {
    padding-left: clamp(16px, 3vw, 48px);
    border-left: 1px solid ${color.primaryLineStrong};
  }
  .pair h3 {
    margin-bottom: 18px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .pair div + div h3 {
    color: ${color.accentText};
  }
  .pair ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .pair li {
    padding: 10px 0;
    border-bottom: 1px solid ${color.primaryLine};
    font: 400 ${display.sm} / 1.25 ${font.display};
    color: ${color.bodyMuted};
  }
  .pair div + div li {
    color: ${color.primary};
  }
  .family {
    margin-top: clamp(48px, 6vw, 88px);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
  .family p {
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
  }
  .family p:last-child {
    font-style: normal;
    color: ${color.accentText};
  }
  ${media.md} {
    .family {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

/* ── What a memory holds ───────────────────────────────────────────────── */

const Holds = styled(Chapter)`
  text-align: center;
  .unit {
    font: 400 ${display.lg} / 1.2 ${font.display};
    color: ${color.ivory};
    max-width: 24ch;
    margin: 0 auto;
  }
  .unit b {
    display: block;
    margin-top: 0.25em;
    font-weight: 500;
    color: ${color.gold};
  }
  ul {
    list-style: none;
    margin: clamp(40px, 5vw, 64px) auto 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 980px;
  }
  li {
    padding: 12px 20px;
    border: 1px solid color-mix(in srgb, ${color.gold} 55%, transparent);
    border-radius: 99px;
    font: italic 400 19px/1 ${font.display};
    color: ${color.ivory};
  }
  .principle {
    margin-top: clamp(56px, 7vw, 96px);
    font: 400 ${display.md} / 1.3 ${font.display};
    color: ${color.gold};
  }
  .principle span {
    display: block;
    margin-top: 10px;
    font: 400 18px/1.6 ${font.body};
    color: ${color.onDarkMuted};
  }
`;

/* ── Beside the tools you already use ──────────────────────────────────── */

const Beside = styled(Chapter)`
  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
  }
  .card {
    padding: clamp(24px, 2.6vw, 36px);
    border-top: 2px solid ${color.primary};
    background: ${color.paperPure};
  }
  .card small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .card p {
    margin-top: 16px;
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
  }
  .card p b {
    font-weight: 500;
    color: ${color.accentText};
  }
  ${media.md} {
    .cards {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── The full matrix and the Q&A ───────────────────────────────────────── */

const Detail = styled(Chapter)`
  details.matrix-wrap,
  .why details {
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .why details:last-child {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    min-height: 72px;
    cursor: pointer;
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary::after {
    content: "+";
    font: 300 26px/1 ${font.body};
    color: ${color.accent};
  }
  details[open] > summary::after {
    content: "−";
  }
  summary:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .scroll {
    overflow-x: auto;
    padding-bottom: 12px;
  }
  table {
    width: 100%;
    min-width: 860px;
    border-collapse: collapse;
    font: 400 14px/1.35 ${font.body};
  }
  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid ${color.primaryLine};
    text-align: center;
    vertical-align: top;
  }
  th:first-child,
  td:first-child {
    text-align: left;
    color: ${color.primary};
  }
  thead th {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .us-col {
    background: color-mix(in srgb, ${color.teal} 7%, transparent);
    color: ${color.teal};
  }
  .mark {
    display: block;
    font-size: 18px;
    line-height: 1;
    color: ${color.primary};
  }
  .mark + small {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: ${color.bodyMuted};
  }
  .legend,
  .footnote {
    margin: 16px 0 28px;
    font: 400 14px/1.6 ${font.body};
    color: ${color.bodyMuted};
    max-width: 80ch;
  }
  .why {
    margin-top: clamp(48px, 6vw, 88px);
  }
  .why h3 {
    margin-bottom: 18px;
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .why p {
    padding-bottom: 22px;
    font: 400 17px/1.7 ${font.body};
    color: ${color.body};
    max-width: 70ch;
  }
`;

const MARK = ["○", "◐", "●"];

export default function Compare() {
  const models = useReveals<HTMLElement>();
  const contrast = useReveals<HTMLElement>();
  const holds = useReveals<HTMLElement>();
  const beside = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story is different — a family documentary archive"
        path="/compare"
        description="Storyworth, Remento, Spomen, Heirloom and A Story compared by product model: most products preserve a storyteller; A Story preserves the family record."
      />
      <CompareOpening />

      <Models
        ref={models}
        $ground="ivory"
        $tight
        aria-labelledby="models-title"
      >
        <Frame>
          <h2 id="models-title" className="sr-only">
            Three product models
          </h2>
          <div className="models">
            {MODELS.map((g) => (
              <div className="col" key={g.group} data-rise>
                <h3>{g.group}</h3>
                <p>{g.note}</p>
                <dl>
                  {g.items.map((it) => (
                    <div key={it.name}>
                      <dt>{it.name}</dt>
                      <dd>{it.loop}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <div className="col us" data-rise>
              <h3>A Story</h3>
              <h4>A family documentary archive</h4>
              <ol className="loop">
                {A_STORY_LOOP.map((step) => (
                  <li key={step}>{step}</li>
                ))}
                <li className="end">The archive keeps going</li>
              </ol>
            </div>
          </div>
          <Plate className="statement" data-rise>
            <p>
              One moment does not need one <em>official version.</em>
            </p>
          </Plate>
        </Frame>
      </Models>

      <CategoryTable />

      <Contrast ref={contrast} $ground="paper" aria-labelledby="contrast-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Two models</Eyebrow>
              <Statement id="contrast-title" $size="xl" data-lines>
                A documentary, not a <em>diary.</em>
              </Statement>
            </div>
            <Lead data-rise>
              The memoir category is built around a narrator. A Story is built
              around the memory.
            </Lead>
          </SplitHead>
          <div className="pair" data-rise>
            <div>
              <h3>Built for a memoir</h3>
              <ul>
                {MEMOIR_MODEL.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Built for a family record</h3>
              <ul>
                {DOCUMENTARY_MODEL.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="family" data-rise>
            <p>Mom remembers the afternoon one way.</p>
            <p>Her brother remembers another.</p>
            <p>The photograph adds something else.</p>
            <p>The archive can hold all three.</p>
          </div>
        </Frame>
      </Contrast>

      <Holds ref={holds} $ground="teal" aria-labelledby="holds-title">
        <Frame>
          <p id="holds-title" className="unit" data-rise>
            A Story’s unit is not the question. Not the recording. Not even the
            storyteller.
            <b>It is the memory.</b>
          </p>
          <ul data-rise>
            {MEMORY_HOLDS.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="principle" data-rise>
            Preservation, not simulation.
            <span>
              We preserve people. We do not simulate them — and when the source
              doesn’t contain an answer, the archive doesn’t pretend that it
              does.
            </span>
          </p>
        </Frame>
      </Holds>

      <Beside ref={beside} $ground="paper" aria-labelledby="beside-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Beside what you already use</Eyebrow>
              <Statement id="beside-title" data-lines>
                Different questions, different <em>tools.</em>
              </Statement>
            </div>
          </SplitHead>
          <div className="cards">
            <article className="card" data-rise>
              <small>Genealogy</small>
              <p>
                Ancestry can tell you who lived at the house.{" "}
                <b>A Story asks why everyone always used the back door.</b>
              </p>
            </article>
            <article className="card" data-rise>
              <small>Digitising</small>
              <p>
                Legacybox preserves the artifact.{" "}
                <b>A Story preserves the reason the artifact matters.</b>
              </p>
            </article>
            <article className="card" data-rise>
              <small>Doing it yourself</small>
              <p>
                Voice memos, photo apps, a group chat — or the most common
                choice of all: <b>“I’ll ask next time.”</b>
              </p>
            </article>
          </div>
        </Frame>
      </Beside>

      <Detail $ground="ivory" $tight aria-labelledby="detail-title">
        <Frame>
          <h2 id="detail-title" className="sr-only">
            Full comparison
          </h2>
          <details className="matrix-wrap">
            <summary>See the full comparison</summary>
            <p className="legend">
              ● Strong · ◐ Present or secondary · ○ Not central. From each
              company’s public pages, {AS_OF}.
            </p>
            <div
              className="scroll"
              tabIndex={0}
              role="region"
              aria-label="Comparison table, scrollable"
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    {MATRIX_COLUMNS.map((c) => (
                      <th
                        scope="col"
                        key={c}
                        className={c === "A Story" ? "us-col" : ""}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{r.row}</th>
                      {r.cells.map((c, i) => (
                        <td
                          key={i}
                          className={
                            MATRIX_COLUMNS[i] === "A Story" ? "us-col" : ""
                          }
                        >
                          <span className="mark" aria-hidden="true">
                            {MARK[c.level]}
                          </span>
                          <small>{c.label}</small>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="footnote">
              For A Story, keeping the storyteller’s own voice as audio and
              linking memories to people and places are in development today.
            </p>
          </details>

          <div className="why">
            <h3>Side by side</h3>
            {WHY_NOT.map((w) => (
              <details key={w.q}>
                <summary>
                  {w.q.replace(/^Why not (.+)\?$/, "A Story and $1")}
                </summary>
                <p>{w.a}</p>
              </details>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 48,
            }}
          >
            <PrimaryLink to="/start">
              Join the waitlist <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
          </div>
        </Frame>
      </Detail>

      <Invitation />
    </>
  );
}

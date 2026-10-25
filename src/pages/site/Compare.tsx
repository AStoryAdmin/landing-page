/**
 * How A Story is different — the case for switching.
 *
 * Pass 11j (founder): the page's job is to say why a family should choose
 * A Story over the memoir product they were about to buy. So it is short:
 *
 * 1. Opening — the whole family's story, with the four reasons to choose
 *    A Story on a leaf on the cloth (2026-10-23; it no longer replays Home's
 *    lake photograph and witnesses).
 * 2. The table — seven direct competitors, one plain benefit per row, in the
 *    same Quippy-style table as Home (compare/CompareTable).
 * 3. (The four reasons moved into the opening, 2026-10-23.)
 * 4. One moment does not need one official version — Joan, Paul, the
 *    photograph.
 * 5. The one action.
 *
 * Removed at the founder's request: the market-category table, the
 * documentary/diary contrast, "beside what you already use" and the
 * per-competitor "side by side" answers (negative positioning).
 * Marks follow lib/landscape.ts; nothing is claimed that the research
 * doesn't support, and capabilities still in development are left out.
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { AS_OF, COMPARE_COLUMNS, COMPARE_ROWS } from "../../lib/landscape";
import CompareOpening from "./compare/CompareOpening";
import CompareTable, { CompareLegend } from "./compare/CompareTable";
import { Invitation } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  SplitHead,
  Statement,
  onDarkActions,
} from "./kit/kit.styles";
import { color, display, font, media, type } from "../../styles/theme";

const Matrix = styled(Chapter)`
  .lead {
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
    max-width: 44ch;
  }
  .note {
    margin-top: 14px;
    font: 400 ${type.note} / 1.55 ${font.body};
    color: ${color.bodyMuted};
  }
`;

const Moment = styled(Chapter)`
  ${onDarkActions};
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(36px, 6vw, 110px);
    align-items: center;
  }
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .then {
    margin-top: 22px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
    max-width: 34ch;
  }
  .voices {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 14px;
  }
  .voices li {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 18px;
    align-items: baseline;
    padding: 20px 24px;
    border-radius: 16px;
    background: color-mix(in srgb, ${color.ivory} 8%, transparent);
    box-shadow: inset 0 0 0 1px ${color.onDarkLine};
  }
  .voices small {
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.goldOnTeal};
  }
  .voices q {
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.ivory};
  }
  .voices li.photo q {
    font-style: normal;
    quotes: none;
    color: ${color.onDarkMuted};
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .voices li {
      grid-template-columns: minmax(0, 1fr);
      gap: 6px;
    }
  }
`;

export default function Compare() {
  const matrix = useReveals<HTMLElement>();
  const moment = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story is different from other story apps"
        path="/compare"
        description="A Story beside Storyworth, Remento, Storii, Meminto, Spomen and Heirloom: calls that follow up, every family member's version, an archive that keeps growing."
      />
      <CompareOpening />

      <Matrix ref={matrix} $ground="ivory" aria-labelledby="matrix-title">
        <Frame>
          <SplitHead>
            <div>
              <Statement id="matrix-title" $size="lg" data-lines>
                Side by side, feature by <em>feature.</em>
              </Statement>
            </div>
            <p className="lead" data-rise>
              A Story beside the products families most often look at, from each
              company’s own pages. A dash means the feature isn’t listed.
            </p>
          </SplitHead>
          <div data-rise>
            <CompareTable
              columns={COMPARE_COLUMNS}
              rows={COMPARE_ROWS}
              label="A Story compared with Storyworth, Remento, Storii, Meminto, Spomen and Heirloom, scrollable"
              minWidth="1060px"
              labelWidth="32%"
              usWidth="11%"
            />
          </div>
          <CompareLegend />
          <p className="note">
            From each company’s public pages, {AS_OF}. Features change; we
            update this as they do.
          </p>
        </Frame>
      </Matrix>

      <Moment ref={moment} $ground="teal" aria-labelledby="moment-title">
        <Frame className="grid">
          <div>
            <h2 id="moment-title" data-lines>
              One moment does not need one official version.
            </h2>
            <p className="then" data-rise>
              A Story keeps all of them attached to the same memory.
            </p>
          </div>
          <ul
            className="voices"
            data-rise
            aria-label="Three accounts of the same afternoon"
          >
            <li>
              <small>Joan</small>
              <q>I remember being terrified.</q>
            </li>
            <li>
              <small>Paul</small>
              <q>I thought it was the best day of that summer.</q>
            </li>
            <li className="photo">
              <small>The photograph</small>
              <q>Same afternoon.</q>
            </li>
          </ul>
        </Frame>
      </Moment>

      <Invitation />
    </>
  );
}

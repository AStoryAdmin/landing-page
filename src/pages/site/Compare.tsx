/**
 * How A Story is different — the case for switching.
 *
 * Pass 11j (founder): the page's job is to say why a family should choose
 * A Story over the memoir product they were about to buy. So it is short:
 *
 * 1. Opening — more than a memoir (the lake photograph with four family
 *    versions around it).
 * 2. The table — seven direct competitors, one plain benefit per row, in the
 *    same Quippy-style table as Home (compare/CompareTable).
 * 3. Why families switch — four reasons, each one line of promise and one of
 *    proof.
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
import {
  AS_OF,
  COMPARE_COLUMNS,
  COMPARE_ROWS,
  SWITCH,
} from "../../lib/landscape";
import CompareOpening from "./compare/CompareOpening";
import CompareTable, { CompareLegend } from "./compare/CompareTable";
import { ArrowIcon, Invitation } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  PrimaryLink,
  SecondaryLink,
  SplitHead,
  Statement,
  onDarkActions,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Matrix = styled(Chapter)`
  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 44ch;
  }
  .note {
    margin-top: 14px;
    font: 400 13px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
`;

const Switch = styled(Chapter)`
  .reasons {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
  }
  .reason {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 18px;
    padding: clamp(24px, 2.6vw, 36px);
    border-radius: 20px;
    background: ${color.paperPure};
    box-shadow: 0 30px 60px -48px rgba(42, 31, 24, 0.6);
  }
  .reason b {
    font: 400 32px/1 ${font.display};
    color: ${color.accent};
  }
  .reason h3 {
    font: 400 ${display.sm} / 1.25 ${font.display};
    color: ${color.primary};
  }
  .reason p {
    margin-top: 10px;
    font: 400 16.5px/1.6 ${font.body};
    color: ${color.body};
  }
  ${media.md} {
    .reasons {
      grid-template-columns: minmax(0, 1fr);
    }
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
    font: 400 19px/1.6 ${font.body};
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
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${color.gold};
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
  const reasons = useReveals<HTMLElement>();
  const moment = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="How A Story is different — more than a memoir"
        path="/compare"
        description="A Story compared with Storyworth, Remento, Storii, Meminto, Spomen and Heirloom: phone calls that follow up, every family member's version kept side by side, and an archive that keeps growing."
      />
      <CompareOpening />

      <Matrix ref={matrix} $ground="ivory" aria-labelledby="matrix-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Side by side</Eyebrow>
              <Statement id="matrix-title" $size="lg" data-lines>
                What you get with A&nbsp;Story that a memoir{" "}
                <em>can’t give you.</em>
              </Statement>
            </div>
            <p className="lead" data-rise>
              Memoir products help one person finish a book. A Story keeps the
              whole family’s story — every voice, still growing.
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

      <Switch ref={reasons} $ground="sand" aria-labelledby="switch-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Why families switch</Eyebrow>
              <Statement id="switch-title" $size="lg" data-lines>
                Four reasons to choose A&nbsp;Story.
              </Statement>
            </div>
          </SplitHead>
          <div className="reasons">
            {SWITCH.map((r, i) => (
              <article key={r.title} className="reason" data-rise>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Frame>
      </Switch>

      <Moment ref={moment} $ground="teal" aria-labelledby="moment-title">
        <Frame className="grid">
          <div>
            <h2 id="moment-title" data-lines>
              One moment does not need one official version.
            </h2>
            <p className="then" data-rise>
              A Story keeps all of them attached to the same memory.
            </p>
            <Actions data-rise>
              <PrimaryLink to="/start">
                Join the waitlist <ArrowIcon />
              </PrimaryLink>
              <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
            </Actions>
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

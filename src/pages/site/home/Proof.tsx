/**
 * What a call becomes — the product shown, not described (2026-10-16).
 *
 * Three real artefacts, after Listen (the call itself):
 *
 *   1. The card, exactly as the app draws it (app/MemoryCard.tsx, ported
 *      from the web app's component and stylesheet), holding one memory of
 *      the home page's family: Ruth's porch on Elm Street, 1952.
 *   2. Word for word, or tidied: what the call left on the left - the ums,
 *      the false starts, the laugh - and the same words lightly tidied on
 *      the right. Nothing is rewritten; the tidied side is the book's own
 *      text for this memory (lib/homeExamples.ts, SPREADS). A toggle marks
 *      which one is kept; on a phone it switches between them.
 *   3. The book you can turn: a real spread of the printed book, as a card
 *      that opens /samples, with the one paragraph on Volume I - the family
 *      asks the next question, and the book goes on.
 *
 * Ground: paper, between the teal of the calls and the ivory of the
 * witnesses. No drawn phones; the card is the app's surface itself.
 */
import { useState } from "react";
import styled from "styled-components";
import { SPREADS } from "../../../lib/homeExamples";
import MemoryCard from "../app/MemoryCard";
import { ArrowIcon } from "../kit/kit";
import { useReveals } from "../kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  SplitHead,
  Statement,
  TextAnchor,
} from "../kit/kit.styles";
import { color, display, font, media, motion } from "../../../styles/theme";

const porch = SPREADS[0];

/** The call as it was spoken: fillers, repeats, one laugh. Fictional, like the family. */
const RAW =
  "Um, so we had, we had one chair. One chair and a crate, that’s - that’s what we had. So we’d sit on the steps, you know. Every evening, that first summer, till the, uh, till the streetlights came on. And the neighbours - [laughs] - the neighbours thought we couldn’t afford furniture. Well. We couldn’t.";

const Section = styled(Chapter)`
  .objects {
    display: grid;
    gap: calc(clamp(48px, 6vw, 96px) * var(--sy));
  }
  .obj {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(28px, 5vw, 88px);
    align-items: center;
  }
  .obj.flip > .stage {
    order: 2;
  }
  .obj small {
    display: flex;
    align-items: center;
    gap: 12px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .obj small i {
    display: inline-grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border: 1px solid currentColor;
    border-radius: 50%;
    font: 400 15px/1 ${font.display};
    font-style: normal;
  }
  .obj h3 {
    margin-top: 16px;
    font: 400 ${display.md} / 1.15 ${font.display};
    letter-spacing: -0.02em;
    color: var(--ink, ${color.primary});
    max-width: 18ch;
  }
  .obj h3 em {
    font-style: normal;
    font-weight: 500;
    color: var(--mark, ${color.accent});
  }
  .obj .cap {
    margin-top: 14px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted, ${color.body});
    max-width: 40ch;
  }
  .obj .cap + .cap {
    margin-top: 10px;
  }
  .obj .cap + a {
    margin-top: 10px;
  }

  /* 1. The card sits on the table, a little larger than it is in the app. */
  .card-stage {
    display: grid;
    justify-items: center;
  }
  .card-stage > * {
    width: min(100%, 560px);
  }

  /* 2. The words: a toggle, then the two columns. */
  .words {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(24px, 3vw, 40px);
  }
  .words .head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 20px 40px;
    align-items: end;
  }
  .toggle {
    display: inline-flex;
    padding: 4px;
    border: 1px solid var(--line, ${color.primaryLineStrong});
    border-radius: 999px;
    background: ${color.ivory};
  }
  .toggle button {
    min-height: 44px;
    padding: 0 20px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--muted, ${color.bodyMuted});
    font: 600 14px/1 ${font.body};
    cursor: pointer;
    transition:
      background ${motion.base},
      color ${motion.base};
  }
  .toggle button[aria-pressed="true"] {
    background: ${color.primary};
    color: ${color.ivory};
  }
  .toggle button:focus-visible {
    outline: 2px solid var(--focus, ${color.accentText});
    outline-offset: 2px;
  }
  .cols {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 40px);
  }
  .col {
    padding: clamp(22px, 2.6vw, 36px);
    background: ${color.paperPure};
    box-shadow: 0 1px 2px rgba(42, 31, 24, 0.06);
    transition: opacity ${motion.slow};
  }
  .col header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    padding-bottom: 14px;
    margin-bottom: 18px;
    border-bottom: 1px solid var(--line, ${color.primaryLine});
    font: 600 13px/1.4 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .col header span {
    font: 500 13px/1.4 ${font.body};
    letter-spacing: 0;
    text-transform: none;
    color: var(--muted, ${color.bodyMuted});
  }
  .col p {
    font: 400 clamp(1.15rem, 1rem + 0.5vw, 1.45rem) / 1.5 ${font.display};
    color: var(--ink, ${color.primary});
  }
  /* What tidying takes out, marked quietly on the raw side. */
  .col p s {
    text-decoration: none;
    color: var(--muted, ${color.faint});
  }
  .col .kept {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    font: 600 13px/1 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .col .kept::before {
    content: "";
    width: 7px;
    height: 7px;
    border: 1px solid currentColor;
    transform: rotate(45deg);
  }
  .col[data-kept="false"] {
    opacity: 0.62;
  }
  .col[data-kept="false"] .kept {
    visibility: hidden;
  }
  .words .note {
    font: 400 17px/1.6 ${font.body};
    color: var(--muted, ${color.body});
    max-width: 62ch;
  }

  /* 3. The book: a real spread, as a card that opens the sample books. */
  .book-card {
    display: block;
    position: relative;
    color: inherit;
    text-decoration: none;
  }
  .book-card img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 30px 30px rgba(42, 31, 24, 0.28));
    transition: transform ${motion.slow};
  }
  @media (hover: hover) and (pointer: fine) {
    .book-card:hover img {
      transform: translateY(-6px);
    }
  }
  .book-card:focus-visible {
    outline: 3px solid var(--focus, ${color.accentText});
    outline-offset: 8px;
  }

  ${media.md} {
    .obj {
      grid-template-columns: minmax(0, 1fr);
    }
    .obj.flip > .stage {
      order: 0;
    }
    .words .head {
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
    }
    .cols {
      grid-template-columns: minmax(0, 1fr);
    }
    /* One column at a time; the toggle switches between them. */
    .col[data-kept="false"] {
      display: none;
    }
  }
`;

export default function Proof() {
  const reveal = useReveals<HTMLElement>();
  const [kept, setKept] = useState<"raw" | "tidy">("tidy");

  return (
    <Section ref={reveal} $ground="paper" id="what-a-call-becomes" aria-labelledby="proof-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>What a call becomes</Eyebrow>
            <Statement id="proof-title" $size="lg" data-lines>
              The card. The words. The <em>book.</em>
            </Statement>
          </div>
          <Lead data-rise>
            Not a description. The card as the app draws it, the words as a
            call leaves them, and a book you can turn.
          </Lead>
        </SplitHead>

        <div className="objects">
          <article className="obj" aria-labelledby="proof-card">
            <div className="stage card-stage" data-rise>
              <MemoryCard
                memory={{
                  photo: `/mission/${porch.photo}-640.webp`,
                  chapter: porch.tags[1],
                  minutes: "14 min",
                  title: porch.title,
                  date: porch.date,
                  words: porch.words,
                  people: ["Walt", "Ruth"],
                  teller: "Ruth",
                  paper: "butter",
                }}
              />
            </div>
            <div data-rise>
              <small>
                <i aria-hidden="true">1</i>The card
              </small>
              <h3 id="proof-card">
                One memory, as the app <em>keeps it.</em>
              </h3>
              <p className="cap">
                The chapter, the title, the date, two lines of her own words,
                who was there, and who told it. The photograph is a print on
                the card, the way it is in the book.
              </p>
            </div>
          </article>

          <article className="obj words" aria-labelledby="proof-words">
            <div className="head">
              <div data-rise>
                <small>
                  <i aria-hidden="true">2</i>Word for word, or tidied
                </small>
                <h3 id="proof-words">
                  Her words, as she said them - or <em>lightly tidied.</em>
                </h3>
              </div>
              <div className="toggle" data-rise role="group" aria-label="Which version the book keeps">
                <button type="button" aria-pressed={kept === "raw"} onClick={() => setKept("raw")}>
                  Word for word
                </button>
                <button type="button" aria-pressed={kept === "tidy"} onClick={() => setKept("tidy")}>
                  Tidied
                </button>
              </div>
            </div>
            <div className="cols" data-rise>
              <div className="col" data-kept={kept === "raw"}>
                <header>
                  Word for word <span>0:14 · Grandma Ruth</span>
                </header>
                <p>{RAW}</p>
                <span className="kept">The book keeps this</span>
              </div>
              <div className="col" data-kept={kept === "tidy"}>
                <header>
                  Tidied <span>the same words</span>
                </header>
                <p>{porch.words}</p>
                <span className="kept">The book keeps this</span>
              </div>
            </div>
            <p className="note" data-rise>
              Tidying takes out the ums and the false starts and keeps every
              word she chose. Nothing is rewritten. You pick which one the
              book keeps; the recording and the word-for-word transcript stay
              underneath either way.
            </p>
          </article>

          <article className="obj flip" aria-labelledby="proof-book">
            <div className="stage" data-rise>
              {/* /samples is a page in public/, outside the router: a plain anchor. */}
              <a className="book-card" href="/samples" aria-label="Open the sample books and turn the pages">
                <img
                  src="/book-objects/open-1200.webp"
                  srcSet="/book-objects/open-640.webp 640w, /book-objects/open-1200.webp 1200w, /book-objects/open-1800.webp 1800w"
                  sizes="(max-width: 860px) 100vw, 55vw"
                  width={1200}
                  height={701}
                  alt="The A Story book open at a spread: a chapter title on the left page, a photograph of a couple on their porch in 1952 on the right"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div data-rise>
              <small>
                <i aria-hidden="true">3</i>The book you can turn
              </small>
              <h3 id="proof-book">
                A printed book is <em>Volume I.</em>
              </h3>
              <p className="cap">
                The archive goes on after it is printed. The family asks the
                next question, somebody answers, and the next edition has more
                pages. Print it again whenever you like.
              </p>
              <p className="cap">
                Three sample books are here to turn, page by page.
              </p>
              <TextAnchor href="/samples">
                Open a sample book <ArrowIcon />
              </TextAnchor>
            </div>
          </article>
        </div>
      </Frame>
    </Section>
  );
}

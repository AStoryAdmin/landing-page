/**
 * What a call becomes (2026-10-23): the memory in the app, her words, the
 * book - one section, said once. It replaces Proof (three stacked objects),
 * FamilyBook (the turnable Hartley book) and SampleBooks (the three covers):
 * the founder's review found the book shown three times on one page.
 *
 * One fictional memory carries it, Grandma Ruth's porch on Elm Street
 * (lib/homeExamples.ts, SPREADS[0]):
 *   - in the app: the memory card exactly as the web app draws it
 *     (app/MemoryCard.tsx);
 *   - her words: set as the book sets them; what tidying does (the ums come
 *     out, the transcript stays) is folded into the attribution line, not a
 *     caption of its own (jury 1, #12);
 *   - in the book: a real spread of the printed book, with the three sample
 *     books beside it as ruled rows, each opening /samples at that book.
 *     /samples is a page in public/, outside the router, so plain anchors.
 *
 * Layout (2026-10-23, jury 1 #12 and jury 2 P1): two rows of two, so no
 * column ends halfway down the paper. Row one: the headline and lead beside
 * her words, set wide. Row two: the card (at least 460px wide, so its "Live
 * conversation · 14 min" never wraps), centred against the book spread and
 * the sample books.
 *
 * Ground: the paper of the book's own page, a step lighter than the ivory
 * above, with the foil hairline the app's sheets carry.
 */
import styled from "styled-components";
import { SPREADS } from "../../../lib/homeExamples";
import MemoryCard from "../app/MemoryCard";
import { ArrowIcon } from "../kit/kit";
import { Frame, TextAnchor } from "../kit/kit.styles";
import { ivoryLeaf } from "./bench.styles";
import { useScene } from "../../../lib/scrollMotion";
import { arrive, lines } from "./motion";
import { color, font, media } from "../../../styles/theme";

const porch = SPREADS[0];
/** The site writes US English (review, 2026-10-23); the shared example still spells it the British way. */
const words = porch.words.replace(/neighbours/g, "neighbors");

/** The three sample books on /samples (fictional families, as /samples says). */
const BOOKS = [
  { id: "carolyn", name: "Carolyn Bennett", kind: "A family memoir" },
  { id: "raymond", name: "Raymond Ortiz", kind: "A founder’s ledger" },
  { id: "tom", name: "Thomas Kessler", kind: "A veteran’s homecoming" },
];

const Section = styled.section`
  --ink: ${color.primary};
  --focus: ${color.accentText};
  position: relative;
  ${ivoryLeaf};
  padding: calc(clamp(64px, 7vw, 120px) * var(--sy)) 0;

  &::before {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 34%, transparent);
    pointer-events: none;
  }

  /* Two rows on the desk: the headline beside her words, then the card
     beside the book, each pair sharing a row so the labels line up and no
     column runs out halfway down the paper. */
  .desk {
    display: grid;
    grid-template-columns: minmax(460px, 0.95fr) minmax(0, 2fr);
    grid-template-areas:
      "intro words"
      "app book";
    column-gap: clamp(40px, 4.4vw, 104px);
    row-gap: clamp(36px, 3.4vw, 72px);
    align-items: start;
  }
  .intro {
    grid-area: intro;
  }
  /* Her words sit at the foot of the first row, just above the book they
     end up in; their attribution lines up with the lead's last line. */
  .words {
    grid-area: words;
    align-self: end;
  }
  .in-app {
    grid-area: app;
    align-self: center;
  }
  .book {
    grid-area: book;
  }
  h2 {
    margin: 0;
    font: 600 clamp(40px, 3.8vw, 84px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.primary};
    text-wrap: balance;
  }
  .lead {
    margin: clamp(16px, 1.4vw, 24px) 0 0;
    max-width: 34ch;
    font: 400 clamp(17px, 1.2vw, 22px) / 1.5 ${font.text};
    color: ${color.body};
    text-wrap: pretty;
  }
  /* What each object is: small, quiet, a short foil rule before it. */
  .label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 16px;
    font: 500 14px / 1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .label::before {
    content: "";
    width: 24px;
    height: 1px;
    background: ${color.warmGold};
  }
  /* The card is the app's own; its 10.5px chips are raised to the site's 13px floor. */
  .in-app .kicker {
    font-size: 13px;
  }
  .in-app .kicker.quiet {
    letter-spacing: 0.06em;
  }

  /* Her words, set wide across the top of the right column. */
  .words {
    margin: 0;
    padding-top: clamp(4px, 0.6vw, 12px);
  }
  .words blockquote {
    margin: 0;
    max-width: 50ch;
    font: italic 400 clamp(22px, 1.75vw, 38px) / 1.36 ${font.text};
    color: ${color.primary};
    text-wrap: pretty;
  }
  .words figcaption {
    margin: clamp(14px, 1.2vw, 20px) 0 0;
    max-width: 72ch;
    font: 400 14px / 1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .words figcaption b {
    font-weight: 500;
    color: ${color.accentText};
  }

  /* The book: the spread, and the sample books beside it as ruled rows. */
  .shelf {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: clamp(24px, 2.6vw, 56px);
    align-items: center;
  }
  .book img.spread {
    display: block;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 26px 30px rgba(42, 31, 24, 0.28));
  }
  .covers {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .covers a {
    display: grid;
    grid-template-columns: clamp(64px, 5vw, 128px) minmax(0, 1fr) auto;
    align-items: center;
    gap: clamp(14px, 1.2vw, 24px);
    min-height: 44px;
    padding: clamp(10px, 0.9vw, 18px) 0;
    border-top: 1px solid ${color.primaryLine};
    color: inherit;
    text-decoration: none;
    border-radius: 2px;
  }
  .covers li:last-child a {
    border-bottom: 1px solid ${color.primaryLine};
  }
  .covers a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 4px;
  }
  .covers img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 2px 4px 4px 2px;
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.12),
      0 12px 18px -12px rgba(42, 31, 24, 0.55);
    transition: transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .covers b {
    display: block;
    font: 600 clamp(19px, 1.3vw, 28px) / 1.15 ${font.display};
    color: ${color.primary};
    transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .covers small {
    display: block;
    margin-top: 3px;
    font: 400 13px / 1.35 ${font.body};
    color: ${color.bodyMuted};
  }
  .covers svg {
    width: 16px;
    height: 16px;
    color: ${color.accentText};
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .covers a:hover img {
      transform: translateY(-3px) rotate(-1.5deg);
    }
    .covers a:hover b {
      color: ${color.accent};
    }
    .covers a:hover svg {
      transform: translateX(4px);
    }
  }
  .covers a:active img {
    transform: scale(0.97);
  }
  .book ${TextAnchor} {
    margin-top: 8px;
    white-space: nowrap;
  }

  ${media.xl} {
    .desk {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    }
    .in-app {
      align-self: start;
    }
    .shelf {
      grid-template-columns: minmax(0, 1fr);
    }
    .covers {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0 18px;
    }
    .covers a {
      grid-template-columns: 64px minmax(0, 1fr);
    }
    .covers li:last-child a {
      border-bottom: 0;
    }
    .covers svg {
      display: none;
    }
  }
  ${media.md} {
    &::before {
      inset: 8px;
    }
    .desk {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "intro" "app" "words" "book";
    }
    .covers {
      grid-template-columns: minmax(0, 1fr);
    }
    .covers a {
      grid-template-columns: 72px minmax(0, 1fr) auto;
    }
    .covers li:last-child a {
      border-bottom: 1px solid ${color.primaryLine};
    }
    .covers svg {
      display: block;
    }
  }
`;

export default function CallBecomes() {
  const ref = useScene<HTMLElement>((root) => {
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".lead, .in-app"), {
      delay: 0.15,
      stagger: 0.12,
    });
    arrive(root.querySelectorAll(".words > *"), {
      trigger: root.querySelector(".words"),
      delay: 0.25,
    });
    arrive(
      root.querySelectorAll(
        ".book .label, .book img.spread, .covers li, .shelf > div > a",
      ),
      {
        trigger: root.querySelector(".book"),
        delay: 0.35,
      },
    );
  });

  return (
    <Section ref={ref} aria-labelledby="becomes-title">
      <Frame className="desk">
        <div className="intro">
          <h2 id="becomes-title">What one call becomes.</h2>
          <p className="lead">
            Ruth, the grandmother in our sample family, spent fourteen minutes
            on a call about her first summer on Elm Street. This is what her
            family has now.
          </p>
        </div>
        <div className="in-app">
          <p className="label">In the app</p>
          <MemoryCard
            memory={{
              photo: `/mission/${porch.photo}-640.webp`,
              chapter: porch.tags[1],
              minutes: "14 min",
              title: porch.title,
              date: porch.date,
              words,
              people: ["Walt", "Ruth"],
              teller: "Ruth",
              paper: "butter",
            }}
          />
        </div>

        <figure className="words">
          <p className="label">Her words</p>
          <blockquote>“{words}”</blockquote>
          <figcaption>
            <b>Grandma Ruth, {porch.date}.</b> The ums and false starts come out
            and every word she chose stays, with the word-for-word transcript
            kept underneath.
          </figcaption>
        </figure>

        <div className="book">
          <p className="label">In the book</p>
          <div className="shelf">
            <img
              className="spread"
              src="/book-objects/open-1200.webp"
              srcSet="/book-objects/open-640.webp 640w, /book-objects/open-1200.webp 1200w, /book-objects/open-1800.webp 1800w"
              sizes="(max-width: 860px) 92vw, (max-width: 1280px) 56vw, 42vw"
              width={1200}
              height={709}
              alt="The A Story book open at a spread: a chapter title on the left page, a photograph of a couple on their porch in 1952 on the right"
              loading="lazy"
              decoding="async"
            />
            <div>
              <ul className="covers" aria-label="Sample books">
                {BOOKS.map((b) => (
                  <li key={b.id}>
                    <a href={`/samples#${b.id}`}>
                      <img
                        src={`/book-objects/sample-${b.id}-360.webp`}
                        srcSet={`/book-objects/sample-${b.id}-360.webp 360w, /book-objects/sample-${b.id}-720.webp 720w`}
                        sizes="(max-width: 860px) 72px, 128px"
                        width={360}
                        height={360}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span>
                        <b>{b.name}</b>
                        <small>{b.kind}</small>
                      </span>
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
              <TextAnchor href="/samples">
                Open the sample books <ArrowIcon />
              </TextAnchor>
            </div>
          </div>
        </div>
      </Frame>
    </Section>
  );
}

/**
 * "See a real book" — three sample A Story books (added 2026-10-11).
 *
 * 2026-10-14 (Hallmark redesign): moved from straight after the hero to
 * straight after FamilyBook, the demo book it proves — ahead of the hero's
 * own explanation it read as a detour. The flat coloured rectangles became
 * the books' real front covers, captured from /samples into
 * public/book-objects/sample-<id>-{360,720}.webp, so the card and the book
 * it opens are the same object. (Re-capture if a /samples cover changes.)
 *
 * Each card is one book: its cover colour, who it is about, what kind of
 * book it is. A card opens /samples at that book (/samples#carolyn, …).
 * /samples is a self-contained page in public/samples/, outside the React
 * router, so the cards are plain anchors - a router Link would land on the
 * not-found route instead of leaving the app.
 *
 * Cards follow the Guides starters (gold hairline on top, serif title); the
 * action is the kit's text link. The families are fictional and the section
 * says so in one line, as /samples does.
 */
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import { useReveals } from "../kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  Note,
  SplitHead,
  Statement,
} from "../kit/kit.styles";
import { color, display, font, media, motion } from "../../../styles/theme";

const BOOKS = [
  {
    id: "carolyn",
    name: "Carolyn Bennett",
    kind: "A family memoir",
    line: "Baker, Holland, Michigan. Fifteen memories, in her own words.",
  },
  {
    id: "raymond",
    name: "Raymond Ortiz",
    kind: "A founder’s ledger",
    line: "Machinist and founder. Forty years of a shop, told by the family.",
  },
  {
    id: "tom",
    name: "Thomas Kessler",
    kind: "A veteran’s homecoming",
    line: "Army medic, then an ER nurse. Forty-one letters home.",
  },
];

const Section = styled(Chapter)`
  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 2.6vw, 40px);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: clamp(20px, 2vw, 28px);
    border-top: 1px solid color-mix(in srgb, ${color.gold} 72%, transparent);
    color: inherit;
    text-decoration: none;
  }
  .card:focus-visible {
    outline: 3px solid var(--focus, ${color.accentText});
    outline-offset: 6px;
  }
  /* The real front cover, set down on the table: square like the book, a
     hint of spine on the left, and capped by the screen's height so the
     shelf fits a laptop window with its captions. */
  .cover {
    position: relative;
    width: min(100%, 34svh, 340px);
    aspect-ratio: 1;
    border-radius: 2px 4px 4px 2px;
    overflow: hidden;
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.1),
      0 22px 36px -22px rgba(42, 31, 24, 0.6);
    transition:
      transform ${motion.slow},
      box-shadow ${motion.slow};
  }
  .cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cover::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 7%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.28),
      rgba(255, 255, 255, 0.06) 55%,
      transparent
    );
    pointer-events: none;
  }
  .card .kind {
    font: 600 12px/1.4 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .card h3 {
    margin-top: -6px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    letter-spacing: -0.012em;
    color: var(--ink, ${color.primary});
    transition: color ${motion.base};
  }
  .card p {
    font: 400 16px/1.6 ${font.body};
    color: var(--muted, ${color.bodyMuted});
    max-width: 34ch;
  }
  /* The kit's text action, as a span: the whole card is the link. */
  .open {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    min-height: 48px;
    font: 600 16px/1.3 ${font.body};
    color: var(--ink, ${color.primary});
    background: linear-gradient(currentColor, currentColor) 0
      calc(100% - 10px) / 100% 1px no-repeat;
    transition: background-size 460ms cubic-bezier(0.16, 1, 0.3, 1);
    align-self: flex-start;
  }
  .open svg {
    width: 16px;
    height: 16px;
  }
  @media (hover: hover) and (pointer: fine) {
    .card:hover .cover {
      transform: translateY(-6px) rotate(-0.6deg);
      box-shadow:
        0 1px 1px rgba(42, 31, 24, 0.1),
        0 34px 52px -26px rgba(42, 31, 24, 0.65);
    }
    .card:hover h3 {
      color: ${color.accentText};
    }
    .card:hover .open {
      background-size: 0 1px;
      background-position: 100% calc(100% - 10px);
    }
  }
  .fiction {
    margin-top: clamp(28px, 3vw, 44px);
    padding-top: 20px;
    border-top: 1px solid var(--line, ${color.primaryLine});
  }
  ${media.md} {
    .cards {
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(28px, 4vw, 40px);
    }
    /* On a phone the shelf becomes a list: cover left, words right. */
    .card {
      display: grid;
      grid-template-columns: 112px minmax(0, 1fr);
      grid-template-rows: auto auto auto 1fr;
      column-gap: 18px;
      row-gap: 6px;
      align-items: start;
    }
    .cover {
      grid-row: 1 / -1;
      width: 112px;
    }
    .card h3 {
      margin-top: 0;
    }
    .open {
      min-height: 40px;
    }
    .card p {
      max-width: 52ch;
    }
  }
`;

export default function SampleBooks() {
  const reveal = useReveals<HTMLElement>();
  return (
    <Section ref={reveal} $ground="paper" $tight aria-labelledby="samples-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>Sample books</Eyebrow>
            <Statement id="samples-title" data-lines>
              See a <em>real book.</em>
            </Statement>
          </div>
          <Lead data-rise>
            Three lives, three books, every page made the way A Story makes
            them: from conversations, the family’s photographs and the things
            everyone else remembered. Turn the pages.
          </Lead>
        </SplitHead>
        <ul className="cards">
          {BOOKS.map((b) => (
            <li key={b.id} data-rise>
              <a
                className="card"
                href={`/samples#${b.id}`}
                aria-label={`${b.name}: ${b.kind}. Open the sample book`}
              >
                <span className="cover" aria-hidden="true">
                  <img
                    src={`/book-objects/sample-${b.id}-360.webp`}
                    srcSet={`/book-objects/sample-${b.id}-360.webp 360w, /book-objects/sample-${b.id}-720.webp 720w`}
                    sizes="(max-width: 860px) 112px, 340px"
                    alt=""
                    width={360}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="kind">{b.kind}</span>
                <h3>{b.name}</h3>
                <p>{b.line}</p>
                <span className="open">
                  Open the book <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Note className="fiction" data-rise>
          Fictional families. Every page shows how a real A Story book is made.
        </Note>
      </Frame>
    </Section>
  );
}

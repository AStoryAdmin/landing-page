/**
 * "See a real book" — three sample A Story books, right after the hero
 * (added 2026-10-11). The visitor has just read that most of a life goes
 * undocumented; this is the first proof of what the alternative looks like,
 * before any explanation of calls or the app.
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
    cover: "#1e3962",
  },
  {
    id: "raymond",
    name: "Raymond Ortiz",
    kind: "A founder’s ledger",
    line: "Machinist and founder. Forty years of a shop, told by the family.",
    cover: "#1f3328",
  },
  {
    id: "tom",
    name: "Thomas Kessler",
    kind: "A veteran’s homecoming",
    line: "Army medic, then an ER nurse. Forty-one letters home.",
    cover: "#283f51",
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
  /* The closed book: its cloth colour, a fine foil frame, the name in ivory. */
  .cover {
    position: relative;
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: flex-end;
    padding: clamp(18px, 2vw, 28px);
    background: var(--cover);
    color: ${color.ivory};
    border-radius: 2px 6px 6px 2px;
    box-shadow:
      inset 6px 0 0 color-mix(in srgb, ${color.black} 22%, transparent),
      0 1px 1px rgba(42, 31, 24, 0.08),
      0 24px 40px -24px rgba(42, 31, 24, 0.55);
    transition:
      transform ${motion.slow},
      box-shadow ${motion.slow};
  }
  .cover::before {
    content: "";
    position: absolute;
    inset: clamp(10px, 1.1vw, 16px);
    left: clamp(16px, 1.6vw, 24px);
    border: 1px solid color-mix(in srgb, ${color.gold} 55%, transparent);
    pointer-events: none;
  }
  .cover b {
    display: block;
    font: 400 ${display.sm} / 1.15 ${font.display};
    letter-spacing: -0.012em;
    text-wrap: balance;
  }
  .cover small {
    display: block;
    margin-top: 8px;
    font: 500 11px/1.3 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${color.gold};
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
        inset 6px 0 0 color-mix(in srgb, ${color.black} 22%, transparent),
        0 1px 1px rgba(42, 31, 24, 0.08),
        0 36px 56px -26px rgba(42, 31, 24, 0.6);
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
    .cover {
      aspect-ratio: 16 / 9;
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
                style={{ "--cover": b.cover } as React.CSSProperties}
                aria-label={`${b.name}: ${b.kind}. Open the sample book`}
              >
                <span className="cover" aria-hidden="true">
                  <span>
                    <b>{b.name}</b>
                    <small>A Story</small>
                  </span>
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

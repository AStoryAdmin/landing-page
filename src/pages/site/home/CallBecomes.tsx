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
 *   - her words: set as the book sets them, with one line on what tidying
 *     does (it takes out ums and false starts; the transcript stays);
 *   - in the book: a real spread of the printed book, and the three sample
 *     books beneath it, each opening /samples at that book. /samples is a
 *     page in public/, outside the router, so these are plain anchors.
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

  .desk {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr) minmax(0, 1.28fr);
    gap: clamp(32px, 4vw, 88px);
    align-items: start;
  }
  h2 {
    margin: 0;
    font: 600 clamp(40px, 3.8vw, 80px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.primary};
    text-wrap: balance;
  }
  .lead {
    margin: clamp(16px, 1.4vw, 24px) 0 0;
    max-width: 32ch;
    font: 400 clamp(17px, 1.2vw, 21px) / 1.5 ${font.text};
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
  .in-app {
    margin-top: clamp(36px, 3.4vw, 60px);
  }
  /* The card is the app's own; only its 10.5px chips are raised to the site's 13px floor. */
  .in-app .kicker {
    font-size: 13px;
  }
  .in-app .kicker.quiet {
    white-space: normal;
    letter-spacing: 0.06em;
  }
  .words {
    padding-top: clamp(8px, 1.4vw, 28px);
  }
  .words blockquote {
    margin: 0;
    font: italic 400 clamp(22px, 1.75vw, 32px) / 1.38 ${font.text};
    color: ${color.primary};
    text-wrap: pretty;
  }
  .words .by {
    margin: 16px 0 0;
    font: 500 14px / 1.4 ${font.body};
    color: ${color.accentText};
  }
  .words .note {
    margin: clamp(20px, 2vw, 32px) 0 0;
    padding-top: 16px;
    border-top: 1px solid ${color.primaryLine};
    max-width: 36ch;
    font: 400 15px / 1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  .book img.spread {
    display: block;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 26px 30px rgba(42, 31, 24, 0.28));
  }
  .covers {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(14px, 1.4vw, 24px);
    margin: clamp(22px, 2vw, 34px) 0 0;
    padding: 0;
    list-style: none;
  }
  .covers a {
    display: grid;
    gap: 10px;
    color: inherit;
    text-decoration: none;
    border-radius: 2px;
  }
  .covers a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 6px;
  }
  .covers img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 2px 4px 4px 2px;
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.12),
      0 16px 24px -14px rgba(42, 31, 24, 0.55);
    transition: transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .covers b {
    display: block;
    font: 600 clamp(18px, 1.25vw, 22px) / 1.15 ${font.display};
    color: ${color.primary};
  }
  .covers small {
    display: block;
    margin-top: 3px;
    font: 400 13px / 1.35 ${font.body};
    color: ${color.bodyMuted};
  }
  @media (hover: hover) and (pointer: fine) {
    .covers a:hover img {
      transform: translateY(-5px) rotate(-1deg);
    }
  }
  .covers a:active img {
    transform: scale(0.98);
  }
  .book ${TextAnchor} {
    margin-top: 10px;
  }

  ${media.lg} {
    .desk {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .book {
      grid-column: 1 / -1;
    }
  }
  ${media.md} {
    &::before {
      inset: 8px;
    }
    .desk {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function CallBecomes() {
  const ref = useScene<HTMLElement>((root) => {
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".lead, .in-app"), { delay: 0.15, stagger: 0.12 });
    arrive(root.querySelectorAll(".words > *"), { trigger: root.querySelector(".words"), delay: 0.25 });
    arrive(root.querySelectorAll(".book .label, .book img.spread, .covers li, .book > a"), {
      trigger: root.querySelector(".book"),
      delay: 0.35,
    });
  });

  return (
    <Section ref={ref} aria-labelledby="becomes-title">
      <Frame className="desk">
        <div>
          <h2 id="becomes-title">What one call becomes.</h2>
          <p className="lead">
            Ruth, the grandmother in our sample family, spent fourteen minutes
            on the phone about her first summer on Elm Street. This is what her
            family has now.
          </p>
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
        </div>

        <figure className="words">
          <p className="label">Her words</p>
          <blockquote>“{words}”</blockquote>
          <figcaption className="by">Grandma Ruth, {porch.date}</figcaption>
          <p className="note">
            Lightly tidied: the ums and false starts come out, and every word
            she chose stays. The word-for-word transcript is kept underneath.
          </p>
        </figure>

        <div className="book">
          <p className="label">In the book</p>
          <img
            className="spread"
            src="/book-objects/open-1200.webp"
            srcSet="/book-objects/open-640.webp 640w, /book-objects/open-1200.webp 1200w, /book-objects/open-1800.webp 1800w"
            sizes="(max-width: 860px) 92vw, 40vw"
            width={1200}
            height={709}
            alt="The A Story book open at a spread: a chapter title on the left page, a photograph of a couple on their porch in 1952 on the right"
            loading="lazy"
            decoding="async"
          />
          <ul className="covers" aria-label="Sample books">
            {BOOKS.map((b) => (
              <li key={b.id}>
                <a href={`/samples#${b.id}`}>
                  <img
                    src={`/book-objects/sample-${b.id}-360.webp`}
                    srcSet={`/book-objects/sample-${b.id}-360.webp 360w, /book-objects/sample-${b.id}-720.webp 720w`}
                    sizes="(max-width: 860px) 30vw, 12vw"
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
                </a>
              </li>
            ))}
          </ul>
          <TextAnchor href="/samples">
            Turn the pages of a sample book <ArrowIcon />
          </TextAnchor>
        </div>
      </Frame>
    </Section>
  );
}

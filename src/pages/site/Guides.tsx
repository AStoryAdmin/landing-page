/**
 * Conversation guides — help families ask.
 *
 * The index is organised around the moment a reader recognises, not around
 * the library: four questions they could ask tonight, set like the app's
 * daily question; then the guides as an editorial table of contents; then,
 * folded away, the eleven chapters and the depth ladder for anyone who wants
 * to plan a longer conversation.
 *
 * Premium pass (2026-11-02, design spec §4D, S23): the opening is on the
 * paper, so the page reads as a library rather than another cloth hero. The
 * four questions are leaves with a hairline, no shadow (a light ground). The
 * guides are an editorial contents list, not a card grid: each row is the
 * guide's photograph as a 3:2 crop (guidePictures.ts, the one the guide opens
 * on), its title and one line, with a hairline between rows. Photograph left
 * and words right on a wide screen; photograph above on a phone.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import guides from "../../lib/guides.json";
import { CHAPTERS, DEPTHS } from "../../lib/product";
import { ArrowIcon, Invitation, PageOpening, Picture } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Chapter, Frame, Statement } from "./kit/kit.styles";
import {
  color,
  display,
  font,
  media,
  motion,
  space,
  type,
} from "../../styles/theme";
import { guidePicture } from "./guidePictures";

const STARTERS = [
  ["Everyday life", "What did an ordinary Sunday look like in your house?"],
  ["People", "Who made you feel at home when you were young?"],
  ["Work", "What did you learn that no one could have taught you?"],
  ["A photograph", "What happened just before this was taken?"],
];

/*
 * The four questions are the opening's object (jury 1 #6): question leaves
 * like the app's daily question. On the paper they are ivory sheets with a
 * hairline and the foil inset, flat (no shadow on a light ground, §3.4). The
 * sentence that follows them is said once, as the opening's note.
 */
const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(${space.md}, 2vw, 36px);
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
    padding: clamp(${space.lg}, 2.4vw, 40px);
    color: ${color.primary};
    background: ${color.ivory};
    border: 1px solid ${color.primaryLine};
    border-radius: 3px;
  }
  li::before {
    content: "";
    position: absolute;
    inset: 8px;
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  small {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  p {
    font: italic 400 ${display.sm} / 1.25 ${font.display};
    color: ${color.primary};
    text-wrap: pretty;
  }
  ${media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${media.sm} {
    gap: ${space.sm};
    li {
      padding: ${space.md};
    }
    li::before {
      inset: 6px;
    }
  }
`;
/*
 * On a phone the title is set as two lines (fix round 3). Free, it took one
 * line in Cormorant but two in the fallback serif while the font loaded, and
 * the question cards under it jumped 43px (CLS 0.12 at 390).
 */
const PhoneTitle = styled.div`
  display: contents;
  ${media.sm} {
    h1 .ln {
      display: block;
    }
  }
`;

const Index = styled(Chapter)`
  padding: calc(${space.section} * var(--sy)) 0;
  .head {
    margin-bottom: clamp(${space.xl}, 4vw, ${space.xxxl});
  }
  /* The contents list: the photograph, the title and one line, a hairline
     between rows. The guides are links; the last two rows open in place, so
     their arrow turns down and, once open, up. */
  .contents {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .entry {
    display: grid;
    grid-template-columns: minmax(160px, 0.32fr) minmax(0, 1fr) auto;
    gap: clamp(${space.lg}, 4vw, ${space.xxxl});
    align-items: center;
    padding: clamp(${space.lg}, 2.4vw, ${space.xl}) 0;
    border-top: 1px solid ${color.primaryLineStrong};
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  .entry img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  /* The rows without a photograph keep the same text column. */
  summary.entry {
    grid-template-columns: minmax(0, 1fr) auto;
    list-style: none;
  }
  summary.entry::-webkit-details-marker {
    display: none;
  }
  /* 8px between the stacked rows, each keeping its hairline on top
     (taste rule 20; round 3, B4 fix pass 2). */
  main[data-premium] & .contents {
    display: grid;
    row-gap: 8px;
  }
  main[data-premium] & details {
    margin-top: 8px;
  }
  .entry h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
    transition: color ${motion.base};
  }
  .entry p {
    margin-top: ${space.xs};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
    max-width: 62ch;
  }
  .entry .cat {
    display: block;
    margin-bottom: ${space.xs};
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  .entry svg {
    width: 20px;
    height: 20px;
    color: ${color.accentText};
  }
  ${media.hover} {
    .entry:hover h3 {
      color: ${color.accentText};
    }
  }
  summary.entry svg {
    rotate: 90deg;
    transition: rotate 240ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  details[open] summary.entry svg {
    rotate: -90deg;
  }
  details:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  ${media.motion} {
    summary.entry svg {
      transition: none;
    }
  }
  .topics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${space.lg} 40px;
    padding-bottom: ${space.xl};
  }
  .topics h4 {
    font: 600 ${type.ui} / 1.4 ${font.ui};
    color: ${color.primary};
  }
  .topics p {
    margin-top: 4px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.md} {
    a.entry {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.md};
    }
    a.entry svg {
      display: none;
    }
    .topics {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function Guides() {
  const index = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Conversation guides - A Story"
        path="/guides"
        description="Practical ways to begin family conversations, name the faces in photographs and make room for different recollections."
      />
      <PhoneTitle>
        <PageOpening
          variant="wide"
          ground="paper"
          title={
            <>
              <span className="ln">A place</span>{" "}
              <span className="ln">
                to <em>begin.</em>
              </span>
            </>
          }
          lead="Four questions you could ask tonight, and short guides for the conversations that take more care."
          note="Ask one, then follow the detail they choose to share."
          object={
            <Cards aria-label="Questions to begin with">
              {STARTERS.map(([topic, question]) => (
                <li key={topic}>
                  <small>{topic}</small>
                  <p>“{question}”</p>
                </li>
              ))}
            </Cards>
          }
        />
      </PhoneTitle>

      <Index ref={index} $ground="ivory" aria-labelledby="index-title">
        <Frame>
          <div className="head">
            <Statement id="index-title" data-lines>
              For the conversations that take more care.
            </Statement>
          </div>
          <ul className="contents" data-rise>
            {guides.map((g) => {
              const pic = guidePicture(g);
              return (
                <li key={g.slug} className="wide">
                  <Link className="entry" to={"/guides/" + g.slug}>
                    <Picture
                      id={pic.id}
                      alt=""
                      frame="crop"
                      sizes="(max-width: 860px) calc(100vw - 32px), 28vw"
                    />
                    <div>
                      <span className="cat">{g.category}</span>
                      <h3>{g.title}</h3>
                      <p>{g.thesis}</p>
                    </div>
                    <ArrowIcon />
                  </Link>
                </li>
              );
            })}
          </ul>

          <details>
            <summary className="entry">
              <div>
                <span className="cat">Planning a longer story</span>
                <h3>The eleven chapters of a life</h3>
                <p>
                  From where the family started to looking back: the chapters A
                  Story moves through, one at a time.
                </p>
              </div>
              <ArrowIcon />
            </summary>
            <div className="topics">
              {CHAPTERS.map((c) => (
                <div key={c.name}>
                  <h4>{c.name}</h4>
                  <p>{c.blurb}</p>
                </div>
              ))}
            </div>
          </details>
          <details>
            <summary className="entry">
              <div>
                <span className="cat">Pacing</span>
                <h3>Letting a conversation deepen at their pace</h3>
                <p>
                  Five steps, from an easy warm-up to what they would say now.
                  Go deeper only when they want to.
                </p>
              </div>
              <ArrowIcon />
            </summary>
            <div className="topics">
              {DEPTHS.map((d) => (
                <div key={d.level}>
                  <h4>{d.name}</h4>
                  <p>{d.blurb}</p>
                </div>
              ))}
            </div>
          </details>
        </Frame>
      </Index>
      <Invitation next={["/how-it-works", "/questions", "/samples"]} />
    </>
  );
}

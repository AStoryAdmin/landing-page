/**
 * Conversation guides — help families ask.
 *
 * The index is organised around the moment a reader recognises, not around
 * the library: four questions they could ask tonight, set on cards like the
 * app's daily question; then the guides as an editorial table of contents;
 * then, folded away, the eleven chapters and the depth ladder for anyone who
 * wants to plan a longer conversation.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import guides from "../../lib/guides.json";
import { CHAPTERS, DEPTHS } from "../../lib/product";
import { ArrowIcon, Invitation, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Chapter, Frame, Statement } from "./kit/kit.styles";
import {
  color,
  display,
  font,
  media,
  motion,
  shadow,
} from "../../styles/theme";

const STARTERS = [
  ["Everyday life", "What did an ordinary Sunday look like in your house?"],
  ["People", "Who made you feel at home when you were young?"],
  ["Work", "What did you learn that no one could have taught you?"],
  ["A photograph", "What happened just before this was taken?"],
];

/*
 * The four questions are the opening's object (jury 1 #6): question cards
 * laid on the cloth like the app's daily question, each a leaf of the book's
 * paper, a little turned. The sentence that follows them is said once, as
 * the opening's note.
 */
const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 36px);
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: clamp(180px, 15vw, 280px);
    padding: clamp(24px, 2.4vw, 40px);
    color: ${color.primary};
    background: ${color.paperPure};
    box-shadow: ${shadow.lie};
    transform: rotate(var(--turn));
  }
  li::before {
    content: "";
    position: absolute;
    inset: 9px;
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  small {
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  p {
    font: italic 400 clamp(1.35rem, 1.1rem + 0.8vw, 2.1rem) / 1.25
      ${font.display};
    color: ${color.primary};
    text-wrap: pretty;
  }
  ${media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${media.sm} {
    grid-template-columns: minmax(0, 1fr);
    li {
      min-height: 0;
    }
  }
  ${media.motion} {
    li {
      transform: none;
    }
  }
`;
const TURNS = ["-1.2deg", "0.8deg", "-0.5deg", "1.1deg"];

const Index = styled(Chapter)`
  .head {
    margin-bottom: clamp(36px, 4vw, 64px);
  }
  a.entry {
    display: grid;
    grid-template-columns: minmax(0, 0.45fr) minmax(0, 1fr) auto;
    gap: clamp(16px, 4vw, 64px);
    align-items: baseline;
    padding: clamp(24px, 2.6vw, 36px) 0;
    border-top: 1px solid ${color.primaryLineStrong};
    text-decoration: none;
    color: inherit;
  }
  /* The entry's own words slide a little under the pointer: transform only. */
  a.entry > * {
    transition: transform 240ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  a.entry h3 {
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  a.entry:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  @media (hover: hover) and (pointer: fine) {
    a.entry:hover > * {
      transform: translateX(12px);
    }
    a.entry:hover h3 {
      color: ${color.accentText};
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a.entry > * {
      transition: none;
    }
  }
  a.entry:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .cat {
    font: 600 13px/1.4 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  h3 {
    font: 400 ${display.sm} / 1.25 ${font.display};
    color: ${color.primary};
    transition: color ${motion.base};
  }
  .entry p {
    margin-top: 10px;
    font: 400 16px/1.6 ${font.text};
    color: ${color.body};
    max-width: 62ch;
  }
  .entry svg {
    width: 20px;
    height: 20px;
    color: ${color.accent};
  }
  details {
    margin-top: clamp(48px, 5vw, 80px);
    border-top: 1px solid ${color.primaryLineStrong};
  }
  details + details {
    margin-top: 0;
  }
  details:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  summary {
    min-height: 68px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  summary:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .topics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px 40px;
    padding-bottom: 32px;
  }
  .topics h4 {
    font: 600 16px/1.4 ${font.body};
    color: ${color.primary};
  }
  .topics p {
    margin-top: 4px;
    font: 400 15px/1.55 ${font.text};
    color: ${color.body};
  }
  ${media.md} {
    a.entry {
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }
    .entry svg {
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
      <PageOpening
        variant="wide"
        title={
          <>
            A place to <em>begin.</em>
          </>
        }
        lead="Four questions you could ask tonight, and short guides for the conversations that take more care."
        note="Ask one, then follow the detail they choose to share."
        object={
          <Cards aria-label="Questions to begin with">
            {STARTERS.map(([topic, question], i) => (
              <li key={topic} style={{ ["--turn" as string]: TURNS[i] }}>
                <small>{topic}</small>
                <p>“{question}”</p>
              </li>
            ))}
          </Cards>
        }
      />

      <Index ref={index} $ground="paper" aria-labelledby="index-title">
        <Frame>
          <div className="head">
            <Statement id="index-title" data-lines>
              For the conversations that take more <em>care.</em>
            </Statement>
          </div>
          {guides.map((g) => (
            <Link
              className="entry"
              key={g.slug}
              to={"/guides/" + g.slug}
              data-rise
            >
              <span className="cat">{g.category}</span>
              <div>
                <h3>{g.title}</h3>
                <p>{g.thesis}</p>
              </div>
              <ArrowIcon />
            </Link>
          ))}

          <details>
            <summary>The eleven chapters of a life</summary>
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
            <summary>Letting a conversation deepen at their pace</summary>
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
      <Invitation />
    </>
  );
}

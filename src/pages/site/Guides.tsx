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
import { Chapter, Eyebrow, Frame, Statement } from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

const STARTERS = [
  ["Everyday life", "What did an ordinary Sunday look like in your house?"],
  ["People", "Who made you feel at home when you were young?"],
  ["Work", "What did you learn that no one could have taught you?"],
  ["A photograph", "What happened just before this was taken?"],
];

const Starters = styled(Chapter)`
  padding-top: 0;
  .cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(14px, 1.6vw, 24px);
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 28px;
    min-height: 260px;
    padding: clamp(24px, 2.4vw, 34px);
    background: ${color.paperPure};
    box-shadow: 0 1px 1px rgba(42, 31, 24, 0.06), 0 18px 36px -26px rgba(42, 31, 24, 0.45);
  }
  .card small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .card p {
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  .card span {
    font: italic 400 15px/1.45 ${font.display};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    .cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    .cards {
      grid-template-columns: minmax(0, 1fr);
    }
    .card {
      min-height: 0;
    }
  }
`;

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
    transition: padding ${motion.slow};
  }
  a.entry:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  a.entry:hover {
    padding-left: 12px;
  }
  a.entry:hover h3 {
    color: ${color.accentText};
  }
  a.entry:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .cat {
    font: 600 12px/1.4 ${font.body};
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
    font: 400 16px/1.6 ${font.body};
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
    font: 400 15px/1.55 ${font.body};
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
  const starters = useReveals<HTMLElement>();
  const index = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Conversation guides — A Story"
        path="/guides"
        description="Practical ways to begin family conversations, name the faces in photographs and make room for different recollections."
      />
      <PageOpening
        eyebrow="Conversation guides"
        title={
          <>
            You don’t need a script for a life. You need a place to <em>begin.</em>
          </>
        }
        lead="Four questions you could ask tonight, and short guides for the conversations that take more care."
      />

      <Starters ref={starters} $ground="ivory" aria-label="Questions to begin with">
        <Frame className="cards">
          {STARTERS.map(([topic, question]) => (
            <article className="card" key={topic} data-rise>
              <small>{topic}</small>
              <p>“{question}”</p>
              <span>Then follow the detail they choose to share.</span>
            </article>
          ))}
        </Frame>
      </Starters>

      <Index ref={index} $ground="paper" aria-labelledby="index-title">
        <Frame>
          <div className="head">
            <Eyebrow>The guides</Eyebrow>
            <Statement id="index-title" data-lines>
              For the conversations that take more <em>care.</em>
            </Statement>
          </div>
          {guides.map((g) => (
            <Link className="entry" key={g.slug} to={"/guides/" + g.slug} data-rise>
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

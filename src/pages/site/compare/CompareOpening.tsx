/**
 * The opening of /compare.
 *
 * Fix round 2 (2026-10-23, jury 1 #4 #7 #10 #18): the opening no longer
 * replays Home's lake photograph and its four witness notes (with tinted
 * initial discs). The page's own object is the case itself: the four
 * reasons to choose A Story, written on a leaf of the book's paper lying on
 * the cloth, as ruled rows. They used to be a 2x2 grid of white cards further
 * down the page; said here once, they are not repeated.
 */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SWITCH } from "../../../lib/landscape";
import { PageOpening } from "../kit/kit";
import {
  color,
  display,
  font,
  media,
  shadow,
  space,
  type,
} from "../../../styles/theme";

/* Premium pass (spec §4B): the opening is the `wide` composition, so the
   leaf runs the width of the frame under the words, its four reasons in two
   columns from 861px. */
const Leaf = styled.div`
  position: relative;
  width: 100%;
  padding: clamp(28px, 3vw, 56px) clamp(26px, 3vw, 56px);
  color: ${color.primary};
  background: ${color.paperPure};
  box-shadow: ${shadow.lie};
  transform: rotate(-0.3deg);
  ${media.up.md} {
    ul {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: ${space.xxl};
    }
  }
  &::before {
    content: "";
    position: absolute;
    inset: clamp(8px, 0.8vw, 14px);
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  > * {
    position: relative;
  }
  h2 {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  ul {
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    padding: clamp(14px, 1.4vw, 20px) 0;
    border-top: 1px solid ${color.primaryLine};
  }
  h3 {
    font: 500 ${display.md} / 1.15 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 6px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  /* Round 3 (Builder 3, panel: Priya): one line for a library, school or
     care program, under the four reasons. It says only what A Story's
     archive is (faqData.ts "Who can see our stories?": private by default)
     and what StoryCorps is for in one phrase; nothing about its features. */
  .program {
    margin-top: clamp(14px, 1.4vw, 20px);
    padding-top: clamp(14px, 1.4vw, 20px);
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
    max-width: 62ch;
  }
  .program a {
    display: inline-block;
    padding: 4px 0;
    color: ${color.primary};
    font-weight: 600;
    text-underline-offset: 4px;
  }
  ${media.motion} {
    transform: none;
  }
`;

/* The fourth reason read "A book shouldn't be the end.", which frames the
   book as an ending (global rule). It gets the wording the spec approved for
   the same idea in the table (spec §4B, supervisor ruling); the body stays.
   lib/landscape.ts is left as it is. */
const REASONS = SWITCH.map((r) =>
  r.title.startsWith("A book shouldn")
    ? { ...r, title: "Keeps growing after the book." }
    : r,
);

export default function CompareOpening() {
  return (
    <PageOpening
      variant="wide"
      labelledBy="compare-title"
      title={
        <>
          The whole family’s <em>story.</em>
        </>
      }
      lead="Most products help one storyteller finish a book. A Story keeps everyone’s version of the same moment, side by side, and keeps growing after the book is printed."
      object={
        <Leaf>
          <h2>Four reasons to choose A Story</h2>
          <ul>
            {REASONS.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
          <p className="program">
            Running a program for a library, a school or a care community?
            StoryCorps is a public archive, not a private family one. A
            Story’s archive is private by default, and who may listen is
            agreed with you before anyone is called.{" "}
            <Link to="/organizations">A Story for organizations</Link>
          </p>
        </Leaf>
      }
    />
  );
}

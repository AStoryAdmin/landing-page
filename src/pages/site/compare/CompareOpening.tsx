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
import { SWITCH } from "../../../lib/landscape";
import { PageOpening } from "../kit/kit";
import { color, display, font, media, shadow, type } from "../../../styles/theme";

const Leaf = styled.div`
  position: relative;
  width: min(100%, 720px);
  padding: clamp(28px, 3vw, 56px) clamp(26px, 3vw, 56px);
  color: ${color.primary};
  background: ${color.paperPure};
  box-shadow: ${shadow.lie};
  transform: rotate(-0.6deg);
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
    letter-spacing: 0.16em;
    text-transform: uppercase;
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
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 6px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.motion} {
    transform: none;
  }
`;

export default function CompareOpening() {
  return (
    <PageOpening
      flip
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
            {SWITCH.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </Leaf>
      }
    />
  );
}

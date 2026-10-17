/**
 * The family loop — three steps, on the app's real screens (2026-10-16).
 *
 * Structure from the web app's PRD §3.3a, "Three ways to be in a story":
 * the storyteller answers (a call, or the page); the family joins with a
 * code or a link, reads what is shared and adds what they remember under
 * their own name, and the storyteller says yes before it appears; the wall
 * is one page anyone with the link can read, and the tree holds everyone's
 * portrait. The words are the app's own: "They read what's shared and add
 * what they remember, under their own name. Nobody writes as them."
 *
 * Screens are captured from the app (public/app, see kit/AppTour.tsx), shown
 * as themselves - a rounded screen with a hairline, cropped to the part that
 * proves the step: the call with its question, the memory page where the
 * family's additions wait for the storyteller, the tree with its portraits.
 * No drawn phones.
 */
import styled from "styled-components";
import { useReveals } from "../kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Lead,
  SplitHead,
  Statement,
} from "../kit/kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const STEPS = [
  {
    n: "I",
    shot: "talk",
    /* The call: A Story's question, and "Listening - just start talking". */
    at: "50% 42%",
    dark: true,
    title: "The storyteller answers.",
    text: "A call, or the page. Their words, in their name, in their own voice.",
  },
  {
    n: "II",
    shot: "memory",
    /* The memory page, where the family's additions wait: "2 waiting for you". */
    at: "50% 73%",
    dark: false,
    title: "The family adds what they remember.",
    text: "They read what’s shared and add what they remember, under their own name. Nobody writes as them. Nothing appears until the storyteller says yes.",
  },
  {
    n: "III",
    shot: "family-tree",
    /* The tree: Rose and Walt in the middle, the portraits around them. */
    at: "50% 58%",
    dark: false,
    title: "The wall, and the tree.",
    text: "One page anyone with the link can read, when the family turns it on. And a tree with everyone’s portrait, the way they are related.",
  },
];

const Section = styled(Chapter)`
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 48px);
  }
  li {
    display: grid;
    align-content: start;
  }
  /* A real screen, cropped to the part that proves the step, fading out. */
  .screen {
    width: min(100%, 320px);
    aspect-ratio: 860 / 980;
    margin: 0 auto;
    border-radius: 22px;
    overflow: hidden;
    background: ${color.paperPure};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 24px 40px -28px rgba(42, 31, 24, 0.5);
    mask-image: linear-gradient(#000 82%, transparent);
  }
  .screen[data-dark="true"] {
    background: ${color.night};
  }
  .screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .n {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: calc(26px * var(--sy)) 0 14px;
    padding-top: 18px;
    border-top: 1px solid var(--line, ${color.primaryLineStrong});
    font: 400 ${display.md} / 1 ${font.display};
    color: var(--mark, ${color.accent});
  }
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    letter-spacing: -0.012em;
    color: var(--ink, ${color.primary});
    margin-bottom: 10px;
    text-wrap: balance;
  }
  li > p:last-child {
    font: 400 16px/1.6 ${font.body};
    color: var(--muted, ${color.body});
    max-width: 34ch;
  }
  ${media.md} {
    ol {
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(32px, 5vw, 48px);
    }
    /* On a phone each step is a row: the screen beside its words. */
    li {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      column-gap: 18px;
      align-items: center;
    }
    .screen {
      grid-row: 1 / span 3;
      width: 100%;
      aspect-ratio: 860 / 1100;
    }
    .n {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
    li > p:last-child {
      max-width: none;
    }
  }
`;

export default function FamilyLoop() {
  const reveal = useReveals<HTMLElement>();
  return (
    <Section ref={reveal} $ground="ivory" id="the-family-loop" aria-labelledby="loop-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>The family loop</Eyebrow>
            <Statement id="loop-title" $size="lg" data-lines>
              One person tells it. The family <em>fills it in.</em>
            </Statement>
          </div>
          <Lead data-rise>
            Three ways to be in a story, and the app keeps them apart. The
            storyteller’s words stay theirs. Everyone else adds under their
            own name.
          </Lead>
        </SplitHead>
        <ol>
          {STEPS.map((s) => (
            <li key={s.n} data-rise>
              <figure className="screen" data-dark={s.dark}>
                <img
                  src={`/app/${s.shot}.webp`}
                  alt=""
                  width={860}
                  height={980}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: s.at }}
                />
              </figure>
              <p className="n">
                <span aria-hidden="true">{s.n}</span>
              </p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Frame>
    </Section>
  );
}

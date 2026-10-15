/**
 * "The easiest way for a whole family" — a way in for each person in a
 * family. Added 2026-10-09; rebuilt 2026-10-14 (taste-skill pass).
 *
 * The first version showed four app screens in a row and then a grid of
 * eight (later five) captioned features underneath: nine headings and nine
 * paragraphs in one section. The founder found it text heavy and hard to
 * follow, and it was — the reader had to match captions to screens.
 *
 * The section's own lead already names the people: "one who talks, one who
 * types, one far away and one with the shoebox". So the section asks the
 * reader which of them they are thinking of, and answers with one real
 * screen and two sentences. One picture and one paragraph on screen at a
 * time; everything the old grid said is still here, under the person it is
 * for.
 *
 * Every line is the app as of review-fixes 21f0365 (2026-10-09), in the
 * app's own words where it has them. If the app changes, change it here:
 *
 *   first conversation  lib/firstCall.js — 10 minutes, once, on us
 *   group calls         ea333a1 — up to four phones, ringing several people
 *   about the teller    content/questions.csv `about` column; credited to them
 *   family codes        HaveACodeRow.js — six characters, any email
 *   writing companion   createMemory/WriteHelper.js — "Tidy my words"
 *   memoir import       import screen — a file, or photographs of the pages
 *
 * Screens: public/app/*.webp (see kit/AppTour.tsx for where they come from).
 */
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import { useReveals } from "../kit/reveals";
import { Chapter, Frame, Lead, Statement } from "../kit/kit.styles";
import { color, font, media, motion } from "../../../styles/theme";

type Person = { who: string; shot: string; t: string; d: React.ReactNode };

const PEOPLE: Person[] = [
  {
    who: "The one who talks",
    shot: "talk",
    t: "They just talk.",
    d: "No typing, nothing to learn, nothing to save. A Story rings at the hour you choose and follows up like someone who knows them. The first conversation is on us: ten minutes, no card.",
  },
  {
    who: "The one far away",
    shot: "group-call",
    t: "Call the family together.",
    d: "Grandkids in three cities and Grandma at home, on one call. Up to four phones at once; everyone talks, and A Story turns what’s said into memories.",
  },
  {
    who: "The one who types",
    shot: "write",
    t: "A companion beside you.",
    d: "Stuck on a blank page? A Story offers a question to answer out loud, tidies spelling and full stops while your words stay yours, and suggests a title. If the connection drops mid-sentence, what you wrote stays on the phone.",
  },
  {
    who: "The one with the shoebox",
    shot: "import",
    t: "Bring in what’s already written.",
    d: (
      <>
        Already typed up forty pages, or kept the letters? Add the file or photograph the pages, and each chapter becomes
        a memory marked <q>From Rose’s memoir</q>. Nothing written down is ever typed twice.
      </>
    ),
  },
  {
    who: "Everyone else",
    shot: "family-tree",
    t: "Tell your part of the story.",
    d: (
      <>
        Aunts, cousins and old friends get questions turned around for them - <q>Which story about Rose gets told again
        and again?</q> What they add is credited to them, on one family tree. A six-letter code is all it takes to join.
      </>
    ),
  },
];

const Section = styled(Chapter)`
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: clamp(24px, 4vw, 72px);
    align-items: end;
    margin-bottom: calc(clamp(32px, 4vw, 64px) * var(--sy));
  }
  .head h2 {
    max-width: 24ch;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: clamp(28px, 4vw, 72px);
    align-items: center;
  }

  /* The people: names you choose, the answer opening under the one chosen. */
  .people {
    display: grid;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .person button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    min-height: 56px;
    padding: 10px 22px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    text-align: left;
    font: 400 clamp(1.3rem, 1.05rem + 0.8vw, 1.75rem) / 1.2 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primaryMid};
    cursor: pointer;
    transition:
      background-color ${motion.base},
      color ${motion.base};
  }
  .person button svg {
    flex: none;
    width: 18px;
    height: 18px;
    opacity: 0;
    transform: translateX(-6px);
    transition:
      opacity ${motion.base},
      transform ${motion.base};
  }
  @media (hover: hover) and (pointer: fine) {
    .person button:hover {
      color: ${color.primary};
    }
    .person button:hover svg {
      opacity: 0.6;
      transform: none;
    }
  }
  .person.on {
    background: ${color.ivoryDeep};
    border-radius: 4px;
  }
  .person.on button {
    color: ${color.primary};
    cursor: default;
  }
  .answer {
    padding: 0 22px 22px;
    animation: answer-in 360ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes answer-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
  }
  .answer h3 {
    font: 500 18px/1.35 ${font.body};
    color: ${color.accentText};
  }
  .answer p {
    margin-top: 6px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 54ch;
  }
  .answer q {
    font-style: italic;
  }
  .answer .inline-shot {
    display: none;
  }

  /* The screen: one at a time, on a field of sand, cropped to what matters. */
  .stage {
    display: grid;
    place-items: center;
    padding: calc(clamp(24px, 3vw, 44px) * var(--sy)) 24px 0;
    background: ${color.sand};
    border-radius: 4px;
    overflow: hidden;
  }
  .screen {
    width: min(100%, 300px, calc(58svh * 860 / 1300));
    aspect-ratio: 860 / 1300;
    margin: 0;
    border-radius: 22px 22px 0 0;
    overflow: hidden;
    background: ${color.paperPure};
    animation: answer-in 360ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .more {
    margin-top: calc(clamp(24px, 3vw, 44px) * var(--sy));
  }
  .more a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    font: 600 16px/1.3 ${font.body};
    color: ${color.primary};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
  }
  .more svg {
    width: 16px;
    height: 16px;
  }

  ${media.md} {
    .head,
    .body {
      grid-template-columns: minmax(0, 1fr);
    }
    .stage {
      display: none;
    }
    .person button,
    .answer {
      padding-inline: 14px;
    }
    .answer .inline-shot {
      display: block;
      width: min(100%, 260px);
      aspect-ratio: 860 / 1100;
      margin: 4px 0 16px;
      border-radius: 18px;
      overflow: hidden;
      background: ${color.paperPure};
    }
    .answer .inline-shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  ${media.motion} {
    .answer,
    .screen {
      animation: none;
    }
  }
`;

const shotSrc = (shot: string) => `/app/${shot}.webp`;

export default function EasiestWay() {
  const reveal = useReveals<HTMLElement>();
  const uid = useId();
  const [on, setOn] = useState(0);
  const p = PEOPLE[on];
  return (
    <Section ref={reveal} $ground="paper" aria-labelledby="easiest-title">
      <Frame>
        <div className="head">
          <Statement id="easiest-title" $size="lg" data-lines>
            The easiest way for a whole family to <em>keep its stories.</em>
          </Statement>
          <Lead>
            Every family has one who talks, one who types, one far away and one with the shoebox. A Story has a way in
            for each of them - and none of them has to be good with phones.
          </Lead>
        </div>

        <div className="body">
          <ul className="people">
            {PEOPLE.map((x, i) => (
              <li key={x.shot} className={`person${on === i ? " on" : ""}`}>
                <button
                  type="button"
                  aria-expanded={on === i}
                  aria-controls={`${uid}-answer-${i}`}
                  onClick={() => setOn(i)}
                >
                  {x.who}
                  <ArrowIcon />
                </button>
                {on === i && (
                  <div className="answer" id={`${uid}-answer-${i}`}>
                    <figure className="inline-shot" aria-hidden="true">
                      <img src={shotSrc(x.shot)} alt="" width={860} height={1100} loading="lazy" decoding="async" />
                    </figure>
                    <h3>{x.t}</h3>
                    <p>{x.d}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="stage" aria-hidden="true">
            <figure className="screen" key={p.shot}>
              <img src={shotSrc(p.shot)} alt="" width={860} height={1300} decoding="async" />
            </figure>
          </div>
        </div>

        <p className="more">
          <Link to="/how-it-works">
            See how it works <ArrowIcon />
          </Link>
        </p>
      </Frame>
    </Section>
  );
}

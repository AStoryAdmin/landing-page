/**
 * Many witnesses (2026-10-23): the family adds what they remember. Said
 * once on Home; until today it was said three times (EveryVoice, the
 * "One life. Many witnesses." band, FamilyLoop).
 *
 * One memory shows it: Grandpa Walt's lake monster, told on a call, and what
 * three of the family sent after it - Sarah's photos, Lily's voice note,
 * Uncle Ben's confession - each under their own name (lib/homeExamples.ts,
 * LAKE_MONSTER; a fictional family). The campfire print is the one the
 * memory is about. The facts are the product's: one link, no account
 * needed, nothing shown until the storyteller says yes. The privacy line
 * under it quotes /privacy's short version (components/privacy.tsx) word
 * for word: only your family sees it, never sold, never used to train AI.
 *
 * Ground: the teal cloth - the one teal scene on the page.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LAKE_MONSTER as M } from "../../../lib/homeExamples";
import { Frame } from "../kit/kit.styles";
import { Print } from "./bench";
import { tealCloth } from "../kit/cloth";
import { useScene } from "../../../lib/scrollMotion";
import { arrive, deal, layDown, lines } from "./motion";
import { color, font, media } from "../../../styles/theme";

const Section = styled.section`
  --ink: ${color.ivory};
  position: relative;
  ${tealCloth};
  color: ${color.ivory};
  padding: calc(clamp(64px, 7vw, 120px) * var(--sy)) 0;
  overflow: hidden;

  .room {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    gap: clamp(40px, 5vw, 110px);
    align-items: center;
  }
  .room figure {
    --border: clamp(9px, 0.8vw, 14px);
    --corner: clamp(20px, 1.8vw, 32px);
    --cap: clamp(18px, 1.3vw, 24px);
    --cap-ink: ${color.ivory};
    max-width: calc((100svh - 300px) * 1.33);
  }
  h2 {
    margin: 0;
    font: 600 clamp(38px, 3.5vw, 76px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.ivory};
    text-wrap: balance;
  }
  h2 em {
    font-style: normal;
    color: ${color.warmGold};
  }
  .lead {
    margin: clamp(16px, 1.4vw, 24px) 0 0;
    max-width: 44ch;
    font: 400 clamp(17px, 1.2vw, 21px) / 1.5 ${font.text};
    color: ${color.onDarkMuted};
    text-wrap: pretty;
  }
  /* What Walt said, then what the family sent: slips of paper laid on the cloth. */
  .slips {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(12px, 1.1vw, 20px);
    margin: clamp(26px, 2.4vw, 40px) 0 0;
    padding: 0;
    list-style: none;
  }
  .slip {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: clamp(14px, 1.2vw, 20px);
    background: ${color.paperPure};
    color: ${color.primary};
    border-radius: 2px;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.25),
      0 16px 26px -18px rgba(0, 0, 0, 0.6);
    transform: rotate(var(--tilt, 0deg));
  }
  .slip.teller {
    grid-column: 1 / -1;
    background: ${color.ivory};
  }
  .who {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  /* A monogram seal: the initial in a gold ring, never a tinted square. */
  .seal {
    flex: none;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid ${color.warmGold};
    box-shadow: inset 0 0 0 3px ${color.paperPure}, inset 0 0 0 4px color-mix(in srgb, ${color.warmGold} 55%, transparent);
    font: 600 16px / 1 ${font.display};
    color: ${color.primary};
  }
  .who b {
    display: block;
    font: 600 14px / 1.2 ${font.body};
    color: ${color.primary};
  }
  .who small {
    display: block;
    font: 400 13px / 1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .slip q {
    quotes: "“" "”";
    font: italic 400 clamp(16px, 1.05vw, 19px) / 1.42 ${font.text};
    color: ${color.primary};
  }
  .slip.teller q {
    font-size: clamp(19px, 1.35vw, 24px);
  }
  .kind {
    margin-top: auto;
    font: 500 13px / 1.3 ${font.body};
    color: ${color.accentText};
  }
  .yes {
    margin: clamp(18px, 1.6vw, 26px) 0 0;
    max-width: 62ch;
    font: 400 14px / 1.55 ${font.body};
    color: ${color.onDarkMuted};
    text-wrap: pretty;
  }
  /* The privacy promise, in /privacy's own words. A plain underline that
     follows the line if it wraps (never an inline-flex underline). */
  .yes a {
    color: ${color.ivory};
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, ${color.warmGold} 70%, transparent);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    white-space: nowrap;
    border-radius: 2px;
    transition: text-decoration-color 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .yes a:hover {
      text-decoration-color: ${color.warmGold};
    }
  }
  .yes a:focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 3px;
  }

  ${media.lg} {
    .room {
      grid-template-columns: minmax(0, 1fr);
    }
    .room figure {
      max-width: 720px;
    }
  }
  ${media.sm} {
    .slips {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const TILTS = ["-0.6deg", "0.8deg", "-0.4deg", "0.7deg"];

export default function Witnesses() {
  const ref = useScene<HTMLElement>((root) => {
    layDown(root.querySelectorAll(".room figure"));
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".lead"), { delay: 0.2 });
    deal(root.querySelectorAll(".slip"), {
      trigger: root.querySelector(".slips"),
      delay: 0.15,
      stagger: 0.12,
    });
    arrive(root.querySelectorAll(".yes"), { delay: 0.6 });
  });

  return (
    <Section ref={ref} id="kept" aria-labelledby="witness-title">
      <Frame className="room">
        <Print
          id={M.photo}
          alt="Grandpa telling a story around a campfire by the lake while Uncle Ben creeps up behind with a paddle"
          caption="The last night at the lake, August 2024"
          ratio="4 / 3"
          tilt={-1.4}
          sizes="(max-width: 1024px) 92vw, 48vw"
        />
        <div>
          <h2 id="witness-title">
            Every memory has more than one <em>witness.</em>
          </h2>
          <p className="lead">
            In the same sample family, Grandpa Walt told the lake monster story
            on a call. Then the people who were there added theirs, each under
            their own name, through one link and with no account needed.
          </p>
          <ul className="slips">
            <li className="slip teller" style={{ ["--tilt" as string]: TILTS[0] }}>
              <span className="who">
                <span className="seal" aria-hidden="true">
                  {M.teller.initial}
                </span>
                <span>
                  <b>{M.teller.name}</b>
                  <small>On a call</small>
                </span>
              </span>
              <q>{M.told}</q>
            </li>
            {M.added.map((a, i) => (
              <li className="slip" key={a.name} style={{ ["--tilt" as string]: TILTS[i + 1] }}>
                <span className="who">
                  <span className="seal" aria-hidden="true">
                    {a.initial}
                  </span>
                  <span>
                    <b>{a.name}</b>
                    <small>{a.role.replace("mum", "mom")}</small>
                  </span>
                </span>
                <q>{a.quote}</q>
                <span className="kind">+ {a.kind}</span>
              </li>
            ))}
          </ul>
          <p className="yes">
            Nothing appears in Walt’s story until he says yes. Only your family
            sees it. We never sell data, and we never train AI on your stories.{" "}
            <Link to="/privacy">How we keep it private</Link>
          </p>
        </div>
      </Frame>
    </Section>
  );
}

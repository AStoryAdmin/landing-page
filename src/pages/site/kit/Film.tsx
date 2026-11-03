/**
 * The film (design spec §2): one 49-second film, on /how-it-works only.
 *
 * A facade first: a poster button, and no <video> in the DOM, so not one
 * video byte loads before a tap. The tap swaps in the player and calls
 * play() inside the same click handler (flushSync, then play()), because
 * WebKit only allows sound when play() runs inside the user gesture. No
 * autoplay, no muted loop, no loop: on `ended` the last frame (the lockup)
 * holds and "Watch again" appears.
 *
 * Files come from public/film (encoded from the v5.6 masters in
 * a-story-demo-video/out). Captions and the transcript come from one source,
 * scripts/film-captions.mjs → a-story-film.en.vtt + lib/filmTranscript.json.
 * Captions ship OFF by default (spec D4): the film already sets its lines on
 * screen, and the transcript sits under the player.
 *
 * Nothing here describes the film's photographs (spec D11), and the posters
 * are UI and type only.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import transcript from "../../../lib/filmTranscript.json";
import { track } from "../../../lib/analytics";
import { Chapter, Frame, Note, Statement } from "./kit.styles";
import { color, font, media, motion, radius, shadow, type } from "../../../styles/theme";

const BASE = "/film";
const PORTRAIT = "(max-width: 600px)";

type Source = { src: string; poster: string };

/** Picks orientation and size once, inside the tap (spec §2.3). */
function pickSource(): Source {
  const dpr = window.devicePixelRatio || 1;
  if (window.matchMedia(PORTRAIT).matches) {
    return {
      src: `${BASE}/a-story-film-v-${dpr >= 2 ? 1080 : 720}.mp4`,
      poster: `${BASE}/poster-9x16.webp`,
    };
  }
  return {
    src: `${BASE}/a-story-film-${window.innerWidth * dpr >= 1600 ? 1080 : 720}.mp4`,
    poster: `${BASE}/poster-16x9.webp`,
  };
}

/* Lets the phone sticky bar (StickyStart, Builder 1) step aside while the
   film plays (spec §3.6): body[data-film-playing]. */
function setPlayingFlag(on: boolean) {
  if (on) document.body.setAttribute("data-film-playing", "");
  else document.body.removeAttribute("data-film-playing");
}

/** The credit, word for word, with its two addresses as links. */
const LINKS: Record<string, string> = {
  "creativecommons.org/licenses/by/3.0": "https://creativecommons.org/licenses/by/3.0/",
  "freepats.zenvoid.org": "https://freepats.zenvoid.org/",
};
function Credit() {
  const parts = transcript.credit.split(
    /(creativecommons\.org\/licenses\/by\/3\.0|freepats\.zenvoid\.org)/,
  );
  return (
    <>
      {parts.map((p, i) =>
        LINKS[p] ? (
          <a key={i} href={LINKS[p]} rel="noopener noreferrer" target="_blank">
            {p}
          </a>
        ) : (
          p
        ),
      )}
    </>
  );
}

const Section = styled(Chapter)`
  .film {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    grid-template-areas:
      "head player"
      "line player"
      ". under";
    column-gap: clamp(32px, 4vw, 80px);
    align-items: start;
  }
  .head {
    grid-area: head;
    align-self: end;
  }
  .line {
    grid-area: line;
    margin-top: 18px;
    max-width: 40ch;
  }
  .player {
    grid-area: player;
    justify-self: end;
    width: min(100%, 128svh);
  }
  .under {
    grid-area: under;
    width: min(100%, 128svh);
    justify-self: end;
    margin-top: 18px;
    display: grid;
    gap: 14px;
  }
  /* The CC BY credit (M2) as a caption, always shown: small type, the
     ground's muted ink, starting "Music:" (round 2, CHIEF-LOG B2.3). */
  .under > .credit {
    font: 400 ${type.label} / 1.5 ${font.ui};
    color: var(--muted, ${color.bodyMuted});
  }
  .credit a,
  details a {
    color: inherit;
    text-underline-offset: 0.2em;
  }
  ${media.md} {
    .film {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "head" "player" "line" "under";
    }
    .player,
    .under {
      justify-self: stretch;
      width: 100%;
    }
    .player {
      margin-top: 24px;
    }
    .line {
      margin-top: 18px;
    }
  }
`;

const Screen = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  background: ${color.chocolate};
  @media ${PORTRAIT} {
    aspect-ratio: 9 / 16;
    width: min(100%, calc(80svh * 9 / 16));
    margin-inline: auto;
  }
  video,
  picture,
  picture img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  video {
    background: ${color.chocolate};
  }
  /* While the poster is up, the facade rounds and clips its own picture
     and the frame stops clipping, so the facade's ring is drawn whole,
     outside its edge, on the section's paper (round 2, CHIEF-LOG B2.4).
     The player brings the frame's clip back. */
  &:has(> .film-facade) {
    overflow: visible;
  }
`;

const Facade = styled.button`
  all: unset;
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  cursor: pointer;
  .play {
    position: absolute;
    left: clamp(14px, 3%, 28px);
    bottom: clamp(14px, 4%, 28px);
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 6px 20px 6px 6px;
    border-radius: ${radius.pill};
    background: ${color.ivory};
    box-shadow: ${shadow.md};
    font: 600 ${type.ui} / 1.2 ${font.ui};
    color: ${color.primary};
    transition: transform ${motion.press};
  }
  .glyph {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: ${color.chocolate};
  }
  .glyph svg {
    width: 26px;
    height: 26px;
    margin-left: 4px;
    fill: ${color.ivory};
  }
  /* The shared ring (global.ts): var(--ring), set by the ground behind. */
  &:focus-visible {
    outline: 2px solid var(--ring, ${color.chocolate});
    outline-offset: 3px;
  }
  &:active .play {
    transform: scale(0.97);
  }
  ${media.hover} {
    &:hover .glyph {
      background: ${color.chocolateDeep};
    }
  }
  ${media.sm} {
    .glyph {
      width: 56px;
      height: 56px;
    }
  }
`;

const Again = styled.button`
  justify-self: start;
  padding: 12px 0;
  border: 0;
  background: none;
  cursor: pointer;
  font: 600 ${type.note} / 1.45 ${font.ui};
  color: var(--ink, ${color.primary});
  text-decoration: underline;
  text-underline-offset: 0.28em;
  &:focus-visible {
    outline: 2px solid var(--ring, ${color.chocolate});
    outline-offset: 3px;
  }
`;

const Transcript = styled.details`
  summary {
    cursor: pointer;
    padding: 10px 0;
    font: 600 ${type.note} / 1.45 ${font.ui};
    color: var(--ink, ${color.primary});
  }
  ol {
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }
  li {
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
    max-width: 64ch;
  }
  li b {
    font-weight: 600;
  }
  li.credit {
    margin-top: 6px;
    font: 400 ${type.note} / 1.55 ${font.ui};
    color: var(--muted, ${color.bodyMuted});
  }
`;

export default function Film({
  id = "film",
  actions,
}: {
  id?: string;
  /** The page's next step, under the transcript. */
  actions?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<Source | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => () => setPlayingFlag(false), []);

  const onPlay = () => {
    const next = pickSource();
    flushSync(() => setSource(next)); // <video> is in the DOM now
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* Leave the native controls visible; no error copy. */
    });
    v.focus();
    track("film_play", { src: next.src });
  };

  const again = () => {
    const v = videoRef.current;
    if (!v) return;
    setEnded(false);
    v.currentTime = 0;
    v.play().catch(() => {});
    v.focus();
  };

  return (
    <Section id={id} $ground="paper" $tight aria-labelledby={`${id}-title`}>
      <Frame className="film">
        <div className="head">
          <Statement id={`${id}-title`} $size="lg">
            Watch a call become a book.
          </Statement>
        </div>
        <Note className="line">
          A 49-second film. The Millers are a fictional family. Voices are
          synthetic.
        </Note>

        <div className="player">
          <Screen>
            {source ? (
              <video
                ref={videoRef}
                src={source.src}
                poster={source.poster}
                controls
                playsInline
                preload="none"
                onPlay={() => {
                  setEnded(false);
                  setPlayingFlag(true);
                }}
                onPause={() => setPlayingFlag(false)}
                onEnded={() => {
                  setEnded(true);
                  setPlayingFlag(false);
                  track("film_complete");
                }}
              >
                <track
                  kind="captions"
                  srcLang="en"
                  label="English"
                  src={`${BASE}/a-story-film.en.vtt`}
                />
              </video>
            ) : (
              <Facade
                type="button"
                className="film-facade"
                aria-label="Play the film, 49 seconds, with sound"
                onClick={onPlay}
              >
                <picture>
                  <source
                    media={PORTRAIT}
                    srcSet={`${BASE}/poster-9x16.webp`}
                    width={720}
                    height={1280}
                  />
                  <img
                    src={`${BASE}/poster-16x9.webp`}
                    srcSet={`${BASE}/poster-16x9-960.webp 960w, ${BASE}/poster-16x9.webp 1600w`}
                    sizes="(max-width: 860px) 92vw, 56vw"
                    width={1600}
                    height={900}
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <span className="play" aria-hidden="true">
                  <span className="glyph">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 3.5v17l14-8.5z" />
                    </svg>
                  </span>
                  Play the film · 49 s
                </span>
              </Facade>
            )}
          </Screen>
        </div>

        <div className="under">
          {ended && (
            <Again type="button" onClick={again}>
              Watch again
            </Again>
          )}
          <Note className="credit">
            <Credit />
          </Note>
          <Transcript>
            <summary>Read the transcript</summary>
            <ol>
              {transcript.lines.map((l) => (
                <li key={l.id}>
                  {l.speaker && <b>{l.speaker}: </b>}
                  {l.text}
                </li>
              ))}
              <li className="credit">
                <Credit />
              </li>
            </ol>
          </Transcript>
          {actions}
        </div>
      </Frame>
    </Section>
  );
}

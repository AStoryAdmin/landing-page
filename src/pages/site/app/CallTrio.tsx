/**
 * Three calls, side by side — press play on one and watch it run.
 *
 * The founder preferred an earlier version of this scene (Pass 9's demo
 * phones): each phone opens on a cover — the storyteller's photograph, the
 * line that makes you want to hear it, a Play button — and the call only
 * runs when you ask for it. Pass 11d's single-phone "film" autoplayed beside
 * a column of small chapter labels; it read as dry and wasted the width.
 *
 * Here the three phones fill the width, the mission's verbs (CM07) sit large
 * above them and light up as the playing call moves through them, and
 * everything else stays out of the way. One call plays at a time; the others
 * step back. On phones the three sit in a swipeable row.
 *
 * Complete without motion: with reduced motion, Play shows the finished call
 * at once. Every quoted line comes from `demoScripts.ts`; never paraphrase.
 * The voice layer is labelled as in development, as demoScripts.ts requires.
 */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SCENARIOS } from "../../../lib/demoScripts";
import { mission } from "../../../lib/mission";
import { Phone } from "./Phone";
import { CallScreen } from "./screens";
import { color, display, font, media } from "../../../styles/theme";

/** Which turns of each script show the behaviour, the words it turns on, and its photograph. */
const CALLS = [
  {
    id: "faith",
    behaviour: "Hears the aside",
    ask: 2,
    answer: 3,
    follow: 4,
    detail: "Even the winter she wouldn’t look at Father Dolan.",
    photo: "32",
  },
  {
    id: "childhood",
    behaviour: "Takes the no",
    ask: 6,
    answer: 7,
    follow: 8,
    detail:
      "I’d rather not go into what she had, if that’s all right with you.",
    photo: "16",
  },
  {
    id: "love",
    behaviour: "Follows the detail",
    ask: 2,
    answer: 3,
    follow: 4,
    detail: "All but one.",
    photo: "31",
  },
] as const;

/** The mission's verbs are the chapters of every call. */
const CHAPTERS = [
  { verb: "It asks.", ms: 4200, wait: 1300 },
  { verb: "It listens.", ms: 6200, wait: 1600 },
  { verb: "It follows.", ms: 5200, wait: 1400 },
  { verb: "It remembers.", ms: 4000, wait: 0 },
];
const START = CHAPTERS.map((_, i) =>
  CHAPTERS.slice(0, i).reduce((a, c) => a + c.ms, 0),
);
const TOTAL = START[3] + CHAPTERS[3].ms;

const reduced = () =>
  typeof window !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

function withDetail(text: string, detail: string) {
  const at = text.indexOf(detail);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{detail}</mark>
      {text.slice(at + detail.length)}
    </>
  );
}

const Trio = styled.div`
  .verbs {
    list-style: none;
    margin: 0 0 clamp(36px, 4vw, 64px);
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em 0.6em;
    font: 400 ${display.md} / 1.1 ${font.display};
    letter-spacing: -0.015em;
  }
  .verbs li {
    color: var(--muted);
    opacity: 0.72;
    transition:
      opacity 500ms,
      color 500ms;
  }
  .verbs li.on {
    opacity: 1;
    color: var(--ink);
  }
  .verbs li.now {
    color: var(--mark);
  }
  .phones {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 56px);
    align-items: start;
  }
  .call {
    display: grid;
    justify-items: center;
    gap: 22px;
    transition:
      opacity 500ms,
      transform 500ms;
  }
  .phones.has-active .call:not(.active) {
    opacity: 0.45;
    transform: scale(0.96);
  }
  .caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: min(360px, 100%);
  }
  .caption b {
    display: block;
    font: 400 24px/1.1 ${font.display};
    color: var(--ink);
  }
  .caption small {
    font: 500 14px/1.3 ${font.body};
    color: var(--label);
  }
  .ctl {
    display: grid;
    place-items: center;
    flex: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--ink);
    cursor: pointer;
  }
  .ctl:hover {
    border-color: var(--mark);
  }
  .ctl svg {
    width: 18px;
    height: 18px;
  }
  .ctl:focus-visible,
  .play:focus-visible {
    outline: 3px solid var(--mark);
    outline-offset: 4px;
  }

  /* The cover inside each phone, before the call is played. */
  .cover {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 7cqw 12cqw;
    background: ${color.primary};
    color: ${color.ivory};
    text-align: left;
  }
  .cover img {
    position: absolute;
    inset: 0 0 38%;
    width: 100%;
    height: 62%;
    object-fit: cover;
    filter: sepia(0.15);
  }
  .cover::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent 20%, ${color.primary} 62%);
  }
  .cover > * {
    position: relative;
  }
  .cover .chip {
    align-self: flex-start;
    padding: 1.4cqw 3cqw;
    border-radius: 99px;
    background: color-mix(in srgb, ${color.ivory} 16%, transparent);
    font: 600 3cqw/1 ${font.body};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .cover q {
    display: block;
    margin: 4cqw 0 3cqw;
    font: italic 400 6.2cqw/1.3 ${font.display};
  }
  .cover .by {
    font: 500 3.3cqw/1.3 ${font.body};
    color: ${color.onDarkMuted};
  }
  .play {
    display: inline-flex;
    align-items: center;
    gap: 3cqw;
    align-self: flex-start;
    margin-top: 7cqw;
    padding: 2.4cqw 5cqw 2.4cqw 2.4cqw;
    border: 0;
    border-radius: 99px;
    background: ${color.warmGold};
    color: ${color.primary};
    font: 700 3.8cqw/1 ${font.body};
    cursor: pointer;
  }
  .play i {
    display: grid;
    place-items: center;
    width: 9cqw;
    height: 9cqw;
    border-radius: 50%;
    background: ${color.primary};
    color: ${color.warmGold};
  }
  .play i svg {
    width: 4cqw;
    height: 4cqw;
  }

  ${media.md} {
    .phones {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      margin-inline: calc(var(--page-gutter) * -1);
      padding: 0 var(--page-gutter) 12px;
    }
    .call {
      flex: 0 0 78vw;
      scroll-snap-align: center;
    }
    .phones.has-active .call:not(.active) {
      transform: none;
    }
  }
`;

const Glyph = {
  play: <path d="M8 5l11 7-11 7z" />,
  pause: <path d="M8 5h3v14H8zM13 5h3v14h-3z" />,
  replay: (
    <path
      d="M12 5a7 7 0 1 1-6.6 4.7M5 4v5h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
};

export default function CallTrio() {
  const [active, setActive] = useState<number | null>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);

  // The playhead, for whichever call is playing.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      setT((prev) => {
        const next = prev + dt;
        if (next >= TOTAL) {
          setPlaying(false);
          return TOTAL;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const start = (i: number) => {
    setActive(i);
    if (reduced()) {
      setT(TOTAL);
      return;
    }
    setT(0);
    setPlaying(true);
  };
  const toggle = (i: number) => {
    if (active !== i || t >= TOTAL) return start(i);
    setPlaying((p) => !p);
  };

  const chapter =
    active === null
      ? -1
      : t >= TOTAL
        ? 3
        : START.filter((s) => t >= s).length - 1;
  const within = chapter < 0 ? 0 : t - START[chapter];
  const waiting = chapter >= 0 && t < TOTAL && within < CHAPTERS[chapter].wait;
  const stage = chapter === 3 ? 4 : waiting ? chapter : chapter + 1;
  const typing = waiting ? (chapter === 1 ? "them" : "ai") : undefined;

  return (
    <Trio>
      <ol className="verbs" aria-hidden="true">
        {CHAPTERS.map((c, i) => (
          <li
            key={c.verb}
            className={`${i <= chapter ? "on" : ""}${i === chapter ? " now" : ""}`}
          >
            {c.verb}
          </li>
        ))}
      </ol>
      <div className={`phones${active !== null ? " has-active" : ""}`}>
        {CALLS.map((c, i) => {
          const s = SCENARIOS.find((x) => x.id === c.id)!;
          const mine = active === i;
          const dim = mission[c.photo];
          return (
            <div key={c.id} className={`call${mine ? " active" : ""}`}>
              <Phone
                width="min(360px, 100%)"
                interactive
                label={`${s.teller}’s call in the A Story app`}
              >
                <CallScreen
                  teller={s.teller}
                  title={s.label}
                  chapter={s.chapter}
                  ask={s.script[c.ask].text}
                  answer={withDetail(s.script[c.answer].text, c.detail)}
                  follow={s.script[c.follow].text}
                  kept={[
                    "The card",
                    "The transcript",
                    "Voice · in development",
                  ]}
                  stage={mine ? stage : 0}
                  typing={mine ? typing : undefined}
                  progress={mine ? t / TOTAL : 0}
                  paused={!(mine && playing)}
                />
                {!mine && (
                  <div className="cover">
                    <img
                      src={`/mission/${c.photo}-640.webp`}
                      width={dim?.width}
                      height={dim?.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="chip">{s.chapter}</span>
                    <q>{s.cover.quote}</q>
                    <span className="by">{s.cover.attribution}</span>
                    <button
                      type="button"
                      className="play"
                      onClick={() => start(i)}
                    >
                      <i>
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {Glyph.play}
                        </svg>
                      </i>
                      Play the call
                    </button>
                  </div>
                )}
              </Phone>
              <div className="caption">
                <div>
                  <b>{s.teller}</b>
                  <small>{c.behaviour}</small>
                </div>
                {mine && (
                  <button
                    type="button"
                    className="ctl"
                    onClick={() => toggle(i)}
                    aria-label={
                      t >= TOTAL
                        ? `Play ${s.teller}’s call again`
                        : playing
                          ? "Pause"
                          : "Play"
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {t >= TOTAL
                        ? Glyph.replay
                        : playing
                          ? Glyph.pause
                          : Glyph.play}
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Trio>
  );
}

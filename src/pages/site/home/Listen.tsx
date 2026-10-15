/**
 * Listen — the mechanism, as three exchanges you can read in a glance.
 *
 * Hallmark redesign, 2026-10-14. This replaced ThreeCalls on the home page.
 * That scene put three tall phones side by side, each behind a Play button,
 * and the point — good listening changes the next question — only surfaced
 * a minute into an animation. On a 16" laptop it cost two full screens and
 * most visitors never pressed play.
 *
 * The point is three sentences long, so it is set as three sentences: what A
 * Story asked, what the person said (with the thing they let slip marked),
 * and what A Story asked next because of it. Each behaviour is one tab. No
 * device chrome, no autoplay; the whole exchange is on screen at once.
 *
 * The full phone demo is unchanged and still lives on How it works
 * (app/CallTrio.tsx), which shares the CALLS table below so the two can never
 * quote different turns. Every quoted line comes from `demoScripts.ts`; never
 * paraphrase. The voice layer is labelled as in development, as
 * demoScripts.ts requires.
 */
import { useId, useRef, useState, type KeyboardEvent } from "react";
import styled from "styled-components";
import { SCENARIOS } from "../../../lib/demoScripts";
import { CALLS } from "../app/calls";
import { ArrowIcon } from "../kit/kit";
import {
  Frame,
  SplitHead,
  Statement,
  TextLink,
  grounds,
} from "../kit/kit.styles";
import { riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media, motion } from "../../../styles/theme";

/** The three exchanges, resolved once from the shared table. */
const EXCHANGES = CALLS.map((c) => {
  const s = SCENARIOS.find((x) => x.id === c.id)!;
  const answer = s.script[c.answer].text;
  const at = answer.indexOf(c.detail);
  return {
    id: c.id,
    behaviour: c.behaviour,
    teller: s.teller,
    chapter: s.chapter,
    who: s.cover.attribution,
    watch: s.watch,
    ask: s.script[c.ask].text,
    before: at < 0 ? answer : answer.slice(0, at),
    detail: at < 0 ? "" : c.detail,
    after: at < 0 ? "" : answer.slice(at + c.detail.length),
    method: s.script[c.follow].method ?? "",
    follow: s.script[c.follow].text,
  };
});

const Scene = styled.section`
  --ink: ${grounds.teal.ink};
  --focus: ${grounds.teal.focus};
  --focus-halo: ${grounds.teal.focusHalo};
  --muted: ${grounds.teal.muted};
  --line: ${grounds.teal.line};
  --mark: ${grounds.teal.mark};
  --label: ${grounds.teal.label};
  background: ${color.teal};
  color: ${color.ivory};
  padding: calc(clamp(72px, 8vw, 132px) * var(--sy)) 0
    calc(clamp(64px, 7vw, 112px) * var(--sy));

  .head {
    margin-bottom: calc(clamp(32px, 4vw, 64px) * var(--sy));
  }
  .lead {
    font: 400 clamp(1.05rem, 1rem + 0.3vw, 1.25rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 2.2fr);
    gap: clamp(28px, 4vw, 72px);
    align-items: start;
  }

  /* ── The three behaviours ─────────────────────────────────────────── */
  [role="tablist"] {
    display: grid;
    gap: 2px;
    border-top: 1px solid var(--line);
  }
  [role="tab"] {
    display: grid;
    gap: 4px;
    width: 100%;
    padding: 18px 4px 18px 0;
    border: 0;
    border-bottom: 1px solid var(--line);
    background: none;
    text-align: left;
    color: var(--muted);
    cursor: pointer;
    transition: color ${motion.base};
  }
  [role="tab"] b {
    font: 400 clamp(1.15rem, 1rem + 0.45vw, 1.45rem) / 1.15 ${font.display};
    letter-spacing: -0.01em;
  }
  [role="tab"] small {
    font: 500 13px/1.3 ${font.body};
    letter-spacing: 0.02em;
    opacity: 0.85;
  }
  [role="tab"][aria-selected="true"] {
    color: ${color.ivory};
  }
  [role="tab"][aria-selected="true"] b {
    color: ${color.sand};
  }
  @media (hover: hover) {
    [role="tab"]:hover {
      color: ${color.ivory};
    }
  }

  /* ── The exchange ─────────────────────────────────────────────────── */
  .exchange {
    position: relative;
    display: grid;
    gap: calc(clamp(18px, 2.2vw, 30px) * var(--sy));
    margin: 0;
    padding: 0;
    list-style: none;
    animation: listen-in 320ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes listen-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }
  .turn {
    display: grid;
    grid-template-columns: 9.5rem minmax(0, 1fr);
    gap: 4px clamp(16px, 2vw, 32px);
    align-items: baseline;
  }
  .who {
    font: 600 11px/1.4 ${font.body};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--label);
  }
  .who span {
    display: block;
    margin-top: 6px;
    font: 500 12px/1.35 ${font.body};
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--muted);
  }
  .turn p {
    margin: 0;
    font-family: ${font.display};
    text-wrap: pretty;
  }
  .ask p {
    font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.3rem);
    line-height: 1.45;
    color: var(--muted);
  }
  .answer p {
    font-size: ${display.sm};
    line-height: 1.35;
    color: ${color.ivory};
  }
  /* The thing they let slip: marked the way a reader would mark it. */
  .answer mark {
    background: linear-gradient(
        transparent 62%,
        color-mix(in srgb, ${color.warmGold} 42%, transparent) 62%
      )
      no-repeat;
    color: ${color.sand};
  }
  .follow p {
    font-size: ${display.sm};
    line-height: 1.35;
    color: ${color.sand};
  }
  .follow .who {
    color: ${color.sand};
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px 32px;
    margin-top: calc(clamp(32px, 4vw, 56px) * var(--sy));
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  .kept {
    font: 500 13px/1.5 ${font.body};
    letter-spacing: 0.02em;
    color: var(--muted);
  }

  ${media.md} {
    .body {
      grid-template-columns: minmax(0, 1fr);
    }
    /* Stacked single-line rows: three labels side by side wrapped onto two
       lines each at phone width, and a control should never wrap. */
    [role="tab"] {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: baseline;
      gap: 12px;
      padding: 13px 0;
    }
    [role="tab"] b,
    [role="tab"] small {
      white-space: nowrap;
    }
    [role="tab"] b {
      font-size: 1.1rem;
    }
    [role="tab"] small {
      font-size: 12px;
    }
    .turn {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.motion} {
    .exchange {
      animation: none;
    }
  }
`;

export default function Listen() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
  });

  /* Arrow keys move between the behaviours, as a tab list should. */
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      e.key
    ];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + EXCHANGES.length) % EXCHANGES.length;
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  const x = EXCHANGES[active];
  return (
    <Scene ref={ref} id="listen" aria-labelledby="listen-title">
      <Frame>
        <SplitHead className="head">
          <Statement id="listen-title" $size="lg">
            Three calls. Nobody changes the <em>subject.</em>
          </Statement>
          <p className="lead">
            Some stories only appear because somebody asks twice. Here is the
            moment in each call where A Story drops its own question and goes
            after what was said.
          </p>
        </SplitHead>

        <div className="body">
          <div role="tablist" aria-label="Three calls" onKeyDown={onKey}>
            {EXCHANGES.map((e, i) => (
              <button
                key={e.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`${uid}-panel`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
              >
                <b>{e.behaviour}</b>
                <small>
                  {e.teller} · {e.chapter}
                </small>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${active}`}
          >
            <ol key={x.id} className="exchange">
              <li className="turn ask">
                <span className="who">A Story asks</span>
                <p>{x.ask}</p>
              </li>
              <li className="turn answer">
                <span className="who">
                  {x.teller}
                  <span>{x.who}</span>
                </span>
                <p>
                  {x.before}
                  {x.detail && <mark>{x.detail}</mark>}
                  {x.after}
                </p>
              </li>
              <li className="turn follow">
                <span className="who">
                  A Story follows
                  <span>{x.method}</span>
                </span>
                <p>{x.follow}</p>
              </li>
            </ol>
          </div>
        </div>

        <div className="foot">
          <p className="kept">
            Kept from every call: the card and the transcript. Voice · in
            development.
          </p>
          <TextLink to="/how-it-works#calls">
            Watch a whole call <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Scene>
  );
}

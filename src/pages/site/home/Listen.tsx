/**
 * Listen — the mechanism, shown as the one moment each call turns on.
 *
 * Replaced ThreeCalls on the home page (2026-10-14), then rebuilt the same
 * day: the first version set all three turns of each exchange as a
 * transcript — tabs, six small capitals labels, three paragraphs — and read
 * as a document, not a call. The founder called it very bad, and it was.
 *
 * The idea, from the taste-skill pass: the words the storyteller let slip
 * become the headline of the scene. Each call is one still: the photograph
 * from that call, one plain line saying what was asked, the slipped words
 * set large, and A Story's reply beneath. Pick Rosa, Errol or Joan. The
 * same section stands in for the three-phone player on How it works
 * (2026-10-14; app/CallTrio.tsx is now unused).
 *
 * Every quoted line comes from `demoScripts.ts` (the cover lead, the
 * attribution, the script turns), never paraphrased; `app/calls.ts` names
 * the turns and the slipped words. The voice layer is labelled as in
 * development, as demoScripts.ts requires.
 */
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styled from "styled-components";
import { SCENARIOS } from "../../../lib/demoScripts";
import { CALLS } from "../app/calls";
import { ArrowIcon, Picture } from "../kit/kit";
import { Frame, Statement, TextLink, grounds } from "../kit/kit.styles";
import { riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font, media, motion } from "../../../styles/theme";

const MOMENTS = CALLS.map((c) => {
  const s = SCENARIOS.find((x) => x.id === c.id)!;
  return {
    id: c.id,
    photo: c.photo,
    behaviour: c.behaviour,
    teller: s.teller,
    who: s.cover.attribution,
    lead: s.cover.lead,
    detail: c.detail,
    reply: s.script[c.follow].text,
  };
});

const Scene = styled.section`
  --ink: ${grounds.teal.ink};
  --focus: ${grounds.teal.focus};
  --focus-halo: ${grounds.teal.focusHalo};
  --mark: ${grounds.teal.mark};
  --label: ${grounds.teal.label};
  --muted: ${grounds.teal.muted};
  background: ${color.teal};
  color: ${color.ivory};
  padding: calc(clamp(72px, 8vw, 132px) * var(--sy)) 0;

  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 20px 48px;
    margin-bottom: calc(clamp(28px, 3.4vw, 52px) * var(--sy));
  }
  .top h2 {
    max-width: 21ch;
  }

  /* The three calls: names you can choose, said the way you would say them. */
  [role="tablist"] {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  [role="tab"] {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    min-height: 48px;
    padding: 12px 20px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, ${color.ivory} 9%, transparent);
    font: 400 17px/1.2 ${font.body};
    color: ${color.onDarkMuted};
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color ${motion.base},
      color ${motion.base};
  }
  [role="tab"] b {
    font: 500 18px/1.2 ${font.display};
    color: ${color.ivory};
  }
  [role="tab"][aria-selected="true"] {
    background: ${color.sand};
    color: ${color.primary};
  }
  [role="tab"][aria-selected="true"] b {
    color: ${color.primary};
  }
  @media (hover: hover) and (pointer: fine) {
    [role="tab"][aria-selected="false"]:hover {
      background: color-mix(in srgb, ${color.ivory} 16%, transparent);
    }
  }
  [role="tab"]:active {
    transform: scale(0.98);
  }

  /* The still: the photograph from that call beside the moment it turns on. */
  .still {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: clamp(28px, 4.4vw, 80px);
    align-items: center;
    animation: still-in 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes still-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  .photo {
    margin: 0;
    aspect-ratio: 4 / 5;
    max-height: 56svh;
    width: 100%;
    overflow: hidden;
    background: ${color.primary};
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: sepia(0.12) saturate(0.92);
  }
  .lead {
    font: 400 clamp(1.05rem, 1rem + 0.3vw, 1.25rem) / 1.55 ${font.body};
    color: ${color.ivory};
    max-width: 46ch;
  }
  blockquote {
    margin: calc(clamp(20px, 2.4vw, 36px) * var(--sy)) 0 0;
    font: 400 clamp(1.9rem, 1.2rem + 2.1vw, 2.6rem) / 1.15 ${font.display};
    letter-spacing: -0.015em;
    color: ${color.sand};
    text-wrap: balance;
    max-width: 22ch;
  }
  .said {
    margin-top: 14px;
    font: 400 16px/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .reply {
    margin-top: calc(clamp(22px, 2.6vw, 40px) * var(--sy));
    padding: 20px 24px 22px;
    background: color-mix(in srgb, ${color.night} 32%, transparent);
    max-width: 52ch;
  }
  .reply span {
    display: block;
    margin-bottom: 8px;
    font: 500 15px/1.3 ${font.body};
    color: ${color.gold};
  }
  .reply p {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.5 ${font.display};
    color: ${color.ivory};
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 32px;
    margin-top: calc(clamp(28px, 3.4vw, 52px) * var(--sy));
    font: 400 14px/1.5 ${font.body};
    color: ${color.onDarkMuted};
  }

  ${media.md} {
    .still {
      grid-template-columns: minmax(0, 1fr);
    }
    .photo {
      aspect-ratio: 16 / 10;
      max-height: none;
    }
    [role="tablist"] {
      width: 100%;
    }
    [role="tab"] {
      flex: 1 1 auto;
      justify-content: center;
      padding: 12px 14px;
    }
    [role="tab"] span {
      display: none;
    }
  }
  ${media.motion} {
    .still {
      animation: none;
    }
  }
`;

type Props = {
  /** Anchor id; How it works keeps its old #calls links. */
  id?: string;
  title?: ReactNode;
  /** Home links on to How it works; How it works has nowhere further to go. */
  more?: boolean;
};

export default function Listen({
  id = "listen",
  title = (
    <>
      Three calls. Nobody changes the <em>subject.</em>
    </>
  ),
  more = true,
}: Props) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
  });

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + MOMENTS.length) % MOMENTS.length;
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  const m = MOMENTS[active];
  return (
    <Scene ref={ref} id={id} aria-labelledby={`${uid}-title`}>
      <Frame>
        <div className="top">
          <Statement id={`${uid}-title`} $size="lg">
            {title}
          </Statement>
          <div role="tablist" aria-label="Three calls" onKeyDown={onKey}>
            {MOMENTS.map((x, i) => (
              <button
                key={x.id}
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
                <b>{x.teller}</b>
                <span>{x.behaviour.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active}`}>
          <div className="still" key={m.id}>
            <figure className="photo">
              <Picture id={m.photo} alt="" sizes="(max-width: 860px) 100vw, 42vw" />
            </figure>
            <div>
              <p className="lead">{m.lead}</p>
              <blockquote>“{m.detail}”</blockquote>
              <p className="said">{m.who}</p>
              <div className="reply">
                <span>A Story replied</span>
                <p>{m.reply}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="foot">
          <span>Kept from every call: the card and the transcript. Voice · in development.</span>
          {more && (
            <TextLink to="/how-it-works">
              How a call works <ArrowIcon />
            </TextLink>
          )}
        </div>
      </Frame>
    </Scene>
  );
}

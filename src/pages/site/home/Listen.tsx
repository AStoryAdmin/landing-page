/**
 * Listen — three calls, each told the way the lake-monster scene tells a
 * memory (EveryVoice): one object in the middle, the voices arriving around it.
 *
 * History. 2026-10-14 it replaced the three-phone player (still unused in
 * app/CallTrio.tsx); first as a transcript (too much like a document), then as
 * a photograph with a large quote (better, but static). The founder asked for
 * it to work like the lake monster, and that is the right model: there the
 * family's notes gather round the memory; here the call's own three turns
 * gather round the photograph it is about —
 *
 *   A Story asks      (top left)    the question
 *   Rosa answers      (right)       her answer, the words she let slip marked
 *   A Story follows   (bottom left) the reply that goes after those words
 *
 * 2026-10-15: the ask note went; the lead line already says what was asked,
 * and two notes read at a glance where three read as a transcript.
 *
 * The notes land one after another each time a call is chosen, so the
 * exchange plays in order without anyone pressing play. Pick Rosa, Errol or
 * Joan. Under 1024px the notes stack beneath the photograph.
 *
 * Every quoted line comes from `demoScripts.ts`, never paraphrased;
 * `app/calls.ts` names the turns and the slipped words. The voice layer is
 * labelled as in development, as demoScripts.ts requires - once, by the page
 * that holds this band (How it works, under its four moments).
 */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styled from "styled-components";
import { SCENARIOS } from "../../../lib/demoScripts";
import { CALLS } from "../app/calls";
import { ArrowIcon, Picture } from "../kit/kit";
import { Frame, Statement, TextLink, grounds } from "../kit/kit.styles";
import {
  gsap,
  riseLines,
  SplitText,
  useScene,
} from "../../../lib/scrollMotion";
import { color, font, media, motion } from "../../../styles/theme";

const CALL = CALLS.map((c) => {
  const s = SCENARIOS.find((x) => x.id === c.id)!;
  const answer = s.script[c.answer].text;
  const at = answer.indexOf(c.detail);
  const [name, about] = s.cover.attribution.split(" - ");
  return {
    id: c.id,
    photo: c.photo,
    behaviour: c.behaviour,
    teller: s.teller,
    name,
    about,
    lead: s.cover.lead,
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
  --mark: ${grounds.teal.mark};
  --label: ${grounds.teal.label};
  --muted: ${grounds.teal.muted};
  background: ${color.teal};
  color: ${color.ivory};
  padding: calc(clamp(72px, 8vw, 132px) * var(--sy)) 0;
  overflow: hidden;

  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 20px 48px;
  }
  .top h2 {
    max-width: 21ch;
  }
  .lead {
    margin-top: 14px;
    font: 400 clamp(1.1rem, 1.02rem + 0.35vw, 1.35rem) / 1.55 ${font.text};
    color: ${color.onDarkMuted};
    max-width: 52ch;
  }
  /* What these are, said where the names are: scripted samples. */
  .samples {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.gold};
  }

  /* The three calls. */
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
    font: 400 16px/1.2 ${font.body};
    color: ${color.onDarkMuted};
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color ${motion.base},
      color ${motion.base},
      transform ${motion.press};
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

  /* The table: the photograph in the middle, the turns laid round it. */
  .stage {
    position: relative;
    display: grid;
    place-items: center;
    /* Height-aware: the photograph and all three turns in one laptop screen. */
    min-height: clamp(420px, 50svh, 540px);
    max-width: 1180px;
    margin: calc(clamp(20px, 2.4vw, 40px) * var(--sy)) auto 0;
  }
  .print {
    position: relative;
    z-index: 1;
    width: min(280px, 22vw, 34svh);
    margin: 0;
    padding: 12px 12px 0;
    background: ${color.paperPure};
    transform: rotate(-1.5deg);
    box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.7);
  }
  .print .window {
    aspect-ratio: 4 / 4.6;
    overflow: hidden;
    background: ${color.primary};
  }
  .print img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: sepia(0.12) saturate(0.92);
  }
  .print figcaption {
    padding: 12px 4px 16px;
    font: italic 400 16px/1.35 ${font.display};
    color: ${color.primaryMid};
    text-align: center;
  }

  .note {
    position: absolute;
    z-index: 2;
    width: min(380px, 31vw);
    padding: 18px 22px 20px;
    background: ${color.paperPure};
    color: ${color.primary};
    border-top: 3px solid var(--tint);
    border-radius: 2px 2px 6px 6px;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.08),
      0 30px 54px -26px rgba(0, 0, 0, 0.6);
    /* Its own stacking context, so the highlighter can sit behind the words
       and still above the paper (also on narrow screens, where the note is
       static). */
    isolation: isolate;
  }
  .note.answer {
    --tint: ${color.accent};
    right: 2%;
    top: 6%;
    rotate: 1.6deg;
  }
  .note.follow {
    --tint: ${color.warmGold};
    left: 3%;
    top: 34%;
    rotate: -1.6deg;
  }
  .note header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  /* A person as a seal, as the app draws one: the initial in a gold ring
     (no tinted disc; jury 1 #18). */
  .note i {
    display: grid;
    flex: none;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font: 500 17px/1 ${font.display};
    font-style: normal;
    color: ${color.primary};
    background: ${color.paperPure};
    box-shadow:
      inset 0 0 0 1px ${color.gold},
      0 0 0 2px ${color.paperPure},
      0 0 0 3px color-mix(in srgb, ${color.gold} 45%, transparent);
  }
  .note b {
    display: block;
    font: 600 15px/1.2 ${font.body};
    color: ${color.primary};
  }
  .note small {
    display: block;
    margin-top: 2px;
    font: 500 13px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .note p {
    font: 400 17px/1.5 ${font.display};
    color: ${color.primary};
  }
  /* Her words are hers: set in the italic the site keeps for what people say. */
  .note.answer p {
    font-style: italic;
    font-size: 19px;
    line-height: 1.45;
  }
  .note mark {
    color: inherit;
    background: linear-gradient(
        color-mix(in srgb, ${color.warmGold} 50%, transparent),
        color-mix(in srgb, ${color.warmGold} 50%, transparent)
      )
      0 88% / 100% 0.42em no-repeat;
  }
  /* With motion, the phrase is split into words and the highlighter is drawn
     across them one word at a time (--hl, scaled from the left). The bar sits
     behind each word at the same height the gradient has above; without
     motion, no split happens and the gradient stands. */
  .note mark.split {
    background: none;
  }
  .note mark .w {
    position: relative;
  }
  .note mark .w::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: -0.06em;
    /* Reaches across the space to the next word, so the line is unbroken. */
    right: -0.3em;
    bottom: 0.15em;
    height: 0.42em;
    background: color-mix(in srgb, ${color.warmGold} 50%, transparent);
    transform: scaleX(var(--hl, 1));
    transform-origin: left center;
  }
  .note mark .w:last-of-type::before {
    right: -0.06em;
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 32px;
    margin-top: calc(clamp(20px, 2.4vw, 40px) * var(--sy));
    font: 400 14px/1.5 ${font.body};
    color: ${color.onDarkMuted};
  }

  ${media.lg} {
    .stage {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 18px;
      min-height: 0;
    }
    .print {
      align-self: center;
      width: min(280px, 72vw);
      margin-bottom: 10px;
    }
    .note {
      position: static;
      width: 100%;
      max-width: 560px;
      rotate: 0deg;
    }
    .note.answer {
      align-self: flex-end;
    }
  }
  ${media.md} {
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
`;

const reduced = () =>
  typeof window !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /*
   * The exchange, played in the order it happened, each time a call is
   * chosen (2026-10-16): the photograph is set down, her words arrive, the
   * highlighter runs over the words she let slip, and only after that pause
   * - A Story has heard them - does the follow-up land, from her side of the
   * table. The CSS keyframes this replaces landed both notes 420ms apart,
   * which read as a page loading rather than someone listening.
   *
   * First time through it waits for the reader to reach the table; after a
   * choice it plays at once. Under reduced motion nothing runs and the stage
   * stands complete, highlight and all.
   */
  const first = useRef(true);
  useEffect(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    const stage = root.querySelector<HTMLElement>(".stage");
    const mark = stage?.querySelector("mark");
    if (!stage) return;
    const ctx = gsap.context(() => {
      const split = mark
        ? SplitText.create(mark, {
            type: "words",
            tag: "span",
            wordsClass: "w",
            aria: "none",
          })
        : null;
      mark?.classList.add("split");
      // `first` flips only when the trigger has really fired, so a rehearsal
      // run of this effect (StrictMode) cannot use it up before anyone scrolls.
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: first.current
          ? {
              trigger: stage,
              start: "top 78%",
              once: true,
              onEnter: () => {
                first.current = false;
              },
            }
          : undefined,
      });
      tl.from(".print", {
        y: 18,
        opacity: 0,
        rotation: "-=2.5",
        duration: 1,
      }).from(".note.answer", { y: 24, opacity: 0, duration: 0.9 }, 0.3);
      if (split?.words.length) {
        tl.fromTo(
          split.words,
          { "--hl": 0 },
          { "--hl": 1, duration: 0.3, ease: "power1.inOut", stagger: 0.07 },
          ">-0.35",
        );
      }
      tl.from(
        ".note.follow",
        { y: 24, x: 12, opacity: 0, duration: 0.9 },
        "+=0.5",
      );
    }, stage);
    return () => {
      ctx.revert();
      mark?.classList.remove("split");
    };
  }, [active, ref]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      e.key
    ];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + CALL.length) % CALL.length;
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  const c = CALL[active];
  return (
    <Scene ref={ref} id={id} aria-labelledby={`${uid}-title`}>
      <Frame>
        <div className="top">
          <div>
            <Statement id={`${uid}-title`} $size="lg">
              {title}
            </Statement>
            <p className="lead">{c.lead}</p>
          </div>
          <div>
            <p className="samples" id={`${uid}-samples`}>
              Sample calls
            </p>
            <div
              role="tablist"
              aria-labelledby={`${uid}-samples`}
              onKeyDown={onKey}
            >
              {CALL.map((x, i) => (
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
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
        >
          <div className="stage" key={c.id}>
            <figure className="print">
              <div className="window">
                <Picture id={c.photo} alt="" sizes="300px" />
              </div>
              <figcaption>
                {c.name}, {c.about}
              </figcaption>
            </figure>

            <article className="note answer">
              <header>
                <i aria-hidden="true">{c.teller[0]}</i>
                <div>
                  <b>{c.name}</b>
                  <small>{c.about}</small>
                </div>
              </header>
              <p>
                “{c.before}
                {c.detail && <mark>{c.detail}</mark>}
                {c.after}”
              </p>
            </article>

            <article className="note follow">
              <header>
                <i aria-hidden="true">A</i>
                <div>
                  <b>A Story follows</b>
                  <small>{c.method}</small>
                </div>
              </header>
              <p>{c.follow}</p>
            </article>
          </div>
        </div>

        {/* What every call keeps, and that voice clips are in development, is
            said once, under How it works' four moments (jury 1 R2 #4). */}
        {more && (
          <div className="foot">
            <TextLink to="/how-it-works">
              How a call works <ArrowIcon />
            </TextLink>
          </div>
        )}
      </Frame>
    </Scene>
  );
}

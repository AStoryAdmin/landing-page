/**
 * Movement 3 — the mechanism, as the site's signature scene.
 *
 * "Three calls. Nobody changes the subject." is the previous live site's best
 * line (astoryapp.com) and the proof the whole product rests on: good
 * listening changes the next question. Pass 10 showed one call; one call
 * reads as a nice script. Three calls, each built on a different behaviour —
 * hearing an aside, taking a no, following a detail — read as a method.
 *
 * On wide screens the scene pins and plays one layer per verb: it asks, it
 * listens, it follows, it keeps. The verb is set large on the left, because
 * the verbs are what the reader should leave with; the call builds on an
 * ivory sheet on the right. Choosing another call swaps the words in place
 * without restarting the scroll. On phones and with reduced motion the sheet
 * simply reads top to bottom, with the verb labelled on each layer.
 *
 * Teal is the conversation colour (MAP.md), and this is the one full teal
 * scene on the site. Every quoted line comes from `demoScripts.ts`, which
 * production-contracts verifies is unchanged — never paraphrase the turns.
 */
import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SCENARIOS } from "../../../lib/demoScripts";
import { ArrowIcon } from "../kit/kit";
import { Eyebrow, Frame, SplitHead, Statement, TextLink, grounds } from "../kit/kit.styles";
import { gsap, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

/** Which turns of each script show the behaviour, and the words it turns on. */
const CALLS = [
  { id: "faith", behaviour: "Hears the aside", ask: 2, answer: 3, follow: 4, detail: "Even the winter she wouldn’t look at Father Dolan." },
  { id: "childhood", behaviour: "Takes the no", ask: 6, answer: 7, follow: 8, detail: "I’d rather not go into what she had, if that’s all right with you." },
  { id: "love", behaviour: "Follows the detail", ask: 2, answer: 3, follow: 4, detail: "All but one." },
] as const;

const VERBS = [
  { verb: "It asks.", line: "At the hour they chose. Nothing to prepare — they answer the phone and talk." },
  { verb: "It listens.", line: "Not for the answer it expected. For the thing said on the way to it." },
  { verb: "It follows.", line: "The way someone who knows them would — or, when they say no, it lets go." },
  { verb: "It keeps.", line: "A card to read, every word underneath it, and the voice itself." },
];

const Scene = styled.section`
  --ink: ${grounds.teal.ink};
  --muted: ${grounds.teal.muted};
  --line: ${grounds.teal.line};
  --mark: ${grounds.teal.mark};
  --label: ${grounds.teal.label};
  background: ${color.teal};
  color: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0 clamp(80px, 9vw, 140px);

  .calls-lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
  .picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0 clamp(20px, 3vw, 44px);
    border-bottom: 1px solid var(--line);
    margin-bottom: clamp(36px, 4vw, 56px);
  }
  .picker button {
    display: grid;
    gap: 4px;
    min-height: 72px;
    padding: 14px 0;
    border: 0;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    background: none;
    color: var(--muted);
    text-align: left;
    cursor: pointer;
    transition: color 300ms, border-color 300ms;
  }
  .picker b {
    font: 400 22px/1.2 ${font.display};
    color: inherit;
  }
  .picker small {
    font: 500 14px/1.3 ${font.body};
  }
  .picker button[aria-pressed="true"] {
    color: ${color.ivory};
    border-bottom-color: ${color.warmGold};
  }
  .picker button[aria-pressed="true"] small {
    color: ${color.gold};
  }
  .picker button:hover {
    color: ${color.ivory};
  }
  .picker button:focus-visible {
    outline: 3px solid ${color.warmGold};
    outline-offset: 4px;
  }

  .stage {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(32px, 6vw, 110px);
    align-items: center;
  }
  .verbs {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .verbs li + li {
    margin-top: 28px;
  }
  .verbs b {
    display: block;
    font: 400 ${display.lg} / 1.02 ${font.display};
    letter-spacing: -0.025em;
    color: ${color.ivory};
  }
  .verbs span {
    display: block;
    margin-top: 12px;
    font: 400 18px/1.55 ${font.body};
    color: var(--muted);
    max-width: 30ch;
  }
  /* Staged by the scroll scene: the verbs share one cell and cross-fade. */
  .verbs.is-staged {
    display: grid;
  }
  .verbs.is-staged li {
    grid-area: 1 / 1;
    margin: 0;
  }

  /* The call, set on a sheet of paper. */
  .sheet {
    background: ${color.paperPure};
    color: ${color.primary};
    padding: clamp(24px, 3vw, 44px);
    box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.55);
  }
  .sheet-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
    margin-bottom: 8px;
    border-bottom: 1px solid ${color.primaryLine};
    font: 500 14px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .sheet-head strong {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${color.primary};
    font-weight: 600;
  }
  .sheet-head strong::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${color.teal};
    box-shadow: 0 0 0 4px ${color.tealWash};
  }
  .turn {
    padding: 18px 0;
  }
  .turn + .turn {
    border-top: 1px solid ${color.primaryLine};
  }
  .turn small {
    display: block;
    margin-bottom: 8px;
    font: 600 12px/1.4 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .turn p {
    font: 400 17px/1.55 ${font.body};
    color: ${color.body};
  }
  .turn.answer p {
    font: 400 clamp(1.15rem, 1rem + 0.4vw, 1.35rem) / 1.5 ${font.display};
    color: ${color.primary};
  }
  .turn.follow p {
    font: italic 400 clamp(1.15rem, 1rem + 0.4vw, 1.35rem) / 1.45 ${font.display};
    color: ${color.teal};
  }
  mark {
    color: inherit;
    padding: 0 0.08em;
    background: linear-gradient(${color.goldWash}, ${color.goldWash}) 0 100% / var(--mark-size, 100%) 100% no-repeat;
    box-shadow: inset 0 -2px ${color.warmGold};
  }
  .kept {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
  .kept div {
    padding-top: 10px;
    border-top: 2px solid ${color.primary};
  }
  .kept h4 {
    font: 600 14px/1.3 ${font.body};
    color: ${color.primary};
    margin-bottom: 6px;
  }
  .soon {
    display: inline-block;
    margin-left: 4px;
    padding: 2px 6px;
    border: 1px solid currentColor;
    font: 600 10px/1.2 ${font.body};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .kept p {
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }

  .calls-foot {
    display: flex;
    justify-content: flex-end;
    margin-top: clamp(32px, 4vw, 56px);
  }

  ${media.md} {
    .stage {
      grid-template-columns: minmax(0, 1fr);
    }
    .verbs {
      display: none;
    }
    .kept {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

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

/** The first sentence of a longer note — the part that says why the voice is kept. */
const firstSentence = (s: string) => s.split(/(?<=[.—])\s/)[0];

export default function ThreeCalls({ pinned = true }: { pinned?: boolean }) {
  const [pick, setPick] = useState(2);
  const call = CALLS[pick];
  const story = SCENARIOS.find((s) => s.id === call.id)!;
  const sheet = useRef<HTMLDivElement>(null);

  const ref = useScene<HTMLElement>((root, { wide }) => {
    const verbs = gsap.utils.toArray<HTMLElement>(".verbs li", root);
    const layer = (n: number) => root.querySelectorAll(`[data-step="${n}"]`);

    if (!wide || !pinned) {
      gsap.utils.toArray<HTMLElement>(".sheet, [data-step]", root).forEach((el) =>
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }),
      );
      return;
    }

    // Wide: the verbs share one cell; the scroll plays the call one layer at a time.
    const list = root.querySelector(".verbs")!;
    list.classList.add("is-staged");
    gsap.set(verbs.slice(1), { autoAlpha: 0, y: 30 });
    gsap.set([2, 3, 4].map(layer), { autoAlpha: 0, y: 16 });
    gsap.set("mark", { "--mark-size": "0%" });

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.out" },
      scrollTrigger: {
        trigger: ".stage",
        start: "center center",
        end: "+=" + VERBS.length * 70 + "%",
        pin: true,
        scrub: 0.6,
      },
    });
    for (let n = 1; n < VERBS.length; n++) {
      tl.to(verbs[n - 1], { autoAlpha: 0, y: -30 }, n)
        .to(verbs[n], { autoAlpha: 1, y: 0 }, n)
        .to(layer(n + 1), { autoAlpha: 1, y: 0, stagger: 0.15 }, n);
      if (n === 1) tl.to("mark", { "--mark-size": "100%" }, n + 0.4);
    }
    tl.to({}, { duration: 0.5 });
    return () => list.classList.remove("is-staged");
  });

  // A new call arrives in place: a short settle, so the change is noticed.
  useLayoutEffect(() => {
    if (!sheet.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.fromTo(
      sheet.current.querySelectorAll(".turn p, .kept p"),
      { opacity: 0.2 },
      { opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" },
    );
    return () => {
      t.kill();
    };
  }, [pick]);

  return (
    <Scene ref={ref} id="listen" aria-labelledby="listen-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>The conversation</Eyebrow>
            <Statement id="listen-title" $size="xl">
              Three calls. Nobody changes the <em>subject.</em>
            </Statement>
          </div>
          <p className="calls-lead">
            Someone lets something slip on the way to answering a different
            question. A Story drops its own question and goes after it — the
            one thing a list of questions can never do.
          </p>
        </SplitHead>

        <div className="picker" aria-label="Choose a call">
          {CALLS.map((c, i) => {
            const s = SCENARIOS.find((x) => x.id === c.id)!;
            return (
              <button key={c.id} aria-pressed={pick === i} aria-controls="call-sheet" onClick={() => setPick(i)}>
                <b>{s.teller}</b>
                <small>{c.behaviour}</small>
              </button>
            );
          })}
        </div>

        <div className="stage">
          <ol className="verbs" aria-hidden="true">
            {VERBS.map((v) => (
              <li key={v.verb}>
                <b>{v.verb}</b>
                <span>{v.line}</span>
              </li>
            ))}
          </ol>

          <div className="sheet" id="call-sheet" ref={sheet} aria-live="polite">
            <div className="sheet-head" data-step="1">
              <strong>A Story · calling {story.teller}</strong>
              <span>{story.chapter}</span>
            </div>
            <div className="turn ask" data-step="1">
              <small>It asks</small>
              <p>{story.script[call.ask].text}</p>
            </div>
            <div className="turn answer" data-step="2">
              <small>{story.teller} · it listens</small>
              <p>{withDetail(story.script[call.answer].text, call.detail)}</p>
            </div>
            <div className="turn follow" data-step="3">
              <small>It follows</small>
              <p>{story.script[call.follow].text}</p>
            </div>
            <div className="turn" data-step="4">
              <small>It keeps</small>
              <div className="kept">
                <div>
                  <h4>The card</h4>
                  <p>“{story.label}” — a memory to read in a minute.</p>
                </div>
                <div>
                  <h4>The transcript</h4>
                  <p>Every word underneath it, exactly as it was said.</p>
                </div>
                <div>
                  {/* Voice runs ahead of the app (demoScripts.ts header): always marked. */}
                  <h4>
                    {story.clip.label} · {story.clip.duration} <span className="soon">In development</span>
                  </h4>
                  <p>{firstSentence(story.clip.note)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="calls-foot">
          <TextLink to="/how-it-works#calls">
            Read the complete conversations <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Scene>
  );
}

/**
 * The problem, in three rooms, as the past home told it (bd23f2f; Bao,
 * 2026-10-24: "the it's the everyday and other major effect was better the
 * last time"). Brought back with its effects, on today's brand: the app's
 * fonts, the chocolate bookcloth with the faint A under the everyday, and
 * the type floor (nothing under 14px; reading text 18-20px and up).
 *
 * 1. The milestones (ivory). "The wedding, the graduation, the first house"
 *    are the words a reader can touch: hover, focus or tap one and its print
 *    is pulled from the pile on the right and laid on top. Until someone
 *    touches them, the pile shuffles itself slowly while it is on screen.
 * 2. The everyday (the cloth). "It's the everyday." sits in a scatter of
 *    ordinary prints that drift at different depths as you scroll; then the
 *    three things that go missing, each a print with its line beneath.
 * 3. The catch (sand). The sheet curves up out of the cloth with "A Story
 *    exists to catch what the photograph can't", an ordinary photograph
 *    arrives with the story A Story caught behind it, and one plain sentence
 *    says how: set up once on their iPhone, A Story calls in its app.
 *
 * Every room is complete without motion: the pile shows the wedding on top
 * and still answers to hover; the scatter sits still; the catch is static.
 * The family is fictional (lib/homeExamples.ts).
 */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EVERYDAY, LOST, MILESTONES, QUIET } from "../../../lib/homeExamples";
import { mission } from "../../../lib/mission";
import { Picture } from "../kit/kit";
import { Frame } from "../kit/kit.styles";
import { chocolateCloth } from "../kit/cloth";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { drift } from "../kit/reveals";
import { color, font, media, motion } from "../../../styles/theme";
import { QUESTION_COUNT } from "../../../lib/product";

/* ── 1. The milestones ─────────────────────────────────────────────────── */

const Milestones = styled.section`
  position: relative;
  z-index: 1;
  background: ${color.ivory};
  padding: calc(clamp(72px, 8vw, 150px) * var(--sy)) 0
    calc(clamp(80px, 9vw, 160px) * var(--sy));

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    gap: clamp(40px, 5vw, 110px);
    align-items: center;
  }
  /* The sentence runs on from the heading (the three words) into the line
     after it, at the same size: two short blocks rather than one long head. */
  h2,
  .after {
    font: 600 clamp(2rem, 1.2rem + 2.9vw, 6.5rem) / 1.12 ${font.display};
    letter-spacing: -0.015em;
    color: ${color.primary};
    text-wrap: balance;
  }
  .after {
    margin-top: 0.12em;
    color: ${color.body};
  }
  /* Only the milestone word is live, and it changes colour - no underline.
     At rest the three words sit in a quieter brown so they read as a set;
     the one on top of the pile turns terracotta. */
  h2 button {
    all: unset;
    white-space: nowrap;
    cursor: pointer;
    color: ${color.primaryLight};
    transition: color ${motion.base};
  }
  h2 button[aria-pressed="true"] {
    color: ${color.accentText};
  }
  @media (hover: hover) and (pointer: fine) {
    h2 button:hover {
      color: ${color.accentText};
    }
  }
  h2 button:active {
    opacity: 0.8;
  }
  h2 button:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 4px;
    border-radius: 2px;
  }
  .keep {
    white-space: nowrap;
  }

  .pile {
    position: relative;
    height: clamp(380px, min(36vw, 62svh), 780px);
  }
  .card {
    position: absolute;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    padding: clamp(10px, 1vw, 16px) clamp(10px, 1vw, 16px) clamp(52px, 4vw, 66px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.08),
      0 30px 50px -28px rgba(42, 31, 24, 0.55);
    will-change: transform;
  }
  .card img {
    display: block;
    width: auto;
    height: auto;
    max-height: clamp(260px, min(27vw, 46svh), 600px);
    max-width: clamp(260px, 30vw, 640px);
    filter: sepia(0.08);
  }
  .card figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: clamp(12px, 1.1vw, 18px);
    text-align: center;
    font: 500 clamp(22px, 1.1rem + 0.4vw, 28px) / 1 ${font.script};
    color: ${color.primary};
  }

  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    h2,
    .after {
      font-size: clamp(26px, 7.4vw, 40px);
    }
    .pile {
      height: 420px;
    }
    .card img {
      max-width: 66vw;
      max-height: 300px;
    }
  }
`;

/** Where each print lies in the pile, from the top down. */
const POSE = [
  { rotate: -1.5, xPercent: 0, yPercent: 0 },
  { rotate: 5, xPercent: 9, yPercent: 3 },
  { rotate: -7, xPercent: -10, yPercent: 5 },
];

function MilestonePile() {
  const [top, setTop] = useState(0);
  const order = useRef([0, 1, 2]);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const touched = useRef(false);

  const place = (animateFrom?: number) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    order.current.forEach((card, depth) => {
      const el = cards.current[card];
      if (!el) return;
      el.style.zIndex = String(10 - depth);
      if (reduce) {
        gsap.set(el, POSE[depth]);
      } else if (card === animateFrom) {
        // Pulled out to the side, then set down on top.
        gsap
          .timeline()
          .to(el, { xPercent: 62, rotate: 9, duration: 0.36, ease: "house-move" })
          .set(el, { zIndex: 20 })
          .to(el, { ...POSE[depth], duration: 0.7, ease: "house-out" });
      } else {
        gsap.to(el, { ...POSE[depth], duration: 0.8, ease: "house-out" });
      }
    });
  };

  const bring = (i: number, byHand = true) => {
    if (byHand) touched.current = true;
    if (order.current[0] === i) return;
    order.current = [i, ...order.current.filter((x) => x !== i)];
    setTop(i);
    place(i);
  };

  // The headline holds live buttons, so it rises whole rather than by line.
  const ref = useScene<HTMLElement>((el) => {
    gsap.from(el.querySelectorAll("h2, .after, .card"), {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "house-out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
    });
  });

  useEffect(() => {
    place();
    // Until someone touches the words, the pile shuffles itself slowly, so
    // the words read as something to try - only while it is on screen.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearInterval(timer);
        if (!e.isIntersecting) return;
        timer = window.setInterval(() => {
          if (touched.current) return window.clearInterval(timer);
          bring((order.current[0] + 1) % MILESTONES.length, false);
        }, 2800);
      },
      { threshold: 0.5 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Milestones ref={ref} id="why-a-story" aria-labelledby="lost-title">
      <Frame className="grid">
        <div>
        <h2 id="lost-title">
          {MILESTONES.map((m, i) => (
            <span key={m.photo} className="keep">
              {m.article}{" "}
              <button
                type="button"
                aria-pressed={top === i}
                aria-controls="milestone-pile"
                onMouseEnter={() => bring(i)}
                onFocus={() => bring(i)}
                onClick={() => bring(i)}
              >
                {m.word}
              </button>
              {i < MILESTONES.length - 1 ? "," : ""}
            </span>
          )).flatMap((el, i) => (i ? [" ", el] : [el]))}{" "}
          -
        </h2>
        <p className="after">the milestones usually survive.</p>
        </div>
        <div className="pile" id="milestone-pile" aria-live="polite">
          {MILESTONES.map((m, i) => (
            <figure
              key={m.photo}
              className="card"
              ref={(el) => {
                cards.current[i] = el;
              }}
              aria-hidden={top !== i}
              style={{ zIndex: 10 - i, transform: `rotate(${POSE[i].rotate}deg)` }}
            >
              <Picture id={m.photo} alt={m.alt} sizes="(max-width: 860px) 80vw, 480px" />
              <figcaption>{m.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Frame>
    </Milestones>
  );
}

/* ── 2. The everyday ───────────────────────────────────────────────────── */

const Everyday = styled.section`
  position: relative;
  ${chocolateCloth};
  color: ${color.onDark};
  overflow: hidden;

  /* Height-aware: the prints are placed in percentages, so the pile simply
     packs a little tighter on a short screen. */
  .collage {
    position: relative;
    height: clamp(560px, min(72vw, 90svh), 1080px);
  }
  .collage h2 {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0.3em 0.6em;
    text-align: center;
    white-space: nowrap;
    font: 600 clamp(3.4rem, 1rem + 7.4vw, 10rem) / 1 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.onDark};
  }
  .collage h2::before {
    /* a pool of the cloth's own shade behind the words, so they never sit on a print */
    content: "";
    position: absolute;
    inset: -40% -14%;
    z-index: -1;
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, ${color.chocolate} 92%, transparent) 50%,
      transparent
    );
  }
  .collage h2 b {
    font-weight: 600;
    color: ${color.gold};
  }
  .snap {
    position: absolute;
    padding: clamp(5px, 0.5vw, 9px);
    background: ${color.paperPure};
    box-shadow: 0 24px 40px -20px rgba(0, 0, 0, 0.7);
  }
  .snap img {
    display: block;
    width: 100%;
    height: auto;
    filter: sepia(0.1) saturate(0.9);
  }

  .moments {
    padding: calc(clamp(40px, 4vw, 80px) * var(--sy)) 0
      calc(clamp(120px, 12vw, 220px) * var(--sy));
  }
  .moments ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(32px, 4.4vw, 88px);
    align-items: start;
  }
  .moments li:nth-child(2) {
    margin-top: calc(clamp(24px, 5vw, 120px) * var(--sy));
  }
  .polaroid {
    margin: 0 0 clamp(26px, 2.6vw, 40px);
    padding: clamp(10px, 0.9vw, 16px) clamp(10px, 0.9vw, 16px) 0;
    background: ${color.paperPure};
    box-shadow: 0 30px 50px -26px rgba(0, 0, 0, 0.75);
    transform: rotate(var(--tilt));
  }
  .polaroid .window {
    aspect-ratio: 4 / 3.1;
    overflow: hidden;
  }
  .polaroid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .polaroid figcaption {
    padding: clamp(12px, 1.1vw, 18px) 4px clamp(14px, 1.3vw, 20px);
    font: 500 clamp(22px, 1.1rem + 0.4vw, 28px) / 1 ${font.script};
    color: ${color.primary};
  }
  .moments .line {
    font: 600 clamp(1.6rem, 1.2rem + 0.9vw, 2.5rem) / 1.2 ${font.display};
    color: ${color.onDark};
    text-wrap: pretty;
  }
  .moments .more {
    margin-top: 14px;
    font: 400 clamp(18px, 1rem + 0.3vw, 22px) / 1.55 ${font.text};
    color: ${color.onDarkMuted};
    max-width: 36ch;
  }

  ${media.md} {
    .collage {
      height: 600px;
    }
    .collage h2 {
      font-size: 11.6vw;
    }
    .collage .snap:nth-child(n + 8) {
      display: none;
    }
    .moments ol {
      grid-template-columns: minmax(0, 1fr);
      gap: 64px;
    }
    .moments li:nth-child(2) {
      margin-top: 0;
    }
    .polaroid {
      width: min(88%, 440px);
    }
  }
`;

/** Where each everyday print lies: left/top in %, width in vw, tilt, drift speed. */
const SCATTER: [number, number, number, number, number][] = [
  [3, 6, 15, -6, 0.6],
  [22, 2, 12, 4, 1.1],
  [74, 4, 14, 7, 0.8],
  [87, 30, 12, -5, 1.3],
  [2, 44, 13, 5, 1.2],
  [66, 64, 16, -4, 0.7],
  [34, 70, 13, 6, 1.0],
  [44, 3, 10, -3, 1.4],
  [14, 76, 11, -8, 0.9],
  [85, 72, 11, 8, 1.2],
  [56, 36, 9, 10, 1.5],
  [30, 38, 8, -9, 1.6],
];

function EverydayRoom() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector(".collage h2")!);
    // Each print drifts at its own depth, so the pile reads as a table, not a grid.
    gsap.utils.toArray<HTMLElement>(".snap", root).forEach((snap) => {
      const speed = Number(snap.dataset.speed);
      gsap.fromTo(
        snap,
        { yPercent: 40 * speed },
        {
          yPercent: -40 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector(".collage"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    root.querySelectorAll(".moments li").forEach((li, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: li, start: "top 86%", once: true } })
        .from(
          li.querySelector(".polaroid"),
          { y: 80, rotate: i % 2 ? -8 : 8, opacity: 0, duration: 1.4, ease: "house-out" },
          i * 0.12,
        )
        .from(
          li.querySelectorAll(".line, .more"),
          { y: 24, opacity: 0, duration: 1, ease: "house-out", stagger: 0.08 },
          i * 0.12 + 0.25,
        );
    });
  });

  return (
    <Everyday ref={ref} aria-labelledby="everyday-title">
      <div className="collage">
        {EVERYDAY.map((id, i) => {
          const [left, top, w, tilt, speed] = SCATTER[i];
          const dim = mission[id];
          return (
            <span
              key={id}
              className="snap"
              data-speed={speed}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `max(${w}vw, ${Math.round(w * 9)}px)`,
                rotate: `${tilt}deg`,
              }}
              aria-hidden="true"
            >
              <img
                src={`/mission/${id}-640.webp`}
                width={dim.width}
                height={dim.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          );
        })}
        <h2 id="everyday-title">
          It’s the <b>everyday.</b>
        </h2>
      </div>

      <Frame className="moments">
        <ol aria-label="What slips away">
          {LOST.map((item, i) => (
            <li key={item.slot}>
              <figure
                className="polaroid"
                style={{ ["--tilt" as string]: `${[-2.2, 1.6, -1.2][i]}deg` }}
              >
                <div className="window">
                  <Picture id={item.photo} alt={item.alt} sizes="(max-width: 860px) 88vw, 32vw" />
                </div>
                <figcaption>{item.caption}</figcaption>
              </figure>
              <p className="line">{item.line}</p>
              <p className="more">{item.more}</p>
            </li>
          ))}
        </ol>
      </Frame>
    </Everyday>
  );
}

/* ── 3. What A Story catches ───────────────────────────────────────────── */

const Catch = styled.section`
  position: relative;
  background: ${color.sand};
  color: ${color.primary};
  padding: calc(clamp(56px, 6vw, 110px) * var(--sy)) 0
    calc(clamp(110px, 11vw, 190px) * var(--sy));

  /* The sheet curving up out of the cloth. */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: clamp(48px, 7vw, 120px);
    transform: translateY(-99%);
    background: ${color.sand};
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  }
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    gap: clamp(40px, 5vw, 110px);
    align-items: center;
  }
  .pre {
    font: italic 500 clamp(1.6rem, 1.2rem + 0.9vw, 2.4rem) / 1.3 ${font.display};
    color: ${color.primaryMid};
  }
  h2 {
    margin-top: 0.3em;
    font: 600 clamp(1.9rem, 1rem + 3.3vw, 6rem) / 1.06 ${font.display};
    letter-spacing: -0.015em;
    max-width: 30ch;
    text-wrap: balance;
  }
  h2 em {
    font-style: normal;
    color: ${color.accentText};
  }
  .how {
    margin-top: clamp(24px, 2.4vw, 40px);
    max-width: 40ch;
    font: 400 clamp(1.25rem, 1.08rem + 0.4vw, 1.6rem) / 1.5 ${font.text};
    color: ${color.body};
    text-wrap: pretty;
  }
  .caught {
    position: relative;
    justify-self: center;
    width: min(100%, 600px);
  }
  .caught .print {
    padding: clamp(10px, 1vw, 16px);
    background: ${color.paperPure};
    box-shadow: 0 30px 60px -30px rgba(42, 31, 24, 0.6);
    transform: rotate(-1.5deg);
  }
  .caught .print img {
    display: block;
    width: 100%;
    height: auto;
  }
  /* The story behind the photograph, as the app keeps it. */
  .memo {
    position: relative;
    width: min(94%, 470px);
    margin: -20% 0 0 auto;
    padding: 26px 28px 24px;
    background: ${color.paperPure};
    border-radius: 18px;
    box-shadow: 0 24px 50px -24px rgba(42, 31, 24, 0.55);
    transform: rotate(1.2deg);
  }
  .memo small {
    display: block;
    font: 500 15px/1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  .memo h3 {
    margin: 6px 0 12px;
    font: 600 clamp(1.5rem, 1.2rem + 0.6vw, 2rem) / 1.15 ${font.display};
    color: ${color.primary};
  }
  .memo p {
    font: italic 400 clamp(19px, 1rem + 0.35vw, 22px) / 1.5 ${font.text};
    color: ${color.body};
  }
  .memo footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    font: 600 15px/1.2 ${font.ui};
    color: ${color.accentText};
  }
  .memo footer i {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.onDark};
    font: 600 15px/1 ${font.ui};
    font-style: normal;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .memo {
      margin-top: -12%;
    }
  }
`;

function CatchRoom() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll(".pre, .how"), {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "house-out",
      stagger: 0.12,
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
    });
    gsap
      .timeline({
        scrollTrigger: { trigger: root.querySelector(".caught"), start: "top 80%", once: true },
      })
      .from(".caught .print", { y: 60, rotate: 4, opacity: 0, duration: 0.9, ease: "house-out" })
      .from(".memo", { y: 40, scale: 0.94, opacity: 0, duration: 0.8, ease: "house-out" }, 0.35);
    // The photograph and the story behind it lie at different depths.
    drift(root.querySelector(".caught .print")!, 4);
    drift(root.querySelector(".memo")!, -3);
  });

  return (
    <Catch ref={ref} aria-labelledby="catch-title">
      <Frame className="grid">
        <div>
          <p className="pre">Those slip away quietly.</p>
          <h2 id="catch-title">
            <em>A&nbsp;Story</em> exists to catch what the photograph can’t.
          </h2>
          <p className="how">
            You set it up once on their iPhone. A Story calls in its app and asks
            about their life, from a bank of {QUESTION_COUNT} questions. It keeps
            what they say in their own words, for the whole family.
          </p>
        </div>
        <div className="caught">
          <div className="print">
            <Picture id={QUIET.photo} alt={QUIET.alt} sizes="(max-width: 860px) 90vw, 600px" />
          </div>
          <article className="memo">
            <small>{QUIET.date}</small>
            <h3>{QUIET.title}</h3>
            <p>“{QUIET.told}”</p>
            <footer>
              <i aria-hidden="true">{QUIET.teller[0]}</i>
              {QUIET.teller} · told in a call
            </footer>
          </article>
        </div>
      </Frame>
    </Catch>
  );
}

export default function WhatGetsLost() {
  return (
    <>
      <MilestonePile />
      <EverydayRoom />
      <CatchRoom />
    </>
  );
}

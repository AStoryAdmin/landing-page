/**
 * Movement 1 — the problem (mission.md), told the way the app's own
 * onboarding tells it (CM02–CM05), in three rooms:
 *
 * 1. The milestones (ivory). "The wedding, the graduation, the first house"
 *    are the words a reader can touch: hover, focus or tap one and its print
 *    is pulled from the pile on the right and laid on top. Families already
 *    keep these; the pile says so without a caption.
 * 2. The everyday (chocolate, CM02). "It's the everyday." sits in a scatter
 *    of ordinary prints that drift at different depths as you scroll; then
 *    the three things that go missing, each a print with its line beneath.
 * 3. The catch (CM05). The sand panel curves up out of the everyday with
 *    "A Story exists to catch what the photograph can't", and an ordinary
 *    photograph arrives with the story A Story caught behind it.
 *
 * Every room is complete without motion: the pile shows the wedding on top
 * and still answers to hover; the collage sits still; the catch is static.
 */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EVERYDAY, LOST, MILESTONES, QUIET } from "../../../lib/homeExamples";
import { mission } from "../../../lib/mission";
import { Picture } from "../kit/kit";
import { Frame, RisingEdge } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

/* ── 1. The milestones ─────────────────────────────────────────────────── */

const Milestones = styled.section`
  position: relative;
  z-index: 1;
  background: ${color.ivory};
  padding: clamp(72px, 9vw, 140px) 0 clamp(96px, 10vw, 160px);

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  h2 {
    font: 400 ${display.lg} / 1.22 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
    max-width: 19ch;
  }
  h2 button {
    all: unset;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
    color: ${color.primary};
    transition: color 300ms;
    background: radial-gradient(
        circle,
        ${color.primaryMid} 1px,
        transparent 1.5px
      )
      0 96% / 6px 3px repeat-x;
  }
  h2 button[aria-pressed="true"] {
    color: ${color.accent};
    background: linear-gradient(${color.accent}, ${color.accent}) 0 96% / 100%
      2px no-repeat;
  }
  .keep {
    white-space: nowrap;
  }
  h2 button:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .hint {
    margin-top: clamp(20px, 2.4vw, 32px);
    font: 500 13px/1.4 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }

  .pile {
    position: relative;
    height: clamp(340px, 34vw, 520px);
  }
  .card {
    position: absolute;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    padding: clamp(10px, 1vw, 14px) clamp(10px, 1vw, 14px)
      clamp(40px, 3.6vw, 54px);
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
    max-height: clamp(240px, 26vw, 400px);
    max-width: clamp(260px, 30vw, 440px);
    filter: sepia(0.08);
  }
  .card figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: clamp(12px, 1.2vw, 18px);
    text-align: center;
    font: italic 400 clamp(15px, 1.2vw, 18px) / 1 ${font.display};
    color: ${color.primaryMid};
  }

  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .pile {
      height: 380px;
    }
    .card img {
      max-width: 62vw;
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
          .to(el, {
            xPercent: 62,
            rotate: 9,
            duration: 0.34,
            ease: "power2.in",
          })
          .set(el, { zIndex: 20 })
          .to(el, { ...POSE[depth], duration: 0.7, ease: "expo.out" });
      } else {
        gsap.to(el, { ...POSE[depth], duration: 0.8, ease: "expo.out" });
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

  // The headline holds live buttons, so it rises whole rather than split into lines.
  const ref = useScene<HTMLElement>((el) => {
    gsap.from(el.querySelectorAll("h2, .hint, .card"), {
      y: 40,
      opacity: 0,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 75%", once: true },
    });
  });

  useEffect(() => {
    place();
    // Until someone touches the words, the pile shuffles itself slowly, so
    // the words read as something to try — only while it is on screen.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let n = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearInterval(timer);
        if (!e.isIntersecting) return;
        timer = window.setInterval(() => {
          if (touched.current) return window.clearInterval(timer);
          n = (order.current[0] + 1) % MILESTONES.length;
          bring(n, false);
        }, 2600);
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
      <RisingEdge $to="ivory" />
      <Frame className="grid">
        <div>
          <h2 id="lost-title">
            {MILESTONES.map((m, i) => (
              <span key={m.photo} className="keep">
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
            — the milestones usually survive.
          </h2>
          <p className="hint" aria-hidden="true">
            Every family keeps these.
          </p>
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
              style={{
                zIndex: 10 - i,
                transform: `rotate(${POSE[i].rotate}deg)`,
              }}
            >
              <Picture
                id={m.photo}
                alt={m.alt}
                sizes="(max-width: 860px) 80vw, 440px"
              />
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
  background: ${color.primary};
  color: ${color.ivory};
  overflow: hidden;

  .collage {
    position: relative;
    height: clamp(620px, 72vw, 1040px);
  }
  .collage h2 {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0.35em 0.6em;
    text-align: center;
    white-space: nowrap;
    font: 400 clamp(3.2rem, 1rem + 7vw, 9rem) / 1 ${font.display};
    letter-spacing: -0.03em;
    color: ${color.ivory};
  }
  .collage h2::before {
    /* a pool of the ground behind the words, so they never sit on a photograph */
    content: "";
    position: absolute;
    inset: -30% -12%;
    z-index: -1;
    background: radial-gradient(
      closest-side,
      ${color.primary} 55%,
      transparent
    );
  }
  .collage h2 b {
    font-weight: 500;
    color: ${color.sand};
  }
  .snap {
    position: absolute;
    padding: clamp(5px, 0.5vw, 8px);
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
    padding: clamp(40px, 5vw, 80px) 0 clamp(96px, 11vw, 176px);
  }
  .moments ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 4vw, 72px);
    align-items: start;
  }
  .moments li:nth-child(2) {
    margin-top: clamp(40px, 6vw, 110px);
  }
  .polaroid {
    margin: 0 0 clamp(24px, 2.6vw, 36px);
    padding: clamp(10px, 0.9vw, 14px) clamp(10px, 0.9vw, 14px) 0;
    background: ${color.paperPure};
    box-shadow: 0 30px 50px -26px rgba(0, 0, 0, 0.75);
    transform: rotate(var(--tilt));
  }
  .polaroid .window {
    aspect-ratio: 4 / 3.4;
    overflow: hidden;
  }
  .polaroid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .polaroid figcaption {
    padding: clamp(12px, 1.2vw, 18px) 4px clamp(14px, 1.4vw, 20px);
    font: italic 400 clamp(15px, 1.15vw, 18px) / 1 ${font.display};
    color: ${color.primaryMid};
  }
  .moments h3 {
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.ivory};
  }
  .moments h3 + p {
    margin-top: 12px;
    font: 400 16px/1.6 ${font.body};
    color: ${color.onDarkMuted};
    max-width: 34ch;
  }

  ${media.md} {
    .collage {
      height: 560px;
    }
    .collage h2 {
      font-size: 12.5vw;
    }
    .collage .snap:nth-child(n + 8) {
      display: none;
    }
    .moments ol {
      grid-template-columns: minmax(0, 1fr);
      gap: 56px;
    }
    .moments li:nth-child(2) {
      margin-top: 0;
    }
    .polaroid {
      width: min(86%, 420px);
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
            trigger: ".collage",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    root.querySelectorAll(".moments li").forEach((li, i) => {
      gsap
        .timeline({
          scrollTrigger: { trigger: li, start: "top 85%", once: true },
        })
        .from(
          li.querySelector(".polaroid"),
          {
            y: 80,
            rotate: i % 2 ? -8 : 8,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
          },
          i * 0.12,
        )
        .from(
          li.querySelectorAll("h3, h3 + p"),
          { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 },
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
                  <Picture
                    id={item.photo}
                    alt={item.alt}
                    sizes="(max-width: 860px) 86vw, 30vw"
                  />
                </div>
                <figcaption>{item.caption}</figcaption>
              </figure>
              <h3>{item.line}</h3>
              <p>{item.more}</p>
            </li>
          ))}
        </ol>
      </Frame>
    </Everyday>
  );
}

/* ── 3. What A Story catches ───────────────────────────────────────────── */

/*
 * Pass 11d told this as a pinned dark scene ("Nothing special happened that
 * day… Quietly.") where the photograph faded as you scrolled. The founder
 * found it long, unclear on phones, and weaker than the everyday collage
 * right before it — which already lands the loss. So the answer comes
 * straight after, in one static room: the sand panel curves up out of the
 * everyday (mission CM05), and the ordinary photograph arrives with the
 * story A Story caught behind it. One crisp entrance, no scrubbing.
 */
const Catch = styled.section`
  position: relative;
  background: ${color.sand};
  color: ${color.primary};
  padding: clamp(56px, 7vw, 110px) 0 clamp(96px, 11vw, 170px);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: clamp(48px, 7vw, 110px);
    transform: translateY(-99%);
    background: ${color.sand};
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  }
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  .pre {
    font: italic 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primaryMid};
  }
  h2 {
    margin-top: 0.4em;
    font: 400 ${display.xl} / 1.06 ${font.display};
    letter-spacing: -0.025em;
    max-width: 14ch;
  }
  h2 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  .caught {
    position: relative;
    justify-self: center;
    width: min(100%, 540px);
  }
  .caught .print {
    padding: clamp(10px, 1vw, 14px);
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
    width: min(92%, 420px);
    margin: -20% 0 0 auto;
    padding: 22px 24px 20px;
    background: ${color.paperPure};
    border-radius: 18px;
    box-shadow: 0 24px 50px -24px rgba(42, 31, 24, 0.55);
    transform: rotate(1.2deg);
  }
  .memo small {
    font: 500 12px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .memo h3 {
    margin: 6px 0 10px;
    font: 700 19px/1.25 ${font.body};
    color: ${color.primary};
  }
  .memo p {
    font: italic 400 18px/1.45 ${font.display};
    color: ${color.primary};
  }
  .memo footer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .memo footer i {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.ivory};
    font: 600 12px/1 ${font.body};
    font-style: normal;
    letter-spacing: 0;
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
    gsap
      .timeline({
        scrollTrigger: { trigger: ".caught", start: "top 80%", once: true },
      })
      .from(".caught .print", {
        y: 60,
        rotate: 4,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      })
      .from(
        ".memo",
        {
          y: 40,
          scale: 0.92,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.6)",
        },
        0.35,
      );
  });

  return (
    <Catch ref={ref} aria-labelledby="catch-title">
      <Frame className="grid">
        <div>
          <p className="pre">Those slip away quietly.</p>
          <h2 id="catch-title">
            <em>A&nbsp;Story</em> exists to catch what the photograph can’t.
          </h2>
        </div>
        <div className="caught">
          <div className="print">
            <Picture
              id={QUIET.photo}
              alt={QUIET.alt}
              sizes="(max-width: 860px) 90vw, 540px"
            />
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

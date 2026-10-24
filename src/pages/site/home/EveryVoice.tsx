/**
 * The multi-perspective story (2026-10-24, back from the past home at Bao's
 * request: "the multiperspective etc" was better the last time).
 *
 * One memory shows it: Grandpa Walt tells "The lake monster" on a call; as
 * the stage arrives, the family's additions - passed across the table like
 * notes - fly into the memory one by one and settle there as versions, each
 * in its teller's name, and the app's own banner says they wait for Walt.
 * Then the takeaway, set large: "One life. Many witnesses."
 *
 * What changed from the past build, and why:
 * - The memory is drawn as the app's memory page at reading size, without a
 *   drawn phone. Inside a 400px phone the app's type came out at 10-13px;
 *   Bao's floor (2026-10-24) is 14px for the smallest label and 18-20px for
 *   anything read, so the page is shown large and the device is left out.
 * - Lily adds a drawing, not a voice note: recorded clips are still in
 *   development, so nothing here shows voice as shipped. The lead says what
 *   the app does today: one link, no account, nothing shown until the
 *   storyteller says yes.
 * - The motto under the band ("Not a diary. A documentary.") is cut: the
 *   site does not use not-X-but-Y lines.
 * - The band stands on the chocolate bookcloth, the photograph laid into it.
 *
 * Wide screens play the exchange once when the stage arrives (scrolling back
 * above resets it). Narrow screens and reduced motion show the finished
 * memory, every version in place, and leave the notes out (they would say
 * the same thing twice). The family is fictional (lib/homeExamples.ts).
 * `id="kept"` is kept for old links to "See the archive".
 */
import styled from "styled-components";
import { LAKE_MONSTER as M } from "../../../lib/homeExamples";
import { Picture } from "../kit/kit";
import { Frame, SplitHead, Statement } from "../kit/kit.styles";
import { chocolateCloth } from "../kit/cloth";
import { gsap, riseLines, ScrollTrigger, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

/** The family's additions, as shown here (Lily's is a drawing; see above). */
const ADDED = M.added.map((a) => ({
  ...a,
  kind: a.name.startsWith("Lily") ? "A drawing of it" : a.kind,
}));
const TINTS = [color.teal, color.accentText, color.primaryMid];

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accentText};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: calc(clamp(96px, 10vw, 180px) * var(--sy)) 0 0;
  overflow: hidden;

  .lead {
    font: 400 clamp(1.25rem, 1.08rem + 0.4vw, 1.6rem) / 1.5 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }
  /* Wide: the memory in the middle of the table, the notes laid round it
     (over its edges, the way slips are passed across); once they have flown
     in, the memory stands alone. */
  .stage {
    position: relative;
    padding: calc(clamp(8px, 2vw, 40px) * var(--sy)) 0;
  }
  /* A pool of warm light under the page, so it sits on the table with the notes. */
  .stage::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(1300px, 92vw);
    aspect-ratio: 1.8;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, ${color.sand} 80%, transparent),
      transparent
    );
    pointer-events: none;
  }
  .notes {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }
  /* ── The memory, as the app lays it out ── */
  .memory {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    width: min(1060px, 100%);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    background: ${color.paperPure};
    border-radius: 22px;
    overflow: hidden;
    box-shadow:
      0 1px 2px rgba(42, 31, 24, 0.08),
      0 40px 80px -40px rgba(42, 31, 24, 0.55);
  }
  .memory .photo {
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }
  .memory .side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(22px, 2vw, 32px) clamp(22px, 2.2vw, 36px);
    background: color-mix(in srgb, ${color.ivory} 45%, ${color.paperPure});
  }
  .memory .side .versions h4 {
    margin-top: 0;
  }
  .memory .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 45%;
    display: block;
  }
  .memory .body {
    padding: clamp(22px, 2vw, 32px) clamp(22px, 2.2vw, 36px) clamp(24px, 2.2vw, 34px);
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
    font: 500 15px/1.2 ${font.ui};
    color: ${color.bodyMuted};
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 99px;
    background: ${color.ivory};
    color: ${color.body};
  }
  .chip::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--dot);
  }
  .memory h3 {
    margin-top: 14px;
    font: 600 clamp(2rem, 1.5rem + 1vw, 2.75rem) / 1.05 ${font.display};
    color: ${color.primary};
  }
  .told {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    margin-top: 16px;
  }
  .seal {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--tint, ${color.primary});
    color: ${color.onDark};
    font: 600 16px/1 ${font.ui};
  }
  .told b,
  .voice b {
    display: block;
    font: 600 15px/1.3 ${font.ui};
    color: ${color.teal};
  }
  .told q {
    display: block;
    margin-top: 6px;
    quotes: "“" "”";
    font: 400 clamp(19px, 1rem + 0.3vw, 21px) / 1.5 ${font.text};
    color: ${color.body};
  }
  .versions h4 {
    margin: 18px 0 12px;
    font: 600 16px/1.2 ${font.ui};
    color: ${color.primary};
  }
  .versions ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }
  .slot {
    position: relative;
    border-radius: 14px;
  }
  .slot .waiting {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    border: 1.5px dashed ${color.primaryLineStrong};
    border-radius: 14px;
    font: 500 15px/1.2 ${font.ui};
    color: ${color.bodyMuted};
  }
  .voice {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    background: var(--wash);
  }
  .voice b {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 10px;
    color: ${color.primary};
  }
  .voice b span + span {
    font-weight: 500;
    color: ${color.bodyMuted};
  }
  .voice q {
    display: block;
    margin-top: 4px;
    quotes: "“" "”";
    font: italic 400 18px/1.45 ${font.text};
    color: ${color.body};
  }
  .review {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
    padding: 12px 12px 12px 18px;
    border-radius: 14px;
    background: color-mix(in srgb, ${color.teal} 10%, ${color.paperPure});
    font: 500 15px/1.3 ${font.ui};
    color: ${color.teal};
  }
  .review strong {
    flex: none;
    padding: 8px 16px;
    border-radius: 99px;
    background: ${color.teal};
    color: ${color.onDark};
    font: 600 15px/1 ${font.ui};
  }

  /* ── The additions, waiting round the page like notes passed across a table ── */
  .note {
    position: absolute;
    width: min(390px, 26vw);
    padding: 22px 24px 20px;
    background: ${color.paperPure};
    border-top: 3px solid var(--tint);
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.06),
      0 28px 50px -26px rgba(42, 31, 24, 0.5);
    border-radius: 2px 2px 8px 8px;
  }
  .note:nth-child(1) {
    left: 0;
    top: 2%;
    transform: rotate(-2.5deg);
  }
  .note:nth-child(2) {
    right: 0;
    top: 30%;
    transform: rotate(2deg);
  }
  .note:nth-child(3) {
    left: 3%;
    bottom: 2%;
    transform: rotate(1.5deg);
  }
  .note header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .note header b {
    display: block;
    font: 600 16px/1.2 ${font.ui};
    color: ${color.primary};
  }
  .note header small {
    font: 500 15px/1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  .note p {
    font: italic 500 clamp(1.4rem, 1.1rem + 0.5vw, 1.75rem) / 1.3 ${font.display};
    color: ${color.primary};
  }
  .note .kind {
    display: inline-block;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid ${color.primaryLine};
    font: 600 15px/1.2 ${font.ui};
    color: ${color.accentText};
  }

  /* Without motion the exchange never plays: the finished memory alone. */
  @media (prefers-reduced-motion: reduce) {
    .notes {
      display: none;
    }
  }
  /* Below the wide stage: the finished memory alone, every version in place. */
  @media (max-width: 1100px) {
    .notes {
      display: none;
    }
    .memory {
      width: min(640px, 100%);
      display: block;
    }
    .memory .photo {
      aspect-ratio: 16 / 10;
    }
    .memory .side {
      padding-top: 0;
      background: none;
    }
    .told {
      padding-bottom: 20px;
      border-bottom: 1px solid ${color.primaryLine};
    }
  }
  ${media.sm} {
    .memory {
      border-radius: 16px;
    }
    .told q {
      font-size: 18px;
    }
    .review {
      flex-wrap: wrap;
    }
  }
`;

/*
 * The takeaway, as a pure statement: the lake photograph laid into the
 * chocolate bookcloth (the A pattern still shows through), the two lines set
 * large, the namecard's ornament between them. The photograph drifts slowly
 * as you scroll past, like a film still.
 */
const Takeaway = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: min(64svh, 640px);
  margin-top: calc(clamp(72px, 8vw, 150px) * var(--sy));
  padding: calc(clamp(80px, 9vw, 150px) * var(--sy)) var(--page-gutter, 24px);
  ${chocolateCloth};
  color: ${color.onDark};
  text-align: center;

  .bg {
    position: absolute;
    inset: -10% 0;
    z-index: -1;
  }
  .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.42;
    mix-blend-mode: luminosity;
  }
  /* The cloth's shade pooled behind the words. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(
      ellipse 48% 52% at 50% 50%,
      color-mix(in srgb, ${color.chocolateInk} 62%, transparent),
      transparent 85%
    );
    pointer-events: none;
  }
  h3 {
    font: 600 ${display.hero} / 1 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.onDark};
  }
  h3 > span:first-child,
  h3 em {
    display: block;
  }
  h3 em {
    font-style: normal;
    color: ${color.gold};
  }
  /* Double hairline with a lozenge - the namecard's ornament. */
  .orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: clamp(18px, 2vw, 30px) auto;
    width: min(340px, 60vw);
  }
  .orn::before,
  .orn::after {
    content: "";
    flex: 1;
    height: 3px;
    border-top: 1px solid color-mix(in srgb, ${color.gold} 80%, transparent);
    border-bottom: 1px solid color-mix(in srgb, ${color.gold} 40%, transparent);
  }
  .orn i {
    width: 10px;
    height: 10px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  ${media.sm} {
    h3 {
      font-size: 12vw;
    }
  }
`;

export default function EveryVoice() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelector(".lead"), {
      y: 24,
      opacity: 0,
      duration: 1,
      ease: "house-out",
      scrollTrigger: { trigger: root.querySelector(".lead"), start: "top 88%", once: true },
    });
    gsap.from(root.querySelector(".memory"), {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "house-out",
      scrollTrigger: { trigger: root.querySelector(".stage"), start: "top 85%", once: true },
    });
    // The takeaway: the lines arrive once, the ornament opens between them,
    // and the photograph drifts slowly behind while it is on screen.
    gsap
      .timeline({
        scrollTrigger: { trigger: root.querySelector(".takeaway"), start: "top 70%", once: true },
      })
      .from(".takeaway h3 > span:first-child, .takeaway h3 em", {
        yPercent: 30,
        opacity: 0,
        duration: 1.2,
        ease: "house-out",
        stagger: 0.2,
      })
      .from(".takeaway .orn", { scaleX: 0.2, opacity: 0, duration: 1, ease: "house-out" }, 0.3);
    gsap.fromTo(
      ".takeaway .bg",
      { yPercent: -6, scale: 1.08 },
      {
        yPercent: 6,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector(".takeaway"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    // Only the wide stage plays the exchange; elsewhere the memory is complete.
    if (window.innerWidth <= 1100) return;
    const notes = gsap.utils.toArray<HTMLElement>(".note", root);
    const voices = gsap.utils.toArray<HTMLElement>("[data-voice]", root);
    const review = root.querySelector("[data-review]");
    const slots = gsap.utils.toArray<HTMLElement>(".slot", root);
    // Each note flies to the centre of the slot it becomes.
    const delta = (n: HTMLElement, i: number, axis: "x" | "y") => () => {
      const a = n.getBoundingClientRect();
      const b = slots[i].getBoundingClientRect();
      return axis === "x"
        ? b.left + b.width / 2 - (a.left + a.width / 2)
        : b.top + b.height / 2 - (a.top + a.height / 2);
    };
    gsap.set(voices, { autoAlpha: 0, y: 10 });
    gsap.set(review, { autoAlpha: 0, y: 10 });
    const tl = gsap.timeline({ paused: true, defaults: { ease: "house-move" } });
    notes.forEach((n, i) => {
      const at = 0.4 + i * 0.6;
      tl.to(n, { x: delta(n, i, "x"), y: delta(n, i, "y"), scale: 0.4, autoAlpha: 0, rotate: 0, duration: 0.8 }, at)
        .to(voices[i], { autoAlpha: 1, y: 0, duration: 0.45, ease: "house-out" }, at + 0.6);
    });
    tl.to(review, { autoAlpha: 1, y: 0, duration: 0.45, ease: "house-out" }, 0.4 + notes.length * 0.6 + 0.4);
    ScrollTrigger.create({
      trigger: root.querySelector(".stage"),
      start: "top 40%",
      onEnter: () => tl.restart(),
      onLeaveBack: () => tl.pause(0),
      onRefresh: (self) => {
        // Arrived below the start (a reload part-way down): show the end state.
        if (self.progress > 0 && tl.progress() === 0) tl.progress(1);
      },
    });
  });

  return (
    <Scene ref={ref} id="kept" aria-labelledby="voices-title">
      <Frame>
        <SplitHead>
          <Statement id="voices-title" $size="lg">
            Every memory has more than one <em>witness.</em>
          </Statement>
          <p className="lead">
            Invite the people who were there. Each adds what they remember,
            under their own name, through one link and with no account needed.
            Nothing replaces anything else, and nothing appears until the
            storyteller says yes.
          </p>
        </SplitHead>

        <div className="stage">
          <div className="notes" aria-hidden="true">
          {ADDED.map((a, i) => (
            <aside
              className="note"
              key={a.name}
              style={{ ["--tint" as string]: TINTS[i] }}
            >
              <header>
                <span className="seal">{a.initial}</span>
                <span>
                  <b>{a.name}</b>
                  <small>{a.role}</small>
                </span>
              </header>
              <p>“{a.quote}”</p>
              <span className="kind">+ {a.kind}</span>
            </aside>
          ))}
          </div>

          <article
            className="memory"
            data-ui
            aria-label={`“${M.title}”, a memory in the A Story app, with the family’s versions (a sample family)`}
          >
            <div className="main">
            <div className="photo">
              <Picture
                id={M.photo}
                alt="Grandpa Walt telling a story around a campfire by the lake while Uncle Ben creeps up behind with a paddle"
                sizes="(max-width: 640px) 92vw, 600px"
              />
            </div>
            <div className="body">
              <div className="meta">
                <span>{M.date}</span>
                {M.tags.map((t, i) => (
                  <span
                    key={t}
                    className="chip"
                    style={{ ["--dot" as string]: i ? color.accent : color.teal }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3>{M.title}</h3>
              <div className="told">
                <span className="seal" aria-hidden="true">
                  {M.teller.initial}
                </span>
                <div>
                  <b>{M.teller.name} · told in a call</b>
                  <q>{M.told}</q>
                </div>
              </div>
            </div>
            </div>
            <div className="side">
              <div className="versions">
                <h4>Everyone’s version</h4>
                <ul>
                  {ADDED.map((a, i) => (
                    <li className="slot" key={a.name}>
                      <span className="waiting" aria-hidden="true">
                        Invited · {a.name.split(",")[0]}
                      </span>
                      <div
                        className="voice"
                        data-voice
                        style={{
                          ["--tint" as string]: TINTS[i],
                          ["--wash" as string]: `color-mix(in srgb, ${TINTS[i]} 9%, ${color.paperPure})`,
                        }}
                      >
                        <span className="seal" aria-hidden="true">
                          {a.initial}
                        </span>
                        <div>
                          <b>
                            <span>{a.name}</span>
                            <span>{a.kind}</span>
                          </b>
                          <q>{a.quote}</q>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="review" data-review>
                <span>
                  {ADDED.length} additions waiting for {M.teller.name.split(" ").pop()}
                </span>
                <strong>Review</strong>
              </div>
            </div>
          </article>
        </div>
      </Frame>

      <Takeaway className="takeaway">
        <div className="bg" aria-hidden="true">
          <Picture id={M.photo} alt="" sizes="100vw" />
        </div>
        <h3>
          <span>One life.</span>
          <span className="orn" aria-hidden="true">
            <i />
          </span>
          <em>Many witnesses.</em>
        </h3>
      </Takeaway>
    </Scene>
  );
}

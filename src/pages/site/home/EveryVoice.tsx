/**
 * Movement 4 — the distinctive claim: a life isn't a solo account.
 *
 * Pass 11 argued this with a 1975 lake photograph and three quotations beside
 * it. It was correct and not memorable: the reader saw a photo and some
 * captions, not a family doing anything. This scene shows the collaboration
 * itself, in the app: Grandpa tells "The lake monster" on a call; then, as
 * the reader scrolls, the family's additions arrive from around the phone —
 * Sarah's photos, Lily's voice note, Uncle Ben's confession — and settle into
 * the memory as versions beside his, each in its teller's name. Finally the
 * banner the app really shows: additions wait for the storyteller to approve.
 *
 * The copy is the onboarding's own (mission P02, M14): "Every memory has
 * more than one witness", and in the gold plate, "One life. Many witnesses.
 * Not a diary. A documentary." Content: `homeExamples.ts`.
 * `id="kept"` is kept for old links to "See the archive".
 */
import styled from "styled-components";
import { LAKE_MONSTER as M } from "../../../lib/homeExamples";
import { Phone } from "../app/Phone";
import { Picture } from "../kit/kit";
import { MemoryScreen } from "../app/screens";
import { avatarTints } from "../app/tokens";
import { Eyebrow, Frame, SplitHead, Statement } from "../kit/kit.styles";
import {
  gsap,
  riseLines,
  ScrollTrigger,
  useScene,
} from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --muted: ${color.body};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0 0;
  overflow: hidden;

  .lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 44ch;
  }
  .stage {
    position: relative;
    display: grid;
    place-items: center;
    min-height: min(92vh, 860px);
  }
  /* A pool of warm light under the phone, so it sits on the table with the notes. */
  .stage::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(900px, 90vw);
    aspect-ratio: 1.3;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, ${color.sand} 75%, transparent),
      transparent
    );
    pointer-events: none;
  }
  .stage > * {
    position: relative;
  }
  /* The additions, waiting around the phone like notes passed across a table. */
  .note {
    position: absolute;
    z-index: 2;
    width: min(360px, 27vw);
    padding: 20px 22px 18px;
    background: ${color.paperPure};
    border-top: 3px solid var(--tint);
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.06),
      0 28px 50px -26px rgba(42, 31, 24, 0.5);
    border-radius: 2px 2px 6px 6px;
  }
  .note:nth-of-type(1) {
    left: 0;
    top: 10%;
    transform: rotate(-2.5deg);
  }
  .note:nth-of-type(2) {
    right: 0;
    top: 30%;
    transform: rotate(2deg);
  }
  .note:nth-of-type(3) {
    left: 6%;
    bottom: 8%;
    transform: rotate(1.5deg);
  }
  .note header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .note i {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font: 600 15px/1 ${font.body};
    font-style: normal;
    color: ${color.ivory};
    background: var(--tint);
  }
  .note b {
    display: block;
    font: 600 15px/1.2 ${font.body};
    color: ${color.primary};
  }
  .note small {
    font: 500 13px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .note p {
    font: italic 400 20px/1.4 ${font.display};
    color: ${color.primary};
  }
  .note span {
    display: inline-block;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid ${color.primaryLine};
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${color.accentText};
  }

  ${media.lg} {
    .stage {
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-height: 0;
    }
    .note {
      position: static;
      width: min(440px, 100%);
      transform: none !important;
    }
  }
`;

/*
 * The takeaway — "One life. Many witnesses." — as a pure statement, nothing
 * else to read: the lake photograph (the same night the whole family
 * remembers differently) full-bleed and dimmed, the two lines set large, a
 * gold ornament between them, and the mission's line beneath. The photograph
 * drifts slowly as you scroll past, like a film still.
 */
const Takeaway = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: min(88vh, 820px);
  margin-top: clamp(80px, 10vw, 150px);
  padding: clamp(80px, 10vw, 140px) var(--page-gutter);
  color: ${color.ivory};
  text-align: center;

  .bg {
    position: absolute;
    inset: -8% 0;
    z-index: -2;
  }
  .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(
        ellipse 60% 55% at 50% 50%,
        color-mix(in srgb, ${color.night} 55%, transparent),
        transparent 80%
      ),
      linear-gradient(
        color-mix(in srgb, ${color.night} 72%, transparent),
        color-mix(in srgb, ${color.night} 82%, transparent)
      );
  }
  h3 {
    font: 400 ${display.hero} / 1 ${font.display};
    letter-spacing: -0.03em;
    color: ${color.ivory};
  }
  h3 > span:first-child,
  h3 em {
    display: block;
  }
  h3 em {
    font-style: italic;
    color: ${color.gold};
  }
  /* Double hairline with a lozenge — the namecard's ornament. */
  .orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: clamp(18px, 2vw, 28px) auto;
    width: min(320px, 60vw);
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
    width: 9px;
    height: 9px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  .motto {
    margin-top: clamp(28px, 3vw, 44px);
    font: italic 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.onDarkMuted};
  }
  .motto b {
    font-style: normal;
    font-weight: 500;
    color: ${color.ivory};
  }
`;

export default function EveryVoice() {
  const ref = useScene<HTMLElement>((root, { wide }) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(".lead", {
      y: 24,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".lead", start: "top 85%", once: true },
    });
    // The takeaway: the lines arrive once, the ornament opens between them,
    // and the photograph drifts slowly behind while it is on screen.
    gsap
      .timeline({
        scrollTrigger: { trigger: ".takeaway", start: "top 65%", once: true },
      })
      .from(".takeaway h3 > span:first-child, .takeaway h3 em", {
        yPercent: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.2,
      })
      .from(
        ".takeaway .orn",
        { scaleX: 0, opacity: 0, duration: 1, ease: "expo.out" },
        0.3,
      )
      .from(
        ".takeaway .motto",
        { opacity: 0, y: 12, duration: 1, ease: "expo.out" },
        0.8,
      );
    gsap.fromTo(
      ".takeaway .bg",
      { yPercent: -6, scale: 1.08 },
      {
        yPercent: 6,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".takeaway",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    const notes = gsap.utils.toArray<HTMLElement>(".note", root);
    const voices = gsap.utils.toArray<HTMLElement>("[data-voice]", root);
    const review = root.querySelector("[data-review]");

    // Below the wide layout the notes sit in a column beside a complete memory.
    if (!wide || window.innerWidth <= 1024) return;

    // Wide: when the stage arrives, the whole exchange plays once, start to
    // finish — each note flies into the phone and becomes a version. (Pass 11d
    // scrubbed this against a pinned scroll, which asked for too much
    // scrolling.) Scrolling back above it resets, so it plays again next time.
    const phone = root.querySelector<HTMLElement>(".stage [role='img']")!;
    const toPhone = (el: HTMLElement, axis: "x" | "y") => () => {
      const a = el.getBoundingClientRect();
      const b = phone.getBoundingClientRect();
      return axis === "x"
        ? b.left + b.width / 2 - (a.left + a.width / 2)
        : b.top + b.height * 0.62 - (a.top + a.height / 2);
    };
    gsap.set(voices, { autoAlpha: 0, y: 12 });
    gsap.set(review, { autoAlpha: 0, y: 12 });
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    });
    notes.forEach((n, i) => {
      tl.to(
        n,
        {
          x: toPhone(n, "x"),
          y: toPhone(n, "y"),
          scale: 0.3,
          autoAlpha: 0,
          rotate: 0,
          duration: 0.8,
        },
        0.4 + i * 0.55,
      ).to(
        voices[i],
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
        0.4 + i * 0.55 + 0.6,
      );
    });
    tl.to(
      review,
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
      0.4 + notes.length * 0.55 + 0.4,
    );
    ScrollTrigger.create({
      trigger: ".stage",
      start: "top 45%",
      onEnter: () => tl.restart(),
      onLeaveBack: () => tl.pause(0),
    });
  });

  return (
    <Scene ref={ref} id="kept" aria-labelledby="voices-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>Everyone who was there</Eyebrow>
            <Statement id="voices-title" $size="xl">
              Every memory has more than one <em>witness.</em>
            </Statement>
          </div>
          <p className="lead">
            Invite the people who were there. Their photos, voices and versions
            become part of the same story — through one link, no account needed.
            Nothing replaces anything else, and nothing appears until the
            storyteller says yes.
          </p>
        </SplitHead>

        <div className="stage">
          {M.added.map((a, i) => (
            <article
              className="note"
              key={a.name}
              style={{ ["--tint" as string]: avatarTints[i] }}
            >
              <header>
                <i aria-hidden="true">{a.initial}</i>
                <div>
                  <b>{a.name}</b>
                  <small>{a.role}</small>
                </div>
              </header>
              <p>“{a.quote}”</p>
              <span>+ {a.kind}</span>
            </article>
          ))}
          <Phone
            width="min(400px, 86vw, calc((100vh - 100px) * 0.4756))"
            label={`“${M.title}” in the A Story app, with the family’s versions`}
          >
            <MemoryScreen
              photo={M.photo}
              date={M.date}
              tags={M.tags}
              title={M.title}
              teller={M.teller}
              told={M.told}
              voices={M.added}
              pending={M.added.length}
            />
          </Phone>
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
        <p className="motto">
          Not a diary. <b>A documentary.</b>
        </p>
      </Takeaway>
    </Scene>
  );
}

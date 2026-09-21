/**
 * Movement 2 — the difference, placed after the proof. Other tools look
 * backward, a memoir to finish; A Story never assumes the story is finished.
 * Today belongs beside 1952.
 *
 * The statement deepens word by word under the reader's scroll (ink, not
 * opacity, so every word stays legible). Then the family's years run
 * sideways while the scene is pinned: prints from 1952 to today laid along
 * one thread, archival ones matted, contemporary ones bare, ending on an
 * empty frame — the archive's most important entry is the one not made yet.
 *
 * This is the job the brief asked the contemporary photographs to earn
 * (design-brief §9d): 20, 21 and 35 sit on the same thread as 1952, because
 * today's ordinary afternoon is tomorrow's missing story.
 */
import styled from "styled-components";
import { Print } from "../kit/kit";
import { Eyebrow, Frame } from "../kit/kit.styles";
import { gsap, SplitText, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.paperPure};
  padding-top: clamp(96px, 11vw, 176px);
  overflow: hidden;

  .argument {
    font: 400 ${display.lg} / 1.16 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
    max-width: 26ch;
  }
  .argument em {
    font-style: italic;
    color: ${color.accent};
  }

  .run {
    margin-top: clamp(64px, 7vw, 110px);
    padding-bottom: clamp(88px, 10vw, 150px);
  }
  /* Scrollable by hand wherever the run is not pinned (reduced motion, phones). */
  .run-viewport {
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    padding-block: 24px 8px;
  }
  .run-viewport::-webkit-scrollbar {
    display: none;
  }
  .track {
    position: relative;
    list-style: none;
    margin: 0;
    display: flex;
    align-items: flex-end;
    gap: clamp(40px, 5vw, 88px);
    width: max-content;
    padding: 0 max(var(--page-gutter), calc((100vw - 1440px) / 2)) 72px;
  }
  /* The thread: every year hangs from one line, so the chronology is structure, not décor. */
  .track::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 36px;
    height: 1px;
    background: ${color.primaryLineStrong};
  }
  .entry {
    position: relative;
    flex: none;
    display: flex;
    flex-direction: column;
    scroll-snap-align: center;
  }
  .entry::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -41px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${color.paperPure};
    border: 1.5px solid ${color.primaryMid};
    z-index: 1;
  }
  .entry.today::after {
    background: ${color.accent};
    border-color: ${color.accent};
    box-shadow: 0 0 0 5px color-mix(in srgb, ${color.accent} 20%, transparent);
  }
  .entry.next::after {
    border-style: dashed;
    border-color: ${color.accent};
  }
  .entry figure img {
    height: var(--h);
    width: auto;
    max-width: none;
  }
  .entry-year {
    font: 400 clamp(2.4rem, 1.6rem + 2.2vw, 4rem) / 1 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
    font-variant-numeric: lining-nums tabular-nums;
    margin-bottom: 18px;
  }
  .entry.today .entry-year {
    font-style: italic;
    color: ${color.accent};
  }
  .entry-note {
    margin-top: 14px;
    font: italic 400 17px/1.4 ${font.display};
    color: ${color.primaryMid};
    max-width: 24ch;
  }
  .entry.next .blank {
    height: var(--h);
    aspect-ratio: 4 / 5;
    border: 1px dashed ${color.accent};
    outline: 1px solid ${color.accentLine};
    outline-offset: 6px;
    display: flex;
    align-items: flex-end;
    padding: 28px;
    font: italic 400 clamp(1.3rem, 1rem + 0.8vw, 1.8rem) / 1.3 ${font.display};
    color: ${color.primary};
  }
  .entry.next .entry-year {
    color: ${color.accent};
  }

  ${media.md} {
    .run-viewport {
      scroll-snap-type: x mandatory;
    }
    .entry figure img,
    .entry.next .blank {
      height: calc(var(--h) * 0.62);
    }
  }
`;

type Entry = {
  id?: string;
  year: string;
  note: string;
  alt?: string;
  h: string;
  tilt?: number;
  kind?: "today" | "next";
};
const entries: Entry[] = [
  { id: "01", year: "1952", note: "The porch, the week they moved in.", alt: "Two people on the porch steps of a home, 1952", h: "min(40vh, 360px)", tilt: -1.2 },
  { id: "05", year: "1960", note: "The way she showed you.", alt: "Hands kneading dough on a flour-covered counter, 1960", h: "min(34vh, 300px)", tilt: 1 },
  { id: "16", year: "1978", note: "The drive everyone slept through but him.", alt: "The view of a road through a car windscreen, 1978", h: "min(38vh, 340px)", tilt: -0.6 },
  { id: "13", year: "1991", note: "After the candles.", alt: "A birthday cake after the candles, 1991", h: "min(32vh, 290px)", tilt: 1.4 },
  { id: "20", year: "2007", note: "Asleep before the end of the street.", alt: "Two children asleep in the back seat of a car, 2007", h: "min(36vh, 320px)" },
  { id: "21", year: "2018", note: "Nine hundred lunchboxes. Nobody counted.", alt: "Hands preparing a lunchbox at a kitchen counter, 2018", h: "min(34vh, 300px)" },
  { id: "35", year: "Today", note: "An ordinary Tuesday. Already part of it.", alt: "An adult carrying laundry through a contemporary home", h: "min(42vh, 380px)", kind: "today" },
  { year: "Next", note: "", h: "min(42vh, 380px)", kind: "next" },
];

export default function StillHappening() {
  const ref = useScene<HTMLElement>((root, { wide }) => {
    // Each word deepens from muted to full ink as the sentence is read.
    SplitText.create(root.querySelector(".argument")!, {
      type: "words",
      autoSplit: true,
      onSplit: (split) =>
        gsap.fromTo(
          split.words,
          { color: color.faint },
          {
            color: (_i: number, el: Element) => (el.closest("em") ? color.accent : color.primary),
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: ".argument", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        ),
    });

    if (!wide) return;
    const track = root.querySelector<HTMLElement>(".track")!;
    const distance = () => track.scrollWidth - window.innerWidth;
    // Pinned: the scroll drives the run, so the hand-scroll affordance goes.
    gsap.set(".run-viewport", { overflow: "hidden", attr: { tabindex: -1 } });
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".run",
        start: "center center",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="unfinished-title">
      <Frame>
        <Eyebrow>Not a memoir</Eyebrow>
        <h2 id="unfinished-title" className="argument">
          Most tools help you finish a life story before it’s too late. A Story
          never assumes the story is finished, because it isn’t.{" "}
          <em>Today is part of it too.</em>
        </h2>
      </Frame>
      <div className="run">
        <div
          className="run-viewport"
          tabIndex={0}
          role="region"
          aria-label="One family’s timeline, from 1952 to today, with room for what comes next"
        >
          <ol className="track">
            {entries.map((e) => (
              <li key={e.year} className={`entry ${e.kind ?? ""}`} style={{ ["--h" as string]: e.h }}>
                <p className="entry-year">{e.year}</p>
                {e.id ? (
                  <>
                    <Print id={e.id} alt={e.alt!} tilt={e.tilt} sizes="(max-width: 860px) 70vw, 520px" />
                    <p className="entry-note">{e.note}</p>
                  </>
                ) : (
                  <div className="blank">A question from a grandchild. Another Tuesday.</div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  );
}

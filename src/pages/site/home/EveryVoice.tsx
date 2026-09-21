/**
 * Movement 4 — the distinctive claim (mission.md). A life is not a solo
 * account; the same afternoon looks different to everyone who was there, and
 * A Story holds all of those voices on one moment. "That is what makes it a
 * documentary instead of a diary."
 *
 * The brief names this the movement no competitor can copy cheaply, so it
 * gets the page's largest print and its slowest scene. Photograph 30 (the
 * lake, 1975) is ambiguous on purpose — adults and a child at a distance,
 * nothing resolved — which is why it can hold three memories that disagree.
 * The payoff line is set inside the gold keyline plate: the site's single
 * ornament, spent on its most important sentence.
 *
 * Voices come from `sampleMemory.ts`, the site's one continuous fictional
 * example. `id="kept"` is kept for old links to "See the archive".
 */
import styled from "styled-components";
import { sampleMemory } from "../../../lib/sampleMemory";
import { Print } from "../kit/kit";
import { Eyebrow, Frame, Plate, SplitHead, Statement } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const Scene = styled.section`
  --ink: ${color.primary};
  --muted: ${color.body};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0;

  .voices-lead {
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
  .moment {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 88px);
    align-items: center;
  }
  .question {
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
    padding-bottom: 22px;
    margin-bottom: 6px;
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  .question small {
    display: block;
    margin-bottom: 10px;
    font: 600 12px/1.4 ${font.body};
    font-style: normal;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .voice {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 16px;
    padding: 22px 0;
    border-bottom: 1px solid ${color.primaryLine};
  }
  .voice-initial {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font: 400 20px/1 ${font.display};
    color: ${color.ivory};
    background: var(--tint);
    box-shadow: 0 0 0 3px ${color.ivory}, 0 0 0 4px var(--tint);
  }
  .voice blockquote {
    margin: 0 0 8px;
    font: 400 ${display.sm} / 1.25 ${font.display};
    color: ${color.primary};
  }
  .voice p {
    font: 400 15px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .voice p b {
    color: ${color.primary};
    font-weight: 600;
  }

  .payoff {
    margin: clamp(88px, 10vw, 160px) auto 0;
    max-width: 980px;
    text-align: center;
  }
  .payoff h3 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    letter-spacing: -0.02em;
    color: ${color.primary};
  }
  .payoff h3 em {
    font-style: normal;
    color: ${color.accent};
  }
  .payoff p {
    margin-top: 22px;
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primaryMid};
  }

  ${media.md} {
    .moment {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const tints = [color.teal, color.accent, color.primaryMid];

export default function EveryVoice() {
  const m = sampleMemory;
  const ref = useScene<HTMLElement>((root, { wide }) => {
    riseLines(root.querySelector("h2")!);
    riseLines(root.querySelector(".payoff h3")!);
    gsap.from(".voices-lead, .payoff p", {
      y: 24,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".voices-lead", start: "top 85%", once: true },
    });

    const voices = gsap.utils.toArray<HTMLElement>(".voice", root);
    if (!wide) {
      gsap.from(".moment figure", {
        y: 40,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".moment", start: "top 85%", once: true },
      });
      voices.forEach((v) =>
        gsap.from(v, {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: v, start: "top 90%", once: true },
        }),
      );
      return;
    }

    // Wide: the moment pins; the print settles, then each voice joins it.
    gsap.set(".question", { opacity: 0, y: 16 });
    gsap.set(voices, { opacity: 0, x: 40 });
    gsap
      .timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: ".moment", start: "center center", end: "+=170%", pin: true, scrub: 0.6 },
      })
      .from(".moment figure", { rotate: -4, scale: 0.9, duration: 1.1, ease: "power2.inOut" })
      .to(".question", { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to(voices, { opacity: 1, x: 0, duration: 0.8, stagger: 0.9 }, 1.1)
      .to({}, { duration: 0.5 });
  });

  return (
    <Scene ref={ref} id="kept" aria-labelledby="voices-title">
      <Frame>
        <SplitHead>
          <div>
            <Eyebrow>Everyone who was there</Eyebrow>
            <Statement id="voices-title" $size="xl">
              A life isn’t a solo <em>account.</em>
            </Statement>
          </div>
          <p className="voices-lead">
            The same afternoon looks different to the person who lived it, the
            child who was there, and the one who only heard about it for years.
            A Story keeps all of them on the same moment — nobody has to be
            corrected.
          </p>
        </SplitHead>

        <div className="moment">
          <Print
            id={m.photo}
            alt="People at the edge of a lake on a summer afternoon, around 1975"
            sizes="(max-width: 860px) 92vw, 58vw"
            tilt={-1}
            caption={`${m.title} · ${m.date.replace(" · approximate", "")}`}
          />
          <div>
            <p className="question">
              <small>A Story asked</small>“{m.question}”
            </p>
            {m.voices.map((v, i) => (
              <div className="voice" key={v.name} style={{ ["--tint" as string]: tints[i] }}>
                <span className="voice-initial" aria-hidden="true">
                  {v.name[0]}
                </span>
                <div>
                  <blockquote>“{v.quote}”</blockquote>
                  <p>
                    <b>{v.name}</b> · {v.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Plate className="payoff">
          <h3>
            Not one narrator, but <em>everyone who was in the room.</em>
          </h3>
          <p>That’s what makes it a documentary instead of a diary.</p>
        </Plate>
      </Frame>
    </Scene>
  );
}

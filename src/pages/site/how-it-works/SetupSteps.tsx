/**
 * The setup, step by step (tester report 7 Nov 2026, plan
 * docs/plans/2026-11-07-tester-report.md task 1d).
 *
 * Numbered steps, each one line open with the detail behind a native
 * <details>, beside a real screenshot of that step on the phone. Every
 * image is a capture of the app (phone-app's screenshot harness, or a
 * device capture for the iPhone's own call screen); the source of each is
 * in public/how-it-works/steps/SOURCES.md. Never a drawn phone.
 *
 * The daily call is the step people stop understanding, so it carries the
 * iPhone's own call screen when that capture exists (`device`), beside the
 * app's door.
 *
 * Copy sources (no new facts): the hour and "every day at" (phone-app
 * lib/callRoom.js trustLine), "Not today. A Story calls again tomorrow"
 * (notTodayLabel), the real call on an iPhone and the notification
 * elsewhere (lib/scheduledCall.js header), the family's side
 * (HowItWorks.tsx STEPS, "One link, no account").
 */
import styled from "styled-components";
import { Chapter, Frame, Lead, SplitHead, Statement } from "../kit/kit.styles";
import { color, display, font, media, radius, shadow, type } from "../../../styles/theme";

type Shot = { src: string; alt: string };
type Step = { line: string; detail: string; shots: Shot[] };

const DIR = "/how-it-works/steps";

const SETUP: Step[] = [
  {
    line: "Your parent installs A Story on their iPhone.",
    detail:
      "They open it once and say who they are. You can sit beside them, or walk them through it on the phone. A Story is in a private beta on iPhone for now.",
    shots: [{ src: `${DIR}/01-install-welcome.webp`, alt: "The A Story app’s first screen on an iPhone" }],
  },
  {
    line: "You choose the hour it rings.",
    detail:
      "Pick the time they are usually free. A Story calls every day at that hour, and the time can be changed or switched off whenever they like.",
    shots: [{ src: `${DIR}/02-pick-hour.webp`, alt: "Choosing the hour of the daily call in the app" }],
  },
  {
    line: "At that hour, their phone rings: A Story is calling.",
    detail:
      "On an iPhone it rings like any call, on the lock screen, so there is nothing to open first. They answer, or say not today and A Story calls again tomorrow. Where the phone cannot be rung, a notification opens the same call.",
    shots: [{ src: `${DIR}/03-phone-rings.webp`, alt: "The call arriving in the app, with today’s question on its card" }],
  },
  {
    line: "They talk. A Story asks, listens and follows.",
    detail:
      "One question at a time, out loud. It follows what they actually say, and lets go when they say no. Nothing to type.",
    shots: [{ src: `${DIR}/04-they-talk.webp`, alt: "The call in progress in the app" }],
  },
  {
    line: "The call becomes a memory, in their own words.",
    detail: "Each call keeps the memory card and the full transcript, word for word.",
    shots: [{ src: `${DIR}/05-memory-appears.webp`, alt: "The memory one call left, in the app" }],
  },
  {
    line: "The family adds what they remember.",
    detail:
      "One link, no account. Their photos and versions sit beside the original, which stays as it was.",
    shots: [{ src: `${DIR}/06-family-adds.webp`, alt: "A family member adding their side to a memory" }],
  },
];

/** The iPhone's own call screen (plan D2), added when Daniel's device capture lands. */
const DEVICE_RING = null as Shot | null;

const Section = styled(Chapter)`
  ol {
    counter-reset: step;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 3vw, 56px) clamp(20px, 2.4vw, 44px);
    margin: clamp(32px, 4vw, 64px) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    counter-increment: step;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 18px;
    min-width: 0;
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLine};
  }
  .num::before {
    content: counter(step);
    display: inline-grid;
    place-items: center;
    width: 2.1em;
    height: 2.1em;
    margin-right: 12px;
    border: 1px solid ${color.accentLine};
    border-radius: 50%;
    font: 600 ${type.label} / 1 ${font.ui};
    color: ${color.accentText};
  }
  details {
    min-width: 0;
  }
  summary {
    display: flex;
    align-items: flex-start;
    gap: 0;
    min-height: 44px;
    cursor: pointer;
    list-style: none;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary .t {
    flex: 1;
    min-width: 0;
  }
  /* The fold's hint: a small chevron that turns when open. */
  summary .chev {
    flex: none;
    width: 22px;
    height: 22px;
    margin: 0.2em 0 0 10px;
    color: ${color.accentText};
    transition: transform 200ms ease;
  }
  details[open] summary .chev {
    transform: rotate(180deg);
  }
  summary:focus-visible {
    outline: 2px solid ${color.accent};
    outline-offset: 4px;
    border-radius: 4px;
  }
  details p {
    margin: 10px 0 0 calc(2.1em + 12px);
    max-width: 44ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  .shots {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  figure {
    margin: 0;
    flex: 1 1 0;
    max-width: 260px;
  }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 390 / 844;
    object-fit: cover;
    object-position: top;
    border-radius: ${radius.xl};
    box-shadow: ${shadow.md}, 0 0 0 1px ${color.primaryLine};
    background: ${color.primaryWash};
  }
  figcaption {
    margin-top: 8px;
    font: 500 ${type.label} / 1.35 ${font.ui};
    color: ${color.bodyMuted};
  }
  .src {
    margin-top: clamp(24px, 3vw, 40px);
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    ol {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    ol {
      grid-template-columns: minmax(0, 1fr);
    }
    figure {
      max-width: 62%;
    }
    .shots:has(figure + figure) figure {
      max-width: 48%;
    }
  }
  ${media.motion} {
    summary .chev {
      transition: none;
    }
  }
`;

const Chevron = () => (
  <svg className="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SetupSteps() {
  return (
    <Section id="setup" $ground="paper" $tight aria-labelledby="setup-title">
      <Frame>
        <SplitHead>
          <Statement id="setup-title" $size="lg">
            The setup, step by step.
          </Statement>
          <Lead>What each step looks like on the phone. Open a step for the detail.</Lead>
        </SplitHead>
        <ol>
          {SETUP.map((s, i) => {
            const shots = i === 2 && DEVICE_RING ? [DEVICE_RING, ...s.shots] : s.shots;
            return (
              <li key={s.line} data-step={i + 1}>
                <details>
                  <summary>
                    <span className="num" aria-hidden="true" />
                    <span className="t">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.line}
                    </span>
                    <Chevron />
                  </summary>
                  <p>{s.detail}</p>
                </details>
                <div className="shots">
                  {shots.map((sh) => (
                    <figure key={sh.src}>
                      <img src={sh.src} alt={sh.alt} loading="lazy" decoding="async" width={390} height={844} />
                      {shots.length > 1 && (
                        <figcaption>{sh === DEVICE_RING ? "On the lock screen" : "In the app"}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="src">Screens from the A Story app with its sample family.</p>
      </Frame>
    </Section>
  );
}

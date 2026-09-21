/**
 * What the buyer actually does — the practical close of the homepage.
 *
 * Pass 10 ended the argument with a five-question FAQ that duplicated the
 * Questions page. The previous live site had a better answer for the same
 * moment: "You do step one. That's the whole job." The buyer is an adult
 * child deciding whether this becomes a project for them; three steps and
 * the price answer that faster than an accordion.
 *
 * Each step is shown in the app itself — the founder's real Figma screens
 * (public/app): Home with the question of the day, the call arriving, and
 * The Archive. The phones are large and run off the card ("zoomed in"), and
 * the tall screens scroll slowly inside them. Roman numerals in the serif carry the bookish thread.
 * Prices and the trial come from `pricing.ts`.
 */
import styled from "styled-components";
import { PLANS, TRIAL } from "../../../lib/pricing";
import { ArrowIcon } from "../kit/kit";
import { AppShot, Phone } from "../app/Phone";
import { IncomingScreen } from "../app/screens";
import {
  Actions,
  Eyebrow,
  Frame,
  PrimaryLink,
  SecondaryLink,
  Statement,
} from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const individual = PLANS.find((p) => p.id === "individual")!;

const STEPS = [
  {
    n: "I",
    who: "You",
    title: "Set it up once.",
    text: "A couple of minutes on their phone or tablet, and the hour A Story should ring. You can do it while they’re in the next room.",
  },
  {
    n: "II",
    who: "Them",
    title: "They answer the phone.",
    text: "No typing, nothing to open or save. Twenty minutes is a real conversation, and the next call picks up where the last one stopped.",
  },
  {
    n: "III",
    who: "Everyone",
    title: "The family keeps it.",
    text: "Invite anyone to read, correct and add their own memories. Inviting fifteen people costs the same as inviting nobody.",
  },
];

const Scene = styled.section`
  --ink: ${color.primary};
  --muted: ${color.body};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: clamp(96px, 11vw, 176px) 0;

  .step-head {
    margin-bottom: clamp(48px, 6vw, 96px);
  }
  .step-head h2 {
    max-width: 22ch;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid ${color.primaryLineStrong};
  }
  li {
    padding: 40px clamp(20px, 3vw, 48px) 0 0;
  }
  /* Each step shown in the app itself, on a soft card, set down at a slight angle. */
  .shot {
    display: grid;
    place-items: center;
    margin-bottom: 36px;
    padding: 36px 0 0;
    border-radius: 6px;
    background: radial-gradient(
      ellipse at 50% 100%,
      color-mix(in srgb, ${color.gold} 26%, ${color.ivory}),
      transparent 70%
    );
    overflow: hidden;
    height: clamp(420px, 40vw, 580px);
    padding-inline: 4%;
    /* Zoomed in: the phone runs off the bottom of the card, so the screen reads large. */
    mask-image: linear-gradient(#000 82%, transparent);
  }
  .shot > * {
    align-self: start;
  }
  li + li {
    padding-left: clamp(20px, 3vw, 48px);
    border-left: 1px solid ${color.primaryLine};
  }
  .n {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 28px;
    font: 400 ${display.lg} / 1 ${font.display};
    color: ${color.accent};
  }
  .n small {
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
    margin-bottom: 12px;
  }
  li > p {
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 34ch;
  }
  .terms {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px 48px;
    align-items: end;
    margin-top: clamp(56px, 6vw, 96px);
    padding-top: 28px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .terms p {
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
    max-width: 40ch;
  }
  /* Body-size serif, so the deeper terracotta that reaches 4.5:1. */
  .terms p em {
    font-style: normal;
    color: ${color.accentText};
  }
  .terms > div {
    margin: 0;
  }
  ${media.md} {
    ol,
    .terms {
      grid-template-columns: minmax(0, 1fr);
    }
    li + li {
      border-left: 0;
      padding-left: 0;
      border-top: 1px solid ${color.primaryLine};
      margin-top: 28px;
    }
  }
`;

export default function StepOne() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(root.querySelectorAll("li, .terms"), {
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "ol", start: "top 82%", once: true },
    });
  });

  return (
    <Scene ref={ref} aria-labelledby="step-title">
      <Frame>
        <header className="step-head">
          <Eyebrow>How you begin</Eyebrow>
          <Statement id="step-title" $size="xl">
            You do step one. That’s the whole <em>job.</em>
          </Statement>
        </header>
        <ol>
          {STEPS.map((s) => (
            <li key={s.n}>
              <div className="shot">
                <Phone width="min(380px, 100%)" lightStatus={s.n !== "III"}>
                  {s.n === "I" && <AppShot name="home" />}
                  {s.n === "II" && (
                    <IncomingScreen
                      when="Tuesday, 10:00"
                      question="What did the garage smell like when you were fixing things?"
                    />
                  )}
                  {s.n === "III" && <AppShot name="archive" scroll />}
                </Phone>
              </div>
              <p className="n">
                <span aria-hidden="true">{s.n}</span>
                <small>{s.who}</small>
              </p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="terms">
          <p>
            {TRIAL.headline}, then free for as long as you like. Guided calls
            from <em>{individual.price}</em>{" "}
            {individual.period.replace("per ", "a ")}.
          </p>
          <Actions>
            <PrimaryLink to="/start">
              Join the waitlist <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/pricing">Compare plans</SecondaryLink>
          </Actions>
        </div>
      </Frame>
    </Scene>
  );
}

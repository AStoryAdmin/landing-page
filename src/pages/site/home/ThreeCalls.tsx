/**
 * Movement 3 — the mechanism, as the site's signature scene.
 *
 * "Three calls. Nobody changes the subject." is the previous live site's best
 * line (astoryapp.com) and the proof the whole product rests on: good
 * listening changes the next question. Three calls, each built on a different
 * behaviour — hearing an aside, taking a no, following a detail — read as a
 * method rather than a nice script.
 *
 * Three phones, each opening on a cover with a Play button (app/CallTrio.tsx):
 * the call runs only when the reader asks for it, and the mission's verbs
 * (CM07) light up above the phones as it moves through them.
 *
 * Teal is the conversation colour (MAP.md), and this is the one full teal
 * scene on the home page. The voice layer is labelled as in development, as
 * demoScripts.ts requires.
 */
import styled from "styled-components";
import CallTrio from "../app/CallTrio";
import { ArrowIcon } from "../kit/kit";
import {
  Eyebrow,
  Frame,
  SplitHead,
  Statement,
  TextLink,
  grounds,
} from "../kit/kit.styles";
import { riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font } from "../../../styles/theme";

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
  .calls-foot {
    display: flex;
    justify-content: flex-end;
    margin-top: clamp(32px, 4vw, 56px);
  }
`;

export default function ThreeCalls() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
  });
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
            Some stories only appear because somebody asks twice. Someone lets
            something slip on the way to answering a different question — A
            Story drops its own question and goes after it.
          </p>
        </SplitHead>

        <CallTrio />

        <div className="calls-foot">
          <TextLink to="/how-it-works">
            See how it works <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Scene>
  );
}

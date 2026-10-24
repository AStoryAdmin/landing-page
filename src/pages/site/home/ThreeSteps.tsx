/**
 * How it works, in three (2026-10-23). Replaces StepOne ("You do step one.
 * That's the whole job."), which the founder called horrible: three drawn
 * phones holding the old Figma screens, their type 7 to 9px.
 *
 * The redesigned app's signed-in screens cannot be captured without signing
 * in to a real account, so each step is shown as what it looks like in a
 * family's life instead, as a print on the cloth: the daughter setting it up
 * on her father's phone, the grandmother laughing on the call at her kitchen
 * table, a mother and daughter reading the memory on the sofa. All three were
 * generated for this section (assets/generated/, public/home/); the third
 * replaced the library's 34 on 2026-10-23 so Home shares no photograph with
 * Care or Our story (jury 1, #7). The book itself is shown once, lower down.
 *
 * Calls ring in the A Story iPhone app (private beta), never as a regular
 * phone call (Bao, 2026-10-23), so step I says the app is installed on their
 * iPhone and step II says the call rings in the app.
 * When real screens of the new app exist, they belong in the step text's
 * place, cropped to what matters, not in drawn phones.
 *
 * The copy is the old section's own three steps, kept word for word where
 * they still hold. Detail lives on How it works.
 */
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import { Frame, TextLink } from "../kit/kit.styles";
import { Print } from "./bench";
import { chocolateCloth } from "../kit/cloth";
import { useScene } from "../../../lib/scrollMotion";
import { arrive, layDown, lines } from "./motion";
import { color, font, media } from "../../../styles/theme";

const STEPS = [
  {
    n: "I",
    title: "Set it up once.",
    text: "Install A Story on their iPhone together. Two minutes, then pick the hour it calls.",
    src: "/home/step-one-setup-1400.webp",
    srcSet: "/home/step-one-setup-800.webp 800w, /home/step-one-setup-1400.webp 1400w",
    alt: "A daughter showing her father something on her phone on the sofa, under the lamp",
    caption: "Two minutes on the sofa",
    tilt: -1.6,
  },
  {
    n: "II",
    title: "They answer the call.",
    text: "It rings in the app at the hour you picked. Nothing to type or save. They just talk.",
    src: "/home/step-two-call-1400.webp",
    srcSet: "/home/step-two-call-800.webp 800w, /home/step-two-call-1400.webp 1400w",
    alt: "A grandmother laughing on the phone at her kitchen table, an old photograph beside her mug",
    caption: "Ten o’clock, right on time",
    tilt: 1.3,
  },
  {
    n: "III",
    title: "The family keeps it.",
    text: "Each call becomes a memory the whole family can read, free, on a phone or at app.astoryapp.com.",
    src: "/home/step-three-family-1400.webp",
    srcSet: "/home/step-three-family-800.webp 800w, /home/step-three-family-1400.webp 1400w",
    alt: "A mother and her teenage daughter on the sofa reading something on her phone, the daughter laughing",
    caption: "Grandma’s first call, read together",
    tilt: -1,
  },
];

const Section = styled.section`
  --ink: ${color.ivory};
  --focus: ${color.gold};
  position: relative;
  ${chocolateCloth};
  color: ${color.ivory};
  padding: calc(clamp(64px, 7vw, 120px) * var(--sy)) 0 calc(clamp(72px, 8vw, 136px) * var(--sy));

  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 16px 48px;
    margin-bottom: calc(clamp(36px, 4vw, 64px) * var(--sy));
  }
  h2 {
    margin: 0;
    max-width: 22ch;
    font: 600 clamp(38px, 3.6vw, 76px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.ivory};
    text-wrap: balance;
  }
  h2 .nobr {
    white-space: nowrap;
  }
  h2 em {
    font-style: normal;
    color: ${color.warmGold};
  }
  .steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 3.4vw, 72px);
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: start;
  }
  /* The middle step sits a little lower, so the row reads as prints laid by hand. */
  .steps li:nth-child(2) {
    margin-top: clamp(24px, 3vw, 56px);
  }
  .steps figure {
    --border: clamp(8px, 0.75vw, 13px);
    --corner: clamp(18px, 1.7vw, 30px);
    --cap: clamp(17px, 1.25vw, 23px);
    --cap-ink: ${color.ivory};
    /* A print is capped by the window's height as well as its width. */
    max-width: calc((100svh - 300px) * 1.5);
  }
  /* No I / II / III: the list is ordered and the headings say the order
     (jury 2, P1; taste-skill bans index numbering). */
  .step-text {
    margin-top: clamp(18px, 1.8vw, 28px);
  }
  h3 {
    margin: 0;
    font: 600 clamp(24px, 1.9vw, 34px) / 1.08 ${font.display};
    color: ${color.ivory};
  }
  .step-text p {
    margin: 8px 0 0;
    max-width: 34ch;
    font: 400 clamp(17px, 1.2vw, 21px) / 1.5 ${font.text};
    color: ${color.onDarkMuted};
  }

  ${media.md} {
    h2 {
      font-size: 34px;
    }
    .steps {
      grid-template-columns: minmax(0, 1fr);
      gap: 44px;
    }
    .steps li:nth-child(2) {
      margin-top: 0;
    }
    .steps figure {
      max-width: none;
    }
  }
`;

export default function ThreeSteps() {
  const ref = useScene<HTMLElement>((root) => {
    lines(root.querySelector("h2"));
    arrive(root.querySelectorAll(".head > a"), { delay: 0.3 });
    layDown(root.querySelectorAll(".steps figure"), { trigger: root.querySelector(".steps"), stagger: 0.12 });
    arrive(root.querySelectorAll(".step-text"), {
      trigger: root.querySelector(".steps"),
      delay: 0.35,
      stagger: 0.12,
    });
  });

  return (
    <Section ref={ref} aria-labelledby="steps-title">
      <Frame>
        <div className="head">
          <h2 id="steps-title">
            You set it up once. <span className="nobr">A Story</span> does{" "}
            <em>the calling.</em>
          </h2>
          <TextLink to="/how-it-works#calls">
            Read a sample call <ArrowIcon />
          </TextLink>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <Print
                src={s.src}
                srcSet={s.srcSet}
                alt={s.alt}
                caption={s.caption}
                tilt={s.tilt}
                sizes="(max-width: 860px) 92vw, 30vw"
              />
              <div className="step-text">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Frame>
    </Section>
  );
}

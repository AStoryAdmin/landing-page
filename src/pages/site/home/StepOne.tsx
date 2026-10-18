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
 *
 * Until 2026-10-16 the section closed with the price ("Free for as long as
 * you like... guided calls from $119 a year") and two buttons. That line was
 * one of three places the home page quoted a price; the ladder
 * (kit/PriceLadder.tsx) now says it once, lower down.
 */
import styled from "styled-components";
import { Frame, Statement } from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, display, font, media } from "../../../styles/theme";

const STEPS = [
  {
    n: "I",
    who: "You",
    shot: "home",
    /* Rose's home screen: the question for her and "Talk with A Story". */
    at: "50% 47%",
    ground: "light",
    title: "Set it up once.",
    text: "Two minutes on their phone. Pick the hour A Story calls.",
  },
  {
    n: "II",
    who: "Them",
    shot: "talk",
    /* The call itself: A Story's question and "Listening - just start talking". */
    at: "50% 66%",
    ground: "dark",
    title: "They answer the phone.",
    text: "Nothing to type, open or save. They just talk.",
  },
  {
    n: "III",
    who: "Everyone",
    shot: "archive",
    /* The archive: Rose's book, +5 memories this month, the family's additions waiting. */
    at: "50% 9%",
    ground: "sand",
    title: "The family keeps it.",
    text: "Everyone reads, adds and remembers - free, on a phone or in any browser at app.astoryapp.com.",
  },
];

const Scene = styled.section`
  --ink: ${color.primary};
  --muted: ${color.body};
  --mark: ${color.accent};
  --label: ${color.accentText};
  background: ${color.ivory};
  padding: calc(clamp(80px, 9vw, 160px) * var(--sy)) 0;

  .step-head {
    margin-bottom: calc(clamp(32px, 5vw, 88px) * var(--sy));
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
    padding: calc(32px * var(--sy)) clamp(20px, 3vw, 48px) 0 0;
  }
  /*
   * Each step shown on the app's real screen, cropped to the part that proves
   * it (2026-10-14). The drawn phones ran their screens off the card; the
   * third, a long scrolling archive, rendered blank. Now each screen sits on a
   * field of its own colour - ivory for you, chocolate for the call, sand for
   * the family - with nothing drawn around it.
   */
  .shot {
    display: grid;
    place-items: end center;
    height: clamp(260px, min(34vw, 42svh), 520px);
    margin-bottom: calc(26px * var(--sy));
    padding: calc(26px * var(--sy)) 9% 0;
    border-radius: 6px;
    overflow: hidden;
    background: ${color.ivoryDeep};
  }
  .shot[data-ground="dark"] {
    background: ${color.primary};
  }
  .shot[data-ground="sand"] {
    background: ${color.sand};
  }
  .shot figure {
    width: 100%;
    max-width: 330px;
    height: 100%;
    margin: 0;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    background: ${color.paperPure};
    box-shadow: 0 0 0 1px color-mix(in srgb, ${color.primary} 14%, transparent);
  }
  /* Taller than its frame, so the screen can scroll inside it as the page
     scrolls (the scene below); at rest it sits on the same crop as before. */
  .shot img {
    display: block;
    width: 100%;
    height: 112%;
    object-fit: cover;
    transform: translateY(-6%);
  }
  li + li {
    padding-left: clamp(20px, 3vw, 48px);
    border-left: 1px solid ${color.primaryLine};
  }
  .n {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: calc(20px * var(--sy));
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.accent};
  }
  .n small {
    font: 600 13px/1 ${font.body};
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
  ${media.md} {
    ol {
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
    gsap.from(root.querySelectorAll("li"), {
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "ol", start: "top 82%", once: true },
    });
    /*
     * The three real screens scroll inside their frames as the page does -
     * twelve per cent of their height across the section's passage - so they
     * read as one live phone, not three stills. The header above promised
     * this and the Hallmark redesign lost it. Linear, scrubbed, and the
     * midpoint is the crop the layout shows without motion.
     */
    gsap.fromTo(
      root.querySelectorAll(".shot img"),
      { y: 0, yPercent: 0 },
      {
        y: 0,
        yPercent: -10.7,
        ease: "none",
        scrollTrigger: { trigger: "ol", start: "top 85%", end: "bottom 15%", scrub: 0.6 },
      },
    );
  });

  return (
    <Scene ref={ref} aria-labelledby="step-title">
      <Frame>
        <header className="step-head">
          <Statement id="step-title" $size="xl">
            You do step one. That’s the whole <em>job.</em>
          </Statement>
        </header>
        <ol>
          {STEPS.map((s) => (
            <li key={s.n}>
              <div className="shot" data-ground={s.ground}>
                <figure>
                  <img
                    src={`/app/${s.shot}.webp`}
                    alt=""
                    width={860}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: s.at }}
                  />
                </figure>
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
      </Frame>
    </Scene>
  );
}

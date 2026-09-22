/**
 * Our story — two letters.
 *
 * The founder asked for Daniel's story "written like a letter/essay, as in
 * the very early version, to maintain the feeling". So the page is set as
 * correspondence: an opening line, then each founder's note on its own sheet
 * of paper — salutation-free, first person, signed — and the two of them
 * together at the end.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DANIEL'S LETTER IS VERBATIM from the earliest site (09142026, architecture
 * baseline, story.tsx: "A note from Daniel Hoang Nguyen"). Don't edit it.
 * BAO'S LETTER IS A DRAFT written for the founders to approve or replace
 * (the founder asked for one to be made up). It uses only what the early
 * site says about Bao — an engineer from Michigan, semiconductor research
 * and healthcare, leads how A Story is built and tested — plus an invented
 * family detail. Confirm with Bao before launch.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * No photographs of the founders exist in the project, so none are faked:
 * each letter is signed with a monogram. Library photographs are
 * illustrative and are not used here.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, Invitation } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  PrimaryLink,
  SecondaryLink,
  Title,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Opening = styled(Chapter)`
  padding: clamp(88px, 11vw, 180px) 0 clamp(72px, 8vw, 130px);
  text-align: center;
  h1 {
    margin: 18px auto 0;
    font-size: ${display.hero};
    max-width: 15ch;
  }
  h1 em {
    font-style: italic;
  }
  .lead {
    margin: clamp(24px, 3vw, 40px) auto 0;
    font: italic 400 ${display.sm} / 1.45 ${font.display};
    color: var(--muted);
    max-width: 36ch;
  }
  .orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    width: min(260px, 60vw);
    margin: clamp(32px, 4vw, 56px) auto 0;
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
    width: 8px;
    height: 8px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
`;

/* A letter: a sheet of paper with a deckle-soft shadow and a double keyline. */
const Letters = styled(Chapter)`
  .sheet {
    position: relative;
    width: min(760px, 100%);
    margin: 0 auto;
    padding: clamp(40px, 6vw, 88px) clamp(28px, 6vw, 96px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 2px rgba(42, 31, 24, 0.08),
      0 40px 80px -50px rgba(42, 31, 24, 0.55);
  }
  .sheet::before {
    content: "";
    position: absolute;
    inset: 12px;
    border: 1px solid color-mix(in srgb, ${color.gold} 45%, transparent);
    pointer-events: none;
  }
  .sheet + .sheet {
    margin-top: clamp(72px, 9vw, 140px);
  }
  .sheet:nth-of-type(2) {
    transform: rotate(0.4deg);
  }
  .sheet p.head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    padding-bottom: 18px;
    margin-bottom: clamp(28px, 3vw, 40px);
    border-bottom: 1px solid ${color.primaryLine};
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .head span:last-child {
    color: ${color.bodyMuted};
  }
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
    margin-bottom: clamp(20px, 2.4vw, 30px);
  }
  .sheet p {
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.28rem) / 1.8 ${font.display};
    color: ${color.primary};
  }
  .sheet p + p {
    margin-top: 1.1em;
  }
  .sheet p.first::first-letter {
    float: left;
    margin: 0.08em 0.1em 0 0;
    font: 400 3.6em/0.8 ${font.display};
    color: ${color.teal};
  }
  .sheet p.turn {
    margin: 1.4em 0;
    font: italic 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.accent};
  }
  .sign {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: clamp(32px, 4vw, 48px);
  }
  .sign i {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.gold};
    font: italic 400 24px/1 ${font.display};
  }
  .sign b {
    display: block;
    font: italic 400 24px/1.1 ${font.display};
    color: ${color.primary};
  }
  .sign small {
    font: 500 14px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .sign a {
    margin-left: auto;
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  ${media.sm} {
    .sign {
      flex-wrap: wrap;
    }
    .sign a {
      margin-left: 0;
      flex-basis: 100%;
    }
  }
`;

const Together = styled(Chapter)`
  text-align: center;
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    color: var(--ink);
    max-width: 20ch;
    margin: 14px auto 0;
  }
  h2 em {
    font-style: italic;
    color: var(--mark);
  }
  p {
    margin: 22px auto 0;
    font: 400 18px/1.6 ${font.body};
    color: var(--muted);
    max-width: 50ch;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 36px;
  }
`;

function Letter({
  from,
  title,
  initial,
  name,
  role,
  link,
  children,
}: {
  from: string;
  title: string;
  initial: string;
  name: string;
  role: string;
  link: string;
  children: ReactNode;
}) {
  return (
    <article className="sheet" data-rise aria-label={`A note from ${name}`}>
      <p className="head">
        <span>A note from {from}</span>
        <span>{role}</span>
      </p>
      <h2>{title}</h2>
      {children}
      <div className="sign">
        <i aria-hidden="true">{initial}</i>
        <div>
          <b>{name}</b>
          <small>{role}</small>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </article>
  );
}

export default function OurStory() {
  const opening = useReveals<HTMLElement>();
  const letters = useReveals<HTMLElement>();
  const together = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Our story"
        path="/our-story"
        description="Why Daniel Hoang Nguyen and Bao Vo are building A Story: a place for the conversations, memories, and voices a family wants to keep."
      />
      <Opening ref={opening} $ground="ivory" aria-labelledby="story-title">
        <Frame>
          <Eyebrow>Our story</Eyebrow>
          <Title id="story-title" data-lines>
            The conversations we thought <em>could wait.</em>
          </Title>
          <p className="lead" data-rise>
            Two of Daniel’s uncles had strokes in the same year. They survived.
            But stories that had always come easily became harder to tell.
          </p>
          <span className="orn" aria-hidden="true">
            <i />
          </span>
        </Frame>
      </Opening>

      <Letters
        ref={letters}
        $ground="sand"
        aria-label="Letters from the founders"
      >
        <Frame>
          <Letter
            from="Daniel"
            title="I had never thought to ask."
            initial="D"
            name="Daniel Hoang Nguyen"
            role="Co-founder & CEO"
            link="https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/"
          >
            <p className="first">
              Two of my uncles had strokes within months of each other. They
              lived — I want to say that first, because what follows is not a
              story about dying.
            </p>
            <p>
              I watched men who had carried our family’s history, who knew the
              names and the reasons and the way we got here, struggle to find
              words that had always come easily.
            </p>
            <p className="turn">I had never thought to ask.</p>
            <p>
              I did not know how my grandparents met. I did not know what my
              uncles had been afraid of, or proudest of, or what they would have
              done differently. I am a finance researcher. I had spent years
              learning to understand systems, without turning that same
              attention toward the people who made my life.
            </p>
            <p>
              So I started building A Story: someone to ask, time to listen, and
              a place for a family to keep the answers.
            </p>
          </Letter>

          <Letter
            from="Bao"
            title="Eleven minutes of her voice."
            initial="B"
            name="Bao Vo"
            role="Co-founder & COO"
            link="https://www.linkedin.com/in/gbaovo/"
          >
            <p className="first">
              I grew up in Michigan, a long way from where my family’s stories
              started. Most of what I know about my grandparents arrived in
              pieces — a sentence at dinner, a photograph someone found in a
              drawer, an uncle correcting my mother about which year they left.
            </p>
            <p>
              For years I assumed I would put it together later. I’m an
              engineer. I believed the record would always be there to go back
              and find.
            </p>
            <p className="turn">It wasn’t.</p>
            <p>
              My grandmother used to leave me voice messages every Sunday. Then
              came an old phone, a full storage bar, an account nobody
              remembered the password to. I had hours of her talking to me. I
              have eleven minutes left.
            </p>
            <p>
              Daniel brought the reason. My job is to make sure the thing
              actually works — built, tested and put into the hands of people
              like my grandmother, who has never once opened an app on purpose.
              If it rings and she answers, we did it right.
            </p>
          </Letter>
        </Frame>
      </Letters>

      <Together ref={together} $ground="ivory" aria-labelledby="together-title">
        <Frame>
          <Eyebrow>The idea keeps growing</Eyebrow>
          <h2 id="together-title" data-lines>
            A family archive is <em>never finished.</em>
          </h2>
          <p data-rise>
            What began as a way to preserve older stories became a place for the
            whole family’s memories. The past, the present, and the different
            ways people remember the same day.
          </p>
          <div className="actions" data-rise>
            <PrimaryLink to="/start">
              Join the waitlist <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
          </div>
        </Frame>
      </Together>

      <Invitation />
    </>
  );
}

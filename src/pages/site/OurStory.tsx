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
 * BAO'S LETTER is his own text (supplied 2026-09-22), lightly tightened for
 * rhythm — no facts added. Key phrases in both letters are set as <mark>, a
 * soft gold highlighter, per the founder's request.
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
  .sheet mark {
    color: inherit;
    background: linear-gradient(
        color-mix(in srgb, ${color.gold} 45%, transparent),
        color-mix(in srgb, ${color.gold} 45%, transparent)
      )
      0 88% / 100% 0.42em no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
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
              names and the reasons and the way we got here,{" "}
              <mark>struggle to find words that had always come easily.</mark>
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
              So I started building A Story:{" "}
              <mark>
                someone to ask, time to listen, and a place for a family to keep
                the answers.
              </mark>
            </p>
          </Letter>

          <Letter
            from="Bao"
            title="The story was never told the same way twice."
            initial="B"
            name="Bao Vo"
            role="Co-founder & COO"
            link="https://www.linkedin.com/in/gbaovo/"
          >
            <p className="first">
              In my family, a story rarely belonged to one person. Someone would
              start telling it at dinner. Someone else would interrupt, because
              they remembered it differently. An old photograph would come out.
              A name would get corrected. Someone would remember a detail nobody
              had mentioned before — and suddenly that became the best part.
              Then dinner would end, the photograph would go back in the drawer,
              and{" "}
              <mark>most of what we had just heard stayed in that room.</mark>
            </p>
            <p>
              Both of my grandfathers were soldiers during the Vietnam War. My
              parents grew up through the war and the hard subsidy years that
              followed, then made their way to Saigon and built a life from
              almost nothing. That life eventually gave me the chance to come to
              the United States to study. I knew the outline of our story — the
              war, the move, the years of rebuilding, the sacrifices that made
              my own life possible. But the older I got, the more I realised how
              much I didn’t know. What were my grandfathers like as young men?
              What did my parents worry about when money was scarce? What did
              their first home in Saigon look like?
            </p>
            <p className="turn">
              I knew what happened. I didn’t always know what it felt like.
            </p>
            <p>
              I was trained as an engineer, and I spent years on complicated
              systems — thinking about how every piece fits together, and where
              something important can get lost. At some point I started looking
              at my family the same way. We had photographs, names, dates and
              places. What we didn’t have was everything around them: why a
              photograph mattered, why someone made a certain decision, the
              disagreement over how something really happened, the joke that
              only works when my father tells it.
            </p>
            <p>
              That’s what made A Story personal to me. I keep coming back to one
              question: how do you keep all of that{" "}
              <mark>without asking a family to become archivists?</mark> The
              technology can be sophisticated underneath, but my parents
              shouldn’t have to think about any of it. They should just be able
              to talk — tell it the way they remember it, disagree, go off
              topic, laugh, change their mind halfway through. Those are often
              the parts that tell you who someone really was.
            </p>
            <p className="turn">
              A family is not a résumé. A life shouldn’t become one when we
              preserve it.
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

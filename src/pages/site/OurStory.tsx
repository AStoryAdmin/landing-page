/**
 * Our story — why A Story had to exist.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE WORDS ARE DANIEL'S. Every sentence on this page is the founder's own
 * account, carried over verbatim from earlier passes. Redesign the page, not
 * the essay.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The page is composed as an essay in six beats, each with its own ground
 * so the emotional turns are felt as changes of light: they survived, the
 * stories didn't (night) → the stories were leaving first → doing the math,
 * with the one reflection set in the gold plate → the deadline was never
 * death (night, the page's turning point) → "I can call them this
 * afternoon" → someone, finally, to ask (teal: where the conversation, and
 * the product, begins). The team follows only once the reason is clear.
 *
 * No photographs. The library is illustrative, and an image here would read
 * as evidence of the founder's family. The type carries it.
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, Invitation } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryLink,
  Title,
  onDarkActions,
} from "./kit/kit.styles";
import { gsap, SplitText, useScene } from "../../lib/scrollMotion";
import { color, display, font, media } from "../../styles/theme";

const Opening = styled(Chapter)`
  padding: clamp(96px, 12vw, 200px) 0 clamp(96px, 11vw, 176px);
  h1 {
    font-size: ${display.hero};
    max-width: 14ch;
  }
  h1 em {
    font-style: italic;
  }
`;

const Essay = styled(Chapter)`
  .essay {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(36px, 7vw, 130px);
    align-items: start;
  }
  h2 {
    font: 400 ${display.lg} / 1.1 ${font.display};
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  h2 em {
    font-style: italic;
    color: var(--mark);
  }
  .essay p {
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.25rem) / 1.7 ${font.body};
    color: var(--muted);
    max-width: 44ch;
  }
  .essay p + p {
    margin-top: 20px;
  }
  .pull {
    margin-top: clamp(56px, 7vw, 110px);
    font: italic 400 ${display.md} / 1.3 ${font.display};
    color: var(--ink);
    max-width: 28ch;
  }
  details {
    margin-top: 26px;
    border-top: 1px solid var(--line);
  }
  summary {
    min-height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font: 600 16px/1.3 ${font.body};
    color: var(--ink);
  }
  summary:focus-visible {
    outline: 3px solid ${color.gold};
    outline-offset: 4px;
  }
  details p {
    padding-bottom: 12px;
  }
  .reflection {
    margin-top: clamp(64px, 8vw, 120px);
    text-align: center;
  }
  .reflection p {
    margin: auto;
    font: italic 400 ${display.md} / 1.35 ${font.display};
    color: var(--ink);
    max-width: 34ch;
  }
  ${media.md} {
    .essay {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Turn = styled(Chapter)`
  padding: clamp(120px, 14vw, 220px) 0;
  text-align: center;
  h2 {
    font: 400 ${display.xl} / 1.05 ${font.display};
    color: ${color.ivory};
    letter-spacing: -0.025em;
    max-width: 18ch;
    margin: 0 auto;
  }
  .isnt {
    display: block;
    margin-top: 0.2em;
    font: italic 400 ${display.hero} / 1 ${font.display};
    color: ${color.gold};
  }
  .turn-body {
    margin: clamp(40px, 5vw, 72px) auto 0;
    font: 400 ${display.sm} / 1.5 ${font.display};
    color: ${color.onDarkMuted};
    max-width: 40ch;
  }
  details {
    margin: 32px auto 0;
    max-width: 44ch;
  }
  summary {
    min-height: 48px;
    cursor: pointer;
    font: 600 16px/3 ${font.body};
    color: ${color.gold};
  }
  details p {
    font: 400 18px/1.7 ${font.body};
    color: ${color.onDarkMuted};
  }
  details p + p {
    margin-top: 14px;
  }
`;

const Afternoon = styled(Chapter)`
  text-align: center;
  blockquote {
    margin: 0 auto;
    font: 400 ${display.xl} / 1.1 ${font.display};
    color: ${color.primary};
    letter-spacing: -0.02em;
    max-width: 20ch;
  }
  blockquote em {
    font-style: italic;
    color: ${color.accent};
  }
  p {
    margin: 32px auto 0;
    font: 400 19px/1.6 ${font.body};
    color: ${color.body};
    max-width: 40ch;
  }
`;

const Resolution = styled(Chapter)`
  ${onDarkActions};
  .resolve {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(36px, 7vw, 130px);
    align-items: center;
  }
  h2 {
    font: 400 ${display.hero} / 1 ${font.display};
    color: ${color.ivory};
    letter-spacing: -0.03em;
  }
  h2 em {
    font-style: italic;
    color: ${color.warmGold};
  }
  .resolve > div:first-child > p {
    margin-top: 28px;
    font: 400 19px/1.6 ${font.body};
    color: ${color.onDarkMuted};
    max-width: 40ch;
  }
  details {
    margin: 24px 0 32px;
    max-width: 48ch;
    border-top: 1px solid ${color.onDarkLine};
  }
  summary {
    min-height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font: 600 16px/1.3 ${font.body};
    color: ${color.ivory};
  }
  details p {
    font: 400 17px/1.7 ${font.body};
    color: ${color.onDarkMuted};
  }
  details p + p {
    margin-top: 14px;
  }
  .card {
    background: ${color.paperPure};
    color: ${color.primary};
    padding: clamp(32px, 4vw, 56px);
    box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.6);
    transform: rotate(1.2deg);
  }
  .card small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .card blockquote {
    margin: 22px 0;
    font: 400 ${display.md} / 1.25 ${font.display};
  }
  .card p {
    font: italic 400 18px/1.5 ${font.display};
    color: ${color.primaryMid};
  }
  ${media.md} {
    .resolve {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Team = styled(Chapter)`
  padding: clamp(80px, 8vw, 128px) 0;
  .team {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(28px, 5vw, 80px);
  }
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
  }
  article {
    padding-top: 22px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .role {
    margin: 6px 0 16px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  article p {
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
  }
  article a {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    font: 600 15px/1 ${font.body};
    color: ${color.primary};
    text-underline-offset: 5px;
  }
  ${media.md} {
    .team {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function OurStory() {
  const opening = useReveals<HTMLElement>();
  const leaving = useReveals<HTMLElement>();
  const math = useReveals<HTMLElement>();
  const afternoon = useReveals<HTMLElement>();
  const resolution = useReveals<HTMLElement>();
  const team = useReveals<HTMLElement>();
  // The turning point reads under the reader's scroll: the words deepen in.
  const turn = useScene<HTMLElement>((root) => {
    SplitText.create(root.querySelector(".turn-body")!, {
      type: "words",
      autoSplit: true,
      onSplit: (split) =>
        gsap.fromTo(
          split.words,
          { color: color.primaryLight },
          {
            color: color.ivory,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".turn-body",
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        ),
    });
    gsap.from(".isnt", {
      yPercent: 40,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: ".isnt", start: "top 85%", once: true },
    });
  });

  return (
    <>
      <EditorialSeo
        title="Our story — They survived. The stories didn’t."
        path="/our-story"
        description="Daniel Hoang Nguyen on the unasked questions that became A Story: someone, finally, to ask."
      />

      <Opening ref={opening} $ground="night" aria-labelledby="story-title">
        <Frame>
          <Eyebrow>Our story · Daniel Hoang Nguyen, co-founder</Eyebrow>
          <Title id="story-title" data-lines>
            They survived. <em>The stories didn’t.</em>
          </Title>
        </Frame>
      </Opening>

      <Essay ref={leaving} $ground="ivory" aria-labelledby="leaving-title">
        <Frame>
          <div className="essay">
            <h2 id="leaving-title" data-lines>
              The stories were leaving first.
            </h2>
            <div data-rise>
              <p>
                Two of my uncles had strokes within months of each other. They
                lived — I want to say that first, because what follows is not a
                story about dying.
              </p>
              <p>
                I watched men who had carried our family’s history, who knew the
                names and the reasons and the way we got here, struggle to find
                words that had always come easily.
              </p>
            </div>
          </div>
          <p className="pull" data-rise>
            Going quiet while the people were still in the room with me.
          </p>
        </Frame>
      </Essay>

      <Essay ref={math} $ground="paper" aria-labelledby="math-title">
        <Frame>
          <div className="essay">
            <div>
              <Eyebrow>The conversations I had assumed</Eyebrow>
              <h2 id="math-title" data-lines>
                So I did what I always do. <em>I started doing the math.</em>
              </h2>
            </div>
            <div data-rise>
              <p>
                How many conversations had I assumed I would have someday? How
                many questions had I been saving for a later that was, quietly,
                running out?
              </p>
              <details>
                <summary>The questions I had never asked</summary>
                <p>
                  I did not know how my grandparents met. I did not know what my
                  uncles had been afraid of, or proudest of, or what they would
                  have done differently. I am a finance researcher — I have
                  spent my adult life learning to read signal out of systems, on
                  a track toward a PhD and a quiet career teaching it. I had
                  never once turned that attention on the people who made mine.
                </p>
              </details>
            </div>
          </div>
          <Plate className="reflection" data-rise>
            <p>
              There’s no model for that loss. No regression that tells you what
              a story was worth. You just feel it — a door closing in a room you
              didn’t know you needed.
            </p>
          </Plate>
        </Frame>
      </Essay>

      <Turn ref={turn} $ground="night" aria-labelledby="turn-title">
        <Frame>
          <Eyebrow style={{ justifyContent: "center" }}>
            Here is the part I had wrong
          </Eyebrow>
          <h2 id="turn-title">
            I had always assumed the deadline was death.
            <span className="isnt">It isn’t.</span>
          </h2>
          <p className="turn-body">
            What I cannot get back is the version of them that could tell me
            about 1974 in their own words, unprompted, the way it used to come
            out at the table when nobody was trying.
          </p>
          <details>
            <summary>What changed the way I saw it</summary>
            <p>That version left earlier, and nobody announced it.</p>
            <p>
              The window does not close when someone dies. It closes quietly,
              years before that, in the ordinary weeks nobody thought to record.
            </p>
          </details>
        </Frame>
      </Turn>

      <Afternoon
        ref={afternoon}
        $ground="ivory"
        aria-labelledby="afternoon-title"
      >
        <Frame>
          <Eyebrow style={{ justifyContent: "center" }}>
            My uncles are alive
          </Eyebrow>
          <blockquote id="afternoon-title" data-lines>
            “I can call them this afternoon, <em>and I do.</em>”
          </blockquote>
          <p data-rise>
            This is not a story about dying. It is about asking while the answer
            is still theirs to give.
          </p>
        </Frame>
      </Afternoon>

      <Resolution
        ref={resolution}
        $ground="teal"
        aria-labelledby="resolve-title"
      >
        <Frame className="resolve">
          <div>
            <Eyebrow>That is why A Story exists</Eyebrow>
            <h2 id="resolve-title" data-lines>
              Someone, finally, <em>to ask.</em>
            </h2>
            <p data-rise>
              So I stopped waiting for someday and started building A Story.
            </p>
            <details data-rise>
              <summary>From that realization to A Story</summary>
              <p>
                The idea is simple because the need is simple: someone, finally,
                to ask. Not a journalist. Not a therapist. A warm presence that
                sits with the people you love and says: I have time. Tell me
                everything. And then turns what they share into something a
                family can keep — in their own voice, in their own words,
                arranged into the shape of a life.
              </p>
              <p>
                It calls them. They answer the phone and talk. That is the
                entire thing we ask of the person whose story it is, because
                every extra step is a place where this quietly does not happen.
              </p>
            </details>
            <PrimaryLink to="/how-it-works" data-rise>
              See how the conversation begins <ArrowIcon />
            </PrimaryLink>
          </div>
          <div className="card" data-rise>
            <small>One question. Room for an answer.</small>
            <blockquote>
              “What is one thing you remember about home?”
            </blockquote>
            <p>
              The conversation begins here. The family archive keeps it going.
            </p>
          </div>
        </Frame>
      </Resolution>

      <Team ref={team} $ground="ivory" aria-labelledby="team-title">
        <Frame className="team">
          <h2 id="team-title" data-rise>
            The people building it.
          </h2>
          <article data-rise>
            <h3>Daniel Hoang Nguyen</h3>
            <p className="role">Co-founder &amp; CEO</p>
            <p>
              Finance researcher at Illinois. Built A Story after two strokes in
              one year took his uncles’ stories before they took anything else.
            </p>
            <a href="https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/">
              Daniel on LinkedIn ↗
            </a>
          </article>
          <article data-rise>
            <h3>Bao Vo</h3>
            <p className="role">Co-founder &amp; COO</p>
            <p>
              Engineer out of Michigan, with experience in semiconductor
              research and healthcare. Leads how A Story is built, tested and
              brought into people’s hands.
            </p>
            <a href="https://www.linkedin.com/in/gbaovo/">Bao on LinkedIn ↗</a>
          </article>
        </Frame>
      </Team>

      <Invitation />
    </>
  );
}

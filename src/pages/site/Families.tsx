/**
 * For families — why this matters to different people in one family.
 *
 * Home argues the idea; How it works shows the mechanism; this page is
 * organised around the reasons someone actually begins: asking a parent,
 * recording their own life, adding another version of the same day,
 * remembering someone who has died, and giving it as a gift. Each reason is
 * one scene with one photograph chosen for that reason, alternating sides so
 * the page reads as a sequence rather than a stack of cards.
 *
 * Pass 10's version repeated Home's lake example with the same voice tabs.
 * The idea stays (more than one version) but it is shown with a different
 * photograph and pointed at How it works for the demonstration.
 * `#your-own-story` is linked from the header and a legacy redirect.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { PLANS } from "../../lib/pricing";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Chapter, Eyebrow, Frame, Plate, PrimaryLink, Statement, TextLink, type Ground } from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Scene = styled(Chapter)`
  .scene {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(36px, 7vw, 130px);
    align-items: center;
  }
  &.flip .scene > :first-child {
    order: 2;
  }
  .scene-copy p {
    margin: 26px 0 8px;
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.25rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
  .scene-copy h2 i {
    font-style: italic;
  }
  ${media.md} {
    .scene {
      grid-template-columns: minmax(0, 1fr);
    }
    &.flip .scene > :first-child {
      order: 0;
    }
  }
`;

function Reason({
  id,
  eyebrow,
  title,
  text,
  action,
  art,
  ground = "ivory",
  flip = false,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  action: ReactNode;
  art: ReactNode;
  ground?: Ground;
  flip?: boolean;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Scene ref={ref} id={id} $ground={ground} className={flip ? "flip" : ""}>
      <Frame className="scene">
        <div className="scene-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Statement data-lines>{title}</Statement>
          <p data-rise>{text}</p>
          <div data-rise>{action}</div>
        </div>
        <div data-rise>{art}</div>
      </Frame>
    </Scene>
  );
}

const Keepsake = styled(Plate)`
  background: ${color.paperPure};
  display: grid;
  gap: 18px;
  padding: clamp(36px, 4vw, 64px);
  span {
    font: italic 400 ${display.md} / 1.25 ${font.display};
    color: ${color.primary};
  }
  span + span {
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLine};
  }
  span:last-child {
    color: ${color.accent};
  }
`;

/** Express is the plan the pricing file itself calls the straightforward gift. */
const express = PLANS.find((p) => p.id === "express")!;

const GiftPlate = styled(Plate)`
  background: ${color.paperPure};
  display: grid;
  gap: 6px;
  small {
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  b {
    font: 400 ${display.xl} / 1 ${font.display};
    color: ${color.primary};
  }
  span {
    font: 500 15px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  p {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLine};
    font: italic 400 19px/1.5 ${font.display};
    color: ${color.primaryMid};
  }
`;

export default function Families() {
  return (
    <>
      <EditorialSeo
        title="For families — the stories between you"
        path="/for-families"
        description="For the questions you want to ask your parents, the life you want to record yourself, and the days your family remembers differently."
      />
      <PageOpening
        eyebrow="For families"
        title={
          <>
            The stories <em>between you.</em>
          </>
        }
        lead="Nobody loses the wedding photos. They lose everything around them — the story he tells every Thanksgiving, and why everyone in that photograph is laughing."
        actions={
          <PrimaryLink to="/start">
            Join the waitlist <ArrowIcon />
          </PrimaryLink>
        }
        media={
          <Print
            id="34"
            alt="A family comparing photographs and recollections around a table"
            sizes="(max-width: 860px) 92vw, 44vw"
            priority
          />
        }
      />

      <Reason
        eyebrow="For your parents"
        ground="paper"
        title={
          <>
            “I know the story. I’ve never heard <em>their version.</em>”
          </>
        }
        text="You may know where they grew up without knowing what it felt like. Help them set up once, choose a comfortable hour, and let the conversation find its own way."
        action={<TextLink to="/how-it-works#calls">Read a conversation <ArrowIcon /></TextLink>}
        art={<Print id="12" alt="A person on a wall telephone in a hallway, around 1981" tilt={-1.2} sizes="(max-width: 860px) 80vw, 36vw" />}
      />

      <Reason
        id="your-own-story"
        eyebrow="For your own life"
        flip
        title={
          <>
            “I’d like them to know <em>why.</em>”
          </>
        }
        text="You don’t have to wait until your life feels finished. Talk about a decision, a friendship, an ordinary week — or write, when you’d rather write. This afternoon belongs here too."
        action={<TextLink to="/start">Begin with your own story <ArrowIcon /></TextLink>}
        art={<Print id="25" alt="An adult and a child cooking together in a kitchen" sizes="(max-width: 860px) 92vw, 44vw" />}
      />

      <Reason
        eyebrow="More than one version"
        ground="sand"
        title={
          <>
            “We were all there. We remember it <em>differently.</em>”
          </>
        }
        text="Invite the family at no extra cost. Each account is kept in the teller’s name, beside the others — nobody’s version has to replace anybody else’s."
        action={<TextLink to="/how-it-works">See what the family adds <ArrowIcon /></TextLink>}
        art={<Print id="23" alt="Two adults looking through old photographs together" sizes="(max-width: 860px) 92vw, 44vw" />}
      />

      <Reason
        eyebrow="Someone who has already gone"
        flip
        title={
          <>
            A memory you can still <em>add to.</em>
          </>
        }
        text="Write what you remember: what their kitchen smelled like, the thing they always said. A shared archive can hold their memory without pretending to speak for them."
        action={<TextLink to="/guides">Guides for remembering someone <ArrowIcon /></TextLink>}
        art={
          <Keepsake aria-label="What a family can keep">
            <span>A photograph.</span>
            <span>The thing they always said.</span>
            <span>Your version of that day.</span>
          </Keepsake>
        }
      />

      <Reason
        eyebrow="As a gift"
        ground="paper"
        title={
          <>
            A thoughtful gift. A <em>willing</em> storyteller.
          </>
        }
        text="Start by asking whether they would enjoy it. Choose a plan together, pick the hour, and leave room to pause or skip any question."
        action={<TextLink to="/pricing">Compare plans <ArrowIcon /></TextLink>}
        art={
          <GiftPlate>
            <small>{express.name}</small>
            <b>{express.price}</b>
            <span>{express.period}</span>
            <p>{express.blurb}</p>
          </GiftPlate>
        }
      />

      <Invitation />
    </>
  );
}

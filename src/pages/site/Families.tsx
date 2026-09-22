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
 * Pass 11e (founder: "children gifting it to grandparents on special
 * occasions, or how they use it together"): two new rooms open the page —
 * the OCCASIONS it is given for, as a row of cards, and USING IT TOGETHER,
 * shown on the app's real Figma screens (public/app). The gift reason moved
 * up into the occasions. The opening and occasion photographs use the
 * generated assets documented in docs/image-prompts.md.
 *
 * `#your-own-story` is linked from the header and a legacy redirect.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { PLANS } from "../../lib/pricing";
import { AppShot, Phone } from "./app/Phone";
import { ArrowIcon, Invitation, PageOpening, Picture, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryLink,
  Statement,
  TextLink,
  type Ground,
} from "./kit/kit.styles";
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

/* ── The occasions ─────────────────────────────────────────────────────── */

/** Fictional occasion scenes — see docs/image-prompts.md, "For families". */
const OCCASIONS = [
  {
    slot: "occasion-birthday",
    name: "A birthday",
    line: "Wrap the first question.",
    photo: "F02",
    alt: "A grandson talking with his grandfather beside an A Story birthday gift",
  },
  {
    slot: "occasion-parents-day",
    name: "Mother’s & Father’s Day",
    line: "Ask what they’ve never been asked.",
    photo: "F03",
    alt: "A daughter capturing her mother’s story with the A Story app",
  },
  {
    slot: "occasion-grandparents-day",
    name: "Grandparents Day",
    line: "Let the grandchildren listen in.",
    photo: "F04",
    alt: "A grandmother telling her grandchildren a story while A Story records on her phone",
  },
  {
    slot: "occasion-holidays",
    name: "The holidays",
    line: "When everyone’s finally in one house.",
    photo: "F05",
    alt: "Three generations listening to a story after holiday dinner",
  },
  {
    slot: "occasion-anniversary",
    name: "An anniversary",
    line: "Fifty years, in both their words.",
    photo: "F06",
    alt: "An older couple laughing over their wedding photograph on an A Story book",
  },
];

const Occasions = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: clamp(14px, 1.6vw, 24px);
    margin-top: clamp(36px, 4vw, 64px);
  }
  .row:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .occ {
    display: flex;
    flex-direction: column;
    background: ${color.paperPure};
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 30px 60px -44px rgba(42, 31, 24, 0.55);
  }
  .occ .img {
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }
  .occ img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .occ:hover img {
    transform: scale(1.04);
  }
  .occ div + div {
    padding: 18px 18px 22px;
  }
  .occ small {
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .occ p {
    margin-top: 8px;
    font: 400 20px/1.3 ${font.display};
    color: ${color.primary};
  }
  .gift {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px 40px;
    margin-top: clamp(32px, 4vw, 56px);
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }
  .gift p {
    font: 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primary};
    max-width: 44ch;
  }
  .gift b {
    font-weight: 500;
    color: ${color.accentText};
  }
  ${media.lg} {
    .row {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      margin-inline: calc(var(--page-gutter) * -1);
      padding: 0 var(--page-gutter) 16px;
    }
    .occ {
      flex: 0 0 min(260px, 70vw);
      scroll-snap-align: start;
    }
  }
`;

/* ── Using it together ─────────────────────────────────────────────────── */

const TOGETHER = [
  {
    shot: "home",
    scroll: false,
    title: "Ask it together.",
    line: "Tap Live Conversation at the kitchen table and let the whole room listen in.",
  },
  {
    shot: "memory",
    scroll: true,
    title: "Listen back together.",
    line: "Every memory keeps the words, the photographs and who told it.",
  },
  {
    shot: "family",
    scroll: false,
    title: "Everyone in the circle.",
    line: "Add the people who were there — grandparents, cousins, the oldest friend.",
  },
];

const Together = styled(Chapter)`
  .cols {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 56px);
    margin-top: clamp(40px, 5vw, 72px);
  }
  .col {
    display: grid;
    justify-items: center;
    text-align: center;
  }
  .stage {
    width: 100%;
    display: grid;
    place-items: center;
    height: clamp(420px, 38vw, 560px);
    overflow: hidden;
    padding-top: 32px;
    border-radius: 20px;
    background: radial-gradient(
      ellipse at 50% 100%,
      color-mix(in srgb, ${color.gold} 28%, ${color.ivory}),
      transparent 70%
    );
    mask-image: linear-gradient(#000 82%, transparent);
  }
  .stage > * {
    align-self: start;
  }
  h3 {
    margin-top: 24px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .col p {
    margin-top: 10px;
    font: 400 17px/1.55 ${font.body};
    color: ${color.body};
    max-width: 30ch;
  }
  ${media.md} {
    .cols {
      grid-template-columns: minmax(0, 1fr);
      gap: 56px;
    }
  }
`;

function OccasionsRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Occasions ref={ref} $ground="sand" aria-labelledby="occasions-title">
      <Frame>
        <Eyebrow>For the people who have everything</Eyebrow>
        <Statement id="occasions-title" $size="xl" data-lines>
          Give them the question they’ve been <em>waiting for.</em>
        </Statement>
        <div
          className="row"
          tabIndex={0}
          role="region"
          aria-label="Occasions, scrollable"
        >
          {OCCASIONS.map((o) => (
            <article key={o.slot} className="occ" data-rise>
              <div className="img">
                <Picture
                  id={o.photo}
                  alt={o.alt}
                  sizes="(max-width: 1024px) 70vw, 18vw"
                />
              </div>
              <div>
                <small>{o.name}</small>
                <p>{o.line}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gift" data-rise>
          <p>
            The easiest to give: {express.name}, <b>{express.price}</b> one time
            — about a month of calls and the first 40 pages of the book. Nothing
            renews.
          </p>
          <TextLink to="/pricing">
            Compare plans <ArrowIcon />
          </TextLink>
        </div>
      </Frame>
    </Occasions>
  );
}

function TogetherRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Together ref={ref} $ground="ivory" aria-labelledby="together-title">
      <Frame>
        <Eyebrow>Three generations, one phone</Eyebrow>
        <Statement id="together-title" $size="xl" data-lines>
          Better <em>together.</em>
        </Statement>
        <div className="cols">
          {TOGETHER.map((t) => (
            <div key={t.shot} className="col" data-rise>
              <div className="stage">
                <Phone width="min(320px, 88%)" lightStatus={t.shot === "home"}>
                  <AppShot name={t.shot} scroll={t.scroll} />
                </Phone>
              </div>
              <h3>{t.title}</h3>
              <p>{t.line}</p>
            </div>
          ))}
        </div>
      </Frame>
    </Together>
  );
}

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
            id="F01"
            alt="A grandmother unwrapping an A Story book beside her granddaughter"
            sizes="(max-width: 860px) 92vw, 44vw"
            priority
          />
        }
      />

      <OccasionsRoom />
      <TogetherRoom />

      <Reason
        eyebrow="For your parents"
        ground="paper"
        title={
          <>
            “I know the story. I’ve never heard <em>their version.</em>”
          </>
        }
        text="You may know where they grew up without knowing what it felt like. Help them set up once, choose a comfortable hour, and let the conversation find its own way."
        action={
          <TextLink to="/how-it-works#calls">
            Watch a call <ArrowIcon />
          </TextLink>
        }
        art={
          <Print
            id="12"
            alt="A person on a wall telephone in a hallway, around 1981"
            tilt={-1.2}
            sizes="(max-width: 860px) 80vw, 36vw"
          />
        }
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
        action={
          <TextLink to="/your-story">
            Begin with your own story <ArrowIcon />
          </TextLink>
        }
        art={
          <Print
            id="25"
            alt="An adult and a child cooking together in a kitchen"
            sizes="(max-width: 860px) 92vw, 44vw"
          />
        }
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
        action={
          <TextLink to="/how-it-works">
            See what the family adds <ArrowIcon />
          </TextLink>
        }
        art={
          <Print
            id="23"
            alt="Two adults looking through old photographs together"
            sizes="(max-width: 860px) 92vw, 44vw"
          />
        }
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
        action={
          <TextLink to="/guides">
            Guides for remembering someone <ArrowIcon />
          </TextLink>
        }
        art={
          <Keepsake aria-label="What a family can keep">
            <span>A photograph.</span>
            <span>The thing they always said.</span>
            <span>Your version of that day.</span>
          </Keepsake>
        }
      />

      <Invitation />
    </>
  );
}

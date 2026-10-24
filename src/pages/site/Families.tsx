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
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";
import { START_HREF, START_LABEL } from "../../lib/app";

/* ── The reasons ───────────────────────────────────────────────────────── */

/*
 * Phase 2 (2026-10-23): the four reasons were four alternating screens, each
 * a half-page photograph beside one sentence (the review: "the alternating
 * split rows remain"). They are one room now - four cards side by side on a
 * wide screen, two on a tablet, one on a phone - each a print, the line in
 * the person's voice, one sentence and where to go next.
 */
const Reasons = styled(Chapter)`
  h2 {
    max-width: 22ch;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(28px, 2.6vw, 56px);
    margin-top: clamp(36px, 4vw, 64px);
    align-items: start;
  }
  article {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .art {
    position: relative;
    aspect-ratio: 4 / 5;
    padding: clamp(8px, 0.7vw, 12px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.12),
      0 18px 34px -20px rgba(42, 31, 24, 0.5);
  }
  .art .win {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .art img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .kicker {
    margin-top: 22px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--label);
  }
  h3 {
    margin-top: 10px;
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  h3 em {
    font-style: normal;
    color: var(--mark);
  }
  article > p:not(.kicker) {
    margin: 12px 0 10px;
    font: 400 clamp(1.05rem, 1rem + 0.2vw, 1.2rem) / 1.55 ${font.text};
    color: var(--ink);
  }
  article > div:last-child {
    margin-top: auto;
  }
  ${media.xl} {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .art {
      aspect-ratio: 4 / 3;
    }
  }
`;

type ReasonCard = {
  id?: string;
  kicker: string;
  title: ReactNode;
  text: string;
  action: ReactNode;
  photo?: { id: string; alt: string };
};

const REASONS: ReasonCard[] = [
  {
    kicker: "For your parents",
    title: (
      <>
        “I know the story. I’ve never heard <em>their version.</em>”
      </>
    ),
    text: "You may know where they grew up without knowing what it felt like. Help them set up once, choose a comfortable hour, and let the conversation find its own way.",
    action: (
      <TextLink to="/how-it-works#calls">
        Watch a call <ArrowIcon />
      </TextLink>
    ),
    photo: {
      id: "12",
      alt: "A person on a wall telephone in a hallway, around 1981",
    },
  },
  {
    id: "your-own-story",
    kicker: "For your own life",
    title: (
      <>
        “I’d like them to know <em>why.</em>”
      </>
    ),
    text: "You don’t have to wait until your life feels finished. Talk about a decision, a friendship, an ordinary week - or write, when you’d rather write.",
    action: (
      <TextLink to="/your-story">
        Begin with your own story <ArrowIcon />
      </TextLink>
    ),
    photo: {
      id: "25",
      alt: "An adult and a child cooking together in a kitchen",
    },
  },
  {
    kicker: "More than one version",
    title: (
      <>
        “We were all there. We remember it <em>differently.</em>”
      </>
    ),
    text: "Invite the family at no extra cost. Each account is kept in the teller’s name, beside the others, and nobody’s version replaces anybody else’s.",
    action: (
      <TextLink to="/how-it-works">
        See what the family adds <ArrowIcon />
      </TextLink>
    ),
    photo: {
      id: "23",
      alt: "Two adults looking through old photographs together",
    },
  },
  {
    kicker: "Someone who has already gone",
    title: (
      <>
        A memory you can still <em>add to.</em>
      </>
    ),
    text: "Write what you remember: what their kitchen smelled like, the thing they always said. A shared archive can hold their memory without speaking for them.",
    action: (
      <TextLink to="/guides">
        Guides for remembering someone <ArrowIcon />
      </TextLink>
    ),
  },
];

function ReasonsRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Reasons ref={ref} $ground="ivory" aria-labelledby="reasons-title">
      <Frame>
        <Statement id="reasons-title" $size="lg" data-lines>
          Why a family <em>begins.</em>
        </Statement>
        <div className="grid">
          {REASONS.map((r) => (
            <article key={r.kicker} id={r.id} data-rise>
              <div className="art">
                {r.photo ? (
                  <div className="win">
                    <Picture
                      id={r.photo.id}
                      alt={r.photo.alt}
                      sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                    />
                  </div>
                ) : (
                  <Keepsake aria-label="What a family can keep">
                    <span>A photograph.</span>
                    <span>The thing they always said.</span>
                    <span>Your version of that day.</span>
                  </Keepsake>
                )}
              </div>
              <p className="kicker">{r.kicker}</p>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <div>{r.action}</div>
            </article>
          ))}
        </div>
      </Frame>
    </Reasons>
  );
}

const Keepsake = styled(Plate)`
  height: 100%;
  box-sizing: border-box;
  background: ${color.paperPure};
  display: grid;
  align-content: center;
  gap: 18px;
  padding: clamp(24px, 2.4vw, 44px);
  span {
    font: italic 500 ${display.sm} / 1.25 ${font.display};
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
  /*
   * A frieze of prints, not five tiles. Five identical rounded cards in a row
   * is the shape every template ships; these are the same photographs laid
   * out on the sand the way the rest of the site lays out prints - square,
   * keylined, alternately dropped so the row has a rhythm - with the occasion
   * named underneath in the caption voice and the line it earns in serif.
   */
  .occ {
    display: flex;
    flex-direction: column;
  }
  .occ:nth-child(even) {
    margin-top: 0;
  }
  .occ .img {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: ${color.ivoryDeep};
    box-shadow: 0 24px 48px -30px rgba(42, 31, 24, 0.68);
  }
  .occ .img::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(42, 31, 24, 0.18);
    pointer-events: none;
  }
  .occ img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .occ:hover img {
      transform: scale(1.035);
    }
  }
  .occ div + div {
    padding: 16px 0 0;
  }
  .occ small {
    font: italic 400 15px/1.3 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.bodyMuted};
  }
  .occ p {
    margin-top: 6px;
    font: 400 20px/1.28 ${font.display};
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
    shot: "group-call",
    title: "Call it together.",
    line: "Up to four phones on one call - the grandkids in three cities, Grandma at home. A Story keeps what’s said.",
  },
  {
    shot: "memory",
    title: "Listen back together.",
    line: "Every memory keeps the words, the photographs and who told it.",
  },
  {
    shot: "family-tree",
    title: "Everyone on the tree.",
    line: "Parents, partners, children and cousins on one family tree - and anyone can join with a six-letter code.",
  },
];

const Together = styled(Chapter)`
  .cols {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 56px);
    margin-top: calc(clamp(32px, 4vw, 72px) * var(--sy));
  }
  .col {
    display: grid;
    align-content: start;
    justify-items: center;
    text-align: center;
  }
  /* Real screens, cropped and fading, not drawn phones (2026-10-14) — the
     same treatment as the home page's app screens. Height-capped for laptops. */
  .screen {
    width: min(100%, 290px, calc(48svh * 860 / 1250));
    aspect-ratio: 860 / 1250;
    margin: 0;
    border-radius: 22px;
    overflow: hidden;
    background: ${color.paperPure};
    box-shadow: 0 0 0 1px ${color.primaryLine};
    mask-image: linear-gradient(#000 80%, transparent);
  }
  .screen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  h3 {
    margin-top: 24px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .col p {
    margin-top: 10px;
    font: 400 17px/1.55 ${font.text};
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
          The gift of a good <em>question.</em>
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
            - about a month of calls and a Classic Hardcover once printed
            ordering opens. Nothing renews.
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
              <figure className="screen">
                <img
                  src={`/app/${t.shot}.webp`}
                  alt=""
                  width={860}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
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
        title="For families - the stories between you"
        path="/for-families"
        description="For the questions you want to ask your parents, the life you want to record yourself, and the days your family remembers differently."
      />
      <PageOpening
        title={
          <>
            The stories <em>between you.</em>
          </>
        }
        lead="Nobody loses the wedding photos. They lose everything around them - the story he tells every Thanksgiving, and why everyone in that photograph is laughing."
        actions={
          <PrimaryLink to={START_HREF}>
            {START_LABEL} <ArrowIcon />
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

      <ReasonsRoom />

      <Invitation />
    </>
  );
}

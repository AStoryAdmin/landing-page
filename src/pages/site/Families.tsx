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
 * the OCCASIONS it is given for, as a row of cards, and USING IT TOGETHER.
 * The gift reason moved up into the occasions. The opening and occasion
 * photographs use the generated assets documented in docs/image-prompts.md.
 *
 * Fix round 3 (2026-10-24, jury 1 #1): "Better together" had lost its
 * pictures and was ~600px of paper for 45 words. Its three facts (group calls,
 * the family tree and its code, who told what) now live in the "More than one
 * version" reason, and the last reason has a print of its own (library 15,
 * used nowhere else) in place of the text plate, so every reason is a print.
 *
 * `#your-own-story` is linked from the header and a legacy redirect.
 *
 * Premium pass (2026-11-02, design spec §4A, D10): the opening is on ivory
 * with "Watch the film · 49 s" beside Start free; the reason card about
 * someone who has died is gone (with its photograph and its guides link),
 * so three reasons sit in one row; the occasions are a Scroller; the FAQ's
 * own answer on giving sits under them beside Express; invited family get
 * a short way in to /join.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { OFFERS } from "../../lib/founding";
import { PLANS } from "../../lib/pricing";
import { groups as faqGroups } from "./faqData";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import Scroller from "./kit/Scroller";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  PrimaryLink,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import {
  color,
  curve,
  display,
  font,
  media,
  space,
  type,
} from "../../styles/theme";
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 2.6vw, 56px);
    margin-top: clamp(36px, 4vw, 64px);
    /* Rows stretch, so every "where next" link sits on one line. */
    align-items: stretch;
  }
  article {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  /* Every photograph here is a print with photo corners (jury 1 #8). */
  .art {
    position: relative;
  }
  .kicker {
    margin-top: 22px;
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.01em;
    color: var(--label);
  }
  h3 {
    margin-top: 10px;
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  /* The accent word in the darker rust: 4.5:1 on ivory (jury 2 P4). */
  h3 em {
    font-style: normal;
    color: ${color.accentText};
  }
  article > p:not(.kicker) {
    margin: 12px 0 10px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--ink);
  }
  article > div:last-child {
    margin-top: auto;
  }
  /* For family who were invited (Tuan): the door to /join. */
  .invited {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${space.md} ${space.xxl};
    align-items: baseline;
    margin-top: calc(${space.xxxl} * var(--sy));
    padding-top: ${space.lg};
    border-top: 1px solid var(--line);
  }
  .invited h3 {
    margin-top: 0;
  }
  .invited p {
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--ink);
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .art {
      max-width: 420px;
    }
    .invited {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

type ReasonCard = {
  id?: string;
  kicker: string;
  title: ReactNode;
  text: string;
  action: ReactNode;
  photo: { id: string; alt: string; focus?: string };
};

const REASONS: ReasonCard[] = [
  {
    kicker: "For your parents",
    title: (
      <>
        “I know the story. I’ve never heard <em>their version.</em>”
      </>
    ),
    text: "You may know where they grew up without knowing what it felt like. They install A Story on their iPhone once, you choose a comfortable hour, and the call rings in the app.",
    action: (
      <TextLink to="/how-it-works#calls">See a sample call</TextLink>
    ),
    photo: {
      id: "09",
      alt: "Grown-ups talking over the end of a picnic lunch, 1964",
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
      <TextLink to="/your-story">Begin with your own story</TextLink>
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
    text: "Invite the family at no extra cost. Anyone joins the family tree with a six-letter code, and up to four iPhones can share one call in the app. Each version is kept in the teller’s name, and nobody’s replaces anybody else’s.",
    action: (
      <TextLink to="/how-it-works">See what the family adds</TextLink>
    ),
    photo: {
      id: "28",
      alt: "A family laughing together in a living room, 1986",
    },
  },
];

function ReasonsRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Reasons ref={ref} $ground="ivory" aria-labelledby="reasons-title">
      <Frame>
        <Statement id="reasons-title" $size="lg" data-lines>
          Why a family begins.
        </Statement>
        <div className="grid" data-rise>
          {REASONS.map((r) => (
            <article key={r.kicker} id={r.id}>
              <div className="art">
                <Print
                  id={r.photo.id}
                  alt={r.photo.alt}
                  ratio="4 / 5"
                  focus={r.photo.focus}
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                />
              </div>
              <p className="kicker">{r.kicker}</p>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <div>{r.action}</div>
            </article>
          ))}
        </div>
        {/* Source: home/FamilyLoop.tsx:47, turned to "you". */}
        <div className="invited">
          <h3>Invited to add to someone’s book?</h3>
          <div>
            <p>
              Read what’s shared and add what you remember, under your own
              name. Nothing appears until the storyteller says yes.
            </p>
            <TextLink to="/join">Open your invitation</TextLink>
          </div>
        </div>
      </Frame>
    </Reasons>
  );
}

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

/** The frieze's prints are laid down by hand: every other one a little
    turned (spec §3.5: at most every other print tilted, never past 2°). */
const TILTS = [-1.2, 0, 0.8, 0, -0.9];

/** The FAQ's own answer, word for word (faqData.ts, "How does giving A Story
    work?"), so the two never drift apart. */
const GIVING = faqGroups
  .flatMap((g) => g.items)
  .find((i) => i.q === "How does giving A Story work?");

/** Verbatim from docs/mission.md, "Phrases worth keeping" (spec S27). */
const NOT_FINISHED =
  "It never assumes the story is finished, because it isn’t. Today is part of it too.";

const Occasions = styled(Chapter)`
  .row {
    margin-top: calc(${space.xxl} * var(--sy));
  }
  /* A Scroller below 1025px (spec §3.9); from there the five prints are one
     row that needs no scrolling. */
  @media (min-width: 1025px) {
    .scroller {
      margin-inline: 0;
      overflow: visible;
      mask-image: none;
    }
    .scroller .scroller-track {
      grid-auto-flow: row;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: ${space.lg};
      width: auto;
      padding-inline: 0;
    }
  }
  .scroller .scroller-track {
    padding-block: ${space.xs} ${space.md};
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
  .occ figure {
    transition: translate 400ms ${curve.out};
  }
  @media (hover: hover) and (pointer: fine) {
    .occ:hover figure {
      translate: 0 -4px;
    }
  }
  .occ div + div {
    padding: 16px 0 0;
  }
  .occ small {
    font: italic 400 ${type.read} / 1.3 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: ${color.bodyMuted};
  }
  .occ p {
    margin-top: 6px;
    font: 400 ${type.read} / 1.28 ${font.display};
    color: ${color.primary};
  }
  /* Giving it (Maya): the FAQ's answer and the mission line, beside the
     one plan that never renews. */
  .gift {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: ${space.lg} ${space.xxl};
    margin-top: calc(${space.xxl} * var(--sy));
    padding-top: ${space.lg};
    border-top: 1px solid var(--line);
  }
  .gift h3 {
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: ${color.primary};
  }
  /* Running text, not a statement: four lines of display serif read as a
     headline (taste-skill statement rule). */
  .gift p {
    margin-top: ${space.sm};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.primary};
    max-width: 52ch;
  }
  .gift p.mission {
    font: italic 400 ${type.lead} / 1.4 ${font.display};
  }
  .gift b {
    font-weight: 500;
    color: ${color.accentText};
  }
  .gift-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${space.sm} ${space.lg};
    margin-top: ${space.sm};
  }
  ${media.md} {
    .gift {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function OccasionsRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Occasions ref={ref} $ground="sand" aria-labelledby="occasions-title">
      <Frame>
        <Statement id="occasions-title" $size="lg" data-lines>
          The gift of a good question.
        </Statement>
        <div className="row" data-rise>
          <Scroller label="Occasions">
            {OCCASIONS.map((o, i) => (
              <li key={o.slot} className="occ">
                <Print
                  id={o.photo}
                  alt={o.alt}
                  ratio="4 / 5"
                  tilt={TILTS[i] || undefined}
                  sizes="(max-width: 1024px) 80vw, 18vw"
                />
                <div>
                  <small>{o.name}</small>
                  <p>{o.line}</p>
                </div>
              </li>
            ))}
          </Scroller>
        </div>
        <div className="gift" data-rise>
          {GIVING && (
            <div>
              <h3>{GIVING.q}</h3>
              <p>{GIVING.a}</p>
              <p className="mission">{NOT_FINISHED}</p>
            </div>
          )}
          {/* Round 2 (CHIEF-LOG B2.2), in this order and from these lines only:
              Pricing.tsx:817 (not on sale yet), pricing.ts Express (one time,
              nothing renews), Reserve.tsx:988 (a dollar holds your place),
              Reserve.tsx:807 (the iPhone line, first clause). */}
          <div>
            <p>
              Plans are not on sale yet. When they open, {express.name} is the
              one-time choice, <b>{express.price}</b>, and nothing renews.
              Today, {OFFERS.reserve.price} holds your place in line. Before
              launch, A Story can only ring an iPhone - on other phones it
              reminds them to write instead.
            </p>
            <div className="gift-actions">
              <PrimaryLink to="/reserve">
                Reserve for {OFFERS.reserve.price} <ArrowIcon />
              </PrimaryLink>
              <TextLink to="/pricing">Compare plans</TextLink>
            </div>
          </div>
        </div>
      </Frame>
    </Occasions>
  );
}

/* On a phone the title takes the full measure, so it keeps to two lines
   (jury 2 U7). */
const Fit = styled.div`
  /* The opening print fills its column from the first paint. Centred and
     shrink-to-fit, it was laid out at ~465px before its image arrived and
     then jumped to ~1020px: CLS 0.22 at 1920 (fix round 3). */
  section[data-variant="object"] .opening-object > figure {
    width: 100%;
  }
  /* What A Story is, one plain line under the lead (CHIEF-LOG B2.1). */
  .opening-what {
    display: block;
    margin-top: ${space.sm};
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text);
  }
  @media (max-width: 860px) {
    section[data-variant] .opening-grid h1 {
      max-width: none;
    }
    /* The kit's object+flip column rule outranks its own phone rule, so
       the opening stays one column here. */
    section[data-variant][data-flip] .opening-grid:not(.solo) {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 480px) {
    section[data-variant] .opening-grid h1 {
      font-size: 2.5rem;
    }
    /* Round 2: the line saying what A Story is costs the phone page a few
       lines; the opening print gives them back (7.6 screens, CHIEF-LOG B2.1). */
    section[data-variant="object"] .opening-object > figure {
      width: 85%;
    }
  }
`;

export default function Families() {
  return (
    <>
      <EditorialSeo
        title="For families - the stories between you"
        path="/for-families"
        description="For the questions you want to ask your parents, the life you want to record yourself, and the days your family remembers differently."
      />
      <Fit>
        <PageOpening
          variant="object"
          flip
          ground="ivory"
          title={
            <>
              The stories <em>between you.</em>
            </>
          }
          lead={
            <>
              Everything around the wedding photos: the story he tells every
              Thanksgiving, and why everyone in that photograph is laughing.
              {/* Round 2 (CHIEF-LOG B2.1): what it is, from the /how-it-works
                  hero ("A Story does the asking"), HowItWorks.tsx:560 and
                  lib/today.ts:14. No new claim. */}
              <span className="opening-what">
                A Story does the asking: it calls in its iPhone app, in a
                private beta, and follows what they say.
              </span>
            </>
          }
          actions={
            <>
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              {/* The one film lives on /how-it-works (spec §2.1). */}
              <TextLink to="/how-it-works#film">Watch the film · 49 s</TextLink>
            </>
          }
          object={
            <Print
              id="F01"
              alt="A grandmother unwrapping an A Story book beside her granddaughter"
              sizes="(max-width: 860px) 92vw, 52vw"
              tilt={-1.4}
              caption="Her birthday, and the first question"
              priority
            />
          }
        />
      </Fit>

      <OccasionsRoom />
      <ReasonsRoom />

      <Invitation next={["/how-it-works", "/samples", "/pricing"]} />
    </>
  );
}

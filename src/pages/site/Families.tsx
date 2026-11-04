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
import { PLANS } from "../../lib/pricing";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import Scroller from "./kit/Scroller";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  PrimaryAnchor,
  SecondaryAnchor,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { WHO_HEARS_SHORT, WHO_OWNS } from "../../lib/hears";
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
    /* One column: the three prints go landscape, so the room stays under
       2.5 phone screens (taste rule 18; it was 3.1). Same pictures, the
       crop held at the print's own focus (round 3, B4). */
    .art [data-crop] .print-window {
      aspect-ratio: 3 / 2;
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
    /* Round 3 (B2, Tuan): one rule for code and link. The six-letter code
       and the link that carries it are the same door (index.html:80-81,
       lib/app.ts:17: /join/CODE and ?ref=CODE both open the family tree). */
    text: "Invite the family at no extra cost. Your six-letter code, or the link that carries it, brings anyone into the family tree, and up to four iPhones can share one call in the app. Each version is kept in the teller’s name, and nobody’s replaces anybody else’s.",
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
            {/* "There is no fee per relative.": faqData.ts:26 (B1's round 3
                request, Harold: free for me belongs where the door is). */}
            <p>
              Read what’s shared and add what you remember, under your own
              name. Nothing appears until the storyteller says yes. There is
              no fee per relative.
            </p>
            <TextLink to="/join">Open your invitation</TextLink>
          </div>
        </div>
      </Frame>
    </Reasons>
  );
}

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

/* Round 3 fix 1 (item 8, Maya): "Giving it today" as three steps, each a
   strict subset of faqData.ts:107 ("How does giving A Story work?"): you set
   up the archive free; choose a good time for the first call (the third
   step, the $1 reservation, left on 2026-11-03). Then the one-time
   plan (same answer; pricing.ts Express). On this page the line about the
   plans that renew is left out; /questions keeps the whole answer. No gift
   button, card, note or date (blocked on Daniel). */
const GIFT_STEPS = [
  /* Phone-first plan task 4: the first step is the invite (plan :13, :16);
     the other two are faqData.ts "How does giving A Story work?". */
  "Ask for an invite to the A Story iPhone app.",
  "Set up the archive for your relative, free.",
  "Choose a good time for the first call.",
];
const GIFT_ONCE = `${PLANS[2].name} is the one-time plan, ${PLANS[2].price}, and nothing renews.`;
/** Questions.tsx:431, word for word. */
const DANIEL = "Daniel answers every email himself.";

/** Every action on this page is the site's one action (lib/app.ts). The
    ?for=someone context was for the web app's create-account page, which
    stops taking strangers (docs/premium/webapp-invite-only-brief.md). */
const GIFT_START = START_HREF;

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
  /* "Giving it today": a card on the sand, three numbered steps. */
  .gift-card {
    padding: clamp(${space.lg}, 3vw, ${space.xl});
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-radius: 3px;
  }
  .gift-card ol {
    margin: ${space.md} 0 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
    display: grid;
    gap: ${space.sm};
  }
  .gift-card li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 1.8em minmax(0, 1fr);
    font: 400 ${type.read} / 1.5 ${font.text};
    color: ${color.primary};
    max-width: 48ch;
  }
  .gift-card li::before {
    content: counter(step) ".";
    font-family: ${font.display};
    font-weight: 600;
    color: ${color.accentText};
  }
  .gift-card p.once {
    margin-top: ${space.md};
  }
  /* Who hears the recordings (lib/hears.ts): one quiet line by the action. */
  .gift p.hears {
    font: 400 ${type.note} / 1.55 ${font.text};
    color: ${color.bodyMuted};
  }
  .gift-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${space.sm} ${space.lg};
    margin-top: ${space.sm};
  }
  /* "Our privacy promises" ends the line above: 8px more, so its hit area
     and the actions' sit 8px apart, not 3 (taste rule 20; round 3, B4). */
  main[data-premium] & .gift-actions {
    margin-top: calc(${space.sm} + ${space.xs});
  }
  /* The inline actions row (Maya, item 8). */
  .gift-actions[data-inline-actions] {
    column-gap: ${space.sm};
  }
  /* Daniel's line under the two buttons keeps its link 8px clear of them. */
  main[data-premium] & .gift-actions + p.hears {
    margin-top: ${space.lg};
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
        <div className="gift" id="giving" data-rise>
          <div className="gift-card">
            <h3>Giving it today</h3>
            <ol>
              {GIFT_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="once">{GIFT_ONCE}</p>
            <p className="mission">{NOT_FINISHED}</p>
          </div>
          {/* Round 3 (B2, Maya): the FAQ answer on the left carries what you
              can give today (set up free, choose the first call) and the
              one-time plan with its price, so this column is only who hears
              the recordings and the actions (the Express sentence it held
              repeated the answer, supervisor r3). The iPhone line moved up
              into its own yes/no. The Start action carries ?for=someone so
              the account door knows it is for someone else (AppDoor WORDS). */}
          <div>
            <p className="hears">
              {WHO_HEARS_SHORT} {WHO_OWNS}{" "}
              <TextLink to="/privacy">Our privacy promises</TextLink>
            </p>
            {/* Start free; the sticky Start bar steps aside while this row
                is on screen (kit/StickyStart.tsx, data-inline-actions). */}
            <div className="gift-actions" data-inline-actions>
              <PrimaryAnchor href={GIFT_START}>
                {START_LABEL} <ArrowIcon />
              </PrimaryAnchor>
            </div>
            <p className="hears">
              {DANIEL}{" "}
              <TextLink to="/our-story">Our story</TextLink>
            </p>
            <div className="gift-actions">
              <TextLink to="/pricing">Every plan, side by side</TextLink>
              {/* The film, written for the gift buyer (spec §2.1: in-section
                  links are written for their reader; the /pricing form,
                  Pricing.tsx:1433). 49 s: CHIEF-LOG film table, 49.408 s. */}
              <TextLink to="/how-it-works#film">
                Watch the 49-second film
              </TextLink>
            </div>
          </div>
        </div>
      </Frame>
    </Occasions>
  );
}

/* ── Does your parent have an iPhone? ──────────────────────────────────── */

/*
 * Round 3 (B2, Maya and Harold): the iPhone caveat was small grey text a
 * screen and a half down. It is now a plain yes/no right under the opening,
 * and every sentence is already on the site: the question is the /reserve
 * card's legend (Reserve.tsx:784); "yes" is faqData.ts "Does my family
 * member need to install an app?" (faqData.ts:56: install once, we help,
 * rings at the hour, "which is in a private beta"; the beta caveat lives
 * here, not in the lead, taste rule 6); "no" is faqData.ts "Will it ring on another phone or tablet?"
 * (Reserve.tsx:806) and lib/today.ts (any browser). Nothing is said about
 * iPads or Android beyond that (plan round 3, blocked fact 1).
 */
const Phone = styled(Chapter)`
  padding-block: calc(${space.xl} * var(--sy));
  .phone {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${space.md} ${space.xxl};
    align-items: start;
    padding-top: ${space.lg};
    border-top: 1px solid var(--line);
  }
  h2 {
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  dl {
    margin: 0;
    display: grid;
    gap: ${space.md};
  }
  dl > div {
    display: grid;
    grid-template-columns: 4ch minmax(0, 1fr);
    gap: ${space.sm};
    align-items: baseline;
  }
  dt {
    font: 600 ${type.read} / 1.5 ${font.display};
    color: ${color.accentText};
  }
  dd {
    margin: 0;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--ink);
    max-width: 52ch;
  }
  ${media.md} {
    .phone {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function PhoneRoom() {
  return (
    <Phone $ground="ivory" $tight aria-labelledby="phone-title">
      <Frame className="phone">
        <h2 id="phone-title">Does your parent have an iPhone?</h2>
        <dl>
          <div>
            <dt>Yes</dt>
            <dd>
              The calls ring in the A Story app on it, at the hour your family
              picked.
              The app is in a private beta, by invite: they install it once,
              and we help you set it up.
            </dd>
          </div>
          <div>
            <dt>No</dt>
            <dd>
              Today, A Story rings on an iPhone. On other phones
              it reminds them to write instead, and the family reads and adds
              in any browser.
            </dd>
          </div>
        </dl>
      </Frame>
    </Phone>
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
  /* Round 3 fix 2 (item 3, Maya #1): "Give it as a gift" is a secondary
     button the same height as Start free (both 52px, kit actionBase). On a
     phone the kit turns a secondary into a text link; here it stays a
     button, side by side with Start free where both fit, and each full
     width, stacked, where they do not (150 % text, 320 px). */
  @media (max-width: 640px) {
    section[data-variant] .opening-words div:has(> a[href="#giving"]) {
      column-gap: 12px;
    }
    section[data-variant] .opening-words div:has(> a[href="#giving"]) > a {
      flex: 1 1 auto;
      padding-left: 18px;
      padding-right: 18px;
    }
    section[data-variant] .opening-words a[href="#giving"] {
      min-height: 52px;
      padding: 0 18px;
      border-color: color-mix(in srgb, var(--ink, ${color.primary}) 42%, transparent);
      text-decoration: none;
    }
  }
  @media (max-width: 480px) {
    section[data-variant] .opening-grid h1 {
      font-size: 2.25rem;
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
        title="For families - give it to a parent, or begin together"
        path="/for-families"
        description="For the questions you want to ask your parents, the life you want to record yourself, and the days your family remembers differently."
      />
      <Fit>
        <PageOpening
          variant="object"
          flip
          ground="ivory"
          /* Round 3 fix 2 (item 3, Maya #1): the page leads with the gift.
             The h1 is the lead's first sentence before this fix
             (Families.tsx:701), and the old h1 is the eyebrow. */
          eyebrow="The stories between you"
          title={
            <>
              Give it to a parent, <em>or begin together.</em>
            </>
          }
          lead={
            <>
              {/* Round 3 (B2, Maya): the gift answer in the first screen,
                  from faqData.ts "How does giving A Story work?" (set up the
                  archive, free) and lib/today.ts (any browser). The $1
                  reservation half of this line left on 2026-11-03. No date
                  is promised. The iPhone / private
                  beta line left the lead (taste rule 6, supervisor r3): the
                  yes/no block directly below states it. */}
              {/* Round 3 fix 2 (item 3): with the first sentence now the
                  h1, this line is the whole lead, at the lead's size. */}
              {/* Phone-first plan task 4 (sources: lib/today.ts:13,
                  faqData.ts:40 and :44, plan :16). */}
              A Story rings them in its iPhone app and asks about their life.
              The whole family reads and adds, free.
            </>
          }
          actions={
            <>
              <PrimaryAnchor href={GIFT_START}>
                {START_LABEL} <ArrowIcon />
              </PrimaryAnchor>
              {/* The gift buyer's own door (Maya: "no Give-as-a-gift button
                  anywhere"). The film link ("Watch the 49-second film") is
                  in the gift block's actions, where this anchor lands.
                  Round 3 fix 2 (item 3): a secondary button, the same
                  height as Start free. */}
              <SecondaryAnchor href="#giving">Give it as a gift</SecondaryAnchor>
            </>
          }
          note={
            <>
              {WHO_HEARS_SHORT}{" "}
              <TextLink to="/privacy">Our privacy promises</TextLink>
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

      {/* Phone-first plan task 4: PhoneRoom is this page's "today" (the
          calls by invite, the family in any browser). The TodayNow block
          stood under it and said it again (supervisor review; panel-r3.md
          :59, :95). */}
      <PhoneRoom />
      <OccasionsRoom />
      <ReasonsRoom />

      <Invitation
        next={["/how-it-works", "/samples", "/pricing"]}
        startHref={GIFT_START}
      />
    </>
  );
}

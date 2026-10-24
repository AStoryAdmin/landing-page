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
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { PLANS } from "../../lib/pricing";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  PrimaryLink,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { color, curve, display, font, media, type } from "../../styles/theme";
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
      max-width: 420px;
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
      <TextLink to="/how-it-works#calls">
        See a sample call <ArrowIcon />
      </TextLink>
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
    text: "Invite the family at no extra cost. Anyone joins the family tree with a six-letter code, and up to four iPhones can share one call in the app. Each version is kept in the teller’s name, and nobody’s replaces anybody else’s.",
    action: (
      <TextLink to="/how-it-works">
        See what the family adds <ArrowIcon />
      </TextLink>
    ),
    photo: {
      id: "28",
      alt: "A family laughing together in a living room, 1986",
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
    photo: {
      id: "15",
      alt: "Someone in their armchair by the lamp, an evening at home in 1986",
      focus: "36% 50%",
    },
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

/** The frieze's prints are laid down by hand: each a little turned. */
const TILTS = [-1.2, 0.8, -0.6, 1.1, -0.9];

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
    font: italic 400 20px / 1.3 ${font.display};
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
  /* Running text, not a statement: four lines of display serif read as a
     headline (taste-skill statement rule). */
  .gift p {
    font: 400 clamp(1.15rem, 1.05rem + 0.35vw, 1.4rem) / 1.55 ${font.text};
    color: ${color.primary};
    max-width: 52ch;
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

function OccasionsRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Occasions ref={ref} $ground="sand" aria-labelledby="occasions-title">
      <Frame>
        <Statement id="occasions-title" $size="lg" data-lines>
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
              <Print
                id={o.photo}
                alt={o.alt}
                ratio="4 / 5"
                tilt={TILTS[OCCASIONS.indexOf(o)]}
                sizes="(max-width: 1024px) 70vw, 18vw"
              />
              <div>
                <small>{o.name}</small>
                <p>{o.line}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gift" data-rise>
          <p>
            The easiest to give: {express.name}, <b>{express.price}</b> one
            time. About a month of calls in the A Story app, and a Classic
            Hardcover once printed ordering opens. Nothing renews.
          </p>
          <TextLink to="/pricing">
            Compare plans <ArrowIcon />
          </TextLink>
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

      <Invitation />
    </>
  );
}

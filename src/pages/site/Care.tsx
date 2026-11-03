/**
 * For care communities.
 *
 * The message is unchanged from earlier passes: an invitation, never a test
 * of memory; the family fills in the edges; agree consent and support before
 * beginning; pricing quoted individually. A Story records personal stories -
 * it is not a clinical assessment or treatment, and the page says so.
 *
 * Fix round 2 (2026-10-23, jury 1 #5 #7 #9 #10 #24): the page no longer uses
 * the shared audience template. It opens on the cloth with the page's words
 * on an ivory leaf and one object beside it. Then one room for knowing the
 * person, the question that opens a conversation beside how it works, and
 * what to agree before beginning.
 *
 * 2026-10-29 (founder: the page's goal "is not really there"): the page now
 * books its own demo. The last room is the booking form itself
 * (kit/DemoSection.tsx) with the care kind picked and what we agree before
 * anyone is called beside it, plus a door to /organizations for every other
 * kind of place.
 *
 * 2026-11-02, premium pass (docs/premium/design-spec.md §4 Group C): on a
 * phone the object comes before the leaf (CSS order, same DOM), so the
 * first screen is not all text. "What you need" sits straight after the
 * opening. The circle's three roles are three typeset columns on a wide
 * screen. A text link in the residents' room opens the film on
 * /how-it-works. The today note (lib/today.ts) sits under the opening's
 * actions.
 *
 * 2026-11-03 (panel round 2): the opening's lead names the AI-guided
 * interviewer, the iPhone app and the staff-member option.
 *
 * Round 3 (2026-11-03, Builder 3; docs/plans/2026-11-03-premium-round-3.md
 * task 3; panel: Denise):
 *   - The photographs are gone (the hero print read as a younger couple,
 *     the second as a young woman with a cake). The page's objects are two
 *     real screens of the app (public/app, captured from the app itself):
 *     a call in progress in the opening, cropped on a phone so the title
 *     stays inside the first screen, and a memory page in the residents'
 *     room. No new photograph (plan: licence).
 *   - "What you need" lists the real requirements (NEED below, each line
 *     from the site or the app), and "What we can say today" replaces the
 *     three privacy labels with six sourced lines (orgQuestions.ts) and a
 *     plain line on what is not claimed. Both fold under one line on a
 *     phone, open in the prerender and on wider screens.
 *   - The demo form is one step, asks for the "Community", and its "What
 *     kind" offers care settings (CARE_KINDS, from lib/contact.ts) instead
 *     of colleges and schools.
 *   - No phone number: the site has none to give (logged for Daniel).
 */
import { useEffect, useRef } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { Link } from "react-router-dom";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { AppShot, Phone } from "./app/Phone";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  PrimaryAnchor,
  SecondaryAnchor,
  Statement,
  TextAnchor,
} from "./kit/kit.styles";
import { QuoteBand, RuledSteps } from "./rooms/Rooms";
import DemoSection from "./kit/DemoSection";
import { TODAY_NOTE } from "../../lib/today";
import { QUESTION_COUNT } from "../../lib/product";
import { CAN_SAY, NOT_CLAIMED } from "./orgQuestions";
import { color, display, font, media, space, type } from "../../styles/theme";

/* The opening's object: a call in progress in the real app (public/app/
   talk.webp). On a wide screen the whole phone; on a phone the top of it,
   where the question is, fading out before the words so the title is in
   the first screen (panel: Denise, "the hero image pushes the headline
   almost below the first screen"). */
const Call = styled.figure`
  display: grid;
  justify-items: center;
  gap: ${space.sm};
  margin: 0;
  width: 100%;
  .device {
    width: min(100%, 300px);
  }
  figcaption {
    max-width: 34ch;
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
    text-align: center;
    text-wrap: balance;
  }
  @media (max-width: 860px) {
    .device {
      width: min(60vw, 236px);
      height: clamp(200px, 50vw, 240px);
      overflow: hidden;
      mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
    }
  }
`;

const Know = styled(Chapter)`
  scroll-margin-top: calc(${space.xxxl} + ${space.md});
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(${space.xl}, 6vw, calc(${space.xxxl} + ${space.xxxl} + ${space.sm}));
    align-items: center;
  }
  /* A memory page in the real app (public/app/memory.webp): the object of
     this room, one treatment, no print. */
  .shot {
    display: grid;
    justify-items: center;
    gap: ${space.sm};
    margin: 0;
  }
  .shot .device {
    width: min(100%, 320px);
  }
  .shot figcaption {
    max-width: 34ch;
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
    text-align: center;
    text-wrap: balance;
  }
  .words > p:not(.film) {
    margin: ${space.md} 0 clamp(${space.lg}, 2.4vw, ${space.xl});
    max-width: 44ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  .words > p.film {
    margin-top: clamp(${space.md}, 2.2vw, ${space.xl});
  }
  ${media.lg} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  /* Phone: the room's rhythm tightened so the page keeps near its old
     length (spec §4C target ≤ 7.9 screens at 390). */
  ${media.md} {
    padding: ${space.xxl} 0;
    .row {
      gap: ${space.lg};
    }
    /* The top of the memory page (photograph, title, her words), fading
       out, so the room stays near its old height on a phone. */
    .shot .device {
      width: min(62vw, 240px);
      height: clamp(240px, 62vw, 290px);
      overflow: hidden;
      mask-image: linear-gradient(to bottom, #000 72%, transparent 100%);
    }
    .words li {
      padding-top: ${space.sm};
      padding-bottom: ${space.sm};
    }
  }
`;

/*
 * On a phone the title takes the full measure, so it keeps to two lines
 * (jury 2 U7).
 *
 * Fix round 3 (2026-10-24, jury 2 R2: CLS 0.088 at 1920). The title used to
 * wrap freely, so while Cormorant was still loading the fallback serif set it
 * on four lines, then it fell to two and the whole sheet jumped. On a wide
 * screen the title is now two set lines, sized to the sheet (its container),
 * so it takes the same height in either face; the sheet and the object hang
 * from the top of the row, so a lead that grows a line moves nothing above it.
 */
const Fit = styled.div`
  display: contents;
  @media (min-width: 861px) {
    section[data-variant="letter"] .opening-grid:not(.solo) {
      align-items: start;
    }
    section[data-variant="letter"] .opening-sheet {
      container-type: inline-size;
    }
    section[data-variant="letter"] .opening-sheet h1 {
      max-width: none;
      font-size: min(11.8cqi, 7rem);
      overflow-x: clip;
      overflow-clip-margin: 0.25em;
    }
    section[data-variant="letter"] .opening-sheet h1 .ln {
      display: block;
      white-space: nowrap;
    }
  }
  @media (max-width: 860px) {
    section[data-variant] .opening-grid h1 {
      max-width: none;
    }
  }
  @media (max-width: 480px) {
    section[data-variant] .opening-grid h1 {
      font-size: 2.1rem;
    }
  }
  /* On a phone the app screen comes first, so the first screen holds it
     (the kit puts a flipped object back after the words below 861 px). */
  @media (max-width: 860px) {
    section[data-variant][data-flip] .opening-object {
      order: -1;
    }
  }
`;

/* What you need, then what we can say today: straight after the opening
   (Denise and Priya look for both first). */
const Need = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
    gap: clamp(${space.lg}, 5vw, calc(${space.xxxl} + ${space.xxl}));
    align-items: start;
  }
  h2 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .need li {
    padding: ${space.md} 0;
    border-top: 1px solid var(--line);
  }
  .need li:last-child {
    border-bottom: 1px solid var(--line);
  }
  .need b {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  .need span {
    display: block;
    margin-top: ${space.xxs};
    max-width: 56ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  /* What we can say today: the same two columns, six lines as one ruled
     list, then the line on what is not claimed and where to read more. */
  .say {
    margin-top: clamp(${space.lg}, 3vw, ${space.xl});
  }
  .say ul {
    padding: ${space.sm} 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .say li {
    padding: ${space.xxs} 0;
    max-width: 56ch;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--muted);
  }
  .say li b {
    font-weight: 500;
    color: var(--ink);
  }
  .say .ask {
    margin-top: ${space.xs};
    max-width: 56ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .say .ask a {
    display: inline-block;
    padding: ${space.xxs} 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  /* The folds: on a phone only. From 641 px the summary is hidden and the
     details stay open (closed details with no summary could never open
     again, so the content shows either way). */
  .fold > summary {
    display: none;
  }
  @media (min-width: 641px) {
    .fold::details-content {
      content-visibility: visible;
      display: contents;
    }
  }
  ${media.md} {
    padding: ${space.lg} 0;
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.sm};
    }
    .need li {
      padding: ${space.xs} 0;
    }
    .need span {
      font-size: ${type.note};
    }
    .say ul {
      padding: ${space.xs} 0;
    }
  }
  /* On a phone each block folds under one line that names it, so the h2
     steps out of the layout; it still names the list (aria-labelledby). */
  ${media.sm} {
    .say {
      margin-top: 0;
    }
    .row > h2 {
      display: none;
    }
    .need .fold {
      border-top: 1px solid var(--line);
    }
    .fold {
      border-bottom: 1px solid var(--line);
    }
    .need .fold li:first-child {
      border-top: 0;
    }
    .need .fold li:last-child {
      border-bottom: 0;
    }
    .fold > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${space.md};
      min-height: 44px;
      padding: ${space.xs} 0;
      cursor: pointer;
      list-style: none;
      color: var(--ink);
      font: 600 ${type.ui} / 1.3 ${font.ui};
    }
    .fold > summary::-webkit-details-marker {
      display: none;
    }
    .fold > summary::after {
      content: "+";
      font: 400 ${display.sm} / 1 ${font.display};
      color: var(--muted);
    }
    .fold[open] > summary::after {
      content: "−";
    }
    .fold > summary:focus-visible {
      outline: 2px solid ${color.primary};
      outline-offset: 2px;
    }
    .fold[open] {
      padding-bottom: ${space.sm};
    }
  }
`;

/* The booking room on a phone: the same parts, closer together (the
   section and its list are kit/DemoSection.tsx; only spacing changes here). */
const Booking = styled.div`
  display: contents;
  ${media.md} {
    > section {
      padding: ${space.xxl} 0;
    }
    > section .row {
      gap: ${space.lg};
    }
    > section .side ul {
      margin-top: ${space.sm};
    }
    > section .side li {
      padding: ${space.sm} 0;
    }
  }
`;

/* The circle around each resident: on a wide screen the line to remember
   sits above three typeset columns, one per role (no cards). */
const Circle = styled.div`
  display: contents;
  ${media.md} {
    > section {
      padding-top: ${space.xxl};
      padding-bottom: ${space.xxl};
    }
  }
  ${media.up.lg} {
    > section .row {
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(${space.xl}, 4vw, ${space.xxxl});
    }
    > section blockquote {
      max-width: 22ch;
    }
    > section ul {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(${space.lg}, 3vw, ${space.xxl});
    }
    > section li,
    > section li:last-child {
      grid-template-columns: minmax(0, 1fr);
      align-content: start;
      border-bottom: 0;
    }
  }
`;

/* The opening's lead names what does the asking and how the calls happen,
   so both are read before the first scroll (CHIEF-LOG panel round 2, B4.1).
   "An AI-guided interviewer" and the question count are the FAQ's own
   answer (faqData.ts, "Who asks the questions?"); the count is the
   constant, never typed. The iPhone and the staff member come from "What
   you need" below; "private beta" stays in the note under the actions and
   in that block (spec §3.7: no hero lead contains "beta"). */
const LEAD = `An AI-guided interviewer asks each resident about their life, from ${QUESTION_COUNT} questions, in the A Story iPhone app or with a staff member beside them.`;

/* Where the two blocks fold (the same width as media.sm). */
const FOLD = "(max-width: 640px)";

/* What a community needs before anyone is called. Each line is worded from
   a line the site or the app already says:
   - the iPhone: faqData.ts "Will it ring on another phone or tablet?"
     ("Before launch, A Story can only ring an iPhone"), Organizations.tsx
     NEED ("we help them install the app"), and this page's own line "or a
     staff member starts a conversation together with them";
   - the hour: this page ("at an agreed hour"), faqData.ts "the app rings
     at the hour you picked and they answer and talk";
   - one person: AGREE "Who helps" below; kit/DemoSection.tsx NEXT "A
     program can begin with one class, one floor or one team";
   - consent: privacy.tsx section 6; AGREE "Consent" below. The last
     sentence names a question and claims nothing;
   - pricing: this page's lead "Community pricing is quoted individually,
     on the demo"; faqData.ts "There is no fee per relative". */
const NEED: readonly [string, string][] = [
  [
    "An iPhone for each resident, before launch.",
    "We help install the app. Where a resident has none, a staff member starts a conversation together with them.",
  ],
  ["An agreed hour.", "The app rings then, and they answer and talk."],
  [
    "One person on your side.",
    "For installation, introductions and support. A program can begin with one floor.",
  ],
  [
    "The resident’s consent, before the first call.",
    "Agreed with them, together with who may read or contribute. How that works for a resident who cannot decide alone, we go through on the demo.",
  ],
  [
    "Pricing, quoted on the demo.",
    "For the program you describe. Relatives who read and add pay nothing.",
  ],
];

/* The "What kind" options on this page's form: care settings, from the
   kinds lib/contact.ts already names for this audience ("senior living,
   memory care, hospice"). The stored row keeps source "care:demo". */
const CARE_KINDS = [
  "Senior living",
  "Memory care",
  "Hospice",
  "Something else",
] as const;

/* What a care community and A Story settle on the demo, before anyone is
   called (the checklist that used to be the BeginCard). Round 3: "Who
   helps" and "Consent" moved up into "What you need", so only the two
   that are decided together remain here (the page stays near 8 screens
   at 390). */
const AGREE: [string, string][] = [
  ["What stays private", "Which stories stay with the family, and which the care team may read."],
  ["How families are invited", "And when, so the first call is not a surprise to anyone."],
];

export default function Care() {
  const know = useReveals<HTMLElement>();
  /* "What you need" and "What we can say today" fold on a phone after
     hydration; the prerendered page ships them open, so they read without
     script and on wider screens. */
  const need = useRef<HTMLDetailsElement>(null);
  const say = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const fold = window.matchMedia(FOLD);
    const folds = [need.current, say.current];
    if (fold.matches) {
      /* The requirements stay open: they are what the page is for. Only
         the second block folds. */
      if (say.current) say.current.open = false;
    }
    /* From 641 px the summary is hidden, so closed details could never be
       opened again (a phone turned sideways). Leaving the fold opens them. */
    const unfold = (e: MediaQueryListEvent) => {
      if (!e.matches) for (const d of folds) if (d) d.open = true;
    };
    fold.addEventListener("change", unfold);
    return () => fold.removeEventListener("change", unfold);
  }, []);
  return (
    <>
      <EditorialSeo
        title="A Story for care communities"
        path="/care-communities"
        description="Make room for a resident’s own stories and family perspectives. What you need, what we can say today about privacy and consent, and a small community program."
      />
      <Fit>
        <PageOpening
          variant="letter"
          flip
          title={
            <>
              <span className="ln">Every resident has</span>{" "}
              <span className="ln">
                a life <em>worth knowing.</em>
              </span>
            </>
          }
          lead={LEAD}
          note={TODAY_NOTE}
          actions={
            <>
              <PrimaryAnchor href="#book">
                Book a demo <ArrowIcon />
              </PrimaryAnchor>
              <SecondaryAnchor href="#need">What you need</SecondaryAnchor>
            </>
          }
          object={
            <Call>
              <div className="device">
                <Phone
                  width="100%"
                  lightStatus
                  label="The A Story app during a call. On screen: the question “What’s something you remember Rose always doing?”, a button “Rose is here with me”, and “Listening — just start talking”."
                >
                  <AppShot name="talk" />
                </Phone>
              </div>
              <figcaption>
                A call in the A Story app: it asks, then listens. Someone can
                sit beside them.
              </figcaption>
            </Call>
          }
        />
      </Fit>

      <Need
        $ground="paper"
        $tight
        id="need"
        aria-labelledby="need-title"
        style={{ scrollMarginTop: 80 }}
      >
        <Frame className="row need">
          <h2 id="need-title">What you need</h2>
          <details className="fold" ref={need} open>
            <summary>What you need</summary>
            <ul aria-labelledby="need-title">
              {NEED.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </details>
        </Frame>
        <Frame className="row say">
          <h2 id="say-title">What we can say today</h2>
          <details className="fold" ref={say} open>
            <summary>What we can say today</summary>
            <ul aria-labelledby="say-title">
              {CAN_SAY.map((t) => (
                <li key={t.lead}>
                  <b>{t.lead}</b>
                  {t.rest && <> {t.rest}</>}
                </li>
              ))}
            </ul>
            <p className="ask">
              {NOT_CLAIMED}{" "}
              <Link to="/privacy">Read the privacy policy</Link>, or the{" "}
              <Link to="/questions#organizations">
                answers for organizations
              </Link>
              : staff access, ownership, retention, export and consent.
            </p>
          </details>
        </Frame>
      </Need>

      <Know
        ref={know}
        $ground="ivory"
        id="know"
        aria-labelledby="know-title"
      >
        <Frame className="row">
          <figure className="shot" data-rise="settle">
            <div className="device">
              <Phone
                width="100%"
                label="A memory page in the A Story app: “The house with the blue door”, 1951, with the storyteller’s words, her recording, and the people who added to it."
              >
                <AppShot name="memory" />
              </Phone>
            </div>
            <figcaption>
              A memory page in the app: her words from the call, and who
              added what.
            </figcaption>
          </figure>
          <div className="words">
            <Statement id="know-title" $size="lg">
              Know the person <em>behind the care.</em>
            </Statement>
            <p data-rise>
              A Story records personal stories. It is not a clinical assessment
              or treatment.
            </p>
            <RuledSteps
              steps={[
                [
                  "Start with what they choose.",
                  "A photograph, a recipe or a song can open a conversation. It is an invitation, never a test of what someone remembers.",
                ],
                [
                  "Let the family fill in the edges.",
                  "Relatives recognise faces, remember names and bring their own accounts, each beside the resident’s words.",
                ],
                [
                  "A few lines before the next shift.",
                  "What they did for a living, who they miss, the song that settles them.",
                ],
              ]}
            />
            <p className="film">
              <TextAnchor href="/how-it-works#film">
                See a call become a book&nbsp;·&nbsp;49&nbsp;s
              </TextAnchor>
            </p>
          </div>
        </Frame>
      </Know>

      <Circle>
      <QuoteBand
        quote={
          <>
            “Who taught you to make it <b>that way?</b>”
          </>
        }
        title="One circle around each resident"
        steps={[
          [
            "The resident talks, when they like.",
            "At an agreed hour, or together with a staff member.",
          ],
          [
            "The family adds what they know.",
            "One link, no account. Photographs, names and their own versions of the story.",
          ],
          [
            "The team reads what matters.",
            "Only the people the resident and family invite can read it.",
          ],
        ]}
      />
      </Circle>

      <Booking>
      <DemoSection
        title={
          <>
            A small program, <em>shaped with you.</em>
          </>
        }
        lead="Begin with the residents and families who want to take part. Community pricing is quoted individually, on the demo."
        aside={
          <ul aria-label="What we agree before anyone is called">
            {AGREE.map(([t, d]) => (
              <li key={t}>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        }
        footer={
          <>
            Not a care community?{" "}
            <Link to="/organizations">
              A Story for schools, libraries and companies
            </Link>
          </>
        }
        kind=""
        kinds={CARE_KINDS}
        orgLabel="Community"
        sizeLegend="How many residents might take part"
        compact
        source="care:demo"
        rolePlaceholder="Life enrichment director"
        notePlaceholder="The residents who moved in this year, and their families, before the holidays."
        cardLabel="A demo for your community"
        cardTitle="Tell us about your residents, and when suits you."
      />
      </Booking>
    </>
  );
}

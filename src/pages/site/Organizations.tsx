/**
 * For institutions (/organizations). Redesigned 2026-10-20, reorganized
 * 2026-10-29.
 *
 * 2026-10-20: the page named the people who actually write to us, showed
 * the product, said what the institution decides, and ended in a form that
 * books a demo and lands in Daniel's inbox (DemoBooking.tsx,
 * lib/demoRequest.ts).
 *
 * 2026-10-29, at the founder's request ("so they book a demo"; care should
 * not read as the main audience; a place to offer a collaboration): the
 * booking room became kit/DemoSection.tsx, shared with the care page, and
 * "Who we work with" listed six kinds of place, care among them and not
 * first. Each kind picks itself in the demo form and takes the reader there
 * (?kind=…#book still works without script).
 *
 * 2026-11-02, premium pass (docs/premium/design-spec.md §4 Group C):
 *   - One form on the page. "Propose a collaboration" is no longer mounted
 *     (CollaborationForm.tsx is kept); another idea goes to /contact.
 *   - The opening stands on paper with one real object, the square sample
 *     book "The Ledger" (labelled "a founder's ledger", as on home and
 *     /samples), instead of
 *     four tilted prints.
 *   - "What you need" follows the opening: three lines the site already
 *     says (STEPS, DECIDE, and the program line on /pricing), so the iPhone
 *     requirement is read early.
 *   - The six kinds are open columns (a hairline on top, no box). Their
 *     action reads "Start the demo here", so "Book a demo" appears three
 *     times in the page: the opening, after "From a demo to an archive", and
 *     the form. The care column sends people to /care-communities instead of
 *     repeating that page.
 *   - A short privacy block quotes three labels from the policy's short
 *     version and links to /privacy. No HIPAA, BAA, SOC 2 or residency
 *     claim either way (flagged for Daniel); those questions go to the demo.
 *   - 2026-11-03 (panel round 2): the opening's lead names the AI-guided
 *     interviewer and the iPhone app, so both are read before the scroll.
 *   - Visual system (spec §3): the today note under the opening's actions,
 *     sentence-case column labels, no arrow on text links, the six kinds in
 *     the shared Scroller (sideways on a phone, a grid from 641 px), gold
 *     words in two of five h2s, and reveals on three containers.
 *
 * The path stays /organizations: it is prerendered, in the sitemap and in
 * the guides. ?for=care still preselects the care kind for old links.
 *
 * Pricing is quoted per program, and the page says so rather than inventing
 * a number (lib/pricing.ts mirrors the app, which has no institution plan).
 */
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import Scroller from "./kit/Scroller";
import { TODAY_NOTE } from "../../lib/today";
import { QUESTION_COUNT } from "../../lib/product";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Actions,
  Chapter,
  Frame,
  Heading,
  PrimaryAnchor,
  SecondaryAnchor,
  Statement,
  TextAnchor,
} from "./kit/kit.styles";
import DemoSection from "./kit/DemoSection";
import { INSTITUTION_KINDS } from "../../lib/demoRequest";
import { CAN_SAY, DEMO_AGENDA, WRITE_TO_DANIEL } from "./orgQuestions";
import ReviewQuestions from "./kit/ReviewQuestions";
import PrintSheet from "./kit/PrintSheet";
import { CONTACT } from "../../lib/contact";
import { route } from "../../lib/nav";
import { color, display, font, media, shadow, space, type } from "../../styles/theme";

/** DEMO_AGENDA's second sentence ("Bring your questions on privacy,
 *  consent and exports; price is quoted on the demo."). */
const DEMO_AGENDA_BRING = DEMO_AGENDA.slice(DEMO_AGENDA.indexOf(". ") + 2);

type Kind = (typeof INSTITUTION_KINDS)[number];
const CARE: Kind = "Senior living or care community";

/* The film on /how-it-works (kit/Film.tsx, Builder 2). A plain href, so the
   browser lands on the anchor after the page loads. */
const FILM = "/how-it-works#film";

/* Where "You decide" and "Privacy, in short" fold (the same width as
   media.sm). */
const FOLD = "(max-width: 640px)";

const WHO: { kind: Kind; label: string; title: string; body: string }[] = [
  {
    kind: "College or university",
    label: "Colleges and universities",
    title: "Alumni, in their own words.",
    body: "A reunion class, the first women admitted, a department turning fifty. Each graduate is called at an hour they choose, and the archive grows class by class.",
  },
  {
    kind: "School",
    label: "Schools",
    title: "The people a school was built by.",
    body: "Retiring teachers, founding families, the first class to graduate. Recorded before the anniversary, not after it.",
  },
  {
    kind: "Library, museum or historical society",
    label: "Libraries, museums and historical societies",
    title: "An oral history that keeps going.",
    body: "Firsthand accounts beside the photographs and documents you already hold, with names and dates attached.",
  },
  {
    kind: "Company or nonprofit",
    label: "Companies and nonprofits",
    title: "The reason behind the record.",
    body: "Founders, long-serving staff, the people retiring this year. The judgment and the history a handover document leaves out.",
  },
  {
    kind: "Cultural, faith or community group",
    label: "Cultural, faith and community groups",
    title: "How we got here, in their words.",
    body: "The people who started the association, the congregation or the festival. Their accounts kept together for the generation that comes next.",
  },
  {
    /* Care has its own page; this column only points there. */
    kind: CARE,
    label: "Senior living and care",
    title: "Know the person behind the care.",
    body: "",
  },
];

/* What a place needs before it begins (round 3, Builder 3; panel: Denise
   "the label promises more than it delivers", Priya "a plan for narrators
   without an iPhone"). Five real requirements, each from a line the site
   or the app already says:
   - the iPhone: faqData.ts "Will it ring on another phone or tablet?" and
     the old NEED line "we help them install the app";
   - the hour: faqData.ts "the app rings at the hour your family picked and they
     answer and talk", STEPS "at the hour each person picks";
   - one person on your side: kit/DemoSection.tsx NEXT "A program can begin
     with one class, one floor or one team", Care.tsx AGREE "Who helps";
   - consent: DECIDE "Each person agrees before their first call, and can
     stop at any time", privacy.tsx section 6;
   - pricing: the program line on /pricing; faqData.ts "no fee per
     relative". */
const NEED: readonly [string, string][] = [
  [
    /* Phone-first fix 2 (item 1, Priya #1, Denise #5): the workaround the
       site already states, orgQuestions.ts ORG_GROUP "What equipment do
       we need?" ("Where a resident has none, a staff member can start a
       conversation together with them. Shared devices for a floor or a
       class: ask on the demo."), public on /questions; "a class or a
       team" are examples from this page's own NEED[2]. */
    "An iPhone for the calls, today.",
    "Where a person has none, a staff member can start a conversation together with them. We help install the app. Shared devices for a class or a team: ask on the demo.",
  ],
  [
    "An hour each person picks.",
    "The app rings then, and they answer and talk.",
  ],
  [
    "One person on your side.",
    "For introductions and support. A program can begin with one class, one floor or one team.",
  ],
  [
    "Each person’s consent, before their first call.",
    "They agree first, and can stop at any time.",
  ],
  [
    "Pricing, quoted on the demo.",
    "For the program you describe. Relatives who read and add pay nothing.",
  ],
];

const STEPS = [
  [
    "A thirty-minute demo.",
    "We show a real call and a real archive, and ask about your people and what you want to keep.",
  ],
  [
    "You choose who takes part.",
    "The people you want heard, and how we reach them. Consent comes first.",
  ],
  [
    "A Story makes the calls.",
    /* The iPhone requirement is said once, in "What you need" above. */
    "Guided conversations in the A Story iPhone app, now in a private beta, at the hour each person picks.",
  ],
  [
    "You keep the archive.",
    "Memories, transcripts and photographs in one place, and a book or an anniversary volume when you want one.",
  ],
] as const;

const DECIDE = [
  /* Phone-first fix 2 (item 2, Priya #6): each row states the default.
     "Who takes part": STEPS[1] ("The people you want heard, and how we
     reach them. Consent comes first."). "Who can listen": orgQuestions.ts
     ORG_GROUP "Which staff can read an archive?" ("Only the people the
     storyteller and their family invite ... agreed with you before anyone
     is called"). */
  [
    "Who takes part",
    "The people you choose, and how they are invited. Consent comes first.",
  ],
  [
    "Who can listen",
    "Only the people the storyteller and their family invite, unless you agree something else with us before anyone is called.",
  ],
  [
    "Consent",
    "Each person agrees before their first call, and can stop at any time.",
  ],
  [
    "What is published",
    "Nothing leaves the archive unless you and the person both say so.",
  ],
] as const;

/* The opening's lead names what does the asking and where the calls ring,
   so both are read before the first scroll (CHIEF-LOG panel round 2, B4.1).
   "An AI-guided interviewer" and the question count are the FAQ's own
   answer (faqData.ts, "Who asks the questions?"); the count is the
   constant, never typed. The iPhone is the app the calls ring in (NEED
   below, lib/today.ts); "private beta" stays in the note under the actions
   (spec §3.7: no hero lead contains "beta"). */
const LEAD = `An AI-guided interviewer calls the people your institution was built by in the A Story iPhone app and asks from ${QUESTION_COUNT} questions. You keep their words, and a book if you like.`;

/* "What we can say today" (round 3): six lines from the privacy policy's
   short version, the FAQ and the app (orgQuestions.ts names each source),
   a link to the policy and to /questions#organizations, and one line on
   what is not claimed. Nothing about HIPAA, a BAA, SOC 2 or residency
   either way (spec §4C, flagged for Daniel). */

/* The opening's object: one sample book, square like the real one, set
   down on the paper. Its cover is the same capture the home page uses
   (public/book-objects, from /samples). On a phone it comes before the
   words, so the first screen holds the object (spec §4 rule 12). */
const Book = styled.figure`
  display: grid;
  justify-items: center;
  gap: ${space.md};
  margin: 0;
  a.cover {
    display: block;
    width: min(100%, 520px);
    aspect-ratio: 1;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: ${shadow.lie};
    transform: rotate(-1.2deg);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  figcaption {
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
    text-align: center;
  }
  figcaption a {
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  /* The tilted cover's box reaches 2px above the caption, so "Read it"
     keeps its 44px hit area below the line, with 8px more room above
     (taste rule 20: 8px between neighbours; round 3 fix, B4). */
  figcaption {
    margin-top: 8px;
  }
  main[data-premium] & figcaption a:not([class]) {
    padding-block: 0 26px;
  }
  ${media.md} {
    a.cover {
      width: min(64vw, 300px);
    }
  }
`;

const Opening = styled.div`
  display: contents;
  /* Phone-first fix 1 (item 1): the two doors take the whole first row of
     the actions, above the buttons, at every width. */
  .org-doors {
    flex: 1 1 100%;
    display: grid;
    gap: ${space.xs};
    margin: 0 0 ${space.xs};
    padding: ${space.xs} 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .org-doors a,
  .org-doors p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px ${space.xs};
    min-height: 44px;
    margin: 0;
    font: 400 ${type.ui} / 1.35 ${font.ui};
    color: var(--muted);
  }
  .org-doors a {
    color: var(--ink);
    text-decoration: none;
  }
  .org-doors a .to {
    display: inline-flex;
    align-items: center;
    gap: ${space.xxs};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .org-doors a svg {
    width: 16px;
    height: 16px;
  }
  @media (max-width: 640px) {
    .org-doors + a {
      flex: 1 1 100%;
    }
  }
  @media (min-width: 641px) and (max-width: 860px) {
    section[data-variant] .opening-object {
      order: -1;
    }
  }
  /* Round 3 fix 2 (item 12a, Denise and Priya #6): at 640 px and below the
     headline, the lead and Book a demo come first, and the Ledger follows,
     no taller than about 40 % of the screen, so at 390 the headline starts
     near the top of the first screen. */
  @media (max-width: 640px) {
    section[data-variant] .opening-object {
      order: 2;
    }
    section[data-variant] .opening-object a.cover {
      width: min(56vw, 240px, 32svh);
    }
    /* Phone-first fix 1 (item 4): the film link leaves the phone opening
       (as on /pricing, item 6); "See one conversation become a book" stays
       under the steps, and the film on /how-it-works#film. */
    section[data-variant] .opening-words a[href="${FILM}"] {
      display: none;
    }
  }
`;

/* What you need: three ruled lines straight after the opening. */
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
  li {
    padding: ${space.md} 0;
    border-top: 1px solid var(--line);
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, var(--ink));
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  /* Each requirement: the thing itself in the display face, one plain line
     after it (round 3). */
  li b {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  li span {
    display: block;
    margin-top: ${space.xxs};
    max-width: 56ch;
    color: var(--muted);
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* Six kinds of place as open columns: a hairline on top, no box, the
   action in the same place on each. */
const Who = styled(Chapter)`
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(${space.lg}, 4vw, calc(${space.xxxl} + ${space.md}));
    align-items: end;
  }
  .head p {
    max-width: 46ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  /* The six kinds sit in the shared Scroller (spec §3.9). On a phone it
     scrolls sideways, one column at a time; from 641 px the same list is a
     grid of open columns, and the region no longer scrolls. */
  .kinds {
    margin-top: ${space.xxl};
  }
  @media (min-width: 641px) {
    .kinds {
      margin-inline: 0;
      overflow: visible;
      mask-image: none;
    }
    .kinds .scroller-track {
      grid-auto-flow: row;
      grid-auto-columns: auto;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: ${space.xl} ${space.xxl};
      width: auto;
      padding-inline: 0;
    }
  }
  li {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding-top: clamp(${space.md}, 1.8vw, ${space.lg});
    border-top: 1px solid var(--line);
  }
  small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    text-transform: none;
    color: ${color.accentText};
  }
  h3 {
    margin-top: ${space.sm};
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  li p {
    margin-top: ${space.xs};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text);
  }
  .go {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.xxs} ${space.md};
    margin-top: auto;
    padding-top: ${space.sm};
  }
  .go a {
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    min-height: 44px;
    color: var(--ink);
    font: 600 ${type.ui} / 1.3 ${font.ui};
    text-underline-offset: 4px;
  }
  .else {
    margin-top: clamp(${space.lg}, 2.4vw, ${space.xl});
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .else a {
    display: inline-block;
    padding: ${space.xs} 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    .kinds .scroller-track {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  /* Phone-first fix 1 (item 4): the names list replaces the columns at
     640 px and below. */
  .names {
    display: none;
  }
  @media (max-width: 640px) {
    .kinds {
      display: none;
    }
    .head p {
      margin-top: ${space.xs};
    }
    .names {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 ${space.md};
      margin: ${space.md} 0 0;
      padding: 0;
      list-style: none;
    }
    .names li {
      display: block;
      padding: 0;
      border-top: 1px solid var(--line);
    }
    .names a {
      display: flex;
      align-items: center;
      min-height: 52px;
      padding: ${space.xs} 0;
      color: var(--ink);
      font: 600 ${type.ui} / 1.3 ${font.ui};
      text-underline-offset: 4px;
      overflow-wrap: anywhere;
    }
  }
  ${media.md} {
    .head {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Line = styled(Chapter)`
  text-align: center;
  .orn {
    display: block;
    width: 9px;
    height: 9px;
    margin: 0 auto clamp(${space.lg}, 3vw, ${space.xl});
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  p {
    margin: 0 auto;
    max-width: 24ch;
    font: 400 ${display.lg} / 1.12 ${font.display};
    letter-spacing: -0.022em;
    color: var(--ink);
    text-wrap: balance;
  }
  p span,
  p em {
    display: block;
  }
  p em {
    font-style: normal;
    font-weight: 500;
    color: var(--mark);
  }
`;

/* How a program runs, and what the institution decides: one room, two
   columns of ruled rows (no numerals, no thread, no bordered 2x2 grid;
   jury 1 #10, jury 2 U5). */
const Program = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(${space.xl}, 6vw, calc(${space.xxxl} + ${space.xxxl} + ${space.sm}));
    align-items: start;
  }
  .lead {
    margin-top: ${space.md};
    max-width: 46ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  ul {
    display: grid;
    margin: clamp(${space.lg}, 3vw, ${space.xxl}) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: ${space.xxs} clamp(${space.md}, 2.4vw, ${space.xl});
    padding: ${space.md} 0;
    border-top: 1px solid var(--line);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  li p {
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
  }
  /* "You decide" and "Privacy, in short": folds on a phone only. From
     641 px the summaries are hidden and the details stay open. */
  .fold > summary {
    display: none;
  }
  /* Closed details with no summary could never open again, so wider
     screens show the content either way (the script also reopens them). */
  @media (min-width: 641px) {
    .fold::details-content {
      content-visibility: visible;
      display: contents;
    }
  }
  ${media.sm} {
    .fold {
      margin-top: ${space.md};
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
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
      padding-bottom: ${space.md};
    }
    .decide > ul {
      margin-top: 0;
    }
  }
  .privacy {
    margin-top: clamp(${space.lg}, 3vw, ${space.xl});
  }
  .privacy h3 {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    text-transform: none;
    color: var(--label);
  }
  .privacy ul {
    display: block;
    margin: ${space.xxs} 0 0;
  }
  .privacy li,
  .privacy li:last-child {
    display: block;
    padding: 0;
    border: 0;
    font: 400 ${type.read} / 1.5 ${font.text};
  }
  .privacy li {
    color: var(--muted);
  }
  .privacy li + li {
    margin-top: ${space.xxs};
  }
  .privacy li b {
    font-weight: 500;
    color: var(--ink);
  }
  .privacy p {
    margin-top: ${space.xs};
    max-width: 46ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .privacy p a {
    display: inline-block;
    padding: ${space.xxs} 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  /* Two links in one short paragraph can land on consecutive lines. They
     stay inline, so every line keeps one even leading (the inline-block
     made the lines that held a link 54px and the rest 28px, the broken
     leading the supervisor read in the film credit). The first link's
     44px hit area reaches up over the line above, every later one's down
     over the line below, and the paragraph's leading opens to 1.7, so two
     links on consecutive lines sit 8px or more apart (taste rule 20;
     round 3, B4 fix pass 2). */
  main[data-premium] & .privacy p {
    line-height: 1.7;
  }
  main[data-premium] & .privacy p a:not([class]) {
    display: inline;
    padding-block: 26px 0;
  }
  main[data-premium] & .privacy p a:not([class]) ~ a:not([class]) {
    padding-block: 0 26px;
  }
  /* The address to write to; then the two ways on, one 44px row each, 8px
     apart (round 3 fix 1; fix 2 moved the "not stated" line to the agenda
     under Book a demo). */
  main[data-premium] & .privacy p.ask a:not([class]) {
    padding-block: 13px;
  }
  .privacy .ways {
    display: grid;
    gap: ${space.xs};
    margin: ${space.xs} 0 0;
    padding: 0;
    list-style: none;
  }
  .privacy .ways li,
  .privacy .ways li + li {
    margin: 0;
  }
  main[data-premium] & .privacy .ways a:not([class]),
  .privacy .ways a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  /* On a phone the privacy fold sits flush under "You decide" (one rule
     between them) and its summary names the block, so the h3 steps out
     of the layout; it still names the list (aria-labelledby). */
  ${media.sm} {
    .privacy {
      margin-top: 0;
    }
    .privacy h3 {
      display: none;
    }
    .privacy .fold {
      margin-top: 0;
      border-top: 0;
    }
    .privacy .fold > ul {
      margin-top: 0;
    }
    /* Phone-first fix 1 (item 4): the fold for the last lines. */
    .privacy .fold.more {
      margin-top: ${space.xs};
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    li {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* Page rhythm on a wide screen (spec §4C: at most 6 screens at 1440x900).
   The rooms after the opening keep their order and words; only the section
   rhythm (--sy, styles/global.ts) and a few inner gaps step down, and only
   on this page. */
const Rhythm = styled.div`
  @media (min-width: 1025px) {
    --sy: 0.5;
    #who .kinds {
      margin-top: ${space.xl};
    }
    #who .kinds .scroller-track {
      row-gap: ${space.xl};
    }
    #how ul {
      margin-top: ${space.lg};
    }
    #how li {
      padding: ${space.sm} 0;
    }
    #how .privacy ul {
      margin-top: ${space.xxs};
    }
    #how .privacy li {
      padding: 0;
    }
  }
  /* The same on a phone (spec §4C: at most 8 screens at 390): the section
     rhythm and the ruled rows step down; words and order are unchanged. */
  ${media.sm} {
    --sy: 0.55;
    #need-title + ul li {
      padding: ${space.xs} 0;
    }
    #need-title + ul li span {
      font-size: ${type.note};
    }
    #who .kinds {
      margin-top: ${space.lg};
    }
    #how ul {
      margin-top: ${space.md};
    }
    /* "You decide" and its two folds sit closer on a phone (fix round 3:
       back to <= 8 screens with "Privacy, in short" folded). */
    #how .lead {
      margin-top: ${space.xs};
    }
    #how .decide {
      margin-top: ${space.xs};
    }
    #how .decide > ul {
      margin-top: 0;
    }
    #how li {
      padding: ${space.sm} 0;
    }
    #how .privacy li {
      padding: ${space.xxs} 0;
    }
    #how .grid {
      gap: ${space.lg};
    }
    #book .row {
      gap: ${space.xl};
    }
    #book .side ul,
    #book .side ol {
      margin-top: ${space.md};
    }
    #book .side li {
      padding: ${space.sm} 0;
    }
    /* Phone-first fix 1 (item 4, Denise #7, Priya #6): shorter on a
       phone. The one-line band (a saying, no claim) is left to wider
       screens; the four steps fold (see Program); the steps' heading
       sits closer to its fold. */
    section[aria-label="In one line"] {
      display: none;
    }
    #how .steps {
      margin-top: ${space.sm};
    }
    #how .steps > ul {
      margin-top: 0;
    }
  }
`;

/* Phone-first fix 1 (item 1): the opening's two doors, worded from
   lib/nav.ts. The care door leads with the first half of its hint
   ("Senior living and memory care. Know the person behind the care."). */
const CARE_ROUTE = route("/care-communities");
const CARE_DOOR = {
  to: CARE_ROUTE.to,
  label: CARE_ROUTE.label,
  lead: (CARE_ROUTE.hint ?? "").split(". ")[0],
};
const ORG_DOOR = route("/organizations");

/** One line of "What we can say today". */
const sayLine = (t: (typeof CAN_SAY)[number]) => (
  <li key={t.lead}>
    <b>{t.lead}</b>
    {t.rest && (
      <>
        {" "}
        {t.href ? <Link to={t.href}>{t.rest}</Link> : t.rest}
      </>
    )}
  </li>
);

const kindFromParams =(params: URLSearchParams): string =>
  params.get("for") === "care"
    ? CARE
    : (INSTITUTION_KINDS.find((k) => k === params.get("kind")) ?? "");

export default function Organizations() {
  const [params] = useSearchParams();
  const [kind, setKind] = useState(() => kindFromParams(params));
  const reveal = useReveals<HTMLDivElement>();
  /* On a phone "What you decide" folds under one line (spec §4C: near 8
     screens at 390; CHIEF-LOG B4 fix round 3). "What we can say today"
     stays open on every width (round-3 supervisor, same as /care-
     communities: the six privacy and consent lines are what trust is
     scored on, so they are not hidden behind a bare "+"). The prerendered
     page ships both open, so they read without script and on every wider
     screen. */
  const decide = useRef<HTMLDetailsElement>(null);
  const privacy = useRef<HTMLDetailsElement>(null);
  const more = useRef<HTMLDetailsElement>(null);
  const steps = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const fold = window.matchMedia(FOLD);
    const folds = [decide.current, privacy.current, more.current, steps.current];
    if (fold.matches)
      for (const d of [decide.current, more.current, steps.current])
        if (d) d.open = false;
    /* From 641 px the summary is hidden, so closed details could never be
       opened again (a phone turned sideways). Leaving the fold opens them. */
    const unfold = (e: MediaQueryListEvent) => {
      if (!e.matches) for (const d of folds) if (d) d.open = true;
    };
    fold.addEventListener("change", unfold);
    return () => fold.removeEventListener("change", unfold);
  }, []);

  /* A column picks its kind in the form and goes there. The href does the
     same without script (the prerendered page). */
  const pick = (k: Kind) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setKind(k);
    /* The address is updated outside the router: a router navigation
       would run the route transition and scroll back to the top. */
    window.history.replaceState(
      window.history.state,
      "",
      `?kind=${encodeURIComponent(k)}#book`,
    );
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: still ? "auto" : "smooth" });
    /* Keyboard and screen reader users land on the form too, not on the
       next column. */
    document.getElementById("book-title")?.focus({ preventScroll: true });
  };

  return (
    <>
      <PrintSheet />
      <EditorialSeo
        title="A Story for schools, libraries and companies"
        path="/organizations"
        description="Colleges, schools, libraries, companies, community groups and care communities can use A Story to record the people they were built by, in their own words. Book a thirty-minute demo."
      />
      <PhonePairs>
        <Opening>
          <PageOpening
            ground="paper"
            variant="split"
            title={
              <>
                The people who made the <em>place.</em>
              </>
            }
            lead={LEAD}
            note={TODAY_NOTE}
            actions={
              <>
                {/* Phone-first fix 1 (item 1, Denise #1-2, Priya #5): the
                    two doors of the "For organizations" tab, under the
                    lead, before the buttons, at every width. Labels and
                    the care hint are lib/nav.ts ROUTES. */}
                <nav className="org-doors" aria-label="Which page is yours">
                  <Link to={CARE_DOOR.to}>
                    <span>{CARE_DOOR.lead}</span>
                    <span className="to">
                      <ArrowIcon /> {CARE_DOOR.label}
                    </span>
                  </Link>
                  <p aria-current="page">
                    {ORG_DOOR.label}: you’re here
                  </p>
                </nav>
                <PrimaryAnchor href="#book">
                  Book a demo <ArrowIcon />
                </PrimaryAnchor>
                <SecondaryAnchor href={FILM}>
                  Watch the film&nbsp;·&nbsp;49&nbsp;s
                </SecondaryAnchor>
              </>
            }
            object={
              <Book>
                <a
                  className="cover"
                  href="/samples#raymond"
                  aria-label="The Ledger, a sample book. Open it"
                >
                  <img
                    src="/book-objects/sample-raymond-720.webp"
                    srcSet="/book-objects/sample-raymond-360.webp 360w, /book-objects/sample-raymond-720.webp 720w"
                    sizes="(max-width: 860px) 64vw, 520px"
                    width={720}
                    height={720}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                  />
                </a>
                <figcaption>
                  A sample book: a founder’s ledger.{" "}
                  <a href="/samples#raymond">Read it</a>
                </figcaption>
              </Book>
            }
          />
        </Opening>
      </PhonePairs>

      <Rhythm ref={reveal}>
        <Need $ground="ivory" $tight aria-labelledby="need-title">
          <Frame className="row">
            <h2 id="need-title">What you need</h2>
            <ul data-rise>
              {NEED.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Frame>
        </Need>

        <Who $ground="paper" id="who" aria-labelledby="who-title">
          <Frame>
            <div className="head">
              <Statement id="who-title" $size="md">
                Who we work with.
              </Statement>
              <p>
                Any place with people worth hearing from. Pick yours and the
                demo starts from it.
              </p>
            </div>
            <Scroller label="Who we work with" className="kinds">
              {WHO.map((w) => (
                <li key={w.kind}>
                  <small>{w.label}</small>
                  <h3>{w.title}</h3>
                  {w.body && <p>{w.body}</p>}
                  <div className="go">
                    {w.kind === CARE ? (
                      <Link to="/care-communities">
                        See care communities
                      </Link>
                    ) : (
                      <a
                        href={`?kind=${encodeURIComponent(w.kind)}#book`}
                        onClick={pick(w.kind)}
                        aria-label={`Start the demo here, for ${w.label.toLowerCase()}`}
                      >
                        Start the demo here
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </Scroller>
            {/* Phone-first fix 1 (item 4, Denise #7, Priya #6): at 640 px
                and below the six kinds are a compact two-column list of
                names, each the same door as its column above (the columns
                are hidden there, so nothing is read twice). */}
            <ul className="names" aria-label="Who we work with">
              {WHO.map((w) => (
                <li key={w.kind}>
                  {w.kind === CARE ? (
                    <Link to="/care-communities">{w.label}</Link>
                  ) : (
                    <a
                      href={`?kind=${encodeURIComponent(w.kind)}#book`}
                      onClick={pick(w.kind)}
                      aria-label={`${w.label}: start the demo here`}
                    >
                      {w.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p className="else">
              Somewhere else, or not sure it fits?{" "}
              <a
                href={`?kind=${encodeURIComponent("Something else")}#book`}
                onClick={pick("Something else")}
              >
                Start the demo anyway
              </a>
              .
            </p>
          </Frame>
        </Who>

        <Line $ground="night" $tight aria-label="In one line">
          <Frame>
            <span className="orn" aria-hidden="true" />
            <p data-rise>
              <span>A record keeps what happened.</span>{" "}
              <em>Their own words keep why.</em>
            </p>
          </Frame>
        </Line>

        <Program
          $ground="paper"
          id="how"
          aria-label="How a program runs"
          style={{ scrollMarginTop: 80 }}
        >
          <Frame className="grid" data-rise>
            <div>
              <Statement as="h2" id="how-title" $size="md">
                From a demo to an archive.
              </Statement>
              {/* Phone-first fix 1 (item 4): on a phone the four steps
                  fold under one line, like "What you decide"; from 641 px
                  the summary is hidden and they are open. */}
              <details className="fold steps" ref={steps} open>
                <summary>How a program runs</summary>
                <ul>
                  {STEPS.map(([t, d]) => (
                    <li key={t}>
                      <Heading>{t}</Heading>
                      <p>{d}</p>
                    </li>
                  ))}
                </ul>
              </details>
              <Actions>
                <PrimaryAnchor href="#book">
                  Book a demo <ArrowIcon />
                </PrimaryAnchor>
                <TextAnchor href={FILM}>
                  See one conversation become a book&nbsp;·&nbsp;49&nbsp;s
                </TextAnchor>
              </Actions>
              {/* Phone-first fix 2 (item 3, Priya #3, Denise #7): the
                  agenda (orgQuestions.ts DEMO_AGENDA) moved from here to
                  the form below, so it is said once. */}
            </div>
            <div>
              <Statement as="h2" id="decide-title" $size="md">
                You decide. <em>They agree.</em>
              </Statement>
              <p className="lead">
                A private working archive and a public anniversary volume need
                different decisions. We make them with you, before anyone is
                called.
              </p>
              <details className="decide fold" ref={decide} open>
                <summary>What you decide</summary>
                <ul>
                  {DECIDE.map(([t, d]) => (
                    <li key={t}>
                      <Heading>{t}</Heading>
                      <p>{d}</p>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="privacy">
                <h3 id="privacy-title">What we can say today</h3>
                <details className="fold" ref={privacy} open>
                  <summary>What we can say today</summary>
                  <ul aria-labelledby="privacy-title">
                    {CAN_SAY.slice(0, 3).map(sayLine)}
                  </ul>
                  {/* Phone-first fix 1 (item 4): on a phone the first three
                      lines stay open and the rest fold under one line;
                      from 641 px this fold has no summary and is open. */}
                  <details className="fold more" ref={more} open>
                    <summary>
                      {CAN_SAY.length - 3} more we can say today
                    </summary>
                    <ul aria-label="More we can say today">
                      {CAN_SAY.slice(3).map(sayLine)}
                    </ul>
                  </details>
                  {/* Round 3 fix 2 (item 2): the "not stated" line left
                      this block for the agenda under Book a demo above. */}
                  <p className="ask">
                    Write to{" "}
                    <a href={CONTACT.general}>contact@astoryapp.com</a>;{" "}
                    {WRITE_TO_DANIEL}
                  </p>
                  <ul className="ways" aria-label="Read more">
                    <li>
                      <Link to="/privacy">Read the privacy policy</Link>
                    </li>
                    <li>
                      <Link to="/questions#organizations">
                        Answers for organizations
                      </Link>
                    </li>
                  </ul>
                  <p className="compare">
                    Looking at StoryCorps as well? It is a public archive, not
                    a private family one. A Story’s archive is private by
                    default. <Link to="/compare">How A Story compares</Link>
                  </p>
                </details>
              </div>
              {/* Phone-first fix 2 (item 4, Denise #2, Priya #2): what a
                  review asks, answered with what /questions already says. */}
              <ReviewQuestions />
            </div>
          </Frame>
        </Program>

        <DemoSection
          title={
            <>
              Thirty minutes, <em>with a founder.</em>
            </>
          }
          /* Phone-first fix 2 (item 3): the agenda, once on this page,
             next to the form. The title already says "Thirty minutes,
             with a founder", so the lead is DEMO_AGENDA's second
             sentence only. */
          lead={DEMO_AGENDA_BRING}
          kind={kind}
          footer={
            <>
              Another idea? <Link to="/contact">Write to us.</Link>
            </>
          }
        />
      </Rhythm>
    </>
  );
}

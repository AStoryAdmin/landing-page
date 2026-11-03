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
 *   - A short privacy block links to the policy's own sections. No HIPAA,
 *     BAA, SOC 2 or residency claim either way (flagged for Daniel).
 *
 * The path stays /organizations: it is prerendered, in the sitemap and in
 * the guides. ?for=care still preselects the care kind for old links.
 *
 * Pricing is quoted per program, and the page says so rather than inventing
 * a number (lib/pricing.ts mirrors the app, which has no institution plan).
 */
import { useState, type MouseEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
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
import { color, display, font, media, shadow, type } from "../../styles/theme";

type Kind = (typeof INSTITUTION_KINDS)[number];
const CARE: Kind = "Senior living or care community";

/* The film on /how-it-works (kit/Film.tsx, Builder 2). A plain href, so the
   browser lands on the anchor after the page loads. */
const FILM = "/how-it-works#film";

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

/* What a place needs before it begins: three lines the site already says
   (STEPS below, DECIDE below, and the program line on /pricing). */
const NEED = [
  "Each person needs an iPhone, and we help them install the app.",
  "Nothing leaves the archive unless you and the person both say so.",
  "Program pricing is quoted individually, on the demo.",
] as const;

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
    "Guided conversations in the A Story iPhone app, now in a private beta, at the hour each person picks. Each person needs an iPhone, and we help them install the app.",
  ],
  [
    "You keep the archive.",
    "Memories, transcripts and photographs in one place, and a book or an anniversary volume when you want one.",
  ],
] as const;

const DECIDE = [
  [
    "Who takes part",
    "And how they are invited. We agree it with you.",
  ],
  [
    "Who can listen",
    "A private archive, the participants' own families, or the public. We agree it with you, before anyone is called.",
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

/* The privacy policy's own section titles (components/privacy.tsx). */
const PRIVACY = [
  ["Consent of the person being recorded", "/privacy#s6"],
  ["Your stories, your control", "/privacy#s4"],
  ["How we use artificial intelligence", "/privacy#s5"],
  ["Where your information is stored", "/privacy#s13"],
] as const;

/* The opening's object: one sample book, square like the real one, set
   down on the paper. Its cover is the same capture the home page uses
   (public/book-objects, from /samples). On a phone it comes before the
   words, so the first screen holds the object (spec §4 rule 12). */
const Book = styled.figure`
  display: grid;
  justify-items: center;
  gap: 16px;
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
  ${media.md} {
    a.cover {
      width: min(64vw, 300px);
    }
  }
`;

const Opening = styled.div`
  display: contents;
  @media (max-width: 860px) {
    section[data-variant] .opening-object {
      order: -1;
    }
  }
`;

/* What you need: three ruled lines straight after the opening. */
const Need = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
    gap: clamp(24px, 5vw, 110px);
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
    padding: 16px 0;
    border-top: 1px solid var(--line);
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, var(--ink));
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
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
    gap: clamp(24px, 4vw, 80px);
    align-items: end;
  }
  .head p {
    max-width: 46ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 3vw, 48px) clamp(24px, 3vw, 56px);
    margin: clamp(32px, 4vw, 56px) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding-top: clamp(18px, 1.8vw, 26px);
    border-top: 1px solid var(--line);
  }
  small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  h3 {
    margin-top: 12px;
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  li p {
    margin-top: 10px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text);
  }
  .go {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
    margin-top: auto;
    padding-top: 14px;
  }
  .go a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    color: var(--ink);
    font: 600 ${type.ui} / 1.3 ${font.ui};
    text-underline-offset: 4px;
  }
  .go a svg {
    width: 16px;
    height: 16px;
  }
  .else {
    margin-top: clamp(22px, 2.4vw, 32px);
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .else a {
    display: inline-block;
    padding: 10px 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  ${media.lg} {
    ul {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.md} {
    .head {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    ul {
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
    margin: 0 auto clamp(28px, 3vw, 40px);
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
    gap: clamp(40px, 6vw, 140px);
    align-items: start;
  }
  .lead {
    margin-top: 16px;
    max-width: 46ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  ul {
    display: grid;
    margin: clamp(26px, 3vw, 44px) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 6px clamp(18px, 2.4vw, 40px);
    padding: 20px 0;
    border-top: 1px solid var(--line);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  li p {
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
  }
  .privacy {
    margin-top: clamp(28px, 3vw, 40px);
  }
  .privacy h3 {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    text-transform: none;
    color: var(--label);
  }
  .privacy ul {
    display: block;
    margin: 6px 0 0;
  }
  .privacy li,
  .privacy li:last-child {
    display: block;
    padding: 0;
    border: 0;
    font: 400 ${type.read} / 1.5 ${font.text};
  }
  .privacy li a {
    display: inline-block;
    padding: 6px 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
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

const kindFromParams = (params: URLSearchParams): string =>
  params.get("for") === "care"
    ? CARE
    : (INSTITUTION_KINDS.find((k) => k === params.get("kind")) ?? "");

export default function Organizations() {
  const [params] = useSearchParams();
  const [kind, setKind] = useState(() => kindFromParams(params));
  const reveal = useReveals<HTMLDivElement>();

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
            lead="A Story calls the people your institution was built by, and asks about their lives with follow-up questions that listen. You keep their words, and a book when you want one."
            actions={
              <>
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

      <div ref={reveal}>
        <Need $ground="ivory" $tight aria-labelledby="need-title">
          <Frame className="row">
            <h2 id="need-title">What you need</h2>
            <ul>
              {NEED.map((n) => (
                <li key={n} data-rise>
                  {n}
                </li>
              ))}
            </ul>
          </Frame>
        </Need>

        <Who $ground="paper" id="who" aria-labelledby="who-title">
          <Frame>
            <div className="head">
              <Statement id="who-title" $size="md" data-lines>
                Who we work <em>with.</em>
              </Statement>
              <p data-rise>
                Any place with people worth hearing from. Pick yours and the
                demo starts from it.
              </p>
            </div>
            <ul>
              {WHO.map((w) => (
                <li key={w.kind} data-rise="row">
                  <small>{w.label}</small>
                  <h3>{w.title}</h3>
                  {w.body && <p>{w.body}</p>}
                  <div className="go">
                    {w.kind === CARE ? (
                      <Link to="/care-communities">
                        See care communities <ArrowIcon />
                      </Link>
                    ) : (
                      <a
                        href={`?kind=${encodeURIComponent(w.kind)}#book`}
                        onClick={pick(w.kind)}
                        aria-label={`Start the demo here, for ${w.label.toLowerCase()}`}
                      >
                        Start the demo here <ArrowIcon />
                      </a>
                    )}
                  </div>
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
          <Frame className="grid">
            <div>
              <Statement as="h2" id="how-title" $size="md">
                From a demo to an archive.
              </Statement>
              <ul>
                {STEPS.map(([t, d]) => (
                  <li key={t} data-rise>
                    <Heading>{t}</Heading>
                    <p>{d}</p>
                  </li>
                ))}
              </ul>
              <Actions>
                <PrimaryAnchor href="#book">
                  Book a demo <ArrowIcon />
                </PrimaryAnchor>
                <TextAnchor href={FILM}>
                  See one conversation become a book&nbsp;·&nbsp;49&nbsp;s
                </TextAnchor>
              </Actions>
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
              <ul>
                {DECIDE.map(([t, d]) => (
                  <li key={t} data-rise>
                    <Heading>{t}</Heading>
                    <p>{d}</p>
                  </li>
                ))}
              </ul>
              <div className="privacy">
                <h3 id="privacy-title">Privacy, in the policy itself</h3>
                <ul aria-labelledby="privacy-title">
                  {PRIVACY.map(([t, to]) => (
                    <li key={to}>
                      <a href={to}>{t}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Frame>
        </Program>

        <DemoSection
          title={
            <>
              Thirty minutes, <em>with a founder.</em>
            </>
          }
          kind={kind}
          footer={
            <>
              Another idea? <Link to="/contact">Write to us.</Link>
            </>
          }
        />
      </div>
    </>
  );
}

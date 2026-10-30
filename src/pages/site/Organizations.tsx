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
 * not read as the main audience; a place to offer a collaboration):
 *
 *   - The opening has two actions: Book a demo, and Propose a collaboration.
 *     Its object is four prints only; the words that sat under them were a
 *     second page inside the opening and pushed everything down.
 *   - "Who we work with": six kinds of place in identical tiles, care among
 *     them and not first. Each tile picks its kind in the demo form and
 *     takes the reader there (?kind=…#book still works without script).
 *   - The booking room is kit/DemoSection.tsx, shared with the care page.
 *   - #collaborate: for an idea that is not a program - a class project, an
 *     event together, a heritage project, a grant (CollaborationForm.tsx).
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
import { ArrowIcon, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Chapter,
  Frame,
  Heading,
  Plate,
  PrimaryAnchor,
  SecondaryAnchor,
  Statement,
} from "./kit/kit.styles";
import DemoSection from "./kit/DemoSection";
import CollaborationForm from "./CollaborationForm";
import { INSTITUTION_KINDS } from "../../lib/demoRequest";
import { color, display, font, media, type } from "../../styles/theme";

type Kind = (typeof INSTITUTION_KINDS)[number];
const CARE: Kind = "Senior living or care community";

const PRINTS = [
  ["04", "A graduation, 1994"],
  ["40", "The bound pages of an A Story volume, close up"],
  ["08", "A person repairing a fan at a workbench"],
  ["18", "An older woman on a porch in the rain, with her son beside her, 1960"],
] as const;

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
    body: "Firsthand accounts beside the photographs and documents you already hold, with names and dates attached, ready to cite or exhibit.",
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
    kind: CARE,
    label: "Senior living and care",
    title: "Know the person behind the care.",
    body: "Residents tell the stories they want kept, and families add theirs. Staff learn who someone was before they came to you.",
  },
];

const STEPS = [
  [
    "A thirty-minute demo.",
    "We show a real call and a real archive, and ask about your people and what you want to keep.",
  ],
  [
    "You choose who takes part.",
    "A list of names and phone numbers, or an invitation people sign up through. Consent comes first.",
  ],
  [
    "A Story makes the calls.",
    "Guided conversations in the A Story iPhone app, now in a private beta, at the hour each person picks. We help everyone set it up.",
  ],
  [
    "You keep the archive.",
    "Memories, transcripts and photographs in one place, and a book or an anniversary volume when you want one.",
  ],
] as const;

const DECIDE = [
  [
    "Who takes part",
    "And how they are invited - a list from you, or a link they sign up through.",
  ],
  [
    "Who can listen",
    "A private archive, the participants' own families, or the public. Set per program.",
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

const COLLABORATIONS = [
  [
    "A class or a research project",
    "Students or researchers recording a community, with the archive as what they hand in.",
  ],
  [
    "An event or a program together",
    "A reunion, an exhibition, a heritage month, an evening of stories.",
  ],
  [
    "A grant or a funding partnership",
    "Funding that brings A Story to people who could not otherwise have it.",
  ],
  [
    "Bringing A Story to your members",
    "An association, a network or a platform whose people would want it.",
  ],
] as const;

/* The opening's object: four prints on the cloth, nothing written under
   them (the words moved to "Who we work with"). Two by two on a phone. */
const Prints = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(20px, 2.6vw, 52px);
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    min-width: 0;
  }
  li > figure {
    max-width: 420px;
  }
  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

/* Six kinds of place in identical tiles: same height, same parts, the
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
    gap: clamp(16px, 1.6vw, 28px);
    margin: clamp(32px, 4vw, 56px) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: clamp(24px, 2.4vw, 36px);
    background: ${color.paperPure};
    border: 1px solid var(--line);
    border-radius: 4px;
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
    padding-top: 18px;
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
  .go a.more {
    font-weight: 500;
    color: var(--muted);
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
   jury 1 #10, jury 2 U5). The collaboration room uses the same rows. */
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
  .foot {
    margin-top: 22px;
    font: 400 ${type.read} / 1.6 ${font.text};
    color: var(--muted);
  }
  .foot a {
    display: inline-block;
    padding: 9px 0;
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

const Collaborate = styled(Program)`
  scroll-margin-top: 80px;
  .grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(40px, 6vw, 110px);
  }
  li {
    grid-template-columns: minmax(0, 1fr);
  }
  .card {
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.06),
      0 40px 80px -48px rgba(42, 31, 24, 0.45);
  }
  .card-head {
    margin-bottom: clamp(26px, 3vw, 36px);
    padding-bottom: clamp(20px, 2.4vw, 28px);
    border-bottom: 1px solid ${color.primaryLine};
  }
  .card-head small {
    display: block;
    font: 600 ${type.label} / 1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .card-head h3 {
    margin-top: 10px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  ${media.md} {
    .grid {
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

  /* A tile picks its kind in the form and goes there. The href does the
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
       next tile. */
    document.getElementById("book-title")?.focus({ preventScroll: true });
  };

  return (
    <>
      <EditorialSeo
        title="A Story for institutions - book a demo"
        path="/organizations"
        description="Colleges, schools, libraries, companies, community groups and care communities can use A Story to record the people they were built by, in their own words. Book a thirty-minute demo, or propose a collaboration."
      />
      <PhonePairs>
        <PageOpening
          variant="wide"
          title={
            <>
              The people who made the <em>place.</em>
            </>
          }
          lead="A Story calls the people your institution was built by, and asks about their lives with follow-up questions that listen. The calls ring in the A Story iPhone app, in a private beta. You keep their words, and a book when you want one."
          actions={
            <>
              <PrimaryAnchor href="#book">
                Book a demo <ArrowIcon />
              </PrimaryAnchor>
              <SecondaryAnchor href="#collaborate">
                Propose a collaboration
              </SecondaryAnchor>
            </>
          }
          object={
            <Prints>
              {PRINTS.map(([id, alt], i) => (
                <li key={id}>
                  <Print
                    id={id}
                    alt={alt}
                    ratio="4 / 5"
                    tilt={[-1.4, 0.9, -0.7, 1.2][i]}
                    sizes="(max-width: 860px) 46vw, 24vw"
                    priority={i < 2}
                  />
                </li>
              ))}
            </Prints>
          }
        />
      </PhonePairs>

      <div ref={reveal}>
        <Who $ground="ivory" id="who" aria-labelledby="who-title">
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
                  <p>{w.body}</p>
                  <div className="go">
                    <a
                      href={`?kind=${encodeURIComponent(w.kind)}#book`}
                      onClick={pick(w.kind)}
                      aria-label={`Book a demo for ${w.label.toLowerCase()}`}
                    >
                      Book a demo <ArrowIcon />
                    </a>
                    {w.kind === CARE && (
                      <Link className="more" to="/care-communities">
                        More for care communities
                      </Link>
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
                Book a demo anyway
              </a>{" "}
              or <a href="#collaborate">tell us your idea</a>.
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
              <p className="foot">
                Pricing is quoted for each program, by how many people take part
                and whether you want printed books. We tell you on the demo, not
                after it. <Link to="/privacy">How we handle privacy</Link>
              </p>
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
        />

        <Collaborate
          $ground="paper"
          id="collaborate"
          aria-labelledby="collaborate-title"
        >
          <Frame className="grid">
            <div>
              <Statement id="collaborate-title" $size="md">
                Another idea? <em>Build it with us.</em>
              </Statement>
              <p className="lead">
                Not every partnership starts with a program. If you see a way to
                work together, tell us. A rough idea is enough, and it goes
                straight to Daniel.
              </p>
              <ul>
                {COLLABORATIONS.map(([t, d]) => (
                  <li key={t} data-rise>
                    <Heading>{t}</Heading>
                    <p>{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Plate className="card" data-rise>
              <div className="card-head">
                <small>Propose a collaboration</small>
                <h3>What would you like to do together?</h3>
              </div>
              <CollaborationForm />
            </Plate>
          </Frame>
        </Collaborate>
      </div>
    </>
  );
}

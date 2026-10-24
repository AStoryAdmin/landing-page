/**
 * For institutions (/organizations). Redesigned 2026-10-20.
 *
 * The page before it (Pass 11g, on kit/Audience.tsx) spoke to one reader -
 * a company keeping knowledge before a retirement - and ended in "Request a
 * demonstration", which went to /start and emailed nobody. The people who
 * actually write to us are colleges, care communities, libraries and
 * community groups. So the page now names them, shows the product, says
 * what the institution decides, and ends in a form that books a demo and
 * lands in Daniel's inbox (DemoBooking.tsx, lib/demoRequest.ts).
 *
 * Premium pass the same day, at the founder's request: the four audiences
 * sit in identical windows (mixed portrait and landscape prints made a
 * ragged row), the app itself appears beside the steps, a night statement
 * breaks the run of light sections, and the booking column stays in view
 * beside the form with what happens after you send it.
 *
 * The path stays /organizations: it is prerendered, in the sitemap and in
 * the guides. ?for=care preselects the kind, for the care communities page.
 *
 * Pricing is quoted per program, and the page says so rather than inventing
 * a number (lib/pricing.ts mirrors the app, which has no institution plan).
 */
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
import DemoBooking from "./DemoBooking";
import { DEMO_EMAIL, INSTITUTION_KINDS } from "../../lib/demoRequest";
import { color, display, font, media } from "../../styles/theme";

const WHO = [
  {
    photo: "04",
    alt: "A graduation, 1994",
    kind: "Colleges and universities",
    title: "Alumni, in their own words.",
    body: "A reunion class, the first women admitted, a department turning fifty. Each graduate is called at an hour they choose, and the archive grows class by class.",
  },
  {
    photo: "18",
    alt: "An older woman on a porch in the rain, with her son beside her, 1960",
    kind: "Senior living and care",
    title: "Know the person behind the care.",
    body: "Residents tell the stories they want kept, and families add theirs. Staff learn who someone was before they came to you. An invitation to talk, never a memory test.",
  },
  {
    photo: "40",
    alt: "The bound pages of an A Story volume, close up",
    kind: "Libraries and museums",
    title: "An oral history that keeps going.",
    body: "Firsthand accounts beside the photographs and documents you already hold, with names and dates attached, ready to cite or exhibit.",
  },
  {
    photo: "08",
    alt: "A person repairing a fan at a workbench",
    kind: "Companies and nonprofits",
    title: "The reason behind the record.",
    body: "Founders, long-serving staff, the people retiring this year. The judgment and the history a handover document leaves out.",
  },
] as const;

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

const NEXT = [
  ["You send this form.", "It goes to Daniel, our co-founder and CEO."],
  [
    "Daniel writes back.",
    "Within a working day, to confirm one of the times you picked.",
  ],
  [
    "Thirty minutes together.",
    "A live call, a real archive, and your questions.",
  ],
  [
    "Start small.",
    "A program can begin with one class, one floor or one team.",
  ],
] as const;

/* The hero's object (jury 1 #4): the four kinds of place as a row of
   prints on the cloth, each with what A Story keeps there. It replaces the
   separate "who" room and the trust strip under the hero (jury 1 #17). */
const Strip = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(24px, 2.6vw, 52px);
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: grid;
    align-content: start;
    min-width: 0;
  }
  li > figure {
    max-width: 420px;
  }
  small {
    display: block;
    margin-top: 22px;
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label);
  }
  h2 {
    margin-top: 10px;
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  p {
    margin-top: 8px;
    font: 400 clamp(1rem, 0.96rem + 0.2vw, 1.15rem) / 1.55 ${font.text};
    color: var(--text);
  }
  ${media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 48px;
  }
  ${media.sm} {
    grid-template-columns: minmax(0, 1fr);
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
    font: 400 clamp(1.05rem, 1rem + 0.3vw, 1.3rem) / 1.55 ${font.text};
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
    font: 400 17px/1.6 ${font.text};
    color: var(--muted);
  }
  .foot {
    margin-top: 22px;
    font: 400 16px/1.6 ${font.text};
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

const Book = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: start;
  }
  .side {
    position: sticky;
    top: 112px;
  }
  .side ol {
    display: grid;
    margin: clamp(30px, 3vw, 44px) 0 0;
    padding: 0;
    list-style: none;
  }
  .side li {
    padding: 16px 0;
    border-top: 1px solid var(--line);
  }
  .side b {
    display: block;
    font: 400 20px/1.3 ${font.display};
    color: var(--ink);
  }
  .side li span {
    display: block;
    margin-top: 4px;
    font: 400 16px/1.55 ${font.text};
    color: var(--muted);
  }
  .side .write {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
    font: 400 16px/1.55 ${font.text};
    color: var(--muted);
  }
  .side .write a {
    display: inline-block;
    padding: 10px 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
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
    font: 600 13px/1.3 ${font.body};
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
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      position: static;
    }
  }
`;

export default function Organizations() {
  const [params] = useSearchParams();
  const initialKind =
    params.get("for") === "care"
      ? "Senior living or care community"
      : (INSTITUTION_KINDS.find((k) => k === params.get("kind")) ?? "");
  const reveal = useReveals<HTMLDivElement>();

  return (
    <>
      <EditorialSeo
        title="A Story for institutions - book a demo"
        path="/organizations"
        description="Colleges, care communities, libraries and organizations can use A Story to record the people they were built by, in their own words. Book a thirty-minute demo."
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
              <SecondaryAnchor href="#how">How a program runs</SecondaryAnchor>
            </>
          }
          object={
            <Strip aria-label="Who it is for">
              {WHO.map((w, i) => (
                <li key={w.kind}>
                  <Print
                    id={w.photo}
                    alt={w.alt}
                    ratio="4 / 5"
                    tilt={[-1.4, 0.9, -0.7, 1.2][i]}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                    priority={i < 2}
                  />
                  <small>{w.kind}</small>
                  <h2>{w.title}</h2>
                  <p>{w.body}</p>
                </li>
              ))}
            </Strip>
          }
        />
      </PhonePairs>

      <div ref={reveal}>
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

        <Book
          $ground="ivory"
          id="book"
          aria-labelledby="book-title"
          style={{ scrollMarginTop: 80 }}
        >
          <Frame className="row">
            <div className="side" data-rise>
              <Statement id="book-title" $size="lg">
                Thirty minutes, <em>with a founder.</em>
              </Statement>
              <ol>
                {NEXT.map(([t, d]) => (
                  <li key={t}>
                    <div>
                      <b>{t}</b>
                      <span>{d}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="write">
                Rather write? <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>
              </p>
            </div>
            <Plate className="card" data-rise>
              <div className="card-head">
                <small>A demo for your institution</small>
                <h3>Tell us where you are, and when suits you.</h3>
              </div>
              <DemoBooking initialKind={initialKind} />
            </Plate>
          </Frame>
        </Book>
      </div>
    </>
  );
}

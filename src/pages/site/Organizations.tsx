/**
 * For institutions (/organizations). Redesigned 2026-10-20.
 *
 * The page before it (Pass 11g, on kit/Audience.tsx) spoke to one reader -
 * a company keeping knowledge before a retirement - and ended in "Request a
 * demonstration", which went to /start and emailed nobody. The people who
 * actually write to us are colleges, care communities, libraries and
 * community groups. So the page now names them, says how a program runs,
 * what the institution decides, and ends in a form that books a demo and
 * lands in Daniel's inbox (DemoBooking.tsx, lib/demoRequest.ts).
 *
 * The path stays /organizations: it is prerendered, in the sitemap and in
 * the guides. ?for=care preselects the kind, for the care communities page.
 *
 * Pricing is quoted per program, and the page says so rather than inventing
 * a number (lib/pricing.ts mirrors the app, which has no institution plan).
 */
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Heading,
  Lead,
  Plate,
  PrimaryAnchor,
  SecondaryAnchor,
  SplitHead,
  StackHead,
  Statement,
} from "./kit/kit.styles";
import DemoBooking from "./DemoBooking";
import { INSTITUTION_KINDS } from "../../lib/demoRequest";
import { color, font, media } from "../../styles/theme";

const WHO = [
  {
    photo: "04",
    alt: "A graduation, 1994",
    kind: "Colleges and universities",
    title: "Alumni, in their own voices.",
    body: "A reunion class, the first women admitted, a department turning fifty. Each graduate gets a call at an hour they choose, and the archive grows class by class.",
  },
  {
    photo: "31",
    alt: "A woman's face, 1958",
    kind: "Senior living and care",
    title: "Know the person behind the care.",
    body: "Residents tell the stories they want kept; families add theirs. Staff learn who someone was before they came to you. An invitation to talk, never a memory test.",
  },
  {
    photo: "32",
    alt: "A street and building, around 1970",
    kind: "Libraries, museums, historical societies",
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
  ["A thirty-minute demo.", "We show a real call and a real archive, and ask about your people and what you want to keep."],
  ["You choose who takes part.", "A list of names and phone numbers, or an invitation people sign up through. Consent comes first."],
  ["A Story makes the calls.", "Guided conversations that follow what each person actually says, at the hour they pick."],
  ["You keep the archive.", "Voices, transcripts and photographs in one place, and a book or an anniversary volume made from it when you want one."],
] as const;

const DECIDE = [
  ["Who takes part", "and how they are invited"],
  ["Who can listen", "a private archive, the participants' families, or the public"],
  ["Consent", "each person agrees before the first call, and can stop at any time"],
  ["What is published", "nothing leaves the archive unless you and the person say so"],
] as const;

const Who = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(28px, 3vw, 48px);
  }
  article {
    display: grid;
    align-content: start;
    gap: 14px;
  }
  .kind {
    margin-top: 10px;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label);
  }
  article p:last-child {
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.lg} {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const How = styled(Chapter)`
  ol {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 48px);
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
  }
  li {
    counter-increment: step;
    padding-top: 22px;
    border-top: 1px solid var(--line);
  }
  li::before {
    content: counter(step, lower-roman);
    display: block;
    margin-bottom: 14px;
    font: italic 400 22px/1 ${font.display};
    color: var(--mark);
  }
  li p {
    margin-top: 10px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    ol {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    ol {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Decide = styled(Chapter)`
  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(28px, 5vw, 88px);
    margin: 0;
  }
  dl > div {
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }
  dt {
    font: 400 ${"clamp(1.3rem, 1.1rem + 0.6vw, 1.7rem)"} / 1.2 ${font.display};
    color: var(--ink);
  }
  dd {
    margin: 6px 0 0;
    font: 400 17px/1.55 ${font.body};
    color: var(--muted);
  }
  .price {
    margin-top: clamp(32px, 4vw, 56px);
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
    max-width: 62ch;
  }
  ${media.sm} {
    dl {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Book = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(36px, 6vw, 110px);
    align-items: start;
  }
  .side ul {
    display: grid;
    gap: 12px;
    margin: 28px 0 0;
    padding: 22px 0 0;
    border-top: 1px solid var(--line);
    list-style: none;
  }
  .side li {
    display: grid;
    grid-template-columns: 14px 1fr;
    gap: 14px;
    font: 400 17px/1.5 ${font.body};
    color: var(--muted);
  }
  .side li::before {
    content: "";
    width: 7px;
    height: 7px;
    margin: 8px 0 0 3px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  .card {
    background: ${color.paperPure};
  }
  ${media.md} {
    .row {
      grid-template-columns: minmax(0, 1fr);
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
        description="Colleges, care communities, libraries and organizations use A Story to record the people they were built by, in their own voices. Book a thirty-minute demo."
      />
      <PageOpening
        ground="night"
        eyebrow="For institutions"
        title={
          <>
            The people who made the place, <em>in their own words.</em>
          </>
        }
        lead="A Story calls the people your institution was built by - alumni, residents, long-serving staff, founders - and asks about their lives, with follow-up questions that listen. You keep their voices, and a book when you want one."
        actions={
          <>
            <PrimaryAnchor href="#book">
              Book a demo <ArrowIcon />
            </PrimaryAnchor>
            <SecondaryAnchor href="#how">How a program runs</SecondaryAnchor>
          </>
        }
        media={
          <Print
            id="27"
            alt="Someone telling a story at a dinner table while everyone listens, 1980"
            sizes="(max-width: 1024px) 100vw, 44vw"
            tilt={-1.5}
            priority
          />
        }
      />

      <div ref={reveal}>
        <Who $ground="ivory" aria-labelledby="who-title">
          <Frame>
            <SplitHead>
              <div>
                <Eyebrow>Who it is for</Eyebrow>
                <Statement id="who-title" $size="lg">
                  Every place has people <em>worth hearing.</em>
                </Statement>
              </div>
              <Lead>The calls are the same for everyone. What you keep, and who it is for, is yours to decide.</Lead>
            </SplitHead>
            <div className="grid">
              {WHO.map((w, i) => (
                <article key={w.kind} data-rise>
                  <Print id={w.photo} alt={w.alt} sizes="(max-width: 640px) 100vw, 25vw" tilt={i % 2 ? 1 : -1} />
                  <p className="kind">{w.kind}</p>
                  <Heading>{w.title}</Heading>
                  <p>{w.body}</p>
                </article>
              ))}
            </div>
          </Frame>
        </Who>

        <How $ground="paper" id="how" aria-labelledby="how-title" style={{ scrollMarginTop: 80 }}>
          <Frame>
            <StackHead>
              <Statement id="how-title" $size="lg">
                From a demo to an archive, <em>in four steps.</em>
              </Statement>
              <p>Most programs start with a small group - one class, one floor, one team - and grow from there.</p>
            </StackHead>
            <ol>
              {STEPS.map(([t, d]) => (
                <li key={t} data-rise>
                  <Heading>{t}</Heading>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </Frame>
        </How>

        <Decide $ground="sand" aria-labelledby="decide-title">
          <Frame>
            <SplitHead>
              <div>
                <Eyebrow>Before the first call</Eyebrow>
                <Statement id="decide-title" $size="lg">
                  You decide. <em>They agree.</em>
                </Statement>
              </div>
              <Lead>A private working archive and a public anniversary volume need different decisions. We make them with you.</Lead>
            </SplitHead>
            <dl>
              {DECIDE.map(([t, d]) => (
                <div key={t} data-rise>
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
            <p className="price">
              Pricing is quoted for each program, by how many people take part and whether you want printed books.
              We tell you on the demo, not after it.
            </p>
          </Frame>
        </Decide>

        <Book $ground="ivory" id="book" aria-labelledby="book-title" style={{ scrollMarginTop: 80 }}>
          <Frame className="row">
            <div className="side" data-rise>
              <Eyebrow>Book a demo</Eyebrow>
              <Statement id="book-title" $size="lg">
                Thirty minutes, <em>with a founder.</em>
              </Statement>
              <ul>
                <li>A real call, and a real archive, shown live</li>
                <li>Your people, your timeline, and what you want to keep</li>
                <li>What a program costs for you</li>
                <li>Daniel writes back within a working day to confirm a time</li>
              </ul>
            </div>
            <Plate className="card" data-rise>
              <DemoBooking initialKind={initialKind} />
            </Plate>
          </Frame>
        </Book>
      </div>
    </>
  );
}

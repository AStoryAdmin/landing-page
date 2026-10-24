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
import { ArrowIcon, PageOpening, Picture, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { AppShot, Phone } from "./app/Phone";
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
    title: "Alumni, in their own voices.",
    body: "A reunion class, the first women admitted, a department turning fifty. Each graduate is called at an hour they choose, and the archive grows class by class.",
  },
  {
    photo: "31",
    alt: "A woman's face, 1958",
    kind: "Senior living and care",
    title: "Know the person behind the care.",
    body: "Residents tell the stories they want kept, and families add theirs. Staff learn who someone was before they came to you. An invitation to talk, never a memory test.",
  },
  {
    photo: "32",
    alt: "A street and building, around 1970",
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
    "Guided conversations that follow what each person actually says, at the hour they pick.",
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

/* A thin band of the three things an institution asks first. */
const Facts = styled.div`
  background: ${color.ivoryDeep};
  border-bottom: 1px solid ${color.primaryLine};
  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 22px 12px;
    font: 600 13px/1.35 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.primary};
    text-align: center;
  }
  li + li {
    border-left: 1px solid ${color.primaryLine};
  }
  li::before {
    content: "";
    flex: none;
    width: 7px;
    height: 7px;
    border: 1px solid ${color.goldOnLight};
    transform: rotate(45deg);
  }
  ${media.sm} {
    ul {
      grid-template-columns: minmax(0, 1fr);
    }
    li {
      justify-content: flex-start;
      padding: 16px 0;
    }
    li + li {
      border-left: 0;
      border-top: 1px solid ${color.primaryLine};
    }
  }
`;

const Who = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 2.6vw, 44px);
  }
  article {
    display: grid;
    align-content: start;
  }
  /* One window for every print, so a portrait graduation and a landscape
     street sit level. The mat and the shadow are the print's. */
  .window {
    position: relative;
    aspect-ratio: 4 / 5;
    padding: clamp(8px, 0.8vw, 12px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(42, 31, 24, 0.08),
      0 18px 34px -18px rgba(42, 31, 24, 0.5);
  }
  .window > div {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .window > div::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(42, 31, 24, 0.14);
  }
  .window img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    article:hover .window img {
      transform: scale(1.04);
    }
  }
  .n {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-top: 26px;
    padding-top: 16px;
    border-top: 1px solid var(--line);
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label);
  }
  .n b {
    font: italic 400 18px/1 ${font.display};
    letter-spacing: 0;
    text-transform: none;
    color: var(--mark);
  }
  h3 {
    margin-top: 14px;
  }
  article p:last-child {
    margin-top: 10px;
    font: 400 17px/1.6 ${font.text};
    color: var(--muted);
  }
  ${media.lg} {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 56px;
    }
    .window {
      aspect-ratio: 4 / 3;
    }
  }
  ${media.sm} {
    .grid {
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

const How = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: center;
  }
  .stage {
    display: grid;
    place-items: start center;
    height: clamp(480px, 44vw, 640px);
    overflow: hidden;
    padding-top: 40px;
    border-radius: 24px;
    background: radial-gradient(
      ellipse at 50% 100%,
      color-mix(in srgb, ${color.gold} 34%, ${color.ivory}),
      ${color.ivory} 72%
    );
    mask-image: linear-gradient(#000 86%, transparent);
  }
  ol {
    display: grid;
    margin: clamp(32px, 3.4vw, 48px) 0 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
  }
  li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 18px;
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }
  li::before {
    content: counter(step, lower-roman);
    font: italic 400 24px/1.1 ${font.display};
    color: var(--mark);
  }
  li p {
    margin-top: 6px;
    font: 400 17px/1.6 ${font.text};
    color: var(--muted);
    max-width: 52ch;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .stage {
      order: 2;
      height: 460px;
    }
  }
`;

const Decide = styled(Chapter)`
  .cells {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .cell {
    display: grid;
    grid-template-columns: 22px minmax(0, 1fr);
    gap: 18px;
    padding: clamp(26px, 3vw, 44px);
    background: ${color.ivory};
  }
  .cell::before {
    content: "";
    width: 9px;
    height: 9px;
    margin: 12px 0 0 5px;
    border: 1px solid ${color.goldOnLight};
    transform: rotate(45deg);
  }
  .cell p {
    margin-top: 8px;
    font: 400 17px/1.6 ${font.text};
    color: var(--muted);
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px 32px;
    margin-top: clamp(28px, 3vw, 40px);
    font: 400 17px/1.6 ${font.text};
    color: var(--muted);
  }
  .foot p {
    max-width: 60ch;
  }
  .foot a {
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  ${media.sm} {
    .cells {
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
    counter-reset: next;
  }
  .side li {
    counter-increment: next;
    position: relative;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 14px;
    padding-bottom: 22px;
  }
  /* The thread that joins the four steps. */
  .side li:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 13px;
    top: 32px;
    bottom: 4px;
    width: 1px;
    background: color-mix(in srgb, ${color.gold} 60%, transparent);
  }
  .side li::before {
    content: counter(next);
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: 1px solid ${color.goldOnLight};
    border-radius: 50%;
    font: italic 400 15px/1 ${font.display};
    color: ${color.primary};
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
      <PageOpening
        ground="night"
        title={
          <>
            The people who made the <em>place.</em>
          </>
        }
        lead="A Story calls the people your institution was built by - alumni, residents, long-serving staff, founders - and asks about their lives, with follow-up questions that listen. You keep their words, in their own voice, and a book when you want one."
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
        <Facts aria-label="In short">
          <Frame>
            <ul>
              <li>A founder on every demo</li>
              <li>Consent before every call</li>
              <li>Quoted for your program</li>
            </ul>
          </Frame>
        </Facts>

        <Who $ground="ivory" aria-labelledby="who-title">
          <Frame>
            <SplitHead>
              <div>
                <Statement id="who-title" $size="lg">
                  Every place has people <em>worth hearing.</em>
                </Statement>
              </div>
              <Lead>
                The calls are the same for everyone. What you keep, and who it
                is for, is yours to decide.
              </Lead>
            </SplitHead>
            <div className="grid">
              {WHO.map((w) => (
                <article key={w.kind} data-rise>
                  <div className="window">
                    <div>
                      <Picture
                        id={w.photo}
                        alt={w.alt}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                      />
                    </div>
                  </div>
                  <p className="n">{w.kind}</p>
                  <Heading>{w.title}</Heading>
                  <p>{w.body}</p>
                </article>
              ))}
            </div>
          </Frame>
        </Who>

        <Line $ground="night" $tight aria-label="In one line">
          <Frame>
            <span className="orn" aria-hidden="true" />
            <p data-rise>
              <span>A record keeps what happened.</span>{" "}
              <em>A voice keeps why.</em>
            </p>
          </Frame>
        </Line>

        <How
          $ground="paper"
          id="how"
          aria-labelledby="how-title"
          style={{ scrollMarginTop: 80 }}
        >
          <Frame className="grid">
            <div className="stage" data-rise aria-hidden="true">
              <Phone width="min(320px, 84%)">
                <AppShot name="archive" scroll />
              </Phone>
            </div>
            <div>
              <Statement id="how-title" $size="lg">
                From a demo to an archive, <em>in four steps.</em>
              </Statement>
              <ol>
                {STEPS.map(([t, d]) => (
                  <li key={t} data-rise>
                    <div>
                      <Heading>{t}</Heading>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
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
              <Lead>
                A private working archive and a public anniversary volume need
                different decisions. We make them with you, before anyone is
                called.
              </Lead>
            </SplitHead>
            <div className="cells">
              {DECIDE.map(([t, d]) => (
                <div className="cell" key={t} data-rise>
                  <div>
                    <Heading>{t}</Heading>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="foot">
              <p>
                Pricing is quoted for each program, by how many people take part
                and whether you want printed books. We tell you on the demo, not
                after it.
              </p>
              <Link to="/privacy">How we handle privacy</Link>
            </div>
          </Frame>
        </Decide>

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

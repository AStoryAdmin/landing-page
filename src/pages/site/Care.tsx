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
 * on an ivory leaf and one print beside it - the photo-sorting scene, shown
 * once on this page and nowhere else on the site. Then one room for knowing
 * the person (two prints, three ruled rows), the question that opens a
 * conversation beside how it works, and what to agree before beginning. No
 * photograph is drawn larger than its file, and none repeats Home's.
 *
 * 2026-10-29 (founder: the page's goal "is not really there"): the page now
 * books its own demo. "Book a demo" used to leave for /organizations, and
 * the page ended on the family close ("The archive is free...", Start
 * free), which is not what a care community came for. The last room is the
 * booking form itself (kit/DemoSection.tsx) with the care kind picked and
 * what we agree before anyone is called beside it, plus a door to
 * /organizations for every other kind of place.
 *
 * 2026-11-02, premium pass (docs/premium/design-spec.md §4 Group C): on a
 * phone the photograph comes before the leaf (CSS order, same DOM), so the
 * first screen is not all text. "What you need" sits straight after the
 * opening with the page's own line about how the calls happen (it moved
 * there from the circle's first row). The circle's three roles are three
 * typeset columns on a wide screen. A text link in the residents' room
 * opens the film on /how-it-works. The today note (lib/today.ts) sits under
 * the opening's actions, and only the opening's title rises line by line.
 *
 * 2026-11-03 (panel round 2): the opening's lead names the AI-guided
 * interviewer, the iPhone app and the staff-member option, and "Privacy, in
 * short" follows "What you need" (three labels from the policy's short
 * version, a link to /privacy, HIPAA questions sent to the demo).
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { Link } from "react-router-dom";
import { ArrowIcon, PageOpening, Print } from "./kit/kit";
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
import { color, display, font, media, space, type } from "../../styles/theme";

const Know = styled(Chapter)`
  scroll-margin-top: calc(${space.xxxl} + ${space.md});
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(${space.xl}, 6vw, calc(${space.xxxl} + ${space.xxxl} + ${space.sm}));
    align-items: center;
  }
  /* Two prints laid on each other, the smaller over the larger's corner. */
  .pair {
    position: relative;
    padding: 0 0 clamp(${space.xxxl}, 7vw, calc(${space.xxxl} + ${space.xxl})) 0;
  }
  .pair > figure:first-child {
    width: min(86%, 640px);
  }
  .pair > figure:last-child {
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(46%, 340px);
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
    .pair {
      max-width: 640px;
    }
  }
  /* Phone: the room's rhythm tightened so "What you need" costs no extra
     screen (spec §4C target ≤ 7.9 screens at 390). */
  ${media.md} {
    padding: ${space.xxl} 0;
    .row {
      gap: ${space.lg};
    }
    .pair {
      padding-bottom: ${space.xl};
    }
    .pair > figure:first-child {
      width: min(76%, 640px);
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
 * so it takes the same height in either face; the sheet and the print hang
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
  /* On a phone the photograph comes first, so the first screen holds it
     (the kit puts a flipped object back after the words below 861 px). */
  @media (max-width: 860px) {
    section[data-variant][data-flip] .opening-object {
      order: -1;
    }
  }
`;

/* What you need: the one line about how the calls happen, straight after
   the opening (Denise and Priya look for it first). */
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
  .row > p {
    max-width: 56ch;
    padding: ${space.md} 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, var(--ink));
  }
  /* Privacy, in short: the same two columns, the three labels as one
     ruled list, then the line that sends the rest to the demo. */
  .privacy {
    margin-top: clamp(${space.lg}, 3vw, ${space.xl});
  }
  .privacy ul {
    margin: 0;
    padding: ${space.sm} 0;
    list-style: none;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .privacy li {
    padding: ${space.xxs} 0;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--ink);
  }
  .privacy .ask {
    margin-top: ${space.xs};
    max-width: 56ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--muted);
  }
  .privacy .ask a {
    display: inline-block;
    padding: ${space.xxs} 0;
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
  }
  ${media.md} {
    padding: ${space.lg} 0;
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.sm};
    }
    .row > p {
      padding: ${space.sm} 0;
    }
    .privacy ul {
      padding: ${space.xs} 0;
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
const LEAD = `An AI-guided interviewer asks each resident about their life, from ${QUESTION_COUNT} questions, in the A Story iPhone app or together with a staff member. The people caring for them get a way to learn those stories.`;

/* Privacy, in short: three labels quoted word for word from the short
   version of the policy (components/privacy.tsx, PlainSummary), a link to
   the policy, and one line that sends the rest to the demo. It claims
   nothing about HIPAA, a BAA, SOC 2 or residency either way (spec §4C,
   flagged for Daniel). */
const PRIVACY = [
  "We never sell data.",
  "We never train AI on your stories.",
  "You can delete it all.",
] as const;

/* What a care community and A Story settle on the demo, before anyone is
   called (the checklist that used to be the BeginCard). */
const AGREE: [string, string][] = [
  ["Who helps", "With installation, introductions and support, on your side and ours."],
  ["Consent", "Each resident agrees, and who may read or contribute is set with them."],
  ["What stays private", "Which stories stay with the family, and which the care team may read."],
  ["How families are invited", "And when, so the first call is not a surprise to anyone."],
];

export default function Care() {
  const know = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="A Story for care communities"
        path="/care-communities"
        description="Make room for a resident’s own stories and family perspectives. Discuss participation, setup, privacy and a small community program."
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
              <SecondaryAnchor href="#know">How it works</SecondaryAnchor>
            </>
          }
          object={
            <Print
              id="23"
              alt="Two people going through a box of old photographs together"
              sizes="(max-width: 860px) 92vw, 46vw"
              tilt={-1.6}
              caption="Who is that, beside your mother?"
              priority
            />
          }
        />
      </Fit>

      <Need $ground="paper" $tight aria-labelledby="need-title">
        <Frame className="row">
          <h2 id="need-title">What you need</h2>
          <p>
            A Story calls in its iPhone app at an agreed hour (in a private
            beta), or a staff member starts a conversation together with them.
          </p>
        </Frame>
        <Frame className="row privacy">
          <h2 id="privacy-title">Privacy, in short</h2>
          <div>
            <ul aria-labelledby="privacy-title">
              {PRIVACY.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="ask">
              <Link to="/privacy">Read the privacy policy</Link>. Questions
              about consent, staff access or HIPAA? Bring them to the demo.
            </p>
          </div>
        </Frame>
      </Need>

      <Know
        ref={know}
        $ground="ivory"
        id="know"
        aria-labelledby="know-title"
      >
        <Frame className="row">
          <div className="pair" data-rise="settle">
            <Print
              id="13"
              alt="The end of a birthday: candles out, the cake cut, 1991"
              sizes="(max-width: 1024px) 86vw, 36vw"
              tilt={-1.2}
            />
            <Print
              id="29"
              alt="An ordinary morning at home: a man at the kitchen table, 1982"
              sizes="(max-width: 1024px) 46vw, 20vw"
              tilt={2}
            />
          </div>
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
        kind="Senior living or care community"
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

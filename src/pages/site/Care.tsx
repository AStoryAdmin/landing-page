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
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { Link } from "react-router-dom";
import { ArrowIcon, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Actions,
  Chapter,
  Frame,
  PrimaryAnchor,
  SecondaryAnchor,
  Statement,
} from "./kit/kit.styles";
import { QuoteBand, RuledSteps } from "./rooms/Rooms";
import DemoSection from "./kit/DemoSection";
import { color, font, media, type } from "../../styles/theme";

const Know = styled(Chapter)`
  scroll-margin-top: 80px;
  .row {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(40px, 6vw, 140px);
    align-items: center;
  }
  /* Two prints laid on each other, the smaller over the larger's corner. */
  .pair {
    position: relative;
    padding: 0 0 clamp(60px, 7vw, 120px) 0;
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
  .words > p {
    margin: 18px 0 clamp(22px, 2.4vw, 34px);
    max-width: 44ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.lg} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .pair {
      max-width: 640px;
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
  @media (max-width: 640px) {
    ${Actions} > a {
      flex: 1 1 100%;
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
`;

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
          lead="The work they did. The music in the house. The way they made Sunday lunch. Give those stories somewhere to stay, and give the people caring for them a way to learn them."
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
            <Statement id="know-title" $size="lg" data-lines>
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
          </div>
        </Frame>
      </Know>

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
            "A Story calls in its iPhone app at an agreed hour (in a private beta), or a staff member starts a conversation together with them.",
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
              A Story for colleges, libraries and more
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
    </>
  );
}

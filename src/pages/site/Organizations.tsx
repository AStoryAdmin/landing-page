/**
 * Organizations — capture the reason before the person who holds it leaves.
 *
 * "Documents keep the decision. People keep the reason." is the page's whole
 * argument, so it opens alone, without a photograph: the library has no
 * honest image of an institution, and an office stock picture would weaken
 * the line. Three situations follow — institutional history, a retirement,
 * an anniversary — then the decisions to make before any interview.
 */
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { BeforeYouBegin, Situations } from "./kit/Situations";
import { Actions, PrimaryLink, TextLink } from "./kit/kit.styles";

export default function Organizations() {
  return (
    <>
      <EditorialSeo
        title="A Story for organizations — keep the experience behind the record"
        path="/organizations"
        description="Keep firsthand accounts around a retirement, an anniversary or a founding story. Define participants, consent and access before beginning."
      />
      <PageOpening
        eyebrow="For organizations"
        ground="night"
        title={
          <>
            Documents keep the decision. People keep the <em>reason.</em>
          </>
        }
        lead="The decision that changed direction. The colleague who made it work. The knowledge that never reached a handover document."
        actions={
          <>
            <PrimaryLink to="/start?intent=demo">
              Discuss a program <ArrowIcon />
            </PrimaryLink>
            <TextLink to="/guides/knowledge-before-retirement">
              Questions worth asking
            </TextLink>
          </>
        }
      />

      <Situations
        items={[
          {
            eyebrow: "Institutional history",
            title: "The decisions behind the official record.",
            body: (
              <p>
                Put firsthand accounts beside documents and photographs. Keep
                who said what, and when, so a future colleague can understand
                how the institution became what it is.
              </p>
            ),
          },
          {
            eyebrow: "A retirement",
            title: "Before the last day at work.",
            body: (
              <p>
                Make time for the stories behind the procedures. A thoughtful
                conversation keeps the judgment, relationships and experience
                that a list of responsibilities leaves out.
              </p>
            ),
          },
          {
            eyebrow: "An anniversary",
            title: "A shared history. Several versions.",
            body: (
              <p>
                Invite people from different years and roles. Their accounts sit
                together, with names and dates attached. An anniversary volume
                can draw from the archive without becoming the end of it.
              </p>
            ),
          },
        ]}
      />

      <BeforeYouBegin
        title={
          <>
            First, agree what you’re <em>making.</em>
          </>
        }
      >
        <p>
          Choose participants and themes. Define the audience, access and
          consent, and decide how sensitive material will be handled before any
          interview begins.
        </p>
        <p>
          A private working archive and a public anniversary story need
          different decisions. Program pricing is quoted individually.
        </p>
        <Actions>
          <PrimaryLink to="/start?intent=demo">
            Request a demonstration <ArrowIcon />
          </PrimaryLink>
          <TextLink to="/privacy">Privacy &amp; ownership</TextLink>
        </Actions>
      </BeforeYouBegin>
    </>
  );
}

/**
 * Care communities — know the person behind the care record.
 *
 * The reader is a care professional deciding whether this fits their
 * residents and families. The opening names the idea and shows one face
 * (31, the library's strongest portrait: a person, not a patient). Three
 * situations follow — the invitation, the family's part, the arrangements —
 * and the nonclinical scope is stated once, where it answers a decision,
 * rather than repeated as a caution. The closing scene is the one detail
 * that proves the point: a question about how someone makes bread.
 */
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon, PageOpening, Print } from "./kit/kit";
import { BeforeYouBegin, Situations } from "./kit/Situations";
import { Actions, PrimaryLink, TextLink } from "./kit/kit.styles";

export default function Care() {
  return (
    <>
      <EditorialSeo
        title="A Story for care communities"
        path="/care-communities"
        description="Make room for a resident’s own stories and family perspectives. Discuss participation, setup, privacy and a small community program."
      />
      <PageOpening
        eyebrow="For care communities"
        title={
          <>
            Every resident has a life worth <em>knowing.</em>
          </>
        }
        lead="The work they did. The music in the house. The way they made Sunday lunch. Give those stories somewhere to stay — and give the people caring for them a way to learn them."
        actions={
          <>
            <PrimaryLink to="/start?intent=demo">
              Request a demonstration <ArrowIcon />
            </PrimaryLink>
            <TextLink to="/guides/care-community-participation">Planning participation</TextLink>
          </>
        }
        media={
          <Print id="31" alt="A portrait of a woman, 1958" tilt={-1} sizes="(max-width: 860px) 80vw, 36vw" priority />
        }
      />

      <Situations
        items={[
          {
            eyebrow: "An invitation",
            title: "Start with what they want to tell.",
            body: (
              <>
                <p>
                  A familiar photograph, recipe or song can open a conversation.
                  It is an invitation, never a test of what someone remembers.
                </p>
                <p>
                  The resident chooses whether to take part, what to share and
                  when to stop. A Story records personal stories; it is not a
                  clinical assessment or treatment.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Family context",
            title: "Let the family fill in the edges.",
            body: (
              <p>
                Relatives recognise faces, remember names and bring their own
                accounts. Their perspectives sit beside the resident’s words, each
                person clearly attributed — so staff can know the life around the
                record.
              </p>
            ),
          },
          {
            eyebrow: "Before you begin",
            id: "participation",
            title: "Make participation comfortable.",
            body: (
              <p>
                Agree who will help with installation, introductions and ongoing
                support. Discuss consent, who may read or contribute, and which
                material should stay private.
              </p>
            ),
          },
        ]}
      />

      <BeforeYouBegin
        title={
          <>
            “Who taught you to make it <em>that way?”</em>
          </>
        }
        art={<Print id="05" alt="Hands working dough on a floured counter, 1960" tilt={1.2} sizes="(max-width: 860px) 80vw, 40vw" />}
      >
        <p>
          A familiar detail can be enough. Begin with a small program shaped
          around the residents and families who want to take part. Community
          pricing is quoted individually.
        </p>
        <Actions>
          <PrimaryLink to="/start?intent=demo">
            Talk through a program <ArrowIcon />
          </PrimaryLink>
        </Actions>
      </BeforeYouBegin>
    </>
  );
}

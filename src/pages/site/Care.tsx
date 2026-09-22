/**
 * For care communities — rebuilt on the shared audience composition
 * (kit/Audience.tsx, Pass 11g). The message is unchanged from earlier passes:
 * an invitation, never a test of memory; the family fills in the edges; agree
 * consent and support before beginning; pricing quoted individually. A Story
 * records personal stories — it is not a clinical assessment or treatment,
 * and the page says so.
 *
 * Photographs are from the illustrative library. docs/image-prompts.md
 * ("Care communities") has briefs for purpose-made images.
 */
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon } from "./kit/kit";
import { AudiencePage } from "./kit/Audience";
import { PrimaryLink, SecondaryLink } from "./kit/kit.styles";

export default function Care() {
  return (
    <>
      <EditorialSeo
        title="A Story for care communities"
        path="/care-communities"
        description="Make room for a resident’s own stories and family perspectives. Discuss participation, setup, privacy and a small community program."
      />
      <AudiencePage
        eyebrow="For care communities"
        title={
          <>
            Every resident has a life <em>worth knowing.</em>
          </>
        }
        lead="The work they did. The music in the house. The way they made Sunday lunch. Give those stories somewhere to stay — and give the people caring for them a way to learn them."
        actions={
          <>
            <PrimaryLink to="/start?intent=demo">
              Request a demonstration <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/care-communities#begin-title">
              Planning participation
            </SecondaryLink>
          </>
        }
        collage={[
          { photo: "05", alt: "Hands working dough on a floured counter" },
          { photo: "31", alt: "A portrait of a woman, 1958" },
          {
            photo: "23",
            alt: "Two people looking through old photographs together",
          },
        ]}
        momentsTitle={
          <>
            Know the person <em>behind the care.</em>
          </>
        }
        moments={[
          {
            photo: "11",
            alt: "Hands holding playing cards at a kitchen table",
            eyebrow: "An invitation",
            title: "Start with what they want to tell.",
            body: "A familiar photograph, recipe or song can open a conversation. It is an invitation, never a test of what someone remembers — they choose what to share and when to stop.",
          },
          {
            photo: "34",
            alt: "A family comparing photographs and recollections",
            eyebrow: "Family context",
            title: "Let the family fill in the edges.",
            body: "Relatives recognise faces, remember names and bring their own accounts. Each sits beside the resident’s words, clearly attributed.",
          },
          {
            photo: "12",
            alt: "A person on a wall telephone in a hallway",
            eyebrow: "For the team",
            title: "A few lines before the next shift.",
            body: "What they did for a living, who they miss, the song that settles them. The kind of detail that turns care into conversation.",
          },
        ]}
        appShot={{ name: "people" }}
        appTitle={
          <>
            One circle around <em>each resident.</em>
          </>
        }
        steps={[
          [
            "The resident talks, when they like.",
            "A Story calls at an agreed hour, or a staff member starts a conversation together with them.",
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
        statement={
          <>
            “Who taught you to make it <b>that way?”</b>
          </>
        }
        beginEyebrow="Before you begin"
        beginTitle="Make participation comfortable."
        beginBody="Begin with a small program shaped around the residents and families who want to take part. Community pricing is quoted individually. A Story records personal stories; it is not a clinical assessment or treatment."
        checklist={[
          "Who will help with installation, introductions and support",
          "Consent — and who may read or contribute",
          "Which material should stay private",
          "How families are invited, and when",
        ]}
        beginAction={
          <PrimaryLink to="/start?intent=demo">
            Talk through a program <ArrowIcon />
          </PrimaryLink>
        }
      />
    </>
  );
}

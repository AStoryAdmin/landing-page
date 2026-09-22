/**
 * For organizations — rebuilt on the shared audience composition
 * (kit/Audience.tsx, Pass 11g). Same message as before: documents keep the
 * decision, people keep the reason; retirements, institutional history and
 * anniversaries; agree participants, audience, access and consent first;
 * pricing quoted individually.
 *
 * The library has no workplace photographs, so the prints are craft and
 * conversation images standing in; docs/image-prompts.md ("Organizations")
 * has briefs for purpose-made ones.
 */
import EditorialSeo from "../../components/ui/EditorialSeo";
import { ArrowIcon } from "./kit/kit";
import { AudiencePage } from "./kit/Audience";
import { PrimaryLink, SecondaryLink } from "./kit/kit.styles";

export default function Organizations() {
  return (
    <>
      <EditorialSeo
        title="A Story for organizations — keep the experience behind the record"
        path="/organizations"
        description="Keep firsthand accounts around a retirement, an anniversary or a founding story. Define participants, consent and access before beginning."
      />
      <AudiencePage
        eyebrow="For organizations"
        ground="sand"
        title={
          <>
            Documents keep the decision. People keep <em>the reason.</em>
          </>
        }
        lead="The decision that changed direction. The colleague who made it work. The knowledge that never reached a handover document."
        actions={
          <>
            <PrimaryLink to="/start?intent=demo">
              Discuss a program <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/guides">Questions worth asking</SecondaryLink>
          </>
        }
        collage={[
          { photo: "33", alt: "Two adults talking across a kitchen table" },
          { photo: "29", alt: "An ordinary day at home, 1982" },
          { photo: "16", alt: "A road, around 1978" },
        ]}
        momentsTitle={
          <>
            The experience behind <em>the official record.</em>
          </>
        }
        moments={[
          {
            photo: "32",
            alt: "A street and building, around 1970",
            eyebrow: "Institutional history",
            title: "The decisions behind the record.",
            body: "Put firsthand accounts beside documents and photographs. Keep who said what, and when, so a future colleague understands how the place became what it is.",
          },
          {
            photo: "08",
            alt: "A person repairing a fan at a workbench",
            eyebrow: "A retirement",
            title: "Before the last day at work.",
            body: "Make time for the stories behind the procedures — the judgment, relationships and experience a list of responsibilities leaves out.",
          },
          {
            photo: "52",
            alt: "A group of people together",
            eyebrow: "An anniversary",
            title: "A shared history. Several versions.",
            body: "Invite people from different years and roles. Their accounts sit together, with names and dates attached — an anniversary volume can draw from it without ending it.",
          },
        ]}
        appShot={{ name: "archive", scroll: true }}
        appTitle={
          <>
            One archive, <em>many voices.</em>
          </>
        }
        steps={[
          [
            "Choose who takes part.",
            "Retiring colleagues, founders, people from every era of the place.",
          ],
          [
            "A Story does the interviews.",
            "Guided calls that follow up on what people actually say — at the hour each person chooses.",
          ],
          [
            "Keep it, or publish from it.",
            "A private working archive, or an anniversary volume drawn from it.",
          ],
        ]}
        statement={
          <>
            The handover document never says <b>why.</b>
          </>
        }
        beginEyebrow="Before you begin"
        beginTitle="First, agree what you’re making."
        beginBody="A private working archive and a public anniversary story need different decisions. Program pricing is quoted individually."
        checklist={[
          "Participants and themes",
          "The audience — and who has access",
          "Consent, and how sensitive material is handled",
          "Whether anything will be published",
        ]}
        beginAction={
          <PrimaryLink to="/start?intent=demo">
            Request a demonstration <ArrowIcon />
          </PrimaryLink>
        }
      />
    </>
  );
}

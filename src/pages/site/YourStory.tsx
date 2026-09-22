/**
 * Your own story — for people recording their own life, aimed younger
 * (founder, Pass 11g: "lowkey the your own story can target the younger").
 * Mission: A Story "captures the life you're living now and the one behind
 * you … Today is part of it too." So this page is about the twenties and
 * thirties — the first apartment, the friends you'll miss, the years that go
 * fast — recorded while they're still happening.
 *
 * Built on the shared audience composition (kit/Audience.tsx), with the
 * library's contemporary set (41–52). Plan facts come from pricing.ts.
 */
import EditorialSeo from "../../components/ui/EditorialSeo";
import { FREE_TIER } from "../../lib/pricing";
import { ArrowIcon } from "./kit/kit";
import { AudiencePage } from "./kit/Audience";
import { PrimaryLink, SecondaryLink } from "./kit/kit.styles";

export default function YourStory() {
  return (
    <>
      <EditorialSeo
        title="Your own story — record the life you’re living now"
        path="/your-story"
        description="You don’t have to be old to have a story. Talk or write about the life you’re living now — the first apartment, the friends, the years that go fast — and keep it private until you choose."
      />
      <AudiencePage
        eyebrow="Your own story"
        title={
          <>
            You don’t have to be old to have <em>a story.</em>
          </>
        }
        lead="The first apartment. The group of friends. The year everything changed. Keep it while it’s still happening — in your own words, on your own time."
        actions={
          <>
            <PrimaryLink to="/start">
              Start your story <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
          </>
        }
        collage={[
          { photo: "45", alt: "Friends talking late at night" },
          { photo: "42", alt: "A private snapshot" },
          { photo: "44", alt: "Life in a first apartment" },
        ]}
        momentsTitle={
          <>
            The years that go <em>fastest.</em>
          </>
        }
        moments={[
          {
            photo: "46",
            alt: "College roommates in a shared room",
            eyebrow: "The people",
            title: "The friends you’ll miss later.",
            body: "The roommate, the group chat, the one who always drove. Invite them — their version of the night sits beside yours.",
          },
          {
            photo: "48",
            alt: "A first apartment in the early 2000s",
            eyebrow: "The places",
            title: "Every apartment you called home.",
            body: "The one with the broken heater. The one you signed for alone. Photos from your camera roll, and what they don’t show.",
          },
          {
            photo: "49",
            alt: "Friends at a graduation",
            eyebrow: "The turning points",
            title: "The decisions that made you.",
            body: "Why you moved. Why you stayed. What you were afraid of. Future you will want to know what it felt like.",
          },
        ]}
        appShot={{ name: "home", light: true }}
        appTitle={
          <>
            Five minutes, <em>on the walk home.</em>
          </>
        }
        steps={[
          [
            "Talk, or write.",
            "A guided conversation that follows what you say — or just type a memory when you’d rather.",
          ],
          [
            "Add what the camera saw.",
            "Photos, a place, a date. The story behind them is the part only you have.",
          ],
          [
            "Share it, or don’t.",
            "Private until you invite someone. Friends and family can add their own versions.",
          ],
        ]}
        statement={
          <>
            Future you will want to know <b>what this felt like.</b>
          </>
        }
        beginEyebrow="Before you begin"
        beginTitle={FREE_TIER.headline + "."}
        beginBody="Not a trial that runs out. Guided calls are the only paid part — everything else is yours to keep."
        checklist={FREE_TIER.includes.slice(0, 4)}
        beginAction={
          <PrimaryLink to="/start">
            Start your story <ArrowIcon />
          </PrimaryLink>
        }
      />
    </>
  );
}

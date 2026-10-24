import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import CodeFromFamily from "./home/CodeFromFamily";
import OpenBook from "./home/OpenBook";
import Everyday from "./home/Everyday";
import ThreeSteps from "./home/ThreeSteps";
import CallBecomes from "./home/CallBecomes";
import Witnesses from "./home/Witnesses";
import Close from "./home/Close";

/**
 * Phase 2 (2026-10-23): the book on the bench. The home page now lives in
 * the web app's world and says each thing once, in six sections, about
 * seven screens at 1920x1080 (it was seventeen):
 *
 *   1. OpenBook     the family book open on the cloth: three prints on the
 *                   endpaper, the opening line and the two doors on the
 *                   title page, Bond asleep at its foot.
 *   2. Everyday     the photo wall, with the milestones folded into it.
 *   3. ThreeSteps   how it works: you install the app on their iPhone, they
 *                   answer the call in it, the family keeps it (replaces
 *                   StepOne).
 *   4. CallBecomes  one memory in the app, in her words and in the book,
 *                   with the three sample books (replaces Proof,
 *                   FamilyBook and SampleBooks).
 *   5. Witnesses    the family adds what they remember, and the privacy
 *                   promise in /privacy's words (replaces EveryVoice, the
 *                   One-life band and FamilyLoop).
 *   6. Close        the price in one line, the two doors, where to next
 *                   (replaces PriceLadder and the Invitation on Home).
 *
 * Cut from Home: the five-second intro cover (Intro.tsx), "Your story isn't
 * behind you", the founders teaser (Our story is in the menu), Listen (it
 * stays on How it works) and every second statement of the same promise.
 * The direction is docs/PHASE2-DIRECTION-2026-10-23.md.
 */
export default function Home() {
  // Arrivals measure the page; re-measure once fonts and images land.
  useEffect(refreshWhenSettled, []);
  return (
    <>
      <EditorialSeo
        title="A Story - Your Family’s Living Memories"
        path="/"
        description="A Story is an AI biographer that calls your parents and grandparents, asks about their lives, and keeps what they tell in a private book the whole family can add to."
      />
      {/* Only when the address carries a family code (?ref=): the code,
          large, and the three steps to use it. */}
      <CodeFromFamily />
      <OpenBook />
      <Everyday />
      <ThreeSteps />
      <CallBecomes />
      <Witnesses />
      <Close />
    </>
  );
}

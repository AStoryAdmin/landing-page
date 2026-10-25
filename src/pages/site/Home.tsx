import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import { OTHER_PLANS } from "../../lib/pricing";
import { Invitation } from "./kit/kit";
import CodeFromFamily from "./home/CodeFromFamily";
import Hero from "./home/Hero";
import WhatGetsLost from "./home/WhatGetsLost";
import EveryVoice from "./home/EveryVoice";
import FamilyBook from "./home/FamilyBook";
import WhereWeAreGoing from "./kit/WhereWeAreGoing";

const monthly = OTHER_PLANS.find((p) => p.id === "monthly")!;
/** "$19.99/mo" -> "$19.99": the cheapest way in to the calls, said once. */
const monthlyPrice = monthly.price.replace(/\/mo$/, "");

/**
 * Home, 2026-10-24: back to the past version's best (commit bd23f2f), at
 * Bao's ruling - "the home page is much stronger in the past ver. look for
 * the best feature in the last build and integrate here. this web looks too
 * ai" (docs/PHASE2-DIRECTION-2026-10-24-HOME.md). The past compositions,
 * imagery, motion and interactions, inside today's brand (the app's fonts,
 * the chocolate bookcloth with the faint A for the dark rooms) and today's
 * type floor ("i despised the small text everywhere"). Each idea once:
 *
 *   1. Hero          the Sunday-dinner photograph filling the window; "Every
 *                    life holds a story worth keeping."; the two doors and
 *                    the honest small print (iPhone app, private beta).
 *   2. WhatGetsLost  the milestone pile you can touch; "It's the everyday."
 *                    in a scatter of prints on the cloth, with the three
 *                    things that slip away; "A Story exists to catch what
 *                    the photograph can't", with how it works in a sentence.
 *   3. EveryVoice    one memory, the family's versions flying into it, then
 *                    "One life. Many witnesses." on the cloth.
 *   4. FamilyBook    the Hartleys' book (a sample) to open and turn, cover to
 *                    today; the way to the three sample books on /samples.
 *   5. WhereWeAreGoing  the direction in one honest paragraph (Plan 2,
 *                    2026-10-25): a biographer today, the family's memory
 *                    next, opt-in, in real recorded voices.
 *   6. Invitation    the site's close on the cloth, with the one price line.
 *
 * Left out, and why: the intro cover (Intro.tsx; it held the page for five
 * seconds); StepOne (Bao: "horrible"); ThreeSteps (a row of three equal
 * cards, which read generic beside the past rooms - the catch says how it
 * works in one sentence); Proof, Listen and SampleBooks (the memory, the
 * book and the /samples link already show the product once); FamilyLoop
 * (the same idea as EveryVoice); Founders (Our story owns it, and it reused
 * the wedding print); the price ladder (the price is said once, below).
 */
export default function Home() {
  // Arrivals measure the page; re-measure once fonts and images land.
  useEffect(refreshWhenSettled, []);
  return (
    <>
      <EditorialSeo
        title="A Story - Your Family’s Living Memories"
        path="/"
        description="The AI biographer for families: a daily question in a family member’s voice, answered just by talking, and every story kept in their own voice for a printed book."
      />
      {/* Only when the address carries a family code (?ref=): the code,
          large, and the three steps to use it. */}
      <CodeFromFamily />
      <Hero />
      <WhatGetsLost />
      <EveryVoice />
      <FamilyBook />
      <WhereWeAreGoing />
      <Invitation
        title={
          <>
            Start the family’s book <em>today.</em>
          </>
        }
        line={`Free in your browser, with no card: the archive, the writing and the whole family. The calls are from ${monthlyPrice} a month and ring in the A Story app on your parent’s iPhone, now in private beta.`}
      />
    </>
  );
}

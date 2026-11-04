import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import { Link } from "react-router-dom";
import { Invitation } from "./kit/kit";
import CodeFromFamily from "./home/CodeFromFamily";
import Hero from "./home/Hero";
import WhatGetsLost from "./home/WhatGetsLost";
import EveryVoice from "./home/EveryVoice";
import FamilyBook from "./home/FamilyBook";

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
 *   4. FamilyBook    a teaser since 2026-11-04 (phone-first plan): one open
 *                    spread of the Hartleys' sample book and one line; its
 *                    one action is "Open the sample books" -> /samples.
 *   5. Invitation    the site's close on the cloth: the beta in one line and
 *                    "See pricing" (no figure since phone-first fix 1).
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
        description="A Story is an AI biographer that calls your parents and grandparents, asks about their lives, and keeps what they tell in a private book the whole family can add to."
      />
      {/* Only when the address carries a family code (?ref=): the code,
          large, and the three steps to use it. */}
      <CodeFromFamily />
      <Hero />
      <WhatGetsLost />
      <EveryVoice />
      <FamilyBook />
      <Invitation
        /* Phone-first fix 2 (item 12, Tuan #5): "today" left the title, as
           an invite queue cannot keep it. The new title claims no time or
           fact. (The brief called it the kit's closer elsewhere; no kit
           page uses it: kit.tsx CLOSERS / DEFAULT_CLOSER "Ask for an
           iPhone invite." is the fallback if a reviewer prefers that.) */
        title={
          <>
            It starts with <em>one call.</em>
          </>
        }
        /* Phone-first fix 1 (item 5, Maya #1, Harold #6): one price story.
           /pricing says the calls "aren't on sale yet" (Pricing.tsx), so the
           monthly figure left this band; "See pricing" is the way to it.
           Sources: "by invite", AppDoor.tsx:91; "in a private beta",
           lib/today.ts:14; the family, lib/pricing.ts:183. */
        line={
          <>
            The calls ring in the A Story app on your parent’s iPhone, by
            invite in a private beta. Inviting family, writing and reading
            never cost extra. <Link to="/pricing">See pricing</Link>
          </>
        }
      />
    </>
  );
}

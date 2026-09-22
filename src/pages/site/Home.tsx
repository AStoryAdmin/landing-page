import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import { Invitation } from "./kit/kit";
import Intro from "./home/Intro";
import Hero from "./home/Hero";
import WhatGetsLost from "./home/WhatGetsLost";
import ThreeCalls from "./home/ThreeCalls";
import EveryVoice from "./home/EveryVoice";
import FamilyBook from "./home/FamilyBook";
import Founders from "./home/Founders";
import StepOne from "./home/StepOne";
import WhereWeSit from "./home/WhereWeSit";

/**
 * Pass 11. The homepage carries the whole idea once, in the order a visitor
 * needs it: the loss (what gets lost), the proof (three calls in the app —
 * good listening changes the next question), the claim nobody else can copy
 * (one memory, everyone's version), the difference and the object together
 * (one family's archive as a book you can turn, with a page left for today),
 * the one practical answer a buyer needs (you do step one), and where A
 * Story sits among the products a family might compare it with. Mechanics
 * in depth belong to How it works; the FAQ belongs to Questions.
 */
export default function Home() {
  // Pinned scenes measure the page; re-measure once fonts and images land.
  useEffect(refreshWhenSettled, []);
  return (
    <>
      <EditorialSeo
        title="A Story — most of a life goes undocumented"
        path="/"
        description="A Story calls someone you love, listens, follows up, and keeps what they say in a private living archive the whole family can add to."
      />
      <Intro />
      <Hero />
      <WhatGetsLost />
      <ThreeCalls />
      <EveryVoice />
      <FamilyBook />
      <Founders />
      <StepOne />
      <WhereWeSit />
      <Invitation />
    </>
  );
}

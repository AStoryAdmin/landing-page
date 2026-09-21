import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import { Invitation } from "./kit/kit";
import Intro from "./home/Intro";
import Hero from "./home/Hero";
import WhatGetsLost from "./home/WhatGetsLost";
import ThreeCalls from "./home/ThreeCalls";
import EveryVoice from "./home/EveryVoice";
import StillHappening from "./home/StillHappening";
import TheBook from "./home/TheBook";
import StepOne from "./home/StepOne";

/**
 * Pass 11. The homepage carries the whole idea once, in the order a visitor
 * needs it: the loss (what gets lost), the proof (three calls — good
 * listening changes the next question), the claim nobody else can copy
 * (everyone who was in the room), the difference (today is part of it), the
 * object that is not an ending (the book), and the one practical answer a
 * buyer needs (you do step one). Mechanics in depth belong to How it works;
 * the FAQ belongs to Questions.
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
      <StillHappening />
      <TheBook />
      <StepOne />
      <Invitation />
    </>
  );
}

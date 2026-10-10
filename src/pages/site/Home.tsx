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
import EasiestWay from "./home/EasiestWay";
import FoundingBand from "./home/FoundingBand";
import WhereWeSit from "./home/WhereWeSit";

/**
 * Pass 11. The homepage carries the whole idea once, in the order a visitor
 * needs it: the loss (what gets lost), the proof (three calls in the app —
 * good listening changes the next question), the claim nobody else can copy
 * (one memory, everyone's version), the difference and the object together
 * (one family's archive as a book you can turn, with a page left for today),
 * the one practical answer a buyer needs (you do step one), a way in for
 * everyone else in the family (EasiestWay, the app's October features),
 * the founding offer while its 25 places last (FoundingBand), and where A
 * Story sits among the products a family might compare it with. Mechanics
 * in depth belong to How it works; the FAQ belongs to Questions.
 *
 * Reordered 2026-10-09 so a first-time visitor understands what A Story is
 * by the second scroll: the loss, then straight to what you actually do
 * (StepOne, which used to come tenth), then the proof (three calls), the
 * family (EveryVoice, then EasiestWay's way in for each of them), the book,
 * why we started, and the offer after the founders, where trust is highest.
 * MoreWays ("Three more ways in") overlapped EasiestWay here and stays on
 * How it works.
 */
export default function Home() {
  // Pinned scenes measure the page; re-measure once fonts and images land.
  useEffect(refreshWhenSettled, []);
  return (
    <>
      <EditorialSeo
        /* The name, then what it is — the line the app's intro opens on. It
           replaced "A Story — most of a life goes undocumented" (2026-10-05):
           a search result is often the first thing anyone reads about us,
           and it should say what A Story is, not what is lost. */
        title="A Story - Your Family’s Living Memories"
        path="/"
        description="A Story calls a parent or grandparent, asks about their life, and keeps what they tell in a private archive the whole family can add to - and print as a book."
      />
      <Intro />
      <Hero />
      <WhatGetsLost />
      <StepOne />
      <ThreeCalls />
      <EveryVoice />
      <EasiestWay />
      <FamilyBook />
      <Founders />
      <FoundingBand />
      <WhereWeSit />
      <Invitation />
    </>
  );
}

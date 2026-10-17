import { useEffect } from "react";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { refreshWhenSettled } from "../../lib/scrollMotion";
import { Invitation } from "./kit/kit";
import Intro from "./home/Intro";
import Hero from "./home/Hero";
import SampleBooks from "./home/SampleBooks";
import WhatGetsLost from "./home/WhatGetsLost";
import Listen from "./home/Listen";
import EveryVoice from "./home/EveryVoice";
import FamilyBook from "./home/FamilyBook";
import Founders from "./home/Founders";
import StepOne from "./home/StepOne";
import Proof from "./home/Proof";
import FamilyLoop from "./home/FamilyLoop";
import PriceLadder from "./kit/PriceLadder";

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
 *
 * 2026-10-10: the book moved up to straight after StepOne, at the founder's
 * request. "You do step one" says what you do; the book is what it becomes —
 * the living memory, shown as the object — so a visitor sees the result
 * before the proof of how the calls get there.
 *
 * 2026-10-11: SampleBooks ("See a real book") sits straight after the hero -
 * three sample books a visitor can flip through on /samples before reading
 * anything about how they are made.
 *
 * 2026-10-14 (Hallmark redesign, laptop pass): the sample books had been
 * moved up to straight after the hero, ahead of anything explaining what A
 * Story is; they now follow the family book they illustrate. The three-phone
 * call demo became Listen — the same three exchanges set as text, readable
 * at a glance; the full phones stay on How it works.
 *
 * 2026-10-16: three changes from the founder's review. The product is shown
 * rather than described - after Listen, Proof sets down the app's own memory
 * card, the words of a call raw and tidied, and a real spread of the book.
 * The family loop follows EveryVoice as three steps on the app's screens.
 * And the price is said once: FoundingBand and the price line in StepOne
 * and the hero gave way to one ladder (kit/PriceLadder.tsx) after Founders
 * - the archive, the calls, the book - with the founding place and the
 * dollar explained there as early access to the same calls. The startup
 * programs row left the main path; the footer keeps it.
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
      <FamilyBook />
      <SampleBooks />
      <Listen />
      <Proof />
      <EveryVoice />
      <FamilyLoop />
      <Founders />
      <PriceLadder />
      <Invitation />
    </>
  );
}

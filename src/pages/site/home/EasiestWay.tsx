/**
 * "The easiest way for a whole family" — what the app does for each person
 * in a family, said once, right after "You do step one". Added 2026-10-09.
 *
 * StepOne answers the buyer's first worry (is this a project for me?). This
 * answers the next one (will the rest of them actually use it?), by naming
 * the people in a family one at a time — the one who talks, the cousins far
 * away, the aunt with the stories, whoever already typed it up — so every
 * visitor finds the relative they are thinking of and a way in for them.
 *
 * Every line is the app as of review-fixes 21f0365 (2026-10-09), in the
 * app's own words where it has them. If the app changes, change it here:
 *
 *   first conversation  lib/firstCall.js — 10 minutes, once, on us
 *   group calls         ea333a1 — up to four phones, ringing several people
 *   about the teller    content/questions.csv `about` column; credited to them
 *   memoir import       lib/memoir.js, ImportScreen.js — Word and text today;
 *                       PDFs wait on /api/import/read, so they are not named
 *   family codes        HaveACodeRow.js — six characters, any email
 *   person page         PersonScreen.js — Details, Family, Memories, Sources;
 *                       editors change, everyone else suggests
 *   writing companion   createMemory/WriteHelper.js — "Tidy my words"
 *   saving              unsaved work kept on the phone, retried every 30s
 *
 * `fresh` marks what arrived in October, so a returning visitor sees what
 * changed. Take the mark off once it is no longer news.
 */
import styled from "styled-components";
import { useReveals } from "../kit/reveals";
import AppTour, { type TourStop } from "../kit/AppTour";
import { Chapter, Eyebrow, Frame, Lead, Statement, TextLink } from "../kit/kit.styles";
import { color, font, media } from "../../../styles/theme";

const Section = styled(Chapter)`
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: clamp(24px, 4vw, 72px);
    align-items: end;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: calc(clamp(22px, 2.6vw, 44px) * var(--sy)) clamp(20px, 2.6vw, 40px);
    margin: calc(clamp(36px, 4.4vw, 72px) * var(--sy)) 0 0;
    padding: 0;
    list-style: none;
  }
  .grid li {
    padding-top: 16px;
    border-top: 1px solid var(--line, ${color.primaryLine});
  }
  .k {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--label, ${color.accentText});
  }
  .new {
    padding: 4px 8px 3px;
    border-radius: 999px;
    background: ${color.teal};
    color: ${color.ivory};
    font: 600 10px/1 ${font.body};
    letter-spacing: 0.16em;
  }
  h3 {
    margin-top: 10px;
    font: 400 clamp(1.15rem, 1rem + 0.5vw, 1.45rem) / 1.25 ${font.display};
    letter-spacing: -0.012em;
    color: var(--ink, ${color.primary});
    text-wrap: balance;
  }
  .grid p.d {
    margin-top: 8px;
    font: 400 15px/1.58 ${font.body};
    color: var(--muted, ${color.bodyMuted});
  }
  .grid q {
    font-style: italic;
    color: var(--ink, ${color.primary});
  }
  .more {
    margin-top: calc(clamp(28px, 3.4vw, 52px) * var(--sy));
  }
  ${media.lg} {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.md} {
    .head {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

type Way = { k: string; t: string; d: React.ReactNode; fresh?: boolean };

/* 2026-10-14: three of the eight (the cousins, joining, the family tree)
   said again what the screens above already show; they were cut here so
   the section fits a laptop window. Their facts stay in TOUR. */
const WAYS: Way[] = [
  {
    k: "The one telling it",
    t: "They just talk.",
    d: "No typing, nothing to learn, nothing to save. A Story rings at the hour you choose and follows up like someone who knows them. The first conversation is on us: ten minutes, no card.",
  },
  {
    k: "Everyone who knows them",
    t: "Tell your part of the story.",
    fresh: true,
    d: (
      <>
        Aunts, cousins and old friends get questions turned around for them - <q>Which story about Rose gets told
        again and again?</q> What they add is credited to them, beside hers.
      </>
    ),
  },
  {
    k: "Whoever wrote it down",
    t: "Bring in the memoir.",
    fresh: true,
    d: (
      <>
        Already typed up forty pages? Add the Word or text file and each chapter becomes a memory, marked{" "}
        <q>From Rose’s memoir</q>. Nothing written down is ever typed twice.
      </>
    ),
  },
  {
    k: "When you’d rather write",
    t: "A companion beside you.",
    fresh: true,
    d: "Stuck on a blank page? A Story offers a question to answer out loud, tidies spelling and full stops while your words stay yours, and suggests a title. One tap keeps a memory private.",
  },
  {
    k: "Bad signal",
    t: "Nothing gets lost.",
    fresh: true,
    d: "If the connection drops mid-sentence, what you wrote stays on the phone and saves itself the moment it can.",
  },
];

/* The four newest, on the app's own screens (kit/AppTour.tsx). The tree
   leads: it is the one people look for first, and on a phone the first
   screen is the only one visible before swiping. family-tree.webp is the
   app's full-screen tree zoomed out, so all four generations show. */
const TOUR: TourStop[] = [
  {
    shot: "family-tree",
    k: "The family tree",
    t: "Four generations on one tree.",
    d: "Rose, her parents, her children and her granddaughter. Tap anyone to add or fix them.",
  },
  {
    shot: "group-call",
    dark: true,
    k: "Group calls",
    t: "Call the family together.",
    d: "Up to four phones at once. Everyone talks; A Story listens and turns what’s said into memories.",
  },
  {
    shot: "person",
    k: "A page for each person",
    t: "A life at a glance.",
    d: "Born, grew up, schools, work - built from what the family has written down.",
    dark: true,
    scroll: true,
  },
  {
    shot: "invite",
    k: "Family codes",
    t: "Six letters, and they’re in.",
    d: "Send the code by text. Up to ten people can join with it.",
  },
];

export default function EasiestWay() {
  const reveal = useReveals<HTMLElement>();
  return (
    <Section ref={reveal} $ground="paper" aria-labelledby="easiest-title">
      <Frame>
        <div className="head">
          <div>
            <Eyebrow>New in A Story</Eyebrow>
            <Statement id="easiest-title" $size="lg" data-lines>
              The easiest way for a whole family to <em>keep its stories.</em>
            </Statement>
          </div>
          <Lead>
            Every family has one who talks, one who types, one far away and one with the shoebox. A Story has a way
            in for each of them - and none of them has to be good with phones.
          </Lead>
        </div>
        <AppTour stops={TOUR} />
        <ul className="grid">
          {WAYS.map((w) => (
            <li key={w.t} data-rise>
              <p className="k">
                {w.k}
                {w.fresh && <span className="new">New</span>}
              </p>
              <h3>{w.t}</h3>
              <p className="d">{w.d}</p>
            </li>
          ))}
        </ul>
        <p className="more">
          <TextLink to="/how-it-works">See how it works</TextLink>
        </p>
      </Frame>
    </Section>
  );
}

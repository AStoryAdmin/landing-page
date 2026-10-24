/**
 * Your own story - for people recording their own life, aimed younger
 * (founder, Pass 11g: "lowkey the your own story can target the younger").
 * Mission: A Story "captures the life you're living now and the one behind
 * you … Today is part of it too." So this page is about the twenties and
 * thirties - the first apartment, the friends you'll miss, the years that go
 * fast - recorded while they're still happening.
 *
 * Fix round 2 (2026-10-23, jury 1 #5 #9 #10): no longer the shared audience
 * template. It opens on the cloth with three snapshots laid down beside the
 * words, then the years that go fastest as a wall of prints (each at its own
 * size, never upscaled), then how it works beside the line to remember, and
 * what Free includes. The library's contemporary set (41-52); plan facts
 * come from pricing.ts.
 *
 * Fix round 3 (2026-10-24, jury 1 R2 #7): Care and this page shared one
 * mirrored template - a band of a big quote beside ruled rows, then a
 * "free + ticked checklist" section. Care keeps those. This page now closes
 * on its own room: on the teal of the conversation, what a memory from these
 * years looks like once it is kept - the app's own memory card (a labelled
 * sample) - beside the three ways in, and what Free covers in one line. The
 * site's closing Invitation follows with the one action.
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { FREE_TIER } from "../../lib/pricing";
import MemoryCard from "./app/MemoryCard";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { PhonePairs } from "./rooms/phonePairs";
import {
  Chapter,
  Frame,
  PrimaryLink,
  SecondaryLink,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { START_HREF, START_LABEL } from "../../lib/app";
import { color, display, font, media } from "../../styles/theme";

/* The opening's object: three snapshots dropped on the cloth. */
const Snaps = styled.div`
  position: relative;
  width: min(100%, 720px);
  aspect-ratio: 6 / 5;
  > figure {
    position: absolute;
  }
  > figure:nth-child(1) {
    left: 0;
    top: 4%;
    width: 58%;
    z-index: 1;
  }
  > figure:nth-child(2) {
    right: 0;
    top: 0;
    width: 36%;
    z-index: 2;
  }
  > figure:nth-child(3) {
    right: 8%;
    bottom: 0;
    width: 50%;
    z-index: 3;
  }
  ${media.md} {
    aspect-ratio: 5 / 4;
  }
`;

const Wall = styled(Chapter)`
  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(28px, 3.4vw, 72px);
    margin: calc(clamp(32px, 4vw, 64px) * var(--sy)) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    align-content: start;
    min-width: 0;
  }
  /* The prints drop a little out of line, the way a wall of them hangs. */
  li:nth-child(2) {
    margin-top: clamp(20px, 3vw, 56px);
  }
  li > figure {
    max-width: 560px;
  }
  small {
    display: block;
    margin-top: 22px;
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  h3 {
    margin-top: 10px;
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 8px;
    max-width: 40ch;
    font: 400 clamp(1.02rem, 0.98rem + 0.2vw, 1.2rem) / 1.55 ${font.text};
    color: ${color.body};
  }
  ${media.md} {
    ul {
      grid-template-columns: minmax(0, 1fr);
    }
    li:nth-child(2) {
      margin-top: 0;
    }
  }
`;

/*
 * Kept: what one of these years looks like in the app. The card is the
 * app's (app/MemoryCard.tsx), filled with a sample memory and said to be a
 * sample; the photograph is library S07, used nowhere else on the site.
 */
const Kept = styled(Chapter)`
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(40px, 6vw, 140px);
    align-items: center;
    margin-top: calc(clamp(32px, 4vw, 64px) * var(--sy));
  }
  /* Two lines at every width (taste-skill headline rule). */
  h2 {
    max-width: 27ch;
  }
  ${media.sm} {
    h2 {
      font-size: 1.85rem;
    }
  }
  /* The print the memory was made from, and the card the app keeps for it,
     laid over the print's corner. */
  .stack {
    position: relative;
    padding-bottom: clamp(90px, 9vw, 180px);
  }
  .stack > figure {
    width: min(80%, 720px);
  }
  .card {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: min(76%, 600px);
    transform: rotate(-0.8deg);
    box-shadow: 0 40px 70px -40px rgba(0, 0, 0, 0.7);
  }
  .note {
    margin-top: 18px;
    font: 400 14px/1.5 ${font.ui};
    color: var(--muted);
  }
  ol {
    display: grid;
    gap: clamp(24px, 2.6vw, 40px);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h3 {
    font: 500 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  ol p {
    margin-top: 8px;
    max-width: 40ch;
    font: 400 clamp(1.02rem, 0.98rem + 0.2vw, 1.2rem) / 1.55 ${font.text};
    color: var(--text);
  }
  .free {
    margin-top: clamp(28px, 3vw, 44px);
    padding-top: 22px;
    border-top: 1px solid var(--line);
    max-width: 46ch;
    font: 400 clamp(1.02rem, 0.98rem + 0.2vw, 1.2rem) / 1.55 ${font.text};
    color: var(--text);
  }
  .free b {
    font-weight: 500;
    color: var(--ink);
  }
  .free a {
    margin-top: 6px;
  }
  ${media.lg} {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .stack {
      max-width: 720px;
    }
  }
  ${media.sm} {
    .stack {
      padding-bottom: 0;
    }
    .stack > figure {
      width: 92%;
    }
    .card {
      position: relative;
      width: 100%;
      margin-top: -36px;
    }
  }
  ${media.motion} {
    .card {
      transform: none;
    }
  }
`;

const WAYS: [string, string][] = [
  [
    "Talk, or write.",
    "A guided conversation in the A Story app that follows what you say, or type a memory when you’d rather.",
  ],
  [
    "Add what the camera saw.",
    "Photos, a place, a date. The story behind them is the part only you have.",
  ],
  [
    "Share it, or don’t.",
    "Private until you invite someone. Friends and family can add their own versions.",
  ],
];

const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

function KeptRoom() {
  const ref = useReveals<HTMLElement>();
  return (
    <Kept ref={ref} $ground="teal" aria-labelledby="kept-title">
      <Frame>
        <Statement id="kept-title" $size="lg" data-lines>
          Future you will want to know <em>what this felt like.</em>
        </Statement>
        <div className="row">
          <div data-rise="settle">
            <div className="stack">
              <Print
                id="S07"
                alt="Three friends at the rail of a ferry, crossing on a grey summer day"
                ratio="4 / 3"
                tilt={-1.4}
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, 34vw"
              />
              <MemoryCard
              className="card"
              memory={{
                photo: "/mission/S07-640.webp",
                chapter: "Growing up",
                title: "The ferry, the last summer",
                date: "August 2023 · at 27",
                words:
                  "Sam stood at the rail the whole way over and said he’d never leave the coast. He was the first one of us to go.",
                people: ["Maya", "Sam", "Leah"],
                teller: "Maya",
              }}
              />
            </div>
            <p className="note">A sample memory, as the app keeps it.</p>
          </div>
          <div>
            <ol>
              {WAYS.map(([t, d]) => (
                <li key={t} data-rise>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
            <p className="free" data-rise>
              <b>{FREE_TIER.headline}:</b> {lower(FREE_TIER.includes[1])},{" "}
              {lower(FREE_TIER.includes[2])} and the whole family invited.
              Guided calls are the only paid part.
              <br />
              <TextLink to="/pricing">
                What Free includes <ArrowIcon />
              </TextLink>
            </p>
          </div>
        </div>
      </Frame>
    </Kept>
  );
}

const YEARS = [
  {
    photo: "46",
    alt: "College roommates in a shared room",
    k: "The people",
    t: "The friends you’ll miss later.",
    d: "The roommate, the group chat, the one who always drove. Invite them, and their version of the night sits beside yours.",
  },
  {
    photo: "48",
    alt: "A first apartment in the early 2000s",
    k: "The places",
    t: "Every apartment you called home.",
    d: "The one with the broken heater. The one you signed for alone. Photos from your camera roll, and what they don’t show.",
  },
  {
    photo: "49",
    alt: "Friends at a graduation",
    k: "The turning points",
    t: "The decisions that made you.",
    d: "Why you moved. Why you stayed. What you were afraid of. Future you will want to know what it felt like.",
  },
];

export default function YourStory() {
  const wall = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Your own story - record the life you’re living now"
        path="/your-story"
        description="You don’t have to be old to have a story. Talk or write about the life you’re living now - the first apartment, the friends - and keep it private."
      />
      <PhonePairs>
        <PageOpening
          title={
            <>
              You don’t have to be old to have <em>a story.</em>
            </>
          }
          lead="The first apartment. The group of friends. The year everything changed. Keep it while it’s still happening, in your own words, on your own time."
          actions={
            <>
              <PrimaryLink to={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryLink>
              <SecondaryLink to="/how-it-works">See how it works</SecondaryLink>
            </>
          }
          object={
            <Snaps>
              <Print
                id="45"
                alt="Friends talking late at night on a living-room floor"
                sizes="(max-width: 860px) 56vw, 26vw"
                tilt={-2.2}
                priority
              />
              <Print
                id="42"
                alt="A private snapshot: two friends taking a selfie"
                sizes="(max-width: 860px) 36vw, 16vw"
                tilt={2.6}
              />
              <Print
                id="44"
                alt="Building furniture in a first apartment"
                sizes="(max-width: 860px) 48vw, 23vw"
                tilt={-0.8}
                caption="The first place, 2024"
              />
            </Snaps>
          }
        />
      </PhonePairs>

      <Wall ref={wall} $ground="ivory" aria-labelledby="years-title">
        <Frame>
          <Statement id="years-title" $size="lg" data-lines>
            The years that go <em>fastest.</em>
          </Statement>
          <ul>
            {YEARS.map((y, i) => (
              <li key={y.photo} data-rise>
                <Print
                  id={y.photo}
                  alt={y.alt}
                  ratio="4 / 3"
                  tilt={[-1.1, 0.9, -0.6][i]}
                  sizes="(max-width: 860px) 92vw, 30vw"
                />
                <small>{y.k}</small>
                <h3>{y.t}</h3>
                <p>{y.d}</p>
              </li>
            ))}
          </ul>
        </Frame>
      </Wall>

      <KeptRoom />

      <Invitation />
    </>
  );
}

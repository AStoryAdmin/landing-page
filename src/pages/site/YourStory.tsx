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
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { FREE_TIER } from "../../lib/pricing";
import { ArrowIcon, Invitation, PageOpening, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Frame,
  PrimaryLink,
  SecondaryLink,
  Statement,
} from "./kit/kit.styles";
import { BeginCard, QuoteBand } from "./rooms/Rooms";
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

      <QuoteBand
        quote={
          <>
            Future you will want to know <b>what this felt like.</b>
          </>
        }
        title="Five minutes, on the walk home"
        ground="teal"
        flip
        steps={[
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
        ]}
      />

      <BeginCard
        id="begin-title"
        title={FREE_TIER.headline + "."}
        body="Guided calls are the only paid part. Everything else is yours to keep, for as long as you like."
        checklist={FREE_TIER.includes.slice(0, 4)}
        action={
          <PrimaryLink to={START_HREF}>
            {START_LABEL} <ArrowIcon />
          </PrimaryLink>
        }
      />

      <Invitation />
    </>
  );
}

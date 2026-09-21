/**
 * Site kit components. See kit.styles.ts for the rules they follow.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { mission } from "../../../lib/mission";
import { gsap, useScene } from "../../../lib/scrollMotion";
import { useReveals } from "./reveals";
import { color, display, font, media } from "../../../styles/theme";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  PrimaryLink,
  PrintMat,
  Title,
  onDarkActions,
  type Ground,
} from "./kit.styles";

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * A bare responsive `<img>` from the mission library. Scenes crop, mask and
 * scale it themselves. Openings may crop (assetRegistry `cropMode`);
 * everywhere else leave `object-fit` alone and the proportion stays natural.
 */
export function Picture({
  id,
  alt,
  sizes,
  priority = false,
  className,
}: {
  id: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const dim = mission[id];
  const widths = [640, 1200, 1800]
    .map((file) => ({ file, width: Math.min(file, dim.width) }))
    .filter((x, i, a) => a.findIndex((y) => y.width === x.width) === i);
  return (
    <img
      className={className}
      src={`/mission/${id}-1200.webp`}
      srcSet={widths
        .map((x) => `/mission/${id}-${x.file}.webp ${x.width}w`)
        .join(", ")}
      sizes={sizes}
      width={dim.width}
      height={dim.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

/** 01–19 and 27–32 are the archival set (film, prints); everything else is contemporary. */
const isArchival = (id: string) => {
  const n = Number(id);
  return n < 20 || (n >= 27 && n <= 32);
};

/**
 * A photograph as a print. Archival images (before 2000) get the ivory mat;
 * contemporary ones are shown bare, as the brief asks. A caption appears only
 * when it says something the photograph cannot — never "illustrative photo".
 */
export function Print({
  id,
  alt,
  sizes,
  caption,
  tilt,
  priority,
  className,
}: {
  id: string;
  alt: string;
  sizes: string;
  caption?: ReactNode;
  tilt?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <PrintMat $bare={!isArchival(id)} $tilt={tilt} className={className}>
      <div className="print-window">
        <Picture id={id} alt={alt} sizes={sizes} priority={priority} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </PrintMat>
  );
}

const Opening = styled(Chapter)`
  padding: clamp(72px, 9vw, 150px) 0 clamp(72px, 8vw, 130px);
  .opening-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(36px, 6vw, 110px);
    align-items: center;
  }
  .opening-grid.solo {
    grid-template-columns: minmax(0, 1fr);
  }
  .opening-grid.solo h1 {
    max-width: 18ch;
  }
  .opening-lead {
    margin-top: clamp(22px, 2.4vw, 34px);
    font: 400 clamp(1.15rem, 1.02rem + 0.45vw, 1.4rem) / 1.55 ${font.body};
    color: var(--muted);
    max-width: 42ch;
  }
  &[data-ground="night"],
  &[data-ground="teal"] {
    ${onDarkActions};
  }
  ${media.md} {
    .opening-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/**
 * Every secondary route opens the same way, so the site reads as one
 * publication: an eyebrow naming the room, a serif title, one paragraph,
 * at most two actions — and, where it earns its place, one image.
 */
export function PageOpening({
  eyebrow,
  title,
  lead,
  actions,
  media: art,
  ground = "ivory",
  labelledBy = "page-title",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  ground?: Ground;
  labelledBy?: string;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Opening ref={ref} $ground={ground} data-ground={ground} aria-labelledby={labelledBy}>
      <Frame className={`opening-grid ${art ? "" : "solo"}`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title id={labelledBy} data-lines>
            {title}
          </Title>
          {lead && (
            <p className="opening-lead" data-rise>
              {lead}
            </p>
          )}
          {actions && <Actions data-rise>{actions}</Actions>}
        </div>
        {art && <div data-rise>{art}</div>}
      </Frame>
    </Opening>
  );
}



const Band = styled.section`
  background: ${color.accentHover};
  color: ${color.ivory};
  padding: clamp(72px, 8vw, 128px) 0 clamp(56px, 6vw, 96px);
  overflow: hidden;
  .marquee {
    display: flex;
    width: max-content;
    font: 400 ${display.xl} / 1.05 ${font.display};
    letter-spacing: -0.025em;
    white-space: nowrap;
  }
  .marquee span {
    padding-right: 0.45em;
  }
  .marquee i {
    font-style: italic;
    color: ${color.gold};
    padding-right: 0.45em;
  }
  .band-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px;
    align-items: end;
    margin-top: clamp(40px, 5vw, 80px);
    padding-top: 24px;
    border-top: 1px solid color-mix(in srgb, ${color.ivory} 30%, transparent);
  }
  .band-row p {
    font: 400 19px/1.55 ${font.body};
    max-width: 44ch;
  }
  ${onDarkActions};
  ${media.md} {
    .band-row {
      grid-template-columns: 1fr;
    }
  }
`;

const LINE = (
  <>
    <span>The best day to begin</span>
    <i>is an ordinary one.</i>
  </>
);

/**
 * The one closing invitation, used at the foot of every narrative route so
 * the last thing on any page is the same next step. The deep terracotta is
 * the brand terracotta's derived tone: ivory body text on the exact swatch
 * falls just under 4.5:1.
 */
export function Invitation({
  line = "One conversation to begin. Then a record the whole family can keep adding to.",
}: {
  line?: string;
}) {
  const ref = useScene<HTMLElement>(() => {
    const drift = gsap.to(".marquee", { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
    gsap.to(drift, {
      timeScale: 3,
      ease: "none",
      scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  return (
    <Band ref={ref} aria-labelledby="invitation-title">
      <h2 id="invitation-title" className="sr-only">
        The best day to begin is an ordinary one.
      </h2>
      <div className="marquee" aria-hidden="true">
        {LINE}
        {LINE}
        {LINE}
        {LINE}
      </div>
      <Frame className="band-row">
        <p>{line}</p>
        <PrimaryLink to="/start">
          Join the waitlist <ArrowIcon />
        </PrimaryLink>
      </Frame>
    </Band>
  );
}

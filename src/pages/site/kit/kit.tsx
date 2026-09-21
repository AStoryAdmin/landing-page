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

/** 01–19, 27–32, H02 and H03 are the archival set (film, prints). */
const isArchival = (id: string) => {
  if (id === "H02" || id === "H03") return true;
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
    <Opening
      ref={ref}
      $ground={ground}
      data-ground={ground}
      aria-labelledby={labelledBy}
    >
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
  position: relative;
  z-index: 1;
  background: ${color.sand};
  color: ${color.primary};
  padding: clamp(40px, 5vw, 88px) 0 clamp(56px, 6vw, 96px);
  /* The app's sand panel rises with a curved top, as on its closing screen. */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: clamp(40px, 6vw, 96px);
    transform: translateY(-99%);
    background: ${color.sand};
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  }
  .marquee-clip {
    overflow: hidden;
    padding-bottom: 0.12em;
  }
  .marquee {
    display: flex;
    width: max-content;
    font: 400 ${display.md} / 1.15 ${font.display};
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .marquee span {
    padding-right: 0.4em;
  }
  .marquee b {
    font-weight: 500;
    color: ${color.accent};
    padding-right: 0.4em;
  }
  .band-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px;
    align-items: end;
    margin-top: clamp(36px, 4.5vw, 72px);
    padding-top: 24px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .band-row p {
    font: 400 ${display.sm} / 1.35 ${font.display};
    max-width: 34ch;
  }
  ${media.md} {
    .band-row {
      grid-template-columns: 1fr;
    }
  }
`;

/** From the app's closing mission screen (CM09). */
const LINE = (
  <>
    <span>The story</span>
    <b>keeps going.</b>
    <span>Because so do you.</span>
    <span aria-hidden="true">·</span>
  </>
);

/**
 * The one closing invitation, at the foot of every narrative route: the app's
 * own closing screen (mission CM09) — a sand panel rising on a curve,
 * chocolate type, one word in terracotta. Sand sits softly against the
 * chocolate footer; the saturated brass band of Pass 11b did not.
 */
export function Invitation({
  line = "One conversation to begin. The whole family keeps adding to it.",
}: {
  line?: string;
}) {
  // A slow, steady drift — no scroll-linked speed-up (it made the founder dizzy).
  const ref = useScene<HTMLElement>(() => {
    gsap.to(".marquee", {
      xPercent: -50,
      ease: "none",
      duration: 110,
      repeat: -1,
    });
  });
  return (
    <Band ref={ref} aria-labelledby="invitation-title">
      <h2 id="invitation-title" className="sr-only">
        The story keeps going. Because so do you.
      </h2>
      <div className="marquee-clip" aria-hidden="true">
        <div className="marquee">
          {LINE}
          {LINE}
          {LINE}
          {LINE}
        </div>
      </div>
      <Frame className="band-row">
        <p>{line}</p>
        <PrimaryLink to="/start">
          Begin your story <ArrowIcon />
        </PrimaryLink>
      </Frame>
    </Band>
  );
}

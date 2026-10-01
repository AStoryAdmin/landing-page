/**
 * Site kit components. See kit.styles.ts for the rules they follow.
 */
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mission } from "../../../lib/mission";
import { useReveals } from "./reveals";
import { color, display, font, media, motion } from "../../../styles/theme";
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
    <PrintMat
      $bare={!isArchival(id)}
      $tilt={tilt}
      className={className}
      data-bare={!isArchival(id) || undefined}
    >
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
  /*
   * 18ch broke a twelve-word title into four narrow lines, which is a size
   * error dressed as a measure. A page title gets two or three.
   */
  .opening-grid.solo h1 {
    max-width: 28ch;
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
  .band-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
    gap: clamp(36px, 5vw, 92px);
    align-items: start;
  }
  .band-row h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
    max-width: 22ch;
    text-wrap: balance;
  }
  .band-row h2 em {
    font-style: normal;
    font-weight: 500;
    color: ${color.accent};
  }
  .band-row > div > p {
    margin-top: 14px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 40ch;
  }
  /* Where to go next: the three rooms this reader has not been in. */
  .next {
    display: grid;
  }
  .next-label {
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${color.accentText};
    padding-bottom: 14px;
  }
  .next a {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 20px;
    padding: 17px 0;
    border-top: 1px solid ${color.primaryLineStrong};
    text-decoration: none;
    color: inherit;
  }
  .next a:last-child {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  .next b {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
    transition: color ${motion.base};
  }
  .next span {
    display: block;
    margin-top: 3px;
    font: 400 15px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .next svg {
    width: 18px;
    height: 18px;
    color: ${color.accentText};
    transition: transform ${motion.base};
  }
  @media (hover: hover) and (pointer: fine) {
    .next a:hover b {
      color: ${color.accent};
    }
    .next a:hover svg {
      transform: translateX(5px);
    }
  }
  ${media.md} {
    .band-row {
      grid-template-columns: 1fr;
    }
  }
`;

/** From the app's closing mission screen (CM09). */

/**
 * Where a reader can go from here. The closing band used to run the app's
 * mission line as an endless marquee; the founder asked for a way onward
 * instead, so it now offers the one action and the three rooms this reader
 * has not been in — the current route filters itself out.
 */
const ROOMS = [
  {
    to: "/how-it-works",
    title: "How it works",
    hint: "The call, the card, the book.",
  },
  {
    to: "/for-families",
    title: "For families",
    hint: "Giving it, and using it together.",
  },
  {
    to: "/pricing",
    title: "Pricing",
    hint: "Everyone starts free. Only calls are paid for.",
  },
  {
    to: "/compare",
    title: "How A Story is different",
    hint: "Beside the products you may be comparing.",
  },
  {
    to: "/questions",
    title: "Questions & answers",
    hint: "The practical things, answered plainly.",
  },
  {
    to: "/our-story",
    title: "Our story",
    hint: "Why we started, in our own words.",
  },
];

/**
 * The one closing invitation, at the foot of every narrative route: the app's
 * sand panel rising on a curve, chocolate type, one word in terracotta.
 */
export function Invitation({
  line = "One conversation to begin. The whole family keeps adding to it.",
}: {
  line?: string;
}) {
  const { pathname } = useLocation();
  const rooms = ROOMS.filter((r) => r.to !== pathname).slice(0, 3);
  return (
    <Band aria-labelledby="invitation-title">
      <Frame className="band-row">
        <div>
          <h2 id="invitation-title">
            The story <em>keeps going.</em> Because so do you.
          </h2>
          <p>{line}</p>
          <Actions>
            <PrimaryLink to="/reserve">
              Reserve for $1 <ArrowIcon />
            </PrimaryLink>
          </Actions>
        </div>
        <nav className="next" aria-label="Where to go next">
          <p className="next-label">Where to next</p>
          {rooms.map((r) => (
            <Link key={r.to} to={r.to}>
              <span>
                <b>{r.title}</b>
                <span>{r.hint}</span>
              </span>
              <ArrowIcon />
            </Link>
          ))}
        </nav>
      </Frame>
    </Band>
  );
}

/**
 * Site kit components. See kit.styles.ts for the rules they follow.
 */

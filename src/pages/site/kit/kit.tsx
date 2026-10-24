/**
 * Site kit components (phase 2, 2026-10-23). See kit.styles.ts for the
 * rules they follow and the quick usage list.
 *
 * NEW IN PHASE 2
 *   <Print id alt sizes tilt caption bare>  white border, black photo corners, Caveat caption
 *   <PhotoCorners/>                          the four corners, for a custom print inside .print-face
 *   <Bond pose ledge width phone>            the founder's dog lying on a ledge; never blocks a click
 *   <PageOpening ground>                     now opens on the chocolate cloth by default
 *   <Invitation title line>                  the cloth close + Where to next; the line varies by page
 */
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mission } from "../../../lib/mission";
import { useReveals } from "./reveals";
import { display, font, media, motion } from "../../../styles/theme";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  PrimaryAnchor,
  PrintMat,
  Title,
  onDarkActions,
  type Ground,
} from "./kit.styles";
import { START_HREF, START_LABEL } from "../../../lib/app";

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

/**
 * A photograph as a print, the way the app mounts them (2026-10-23): a
 * white border, four black-paper photo corners, the turn you give it
 * (`tilt`, in degrees; -2 to 2 reads as laid down by hand), and a
 * handwritten Caveat caption under it. A caption appears only when it says
 * something the photograph cannot: a name, a place, a year.
 *
 *   <Print id="12" alt="A person on a wall telephone, around 1981"
 *          sizes="(max-width: 860px) 80vw, 36vw" tilt={-1.5}
 *          caption="The hall phone, 1981" />
 *
 * `bare` shows the photograph alone (no border, no corners), for a picture
 * that is not an object on the table.
 */
export function Print({
  id,
  alt,
  sizes,
  caption,
  tilt,
  priority,
  bare = false,
  className,
}: {
  id: string;
  alt: string;
  sizes: string;
  caption?: ReactNode;
  tilt?: number;
  priority?: boolean;
  bare?: boolean;
  className?: string;
}) {
  return (
    <PrintMat
      $bare={bare}
      $tilt={tilt}
      className={className}
      data-bare={bare || undefined}
    >
      <div className="print-face">
        {!bare && <PhotoCorners />}
        <div className="print-window">
          <Picture id={id} alt={alt} sizes={sizes} priority={priority} />
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </PrintMat>
  );
}

/** The four black-paper corners. Inside a PrintMat's `.print-face`. */
export function PhotoCorners() {
  return (
    <>
      <span className="pc tl" aria-hidden="true" />
      <span className="pc tr" aria-hidden="true" />
      <span className="pc bl" aria-hidden="true" />
      <span className="pc br" aria-hidden="true" />
    </>
  );
}

/**
 * Bond, the founder's dog (web-app/docs/mascot/BOND.md), drawn in the app's
 * soft watercolour. He appears once or twice on the site, lying on a ledge,
 * and never blocks a click: pointer-events are off and he is hidden from
 * assistive tech.
 *
 *   // on an edge: put him inside the element whose top edge is the ledge
 *   <div style={{ position: "relative" }}>
 *     <Bond pose="watch" ledge="right" width={120} />
 *     …
 *   </div>
 *
 * `ledge` ("left" | "right") sits his paws on the parent's top edge, 24px
 * in from that side; leave it out and place him yourself with `className`.
 * Poses: "watch" (paws forward, looking at you), "sleep" (lying down),
 * "peek" (looking over an edge). Hidden under 480px unless `phone`.
 */
const BOND = {
  watch: { w: 420, h: 478, sink: 0.04 },
  sleep: { w: 420, h: 334, sink: 0.08 },
  peek: { w: 420, h: 463, sink: 0.05 },
} as const;
const BondImg = styled.img<{ $ledge?: "left" | "right"; $sink: number; $phone: boolean }>`
  display: block;
  height: auto;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.28));
  ${({ $ledge, $sink }) =>
    $ledge
      ? `position: absolute; z-index: 2; bottom: 100%; ${$ledge}: clamp(12px, 2vw, 32px); transform: translateY(${$sink * 100}%);`
      : ""}
  ${({ $phone }) => ($phone ? "" : "@media (max-width: 480px) { display: none; }")}
`;
export function Bond({
  pose = "watch",
  width = 120,
  ledge,
  phone = false,
  className,
}: {
  pose?: keyof typeof BOND;
  width?: number;
  ledge?: "left" | "right";
  phone?: boolean;
  className?: string;
}) {
  const art = BOND[pose];
  return (
    <BondImg
      className={className}
      src={`/brand/bond-${pose}-420.webp`}
      width={width}
      height={Math.round((width * art.h) / art.w)}
      style={{ width }}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      $ledge={ledge}
      $sink={art.sink}
      $phone={phone}
    />
  );
}

const Opening = styled(Chapter)`
  padding: calc(clamp(56px, 6vw, 120px) * var(--sy)) 0
    calc(clamp(72px, 7vw, 136px) * var(--sy));
  overflow: clip;
  .opening-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(36px, 5vw, 120px);
    align-items: center;
  }
  .opening-grid.solo {
    grid-template-columns: minmax(0, 1fr);
  }
  .opening-grid h1 {
    max-width: 19ch;
  }
  /* A title alone on the cloth takes two lines at most, on the wide measure. */
  .opening-grid.solo h1 {
    max-width: 22ch;
  }
  .opening-lead {
    margin-top: clamp(20px, 2.2vw, 32px);
    font: 400 clamp(1.25rem, 1.1rem + 0.42vw, 1.55rem) / 1.5 ${font.text};
    color: var(--text);
    max-width: 44ch;
    text-wrap: pretty;
  }
  &[data-ground="night"],
  &[data-ground="cloth"],
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
 * A secondary route's opening. Since phase 2 it stands on the chocolate
 * cloth by default, as the top of every page in the app does: the header
 * and the opening read as one band, and the ivory page starts below. A
 * serif title (two lines at most), one paragraph, at most two actions and,
 * where it earns its place, one picture (a `Print` lies on the cloth).
 * Pass `ground="ivory"` (or paper, teal) for a page that should open light.
 */
export function PageOpening({
  eyebrow,
  title,
  lead,
  actions,
  media: art,
  ground = "cloth",
  labelledBy = "page-title",
}: {
  eyebrow?: string;
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
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
        {art && <div data-rise="settle">{art}</div>}
      </Frame>
    </Opening>
  );
}

/*
 * The close of a page, on the cloth, running straight into the footer's
 * cloth so the page ends on the bench: one plain line, the one action, and
 * "Where to next" (Bao's Standard 38: three ruled rows, a title, one line,
 * an arrow). Bond sleeps on the rows' top rule. The heading changes by page
 * so no closing promise repeats across the site (2026-10-23 review).
 */
const Band = styled(Chapter)`
  ${onDarkActions};
  padding: calc(clamp(64px, 6vw, 120px) * var(--sy)) 0
    calc(clamp(40px, 4vw, 72px) * var(--sy));
  .band-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(36px, 6vw, 160px);
    align-items: end;
  }
  .band-row h2 {
    font: 600 ${display.lg} / 1.04 ${font.display};
    letter-spacing: -0.01em;
    color: var(--ink);
    max-width: 16ch;
    text-wrap: balance;
  }
  .band-row h2 em {
    font-style: normal;
    color: var(--mark);
  }
  .band-row > div > p {
    margin-top: 16px;
    font: 400 clamp(1.15rem, 1.05rem + 0.3vw, 1.4rem) / 1.5 ${font.text};
    color: var(--text);
    max-width: 40ch;
  }
  .next {
    position: relative;
    display: grid;
  }
  .next-label {
    font: 600 12px/1 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--label);
    padding-bottom: 16px;
  }
  .next-rows {
    position: relative;
    display: grid;
  }
  .next a {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 20px;
    min-height: 44px;
    padding: 16px 0;
    border-top: 1px solid var(--line);
    text-decoration: none;
    color: inherit;
  }
  .next a:last-child {
    border-bottom: 1px solid var(--line);
  }
  .next b {
    display: block;
    font: 600 ${display.sm} / 1.15 ${font.display};
    color: var(--ink);
    transition: color ${motion.base};
  }
  .next span span {
    display: block;
    margin-top: 4px;
    font: 400 14px/1.45 ${font.ui};
    color: var(--muted);
  }
  .next svg {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    padding: 11px;
    border-radius: 50%;
    border: 1px solid var(--line);
    color: var(--ink);
    transition: transform ${motion.base};
  }
  .next a:active svg {
    transform: scale(0.94);
  }
  ${media.hover} {
    .next a:hover b {
      color: var(--mark);
    }
    .next a:hover svg {
      transform: translateX(4px);
    }
  }
  ${media.md} {
    .band-row {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/**
 * Where a reader can go from here: the rooms this reader has not been in
 * (the current route filters itself out).
 */
const ROOMS = [
  {
    to: "/how-it-works",
    title: "How it works",
    hint: "The call, then the card and the book.",
  },
  {
    /* A finished page in public/, outside the router (2026-10-11). */
    to: "/samples",
    title: "Sample books",
    hint: "Three books you can flip through, page by page.",
    file: true,
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
 * The closing line by page, so the same promise is never said on every
 * page (2026-10-23 review). Plain facts only; a page can pass its own
 * `title` instead.
 */
const CLOSERS: Record<string, ReactNode> = {
  "/how-it-works": (
    <>
      Set it up for someone <em>you love.</em>
    </>
  ),
  "/guides": (
    <>
      Take one question into <em>the first call.</em>
    </>
  ),
  "/compare": (
    <>
      Begin with <em>one storyteller.</em>
    </>
  ),
  "/for-families": (
    <>
      Begin it for <em>the whole family.</em>
    </>
  ),
};
const DEFAULT_CLOSER = (
  <>
    Everyone starts <em>free.</em>
  </>
);

/**
 * The closing invitation at the foot of a narrative route, on the cloth.
 * `title` replaces the page's closing line; `line` the sentence under it.
 */
export function Invitation({
  line = "The archive is free for as long as you like. A plan adds A Story doing the asking.",
  title,
}: {
  line?: string;
  title?: ReactNode;
}) {
  const { pathname } = useLocation();
  const rooms = ROOMS.filter((r) => r.to !== pathname).slice(0, 3);
  return (
    <Band $ground="cloth" aria-labelledby="invitation-title">
      <Frame className="band-row">
        <div>
          <h2 id="invitation-title">
            {title ?? CLOSERS[pathname] ?? DEFAULT_CLOSER}
          </h2>
          <p>{line}</p>
          <Actions>
            <PrimaryAnchor href={START_HREF}>
              {START_LABEL} <ArrowIcon />
            </PrimaryAnchor>
          </Actions>
        </div>
        <nav className="next" aria-label="Where to go next">
          <p className="next-label">Where to next</p>
          <div className="next-rows">
            <Bond pose="sleep" ledge="right" width={112} />
            {rooms.map((r) =>
              "file" in r ? (
                <a key={r.to} href={r.to}>
                  <span>
                    <b>{r.title}</b>
                    <span>{r.hint}</span>
                  </span>
                  <ArrowIcon />
                </a>
              ) : (
                <Link key={r.to} to={r.to} viewTransition>
                  <span>
                    <b>{r.title}</b>
                    <span>{r.hint}</span>
                  </span>
                  <ArrowIcon />
                </Link>
              ),
            )}
          </div>
        </nav>
      </Frame>
    </Band>
  );
}

/**
 * A snapshot from a family album: a white-bordered print held by four black
 * photo corners, turned a little on the bench, with a handwritten caption on
 * its lower border (the web app's album, `.pc` in web-app signed-out.css).
 *
 * Pages-builder piece (phase 2, 2026-10-23). If the kit grows its own
 * cornered print, swap this for it; the props are deliberately the same
 * shape as kit `Print` (an image, a caption, a tilt).
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { color, font } from "../../../styles/theme";
import { mission } from "../../../lib/mission";

const Fig = styled.figure<{ $tilt: number }>`
  --tilt: ${({ $tilt }) => $tilt}deg;
  position: relative;
  margin: 0;
  min-width: 0;
  padding: clamp(8px, 0.8vw, 14px) clamp(8px, 0.8vw, 14px) 0;
  background: ${color.paperPure};
  transform: rotate(var(--tilt));
  box-shadow:
    0 1px 1px rgba(26, 18, 12, 0.18),
    0 16px 30px -14px rgba(26, 18, 12, 0.55),
    0 44px 70px -40px rgba(26, 18, 12, 0.6);
  .window {
    position: relative;
    overflow: hidden;
    background: ${color.ivoryDeep};
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  /* The album's four black corners, each a small folded paper triangle
     laid over a corner of the photograph. */
  .pc {
    position: absolute;
    width: clamp(16px, 1.5vw, 26px);
    aspect-ratio: 1;
    background: ${color.black};
    z-index: 1;
    pointer-events: none;
  }
  .pc.tl {
    left: 0;
    top: 0;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  .pc.tr {
    right: 0;
    top: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
  .pc.bl {
    left: 0;
    bottom: 0;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }
  .pc.br {
    right: 0;
    bottom: 0;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
  }
  figcaption {
    display: flex;
    align-items: center;
    min-height: clamp(44px, 3.6vw, 60px);
    padding: 4px 4px 6px;
    font: 400 clamp(18px, 1.15vw, 22px) / 1.2 ${font.script};
    color: ${color.primaryMid};
  }
  &:not(:has(figcaption)) {
    padding-bottom: clamp(8px, 0.8vw, 14px);
  }
  @media (hover: hover) and (pointer: fine) {
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    &:hover {
      transform: rotate(calc(var(--tilt) * 0.4)) translateY(-4px);
    }
  }
`;

type Source =
  | { id: string; src?: never; srcSet?: never; width?: never; height?: never }
  | { id?: never; src: string; srcSet?: string; width: number; height: number };

export function Snapshot({
  alt,
  sizes,
  caption,
  tilt = 0,
  priority = false,
  className,
  ...source
}: Source & {
  alt: string;
  sizes: string;
  caption?: ReactNode;
  tilt?: number;
  priority?: boolean;
  className?: string;
}) {
  let img: { src: string; srcSet?: string; width: number; height: number };
  if (source.id) {
    const dim = mission[source.id];
    img = {
      src: `/mission/${source.id}-1200.webp`,
      srcSet: [640, 1200, 1800]
        .map((f) => ({ f, w: Math.min(f, dim.width) }))
        .filter((x, i, a) => a.findIndex((y) => y.w === x.w) === i)
        .map((x) => `/mission/${source.id}-${x.f}.webp ${x.w}w`)
        .join(", "),
      width: dim.width,
      height: dim.height,
    };
  } else {
    img = source as {
      src: string;
      srcSet?: string;
      width: number;
      height: number;
    };
  }
  return (
    <Fig $tilt={tilt} className={className} data-snap>
      <div className="window">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={sizes}
          width={img.width}
          height={img.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
        <i className="pc tl" aria-hidden="true" />
        <i className="pc tr" aria-hidden="true" />
        <i className="pc bl" aria-hidden="true" />
        <i className="pc br" aria-hidden="true" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </Fig>
  );
}

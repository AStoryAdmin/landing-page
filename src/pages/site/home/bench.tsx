/**
 * The bookbinder's bench, for the home page (2026-10-23).
 *
 * The site now lives in the web app's world (web-app/docs/BAOS-STANDARD.md
 * 14): the family book open on chocolate bookcloth, ivory pages to read on,
 * and photographs as real prints - a white border, black paper photo
 * corners, a slight turn, and a line written under each in the hand face.
 * These are the home page's pieces of that world. The cloths are the shared
 * kit's (kit/cloth.ts). The print here differs from the kit's `Print` in two
 * ways the home page needs: it takes any image (`src`), not only the mission
 * library, and it crops to a print's shape (`ratio`) or fills a wall cell.
 */
import type { CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { missionSrc } from "./bench.styles";
import { color, font, media } from "../../../styles/theme";

/**
 * A print: the photograph in a white border, held at the corners by black
 * paper, turned by `tilt` degrees, with an optional line written under it.
 * `ratio` crops the photograph to a print's shape (object-fit: cover).
 */
const PrintFigure = styled.figure`
  --tilt: 0deg;
  position: relative;
  margin: 0;
  min-width: 0;
  .print-in {
    position: relative;
    transform: rotate(var(--tilt));
    transition: transform 320ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .face {
    position: relative;
    padding: var(--border, 10px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.28),
      0 18px 30px -16px rgba(0, 0, 0, 0.55);
  }
  img {
    display: block;
    width: 100%;
    aspect-ratio: var(--ratio, 3 / 2);
    object-fit: cover;
    object-position: var(--focus, 50% 50%);
    background: ${color.ivoryDeep};
  }
  /* Black paper photo corners, as an album holds a print. */
  .pc {
    position: absolute;
    width: var(--corner, 26px);
    height: var(--corner, 26px);
    background: ${color.black};
  }
  .pc.tl {
    left: -2px;
    top: -2px;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  .pc.tr {
    right: -2px;
    top: -2px;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
  .pc.bl {
    left: -2px;
    bottom: -2px;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
  .pc.br {
    right: -2px;
    bottom: -2px;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  figcaption {
    margin-top: 0.55em;
    text-align: center;
    font: 500 var(--cap, 19px) / 1.15 ${font.script};
    color: var(--cap-ink, ${color.primary});
    text-wrap: balance;
  }
  /* A print lifts and straightens a little under the hand. */
  @media (hover: hover) and (pointer: fine) {
    &:hover .print-in {
      transform: rotate(calc(var(--tilt) * 0.3)) translateY(-5px);
    }
  }
  ${media.motion} {
    .print-in {
      transition: none;
    }
  }
`;

export function Print({
  id,
  src,
  srcSet,
  alt,
  sizes,
  caption,
  tilt = 0,
  ratio = "3 / 2",
  focus,
  priority = false,
  className,
  style,
  children,
}: {
  /** A photograph in the mission library, or give `src` instead. */
  id?: string;
  src?: string;
  srcSet?: string;
  alt: string;
  sizes: string;
  caption?: ReactNode;
  tilt?: number;
  ratio?: string;
  focus?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const source = id ? missionSrc(id) : { src: src!, srcSet };
  return (
    <PrintFigure
      className={className}
      data-print-object
      style={{
        ["--tilt" as string]: `${tilt}deg`,
        ["--ratio" as string]: ratio,
        ...(focus ? { ["--focus" as string]: focus } : {}),
        ...style,
      }}
    >
      <div className="print-in">
        <div className="face">
          <img
            src={source.src}
            srcSet={source.srcSet}
            sizes={sizes}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
          <span className="pc tl" aria-hidden="true" />
          <span className="pc tr" aria-hidden="true" />
          <span className="pc bl" aria-hidden="true" />
          <span className="pc br" aria-hidden="true" />
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </div>
      {children}
    </PrintFigure>
  );
}

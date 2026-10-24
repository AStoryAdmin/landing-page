/**
 * Book cloth: the grounds of the bench (phase 2, 2026-10-23).
 *
 * USAGE
 *   import { chocolateCloth, tealCloth, clothBoard, clothLayer } from "./kit/cloth";
 *   const Band = styled.section`${chocolateCloth}; color: ${color.onDark};`;
 *   // or simply <Chapter $ground="cloth"> / <Cloth> from kit.styles, which do this for you.
 *
 * - `chocolateCloth` is the web app's bench: the woven chocolate cloth
 *   (public/brand/cloth-chocolate.webp, copied from the app), the faint A
 *   of the endpapers repeated over it (public/brand/a-pattern.svg, drawn from
 *   the logo's own paths), a lamp's warmth top-left and shade bottom-right.
 *   Heroes, dark bands, the header and the footer stand on it.
 * - `tealCloth` is the same for the book's own moments (the teal board).
 * - `clothBoard(size)` / `clothLayer(size)` are the older teal board and the
 *   grey weave map (public/book-objects/bookcloth.jpg, cut from the product
 *   photograph of the closed book) for book objects drawn in CSS.
 *
 * Shadows and gradients here are book material (Bao's Standard 15a: the
 * light on cloth), not interface decoration. Text on either cloth is ivory
 * (color.onDark) and small print onDarkMuted; both pass 4.5:1.
 */
import { css } from "styled-components";
import { color } from "../../../styles/theme";

const TILE = `url("/book-objects/bookcloth.jpg")`;
/** The A of the endpapers, ivory at 7%, one mark per 120 x 132 tile. */
export const A_PATTERN = `url("/brand/a-pattern.svg")`;
export const CLOTH_CHOCOLATE = `url("/brand/cloth-chocolate.webp")`;
export const CLOTH_TEAL = `url("/brand/cloth-teal.webp")`;

const light = (tint: string) => `
    radial-gradient(1200px 640px at 12% 0%, ${tint}, transparent 62%),
    radial-gradient(1000px 700px at 100% 100%, rgba(0, 0, 0, 0.3), transparent 60%)`;

/** The chocolate bench. Set `color` yourself (usually color.onDark). */
export const chocolateCloth = css`
  background-color: ${color.chocolate};
  background-image:
    ${A_PATTERN},
    ${light("rgba(255, 236, 210, 0.09)")},
    ${CLOTH_CHOCOLATE};
  background-size:
    120px 132px,
    auto,
    auto,
    512px 512px;
  background-repeat: repeat, no-repeat, no-repeat, repeat;
  @media (max-width: 640px) {
    background-size:
      84px 92px,
      auto,
      auto,
      384px 384px;
  }
`;

/** The teal board, for the book's moments. */
export const tealCloth = css`
  background-color: ${color.teal};
  background-image:
    ${A_PATTERN},
    ${light("rgba(255, 255, 255, 0.08)")},
    ${CLOTH_TEAL};
  background-size:
    120px 132px,
    auto,
    auto,
    512px 512px;
  background-repeat: repeat, no-repeat, no-repeat, repeat;
  @media (max-width: 640px) {
    background-size:
      84px 92px,
      auto,
      auto,
      384px 384px;
  }
`;

/** A teal board in the printed cloth: spine shadow, light, then the weave. */
export const clothBoard = (size: string) => css`
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.36), transparent 8%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.07), transparent 55%, rgba(0, 0, 0, 0.18)),
    ${TILE} 0 0 / ${size} ${size},
    ${color.teal};
  background-blend-mode: normal, normal, overlay, normal;
`;

/** The weave alone, for a pseudo-element laid over any cover beneath. */
export const clothLayer = (size: string) => css`
  background: ${TILE} 0 0 / ${size} ${size};
  mix-blend-mode: overlay;
  pointer-events: none;
`;

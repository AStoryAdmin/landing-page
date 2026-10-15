/**
 * Book cloth — the real bookcloth of the printed volume.
 *
 * `public/book-objects/bookcloth.jpg` is cut from the product photograph of
 * the closed teal book (book-objects/closed-1800.webp, the empty cloth left
 * of the prints), its lighting flattened and its edges crossfaded so it
 * tiles without a seam. It is a grey detail map centred on mid-grey: laid
 * over any colour with `overlay`, it turns flat paint into that linen.
 *
 * 2026-10-15: the founder pointed at that photograph ("it used to be the
 * texture on this image") after rejecting a drawn crosshatch and a generic
 * linen, and asked for every book on the site to wear it.
 */
import { css } from "styled-components";
import { color } from "../../../styles/theme";

const TILE = `url("/book-objects/bookcloth.jpg")`;

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

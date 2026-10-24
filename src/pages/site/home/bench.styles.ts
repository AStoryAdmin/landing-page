/**
 * The home page's ivory leaf and image sources (see bench.tsx for the print).
 * The cloths come straight from kit/cloth.ts.
 * Kept apart from the component so fast refresh can reload either.
 */
import { css } from "styled-components";
import { mission } from "../../../lib/mission";
import { color } from "../../../styles/theme";

/** The book's ivory leaf: warm paper with a faint vignette toward its edges. */
export const ivoryLeaf = css`
  background:
    radial-gradient(ellipse 80% 70% at 50% 40%, transparent 60%, rgba(74, 51, 39, 0.05) 100%),
    ${color.paperPure};
  color: ${color.primary};
`;

/** Responsive sources for a photograph in the mission library. */
export function missionSrc(id: string) {
  const dim = mission[id];
  const widths = [640, 1200, 1800]
    .map((file) => ({ file, width: Math.min(file, dim.width) }))
    .filter((x, i, a) => a.findIndex((y) => y.width === x.width) === i);
  return {
    src: `/mission/${id}-1200.webp`,
    srcSet: widths.map((x) => `/mission/${id}-${x.file}.webp ${x.width}w`).join(", "),
  };
}


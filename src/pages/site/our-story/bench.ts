/**
 * The bookbinder's bench for the pages builder's routes: the kit's chocolate
 * cloth (kit/cloth.ts, the web app's woven cloth with the faint A of the
 * endpapers), plus the ground variables kit-styled blocks read on it.
 */
import { css } from "styled-components";
import { color } from "../../../styles/theme";
import { chocolateCloth } from "../kit/cloth";

export const benchCloth = css`
  ${chocolateCloth};
  color: ${color.ivory};
`;

/** The ground variables a kit-styled block expects, for the cloth. */
export const benchVars = css`
  --ink: ${color.ivory};
  --muted: ${color.onDarkMuted};
  --line: ${color.onDarkLine};
  --mark: ${color.goldDeep};
  --label: ${color.gold};
  --focus: ${color.gold};
  --focus-halo: ${color.primary};
  --action-bg: ${color.ivory};
  --action-ink: ${color.primary};
  --action-hover: ${color.paperPure};
  --secondary-coin-ink: ${color.primary};
`;

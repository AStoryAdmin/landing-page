import { color } from "../../styles/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  LOGO_LETTER_PATH,
  LOGO_WAVEFORM_PATH,
  SIMPLE_NAME_STORY_PATH,
} from "./logoPaths";
import geometry from "./logoGeometry.json";
const Root = styled(Link)<{ $height: number }>`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  max-width: 100%;
  text-decoration: none;
  svg {
    height: ${({ $height }) => $height}px;
    width: auto;
    max-width: 100%;
  }
`;
type Props = {
  height?: number;
  tone?: "light" | "dark";
  variant?: "horizontal" | "simple" | "mark";
  to?: string;
  className?: string;
};
/** Namecard lockup: the custom heart-A IS the A. Story is optically repositioned, with no missing-letter space. */
export default function Logo({
  height = 44,
  tone = "light",
  variant = "simple",
  to = "/",
  className,
}: Props) {
  const dark = tone === "dark";
  const mark = variant === "mark";
  return (
    <Root
      to={to}
      $height={height}
      className={className}
      aria-label="A Story — home"
    >
      <svg
        viewBox={mark ? "0 0 420 464" : geometry.viewBox}
        aria-hidden="true"
        focusable="false"
      >
        <g transform={mark ? undefined : geometry.markTransform}>
          <path
            d={LOGO_LETTER_PATH}
            fill={dark ? color.onDark : color.teal}
            fillRule="evenodd"
          />
          <path
            d={LOGO_WAVEFORM_PATH}
            fill={color.warmGold}
            fillRule="evenodd"
          />
        </g>
        {!mark && (
          <path
            transform={geometry.storyTransform}
            d={SIMPLE_NAME_STORY_PATH}
            fill={dark ? color.gold : color.warmGold}
            fillRule="evenodd"
          />
        )}
      </svg>
    </Root>
  );
}

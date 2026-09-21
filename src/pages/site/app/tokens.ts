import styled from "styled-components";
import { color, font } from "../../../styles/theme";

/** Tints of the app's memory cards (Figma: pink, blue, green). */
export const appTint = {
  pink: "#F6E6E2",
  blue: "#E4E9F2",
  green: "#E3EDDC",
  butter: "#FBF0CF",
} as const;

/** Contributor colours, in the order people join a memory. */
export const avatarTints = [
  color.teal,
  color.accent,
  color.primaryMid,
  color.goldDeep,
];

/** Round initials, the app's stand-in for contributor photos. */
export const Avatar = styled.span<{ $bg?: string }>`
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 8.5cqw;
  height: 8.5cqw;
  border-radius: 50%;
  background: ${({ $bg }) => $bg ?? color.primaryMid};
  color: ${color.ivory};
  font: 600 3.6cqw/1 ${font.body};
  box-shadow: 0 0 0 0.6cqw ${color.ivory};
`;

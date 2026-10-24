/**
 * Two buttons, one width, on a phone (fix round 3, 2026-10-24; jury 2 R2 P1,
 * N5). The kit's Actions row stretches only the first button under 640px, so
 * a page opening read as a full-width primary over a narrow secondary. Home's
 * hero sets both doors to the full width, one above the other; the pages that
 * open with two doors match it by wrapping their opening in <PhonePairs>.
 *
 * `display: contents` keeps the wrapper out of the layout.
 */
import styled from "styled-components";
import { Actions } from "../kit/kit.styles";
import { media } from "../../../styles/theme";

export const PhonePairs = styled.div`
  display: contents;
  ${media.sm} {
    ${Actions} > a,
    ${Actions} > button {
      flex: 1 1 100%;
      justify-content: center;
    }
  }
`;

import styled from "styled-components";
import { font, type } from "../../styles/theme";
import InceptionBadge from "./InceptionBadge";

const Credit = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  .credit-copy {
    display: grid;
    gap: 4px;
    font: 400 ${type.label} / 1.4 ${font.body};
  }
  .credit-name {
    font-size: 16px;
    font-weight: 600;
  }
`;

/** Readable membership text accompanies the unmodified official artwork. */
export default function InceptionCredit({ height = 34 }: { height?: number }) {
  return (
    <Credit>
      <InceptionBadge height={height} />
      <span className="credit-copy">
        <span className="credit-name">NVIDIA Inception</span>
        <span>Program member</span>
      </span>
    </Credit>
  );
}

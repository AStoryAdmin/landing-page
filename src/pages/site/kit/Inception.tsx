import styled from "styled-components";
import InceptionBadge from "../../../components/ui/InceptionBadge";
import Logo from "../../../components/ui/Logo";
import { Chapter, Frame } from "./kit.styles";
import { display, font, media } from "../../../styles/theme";

const Band = styled(Chapter)`
  .inception-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 7vw, 112px);
    padding-block: 24px;
    border-top: 1px solid var(--line);
  }
  h2 {
    margin: 24px 0 32px;
    max-width: 19ch;
    font: 400 ${display.md}/1.12 ${font.display};
    text-wrap: balance;
  }
  h2 em { color: var(--mark); }
  .lockup {
    display: flex;
    align-items: center;
    gap: clamp(20px, 2vw, 32px);
    flex-wrap: wrap;
  }
  .lockup .rule {
    width: 1px;
    height: 64px;
    background: var(--line);
  }
  .lockup a svg, .lockup img { height: 64px; }
  .inception-copy { padding-top: 24px; }
  .boilerplate, .means {
    font: 400 17px/1.65 ${font.body};
    color: var(--muted);
    max-width: 62ch;
  }
  .means { margin-top: 22px; color: var(--ink); }
  .means b { font-weight: 600; }
  .plain {
    max-width: 62ch;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
    font: 400 14px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    .inception-layout { grid-template-columns: 1fr; gap: 28px; }
    .inception-copy { padding-top: 0; }
  }
  ${media.sm} {
    .lockup { gap: 12px; }
    .lockup a svg, .lockup img { height: 44px; }
    .lockup .rule { height: 44px; }
    .lockup > span:last-child { padding: 10px; }
  }
  @media (max-width: 360px) {
    .lockup { gap: 10px; }
    .lockup a svg, .lockup img { height: 40px; }
    .lockup .rule { height: 40px; }
    .lockup > span:last-child { padding: 9px; }
  }
`;

export default function Inception() {
  return (
    <Band $ground="paper" $tight aria-labelledby="inception-title" data-nosnippet>
      <Frame className="inception-layout">
        <div>
          <h2 id="inception-title">
            A member of the <em>NVIDIA Inception Program.</em>
          </h2>
          <div className="lockup">
            <Logo height={64} tone="light" />
            <span className="rule" aria-hidden="true" />
            <InceptionBadge height={64} />
          </div>
        </div>
        <div className="inception-copy">
          <p className="boilerplate">
            The NVIDIA Inception program is designed to help startups accelerate
            innovation and growth. Members get access to the latest developer
            resources and training, exclusive pricing on NVIDIA hardware and
            software, and exposure to the venture capital community.
          </p>
          <p className="means">
            What that buys a family is narrower than it sounds, and more useful. A
            call is only worth keeping if the thing on the other end can really{" "}
            <b>hear</b> - a name said once, an accent, a sentence that trails off
            and starts again somewhere else. Membership puts the tools that do
            that listening in our hands earlier than we could otherwise reach
            them.
          </p>
          <p className="plain">
            Membership is not an endorsement, an investment, or a partnership. It
            is a program for young companies, and we are one.
          </p>
        </div>
      </Frame>
    </Band>
  );
}

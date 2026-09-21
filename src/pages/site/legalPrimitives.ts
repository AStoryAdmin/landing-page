import { color, font, space } from "../../styles/theme";
import styled from "styled-components";
export const CardView = styled.div`
  width: min(1050px, calc(100% - 2 * ${space.gutter}));
  margin: auto;
`;
export const Label = styled.p`
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 22px;
  color: ${color.ink};
`;
export const HeroSection = styled.header`
  padding: 60px 0 36px;
  background: ${color.ivory};
  @media (max-width: 700px) {
    padding: 35px 0 27px;
  }
`;
/* Serif, like every other page title (see kit/kit.styles.ts). */
export const HeroTitle = styled.h1`
  font-family: ${font.display};
  font-size: clamp(44px, 5vw, 76px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.022em;
  margin-bottom: 25px;
`;
export const HeroSub = styled.p`
  font-size: 23px;
  line-height: 1.5;
  max-width: 50ch;
`;
export const LegalMeta = styled.p`
  font-size: 13px;
  margin-top: 18px;
`;
export const BodySection = styled.div`
  padding: 0 0 65px;
  background: ${color.ivory};
`;
export const LegalContent = styled.div`
  color: ${color.ink};
`;
export const Notice = styled.p`
  font-size: 17px;
  line-height: 1.6;
  padding: 24px 0;
  border-top: 1px solid ${color.primaryLineStrong};
`;
export const Section = styled.section`
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 32px 0 32px 60px;
  border-top: 1px solid ${color.primaryLineStrong};
  @media (max-width: 700px) {
    padding: 27px 0;
  }
`;
export const SectionNum = styled.span`
  position: absolute;
  left: 0;
  top: 36px;
  font-size: 13px;
  @media (max-width: 700px) {
    position: static;
    display: block;
    margin-bottom: 10px;
  }
`;
export const SectionTitle = styled.h2`
  font-family: ${font.display};
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-weight: 400;
  margin-bottom: 20px;
`;
export const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.65;
  margin-bottom: 18px;
`;
export const List = styled.ul`
  padding-left: 24px;
  margin: 20px 0;
`;
export const ListItem = styled.li`
  font-size: 18px;
  line-height: 1.65;
  margin-bottom: 12px;
`;
export const LegalLink = styled.a`
  text-underline-offset: 4px;
  color: inherit;
  overflow-wrap: anywhere;
`;
export const Bold = styled.strong`
  font-weight: 600;
`;

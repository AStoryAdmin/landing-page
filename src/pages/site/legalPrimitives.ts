import { color, font, media, motion, space, type } from "../../styles/theme";
import styled from "styled-components";
/* The rail (240px) and the reading column (about 68 characters of EB
   Garamond at 19px) side by side; the hero's left edge is the rail's. */
export const CardView = styled.div`
  width: min(1120px, calc(100% - 2 * ${space.gutter}));
  margin: auto;
`;
export const Label = styled.p`
  font-size: 14px;
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
  font-family: ${font.text};
  font-size: 23px;
  line-height: 1.5;
  max-width: 50ch;
`;
export const LegalMeta = styled.p`
  font-size: ${type.label};
  margin-top: 18px;
`;
export const BodySection = styled.div`
  padding: 0 0 65px;
  background: ${color.ivory};
`;
export const LegalContent = styled.div`
  color: ${color.ink};
  font-family: ${font.text};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${media.up.lg} {
    grid-template-columns: 240px minmax(0, 720px);
    column-gap: clamp(48px, 5vw, 96px);
    align-items: start;
    > * {
      grid-column: 2;
    }
  }

  /* The short version: on the same edge as the sections, no box. */
  .gf-legal-summary {
    padding: 8px 0 32px;
    font-size: ${type.read};
    line-height: 1.6;
  }
  .gf-legal-summary h2 {
    font: 400 32px/1.2 ${font.display};
    letter-spacing: -0.012em;
    margin-bottom: 14px;
  }
  .gf-legal-summary ul {
    margin: 16px 0 20px;
    padding-left: 22px;
  }
  .gf-legal-summary li {
    margin: 0 0 10px;
  }
  .gf-legal-summary li::marker {
    color: ${color.accentText};
  }
  .gf-legal-summary strong {
    font-weight: 600;
  }
  .gf-legal-summary small {
    display: block;
    font: 400 ${type.note} / 1.55 ${font.ui};
    color: ${color.bodyMuted};
  }

  /* Contents, wide: a rail that follows the reader. */
  .gf-legal-rail {
    display: none;
  }
  ${media.up.lg} {
    .gf-legal-rail {
      display: block;
      grid-column: 1;
      grid-row: 1 / span 3;
      position: sticky;
      top: calc(var(--nav-total, 88px) + 28px);
      max-height: calc(100svh - var(--nav-total, 88px) - 56px);
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4px 4px 4px 0;
      scrollbar-width: thin;
    }
    .gf-legal-contents {
      display: none;
    }
  }
  .gf-legal-rail-h {
    margin: 0 0 8px;
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .gf-legal-rail ol,
  .gf-legal-contents ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .gf-legal-rail a,
  .gf-legal-contents a {
    display: flex;
    align-items: baseline;
    gap: 12px;
    min-height: 44px;
    padding: 11px 0;
    box-sizing: border-box;
    font: 400 ${type.note} / 1.45 ${font.ui};
    color: ${color.body};
    text-decoration: none;
    transition: color ${motion.base};
  }
  .gf-legal-rail .n,
  .gf-legal-contents .n {
    flex: none;
    width: 20px;
    font-variant-numeric: tabular-nums;
    color: ${color.bodyMuted};
  }
  ${media.hover} {
    .gf-legal-rail a:hover,
    .gf-legal-contents a:hover {
      color: ${color.ink};
    }
  }
  .gf-legal-rail a[aria-current="true"] {
    color: ${color.accentText};
    font-weight: 600;
  }
  .gf-legal-rail a[aria-current="true"] .n {
    color: ${color.accentText};
  }

  /* Contents, narrow: one disclosure above the sections. */
  .gf-legal-contents {
    margin-bottom: 8px;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .gf-legal-contents summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    cursor: pointer;
    list-style: none;
    font: 600 16px/1.3 ${font.ui};
  }
  .gf-legal-contents summary::-webkit-details-marker {
    display: none;
  }
  .gf-legal-contents summary small {
    margin-left: 8px;
    font-weight: 400;
    font-size: 14px;
    color: ${color.bodyMuted};
  }
  .gf-legal-contents summary svg {
    width: 20px;
    height: 20px;
    flex: none;
    transition: transform ${motion.base};
  }
  .gf-legal-contents[open] summary svg {
    transform: rotate(180deg);
  }
  .gf-legal-contents nav {
    padding-bottom: 16px;
  }
  ${media.up.md} {
    .gf-legal-contents ol {
      columns: 2;
      column-gap: 40px;
    }
    .gf-legal-contents li {
      break-inside: avoid;
    }
  }
  ${media.motion} {
    .gf-legal-contents summary svg,
    .gf-legal-rail a,
    .gf-legal-contents a {
      transition: none;
    }
  }
`;
export const Notice = styled.p`
  font-size: ${type.read};
  line-height: 1.6;
  padding: 24px 0;
  border-top: 1px solid ${color.primaryLineStrong};
`;
/* Every section starts on the reading column's edge; the number sits above
   the title (the text refers to sections by number). */
export const Section = styled.section`
  position: relative;
  padding: 32px 0 14px;
  border-top: 1px solid ${color.primaryLineStrong};
  scroll-margin-top: calc(var(--nav-total, 88px) + 16px);
`;
export const SectionNum = styled.span`
  display: block;
  margin-bottom: 8px;
  font: 600 ${type.label} / 1 ${font.ui};
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: ${color.accentText};
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
  font-size: ${type.read};
  line-height: 1.6;
  margin-bottom: 18px;
`;
export const List = styled.ul`
  padding-left: 24px;
  margin: 20px 0;
`;
export const ListItem = styled.li`
  font-size: ${type.read};
  line-height: 1.6;
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

import { createElement, type ReactNode } from "react";
import styled from "styled-components";
import {
  color,
  display,
  font,
  media,
  motion,
  space,
  type,
} from "../../styles/theme";

/*
 * Privacy and Terms. The legal text in components/privacy.tsx and terms.tsx
 * is never edited here: these are its visual pieces only.
 *
 * Premium pass (2026-11-02, design spec §4D): one reading measure (68ch),
 * section titles at display.sm, the type tokens throughout, sentence-case
 * labels; below 1025px the contents fold into one closed "Contents"
 * disclosure under "The short version", and every section ends with a small
 * "Back to contents" link to it.
 */

/** The id of the folded contents, the target of every "Back to contents". */
export const CONTENTS_ID = "legal-contents-fold";

/* The rail (240px) and the reading column (about 68 characters of EB
   Garamond) side by side; the hero's left edge is the rail's. */
export const CardView = styled.div`
  width: min(1120px, calc(100% - 2 * ${space.gutter}));
  margin: auto;
`;
export const Label = styled.p`
  margin-bottom: ${space.lg};
  font: 600 ${type.label} / 1.4 ${font.ui};
  letter-spacing: 0.01em;
  color: ${color.accentText};
`;
export const HeroSection = styled.header`
  padding: calc(${space.section} * var(--sy, 1)) 0 ${space.xl};
  background: ${color.ivory};
`;
/* Serif, like every other page title (see kit/kit.styles.ts). */
export const HeroTitle = styled.h1`
  font: 400 ${display.lg} / 1.04 ${font.display};
  letter-spacing: -0.022em;
  margin-bottom: ${space.lg};
`;
export const HeroSub = styled.p`
  font: 400 ${type.lead} / 1.5 ${font.text};
  max-width: 50ch;
`;
export const LegalMeta = styled.p`
  margin-top: ${space.md};
  font: 400 ${type.label} / 1.5 ${font.ui};
  color: ${color.bodyMuted};
`;
export const BodySection = styled.div`
  padding: 0 0 calc(${space.section} * var(--sy, 1));
  background: ${color.ivory};
`;
export const LegalContent = styled.div`
  color: ${color.ink};
  font-family: ${font.text};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${media.up.lg} {
    grid-template-columns: 240px minmax(0, 68ch);
    column-gap: clamp(48px, 5vw, 96px);
    align-items: start;
    > * {
      grid-column: 2;
    }
  }
  /* One reading measure for every paragraph and list item. */
  p,
  li {
    max-inline-size: 68ch;
  }

  /* The short version: on the same edge as the sections, no box. */
  .gf-legal-summary {
    padding: ${space.xs} 0 ${space.xl};
    font-size: ${type.read};
    line-height: 1.6;
  }
  .gf-legal-summary h2 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    letter-spacing: -0.012em;
    margin-bottom: 14px;
  }
  .gf-legal-summary ul {
    margin: ${space.md} 0 20px;
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
    .gf-legal-contents,
    .gf-legal-back {
      display: none;
    }
  }
  .gf-legal-rail-h {
    margin: 0 0 ${space.xs};
    font: 600 ${type.label} / 1.4 ${font.ui};
    letter-spacing: 0.01em;
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
    gap: ${space.sm};
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

  /* Contents, narrow: one closed disclosure under the short version. */
  .gf-legal-contents {
    margin-bottom: ${space.xs};
    border-top: 1px solid ${color.primaryLineStrong};
    scroll-margin-top: calc(var(--nav-total, 88px) + ${space.md});
  }
  .gf-legal-contents summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    cursor: pointer;
    list-style: none;
    font: 600 ${type.ui} / 1.3 ${font.ui};
  }
  .gf-legal-contents summary::-webkit-details-marker {
    display: none;
  }
  .gf-legal-contents summary small {
    margin-left: ${space.xs};
    font: 400 ${type.label} / 1.3 ${font.ui};
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
    padding-bottom: ${space.md};
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

  /* "Back to contents", at the end of each section (narrow screens). */
  .gf-legal-back {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-bottom: ${space.xs};
    font: 500 ${type.label} / 1.3 ${font.ui};
    color: ${color.bodyMuted};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  ${media.hover} {
    .gf-legal-back:hover {
      color: ${color.ink};
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
  padding: ${space.lg} 0;
  border-top: 1px solid ${color.primaryLineStrong};
`;
/* Every section starts on the reading column's edge; the number sits above
   the title (the text refers to sections by number). */
const SectionBox = styled.section`
  position: relative;
  padding: ${space.xl} 0 14px;
  border-top: 1px solid ${color.primaryLineStrong};
  scroll-margin-top: calc(var(--nav-total, 88px) + ${space.md});
`;
/** A legal section: its words, then (on narrow screens) "Back to contents". */
export function Section({ id, children }: { id: string; children: ReactNode }) {
  return createElement(
    SectionBox,
    { id },
    children,
    createElement(
      "a",
      { className: "gf-legal-back", href: "#" + CONTENTS_ID },
      "Back to contents",
    ),
  );
}
export const SectionNum = styled.span`
  display: block;
  margin-bottom: ${space.xs};
  font: 600 ${type.label} / 1 ${font.ui};
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: ${color.accentText};
`;
export const SectionTitle = styled.h2`
  font: 400 ${display.sm} / 1.2 ${font.display};
  letter-spacing: -0.015em;
  margin-bottom: 20px;
`;
export const Paragraph = styled.p`
  font-size: ${type.read};
  line-height: 1.6;
  margin-bottom: 18px;
`;
export const List = styled.ul`
  padding-left: ${space.lg};
  margin: 20px 0;
`;
export const ListItem = styled.li`
  font-size: ${type.read};
  line-height: 1.6;
  margin-bottom: ${space.sm};
`;
export const LegalLink = styled.a`
  text-underline-offset: 4px;
  color: inherit;
  overflow-wrap: anywhere;
`;
export const Bold = styled.strong`
  font-weight: 600;
`;

/**
 * The site kit, Pass 11 — the one visual vocabulary every route is built from.
 *
 * Pass 10 gave the homepage a vocabulary and left the other nineteen routes on
 * three older ones, so the site changed character the moment a visitor left
 * Home. Everything a page needs to look like A Story lives here: the frame,
 * the voices of type, the three actions, the matted print, the gold keyline
 * plate, and the section grounds. Pages compose; they do not restyle.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TYPE HAS TWO VOICES, AND THEY DO NOT SWAP.
 * Source Serif 4 speaks for the family: headlines, quotations, the lines a
 * reader should remember. Figtree speaks for the product: explanation,
 * labels, controls. One keyword per headline may take terracotta (on light)
 * or brass (on dark) — never a whole clause, and never decoration.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { color, display, font, media, motion } from "../../../styles/theme";

/** The grounds a section can stand on. Each has a job; see Chapter below. */
export type Ground = "ivory" | "paper" | "night" | "teal" | "sand";

/**
 * `mark` colours the keyword in a large headline (3:1 is enough at that
 * size). `label` colours small text — eyebrows, tags — and must reach 4.5:1,
 * which the exact terracotta and warm gold do not on these grounds.
 */
export const grounds: Record<Ground, { bg: string; ink: string; muted: string; line: string; mark: string; label: string }> = {
  ivory: { bg: color.ivory, ink: color.primary, muted: color.bodyMuted, line: color.primaryLineStrong, mark: color.accent, label: color.accentText },
  paper: { bg: color.paperPure, ink: color.primary, muted: color.bodyMuted, line: color.primaryLineStrong, mark: color.accent, label: color.accentText },
  sand: { bg: color.ivoryDeep, ink: color.primary, muted: color.bodyMuted, line: color.primaryLineStrong, mark: color.accentText, label: color.accentText },
  night: { bg: color.night, ink: color.ivory, muted: color.onDarkMuted, line: color.nightLine, mark: color.gold, label: color.gold },
  teal: { bg: color.teal, ink: color.ivory, muted: color.onDarkMuted, line: color.onDarkLine, mark: color.warmGold, label: color.gold },
};

/** Wide enough for large type to be large; the reading measure is set per block. */
export const Frame = styled.div`
  width: min(1440px, calc(100% - var(--page-gutter) * 2));
  margin-inline: auto;
  min-width: 0;
`;

/**
 * A section and its ground. Ivory is the house; paper is a quieter room;
 * sand holds practical detail; night is for openings and the moments the
 * page wants the reader to stop; teal is reserved for the conversation —
 * the one thing A Story does that nobody else in the family can.
 */
export const Chapter = styled.section<{ $ground?: Ground; $tight?: boolean }>`
  --ink: ${({ $ground = "ivory" }) => grounds[$ground].ink};
  --muted: ${({ $ground = "ivory" }) => grounds[$ground].muted};
  --line: ${({ $ground = "ivory" }) => grounds[$ground].line};
  --mark: ${({ $ground = "ivory" }) => grounds[$ground].mark};
  --label: ${({ $ground = "ivory" }) => grounds[$ground].label};
  position: relative;
  background: ${({ $ground = "ivory" }) => grounds[$ground].bg};
  color: var(--ink);
  padding: ${({ $tight }) =>
    $tight ? "clamp(64px, 7vw, 112px) 0" : "clamp(96px, 11vw, 176px) 0"};
`;

/** The app's cream panel rising over a dark scene: a page being turned, used between acts. */
export const RisingEdge = styled.div<{ $to?: Ground }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: clamp(40px, 6vw, 96px);
  transform: translateY(-99%);
  background: ${({ $to = "ivory" }) => grounds[$to].bg};
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  pointer-events: none;
`;

/** A single word or two above a headline. No numbers, no sentences. */
export const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 clamp(20px, 2.4vw, 32px);
  font: 600 13px/1.4 ${font.body};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--label, ${color.accentText});
  &::before {
    content: "";
    width: 28px;
    height: 1px;
    background: currentColor;
  }
`;

const serif = css`
  font-family: ${font.display};
  font-weight: 400;
  color: var(--ink, ${color.primary});
  letter-spacing: -0.022em;
  text-wrap: balance;
  em {
    font-style: normal;
    color: var(--mark, ${color.accent});
  }
  i {
    font-style: italic;
  }
`;
/** Page-opening headline. One per route. */
export const Title = styled.h1`
  ${serif};
  font-size: ${display.xl};
  line-height: 1.02;
`;
/** A section's statement — the one line a reader should leave with. */
export const Statement = styled.h2<{ $size?: "xl" | "lg" | "md" }>`
  ${serif};
  font-size: ${({ $size = "lg" }) => display[$size]};
  line-height: 1.06;
`;
/** A small serif heading inside a section. */
export const Heading = styled.h3`
  ${serif};
  font-size: ${display.sm};
  line-height: 1.2;
  letter-spacing: -0.012em;
`;
/** The person's own words. Always serif, never the product's voice. */
export const Quote = styled.blockquote`
  margin: 0;
  font: italic 400 ${display.md} / 1.28 ${font.display};
  color: var(--ink, ${color.primary});
  text-wrap: balance;
`;
/** The paragraph that follows a statement. 20px, never smaller than 18. */
export const Lead = styled.p`
  font: 400 clamp(1.125rem, 1.02rem + 0.35vw, 1.3rem) / 1.55 ${font.body};
  color: var(--muted, ${color.body});
  max-width: 44ch;
`;
export const Body = styled.p`
  font: 400 18px/1.65 ${font.body};
  color: var(--muted, ${color.body});
  max-width: 60ch;
  & + & {
    margin-top: 16px;
  }
`;
/** Small print that is still meant to be read: 14px floor. */
export const Note = styled.p`
  font: 400 14px/1.55 ${font.body};
  color: var(--muted, ${color.bodyMuted});
`;

/** Statement left, explanation right, aligned on the last line — the house header for a section. */
export const SplitHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: clamp(28px, 6vw, 110px);
  align-items: end;
  margin-bottom: clamp(48px, 6vw, 96px);
  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

/**
 * The three actions. Primary: a filled square button with a brass sweep.
 * Secondary: a keyline of the same size. Text: an underline that draws away
 * on hover. Nothing else on the site is a button.
 */
const actionBase = css`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  min-height: 56px;
  padding: 0 22px 0 26px;
  border-radius: 2px;
  font: 600 16px/1 ${font.body};
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
  transition: color ${motion.reveal}, border-color ${motion.reveal};
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${color.gold};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform ${motion.reveal};
  }
  svg {
    width: 18px;
    height: 18px;
    flex: none;
    transition: transform ${motion.reveal};
  }
  &:hover::before {
    transform: scaleY(1);
  }
  &:hover {
    color: ${color.primary};
  }
  &:hover svg {
    transform: translateX(4px);
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 3px solid ${color.gold};
    outline-offset: 3px;
  }
`;
const primary = css`
  ${actionBase};
  border: 1px solid transparent;
  background: var(--action-bg, ${color.primary});
  color: var(--action-ink, ${color.ivory});
`;
const secondary = css`
  ${actionBase};
  border: 1px solid var(--ink, ${color.primary});
  background: transparent;
  color: var(--ink, ${color.primary});
`;
export const PrimaryLink = styled(Link)`
  ${primary}
`;
export const PrimaryButton = styled.button`
  ${primary}
`;
export const PrimaryAnchor = styled.a`
  ${primary}
`;
export const SecondaryLink = styled(Link)`
  ${secondary}
`;
export const SecondaryButton = styled.button`
  ${secondary}
`;
const textLink = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  font: 600 16px/1.3 ${font.body};
  color: var(--ink, ${color.primary});
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 calc(100% - 10px) /
    100% 1px no-repeat;
  transition: background-size ${motion.reveal};
  &:hover {
    background-size: 0 1px;
    background-position: 100% calc(100% - 10px);
  }
  svg {
    width: 16px;
    height: 16px;
  }
  &:focus-visible {
    outline: 3px solid ${color.gold};
    outline-offset: 3px;
  }
`;
export const TextLink = styled(Link)`
  ${textLink}
`;
/** The same text action for plain links (mailto, external). */
export const TextAnchor = styled.a`
  ${textLink}
`;
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
  margin-top: clamp(28px, 3vw, 40px);
  ${media.sm} {
    > a:first-child,
    > button:first-child {
      flex: 1 1 100%;
    }
  }
`;
/** On dark grounds the primary action turns ivory. */
export const onDarkActions = css`
  --action-bg: ${color.ivory};
  --action-ink: ${color.primary};
`;

/**
 * A photograph as a print: an ivory mat, a hairline inside it, and a shadow
 * cast by a real object. Only archival prints and the book get depth; the
 * interface never does. Contemporary photographs are borderless (brief §7) —
 * use `$bare`.
 */
export const PrintMat = styled.figure<{ $bare?: boolean; $tilt?: number }>`
  margin: 0;
  position: relative;
  min-width: 0;
  padding: ${({ $bare }) => ($bare ? "0" : "clamp(8px, 0.9vw, 14px)")};
  background: ${({ $bare }) => ($bare ? "transparent" : color.paperPure)};
  box-shadow: ${({ $bare }) =>
    $bare
      ? "none"
      : `0 1px 1px rgba(42, 31, 24, 0.08), 0 14px 28px -14px rgba(42, 31, 24, 0.45), 0 40px 70px -40px rgba(42, 31, 24, 0.5)`};
  transform: rotate(${({ $tilt = 0 }) => $tilt}deg);
  .print-window {
    overflow: hidden;
    position: relative;
  }
  .print-window::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(42, 31, 24, 0.12);
    pointer-events: none;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  figcaption {
    margin-top: 12px;
    font: italic 400 16px/1.4 ${font.display};
    color: var(--muted, ${color.bodyMuted});
  }
`;

/**
 * The old-book plate: a double gold keyline around something the family
 * should treat as precious — a quotation, the voice passage, the book. Used
 * sparingly, it is the one ornament on the site.
 */
export const Plate = styled.div`
  position: relative;
  padding: clamp(28px, 3.4vw, 52px);
  border: 1px solid color-mix(in srgb, ${color.gold} 70%, transparent);
  outline: 1px solid color-mix(in srgb, ${color.gold} 40%, transparent);
  outline-offset: 5px;
`;

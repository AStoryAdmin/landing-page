/**
 * The booking and contact forms' fields (DemoBooking.tsx, Contact.tsx):
 * underlined serif inputs, pill choices, the house error. Split out
 * 2026-10-20 when the contact form arrived, so the two cannot drift.
 */
import styled from "styled-components";
import { color, font, media, motion } from "../../../styles/theme";

export const Form = styled.form`
  display: grid;
  gap: 26px;
  .two {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 26px 28px;
  }
  .field {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .field > span,
  legend {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 0;
    font: 600 13px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.bodyMuted};
  }
  .field > span small,
  legend small {
    font: inherit;
    letter-spacing: 0.1em;
    color: ${color.faint};
  }
  input,
  select,
  textarea {
    width: 100%;
    min-height: 48px;
    padding: 6px 0 8px;
    border: 0;
    border-bottom: 1px solid ${color.primaryLineStrong};
    border-radius: 0;
    background: transparent;
    font: 400 20px/1.3 ${font.display};
    color: ${color.primary};
    transition: border-color ${motion.slow};
  }
  select {
    appearance: none;
    cursor: pointer;
    background: linear-gradient(45deg, transparent 50%, ${color.bodyMuted} 50%) calc(100% - 12px) 55% / 6px 6px
        no-repeat,
      linear-gradient(-45deg, transparent 50%, ${color.bodyMuted} 50%) calc(100% - 6px) 55% / 6px 6px no-repeat;
    padding-right: 28px;
  }
  textarea {
    min-height: 96px;
    resize: vertical;
    line-height: 1.45;
  }
  input::placeholder,
  textarea::placeholder {
    color: ${color.faint};
    font-style: italic;
    opacity: 0.75;
  }
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-bottom: 2px solid ${color.gold};
  }
  .field[data-invalid="true"] input {
    border-bottom-color: ${color.error};
  }
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }
  legend {
    width: 100%;
    margin-bottom: 12px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    position: relative;
  }
  .chip input {
    position: absolute;
    inset: 0;
    opacity: 0;
    min-height: 0;
    cursor: pointer;
  }
  .chip span {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 999px;
    font: 500 15px/1 ${font.body};
    color: ${color.primary};
    transition:
      background ${motion.slow},
      border-color ${motion.slow};
  }
  .chip input:checked + span {
    background: ${color.primary};
    border-color: ${color.primary};
    color: ${color.ivory};
  }
  .chip input:focus-visible + span {
    outline: 3px solid ${color.gold};
    outline-offset: 2px;
  }
  .hint {
    margin-top: 10px;
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .trap {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .error {
    padding: 12px 14px;
    border-left: 2px solid ${color.error};
    background: color-mix(in srgb, ${color.error} 7%, ${color.paperPure});
    font: 400 15px/1.5 ${font.body};
    color: ${color.error};
  }
  .go {
    justify-self: start;
  }
  .fine {
    font: 400 14px/1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.sm} {
    .two {
      grid-template-columns: minmax(0, 1fr);
    }
    .go {
      justify-self: stretch;
      justify-content: center;
    }
  }
`;

export const Done = styled.div`
  h3 {
    font: 400 clamp(1.6rem, 1.3rem + 1vw, 2.2rem) / 1.15 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 14px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
    max-width: 46ch;
  }
`;

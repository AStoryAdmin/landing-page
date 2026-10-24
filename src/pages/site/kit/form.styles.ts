/**
 * The booking and contact forms' fields (DemoBooking.tsx, Contact.tsx):
 * underlined serif inputs, pill choices, the house error. Split out
 * 2026-10-20 when the contact form arrived, so the two cannot drift.
 */
import styled from "styled-components";
import { color, font, media, motion, type } from "../../../styles/theme";

/* States (2026-10-23): hover darkens the rule, focus draws a gold rule under
   it without changing the field's size, invalid turns it red, valid (a
   filled field the browser accepts) settles it to the ink. 150ms. */

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
    font: 600 ${type.label} / 1.3 ${font.ui};
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
    font: 400 20px/1.3 ${font.text};
    color: ${color.body};
    transition:
      border-color ${motion.fast},
      box-shadow ${motion.fast};
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
  ${media.hover} {
    input:hover,
    select:hover,
    textarea:hover {
      border-bottom-color: ${color.controlBorder};
    }
  }
  /* Focus: the gold rule is a shadow under the 1px line, so nothing moves. */
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-bottom-color: ${color.goldDeep};
    box-shadow: 0 1px 0 ${color.goldDeep};
  }
  input:not(:placeholder-shown):valid,
  textarea:not(:placeholder-shown):valid {
    border-bottom-color: ${color.primary};
  }
  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .field[data-invalid="true"] input,
  .field[data-invalid="true"] textarea,
  .field[data-invalid="true"] select {
    border-bottom-color: ${color.error};
    box-shadow: 0 1px 0 ${color.error};
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
  /* A block-level box, so the hidden input covers the whole 44px pill (as
     an inline label it measured 41px, jury 2 N3). */
  .chip {
    position: relative;
    display: inline-flex;
  }
  .chip input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
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
    font: 500 ${type.ui} / 1 ${font.ui};
    color: ${color.primary};
    transition:
      background-color ${motion.fast},
      border-color ${motion.fast},
      color ${motion.fast};
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
    font: 400 ${type.note} / 1.5 ${font.body};
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
    font: 400 ${type.note} / 1.5 ${font.body};
    color: ${color.error};
  }
  .go {
    justify-self: start;
  }
  .fine {
    font: 400 ${type.note} / 1.55 ${font.body};
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
    font: 600 clamp(1.7rem, 1.35rem + 1vw, 2.4rem) / 1.12 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 14px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: ${color.body};
    max-width: 46ch;
  }
`;

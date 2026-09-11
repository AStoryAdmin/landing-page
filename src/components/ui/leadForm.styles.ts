import styled from 'styled-components';
import { color, font, leading, media, radius, space, tracking, type, weight } from '../../styles/theme';

/**
 * The form that replaced the mailto.
 *
 * Two grounds, because it appears on both: `$onDark` for the teal panels and
 * the /start hero, plain for the ivory sections. Everything else is shared, so
 * the form looks like one component wherever it lands rather than two that
 * drifted.
 */

export const Form = styled.form<{ $onDark?: boolean }>`
    display: grid;
    gap: ${space.sm};
    text-align: left;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.sm};

    ${media.sm} { grid-template-columns: 1fr; }
`;

export const Field = styled.label<{ $onDark?: boolean }>`
    display: grid;
    gap: 6px;

    > span {
        font-size: ${type.caption};
        font-weight: ${weight.semibold};
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.bodyMuted)};
    }

    /* "— optional". It used to carry opacity: 0.75 on top of a colour that is
       already translucent, which compounded to well under 4.5:1 and failed the
       gate on both grounds. It now differs from the label by case and weight
       alone, which is where the difference should have come from. */
    > span .opt {
        text-transform: none;
        letter-spacing: 0;
        font-weight: ${weight.regular};
    }

    input,
    textarea {
        width: 100%;
        min-height: 48px;
        padding: 12px 14px;
        font-family: ${font.body};
        font-size: 1rem;
        line-height: ${leading.normal};
        color: ${({ $onDark }) => ($onDark ? color.onDark : color.ink)};
        background: ${({ $onDark }) => ($onDark ? 'rgba(255,255,255,0.06)' : color.paperPure)};
        border: 1px solid ${({ $onDark }) => ($onDark ? color.onDarkLine : color.primaryLine)};
        border-radius: ${radius.md};
        outline: none;
        transition: border-color 140ms ease, box-shadow 140ms ease;
    }

    textarea {
        min-height: 88px;
        resize: vertical;
    }

    input::placeholder,
    textarea::placeholder {
        color: ${({ $onDark }) => ($onDark ? 'rgba(243,235,221,0.45)' : color.faint)};
    }

    input:focus-visible,
    textarea:focus-visible {
        border-color: ${({ $onDark }) => ($onDark ? color.gold : color.accent)};
        box-shadow: 0 0 0 3px
            ${({ $onDark }) => ($onDark ? 'rgba(224,160,63,0.28)' : 'rgba(184,81,38,0.18)')};
    }

    &[data-invalid='true'] input {
        border-color: ${({ $onDark }) => ($onDark ? '#E9A08A' : color.error)};
    }

    @media (prefers-reduced-motion: reduce) {
        input, textarea { transition: none; }
    }
`;

export const Submit = styled.button<{ $onDark?: boolean }>`
    min-height: 54px;
    margin-top: 4px;
    padding: 0 26px;
    font-family: ${font.body};
    font-size: 1.0625rem;
    font-weight: ${weight.semibold};
    color: ${({ $onDark }) => ($onDark ? color.primaryDeep : color.paperPure)};
    background: ${({ $onDark }) => ($onDark ? color.gold : color.accent)};
    border: none;
    border-radius: ${radius.pill};
    cursor: pointer;
    transition: filter 160ms ease, opacity 160ms ease;

    &:hover:not(:disabled) { filter: brightness(1.07); }
    &:disabled { opacity: 0.6; cursor: default; }

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

/** The line under the button: what happens, and what does not. */
export const Reassure = styled.p<{ $onDark?: boolean }>`
    margin: 0;
    font-size: ${type.caption};
    line-height: ${leading.normal};
    color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.bodyMuted)};
`;

export const ErrorNote = styled.p<{ $onDark?: boolean }>`
    margin: 0;
    padding: 10px 14px;
    border-radius: ${radius.md};
    background: ${({ $onDark }) => ($onDark ? 'rgba(233,160,138,0.14)' : color.accentWash)};
    font-size: ${type.sm};
    line-height: ${leading.normal};
    color: ${({ $onDark }) => ($onDark ? '#F0C4B4' : color.accentText)};

    a { color: inherit; }
`;

/**
 * What they see after they send it.
 *
 * Not "thanks, we'll be in touch". Somebody has just handed over a parent's
 * name; they should be told what happens, by whom, and by when, in that order.
 */
export const Done = styled.div<{ $onDark?: boolean }>`
    padding: clamp(22px, 2.6vw, 32px);
    border-radius: ${radius.lg};
    background: ${({ $onDark }) => ($onDark ? 'rgba(224,160,63,0.1)' : color.paperPure)};
    border: 1px solid ${({ $onDark }) => ($onDark ? color.onDarkLine : color.primaryLine)};
    text-align: left;

    h3 {
        margin: 0 0 ${space.xs};
        font-family: ${font.display};
        font-size: clamp(1.35rem, 1.1rem + 0.9vw, 1.75rem);
        font-weight: ${weight.medium};
        color: ${({ $onDark }) => ($onDark ? color.onDark : color.ink)};
    }

    p {
        margin: 0 0 ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.body)};
    }

    ol {
        margin: 0;
        padding-left: 1.15rem;
        display: grid;
        gap: 6px;
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.body)};
    }

    strong { color: ${({ $onDark }) => ($onDark ? color.goldText : color.accentText)}; }
`;

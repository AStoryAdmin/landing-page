import styled from 'styled-components';
import { color, font, layout, leading, media, radius, shadow, space, tracking, type, weight } from '../styles/theme';

/**
 * The card a buyer actually hands over.
 *
 * Everything here is built so that one browser print dialog produces the
 * finished artefact: the editor chrome is hidden at print time and the card
 * alone survives onto the page. No backend, no PDF library, no render
 * service — which is the right amount of machinery for the volume this is
 * used at today.
 */

export const Page = styled.main`
    background: ${color.ivory};
    min-height: 70vh;
    padding: clamp(32px, 5vw, 72px) ${space.gutter} clamp(56px, 7vw, 96px);
`;

export const Inner = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
`;

export const Split = styled.div`
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: clamp(32px, 5vw, 64px);
    align-items: start;

    ${media.lg} { grid-template-columns: 1fr; }
`;

/** The editor. Hidden entirely when printing. */
export const Editor = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${space.md};

    @media print { display: none; }
`;

export const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;

    span {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
    }

    input, textarea {
        font-family: ${font.body};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.ink};
        background: ${color.paperPure};
        border: 1px solid ${color.primaryLine};
        border-radius: ${radius.md};
        padding: 11px 13px;
        width: 100%;
        resize: vertical;
    }

    textarea { min-height: 96px; }

    input:focus-visible, textarea:focus-visible {
        outline: 2px solid ${color.accent};
        outline-offset: 1px;
    }
`;

export const Hint = styled.p`
    font-size: ${type.xs};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};

    code {
        font-size: 0.95em;
        background: ${color.primaryWash};
        padding: 1px 5px;
        border-radius: 3px;
    }
`;

export const PrintRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.sm};
    margin-top: ${space.xs};
`;

export const PrintButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    min-height: 48px;
    padding: 0 ${space.lg};
    border: none;
    border-radius: ${radius.pill};
    background: ${color.accent};
    color: ${color.paperPure};
    font-family: ${font.body};
    font-size: ${type.xs};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.wide};
    cursor: pointer;

    &:hover { background: ${color.accentHover}; }
`;

export const CopyButton = styled(PrintButton)`
    background: transparent;
    color: ${color.accentText};
    border: 1px solid ${color.accentLine};

    &:hover { background: ${color.accentWash}; }
`;

/* ── The card itself ──────────────────────────────────────────────────── */

export const Stage = styled.div`
    @media print {
        /* Only the card survives the print dialog. */
        position: absolute;
        inset: 0;
        margin: 0;
        padding: 0;
    }
`;

export const Card = styled.div`
    position: relative;
    background: ${color.primary};
    border-radius: ${radius.xl};
    padding: clamp(32px, 4.5vw, 56px);
    box-shadow: ${shadow.lg};
    color: ${color.onDarkMuted};
    overflow: hidden;
    /* A5-ish proportions, so what prints matches what is on screen. */
    aspect-ratio: 1 / 1.414;
    display: flex;
    flex-direction: column;

    &::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        height: 10px;
        background: linear-gradient(90deg, ${color.gold} 0%, ${color.accent} 100%);
    }

    .eyebrow {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.goldText};
    }

    .to {
        margin-top: auto;
        font-size: ${type.xs};
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${color.onDarkFaint};
    }

    .name {
        font-family: ${font.display};
        font-size: clamp(2rem, 1.4rem + 2.6vw, 3.1rem);
        font-weight: ${weight.light};
        line-height: 1.05;
        letter-spacing: ${tracking.display};
        color: ${color.onDark};
        margin-top: 4px;
    }

    .note {
        margin-top: ${space.lg};
        font-family: ${font.display};
        font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.35rem);
        font-style: italic;
        line-height: ${leading.relaxed};
        color: ${color.onDark};
        white-space: pre-wrap;
    }

    .link {
        margin-top: ${space.lg};
        padding-top: ${space.md};
        border-top: 1px solid ${color.onDarkLine};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.goldText};
        word-break: break-all;
    }

    .link small {
        display: block;
        font-weight: ${weight.regular};
        font-size: ${type.caption};
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${color.onDarkFaint};
        margin-bottom: 4px;
        word-break: normal;
    }

    .from {
        margin-top: ${space.md};
        font-family: ${font.script};
        font-size: 1.4rem;
        color: ${color.goldText};
    }

    @media print {
        box-shadow: none;
        border-radius: 0;
        aspect-ratio: auto;
        min-height: 100vh;
        /* Backgrounds are commonly stripped when printing; ask for them. */
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
`;

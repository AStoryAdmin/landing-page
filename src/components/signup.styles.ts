import styled from 'styled-components';
import { color, font, layout, leading, media, motion, radius, shadow, space, tracking, type, weight } from '../styles/theme';

export const Page = styled.div`
    background: ${color.primaryDeep};
    min-height: 70vh;
    padding: clamp(48px, 6vw, 88px) ${space.gutter} clamp(64px, 7vw, 104px);
`;

export const Layout = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: start;

    ${media.lg} { grid-template-columns: 1fr; }
`;

/* ── Left column: the pitch ───────────────────────────────────────────── */

export const Pitch = styled.div`
    position: sticky;
    top: calc(var(--nav-total, 108px) + 24px);

    ${media.lg} { position: static; }
`;

export const Badge = styled.p`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    font-size: ${type.caption};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.goldText};
    border: 1px solid rgba(224, 160, 63, 0.35);
    background: rgba(224, 160, 63, 0.08);
    border-radius: ${radius.pill};
    padding: 8px 16px;
    margin-bottom: ${space.lg};
`;

export const Title = styled.h1`
    font-family: ${font.display};
    font-size: ${type.d2};
    font-weight: ${weight.light};
    line-height: ${leading.tight};
    letter-spacing: ${tracking.display};
    color: ${color.onDark};
    margin-bottom: ${space.md};

    em { font-style: italic; color: ${color.goldText}; }
`;

export const Sub = styled.p`
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
    max-width: 52ch;
    margin-bottom: ${space.xl};
`;

export const Reassure = styled.ul`
    list-style: none;
    margin: 0 0 ${space.xl};
    padding: 0;
    display: grid;
    gap: ${space.sm};

    li {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.onDarkMuted};
    }

    svg { color: ${color.gold}; margin-top: 3px; }
`;

export const Testimonial = styled.figure`
    margin: 0;
    padding: ${space.lg};
    border-left: 2px solid ${color.gold};
    background: rgba(243, 235, 221, 0.05);
    border-radius: 0 ${radius.md} ${radius.md} 0;

    blockquote {
        margin: 0 0 ${space.sm};
        font-family: ${font.display};
        font-size: 1.15rem;
        font-style: italic;
        line-height: ${leading.normal};
        color: ${color.onDark};
    }

    figcaption {
        font-size: ${type.caption};
        letter-spacing: ${tracking.wide};
        color: ${color.onDarkFaint};
    }
`;

/* ── Right column: the form ───────────────────────────────────────────── */

export const FormCard = styled.div`
    background: ${color.paperPure};
    border-radius: ${radius.xl};
    box-shadow: ${shadow.lg};
    padding: clamp(24px, 3.2vw, 40px);
`;

export const Switcher = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 4px;
    background: ${color.primaryWash};
    border-radius: ${radius.pill};
    margin-bottom: ${space.xl};
`;

export const SwitchButton = styled.button<{ $active: boolean }>`
    border: none;
    cursor: pointer;
    padding: 12px 10px;
    border-radius: ${radius.pill};
    font-family: ${font.body};
    font-size: ${type.sm};
    font-weight: ${weight.semibold};
    background: ${({ $active }) => ($active ? color.primary : 'transparent')};
    color: ${({ $active }) => ($active ? color.onDark : color.primary)};
    transition: background ${motion.fast}, color ${motion.fast};

    &:hover { background: ${({ $active }) => ($active ? color.primary : 'rgba(15, 74, 88, 0.08)')}; }
`;

export const FormTitle = styled.h2`
    font-family: ${font.display};
    font-size: 1.75rem;
    font-weight: ${weight.medium};
    color: ${color.ink};
    margin-bottom: ${space.xs};
`;

export const FormSub = styled.p`
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};
    margin-bottom: ${space.xl};
`;

export const Form = styled.form`
    display: grid;
    gap: ${space.md};
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.md};

    ${media.xs} { grid-template-columns: 1fr; }
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
        font-size: ${type.xs};
        font-weight: ${weight.semibold};
        letter-spacing: 0.02em;
        color: ${color.ink};
    }

    label span {
        font-weight: ${weight.regular};
        color: ${color.faint};
    }

    input, select, textarea {
        font-family: ${font.body};
        font-size: ${type.sm};
        padding: 14px 16px;
        min-height: 50px;
        border-radius: ${radius.md};
        border: 1.5px solid ${color.primaryLine};
        background: ${color.paper};
        color: ${color.ink};
        transition: border-color ${motion.fast}, box-shadow ${motion.fast};
        width: 100%;
    }

    textarea { min-height: 96px; resize: vertical; }

    input::placeholder, textarea::placeholder { color: ${color.faint}; }

    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: ${color.primary};
        box-shadow: 0 0 0 3px rgba(15, 74, 88, 0.12);
    }

    input[aria-invalid='true'], select[aria-invalid='true'] {
        border-color: ${color.error};
    }
`;

export const SubmitButton = styled.button`
    margin-top: ${space.xs};
    width: 100%;
    min-height: 56px;
    border: none;
    border-radius: ${radius.pill};
    background: ${color.accent};
    color: ${color.paperPure};
    font-family: ${font.body};
    font-size: ${type.base};
    font-weight: ${weight.semibold};
    letter-spacing: 0.02em;
    cursor: pointer;
    box-shadow: ${shadow.md};
    transition: background ${motion.base}, transform ${motion.fast};

    &:hover:not(:disabled) { background: ${color.accentHover}; transform: translateY(-1px); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Fineprint = styled.p`
    font-size: ${type.caption};
    line-height: ${leading.normal};
    color: ${color.faint};

    a { color: ${color.accentText}; }
`;

export const ErrorMsg = styled.p`
    font-size: ${type.xs};
    color: ${color.error};
    font-weight: ${weight.medium};
`;

export const SuccessPanel = styled.div`
    padding: ${space.lg};
    border-radius: ${radius.md};
    background: rgba(89, 166, 127, 0.12);
    border: 1px solid rgba(89, 166, 127, 0.4);

    h3 {
        font-family: ${font.body};
        font-size: ${type.base};
        font-weight: ${weight.semibold};
        color: ${color.ink};
        margin-bottom: 6px;
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.body};
    }
`;

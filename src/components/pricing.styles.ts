import styled from 'styled-components';
import { color, font, leading, media, motion, radius, shadow, space, tracking, type, weight } from '../styles/theme';

export const Page = styled.div`
    background: ${color.ivory};
`;

/* ── The one price ────────────────────────────────────────────────────── */

export const PriceCard = styled.div`
    max-width: 720px;
    margin-inline: auto;
    text-align: center;
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.xl};
    padding: clamp(32px, 4vw, 56px);
    box-shadow: ${shadow.md};
`;

export const Price = styled.p`
    font-family: ${font.display};
    font-size: clamp(4rem, 2.4rem + 6vw, 7rem);
    font-weight: ${weight.light};
    line-height: 1;
    letter-spacing: ${tracking.display};
    color: ${color.primary};
`;

export const PriceNote = styled.p`
    margin-top: ${space.sm};
    font-size: ${type.sm};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.wide};
    color: ${color.accentText};
`;

export const PriceSub = styled.p`
    margin: ${space.lg} auto 0;
    max-width: 46ch;
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};
`;

export const IncludedList = styled.ul`
    list-style: none;
    margin: ${space.xl} 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.sm} ${space.lg};
    text-align: left;

    li {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.body};
    }

    li svg { color: ${color.accent}; margin-top: 3px; }

    ${media.sm} { grid-template-columns: 1fr; }
`;

export const PriceActions = styled.div`
    margin-top: ${space.xl};
    display: flex;
    justify-content: center;
    gap: ${space.sm};
    flex-wrap: wrap;

    ${media.xs} { flex-direction: column; }
`;

/* ── What else that money buys ────────────────────────────────────────── */

export const CompareRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.xs} { grid-template-columns: 1fr; }
`;

export const CompareItem = styled.div<{ $ours?: boolean }>`
    height: 100%;
    padding: clamp(20px, 2.2vw, 28px);
    border-radius: ${radius.lg};
    background: ${({ $ours }) => ($ours ? color.primary : color.paperPure)};
    border: 1px solid ${({ $ours }) => ($ours ? color.primary : color.primaryLine)};

    .thing {
        font-family: ${font.display};
        font-size: 1.35rem;
        line-height: ${leading.snug};
        color: ${({ $ours }) => ($ours ? color.onDark : color.ink)};
        margin-bottom: ${space.xs};
    }

    .fate {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${({ $ours }) => ($ours ? color.onDarkMuted : color.bodyMuted)};
    }
`;

/* ── Commitments ──────────────────────────────────────────────────────── */

export const HonestGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${space.lg} clamp(32px, 5vw, 64px);

    ${media.md} { grid-template-columns: 1fr; }
`;

export const HonestItem = styled.div`
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
        color: ${color.bodyMuted};
    }
`;

/* ── The two program plans, demoted ─────────────────────────────────── */

export const ProgramGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.lg};

    ${media.md} { grid-template-columns: 1fr; }
`;

export const ProgramCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(24px, 2.8vw, 34px);
    border-radius: ${radius.lg};
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    transition: transform ${motion.base}, box-shadow ${motion.base};

    &:hover { transform: translateY(-2px); box-shadow: ${shadow.md}; }

    .audience {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
        margin-bottom: ${space.sm};
    }

    h3 {
        font-family: ${font.display};
        font-size: 1.75rem;
        font-weight: ${weight.medium};
        color: ${color.ink};
        margin-bottom: ${space.xs};
    }

    .quote {
        font-size: ${type.xs};
        color: ${color.faint};
        margin-bottom: ${space.md};
    }

    p.blurb {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        margin-bottom: ${space.lg};
        flex: 1;
    }

    a { width: fit-content; }
`;

/* ── What moves a program quote ─────────────────────────────────────── */

export const DriverTable = styled.div`
    overflow-x: auto;
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    background: ${color.paperPure};

    table {
        width: 100%;
        min-width: 560px;
        border-collapse: collapse;
        font-size: ${type.sm};
    }

    th, td {
        padding: 15px 20px;
        text-align: left;
        border-bottom: 1px solid ${color.primaryLine};
        vertical-align: top;
    }

    thead th {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.faint};
        background: ${color.primaryWash};
    }

    tbody th {
        font-weight: ${weight.semibold};
        color: ${color.ink};
        width: 32%;
    }

    tbody td { color: ${color.bodyMuted}; line-height: ${leading.relaxed}; }

    tbody tr:last-child th, tbody tr:last-child td { border-bottom: none; }
`;

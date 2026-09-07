import styled from 'styled-components';
import { color, font, leading, media, motion, radius, shadow, space, tracking, type, weight } from '../styles/theme';

export const Page = styled.div`
    background: ${color.ivory};
`;

export const PlanGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};
    align-items: stretch;

    ${media.lg} { grid-template-columns: 1fr; max-width: 560px; margin-inline: auto; }
`;

export const Plan = styled.div<{ $featured?: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(26px, 3vw, 36px);
    border-radius: ${radius.xl};
    background: ${({ $featured }) => ($featured ? color.primary : color.paperPure)};
    border: 1px solid ${({ $featured }) => ($featured ? color.primary : color.primaryLine)};
    box-shadow: ${({ $featured }) => ($featured ? shadow.lg : shadow.sm)};
    position: relative;
    transition: transform ${motion.base}, box-shadow ${motion.base};

    &:hover { transform: translateY(-3px); box-shadow: ${shadow.lg}; }

    .flag {
        position: absolute;
        top: -13px;
        left: clamp(26px, 3vw, 36px);
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.primaryDeep};
        background: ${color.gold};
        border-radius: ${radius.pill};
        padding: 5px 14px;
    }

    .audience {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${({ $featured }) => ($featured ? color.goldText : color.accentText)};
        margin-bottom: ${space.sm};
    }

    h2 {
        font-family: ${font.display};
        font-size: 2rem;
        font-weight: ${weight.medium};
        color: ${({ $featured }) => ($featured ? color.onDark : color.ink)};
        margin-bottom: ${space.xs};
    }

    .price {
        font-family: ${font.display};
        font-size: 2.75rem;
        font-weight: ${weight.light};
        line-height: 1.1;
        letter-spacing: ${tracking.display};
        color: ${({ $featured }) => ($featured ? color.goldText : color.primary)};
        margin: ${space.md} 0 ${space.xxs};
    }

    .priceNote {
        font-size: ${type.xs};
        color: ${({ $featured }) => ($featured ? color.onDarkFaint : color.faint)};
        margin-bottom: ${space.lg};
    }

    .blurb {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${({ $featured }) => ($featured ? color.onDarkMuted : color.bodyMuted)};
        margin-bottom: ${space.lg};
    }

    ul {
        list-style: none;
        margin: 0 0 ${space.xl};
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: ${space.sm};
        flex: 1;
    }

    li {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${({ $featured }) => ($featured ? color.onDarkMuted : color.bodyMuted)};
    }

    li svg { color: ${({ $featured }) => ($featured ? color.gold : color.accent)}; margin-top: 3px; }

    a { width: 100%; }

    .foot {
        margin-top: ${space.md};
        font-size: ${type.caption};
        line-height: 1.5;
        color: ${({ $featured }) => ($featured ? color.onDarkFaint : color.faint)};
    }
`;

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

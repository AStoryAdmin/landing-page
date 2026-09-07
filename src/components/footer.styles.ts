import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, font, layout, leading, media, motion, radius, space, tracking, type, weight } from '../styles/theme';

export const FooterContainer = styled.footer`
    background: ${color.primaryDeep};
    color: ${color.onDarkMuted};
    font-family: ${font.body};
    font-size: ${type.sm};
    line-height: ${leading.normal};
    padding: clamp(56px, 6vw, 88px) ${space.gutter} ${space.xl};
`;

export const Inner = styled.div`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
`;

export const Top = styled.div`
    display: grid;
    grid-template-columns: 1.6fr repeat(4, 1fr);
    gap: clamp(28px, 4vw, 56px);

    ${media.lg} {
        grid-template-columns: 1fr 1fr;
    }
    ${media.sm} {
        grid-template-columns: 1fr;
        gap: ${space.xl};
    }
`;

export const BrandColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${space.md};
    max-width: 340px;
`;

export const BrandLine = styled.p`
    color: ${color.onDarkMuted};
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    margin-top: ${space.xs};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
`;

export const Section = styled.h3`
    font-family: ${font.body};
    font-size: ${type.caption};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.onDark};
    margin: 0 0 ${space.xs};
`;

export const Page = styled(Link)`
    color: ${color.onDarkMuted};
    text-decoration: none;
    font-size: ${type.sm};
    width: fit-content;
    transition: color ${motion.fast};
    &:hover { color: ${color.gold}; }
`;

export const External = styled.a`
    color: ${color.onDarkMuted};
    text-decoration: none;
    font-size: ${type.sm};
    width: fit-content;
    transition: color ${motion.fast};
    &:hover { color: ${color.gold}; }
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${color.onDarkLine};
    margin: clamp(36px, 5vw, 56px) 0 ${space.lg};
`;

export const BottomRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: ${space.md};
    font-size: ${type.caption};
    color: ${color.onDarkFaint};

    ${media.sm} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const BottomLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.md};
`;

export const Platform = styled.span`
    border: 1px solid ${color.onDarkLine};
    border-radius: ${radius.pill};
    padding: 4px 12px;
    letter-spacing: ${tracking.wide};
`;

/* ── Pre-footer CTA band ──────────────────────────────────────────────── */

export const CtaBand = styled.section`
    background: ${color.primary};
    padding: clamp(56px, 6vw, 88px) ${space.gutter};
    text-align: center;
`;

export const CtaInner = styled.div`
    max-width: 720px;
    margin-inline: auto;
`;

export const CtaTitle = styled.h2`
    font-family: ${font.display};
    font-size: ${type.d3};
    font-weight: ${weight.regular};
    line-height: ${leading.snug};
    letter-spacing: ${tracking.display};
    color: ${color.onDark};
    margin-bottom: ${space.md};

    em { font-style: italic; color: ${color.goldText}; }
`;

export const CtaSub = styled.p`
    color: ${color.onDarkMuted};
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    margin-bottom: ${space.xl};
`;

export const CtaActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.sm};
    justify-content: center;

    ${media.xs} {
        flex-direction: column;
    }
`;

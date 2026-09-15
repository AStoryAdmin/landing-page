import styled from 'styled-components';
import heroImg from './../assets/elderWindow.webp';
import { color, font, layout, leading, media, motion, radius, shadow, space, tracking, type, weight } from '../styles/theme';

export const Page = styled.div`
    background: ${color.ivory};
`;

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const Hero = styled.section`
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: ${color.primaryDeep};
    padding: clamp(64px, 8vw, 120px) ${space.gutter};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -2;
        background-image: url(${heroImg});
        background-size: cover;
        background-position: 70% center;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(95deg, rgba(8, 43, 52, 0.96) 0%, rgba(8, 43, 52, 0.9) 48%, rgba(8, 43, 52, 0.55) 100%);
    }

    ${media.md} {
        &::after { background: rgba(8, 43, 52, 0.94); }
    }
`;

export const HeroInner = styled.div`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
`;

export const HeroCopy = styled.div`
    max-width: 740px;
`;

export const HeroTitle = styled.h1`
    font-family: ${font.display};
    font-size: ${type.d2};
    font-weight: ${weight.light};
    line-height: ${leading.tight};
    letter-spacing: ${tracking.display};
    color: ${color.onDark};
    margin-bottom: ${space.lg};

    em { font-style: italic; color: ${color.gold}; }
`;

export const HeroSub = styled.p`
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
    max-width: 62ch;
    margin-bottom: ${space.xl};
`;

/* ── Trust strip ──────────────────────────────────────────────────────── */

export const TrustStrip = styled.div`
    background: ${color.primaryDeep};
    border-top: 1px solid ${color.onDarkLine};
    padding: ${space.md} ${space.gutter};
`;

export const TrustList = styled.ul`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${space.md} ${space.xxl};
    list-style: none;
    padding: 0;

    li {
        display: flex;
        align-items: center;
        gap: ${space.xs};
        font-size: ${type.xs};
        letter-spacing: ${tracking.wide};
        color: ${color.onDarkMuted};
    }

    svg { color: ${color.gold}; }
`;

/* ── Loss / problem ───────────────────────────────────────────────────── */

export const LossGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.md} { grid-template-columns: 1fr; }
`;

export const LossCard = styled.div`
    padding: clamp(24px, 2.6vw, 32px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-top: 3px solid ${color.accent};
    border-radius: ${radius.lg};
    height: 100%;

    h3 {
        font-family: ${font.display};
        font-size: 1.5rem;
        font-weight: ${weight.medium};
        color: ${color.ink};
        margin-bottom: ${space.sm};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

export const EvidenceRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.xl};
    margin-top: clamp(40px, 5vw, 64px);
    padding-top: clamp(32px, 4vw, 48px);
    border-top: 1px solid ${color.primaryLine};

    ${media.md} { grid-template-columns: 1fr; gap: ${space.lg}; }
`;

export const Evidence = styled.div`
    .num {
        font-family: ${font.display};
        font-size: clamp(2.25rem, 1.6rem + 2.4vw, 3.25rem);
        font-weight: ${weight.light};
        line-height: 1;
        color: ${color.accent};
        letter-spacing: ${tracking.display};
        margin-bottom: ${space.sm};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }

    .src {
        margin-top: ${space.xs};
        font-size: ${type.caption};
        color: ${color.faint};
        letter-spacing: ${tracking.wide};
    }
`;

/* ── Use cases ────────────────────────────────────────────────────────── */

export const UseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const UseCard = styled.article`
    height: 100%;
    padding: clamp(24px, 2.6vw, 32px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    transition: transform ${motion.base}, box-shadow ${motion.base}, border-color ${motion.base};

    .icon {
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: ${radius.md};
        background: ${color.primaryWash};
        color: ${color.primary};
        margin-bottom: ${space.md};
    }

    h3 {
        font-family: ${font.display};
        font-size: 1.5rem;
        font-weight: ${weight.medium};
        color: ${color.ink};
        margin-bottom: ${space.sm};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }

    .who {
        display: block;
        margin-top: ${space.md};
        padding-top: ${space.md};
        border-top: 1px solid ${color.primaryLine};
        font-size: ${type.caption};
        letter-spacing: ${tracking.wide};
        color: ${color.accentText};
        text-transform: uppercase;
        font-weight: ${weight.semibold};
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.lg};
        border-color: ${color.accentLine};
    }
`;

/* ── Deliverables ─────────────────────────────────────────────────────── */

export const DeliverGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${space.lg} clamp(32px, 5vw, 64px);

    ${media.md} { grid-template-columns: 1fr; }
`;

export const Deliverable = styled.div`
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: ${space.md};
    align-items: start;

    .icon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: ${radius.md};
        background: rgba(224, 160, 63, 0.16);
        color: ${color.goldDeep};
    }

    h3 {
        font-family: ${font.body};
        font-size: ${type.base};
        font-weight: ${weight.semibold};
        color: ${color.ink};
        margin-bottom: 4px;
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

/* ── Timeline ─────────────────────────────────────────────────────────── */

export const Timeline = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${space.lg};
    counter-reset: step;

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const TimelineStep = styled.li`
    position: relative;
    padding-top: ${space.lg};
    border-top: 2px solid ${color.onDarkLine};

    .week {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.goldText};
        margin-bottom: ${space.sm};
    }

    h3 {
        font-family: ${font.display};
        font-size: 1.5rem;
        font-weight: ${weight.medium};
        color: ${color.onDark};
        margin-bottom: ${space.xs};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }
`;

/* ── Security ─────────────────────────────────────────────────────────── */

export const SecurityGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const SecurityItem = styled.div`
    padding: ${space.lg};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.md};
    background: ${color.paperPure};
    height: 100%;

    h3 {
        font-family: ${font.body};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        letter-spacing: 0.01em;
        color: ${color.ink};
        margin-bottom: ${space.xs};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

/* ── Quote ────────────────────────────────────────────────────────────── */

export const QuoteBlock = styled.figure`
    margin: 0;
    max-width: 900px;
    margin-inline: auto;
    text-align: center;

    blockquote {
        margin: 0 0 ${space.md};
        font-family: ${font.display};
        font-size: ${type.d4};
        font-style: italic;
        font-weight: ${weight.light};
        line-height: ${leading.snug};
        color: ${color.onDark};
    }

    figcaption {
        font-size: ${type.xs};
        letter-spacing: ${tracking.wide};
        color: ${color.goldText};
    }
`;

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export const FaqGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.lg} clamp(32px, 5vw, 64px);

    ${media.md} { grid-template-columns: 1fr; }
`;

export const FaqItem = styled.div`
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

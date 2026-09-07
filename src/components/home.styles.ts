import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import heroImg from './../assets/heroFamilyYard.webp';
import {
    color, font, layout, leading, media, motion, radius, shadow, space, tracking, type, weight,
} from '../styles/theme';

export const Page = styled.main`
    background: ${color.ivory};
`;

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const Hero = styled.section`
    position: relative;
    isolation: isolate;
    padding: clamp(72px, 9vw, 140px) ${space.gutter} clamp(64px, 7vw, 108px);
    overflow: hidden;
    background: ${color.primaryDeep};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -2;
        background-image: url(${heroImg});
        background-size: cover;
        background-position: 62% 48%;
        transform: scale(1.02);
    }

    /*
     * A teal scrim, heavier on the left where the copy sits, so the headline
     * always clears AA contrast regardless of how the photo crops.
     */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
            linear-gradient(100deg, rgba(8, 43, 52, 0.93) 0%, rgba(8, 43, 52, 0.8) 40%, rgba(8, 43, 52, 0.3) 78%, rgba(8, 43, 52, 0.18) 100%),
            linear-gradient(to bottom, rgba(8, 43, 52, 0.05), rgba(8, 43, 52, 0.45));
    }

    ${media.md} {
        text-align: center;
        &::after {
            background: linear-gradient(to bottom, rgba(8, 43, 52, 0.86), rgba(8, 43, 52, 0.94));
        }
    }
`;

export const HeroInner = styled.div`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
`;

export const HeroCopy = styled.div`
    max-width: 720px;

    ${media.md} {
        margin-inline: auto;
    }
`;

export const HeroBadge = styled.p`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    font-size: ${type.caption};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.gold};
    border: 1px solid rgba(224, 160, 63, 0.35);
    background: rgba(224, 160, 63, 0.08);
    border-radius: ${radius.pill};
    padding: 8px 16px;
    margin-bottom: ${space.lg};
`;

export const HeroTitle = styled.h1`
    font-family: ${font.display};
    font-size: ${type.d1};
    font-weight: ${weight.light};
    line-height: ${leading.tight};
    letter-spacing: ${tracking.display};
    color: ${color.onDark};
    margin-bottom: ${space.lg};

    em {
        font-style: italic;
        color: ${color.gold};
    }
`;

export const HeroSub = styled.p`
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
    max-width: 60ch;
    margin-bottom: ${space.xl};

    ${media.md} { margin-inline: auto; }
`;

export const HeroActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.sm};
    margin-bottom: ${space.xl};

    ${media.md} { justify-content: center; }
    ${media.xs} { flex-direction: column; }
`;

export const HeroTrust = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.md} ${space.lg};
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: ${type.xs};
    color: ${color.onDarkMuted};

    li {
        display: flex;
        align-items: center;
        gap: ${space.xs};
    }

    svg { color: ${color.gold}; flex-shrink: 0; }

    ${media.md} { justify-content: center; }
`;

/* ── Audience router ──────────────────────────────────────────────────── */

export const AudienceStrip = styled.section`
    background: ${color.paper};
    padding: clamp(48px, 5vw, 72px) ${space.gutter};
    border-bottom: 1px solid ${color.primaryLine};
`;

export const AudienceGrid = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
    display: grid;
    gap: ${space.md};
    grid-template-columns: repeat(3, 1fr);

    ${media.md} { grid-template-columns: 1fr; }
`;

export const AudienceCard = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: ${space.xs};
    padding: clamp(22px, 2.4vw, 30px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    text-decoration: none;
    transition: transform ${motion.base}, box-shadow ${motion.base}, border-color ${motion.base};

    .tag {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
    }

    h3 {
        font-family: ${font.display};
        font-size: 1.6rem;
        font-weight: ${weight.medium};
        color: ${color.ink};
        margin: 0;
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        flex: 1;
    }

    .go {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: ${space.sm};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.primary};
        transition: gap ${motion.fast};
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.lg};
        border-color: ${color.accentLine};
        .go { gap: 12px; }
    }
`;

/* ── Shared section furniture ─────────────────────────────────────────── */

export const SectionHead = styled.div<{ $center?: boolean }>`
    max-width: ${({ $center }) => ($center ? '760px' : 'none')};
    margin-inline: ${({ $center }) => ($center ? 'auto' : '0')};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
    margin-bottom: clamp(36px, 4vw, 56px);
`;

/* ── Steps ────────────────────────────────────────────────────────────── */

export const StepGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    overflow: hidden;

    ${media.md} { grid-template-columns: 1fr; }
`;

export const Step = styled.div`
    padding: clamp(28px, 3vw, 40px);
    border-right: 1px solid ${color.primaryLine};
    display: flex;
    flex-direction: column;

    &:last-child { border-right: none; }

    ${media.md} {
        border-right: none;
        border-bottom: 1px solid ${color.primaryLine};
        &:last-child { border-bottom: none; }
    }
`;

export const StepNumber = styled.span`
    font-family: ${font.display};
    font-size: 3.5rem;
    font-weight: ${weight.light};
    line-height: 1;
    color: ${color.goldOnLight};
    margin-bottom: ${space.sm};
`;

export const StepTitle = styled.h3`
    font-family: ${font.display};
    font-size: 2rem;
    font-weight: ${weight.medium};
    color: ${color.ink};
    margin-bottom: ${space.sm};
`;

export const StepText = styled.p`
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};
    flex: 1;
    margin-bottom: ${space.md};
`;

/* ── Stat band ────────────────────────────────────────────────────────── */

export const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.xl};

    ${media.md} { grid-template-columns: 1fr; gap: ${space.lg}; }
`;

export const StatItem = styled.div`
    padding-left: ${space.lg};
    border-left: 2px solid rgba(224, 160, 63, 0.5);

    .num {
        font-family: ${font.display};
        font-size: clamp(2.5rem, 1.6rem + 3vw, 3.75rem);
        font-weight: ${weight.light};
        line-height: 1;
        color: ${color.goldText};
        letter-spacing: ${tracking.display};
    }

    .text {
        margin-top: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }

    .ref {
        margin-top: ${space.xs};
        font-size: ${type.caption};
        color: ${color.onDarkFaint};
        letter-spacing: ${tracking.wide};
    }
`;

/* ── Product proof ────────────────────────────────────────────────────── */

export const ProofImage = styled.div`
    position: relative;
    border-radius: ${radius.xl};
    overflow: hidden;
    box-shadow: ${shadow.lg};
    border: 1px solid ${color.primaryLine};

    img { width: 100%; display: block; }
`;

export const FeatureList = styled.div`
    display: grid;
    gap: ${space.lg};
`;

export const Feature = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: ${space.md};
    align-items: start;

    .icon {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: ${radius.md};
        background: ${color.primaryWash};
        color: ${color.primary};
    }

    h3 {
        font-family: ${font.body};
        font-size: ${type.base};
        font-weight: ${weight.semibold};
        color: ${color.ink};
        margin: 0 0 4px;
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

export const ProofSplit = styled.div`
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;

    ${media.lg} {
        grid-template-columns: 1fr;
    }
`;

/* ── Organizations teaser ─────────────────────────────────────────────── */

export const OrgBand = styled.section`
    background: ${color.primary};
    padding: clamp(64px, 7vw, 112px) ${space.gutter};
    color: ${color.onDarkMuted};

    h1, h2, h3, h4 { color: ${color.onDark}; }
`;

export const OrgInner = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;

    ${media.md} { grid-template-columns: 1fr; }
`;

export const OrgPoints = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: ${space.md};

    li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: ${space.sm};
        padding: ${space.md} ${space.lg};
        background: rgba(243, 235, 221, 0.06);
        border: 1px solid ${color.onDarkLine};
        border-radius: ${radius.md};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }

    strong { color: ${color.onDark}; font-weight: ${weight.semibold}; }
    svg { color: ${color.gold}; margin-top: 3px; }
`;

/* ── Testimonials ─────────────────────────────────────────────────────── */

export const QuoteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const QuoteCard = styled.figure`
    margin: 0;
    padding: clamp(24px, 2.6vw, 32px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-left: 3px solid ${color.accent};
    border-radius: ${radius.lg};
    display: flex;
    flex-direction: column;
    gap: ${space.md};

    blockquote {
        margin: 0;
        font-family: ${font.display};
        font-size: 1.25rem;
        font-style: italic;
        line-height: ${leading.normal};
        color: ${color.ink};
        flex: 1;
    }

    figcaption {
        font-size: ${type.xs};
        letter-spacing: ${tracking.wide};
        color: ${color.faint};
    }
`;

export const QuoteHead = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${space.md};
    margin-bottom: clamp(32px, 4vw, 48px);
`;

export const StatusFamily = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    font-size: ${type.sm};
    color: ${color.bodyMuted};
`;

/* ── Comparison table ─────────────────────────────────────────────────── */

export const TableWrap = styled.div`
    overflow-x: auto;
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    background: ${color.paperPure};
    -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;
    font-size: ${type.sm};

    th, td {
        padding: 16px 20px;
        text-align: left;
        border-bottom: 1px solid ${color.primaryLine};
        vertical-align: middle;
    }

    thead th {
        font-family: ${font.body};
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.faint};
        background: ${color.primaryWash};
        white-space: nowrap;
    }

    thead th:first-child { width: 34%; }

    thead th.us {
        color: ${color.paperPure};
        background: ${color.primary};
    }

    tbody th {
        font-weight: ${weight.medium};
        color: ${color.ink};
    }

    td.us {
        background: rgba(15, 74, 88, 0.05);
        color: ${color.ink};
        font-weight: ${weight.medium};
    }

    tbody tr:last-child th, tbody tr:last-child td { border-bottom: none; }
`;

export const Yes = styled.span`
    color: ${color.primary};
    font-weight: ${weight.semibold};
`;

export const No = styled.span`
    color: ${color.faint};
`;

/* ── Trust promises ───────────────────────────────────────────────────── */

export const PromiseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.xs} { grid-template-columns: 1fr; }
`;

export const PromiseCard = styled.div`
    .icon {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: ${radius.md};
        background: rgba(224, 160, 63, 0.14);
        color: ${color.gold};
        margin-bottom: ${space.md};
    }

    h3 {
        font-family: ${font.body};
        font-size: ${type.base};
        font-weight: ${weight.semibold};
        color: ${color.onDark};
        margin-bottom: ${space.xs};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }
`;

/* ── Quote break ──────────────────────────────────────────────────────── */

export const PullQuote = styled.section`
    background: ${color.ivoryDeep};
    padding: clamp(64px, 7vw, 104px) ${space.gutter};
    text-align: center;

    blockquote {
        max-width: 900px;
        margin: 0 auto ${space.md};
        font-family: ${font.display};
        font-size: ${type.d3};
        font-style: italic;
        font-weight: ${weight.light};
        line-height: ${leading.snug};
        color: ${color.primary};
    }

    figcaption {
        font-family: ${font.script};
        font-size: 1.5rem;
        color: ${color.accentText};
    }
`;

/* ── FAQ preview ──────────────────────────────────────────────────────── */

export const FaqList = styled.div`
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

/* ── Legacy exports still used by the experience page ─────────────────── */

export const TagRow = styled.div`
    display: flex;
    justify-content: center;
    gap: ${space.sm};
    flex-wrap: wrap;
    padding-top: ${space.xl};
`;

export const Tag = styled.span`
    font-family: ${font.body};
    font-size: ${type.caption};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.body};
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.pill};
    padding: 10px 18px;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${color.primaryLine};
    margin: clamp(36px, 5vw, 56px) 0;
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

export const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    background: ${color.live};
    border-radius: 50%;
    display: inline-block;
    animation: ${pulseDot} 2s infinite;
`;

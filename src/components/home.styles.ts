import styled from 'styled-components';
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
    color: ${color.goldText};
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
        color: ${color.goldText};
    }
`;

export const HeroSub = styled.p`
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
    max-width: 58ch;
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

    svg { color: ${color.goldText}; flex-shrink: 0; }

    ${media.md} { justify-content: center; }
`;

/* ── The four steps of gifting ────────────────────────────────────────── */

export const StepGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    overflow: hidden;

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const Step = styled.div`
    padding: clamp(24px, 2.6vw, 34px);
    border-right: 1px solid ${color.primaryLine};
    display: flex;
    flex-direction: column;

    &:last-child { border-right: none; }

    .who {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
        margin-bottom: ${space.md};
    }

    ${media.lg} {
        border-bottom: 1px solid ${color.primaryLine};
        &:nth-child(2n) { border-right: none; }
        &:nth-last-child(-n + 2) { border-bottom: none; }
    }
    ${media.sm} {
        border-right: none;
        border-bottom: 1px solid ${color.primaryLine};
        &:last-child { border-bottom: none; }
    }
`;

export const StepNumber = styled.span`
    font-family: ${font.display};
    font-size: 3rem;
    font-weight: ${weight.light};
    line-height: 1;
    color: ${color.goldOnLight};
    margin-bottom: ${space.xs};
`;

export const StepTitle = styled.h3`
    font-family: ${font.display};
    font-size: 1.75rem;
    font-weight: ${weight.medium};
    color: ${color.ink};
    margin-bottom: ${space.sm};
`;

export const StepText = styled.p`
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};
    flex: 1;
`;

export const PriceStrip = styled.div`
    margin-top: clamp(28px, 3vw, 40px);
    padding: clamp(22px, 2.6vw, 30px) clamp(24px, 3vw, 40px);
    background: ${color.primaryWash};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${space.lg};

    .amount {
        font-family: ${font.display};
        font-size: clamp(2.25rem, 1.6rem + 2.4vw, 3rem);
        font-weight: ${weight.light};
        line-height: 1;
        letter-spacing: ${tracking.display};
        color: ${color.primary};
    }

    .what {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        max-width: 52ch;
    }

    strong { color: ${color.ink}; font-weight: ${weight.semibold}; }

    ${media.md} {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
`;

/* ── What you actually hand over ──────────────────────────────────────── */

export const HandoverSplit = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;

    ${media.md} { grid-template-columns: 1fr; }
`;

/**
 * The card the buyer prints or forwards. Rendered rather than photographed, so
 * it always matches the current brand and never needs re-shooting.
 */
export const GiftCard = styled.div`
    position: relative;
    background: ${color.primary};
    border-radius: ${radius.xl};
    padding: clamp(28px, 4vw, 48px);
    box-shadow: ${shadow.lg};
    color: ${color.onDarkMuted};
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        height: 8px;
        background: linear-gradient(90deg, ${color.gold} 0%, ${color.accent} 100%);
    }

    .eyebrow {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.goldText};
        margin-bottom: ${space.lg};
    }

    .to {
        font-size: ${type.xs};
        color: ${color.onDarkFaint};
        margin-bottom: 4px;
    }

    .name {
        font-family: ${font.display};
        font-size: clamp(1.75rem, 1.2rem + 2vw, 2.5rem);
        color: ${color.onDark};
        line-height: 1.1;
        margin-bottom: ${space.lg};
    }

    .note {
        font-family: ${font.script};
        font-size: clamp(1.3rem, 1rem + 1.1vw, 1.75rem);
        line-height: 1.35;
        color: ${color.onDark};
        margin-bottom: ${space.xl};
    }

    .link {
        display: inline-flex;
        align-items: center;
        gap: ${space.xs};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.primaryDeep};
        background: ${color.gold};
        border-radius: ${radius.pill};
        padding: 10px 18px;
    }

    .from {
        margin-top: ${space.lg};
        font-size: ${type.xs};
        color: ${color.onDarkFaint};
    }
`;

/* ── Objections ───────────────────────────────────────────────────────── */

export const ObjectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr 1fr; }
    ${media.sm} { grid-template-columns: 1fr; }
`;

export const Objection = styled.div`
    height: 100%;
    padding: clamp(22px, 2.4vw, 30px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};

    .doubt {
        font-family: ${font.display};
        font-size: 1.35rem;
        font-style: italic;
        line-height: ${leading.snug};
        color: ${color.primary};
        margin-bottom: ${space.sm};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

/* ── What everyone gets ───────────────────────────────────────────────── */

export const ProofSplit = styled.div`
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;

    ${media.lg} { grid-template-columns: 1fr; }
`;

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

/* ── Occasions ────────────────────────────────────────────────────────── */

export const TagRow = styled.div`
    display: flex;
    justify-content: center;
    gap: ${space.sm};
    flex-wrap: wrap;
    padding-top: ${space.lg};
`;

export const Tag = styled.a`
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
    text-decoration: none;
    transition: border-color ${motion.fast}, color ${motion.fast}, transform ${motion.fast};

    &:hover {
        border-color: ${color.accentLine};
        color: ${color.accentText};
        transform: translateY(-1px);
    }
`;

/* ── Why this matters ─────────────────────────────────────────────────
 * The stat band that used to sit here argued demographics — 1.4B people over
 * 60, 10K Americans turning 65 a day — which is the same "the window is
 * closing" case every product in this category makes. It now carries the
 * argument the product actually wins on: what goes undocumented is the
 * everyday, and the record is never finished.
 */

export const MattersLead = styled.p`
    max-width: 62ch;
    font-size: clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem);
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
    margin: 0 0 clamp(40px, 4.5vw, 64px);

    em {
        font-style: italic;
        color: ${color.goldText};
    }
`;

export const MattersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.xl};

    ${media.md} { grid-template-columns: 1fr; gap: ${space.lg}; }
`;

export const MatterItem = styled.div`
    padding-left: ${space.lg};
    border-left: 2px solid rgba(224, 160, 63, 0.5);

    h3 {
        font-family: ${font.display};
        font-size: clamp(1.5rem, 1.2rem + 1.1vw, 1.9rem);
        font-weight: ${weight.light};
        line-height: ${leading.snug};
        color: ${color.goldText};
        letter-spacing: ${tracking.display};
        margin: 0;
    }

    p {
        margin-top: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }
`;

/** The line the whole section lands on, set apart from the three columns. */
export const MattersCoda = styled.p`
    margin: clamp(40px, 4.5vw, 64px) 0 0;
    padding-top: clamp(28px, 3vw, 40px);
    border-top: 1px solid ${color.onDarkLine};
    max-width: 68ch;
    font-family: ${font.display};
    font-size: clamp(1.375rem, 1.15rem + 1vw, 1.75rem);
    font-style: italic;
    font-weight: ${weight.light};
    line-height: ${leading.snug};
    color: ${color.onDark};
`;

/* ── Proof, before there is social proof ──────────────────────────────────
 * What stands in for testimonials while the set is unverified. Honesty is the
 * conversion argument here, so it is laid out as a claim plus the evidence
 * for it rather than as an apology.
 */

export const EarlyProof = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(28px, 4vw, 56px);
    align-items: start;
    padding: clamp(26px, 3vw, 40px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-left: 3px solid ${color.accent};
    border-radius: ${radius.lg};

    ${media.md} { grid-template-columns: 1fr; }

    h3 {
        font-family: ${font.display};
        font-size: clamp(1.5rem, 1.2rem + 1.1vw, 1.9rem);
        font-weight: ${weight.medium};
        line-height: ${leading.snug};
        color: ${color.ink};
        margin-bottom: ${space.md};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        margin-bottom: ${space.md};
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: ${space.md};
    }

    li {
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }

    li svg { color: ${color.accentText}; margin-top: 3px; }
    li strong { color: ${color.ink}; font-weight: ${weight.semibold}; }
`;

/* ── The demo, brought onto the landing page ──────────────────────────────
 * It used to live only on /experience, one click away from the page almost
 * everyone lands on — which meant the single most convincing thing about the
 * product was seen by almost nobody.
 */

export const DemoSplit = styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;

    ${media.md} { grid-template-columns: 1fr; }
`;

/** Holds the phone's height while its chunk loads, so nothing jumps. */
export const DemoFallback = styled.div`
    min-height: 520px;
    border-radius: ${radius.xl};
    background: ${color.primaryWash};
    border: 1px solid ${color.primaryLine};
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
    height: 100%;

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
        color: ${color.goldText};
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

/* ── Also-for band ────────────────────────────────────────────────────── */

export const AlsoBand = styled.section`
    background: ${color.paper};
    padding: clamp(48px, 5vw, 72px) ${space.gutter};
    border-top: 1px solid ${color.primaryLine};
`;

export const AlsoGrid = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
    display: grid;
    gap: ${space.md};
    grid-template-columns: 1fr 1fr;

    ${media.md} { grid-template-columns: 1fr; }
`;

export const AlsoCard = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: ${space.xs};
    padding: clamp(22px, 2.4vw, 28px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    text-decoration: none;
    transition: transform ${motion.base}, box-shadow ${motion.base}, border-color ${motion.base};

    h3 {
        font-family: ${font.display};
        font-size: 1.45rem;
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
        margin-top: ${space.xs};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.primary};
        transition: gap ${motion.fast};
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.md};
        border-color: ${color.accentLine};
        .go { gap: 12px; }
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

/* ── Shared section furniture ─────────────────────────────────────────── */

export const SectionHead = styled.div<{ $center?: boolean }>`
    max-width: ${({ $center }) => ($center ? '760px' : 'none')};
    margin-inline: ${({ $center }) => ($center ? 'auto' : '0')};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
    margin-bottom: clamp(36px, 4vw, 56px);
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${color.primaryLine};
    margin: clamp(36px, 5vw, 56px) 0;
`;

/* ── What it actually is ──────────────────────────────────────────────────
 * Journal, autobiography, memoir — the three things A Story is at once, and
 * the reason it is none of them in the usual, finishable sense. Added when
 * the site was found to be arguing "not a memoir to finish" without ever
 * saying what it is instead.
 */

export const RolesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.lg} { grid-template-columns: 1fr; }
`;

export const RoleCard = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: clamp(24px, 2.8vw, 34px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};

    .when {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
        margin-bottom: ${space.md};
        /* It is a <p>, so the "p { flex: 1 }" below would otherwise let the
           eyebrow absorb slack and push each title to a different height. */
        flex: none;
    }

    h3 {
        font-family: ${font.display};
        font-size: 1.7rem;
        font-weight: ${weight.medium};
        line-height: ${leading.snug};
        color: ${color.ink};
        margin-bottom: ${space.sm};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        flex: 1;
    }

    .never {
        display: block;
        margin-top: ${space.md};
        padding-top: ${space.md};
        border-top: 1px solid ${color.primaryLine};
        font-family: ${font.display};
        font-style: italic;
        font-size: 1.0625rem;
        line-height: 1.45;
        color: ${color.primary};
    }
`;

export const RolesCoda = styled.p`
    margin-top: clamp(28px, 3.5vw, 40px);
    max-width: 68ch;
    font-family: ${font.display};
    font-size: clamp(1.35rem, 1.05rem + 1.1vw, 1.85rem);
    font-style: italic;
    font-weight: ${weight.light};
    line-height: ${leading.snug};
    color: ${color.primary};
`;

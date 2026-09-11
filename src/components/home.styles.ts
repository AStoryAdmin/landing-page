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
 * What the three parties actually do.
 *
 * This replaced a rendered gift card — a dark slab with a handwritten note and
 * a gold "Start whenever you like" pill on it. It was the best-looking thing on
 * the page and it was describing an artefact that does not exist: there is no
 * gift-card anything in the app, no code to redeem, nothing to print and
 * nothing that arrives in an envelope. What a buyer really hands over is an
 * archive somebody else already set up, so that is what this says instead.
 */
export const HandoverSteps = styled.ol`
    display: grid;
    gap: ${space.sm};
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: handover;

    li {
        counter-increment: handover;
        position: relative;
        padding: clamp(18px, 2vw, 24px) clamp(20px, 2.2vw, 28px) clamp(18px, 2vw, 24px) 68px;
        background: ${color.paperPure};
        border: 1px solid ${color.primaryLine};
        border-radius: ${radius.lg};
    }

    li::before {
        content: counter(handover);
        position: absolute;
        left: clamp(20px, 2.2vw, 28px);
        top: clamp(18px, 2vw, 24px);
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border-radius: ${radius.pill};
        background: ${color.primaryWash};
        font-family: ${font.display};
        font-size: 1rem;
        color: ${color.primary};
    }

    b {
        display: block;
        margin-bottom: 4px;
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
    }

    span {
        display: block;
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.body};
    }
`;

/**
 * The line under the three demo phones. It carries the two numbers that make
 * the reel checkable — the size of the question bank and the number of
 * chapters, both read from ../lib/product rather than typed here — and the
 * one-line promise of what a call leaves behind.
 */
export const DemoCoda = styled.div`
    max-width: 62ch;
    margin: clamp(36px, 4vw, 56px) auto 0;
    text-align: center;

    p {
        margin: 0 0 ${space.lg};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
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
 *
 * There were a copy column and one phone side by side here (DemoSplit). There
 * are now three phones in a row under centred copy, and the grid that arranges
 * them lives beside the phone it arranges — see ReelGrid in demoPhone.styles.
 */

/** Holds a phone's height while its chunk loads, so nothing jumps. */
export const DemoFallback = styled.div`
    width: 100%;
    max-width: 330px;
    /* Matches PhoneContainer exactly, or the three-across row reflows the
       moment the real phones arrive. */
    aspect-ratio: 330 / 660;
    border-radius: 42px;
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

/* ── Who else can write in it ─────────────────────────────────────────────
 * Three access tiers, and they are the app's real ones (supabase/collaborators
 * .sql and contributions.sql): the owner, an invited manager who can read and
 * edit the shared story, and anyone holding the contribute link, whose
 * submissions queue until a manager approves them. Written as a ladder rather
 * than a grid of equals, because the interesting part is that the rights
 * differ — "the whole family can add to it" is only reassuring once you can
 * see that nobody can quietly rewrite you.
 */
export const AccessList = styled.ol`
    display: grid;
    gap: ${space.md};
    counter-reset: tier;
    margin: 0;
    padding: 0;
    list-style: none;
`;

export const AccessRow = styled.li`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: clamp(14px, 1.6vw, 22px);
    padding: clamp(18px, 2vw, 26px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};

    .who {
        display: grid;
        gap: 2px;
        min-width: clamp(96px, 11vw, 132px);
    }

    .name {
        font-family: ${font.display};
        font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.3rem);
        font-weight: ${weight.medium};
        color: ${color.ink};
        line-height: ${leading.snug};
    }

    .can {
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.eyebrow};
        text-transform: uppercase;
        color: ${color.accentText};
    }

    p {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
        margin: 0;
    }

    ${media.md} {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;

/* The argument that a life does not need its owner present to be recorded.
   Deliberately a single dark band rather than a card in a grid — it is the one
   claim on this page that changes who the product is for. */
export const AboutSomeoneElse = styled.div`
    margin-top: clamp(32px, 4vw, 48px);
    padding: clamp(28px, 3.4vw, 48px);
    background: ${color.primaryDeep};
    border-radius: ${radius.lg};
    color: ${color.onDark};

    /* Two columns on wide screens: at one column the measure caps around 62ch
       and the right half of a full-bleed band sits empty. */
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(20px, 3vw, 56px);
    align-items: start;

    ${media.lg} { grid-template-columns: 1fr; }

    h3 {
        font-family: ${font.display};
        font-weight: ${weight.light};
        font-size: clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem);
        line-height: ${leading.snug};
        color: ${color.onDark};
        margin: 0 0 14px;
        max-width: 22ch;
    }

    .body { display: grid; gap: 12px; }

    p {
        font-size: ${type.base};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
        max-width: 62ch;
        margin: 0;
    }

    em {
        font-style: normal;
        color: ${color.goldText};
    }
`;

/* ── One archive, six weeks in ────────────────────────────────────────────
 * The page used to go from the demo straight into a feature list: "a card you
 * can read in a minute", "voice highlights, kept as audio", "everyone who was
 * in the room". All true, all abstract, and a visitor scrolling past learns
 * nothing they could not have guessed from the name of the product.
 *
 * This is that list made specific. It is Joan's archive — the third demo call
 * — six weeks after the first conversation, with the actual voice highlight,
 * the actual contributions from her son and her niece, and the actual state of
 * the book. Everyone in it is invented, and the section says so.
 */
export const ArchivePanel = styled.div`
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.xl};
    overflow: hidden;
    box-shadow: ${shadow.lg};
`;

export const ArchiveHead = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${space.lg};
    flex-wrap: wrap;
    padding: clamp(20px, 2.4vw, 28px) clamp(20px, 2.6vw, 32px);
    background: ${color.primaryDeep};
    color: ${color.onDark};

    .who {
        margin: 0;
        font-family: ${font.display};
        font-size: clamp(1.4rem, 1.1rem + 1vw, 1.9rem);
        line-height: 1.15;
    }

    .sub {
        margin: 4px 0 0;
        font-size: ${type.xs};
        color: ${color.onDarkMuted};
    }
`;

export const ArchiveStats = styled.dl`
    display: flex;
    gap: clamp(16px, 2.4vw, 34px);
    margin: 0;
    flex-wrap: wrap;

    dt {
        font-family: ${font.display};
        font-size: clamp(1.3rem, 1.1rem + 0.7vw, 1.7rem);
        line-height: 1;
        color: ${color.goldText};
    }

    dd {
        margin: 5px 0 0;
        font-size: ${type.caption};
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${color.onDarkMuted};
    }
`;

export const ArchiveBody = styled.div`
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;

    ${media.md} { grid-template-columns: 1fr; }
`;

export const ArchiveFeed = styled.div`
    padding: clamp(20px, 2.4vw, 30px);
    border-right: 1px solid ${color.primaryLine};

    ${media.md} { border-right: none; border-bottom: 1px solid ${color.primaryLine}; }
`;

export const FeedLabel = styled.p`
    margin: 0 0 ${space.md};
    font-size: ${type.caption};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.accentText};
`;

export const FeedItem = styled.div`
    display: flex;
    gap: ${space.sm};
    padding: ${space.md} 0;

    & + & { border-top: 1px solid ${color.primaryLine}; }

    .icon {
        flex-shrink: 0;
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border-radius: ${radius.pill};
        background: ${color.primaryWash};
        color: ${color.primary};
    }

    .who {
        margin: 0 0 2px;
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.ink};
    }

    .what {
        margin: 0;
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.body};
    }

    .said {
        margin: 7px 0 0;
        padding-left: 10px;
        border-left: 2px solid ${color.accentLine};
        font-family: ${font.display};
        font-size: 1rem;
        font-style: italic;
        line-height: 1.5;
        color: ${color.ink};
    }

    .when {
        margin: 6px 0 0;
        font-size: ${type.caption};
        color: ${color.bodyMuted};
    }
`;

export const FeedTier = styled.span`
    display: inline-block;
    margin-left: 6px;
    padding: 1px 7px;
    border-radius: ${radius.pill};
    border: 1px solid ${color.primaryLine};
    font-size: 0.6875rem;
    font-weight: ${weight.semibold};
    color: ${color.bodyMuted};
    vertical-align: 1px;
`;

/* ── The voice highlight, shown rather than played ────────────────────────
 * There is no play button here on purpose. A control that looks like audio
 * and makes no sound is a bug to everybody who presses it, and the clip that
 * would matter belongs to a family rather than to a marketing page. So the
 * card shows what a highlight is — its length, its shape and the words in it,
 * with the pause marked where the pause is the point — and says plainly where
 * the sound itself lives.
 */
export const ClipPanel = styled.div`
    padding: clamp(20px, 2.4vw, 30px);
    background: ${color.ivory};
`;

export const ClipCard = styled.figure`
    margin: 0;
    padding: clamp(16px, 2vw, 22px);
    background: ${color.primaryDeep};
    border-radius: ${radius.lg};
    color: ${color.onDark};

    .head {
        display: flex;
        align-items: center;
        gap: ${space.xs};
        margin-bottom: ${space.md};
        font-size: ${type.caption};
        font-weight: ${weight.bold};
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${color.goldText};
    }

    .dur {
        margin-left: auto;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0;
        color: ${color.onDarkMuted};
    }
`;

export const ClipWave = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    height: 46px;
    margin-bottom: ${space.md};

    i {
        flex: 1;
        min-width: 2px;
        border-radius: 2px;
        background: ${color.gold};
        opacity: 0.72;
    }
`;

export const ClipWords = styled.blockquote`
    margin: 0;
    font-family: ${font.display};
    font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem);
    font-style: italic;
    line-height: 1.5;
    color: ${color.onDark};

    .beat {
        display: block;
        margin: 8px 0;
        font-family: ${font.body};
        font-size: ${type.caption};
        font-style: normal;
        letter-spacing: ${tracking.wide};
        text-transform: uppercase;
        color: ${color.goldText};
    }
`;

export const ClipNote = styled.figcaption`
    margin-top: ${space.md};
    padding-top: ${space.md};
    border-top: 1px solid ${color.onDarkLine};
    font-size: ${type.xs};
    line-height: ${leading.normal};
    color: ${color.onDarkMuted};
`;

export const ArchiveFoot = styled.p`
    margin: 0;
    padding: ${space.md} clamp(20px, 2.6vw, 32px);
    border-top: 1px solid ${color.primaryLine};
    background: ${color.ivory};
    font-size: ${type.caption};
    line-height: ${leading.normal};
    color: ${color.bodyMuted};
`;

/* ── Nothing to learn ─────────────────────────────────────────────────────
 * The commonest way a gift like this dies is that the person receiving it
 * decides, before trying, that it is not for them. So the answer has to be
 * concrete about how little there is to do — and honest that there is an app.
 * It is installed once, by somebody else, and after that the phone rings on
 * its own and they answer it.
 */
export const EasyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.md} { grid-template-columns: 1fr; }
`;

export const EasyCard = styled.div`
    padding: clamp(22px, 2.4vw, 30px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};

    h3 {
        margin: 0 0 ${space.xs};
        font-family: ${font.display};
        font-size: 1.3rem;
        font-weight: ${weight.medium};
        color: ${color.ink};
    }

    p {
        margin: 0;
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.body};
    }

    .num {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        margin-bottom: ${space.sm};
        border-radius: ${radius.pill};
        background: ${color.primaryWash};
        font-family: ${font.display};
        font-size: 1.05rem;
        color: ${color.primary};
    }
`;

export const EasyNote = styled.div`
    max-width: 70ch;
    margin: clamp(28px, 3vw, 40px) auto 0;
    padding: clamp(18px, 2vw, 24px);
    border: 1px solid ${color.accentLine};
    border-radius: ${radius.lg};
    background: ${color.accentWash};
    text-align: center;

    p {
        margin: 0;
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.body};
    }

    strong { color: ${color.accentText}; font-weight: ${weight.semibold}; }
`;

/* The eleven chapters, with the six Joan has begun marked. It sits under the
   voice clip because the clip alone left the column half empty, and because
   "six of eleven, and nobody is behind" is the honest shape of an archive in
   its second month — this is a thing you keep, not a form you complete. */
export const ChapterRail = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: ${space.md} 0 0;
    padding: 0;
    list-style: none;
`;

export const ChapterPip = styled.li<{ $on?: boolean }>`
    padding: 4px 10px;
    border-radius: ${radius.pill};
    font-size: ${type.caption};
    font-weight: ${weight.medium};
    border: 1px solid ${({ $on }) => ($on ? 'transparent' : color.primaryLine)};
    background: ${({ $on }) => ($on ? color.primaryWash : 'transparent')};
    color: ${({ $on }) => ($on ? color.primary : color.bodyMuted)};
`;

/** The line under the chapter rail. On the light panel, not the dark clip. */
export const RailNote = styled.p`
    margin: ${space.sm} 0 0;
    font-size: ${type.caption};
    line-height: ${leading.normal};
    color: ${color.bodyMuted};
`;

/** Same as FeedLabel, with the gap the second block in a column needs. */
export const RailLabel = styled(FeedLabel)`
    margin-top: clamp(24px, 2.6vw, 32px);
`;

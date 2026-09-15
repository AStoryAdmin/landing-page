import styled from 'styled-components';
import { color, font, layout, leading, media, radius, shadow, space, tracking, type, weight } from '../styles/theme';

/**
 * /start — the page the buttons go to.
 *
 * One job, and the layout says so: the form is beside the headline, above the
 * fold, on the first screen. Everything under it is there to answer the two
 * questions somebody asks with their hand already on the keyboard — what
 * happens next, and what does it cost — and nothing under it is another
 * decision to make.
 *
 * This is also the page paid traffic lands on, which is why it repeats the
 * argument rather than linking to it. A visitor from an ad has not read the
 * home page and is not going to.
 */

export const Page = styled.main`
    background: ${color.ivory};
`;

export const Top = styled.section`
    padding: clamp(48px, 6vw, 88px) ${space.gutter} clamp(40px, 5vw, 72px);
    background: ${color.primaryDeep};
`;

export const TopInner = styled.div`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: start;

    ${media.lg} { grid-template-columns: 1fr; }
`;

export const Pitch = styled.div`
    color: ${color.onDark};
`;

export const Kicker = styled.p`
    margin: 0 0 ${space.md};
    font-size: ${type.caption};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.goldText};
`;

export const Headline = styled.h1`
    margin: 0 0 ${space.lg};
    font-family: ${font.display};
    font-size: clamp(2.4rem, 1.7rem + 3vw, 3.8rem);
    font-weight: ${weight.light};
    line-height: ${leading.tight};
    letter-spacing: ${tracking.display};
    color: ${color.onDark};

    em { font-style: italic; color: ${color.goldText}; }
`;

export const Sub = styled.p`
    margin: 0 0 ${space.xl};
    max-width: 52ch;
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
`;

/** The proof that has to be on the first screen, because an ad click has seen nothing. */
export const ProofQuote = styled.blockquote`
    margin: 0 0 ${space.lg};
    padding: clamp(18px, 2vw, 24px);
    border-left: 3px solid ${color.gold};
    border-radius: 0 ${radius.md} ${radius.md} 0;
    background: rgba(255, 255, 255, 0.05);

    p {
        margin: 0 0 ${space.xs};
        font-family: ${font.display};
        font-size: clamp(1.15rem, 1rem + 0.6vw, 1.45rem);
        font-style: italic;
        line-height: 1.45;
        color: ${color.onDark};
    }

    cite {
        font-style: normal;
        font-size: ${type.caption};
        font-weight: ${weight.semibold};
        letter-spacing: ${tracking.wide};
        color: ${color.goldText};
    }
`;

export const Points = styled.ul`
    display: grid;
    gap: ${space.sm};
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        display: flex;
        align-items: flex-start;
        gap: ${space.xs};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.onDarkMuted};
    }

    svg { flex-shrink: 0; margin-top: 2px; color: ${color.goldText}; }
    strong { color: ${color.onDark}; font-weight: ${weight.semibold}; }
`;

export const FormCard = styled.div`
    padding: clamp(24px, 2.8vw, 36px);
    border-radius: ${radius.xl};
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${color.onDarkLine};
    box-shadow: ${shadow.lg};

    ${media.lg} { max-width: 640px; }
`;

export const FormHead = styled.div`
    margin-bottom: ${space.lg};

    h2 {
        margin: 0 0 6px;
        font-family: ${font.display};
        font-size: clamp(1.5rem, 1.2rem + 1vw, 1.95rem);
        font-weight: ${weight.medium};
        color: ${color.onDark};
    }

    p {
        margin: 0;
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.onDarkMuted};
    }
`;

/* ── Below the fold: the two questions, answered ──────────────────────── */

export const Band = styled.section<{ $tone?: 'ivory' | 'paper' }>`
    padding: clamp(48px, 5vw, 80px) ${space.gutter};
    background: ${({ $tone }) => ($tone === 'paper' ? color.paper : color.ivory)};
`;

export const BandInner = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
`;

export const BandHead = styled.div`
    max-width: 62ch;
    margin: 0 auto clamp(28px, 3vw, 44px);
    text-align: center;

    h2 {
        margin: 0 0 ${space.sm};
        font-family: ${font.display};
        font-size: clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem);
        font-weight: ${weight.light};
        line-height: ${leading.snug};
        color: ${color.ink};
    }

    em { font-style: italic; color: ${color.accentText}; }

    p {
        margin: 0;
        font-size: ${type.base};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

export const ThreeUp = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};

    ${media.md} { grid-template-columns: 1fr; }
`;

export const Beat = styled.div`
    padding: clamp(22px, 2.4vw, 30px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};

    .n {
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
`;

/* ── What it costs, without a pricing table ───────────────────────────── */

export const CostCard = styled.div`
    max-width: 760px;
    margin-inline: auto;
    padding: clamp(26px, 3vw, 40px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.xl};
    text-align: center;
`;

export const CostRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: ${space.sm};
    flex-wrap: wrap;
    margin-bottom: ${space.md};

    .amount {
        font-family: ${font.display};
        font-size: clamp(2.6rem, 2rem + 2.6vw, 3.6rem);
        font-weight: ${weight.light};
        line-height: 1;
        letter-spacing: ${tracking.display};
        color: ${color.primary};
    }

    .per {
        font-size: ${type.base};
        color: ${color.bodyMuted};
    }
`;

export const Anchor = styled.p`
    max-width: 56ch;
    margin: 0 auto ${space.lg};
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.body};

    strong { color: ${color.ink}; font-weight: ${weight.semibold}; }
`;

export const Split = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.sm};
    margin: 0 0 ${space.lg};
    padding: 0;
    list-style: none;

    li {
        padding: ${space.md};
        border-radius: ${radius.md};
        background: ${color.primaryWash};
        font-size: ${type.caption};
        line-height: ${leading.normal};
        color: ${color.body};
    }

    b {
        display: block;
        margin-bottom: 2px;
        font-family: ${font.display};
        font-size: 1.35rem;
        font-weight: ${weight.medium};
        color: ${color.primary};
    }

    ${media.sm} { grid-template-columns: 1fr; }
`;

export const FineNote = styled.p`
    margin: 0;
    font-size: ${type.caption};
    line-height: ${leading.normal};
    color: ${color.bodyMuted};

    a { color: ${color.accentText}; }
`;

/* ── The last ask ─────────────────────────────────────────────────────── */

export const Closer = styled.section`
    padding: clamp(48px, 5vw, 84px) ${space.gutter};
    background: ${color.primary};
    text-align: center;
`;

export const CloserInner = styled.div`
    max-width: 640px;
    margin-inline: auto;

    h2 {
        margin: 0 0 ${space.sm};
        font-family: ${font.display};
        font-size: clamp(1.9rem, 1.5rem + 1.8vw, 2.8rem);
        font-weight: ${weight.light};
        line-height: ${leading.snug};
        color: ${color.onDark};
    }

    em { font-style: italic; color: ${color.goldText}; }

    > p {
        margin: 0 0 ${space.xl};
        font-size: ${type.base};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }
`;

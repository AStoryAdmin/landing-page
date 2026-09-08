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

/* ── The three packages ───────────────────────────────────────────────────
 * One card per capture window. The middle one is the default, so it carries
 * the emphasis rather than sitting between two louder neighbours.
 */

export const PlanGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};
    align-items: stretch;

    ${media.lg} { grid-template-columns: 1fr; max-width: 560px; margin-inline: auto; }
`;

export const PlanCard = styled.div<{ $featured?: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(26px, 2.8vw, 36px);
    border-radius: ${radius.lg};
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    transition: transform ${motion.base}, box-shadow ${motion.base};

    &:hover { transform: translateY(-2px); box-shadow: ${shadow.md}; }

    ${({ $featured }) =>
        $featured &&
        `
        border-color: ${color.accentLine};
        border-width: 2px;
        box-shadow: ${shadow.md};
    `}
`;

/** Marks the default choice. Text, not just a colour, so it survives greyscale. */
export const PlanBadge = styled.p`
    align-self: flex-start;
    font-size: ${type.caption};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.paperPure};
    background: ${color.accent};
    border-radius: ${radius.pill};
    padding: 4px 12px;
    margin-bottom: ${space.md};
`;

/** Keeps the unbadged cards level with the badged one. */
export const PlanBadgeSpacer = styled.div`
    height: 0;

    @media (min-width: 1025px) {
        height: calc(1em * 1.2 + 8px + ${space.md});
    }
`;

export const PlanName = styled.h3`
    font-family: ${font.display};
    font-size: clamp(1.5rem, 1.2rem + 0.9vw, 1.85rem);
    font-weight: ${weight.medium};
    line-height: ${leading.snug};
    color: ${color.ink};
`;

export const PlanWho = styled.p`
    margin-top: ${space.xs};
    font-size: ${type.sm};
    line-height: ${leading.normal};
    color: ${color.bodyMuted};

    /*
     * Side by side these run to one line or two depending on the plan, which
     * left the three prices at three different heights. Reserving two lines
     * keeps the row level; below the breakpoint the cards stack and it stops
     * mattering.
     */
    @media (min-width: 1025px) {
        min-height: calc(2 * ${leading.normal} * ${type.sm});
    }
`;

export const PlanPrice = styled.p`
    margin-top: ${space.lg};
    display: flex;
    align-items: baseline;
    gap: ${space.sm};
    flex-wrap: wrap;

    .amount {
        font-family: ${font.display};
        font-size: clamp(2.75rem, 1.9rem + 3vw, 3.75rem);
        font-weight: ${weight.light};
        line-height: 1;
        letter-spacing: ${tracking.display};
        color: ${color.primary};
    }

    .window {
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.accentText};
    }
`;

/** The one metered thing, given its own box so it cannot be missed. */
export const PlanMeter = styled.div`
    margin-top: ${space.lg};
    padding: ${space.md};
    background: ${color.primaryWash};
    border-radius: ${radius.md};

    .meter {
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.ink};
    }

    .note {
        margin-top: 4px;
        font-size: ${type.xs};
        line-height: ${leading.normal};
        color: ${color.bodyMuted};
    }
`;

export const PlanBlurb = styled.p`
    margin-top: ${space.md};
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.bodyMuted};
    flex: 1;
`;

/** The forever promise, repeated on every card because it sells all three. */
export const PlanKeeps = styled.p`
    margin-top: ${space.md};
    padding-top: ${space.md};
    border-top: 1px dashed ${color.primaryLine};
    font-size: ${type.xs};
    line-height: ${leading.relaxed};
    color: ${color.accentText};
`;

export const PlanAction = styled.div`
    margin-top: ${space.lg};

    a { width: 100%; justify-content: center; }
`;

/* ── What a buyer needs to know at the moment they decide ─────────────── */

export const Reassure = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.lg};
    margin-top: clamp(32px, 4vw, 48px);
    padding-top: clamp(28px, 3vw, 40px);
    border-top: 1px solid ${color.primaryLine};

    ${media.md} { grid-template-columns: 1fr; gap: ${space.md}; }

    > div {
        display: grid;
        grid-template-columns: 20px 1fr;
        gap: ${space.sm};
    }

    svg { color: ${color.accentText}; margin-top: 3px; }

    .t {
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.ink};
    }

    .d {
        margin-top: 2px;
        font-size: ${type.xs};
        line-height: ${leading.relaxed};
        color: ${color.bodyMuted};
    }
`;

/* ── Buy once, keep it forever ────────────────────────────────────────── */

export const ForeverBand = styled.div`
    background: ${color.primaryDeep};
    border-radius: ${radius.xl};
    padding: clamp(32px, 4vw, 56px);
    /*
     * The heading inside inherits rather than carrying its own colour, so the
     * band has to set one. Without this it picks up Charcoal from the global
     * heading rule and fails contrast on the deep ground.
     */
    color: ${color.onDark};
`;

export const ForeverLead = styled.p`
    max-width: 60ch;
    margin-top: ${space.md};
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};
`;

export const ForeverList = styled.ul`
    list-style: none;
    margin: clamp(28px, 3vw, 40px) 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${space.sm} ${space.lg};

    li {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.normal};
        color: ${color.onDark};
    }

    li svg { color: ${color.goldText}; margin-top: 3px; }

    ${media.sm} { grid-template-columns: 1fr; }
`;

/** The single thing that stops. Stated plainly rather than buried. */
export const ForeverStops = styled.p`
    margin-top: clamp(28px, 3vw, 40px);
    padding-top: ${space.lg};
    border-top: 1px solid ${color.onDarkLine};
    max-width: 68ch;
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${color.onDarkMuted};

    strong { color: ${color.onDark}; font-weight: ${weight.semibold}; }
`;

/* ── The book, priced on its own ──────────────────────────────────────── */

export const BookSplit = styled.div`
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(28px, 4vw, 56px);
    align-items: center;

    ${media.md} { grid-template-columns: 1fr; }
`;

export const BookPrices = styled.div`
    display: grid;
    gap: ${space.md};
`;

export const BookPrice = styled.div`
    padding: ${space.lg};
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-left: 3px solid ${color.gold};
    border-radius: ${radius.lg};

    .amount {
        font-family: ${font.display};
        font-size: clamp(1.9rem, 1.5rem + 1.4vw, 2.5rem);
        font-weight: ${weight.light};
        line-height: 1;
        color: ${color.primary};
    }

    .what {
        margin-top: ${space.xs};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.ink};
    }

    .detail {
        margin-top: 4px;
        font-size: ${type.xs};
        line-height: ${leading.normal};
        color: ${color.bodyMuted};
    }
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

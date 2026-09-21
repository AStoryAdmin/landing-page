import styled from 'styled-components';
import {
    color,
    font,
    layout,
    leading,
    media,
    motion,
    radius,
    space,
    tracking,
    type,
    weight,
} from '../../styles/theme';

/**
 * Layout furniture shared by the terms and privacy pages: a plain-English
 * summary panel and a contents rail that sticks beside the text on desktop.
 */

export const SummaryPanel = styled.aside`
    background: ${color.primary};
    color: ${color.onDarkMuted};
    border-radius: ${radius.xl};
    padding: clamp(26px, 3vw, 40px);
    margin-bottom: clamp(40px, 5vw, 64px);

    h2 {
        font-family: ${font.display};
        font-size: 1.75rem;
        font-weight: ${weight.medium};
        color: ${color.onDark};
        margin-bottom: ${space.xs};
    }

    p.intro {
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
        max-width: 62ch;
        margin-bottom: ${space.lg};
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${space.md} clamp(24px, 3vw, 48px);
    }

    li {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: ${space.sm};
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${color.onDarkMuted};
    }

    li svg {
        color: ${color.goldText};
        margin-top: 4px;
    }
    li strong {
        color: ${color.onDark};
        font-weight: ${weight.semibold};
    }

    p.caveat {
        margin-top: ${space.lg};
        padding-top: ${space.md};
        border-top: 1px solid ${color.onDarkLine};
        font-size: ${type.caption};
        line-height: ${leading.normal};
        color: ${color.onDarkFaint};
    }

    ${media.md} {
        ul {
            grid-template-columns: 1fr;
        }
    }
`;

/* ── Two-column reading layout with a sticky contents rail ────────────── */

export const LegalLayout = styled.div`
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);

    /* The prose keeps a readable measure; the rail sits outside it. */
    > div {
        max-width: 720px;
    }
    gap: clamp(32px, 5vw, 72px);
    align-items: start;
    max-width: ${layout.maxWidth};
    margin-inline: auto;

    ${media.lg} {
        grid-template-columns: 1fr;
    }
`;

export const TocRail = styled.nav`
    position: sticky;
    /* Clears the fixed header, whose height the navbar publishes. */
    top: calc(var(--nav-total, 108px) + 24px);
    max-height: calc(100vh - var(--nav-total, 108px) - 48px);
    overflow-y: auto;
    padding-right: ${space.xs};

    ${media.lg} {
        position: static;
        max-height: none;
        overflow: visible;
        background: ${color.paper};
        border: 1px solid ${color.primaryLine};
        border-radius: ${radius.lg};
        padding: ${space.lg};
        margin-bottom: ${space.xxl};
    }
`;

export const TocHeading = styled.p`
    font-size: ${type.caption};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.faint};
    margin-bottom: ${space.md};
`;

export const TocItems = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    counter-reset: toc;
`;

export const TocEntry = styled.li<{ $active: boolean }>`
    counter-increment: toc;

    a {
        display: block;
        padding: 11px 12px 11px 14px;
        min-height: 44px;
        border-left: 2px solid
            ${({ $active }) => ($active ? color.accent : color.primaryLine)};
        font-size: ${type.xs};
        line-height: 1.45;
        text-decoration: none;
        color: ${({ $active }) => ($active ? color.ink : color.bodyMuted)};
        font-weight: ${({ $active }) => ($active ? weight.semibold : weight.regular)};
        transition:
            color ${motion.fast},
            border-color ${motion.fast},
            background ${motion.fast};
    }

    a::before {
        content: counter(toc) '. ';
        color: ${color.faint};
    }

    a:hover {
        color: ${color.primary};
        background: ${color.primaryWash};
    }
`;

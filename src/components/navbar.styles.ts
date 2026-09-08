import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { color, font, layout, media, motion, radius, shadow, space, tracking, type, weight } from '../styles/theme';

export const NavShell = styled.header<{ $solid: boolean }>`
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 100;
    transition: background ${motion.base}, box-shadow ${motion.base}, backdrop-filter ${motion.base};

    ${({ $solid }) =>
        $solid
            ? css`
                  background: rgba(250, 245, 236, 0.92);
                  backdrop-filter: saturate(160%) blur(14px);
                  box-shadow: ${shadow.nav};
              `
            : css`
                  background: transparent;
                  box-shadow: none;
              `}
`;

export const NavInner = styled.nav`
    max-width: ${layout.maxWidthWide};
    margin-inline: auto;
    min-height: ${layout.navHeight};
    padding: 12px ${space.gutter};
    display: flex;
    align-items: center;
    gap: ${space.lg};
`;

export const NavSpacer = styled.div`
    margin-left: auto;
`;

/* ── Desktop links ────────────────────────────────────────────────────── */

export const NavLinks = styled.div<{ $open: boolean }>`
    display: flex;
    align-items: center;
    gap: 4px;

    ${media.md} {
        display: ${({ $open }) => ($open ? 'flex' : 'none')};
        position: fixed;
        top: var(--nav-total, ${layout.navHeight});
        left: 0;
        right: 0;
        bottom: 0;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: ${space.md} ${space.gutter} 40px;
        background: ${color.paper};
        border-top: 1px solid ${color.primaryLine};
        overflow-y: auto;
        overscroll-behavior: contain;
    }
`;

const navItem = css`
    font-family: ${font.body};
    font-size: ${type.sm};
    font-weight: ${weight.medium};
    letter-spacing: 0.01em;
    color: ${color.body};
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    padding: 10px 14px;
    border-radius: ${radius.pill};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color ${motion.fast}, background ${motion.fast};
    white-space: nowrap;

    &:hover { color: ${color.primary}; background: rgba(15, 74, 88, 0.06); }

    ${media.md} {
        width: 100%;
        justify-content: space-between;
        padding: 16px 4px;
        font-size: 1.0625rem;
        border-radius: 0;
        border-bottom: 1px solid ${color.primaryLine};
        &:hover { background: none; }
    }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
    ${navItem};
    color: ${({ $active }) => ($active ? color.primary : color.body)};
    font-weight: ${({ $active }) => ($active ? weight.semibold : weight.medium)};
`;

export const NavButton = styled.button<{ $open?: boolean }>`
    ${navItem};

    svg {
        transition: transform ${motion.fast};
        transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    }
`;

/* ── Dropdown ─────────────────────────────────────────────────────────── */

export const NavGroup = styled.div`
    position: relative;

    ${media.md} {
        width: 100%;
    }
`;

export const Dropdown = styled.div<{ $open: boolean }>`
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(${({ $open }) => ($open ? '0' : '-6px')});
    width: 340px;
    padding: 10px;
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    box-shadow: ${shadow.lg};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition: opacity ${motion.fast}, transform ${motion.fast}, visibility ${motion.fast};
    display: flex;
    flex-direction: column;
    gap: 2px;

    ${media.md} {
        position: static;
        transform: none;
        width: 100%;
        opacity: 1;
        visibility: visible;
        display: ${({ $open }) => ($open ? 'flex' : 'none')};
        border: none;
        box-shadow: none;
        background: transparent;
        padding: 4px 0 12px;
        border-bottom: 1px solid ${color.primaryLine};
    }
`;

export const DropdownItem = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 12px 14px;
    border-radius: ${radius.md};
    text-decoration: none;
    transition: background ${motion.fast};

    strong {
        font-family: ${font.body};
        font-size: ${type.sm};
        font-weight: ${weight.semibold};
        color: ${color.ink};
    }

    span {
        font-size: ${type.caption};
        line-height: 1.45;
        color: ${color.faint};
    }

    &:hover {
        background: ${color.primaryWash};
        strong { color: ${color.primary}; }
    }
`;

/* ── Actions ──────────────────────────────────────────────────────────── */

export const NavActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${space.xs};
    margin-left: ${space.sm};

    ${media.md} {
        display: none;
    }
`;

export const NavGhost = styled(Link)`
    font-family: ${font.body};
    font-size: ${type.sm};
    font-weight: ${weight.semibold};
    color: ${color.primary};
    text-decoration: none;
    padding: 10px 14px;
    border-radius: ${radius.pill};
    white-space: nowrap;
    transition: background ${motion.fast};
    &:hover { background: rgba(15, 74, 88, 0.08); }

    ${media.lg} {
        display: none;
    }
`;

export const NavCta = styled(Link)`
    font-family: ${font.body};
    font-size: ${type.sm};
    font-weight: ${weight.semibold};
    letter-spacing: 0.02em;
    color: ${color.paperPure};
    background: ${color.accent};
    border: 1.5px solid ${color.accent};
    padding: 11px 22px;
    border-radius: ${radius.pill};
    text-decoration: none;
    white-space: nowrap;
    box-shadow: ${shadow.sm};
    transition: background ${motion.base}, border-color ${motion.base}, transform ${motion.fast};

    &:hover {
        background: ${color.accentHover};
        border-color: ${color.accentHover};
        transform: translateY(-1px);
    }
`;

/** The same pill as NavCta, for the mailto conversion links. */
export const NavCtaAnchor = styled.a`
    font-family: ${font.body};
    font-size: ${type.sm};
    font-weight: ${weight.semibold};
    letter-spacing: 0.02em;
    color: ${color.paperPure};
    background: ${color.accent};
    border: 1.5px solid ${color.accent};
    padding: 11px 22px;
    border-radius: ${radius.pill};
    text-decoration: none;
    white-space: nowrap;
    box-shadow: ${shadow.sm};
    transition: background ${motion.base}, border-color ${motion.base}, transform ${motion.fast};

    &:hover {
        background: ${color.accentHover};
        border-color: ${color.accentHover};
        transform: translateY(-1px);
    }
`;

export const MobileActions = styled.div`
    display: none;

    ${media.md} {
        display: flex;
        flex-direction: column;
        gap: ${space.sm};
        padding-top: ${space.lg};

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 52px;
        }
    }
`;

export const Hamburger = styled.button<{ $open: boolean }>`
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    align-items: center;
    margin-left: ${space.xs};
    border: none;
    background: none;
    border-radius: ${radius.md};
    cursor: pointer;
    flex-shrink: 0;

    &:hover { background: rgba(15, 74, 88, 0.08); }

    span {
        display: block;
        width: 20px;
        height: 2px;
        background: ${color.primary};
        border-radius: 2px;
        transition: transform ${motion.fast}, opacity ${motion.fast};
    }

    span:nth-child(1) { transform: ${({ $open }) => ($open ? 'translateY(7px) rotate(45deg)' : 'none')}; }
    span:nth-child(2) { opacity: ${({ $open }) => ($open ? 0 : 1)}; }
    span:nth-child(3) { transform: ${({ $open }) => ($open ? 'translateY(-7px) rotate(-45deg)' : 'none')}; }

    ${media.md} {
        display: flex;
    }
`;

/* ── Announcement strip ───────────────────────────────────────────────── */

export const Announce = styled.div`
    background: ${color.primaryDeep};
    color: ${color.onDarkMuted};
    font-family: ${font.body};
    font-size: ${type.caption};
    letter-spacing: ${tracking.wide};
    padding: 9px ${space.gutter};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 4px 10px;

    /* Keeps the count from breaking mid-phrase on a narrow screen. */
    strong { font-weight: ${weight.semibold}; white-space: nowrap; }

    a {
        color: ${color.goldText};
        text-decoration: none;
        font-weight: ${weight.semibold};
        border-bottom: 1px solid rgba(224, 160, 63, 0.4);
        white-space: nowrap;
        &:hover { border-color: ${color.gold}; }
    }

    ${media.sm} {
        font-size: 0.6875rem;
        padding: 8px 16px;
        letter-spacing: 0.02em;
    }
`;

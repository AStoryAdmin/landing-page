import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
    color,
    font,
    layout,
    leading,
    media,
    motion,
    radius,
    shadow,
    space,
    tracking,
    type,
    weight,
} from '../../styles/theme';

/* ── Section grounds ──────────────────────────────────────────────────── */

export type Tone =
    | 'ivory'
    | 'paper'
    | 'wash'
    | 'deep'
    | 'brown'
    | 'gold'
    | 'ivoryDeep';

const tones: Record<Tone, ReturnType<typeof css>> = {
    ivory: css`
        background: ${color.ivory};
        color: ${color.body};
    `,
    ivoryDeep: css`
        background: ${color.ivoryDeep};
        color: ${color.body};
    `,
    paper: css`
        background: ${color.paper};
        color: ${color.body};
    `,
    wash: css`
        background: ${color.primaryWash};
        color: ${color.body};
    `,
    deep: css`
        background: ${color.primaryDeep};
        color: ${color.onDarkMuted};
        h1,
        h2,
        h3,
        h4 {
            color: ${color.onDark};
        }
    `,
    brown: css`
        background: ${color.primary};
        color: ${color.onDarkMuted};
        h1,
        h2,
        h3,
        h4 {
            color: ${color.onDark};
        }
    `,
    gold: css`
        background: ${color.goldWash};
        color: ${color.body};
    `,
};

export const Section = styled.section<{
    $tone?: Tone;
    $tight?: boolean;
    $flush?: boolean;
}>`
    ${({ $tone = 'ivory' }) => tones[$tone]};
    padding-block: ${({ $tight, $flush }) =>
        $flush ? '0' : $tight ? space.section : space.sectionLg};
    padding-inline: ${space.gutter};
    position: relative;
`;

export const Container = styled.div<{ $wide?: boolean; $narrow?: boolean }>`
    width: 100%;
    margin-inline: auto;
    max-width: ${({ $wide, $narrow }) =>
        $wide ? layout.maxWidthWide : $narrow ? '780px' : layout.maxWidth};
`;

/* ── Type ─────────────────────────────────────────────────────────────── */

export const Eyebrow = styled.p<{
    $tone?: 'accent' | 'gold' | 'brown' | 'muted';
}>`
    font-family: ${font.body};
    font-size: ${type.eyebrow};
    font-weight: ${weight.bold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    margin-bottom: ${space.md};
    color: ${({ $tone = 'accent' }) =>
        $tone === 'gold'
            ? color.goldText
            : $tone === 'brown'
              ? color.primary
              : $tone === 'muted'
                ? color.faint
                : color.accentText};
`;

export const Display = styled.h1<{ $size?: 'd1' | 'd2' | 'd3' }>`
    font-family: ${font.display};
    font-size: ${({ $size = 'd1' }) => type[$size]};
    font-weight: ${weight.regular};
    line-height: ${leading.tight};
    letter-spacing: ${tracking.display};
    margin-bottom: ${space.lg};
`;

export const H2 = styled.h2`
    font-family: ${font.display};
    font-size: ${type.d2};
    font-weight: ${weight.regular};
    line-height: ${leading.snug};
    letter-spacing: ${tracking.display};
    margin-bottom: ${space.lg};
`;

export const H3 = styled.h3`
    font-family: ${font.display};
    font-size: ${type.d4};
    font-weight: ${weight.medium};
    line-height: ${leading.snug};
    margin-bottom: ${space.sm};
`;

export const H4 = styled.h4`
    font-family: ${font.body};
    font-size: ${type.base};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.normal};
    color: ${color.ink};
    margin-bottom: ${space.xs};
`;

/** Italic serif emphasis — the brand's signature "Story" treatment. */
export const Italic = styled.em<{ $tone?: 'accent' | 'gold' }>`
    font-style: italic;
    color: ${({ $tone = 'accent' }) =>
        $tone === 'gold' ? color.goldText : color.accent};
`;

/**
 * Script accent, per the guideline's Caveat / Dancing Script pairing. Used
 * sparingly — taglines and margin notes only, never for reading copy.
 */
export const Script = styled.span`
    font-family: ${font.script};
    font-size: 1.35em;
    color: ${color.goldText};
    letter-spacing: 0.01em;
`;

export const Lead = styled.p<{ $center?: boolean; $onDark?: boolean }>`
    font-family: ${font.body};
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.body)};
    max-width: 64ch;
    margin-inline: ${({ $center }) => ($center ? 'auto' : '0')};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
    margin-bottom: ${space.lg};
`;

export const Body = styled.p<{ $onDark?: boolean }>`
    font-family: ${font.body};
    font-size: ${type.sm};
    line-height: ${leading.relaxed};
    color: ${({ $onDark }) => ($onDark ? color.onDarkMuted : color.bodyMuted)};
    max-width: ${layout.maxWidthText};
    & + & {
        margin-top: ${space.md};
    }
`;

export const Note = styled.p<{ $onDark?: boolean }>`
    font-family: ${font.body};
    font-size: ${type.caption};
    line-height: ${leading.normal};
    letter-spacing: 0.02em;
    color: ${({ $onDark }) => ($onDark ? color.onDarkFaint : color.faint)};
`;

/* ── Buttons ──────────────────────────────────────────────────────────── */

export const buttonBase = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${space.xs};
    font-family: ${font.body};
    font-size: 16px;
    font-weight: ${weight.semibold};
    letter-spacing: 0.02em;
    padding: 12px 24px;
    min-height: 54px;
    border-radius: 2px;
    border: 1.5px solid transparent;
    text-decoration: none;
    cursor: pointer;
    white-space: normal;
    transition:
        background ${motion.base},
        color ${motion.base},
        border-color ${motion.base},
        transform ${motion.fast},
        box-shadow ${motion.base};

    &:hover {
        transform: none;
    }
    &:active {
        transform: translateY(0);
    }
    &:disabled {
        opacity: 0.75;
        cursor: not-allowed;
        transform: none;
    }

    ${media.xs} {
        width: 100%;
    }
`;

export const buttonVariants = {
    primary: css`
        background: ${color.primary};
        color: ${color.onDark};
        &:hover { background: ${color.primaryHover}; }
    `,
    brown: css`
        background: ${color.primary};
        color: ${color.onDark};
        box-shadow: ${shadow.md};
        &:hover {
            background: ${color.primaryHover};
        }
    `,
    gold: css`
        background: ${color.gold};
        color: ${color.primaryDeep};
        box-shadow: ${shadow.md};
        &:hover {
            background: ${color.goldDeep};
        }
    `,
    outline: css`
        background: transparent;
        color: ${color.primary};
        border-color: ${color.primaryLineStrong};
        &:hover {
            background: ${color.primaryWash};
            border-color: ${color.primary};
        }
    `,
    onDark: css`
        background: ${color.ivory};
        color: ${color.primary};
        border-color: ${color.ivory};
        &:hover {
            background: ${color.paperPure};
            border-color: ${color.paperPure};
        }
    `,
    ghost: css`
        background: transparent;
        color: ${color.accentText};
        padding: 8px 0;
        min-height: 44px;
        border-radius: 0;
        &:hover {
            color: ${color.accent};
            transform: none;
            gap: 12px;
        }
    `,
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export const Button = styled(Link)<{ $variant?: ButtonVariant }>`
    ${buttonBase};
    ${({ $variant = 'primary' }) => buttonVariants[$variant]};
`;

export const ButtonEl = styled.button<{ $variant?: ButtonVariant }>`
    ${buttonBase};
    ${({ $variant = 'primary' }) => buttonVariants[$variant]};
`;

export const ButtonAnchor = styled.a<{ $variant?: ButtonVariant }>`
    ${buttonBase};
    ${({ $variant = 'primary' }) => buttonVariants[$variant]};
`;

export const Actions = styled.div<{ $center?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.sm};
    align-items: center;
    justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
    margin-top: ${space.lg};

    ${media.xs} {
        flex-direction: column;
        align-items: stretch;
    }
`;

/* ── Surfaces ─────────────────────────────────────────────────────────── */

export const Card = styled.div<{ $onDark?: boolean; $raised?: boolean }>`
    background: ${({ $onDark }) =>
        $onDark ? 'rgba(243, 235, 221, 0.05)' : color.paperPure};
    border: 1px solid
        ${({ $onDark }) => ($onDark ? color.onDarkLine : color.primaryLine)};
    border-radius: ${radius.lg};
    padding: clamp(24px, 3vw, 36px);
    box-shadow: ${({ $raised }) => ($raised ? shadow.md : 'none')};
    transition:
        transform ${motion.base},
        box-shadow ${motion.base},
        border-color ${motion.base};
`;

export const HoverCard = styled(Card)`
    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.lg};
        border-color: ${color.accentLine};
    }
`;

export const Grid = styled.div<{
    $cols?: number;
    $gap?: string;
    $min?: string;
}>`
    display: grid;
    gap: ${({ $gap }) => $gap ?? space.lg};
    grid-template-columns: ${({ $min = '260px' }) =>
        `repeat(auto-fit, minmax(min(${$min}, 100%), 1fr))`};

    ${({ $cols = 3 }) =>
        $cols <= 4 &&
        css`
            ${media.up.lg} {
                grid-template-columns: repeat(${$cols}, 1fr);
            }
        `}
`;

export const Split = styled.div<{
    $ratio?: string;
    $gap?: string;
    $align?: string;
}>`
    display: grid;
    gap: ${({ $gap }) => $gap ?? 'clamp(32px, 5vw, 72px)'};
    align-items: ${({ $align }) => $align ?? 'center'};
    grid-template-columns: ${({ $ratio }) => $ratio ?? '1fr 1fr'};

    ${media.md} {
        grid-template-columns: 1fr;
    }
`;

export const Divider = styled.hr<{ $onDark?: boolean }>`
    border: none;
    border-top: 1px solid
        ${({ $onDark }) => ($onDark ? color.onDarkLine : color.primaryLine)};
    margin-block: ${space.xxl};
`;

/* ── Small pieces ─────────────────────────────────────────────────────── */

export const Badge = styled.span<{ $onDark?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    font-family: ${font.body};
    font-size: ${type.caption};
    font-weight: ${weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 2px;
    background: ${({ $onDark }) =>
        $onDark ? 'rgba(243, 235, 221, 0.10)' : color.paperPure};
    border: 1px solid
        ${({ $onDark }) => ($onDark ? color.onDarkLine : color.primaryLine)};
    color: ${({ $onDark }) => ($onDark ? color.onDark : color.body)};
`;

export const LiveDot = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${color.live};
    flex-shrink: 0;
`;

export const StatNum = styled.div<{ $tone?: 'gold' | 'accent' | 'brown' }>`
    font-family: ${font.display};
    font-size: ${type.d3};
    font-weight: ${weight.regular};
    line-height: 1;
    letter-spacing: ${tracking.display};
    color: ${({ $tone = 'gold' }) =>
        $tone === 'accent'
            ? color.accent
            : $tone === 'brown'
              ? color.primary
              : color.goldText};
    margin-bottom: ${space.sm};
`;

export const Arrow = styled.span`
    display: inline-block;
    transition: transform ${motion.fast};
    a:hover &,
    button:hover & {
        transform: translateX(4px);
    }
`;

/** Text link styled as an inline ghost action. */
export const TextLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${space.xs};
    font-family: ${font.body};
    font-size: 16px;
    font-weight: ${weight.semibold};
    color: ${color.accentText};
    text-decoration: underline;
    text-underline-offset: 6px;
    min-height: 44px;
    align-items: center;
    transition:
        color ${motion.fast},
        gap ${motion.fast};
    &:hover {
        color: ${color.accent};
        gap: 12px;
    }
`;

export const List = styled.ul<{ $onDark?: boolean }>`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: ${space.sm};

    li {
        position: relative;
        padding-left: 28px;
        font-size: ${type.sm};
        line-height: ${leading.relaxed};
        color: ${({ $onDark }) =>
            $onDark ? color.onDarkMuted : color.bodyMuted};
    }

    li::before {
        content: '';
        position: absolute;
        left: 4px;
        top: 0.62em;
        width: 9px;
        height: 5px;
        border-left: 1.75px solid ${color.accent};
        border-bottom: 1.75px solid ${color.accent};
        transform: rotate(-45deg);
    }
`;

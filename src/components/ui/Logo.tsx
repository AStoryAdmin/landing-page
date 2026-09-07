import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, font, leading, media, motion, tracking, weight } from '../../styles/theme';

/**
 * The A Story logo, drawn as vector so it stays crisp at every size the
 * guideline calls for (84px down to the 24px minimum) and picks up the
 * approved Version Teal colourway rather than a baked-in raster.
 *
 * Geometry follows the brand mark: the "A" apex as two tapered strokes with a
 * heart held between them — the record-disc "stop" that keeps the moment.
 * Structure, proportion and colour are fixed here so no page can distort them.
 */

const MARK_GROUND = { light: color.ivory, dark: color.primary } as const;
const MARK_LETTER = { light: color.primary, dark: color.ivory } as const;

type Tone = 'light' | 'dark';

const Mark = ({ tone, rounded = true }: { tone: Tone; rounded?: boolean }) => (
    <svg viewBox="0 0 1024 1024" role="presentation" focusable="false" aria-hidden="true">
        {rounded && <rect x="0" y="0" width="1024" height="1024" rx="232" fill={MARK_GROUND[tone]} />}
        <path d="M509 148 L178 882 L296 882 L512 225 Z" fill={MARK_LETTER[tone]} />
        <path d="M515 148 L846 882 L728 882 L512 225 Z" fill={MARK_LETTER[tone]} />
        <path
            d="M512 726 C512 726 406 643 406 566 C406 519 441 493 478 493 C499 493 509 506 512 514 C515 506 525 493 546 493 C583 493 618 519 618 566 C618 643 512 726 512 726 Z"
            fill={color.gold}
        />
    </svg>
);

/* ── Layout ───────────────────────────────────────────────────────────── */

const Root = styled(Link)<{ $size: number }>`
    display: inline-flex;
    align-items: center;
    gap: ${({ $size }) => Math.round($size * 0.34)}px;
    text-decoration: none;
    line-height: 1;
    /* Guideline safe zone: no element may encroach within 0.4x of the mark. */
    padding: ${({ $size }) => Math.round($size * 0.1)}px;
    margin: ${({ $size }) => -Math.round($size * 0.1)}px;
    border-radius: 12px;
    transition: opacity ${motion.fast};

    &:hover { opacity: 0.85; }

    svg {
        width: ${({ $size }) => $size}px;
        height: ${({ $size }) => $size}px;
        flex-shrink: 0;
    }
`;

const Wordmark = styled.span<{ $size: number; $tone: Tone }>`
    display: flex;
    flex-direction: column;
    gap: 2px;

    .name {
        font-family: ${font.display};
        font-size: ${({ $size }) => Math.round($size * 0.82)}px;
        font-weight: ${weight.semibold};
        line-height: ${leading.tight};
        letter-spacing: ${tracking.display};
        color: ${({ $tone }) => ($tone === 'dark' ? color.ivory : color.primary)};
    }

    .name em {
        font-style: normal;
        color: ${({ $tone }) => ($tone === 'dark' ? color.gold : color.accent)};
    }

    .tagline {
        font-family: ${font.body};
        font-size: ${({ $size }) => Math.max(9, Math.round($size * 0.22))}px;
        font-weight: ${weight.medium};
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: ${({ $tone }) => ($tone === 'dark' ? color.onDarkFaint : color.faint)};
    }

    ${media.xs} {
        .tagline { display: none; }
    }
`;

type Props = {
    /** Mark height in px. The guideline's minimum legible size is 24. */
    size?: number;
    tone?: Tone;
    /** Hide the wordmark and show the mark alone (favicon-style usage). */
    markOnly?: boolean;
    /** Hide the "Your Family's Living Memories" descriptor line. */
    showTagline?: boolean;
    to?: string;
    className?: string;
};

const Logo = ({ size = 34, tone = 'light', markOnly = false, showTagline = true, to = '/', className }: Props) => (
    <Root to={to} $size={size} className={className} aria-label="A Story — home">
        <Mark tone={tone} />
        {!markOnly && (
            <Wordmark $size={size} $tone={tone} aria-hidden="true">
                <span className="name">
                    A <em>Story</em>
                </span>
                {showTagline && <span className="tagline">Your Family&rsquo;s Living Memories</span>}
            </Wordmark>
        )}
    </Root>
);

export default Logo;

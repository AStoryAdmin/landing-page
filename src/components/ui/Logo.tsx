import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, media, motion } from '../../styles/theme';
import {
    LOGO_LETTER_PATH, LOGO_MARK_VIEWBOX, LOGO_NAME_A_PATH, LOGO_NAME_STORY_PATH, LOGO_TAGLINE_PATH,
    LOGO_VIEWBOX, LOGO_WAVEFORM_PATH, SIMPLE_LETTER_PATH, SIMPLE_NAME_A_PATH, SIMPLE_NAME_STORY_PATH,
    SIMPLE_VIEWBOX, SIMPLE_WAVEFORM_PATH,
} from './logoPaths';

/**
 * The A Story logo.
 *
 * The artwork is the guideline's own vector, traced by scripts/trace-logo.mjs —
 * not a lookalike rebuilt from a web font — because the guideline requires the
 * logo's shape and style to remain unaltered. Only colour changes here, and
 * only between the approved light and dark colourways.
 *
 * Three variants, all from approved artwork:
 *   horizontal  mark + wordmark + "Your Family's Living Memories"
 *   simple      mark + wordmark (the guideline's Simplified Horizontal Logo,
 *               and what small sizes should use — the descriptor line stops
 *               being legible below roughly 56px of lockup height)
 *   mark        the mark alone, for favicon-style contexts
 */

type Tone = 'light' | 'dark';
type Variant = 'horizontal' | 'simple' | 'mark';

/** The approved colourways. Warm Gold on the waveform never changes. */
const PALETTE = {
    light: { letter: color.primary, name: color.ink, story: color.accent, tagline: color.body },
    dark: { letter: color.ivory, name: color.ivory, story: color.gold, tagline: color.onDarkMuted },
} as const;

const ART = {
    horizontal: {
        viewBox: LOGO_VIEWBOX,
        letter: LOGO_LETTER_PATH,
        waveform: LOGO_WAVEFORM_PATH,
        nameA: LOGO_NAME_A_PATH,
        nameStory: LOGO_NAME_STORY_PATH,
        tagline: LOGO_TAGLINE_PATH,
    },
    simple: {
        viewBox: SIMPLE_VIEWBOX,
        letter: SIMPLE_LETTER_PATH,
        waveform: SIMPLE_WAVEFORM_PATH,
        nameA: SIMPLE_NAME_A_PATH,
        nameStory: SIMPLE_NAME_STORY_PATH,
        tagline: '',
    },
    mark: {
        viewBox: LOGO_MARK_VIEWBOX,
        letter: LOGO_LETTER_PATH,
        waveform: LOGO_WAVEFORM_PATH,
        nameA: '',
        nameStory: '',
        tagline: '',
    },
} as const;

const Root = styled(Link)<{ $height: number }>`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    /*
     * Guideline safe zone — no element may encroach on the space around the
     * logo. Negative margin keeps that clearance from changing layout.
     */
    padding: ${({ $height }) => Math.round($height * 0.22)}px;
    margin: ${({ $height }) => -Math.round($height * 0.22)}px;
    border-radius: 12px;
    transition: opacity ${motion.fast};

    &:hover { opacity: 0.85; }

    svg {
        height: ${({ $height }) => $height}px;
        width: auto;
        display: block;
    }

    ${media.xs} {
        svg { height: ${({ $height }) => Math.round($height * 0.86)}px; }
    }
`;

type Props = {
    /** Height of the lockup in px. The guideline's minimum legible size is 24. */
    height?: number;
    tone?: Tone;
    variant?: Variant;
    to?: string;
    className?: string;
};

const Logo = ({ height = 44, tone = 'light', variant = 'simple', to = '/', className }: Props) => {
    const art = ART[variant];
    const ink = PALETTE[tone];

    return (
        <Root to={to} $height={height} className={className} aria-label="A Story — home">
            <svg viewBox={art.viewBox} role="img" aria-hidden="true" focusable="false">
                <path d={art.letter} fill={ink.letter} fillRule="evenodd" />
                <path d={art.waveform} fill={color.gold} fillRule="evenodd" />
                {art.nameA && <path d={art.nameA} fill={ink.name} fillRule="evenodd" />}
                {art.nameStory && <path d={art.nameStory} fill={ink.story} fillRule="evenodd" />}
                {art.tagline && <path d={art.tagline} fill={ink.tagline} fillRule="evenodd" />}
            </svg>
        </Root>
    );
};

export default Logo;

import styled from 'styled-components';
import {
    color,
    font,
    motion,
    radius,
    shadow,
    space,
    tracking,
    type,
    weight,
} from '../styles/theme';

type PageProps = {
    $isFlipped: boolean;
};

export const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${space.lg};
    padding: clamp(28px, 5vw, 60px) 0;
`;

/*
 * The spread keeps an 8:5 ratio at any width, and everything inside it is
 * sized in percentages or viewport-relative clamps — so the book shrinks to a
 * phone without a single fixed pixel needing a breakpoint.
 */
export const BookWrapper = styled.div`
    position: relative;
    width: min(800px, 100%);
    aspect-ratio: 8 / 5;
    perspective: 2000px;
`;

/*
 * Below the spread breakpoint the two-page book becomes unreadable — a 45%
 * column on a 390px screen leaves about 120px for a pull quote. The compact
 * layout drops the 3D turn and stacks photo over text instead.
 */
export const CompactBook = styled.div`
    width: min(420px, 100%);
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
`;

export const CompactPhoto = styled.div`
    aspect-ratio: 4 / 3;
    border-radius: ${radius.lg};
    overflow: hidden;
    border: 1px solid ${color.primaryLine};
    background: ${color.ivory};
`;

export const CompactText = styled.div`
    background: ${color.ivory};
    border: 1px solid ${color.primaryLine};
    border-radius: ${radius.lg};
    padding: ${space.lg};
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
`;

export const LeftPage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: ${color.ivory};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(10px, 2.5%, 32px);
    cursor: pointer;
    /* Sits above the flipping pages so the photo is never clipped. */
    z-index: 5;
    border-radius: ${radius.lg};
    border-right: 1px solid ${color.primaryLine};
    overflow: hidden;
`;

export const Page = styled.div<PageProps>`
    position: absolute;
    top: 0;
    left: 50%;
    width: 45%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.6s ease-in-out;
    transform: ${(props) => (props.$isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)')};
`;

export const PageContent = styled.div`
    position: absolute;
    inset: 4% 0;
    width: 80%;
    padding: clamp(14px, 6%, 56px) clamp(12px, 5.5%, 48px);
    display: flex;
    flex-direction: column;
    gap: clamp(8px, 1.6%, 20px);
    backface-visibility: hidden;
    background: ${color.ivory};
    border-radius: ${radius.lg};
    box-shadow: ${shadow.sm};
`;

export const PageImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: ${radius.md};
`;

export const PageHeading = styled.h3`
    font-family: ${font.display};
    font-size: clamp(1.1rem, 0.7rem + 1.8vw, 2rem);
    color: ${color.accentText};
    margin: 0;
    text-align: center;
    line-height: 1.15;
`;

export const PageQuote = styled.p`
    font-family: ${font.display};
    font-size: clamp(1.0625rem, 0.8rem + 0.4vw, 1.125rem);
    line-height: 1.55;
    text-align: center;
    color: ${color.body};
    overflow: hidden;
`;

export const PageNumber = styled.p`
    font-family: ${font.display};
    font-style: italic;
    font-size: clamp(0.6875rem, 0.6rem + 0.3vw, 0.875rem);
    margin-top: auto;
    text-align: center;
    color: ${color.faint};
`;

/* ── Controls ─────────────────────────────────────────────────────────── */

export const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: ${space.md};
`;

export const PageButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: ${radius.pill};
    border: 1.5px solid ${color.primaryLine};
    background: ${color.paperPure};
    color: ${color.primary};
    cursor: pointer;
    transition:
        background ${motion.fast},
        border-color ${motion.fast},
        opacity ${motion.fast};

    &:hover:not(:disabled) {
        background: ${color.primaryWash};
        border-color: ${color.primary};
    }
    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`;

export const PageCount = styled.p`
    font-family: ${font.body};
    font-size: ${type.caption};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.eyebrow};
    text-transform: uppercase;
    color: ${color.bodyMuted};
    min-width: 90px;
    text-align: center;
`;

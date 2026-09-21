import styled from 'styled-components';
import { color, font, media, space } from '../../styles/theme';

export const Chapter = styled.section<{ $tone?: 'paper' | 'dark' | 'brown' }>`
    padding: clamp(64px, 7vw, 112px) ${space.gutter};
    background: ${({ $tone }) =>
        $tone === 'dark'
            ? color.primaryDeep
            : $tone === 'brown'
              ? color.primary
              : $tone === 'paper'
                ? color.paper
                : color.ivory};
    color: ${({ $tone }) =>
        $tone === 'dark' || $tone === 'brown' ? color.onDark : color.ink};
    h1,
    h2,
    h3,
    h4 {
        color: inherit;
    }
    p {
        line-height: 1.6;
    }
`;
export const Width = styled.div`
    max-width: 1312px;
    margin: auto;
    min-width: 0;
`;
export const Kicker = styled.p`
    font: 500 0.8125rem/1.4 ${font.body};
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 24px;
`;
export const Headline = styled.h2`
    font: 500 clamp(2.5rem, 4.5vw, 4.5rem) / 1.06 ${font.body};
    letter-spacing: -0.045em;
    max-width: 20ch;
    em {
        font-family: ${font.display};
        font-weight: 400;
    }
`;
export const HeroTitle = styled.h1`
    font: 500 clamp(3rem, 5.7vw, 5.9rem) / 1.04 ${font.body};
    letter-spacing: -0.052em;
    max-width: 17ch;
    em {
        font-family: ${font.display};
        font-weight: 400;
    }
`;
export const Intro = styled.p`
    font: 400 clamp(1.25rem, 1.6vw, 1.5rem) / 1.55 ${font.body};
    max-width: 47ch;
    margin-top: 28px;
`;
export const Two = styled.div<{ $ratio?: string }>`
    display: grid;
    grid-template-columns: ${({ $ratio }) => $ratio ?? '1fr 1fr'};
    gap: clamp(28px, 5vw, 80px);
    align-items: center;
    > * {
        min-width: 0;
    }
    ${media.md} {
        grid-template-columns: 1fr;
        gap: 36px;
    }
`;
export const RuleList = styled.div`
    margin-top: 40px;
    article {
        border-top: 1px solid ${color.primaryLineStrong};
        padding: 26px 0;
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        gap: 32px;
    }
    h3 {
        font: 500 1.65rem/1.2 ${font.body};
        letter-spacing: -0.02em;
    }
    ${media.sm} {
        article {
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }
`;

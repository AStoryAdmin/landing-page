import styled from 'styled-components';
import {
    color,
    font,
    layout,
    leading,
    media,
    space,
    type,
} from '../../styles/theme';

export const Page = styled.div`
    min-width: 0;
`;
export const Band = styled.section<{ $dark?: boolean; $paper?: boolean }>`
    padding: ${space.section} ${space.gutter};
    background: ${({ $dark, $paper }) => ($dark ? color.primary : $paper ? color.paper : color.ivory)};
    color: ${({ $dark }) => ($dark ? color.onDark : color.body)};
    ${({ $dark }) => $dark && `h1, h2, h3 { color: ${color.onDark}; }`}
`;
export const Wrap = styled.div`
    max-width: ${layout.maxWidth};
    margin-inline: auto;
    min-width: 0;
`;
export const Label = styled.p`
    font: 600 ${type.eyebrow} / 1.5 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 22px;
    color: inherit;
`;
export const Title = styled.h1`
    font-family: ${font.body};
    font-size: ${type.d1};
    line-height: ${leading.tight};
    letter-spacing: -0.05em;
    font-weight: 600;
    max-width: 19ch;
    margin-bottom: 28px;
    em {
        font-weight: 400;
        color: ${color.accentText};
    }
`;
export const Heading = styled.h2`
    font-family: ${font.body};
    font-size: ${type.d2};
    line-height: ${leading.snug};
    letter-spacing: -0.04em;
    max-width: 19ch;
    margin-bottom: 26px;
    font-weight: 400;
`;
export const Copy = styled.div`
    font-size: ${type.lead};
    line-height: ${leading.relaxed};
    max-width: 52ch;
    p + p {
        margin-top: 20px;
    }
    strong {
        font-weight: 600;
    }
`;
export const IntroGrid = styled.div<{ $reverse?: boolean }>`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
    > * {
        min-width: 0;
    }
    ${({ $reverse }) => $reverse && '> :first-child { order: 2; }'}
    ${media.md} {
        grid-template-columns: 1fr;
        > :first-child {
            order: initial;
        }
    }
`;
export const Reading = styled.div`
    max-width: 740px;
    margin-inline: auto;
    p {
        font: 400 ${type.lead} / 1.8 ${font.text};
    }
    p + p {
        margin-top: 26px;
    }
    h2 {
        margin: 48px 0 24px;
        font-size: ${type.d3};
        letter-spacing: -0.03em;
    }
`;
export const Rows = styled.div`
    border-top: 1px solid ${color.primaryLineStrong};
    > article {
        display: grid;
        grid-template-columns: minmax(140px, 0.65fr) minmax(0, 1fr);
        gap: 28px;
        padding: 28px 0;
        border-bottom: 1px solid ${color.primaryLineStrong};
    }
    h3 {
        font-size: ${type.d4};
        line-height: 1.25;
    }
    p {
        font-size: ${type.base};
        line-height: 1.65;
    }
    ${media.sm} {
        > article {
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }
`;
export const Pair = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(16px, 3vw, 40px);
    align-items: start;
    > :last-child {
        margin-top: 68px;
    }
    ${media.sm} {
        > :last-child {
            margin-top: 40px;
        }
    }
`;
export const Small = styled.p`
    font-size: ${type.caption};
    line-height: 1.6;
    margin-top: 20px;
`;
export const Rule = styled.hr`
    border: 0;
    border-top: 1px solid ${color.primaryLine};
    margin: 40px 0;
`;
export const FormPanel = styled.div`
    padding: clamp(24px, 4vw, 52px);
    background: ${color.paper};
    border: 1px solid ${color.primaryLineStrong};
    h2 {
        font-size: ${type.d3};
        margin-bottom: 16px;
    }
    > p {
        margin-bottom: 28px;
        line-height: 1.65;
    }
`;

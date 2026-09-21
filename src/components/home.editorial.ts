import styled from 'styled-components';
import { color, media, space, type } from '../styles/theme';
export const Hero = styled.section`
    padding: 46px ${space.gutter} 64px;
`;
export const HeroGrid = styled.div`
    max-width: 1440px;
    margin: auto;
    display: grid;
    grid-template-columns: 0.9fr 1.15fr;
    gap: clamp(32px, 4vw, 64px);
    align-items: center;
    > div {
        padding-left: clamp(0px, 3vw, 40px);
    }
    figure {
        align-self: center;
    }
    ${media.md} {
        grid-template-columns: 1fr;
        > div {
            padding-left: 0;
        }
    }
`;
export const HeroTitle = styled.h1`
    font-size: ${type.d1};
    line-height: 1.04;
    letter-spacing: -0.05em;
    max-width: 11ch;
    margin-bottom: 28px;
    font-weight: 400;
    em {
        color: ${color.accentText};
        font-weight: 400;
    }
    ${media.md} {
        max-width: 14ch;
    }
`;
export const ArchiveHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 32px;
    margin-bottom: 42px;
    p {
        max-width: 34ch;
        line-height: 1.65;
    }
    h2 {
        margin-bottom: 0;
    }
    ${media.sm} {
        display: block;
        p {
            margin-top: 22px;
        }
    }
`;
export const ArchiveField = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.8fr 1.15fr;
    gap: clamp(16px, 3vw, 38px);
    align-items: start;
    > :nth-child(2) {
        margin-top: 76px;
    }
    > :nth-child(3) {
        margin-top: 24px;
    }
    ${media.sm} {
        grid-template-columns: 1fr 1fr;
        > :nth-child(2) {
            margin-top: 50px;
        }
        > :nth-child(3) {
            grid-column: 1 / -1;
            width: 80%;
            margin: 14px auto 0;
        }
    }
`;
export const DarkRows = styled.div`
    margin-top: 32px;
    article {
        padding: 20px 0;
        border-top: 1px solid ${color.onDarkLine};
    }
    h3 {
        font-size: ${type.d5};
        margin-bottom: 10px;
    }
    p {
        line-height: 1.65;
        color: ${color.onDarkMuted};
    }
`;
export const Trust = styled.div`
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: clamp(32px, 6vw, 100px);
    ${media.md} {
        grid-template-columns: 1fr;
    }
`;

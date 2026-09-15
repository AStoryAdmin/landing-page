import styled from 'styled-components';
import { color, font } from '../styles/theme';

const colors = {
    cream: color.ivory,
    paper: color.paper,
    paper2: color.paper,
    orange: color.accent,
    onAccent: color.paperPure,
    orangeText: color.accentText,
    orangeHover: color.accentWash,
    dark: color.primaryDeep,
    gray: color.onDarkMuted,
    darkGray: color.body,
    ink08: 'rgba(15, 74, 88, 0.08)',
};

const fonts = {
    body: font.body,
    display: font.display,
    script: font.script,
};


export const CardView = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 80px);
`;

export const Label = styled.span`
    display: block;
    text-transform: uppercase;
    color: ${colors.orangeText};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 16px;
`;

export const HeroSection = styled.div`
    background: ${colors.paper2};
    padding: clamp(64px, 8vw, 120px) 0 clamp(48px, 6vw, 90px);
    border-bottom: 1px solid ${colors.ink08};
`;

export const HeroTitle = styled.h1`
    font-family: ${fonts.display};
    font-size: 50px;
    font-weight: 100;
    line-height: 1.1;
    letter-spacing: -1px;
    color: ${colors.dark};
    max-width: 700px;
    margin-bottom: 20px;
`;

export const HeroSub = styled.p`
    font-family: ${fonts.body};
    font-size: 18px;
    color: ${colors.darkGray};
`;

export const LegalMeta = styled.p`
    font-family: ${fonts.body};
    font-size: 14px;
    color: ${colors.darkGray};
    margin-top: 12px;
`;

export const BodySection = styled.div`
    background: ${colors.cream};
    padding: clamp(56px, 7vw, 100px) 0 clamp(72px, 9vw, 140px);
`;

export const LegalContent = styled.div`
    max-width: 1080px;
`;

export const Toc = styled.nav`
    background: ${colors.paper2};
    border: 1px solid ${colors.ink08};
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 50px;
`;

export const TocLabel = styled.p`
    font-family: ${fonts.body};
    font-size: 14px;
    font-weight: 600;
    color: ${colors.dark};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
`;

export const TocList = styled.ol`
    list-style: decimal;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TocItem = styled.li`
    font-family: ${fonts.body};
    font-size: 14px;
    color: ${colors.darkGray};
`;

export const TocLink = styled.a`
    color: ${colors.darkGray};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${colors.orangeText};
    }
`;

export const Section = styled.section`
    scroll-margin-top: 120px;
    padding-top: 40px;
    margin-top: 48px;
    border-top: 1px solid ${colors.ink08};

    &:first-of-type {
        padding-top: 0;
        margin-top: 0;
        border-top: none;
    }
`;

export const SectionNum = styled.span`
    display: block;
    font-family: ${fonts.body};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${colors.orangeText};
    margin-bottom: 8px;
`;

export const SectionTitle = styled.h2`
    font-family: ${fonts.display};
    font-size: 26px;
    font-weight: 500;
    color: ${colors.dark};
    margin-bottom: 16px;
`;

export const Paragraph = styled.p`
    font-family: ${fonts.body};
    font-size: 16px;
    line-height: 1.8;
    color: ${colors.darkGray};
    margin-bottom: 20px;
`;

export const List = styled.ul`
    list-style: none;
    margin: 8px 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ListItem = styled.li`
    font-family: ${fonts.body};
    font-size: 16px;
    color: ${colors.darkGray};
    line-height: 1.8;
    padding-left: 24px;
    position: relative;

    &::before {
        content: '-';
        position: absolute;
        left: 0;
        color: ${colors.orangeText};
        font-weight: 600;
    }
`;

export const LegalLink = styled.a`
    color: ${colors.orangeText};
    text-decoration: underline;
`;

export const Bold = styled.strong`
    color: ${colors.dark};
    font-weight: 600;
`;
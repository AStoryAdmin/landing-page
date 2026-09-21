import styled from 'styled-components';
import { color, font } from '../styles/theme';

export const CardView = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 80px);
`;

export const Label = styled.span`
    display: block;
    text-transform: uppercase;
    color: ${color.accentText};
    font-family: ${font.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 16px;
`;

export const HeroSection = styled.div`
    background: ${color.paper};
    padding: clamp(64px, 8vw, 120px) 0 clamp(48px, 6vw, 90px);
    border-bottom: 1px solid ${color.primaryLine};
`;

export const HeroTitle = styled.h1`
    font-family: ${font.display};
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 100;
    line-height: 1.1;
    letter-spacing: -1px;
    color: ${color.primaryDeep};
    max-width: 700px;
    margin-bottom: 20px;
`;

export const HeroSub = styled.p`
    font-family: ${font.body};
    font-size: 18px;
    color: ${color.body};
`;

export const LegalMeta = styled.p`
    font-family: ${font.body};
    font-size: 14px;
    color: ${color.body};
    margin-top: 12px;
`;

export const BodySection = styled.div`
    background: ${color.ivory};
    padding: clamp(56px, 7vw, 100px) 0 clamp(72px, 9vw, 140px);
`;

export const LegalContent = styled.div`
    max-width: 1080px;
`;

export const Toc = styled.nav`
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-radius: 4px;
    padding: 32px;
    margin-bottom: 50px;
`;

export const TocLabel = styled.p`
    font-family: ${font.body};
    font-size: 14px;
    font-weight: 600;
    color: ${color.primaryDeep};
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
    font-family: ${font.body};
    font-size: 14px;
    color: ${color.body};
`;

export const TocLink = styled.a`
    color: ${color.body};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${color.accentText};
    }
`;

export const Section = styled.section`
    scroll-margin-top: 120px;
    padding-top: 40px;
    margin-top: 48px;
    border-top: 1px solid ${color.primaryLine};

    &:first-of-type {
        padding-top: 0;
        margin-top: 0;
        border-top: none;
    }
`;

export const SectionNum = styled.span`
    display: block;
    font-family: ${font.body};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${color.accentText};
    margin-bottom: 8px;
`;

export const SectionTitle = styled.h2`
    font-family: ${font.display};
    font-size: 26px;
    font-weight: 500;
    color: ${color.primaryDeep};
    margin-bottom: 16px;
`;

export const Paragraph = styled.p`
    font-family: ${font.body};
    font-size: 18px;
    line-height: 1.8;
    color: ${color.body};
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
    font-family: ${font.body};
    font-size: 18px;
    color: ${color.body};
    line-height: 1.8;
    padding-left: 24px;
    position: relative;

    &::before {
        content: '-';
        position: absolute;
        left: 0;
        color: ${color.accentText};
        font-weight: 600;
    }
`;

export const LegalLink = styled.a`
    color: ${color.accentText};
    text-decoration: underline;
`;

export const Bold = styled.strong`
    color: ${color.primaryDeep};
    font-weight: 600;
`;

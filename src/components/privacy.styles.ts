import styled from 'styled-components';

const colors = {
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    paper2: '#F1E9DA',
    orange: '#B45A2B',
    orangeHover: 'rgba(180, 90, 43, 0.08)',
    dark: '#120E08',
    gray: 'rgba(254, 252, 248, 0.5)',
    darkGray: 'rgba(43, 33, 23, 0.7)',
    ink08: 'rgba(43, 33, 23, 0.08)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};


export const CardView = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 80px;
`;

export const Label = styled.span`
    display: block;
    text-transform: uppercase;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 16px;
`;

export const HeroSection = styled.div`
    background: ${colors.paper2};
    padding: 180px 0 90px;
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
    padding: 100px 0 140px;
`;

export const LegalContent = styled.div`
    max-width: 720px;
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
        color: ${colors.orange};
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
    color: ${colors.orange};
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
        color: ${colors.orange};
        font-weight: 600;
    }
`;

export const LegalLink = styled.a`
    color: ${colors.orange};
    text-decoration: underline;
`;

export const Bold = styled.strong`
    color: ${colors.dark};
    font-weight: 600;
`;
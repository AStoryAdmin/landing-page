import styled from 'styled-components';

const colors = {
    dark: '#120E08',
    ink: '#2B2117',
    softInk: '#5C4A38',
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    orange: '#b45a2b',
    gold: '#C7A24E',
    line: 'rgba(43, 33, 23, 0.12)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const Page = styled.div`
    min-height: 100vh;
    background: ${colors.cream};
    color: ${colors.ink};
    font-family: ${fonts.body};
`;

export const Inner = styled.div`
    max-width: 680px;
    margin: 0 auto;
    padding: 48px 20px 80px;
`;

export const Brand = styled.div`
    text-align: center;
    letter-spacing: 2px;
    color: ${colors.softInk};
    font-size: 14px;
    margin-bottom: 32px;

    b { color: ${colors.orange}; font-family: ${fonts.display}; font-weight: 700; }
`;

export const Hero = styled.div`
    text-align: center;
    margin-bottom: 44px;
`;

export const Avatar = styled.div<{ $img?: string }>`
    width: 108px;
    height: 108px;
    border-radius: 50%;
    margin: 0 auto 18px;
    background: ${({ $img }) => ($img ? `center/cover no-repeat url(${$img})` : 'rgba(180,90,43,0.12)')};
    border: 2px solid rgba(180, 90, 43, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.orange};
    font-family: ${fonts.display};
    font-size: 42px;
`;

export const Name = styled.h1`
    font-family: ${fonts.display};
    font-weight: 500;
    font-size: 44px;
    line-height: 1.05;
    margin: 0;
    color: ${colors.dark};
`;

export const Intro = styled.p`
    max-width: 520px;
    margin: 14px auto 0;
    font-size: 18px;
    line-height: 1.6;
    color: ${colors.softInk};
`;

export const Timeline = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
`;

export const MemoryCard = styled.article`
    background: ${colors.paper};
    border: 1px solid ${colors.line};
    border-radius: 18px;
    overflow: hidden;
`;

export const MemoryImg = styled.img`
    width: 100%;
    max-height: 360px;
    object-fit: cover;
    display: block;
`;

export const MemoryBody = styled.div`
    padding: 22px 24px 26px;
`;

export const Era = styled.p`
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 12px;
    font-weight: 700;
    color: ${colors.orange};
    margin: 0 0 8px;
`;

export const MemoryTitle = styled.h2`
    font-family: ${fonts.display};
    font-weight: 600;
    font-size: 28px;
    line-height: 1.15;
    margin: 0;
    color: ${colors.dark};
`;

export const Period = styled.p`
    font-size: 14px;
    color: ${colors.softInk};
    margin: 4px 0 0;
`;

export const MemoryText = styled.p`
    font-size: 17px;
    line-height: 1.7;
    color: ${colors.ink};
    margin: 14px 0 0;
    white-space: pre-wrap;
`;

export const Footer = styled.div`
    text-align: center;
    margin-top: 56px;
    color: ${colors.softInk};
    font-size: 14px;

    b { color: ${colors.orange}; font-family: ${fonts.display}; font-weight: 700; }
`;

export const Centered = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    background: ${colors.cream};
    color: ${colors.softInk};
    font-family: ${fonts.body};
    gap: 8px;
`;

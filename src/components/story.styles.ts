import styled, { keyframes } from 'styled-components';

const colors = {
    ink: '#2B2117',
    lightOrange: 'rgba(180, 90, 43, 0.10)',
    orange: '#B45A2B',
    orangeHover: '#a14e22',
    gold: '#C7A24E',
    cream: '#EFE6D4',
    paper2: '#E6D8BF',
    paper3: '#F6EFE2',
    ink70: 'rgba(43, 33, 23, 0.70)',
    ink40: 'rgba(43, 33, 23, 0.40)',
    ink15: 'rgba(43, 33, 23, 0.15)',
    ink08: 'rgba(43, 33, 23, 0.08)',
    fireBg: '#120E08',
    white: '#F6EFE2',
    fire60: 'rgba(246, 239, 226, 0.60)'
};

const fonts = {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Figtree', sans-serif",
};

const pulseDot = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
`;

export const Container = styled.div`
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 32px;
`;

export const ContainerDark = styled.div`
    max-width: 1080px;
    margin: 0 ;
    padding: 0 ;
`;

export const TextWrap = styled.div`
    max-width: 660px;
    margin-left: auto;
    margin-right: auto;
`;

export const StoryHero = styled.div`
    background: ${colors.paper3};
    padding: 128px 0 96px;
    text-align: center;
    border-bottom: 1px solid ${colors.ink08};
`;

export const HeroTitle = styled.h1`
    font-family: ${fonts.display};
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -1px;
    font-size: 56px;
    max-width: 820px;
    margin: 0 auto 24px;
`;

export const HeroSub = styled.p`
    font-family: ${fonts.display};
    font-size: 21px;
    font-style: italic;
    color: ${colors.ink70};
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.5;
`;

export const Byline = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${colors.ink40};
`;

export const StorySection = styled.div`
    padding: 96px 550px;
    max-width: 660px;
    margin: 0 auto;
    background: ${colors.paper2};
`;

export const Paragraph = styled.p`
    font-family: ${fonts.display};
    font-size: 21px;
    line-height: 1.7;
    color: ${colors.ink70};
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Emphasis = styled.em`
    color: ${colors.orange};
    font-style: italic;
`;

export const ChapterLabel = styled.p`
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${colors.orange};
    margin-bottom: 16px;
`;

export const ChapterHeadline = styled.p`
    font-family: ${fonts.display};
    font-weight: 500;
    color: ${colors.ink};
    line-height: 1.2;
    margin-bottom: 32px;
    max-width: 580px;
    font-size: 40px;
`;

export const PullQuote = styled.div`
    background: ${colors.cream};
    border-left: 3px solid ${colors.orange};
    border-radius: 0 20px 20px 0;
    padding: 32px 40px;
    margin: 40px 0;
    max-width: 660px;
`;

export const PullQuoteText = styled.p`
    font-family: ${fonts.display};
    font-size: 28px;
    font-style: italic;
    font-weight: 300;
    color: ${colors.ink};
    line-height: 1.5;
    margin: 0;
`;

export const PullQuoteCite = styled.cite`
    display: block;
    margin-top: 16px;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${colors.ink40};
`;

export const StoryDark = styled(StorySection)`
    background: ${colors.fireBg};
    color: ${colors.white};

    ${Paragraph} {
        color: ${colors.fire60};
    }

    ${Emphasis}, ${ChapterHeadline}, ${PullQuoteText} {
        color: ${colors.white};
    }

    ${PullQuote} {
        background: ${colors.ink40};
        border-left-color: ${colors.orange};
    }
`;

export const StoryDivider = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-top: 48px;
    padding-top: 40px;
    border-top: 1px solid ${colors.ink08};
    max-width: 660px;
`;

export const SigInitial = styled.div`
    font-family: ${fonts.display};
    font-size: 72px;
    font-weight: 400;
    color: ${colors.ink};
    line-height: 1;
    flex-shrink: 0;
    opacity: 0.9;
`;

export const SigDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 12px;

    strong {
        font-family: ${fonts.display};
        font-size: 21px;
        font-weight: 500;
        color: ${colors.ink};
    }

    span {
        font-size: 15px;
        color: ${colors.ink40};
    }
`;

export const GhostButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 500;
    color: ${colors.ink70};
    cursor: pointer;
    padding: 0;
    margin-top: 12px;

    &:hover {
        color: ${colors.ink};
    }

    &:hover span {
        transform: translateX(4px);
    }
`;

export const Arrow = styled.span`
    display: inline-block;
`;

export const TeamSection = styled.div`
    background: ${colors.paper3};
    padding: 96px 0;
    border-top: 1px solid ${colors.ink08};
`;

export const Label = styled.span`
    display: block;
    font-family: ${fonts.body};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${colors.orange};
    margin-top: 60px;
    margin-bottom: 16px;
    text-align: center;
`;

export const SectionTitle = styled.h2`
    font-family: ${fonts.display};
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -1px;
    color: ${colors.ink};
    font-size: 56px;
    max-width: 480px;
    margin: 0 auto;
    text-align: center;
`;

export const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 40px;
    max-width: 660px;
    margin-left: auto;
    margin-right: auto;
`;

export const TeamCard = styled.div`
    background: ${colors.cream};
    border: 1px solid ${colors.ink08};
    border-radius: 20px;
    padding: 32px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
`;

export const TeamPhoto = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid ${colors.ink08};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
    }
`;

export const TeamInfo = styled.div`
    strong {
        display: block;
        font-family: ${fonts.display};
        font-size: 21px;
        font-weight: 500;
        color: ${colors.ink};
        margin-bottom: 4px;
    }
`;

export const TeamRole = styled.span`
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${colors.orange};
    margin-bottom: 12px;
`;

export const TeamBio = styled.p`
    font-size: 15px;
    color: ${colors.ink70};
    line-height: 1.6;
`;

export const MissionSection = styled.div`
    background: ${colors.cream};
    padding: 96px 0;
    text-align: center;
    border-top: 1px solid ${colors.ink08};
    border-bottom: 1px solid ${colors.ink08};
`;

export const MissionText = styled.p`
    font-family: ${fonts.display};
    font-weight: 400;
    line-height: 1.4;
    color: ${colors.ink};
    max-width: 700px;
    margin: 0 auto 24px;
    font-size: 42px;
`;

export const MissionSub = styled.p`
    color: ${colors.ink70};
    font-size: 20px;
    max-width: 480px;
    margin: 0 auto;
`;

export const CtaSection = styled.div`
    background: ${colors.paper2};
    padding: 96px 0;
    text-align: center;
    border-top: 1px solid ${colors.ink08};
`;

export const FoundingBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${colors.lightOrange};
    color: ${colors.orange};
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 24px;

    &::before {
        font-size: 7px;
        animation: ${pulseDot} 2s ease infinite;
    }
`;

export const CtaTitle = styled.h2`
    font-family: ${fonts.display};
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -1px;
    color: ${colors.ink};
    font-size: 56px;
    margin: 12px auto 24px;
    max-width: 560px;
`;

export const CtaSub = styled.p`
    color: ${colors.ink70};
    margin: 0 auto 40px;
    max-width: 440px;
    font-size: 20px;
`;

export const HeroActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 500;
    border-radius: 40px;
    padding: 14px 32px;
    min-height: 52px;
    cursor: pointer;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};

    &:hover {
        background: ${colors.orangeHover};
    }
`;

export const OutlineButton = styled(PrimaryButton)`
    background: transparent;
    color: ${colors.ink};
    border: 2px solid ${colors.ink15};
    box-shadow: none;

    &:hover {
        background: ${colors.ink08};
        border-color: ${colors.ink40};
    }
`;
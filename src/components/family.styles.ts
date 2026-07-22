import styled from 'styled-components';

const colors = {
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    orange: '#B45A2B',
    orangeHover: '#a14e22',
    gold: '#C7A24E',
    dark: '#120E08',
    mutedBrown: 'rgba(43, 33, 23, 0.3)',
    gray: 'rgba(254, 252, 248, 0.5)',
    darkGray: 'rgba(43, 33, 23, 0.7)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};


export const FamilyContainer = styled.div`
`;

export const CardView = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 150px 80px;
`;

export const Label = styled.p`
    text-transform: uppercase;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
`;

export const GoldLabel = styled(Label)`
    color: ${colors.gold};
`;

export const SectionTitle = styled.h2`
    font-family: ${fonts.display};
    font-size: 44px;
    font-weight: 100;
    line-height: 1.1;
    letter-spacing: -1px;
    color: ${colors.dark};
    margin-top: 20px;
`;

export const Paragraph = styled.p`
    font-family: ${fonts.body};
    font-size: 18px;
    line-height: 1.6;
    color: ${colors.darkGray};
    margin-top: 24px;
`;

export const Italic = styled.span`
    font-style: italic;
    color: ${colors.gold};
`;

export const PrimaryButton = styled.button`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};
    border: none;
    padding: 22px 32px;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const GhostButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    font-family: ${fonts.body};
    font-size: 14px;
    font-weight: 600;
    color: ${colors.orange};
    cursor: pointer;
    padding: 0;

    &:hover span {
        transform: translateX(5px);
    }
`;

export const Arrow = styled.span`
    display: inline-block;
    transition: transform 0.2s ease;
`;


export const HeroSection = styled.div`
    background: ${colors.dark};
    text-align: center;
`;

export const HeroTitle = styled.h1`
    font-family: ${fonts.display};
    font-size: 56px;
    font-weight: 100;
    line-height: 1.05;
    letter-spacing: -1px;
    color: ${colors.paper};
    margin-top: 20px;
`;

export const HeroSub = styled.p`
    max-width: 640px;
    margin: 24px auto 0;
    font-family: ${fonts.body};
    font-size: 20px;
    line-height: 1.6;
    color: ${colors.gray};
`;

export const HeroLabel = styled(GoldLabel)`
    text-align: center;
`;


export const WhySection = styled.div`
    background: ${colors.cream};
`;

export const WhyLayout = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 80px;
    align-items: start;
`;

export const StatStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StatCard = styled.div`
    background: ${colors.paper};
    border-radius: 16px;
    padding: 30px;
`;

export const StatNum = styled.div`
    font-family: ${fonts.display};
    font-size: 44px;
    color: ${colors.orange};
    line-height: 1;
    margin-bottom: 10px;
`;

export const StatCaption = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.6;
    color: ${colors.darkGray};

    small {
        display: block;
        margin-top: 8px;
        color: ${colors.darkGray};
        font-size: 13px;
    }
`;

export const WhoSection = styled.div`
    background: ${colors.paper};
`;

export const WhoIntro = styled(Paragraph)`
    max-width: 540px;
`;

export const WhoCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

export const WhoCard = styled.div`
    background: ${colors.cream};
    border-radius: 20px;
    padding: 45px;
`;

export const CardTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 30px;
    font-weight: 400;
    color: ${colors.dark};
    margin-top: 12px;
`;

export const WhyNowSection = styled.div`
    background: ${colors.dark};
`;

export const WhyNowTitle = styled(SectionTitle)`
    color: ${colors.paper};
    max-width: 560px;
`;

export const WhyNowGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 50px;
`;

export const WhyNowCard = styled.div`
    border-top: 1px solid ${colors.gray};
    padding-top: 24px;
`;

export const WhyNowNum = styled.div`
    font-family: ${fonts.display};
    font-size: 40px;
    color: ${colors.gold};
    margin-bottom: 12px;
`;

export const WhyNowCardTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 24px;
    font-weight: 400;
    color: ${colors.paper};
    margin-bottom: 10px;
`;

export const WhyNowText = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.7;
    color: ${colors.gray};
`;


export const PrivacySection = styled.div`
    background: ${colors.cream};
    text-align: center;
`;

export const PrivacySub = styled(Paragraph)`
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

export const PromiseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 60px;
    text-align: left;
`;

export const PromiseCard = styled.div`
    background: ${colors.paper};
    border-radius: 16px;
    padding: 35px;
`;

export const PromiseIcon = styled.div`
    color: ${colors.orange};
    margin-bottom: 20px;
`;

export const PromiseTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 22px;
    font-weight: 400;
    color: ${colors.dark};
    margin-bottom: 10px;
`;

export const PromiseText = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.6;
    color: ${colors.darkGray};
`;

export const PrivacyFooterNote = styled.p`
    text-align: center;
    margin-top: 60px;
    font-family: ${fonts.body};
    font-size: 14px;
    color: ${colors.orange};
`;

export const FounderSection = styled.div`
    background: ${colors.paper};
`;

export const FounderLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
`;

export const Blockquote = styled.blockquote`
    font-family: ${fonts.display};
    font-style: italic;
    font-size: 22px;
    line-height: 1.5;
    color: ${colors.dark};
    border-left: 3px solid ${colors.orange};
    padding-left: 24px;
    margin: 24px 0;
`;

export const FounderPhoto = styled.div`
    img {
        width: 100%;
        border-radius: 20px;
        display: block;
    }
`;

export const CtaSection = styled.div`
    background: ${colors.cream};
    text-align: center;
`;

export const FoundingBadge = styled.div`
    display: inline-block;
    color: ${colors.orange};
    border: 1px solid ${colors.orange};
    border-radius: 25px;
    padding: 8px 20px;
    font-family: ${fonts.body};
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 20px;
`;

export const CtaTitle = styled(SectionTitle)`
    color: ${colors.dark};
`;

export const CtaSub = styled(HeroSub)`
    color: ${colors.darkGray};
`;

export const CtaActions = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 40px;
`;

export const OutlineButton = styled(PrimaryButton)`
    background: none;
    color: ${colors.darkGray};
    border: 1px solid ${colors.darkGray};

    &:hover {
        background: ${colors.mutedBrown};
    }
`;
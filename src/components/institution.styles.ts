import { Link } from 'react-router-dom';
import { color, font } from '../styles/theme';
import styled, { css } from 'styled-components';

const colors = {
    cream: color.ivory,
    paper: color.paper,
    orange: color.accent,
    onAccent: color.paperPure,
    orangeText: color.accentText,
    orangeHover: color.accentHover,
    gold: color.gold,
    dark: color.primaryDeep,
    mutedBrown: color.faint,
    gray: color.onDarkMuted,
    darkGray: color.body,
    ink40: color.faint,
    whiteGray: color.primaryLine,
};

const fonts = {
    body: font.body,
    display: font.display,
    script: font.script,
};

export const InstitutionContainer = styled.div`
`;

export const CardView = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: clamp(72px, 9vw, 150px) clamp(20px, 5vw, 80px);
`;

export const Label = styled.p`
    text-transform: uppercase;
    color: ${colors.orangeText};
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

export const SmallNote = styled.p`
    font-family: ${fonts.body};
    font-size: 13px;
    color: ${colors.ink40};
    margin-top: 20px;
`;

export const Italic = styled.span`
    font-style: italic;
    color: ${colors.gold};
`;

/** The same emphasis on a light ground, where Warm Gold cannot carry text. */
export const ItalicAccent = styled(Italic)`
    color: ${colors.orangeText};
`;

const primaryButtonCss = css`
    text-decoration: none;
    font-family: ${fonts.body};
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.onAccent};
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

export const PrimaryButton = styled(Link)`
    ${primaryButtonCss};
`;

/** The same button as an anchor, for mailto conversion links. */
export const PrimaryButtonAnchor = styled.a`
    ${primaryButtonCss};
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
    color: ${colors.orangeText};
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

export const HeroButtons = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 40px;
`;

export const TrustBarSection = styled.div`
    background: ${colors.paper};
    border-bottom: 1px solid ${colors.mutedBrown};
    padding: 30px 0;
`;

export const TrustList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`;

export const TrustItem = styled.span`
    font-family: ${fonts.body};
    font-size: 14px;
    font-weight: 600;
    color: ${colors.darkGray};
`;

export const EvidenceSection = styled.div`
    background: ${colors.cream};
`;

export const EvidenceLayout = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    @media (max-width: 1024px) { grid-template-columns: 1fr; }
    gap: 80px;
    align-items: start;
`;

export const EvidenceStats = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const EvidenceStat = styled.div`
    background: ${colors.paper};
    border-radius: 16px;
    padding: 30px;
`;

export const StatNum = styled.div`
    font-family: ${fonts.display};
    font-size: 44px;
    color: ${colors.orangeText};
    line-height: 1;
    margin-bottom: 10px;
`;

export const StatText = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.6;
    color: ${colors.darkGray};
`;

export const QuoteSection = styled.div`
    background: ${colors.dark};
    text-align: center;
`;

export const QuoteText = styled.blockquote`
    font-family: ${fonts.display};
    font-size: 28px;
    font-weight: 400;
    font-style: italic;
    color: ${colors.paper};
    line-height: 1.5;
    max-width: 720px;
    margin: 0 auto;
`;

export const QuoteCite = styled.cite`
    display: block;
    margin-top: 24px;
    font-family: ${fonts.body};
    font-style: normal;
    font-size: 14px;
    color: ${colors.gray};
`;

export const UseCasesSection = styled.div`
    background: ${colors.paper};
`;

export const IntroText = styled(Paragraph)`
    max-width: 580px;
`;

export const UseCasesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 860px) { grid-template-columns: 1fr; }
    gap: 30px;
    margin-top: 50px;
`;

export const UseCaseCard = styled.div`
    background: ${colors.cream};
    border-radius: 20px;
    padding: 45px;
`;

export const UseCaseIcon = styled.div`
    color: ${colors.orangeText};
    margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 26px;
    font-weight: 400;
    color: ${colors.dark};
`;

export const OpenAllSection = styled.div`
    background: ${colors.cream};
`;

export const OpenAllGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
    gap: 40px;
    margin-top: 60px;
`;

export const OpenAllItem = styled.div`
    border-top: 1px solid ${colors.mutedBrown};
    padding-top: 24px;
`;

export const OpenAllTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 22px;
    font-weight: 400;
    color: ${colors.dark};
    margin-bottom: 10px;
`;

export const OpenAllText = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.7;
    color: ${colors.darkGray};
`;

export const CenteredCta = styled.div`
    text-align: center;
    margin-top: 60px;
`;

export const ImplementationSection = styled.div`
    background: ${colors.paper};
`;

export const ImplGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
    gap: 40px;
    margin-top: 50px;
`;

export const ImplStep = styled.div`
    background: ${colors.cream};
    border-radius: 20px;
    padding: 35px;
`;

export const ImplStepNum = styled.div`
    font-family: ${fonts.display};
    font-size: 40px;
    color: ${colors.orangeText};
    margin-bottom: 16px;
`;


export const ComplianceSection = styled.div`
    background: ${colors.dark};
`;

export const ComplianceTitle = styled(SectionTitle)`
    color: ${colors.paper};
    max-width: 600px;
`;

export const ComplianceSub = styled.p`
    max-width: 540px;
    margin-top: 24px;
    font-family: ${fonts.body};
    font-size: 18px;
    line-height: 1.6;
    color: ${colors.gray};
`;

export const ComplianceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
    gap: 30px;
    margin-top: 60px;
`;

export const ComplianceItem = styled.div`
    border-top: 1px solid rgba(254, 252, 248, 0.2);
    padding-top: 24px;
`;

export const ComplianceItemTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 22px;
    font-weight: 400;
    color: ${colors.paper};
    margin-bottom: 10px;
`;

export const ComplianceItemText = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.6;
    color: ${colors.gray};
`;

export const TestimonialSection = styled.div`
    background: ${colors.paper};
    border-top: 1px solid ${colors.mutedBrown};
    text-align: center;
`;

export const CtaSection = styled.div`
    background: ${colors.cream};
    text-align: center;
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

export const TrustBarInner = styled(CardView)`
    padding: 0 clamp(20px, 5vw, 80px);
`;

export const QuoteCardView = styled(CardView)`
    padding: clamp(64px, 8vw, 120px) clamp(20px, 5vw, 80px);
`;

export const DarkQuoteText = styled(QuoteText)`
    max-width: 450px;
`;

export const DarkQuoteCite = styled(QuoteCite)`
`;

export const LightQuoteText = styled(QuoteText)`
    color: ${colors.dark};
    font-size: 26px;
`;

export const LightQuoteCite = styled(QuoteCite)`
    color: ${colors.ink40};
`;

export const WideSectionTitle = styled(SectionTitle)`
    max-width: 600px;
`;

export const NarrowSectionTitle = styled(SectionTitle)`
    max-width: 560px;
`;

export const WideIntroText = styled(IntroText)`
    max-width: 620px;

    a {
        color: ${colors.orangeText};
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
        &:hover { text-decoration: underline; text-underline-offset: 4px; }
    }
`;

export const ImplGridSpaced = styled(ImplGrid)`
    margin-top: 30px;
`;

export const PrivacyButton = styled(PrimaryButton)`
    background: none;
    color: ${colors.dark};
    border: 1px solid ${colors.darkGray};

    &:hover {
        background: ${colors.whiteGray};
    }
`;
import styled from 'styled-components';

const colors = {
    cream: '#EFE6D4',
    paper2: '#F1E9DA',
    orange: '#B45A2B',
    orangeHover: '#a14e22',
    dark: '#120E08',
    gray: 'rgba(254, 252, 248, 0.5)',
    darkGray: 'rgba(43, 33, 23, 0.7)',
    ink15: 'rgba(43, 33, 23, 0.15)',
    ink08: 'rgba(43, 33, 23, 0.08)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};


export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 80px;
`;

export const NarrowContainer = styled(Container)`
    max-width: 880px;
`;

export const Label = styled.p`
    text-transform: uppercase;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 16px;
    text-align: center;
`;

export const LegalLink = styled.a`
    color: ${colors.orange};
    text-decoration: underline;
`;

export const FaqHero = styled.div`
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
    max-width: 640px;
    margin: 0px auto;
    margin-bottom: 20px;
    text-align: center;
`;

export const HeroSub = styled.p`
    font-family: ${fonts.body};
    font-size: 18px;
    color: ${colors.darkGray};
    max-width: 480px;
    line-height: 1.6;
    margin: 0px auto;
    text-align: center;
`;

export const FaqSection = styled.div`
    background: ${colors.cream};
    padding: 100px 0;
`;

export const FaqGroup = styled.div`
    margin-bottom: 64px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const FaqGroupLabel = styled.p`
    font-family: ${fonts.body};
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${colors.orange};
    margin-bottom: 32px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${colors.ink08};
`;

export const FaqItem = styled.div`
    border-bottom: 1px solid ${colors.ink08};
`;

type FaqQuestionProps = {
    $isOpen: boolean;
};

export const FaqQuestion = styled.button<FaqQuestionProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 0;
    font-family: ${fonts.display};
    font-size: 21px;
    font-weight: 500;
    color: ${(props) => (props.$isOpen ? colors.orange : colors.dark)};
    text-align: left;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${colors.orange};
    }
`;

export const FaqQuestionIcon = styled.span<FaqQuestionProps>`
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1.5px solid ${(props) => (props.$isOpen ? colors.orange : colors.ink15)};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    color: ${(props) => (props.$isOpen ? colors.orange : colors.darkGray)};
    transform: ${(props) => (props.$isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
`;

export const FaqAnswer = styled.div<FaqQuestionProps>`
    overflow: hidden;
    max-height: ${(props) => (props.$isOpen ? '800px' : '0')};
    transition: max-height 0.4s ease;
`;

export const FaqAnswerInner = styled.div`
    padding-bottom: 32px;
    font-family: ${fonts.body};
    font-size: 18px;
    color: ${colors.darkGray};
    line-height: 1.75;
    max-width: 680px;
`;

export const AnswerParagraph = styled.p`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Bold = styled.strong`
    color: ${colors.dark};
    font-weight: 600;
`;

export const CtaSection = styled.div`
    background: ${colors.paper2};
    padding: 100px 0;
    text-align: center;
    border-top: 1px solid ${colors.ink08};
`;

export const CtaTitle = styled.h2`
    font-family: ${fonts.display};
    font-size: 50px;
    font-weight: 100;
    line-height: 1.1;
    letter-spacing: -1px;
    color: ${colors.dark};
    margin: 12px auto 24px;
    max-width: 560px;
`;

export const CtaSub = styled.p`
    color: ${colors.darkGray};
    margin: 0 auto 40px;
    max-width: 440px;
    font-family: ${fonts.body};
    font-size: 18px;
    line-height: 1.6;
`;

export const CtaActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
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

export const OutlineButton = styled(PrimaryButton)`
    background: none;
    color: ${colors.darkGray};
    border: 1px solid ${colors.darkGray};

    &:hover {
        background: rgba(43, 33, 23, 0.08);
    }
`;
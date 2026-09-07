import styled from 'styled-components';
import { color, font } from '../styles/theme';

const colors = {
    cream: color.ivory,
    paper2: color.paper,
    orange: color.accent,
    onAccent: color.paperPure,
    orangeText: color.accentText,
    orangeHover: color.accentHover,
    dark: color.primaryDeep,
    gray: color.onDarkMuted,
    darkGray: color.body,
    ink15: color.primaryLine,
    ink08: 'rgba(15, 74, 88, 0.08)',
};

const fonts = {
    body: font.body,
    display: font.display,
    script: font.script,
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
    color: ${colors.orangeText};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 16px;
    text-align: center;
`;

export const LegalLink = styled.a`
    color: ${colors.orangeText};
    text-decoration: underline;
`;

export const FaqHero = styled.div`
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
    padding: clamp(56px, 7vw, 100px) 0;
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
    color: ${colors.orangeText};
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
        color: ${colors.orangeText};
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
    padding: clamp(56px, 7vw, 100px) 0;
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

export const OutlineButton = styled(PrimaryButton)`
    background: none;
    color: ${colors.darkGray};
    border: 1px solid ${colors.darkGray};

    &:hover {
        background: rgba(43, 33, 23, 0.08);
    }
`;
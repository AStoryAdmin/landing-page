import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { color, font } from '../styles/theme';

const colors = {
    cream: color.ivory,
    paper: color.paper,
    orange: color.accent,
    onAccent: color.paperPure,
    orangeText: color.accentText,
    orangeHover: color.accentHover,
    gold: color.gold,
    dark: color.primaryDeep,
    whiteGray: color.primaryLine,
    gray: color.onDarkMuted,
    darkGray: color.body,
};

const fonts = {
    body: font.body,
    display: font.display,
    script: font.script,
};


export const FamilyContainer = styled.div`
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

export const Italic = styled.span`
    font-style: italic;
    color: ${colors.gold};
`;

/** The same emphasis on a light ground, where Warm Gold cannot carry text. */
export const ItalicAccent = styled(Italic)`
    color: ${colors.orangeText};
`;

const primaryButtonCss = css`
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

export const PrimaryButton = styled.button`
    ${primaryButtonCss};
`;

/** The same button as an anchor, for mailto conversion links. */
export const PrimaryButtonAnchor = styled.a`
    ${primaryButtonCss};
    display: inline-flex;
`;

/* The same button, for an internal route. The gift CTAs used to be mailto:
   anchors; they now go to /start, and a react-router Link keeps that a
   client-side navigation rather than a full page load. The anchor stays for
   the mailto CTAs that are still genuinely mailto. */
export const PrimaryButtonLink = styled(Link)`
    ${primaryButtonCss};
    display: inline-flex;
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


export const WhySection = styled.div`
    background: ${colors.cream};
`;

export const WhyLayout = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    @media (max-width: 1024px) { grid-template-columns: 1fr; }
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
    color: ${colors.orangeText};
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

/* ── What actually goes missing ───────────────────────────────────────────
 * These cards replaced the 1.4B / 10K / 63M stat stack. Those numbers argued
 * demographics — the same "the window is closing" case every product in this
 * category makes — and they contradicted the claim the page now leads with,
 * which is that the record is never finished.
 */

export const MissingCard = styled(StatCard)`
    border-left: 3px solid ${colors.gold};
`;

export const MissingThing = styled.h3`
    font-family: ${fonts.display};
    font-size: 24px;
    font-weight: 400;
    line-height: 1.25;
    color: ${colors.dark};
`;

export const MissingFate = styled.p`
    font-family: ${fonts.body};
    font-size: 15px;
    line-height: 1.65;
    color: ${colors.darkGray};
    margin-top: 10px;
`;

/** The line a section lands on, set apart from the cards above it. */
export const Coda = styled.p`
    font-family: ${fonts.display};
    font-size: clamp(24px, 1.4rem + 1.1vw, 32px);
    font-style: italic;
    font-weight: 300;
    line-height: 1.35;
    color: ${colors.dark};
    max-width: 30ch;
    margin-top: 50px;
    padding-top: 32px;
    border-top: 1px solid ${colors.whiteGray};
`;

/** The same, on the deep ground where Soft Ivory carries the type. */
export const DarkCoda = styled(Coda)`
    color: ${colors.paper};
    border-top-color: ${colors.gray};
`;

/** Three cards rather than two, for the voices on a single moment. */
export const VoiceCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr; }
    gap: 24px;
    margin-top: 50px;
`;

export const VoiceCard = styled.div`
    background: ${colors.paper};
    border-radius: 20px;
    padding: 36px;
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
    @media (max-width: 860px) { grid-template-columns: 1fr; }
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
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
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
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
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
    color: ${colors.orangeText};
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
    color: ${colors.orangeText};
`;

export const FounderSection = styled.div`
    background: ${colors.paper};
`;

export const FounderLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 860px) { grid-template-columns: 1fr; }
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

const outlineButtonCss = css`
    ${primaryButtonCss};
    background: none;
    color: ${colors.dark};
    border: 1px solid ${colors.dark};

    &:hover {
        background: ${colors.whiteGray};
    }
`;

export const OutlineButton = styled.button`
    ${outlineButtonCss};
`;

/** The same button as a router link. */
export const OutlineButtonLink = styled(Link)`
    ${outlineButtonCss};
    display: inline-flex;
    text-decoration: none;
`;

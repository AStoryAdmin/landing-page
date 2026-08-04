import styled, { keyframes } from 'styled-components';
import bgImg from './../assets/heroFamilyYard.png';
import { Link } from 'react-router-dom';

const colors = {
    bgCream: 'rgba(239, 230, 212, 0.85)',
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    orange: '#B45A2B',
    orangeHover: '#a14e22',
    gold: '#C7A24E',
    softYellow: '#E6D8BF',
    dark: '#120E08',
    mutedBrown: 'rgba(43, 33, 23, 0.5)',
    gray: 'rgba(254, 252, 248, 0.5)',
    whiteGray: 'rgba(43, 33, 23, 0.4)',
    darkgray: 'rgba(43, 33, 23, 0.2)',
    black: '#000000',
    green: '#5A9E6F',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

const pulseDot = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;

export const BodyContainer = styled.div`
    background: ${colors.cream}; 
    // Prevents accidental text-highlighting and the text-editing cursor on hover
    user-select: none;
`;

export const CardView = styled.div`
    padding: 150px 30px;
`;

export const ImageContainer = styled.div`
    background-image: url(${bgImg});
    background-size: cover;     
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${colors.bgCream};
    background-blend-mode: lighten; 
    text-align: center;
    font-family: ${fonts.body}; 
`;

export const Intro = styled.p`
    text-transform: uppercase;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 1000;
    letter-spacing: 4px;
    padding-top: 6px;
`;

export const Title = styled.h1`
    font-family: ${fonts.display};
    font-size: 40px;
    font-weight: 100;
    line-height: 1;
    // tightening the text
    letter-spacing: -1px;
    border: none;
`;

export const ListenText = styled.span`
    font-style: italic;
    color: ${colors.orange};
`;

export const Description = styled.p`
    max-width: 650px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 100;
    letter-spacing: 1px;
    line-height: 1.5;
    font-family: ${fonts.body};
    color: ${colors.mutedBrown}
`;

export const ExtraDescription = styled.p`
    max-width: 520px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 1px;
    line-height: 1.85;
    opacity: 50%;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
`;

export const AccessButton = styled(Link)`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};
    border: none;
    padding: 24px 32px;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const DemoButton = styled(AccessButton)`
    background: none;
    color: ${colors.black};
    border: 1px solid ${colors.mutedBrown};

    &:hover {
        background: ${colors.darkgray};
        transform: translateY(-1.5px);
    }
`;

export const BulletPoints = styled.span`
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 36px;
    color: ${colors.mutedBrown};
    font-size: 14px;
`;

export const BulletIcon = styled.span`
    color: ${colors.orange};
`;

export const InstructionContainer = styled.div`
    background-color: ${colors.bgCream};
`;

export const StepCard = styled.div`
    border: 1px solid ${colors.darkgray};
    border-radius: 16px;
    background: ${colors.paper};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export const Column = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${colors.darkgray};

    &:last-child {
        border-right: none;
    }
`;

export const StepNumber = styled.span`
    font-family: ${fonts.display};
    font-size: 64px;
    font-weight: 300;
    color: ${colors.darkgray};
    line-height: 1;
`;

export const StepTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 36px;
    font-weight: 400;
    color: ${colors.black};
`;

export const Content = styled.span`
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 300;
    color: ${colors.mutedBrown};
    line-height: 1.75;
    padding-top: 6px;
`;

export const Links = styled.button`
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 300;
    color: ${colors.mutedBrown};
    line-height: 1.75;
    cursor: pointer;
    background: none;
    border: none;
    padding: 8px 0px;
    text-align: left;
    transition: color 0.2s;

    &:hover {
        color: #B45A2B;
    }
`;

export const PurposeContainer = styled.div`
    background-color: ${colors.softYellow};
    text-align: center;
`;

export const GiftButton = styled(AccessButton)`
`;

export const TagRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 50px;
`;

export const Tag = styled.span`
    font-family: ${fonts.body};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${colors.whiteGray};
    background-color: ${colors.cream};
    border-radius: 999px;
    padding: 12px 20px;
`;

export const ScaleContainer = styled.div`
    text-align: center;
    background-color: ${colors.dark};
`;

export const ScaleNumber = styled(StepNumber)`
    color: ${colors.gold};
    
`;

export const ScaleContent = styled(Content)`
    padding-top: 6px;
    color: ${colors.cream};
    
`;

export const ScaleRef = styled.span`
    padding-top: 6px;
    color: ${colors.gray};
    
`;

export const ScaleColumn = styled(Column)`
    border-right: 1px solid ${colors.gray};

    &:last-child {
        border-right: none;
    }
`;

export const ReviewContainer = styled.div`
    background-color: ${colors.paper};
`;

export const Heading = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

export const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    background-color: ${colors.green};
    border-radius: 50%; 
    display: inline-block;     
    margin-right: 10px;
    
    animation: ${pulseDot} 2s infinite;
`;

export const StatusFamily = styled.span`
    font-family: ${fonts.body};
    font-size: 15px;
    color: ${colors.mutedBrown};
    padding-right: 20px;
`;

export const ReviewColumn = styled(Column)`
    background-color: ${colors.cream};
    margin-right: 20px;
    border: none;
    border-left: 3px solid ${colors.orange};
    border-radius: 20px;
`;

export const ReviewContent = styled(Content)`
    font-family: ${fonts.display};
    font-size: 18px;
    color: ${colors.black};
    font-style: italic;
`;

export const User = styled(Content)`
    font-size: 13px;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${colors.darkgray};
    margin: 50px 0px;
`;

export const Comparsion = styled.p`
    text-align: center;
    font-family: ${fonts.display};
    font-size: 20px;
    margin: 0px 120px;
`;

export const Bold = styled.span`
    font-weight: bold;
`;

export const OurBrand = styled(Bold)`
    font-weight: bold;
    color: ${colors.orange};
`;

export const QuoteContainer = styled.div`
    text-align: center;
    background-color: ${colors.dark};
`;

export const Quote = styled(Title)`
    font-style: italic;
    color: ${colors.paper};
`;

export const Subtitle = styled.p`
    color: ${colors.gray};
`;

export const AccessContainer = styled.div`
    text-align: center;
`;

export const FamilyButton = styled(DemoButton)`
`;
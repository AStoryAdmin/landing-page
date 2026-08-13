import styled from 'styled-components';
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
    mutedBrown: 'rgba(43, 33, 23, 0.3)',
    gray: 'rgba(254, 252, 248, 0.5)',
    darkGray: 'rgba(43, 33, 23, 0.7)',
    darkGrayHover: 'rgba(43, 33, 23, 0.2)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const ExperienceContainer = styled.div`
    background: ${colors.cream}; 
    user-select: none;
`;

export const OpeningContainer = styled.div`
    text-align: center;
    background: ${colors.dark};
`;

export const CardView = styled.div`
    padding: 150px 80px;
    max-width: 1300px;
    margin: 0 auto;
`;

export const Intro = styled.p`
    text-transform: uppercase;
    color: ${colors.gold};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 1000;
    letter-spacing: 4px;
    padding-top: 6px;
`;

export const Title = styled.h1`
    font-family: ${fonts.display};
    color: ${colors.paper};
    font-size: 50px;
    font-weight: 100;
    line-height: 1;
    letter-spacing: -1px;
    border: none;
`;

export const HighlightText = styled.span`
    font-style: italic;
    color: ${colors.gold};
`;

export const Description = styled.p`
    max-width: 550px;
    margin: 0 auto;
    margin-bottom: 50px;
    font-size: 18px;
    font-weight: 100;
    letter-spacing: 1px;
    line-height: 1.5;
    font-family: ${fonts.body};
    color: ${colors.gray};
`;

export const DemoButton = styled.div`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};
    border: none;
    padding: 24px 32px;
    margin-top: 20px;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const InstructionContainer = styled.div`
`;

export const StepIntro = styled(Intro)`
    color: ${colors.orange};
`;

export const InstructTitle = styled(Title)`
    max-width: 650px;
    color: ${colors.dark};
`;

export const Subtitle = styled.p`
    font-size: 18px;
    font-weight: 100;
    letter-spacing: 1px;
    line-height: 1.5;
    font-family: ${fonts.body};
    max-width: 580px;
    color: ${colors.darkGray};
`;

export const StepCard= styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 50px;
    gap: 50px;
`;

export const Column= styled.div`
    background: ${colors.paper};
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
`;

export const OddColumn= styled(Column)`
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: baseline;
    gap: 30px;
`;

export const StepNumber = styled.span`
    font-family: ${fonts.display};
    font-size: 50px;
    font-weight: 300;
    color: ${colors.mutedBrown};
    line-height: 1;
`;

export const StepTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 30px;
    font-weight: 400;
    color: ${colors.dark};
`;

export const Content = styled.span`
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 300;
    color: ${colors.mutedBrown};
    line-height: 1.75;
    padding-top: 6px;
`;

export const AIContainer = styled.div`
    background: ${colors.softYellow};
`;

export const Card = styled.div`
    border: 1px solid ${colors.cream};
    border-radius: 16px;
    background: ${colors.paper};
`;

export const Grid = styled.div`
    display: grid;

    //creates 4 columns of exactly equal width (1 fraction unit)
    grid-template-columns: repeat(4, 1fr);
`;

export const RoleColumn = styled.div`
    padding: 40px;
    border-right: 3px solid ${colors.cream};
    &:last-child {
        border-right: none;
    }
`;

export const Arrow = styled.span`
    font-family: ${fonts.body};
    color: ${colors.darkGray};
    padding: 12px 0px;
`;

export const Demo = styled.div`
    display: flex;
    gap: 80px;
    align-items: center;
    margin-top: 100px;
    scroll-margin-top: 150px;

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 40px;
    }
`;

export const DemoIntro = styled(Intro)`
    color: ${colors.darkGray};
`;

export const Summary = styled.div`
    max-width: 50%;

    @media (max-width: 900px) {
        max-width: 100%;
    }
`;

export const PhoneDemo = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    width: 330px;
    height: 660px;
    border-radius: 42px;
    //content outside frame dont get cut off
    overflow: hidden;
    box-shadow: 2px 2px 50px 0px ${colors.mutedBrown};
`;

export const StatusBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    font-size: 12px;
    font-weight: 600;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid ${colors.mutedBrown};
`;

export const StatusTime = styled.span`
    font-size: 15px;
`;

export const Screen = styled.div`
    background: ${colors.cream};
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
`;

export const PlayDemo = styled.div`
    text-align: center;
    padding: 20px 25px;
    font-size: 12px;
    font-weight: 600;
    border-top: 1px solid ${colors.mutedBrown};
`;

export const PlayDemoButton = styled.button`
    background: ${colors.cream};
    color: ${colors.orange};
    border: none;
    margin-top: 1px;
    padding: 15px 20px;
    border-radius: 50px;

    &:hover {
        background: ${colors.paper};
    }

`;

export const InteractiveBookContainer = styled(OpeningContainer)`
`;

export const AccessContainer = styled(OpeningContainer)`
    background: ${colors.cream};
`;

export const Note = styled(Description)`
    margin-top: 30px;
    font-size: 15px;
    font-style: italic;
`;

export const BookIntro = styled(Intro)`
    color: ${colors.gold};
    text-align: left;
`;

export const BookTitle = styled(Title)`
    text-align: left;
`;

export const BookSubtitle = styled(Description)`
    text-align: left;
    margin: 0px;
`;

export const BulletList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const BulletItem = styled.li`
    position: relative;
    padding-left: 28px;
    font-family: ${fonts.body};
    font-size: 18px;
    line-height: 1.6;
    color: ${colors.gray};
    text-align: left;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${colors.gold};
    }
`;

export const Bold = styled.span`
    color: ${colors.paper};
    font-weight: bold;
`;

export const PriceBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    padding: 24px 30px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
`;

export const Price = styled.span`
    font-family: ${fonts.display};
    font-size: 30px;
    color: ${colors.gold};
    font-style: italic;
`;

export const PriceDivider = styled.span`
    width: 1px;
    height: 40px;
    background: ${colors.gray};
`;

export const PriceDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: ${colors.gray};
    font-size: 15px;
    text-align: left;
`;

export const BookImg = styled.div`
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    max-width: 500px;

    img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }
`;

export const DarkIntro = styled(Intro)`
    color: ${colors.orange};
`;

export const DarkTitle = styled(Title)`
    color: ${colors.dark};
`;

export const DarkDescription = styled(Description)`
    color: ${colors.dark};
`;

export const SignupButton = styled(Link)`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};
    border: none;
    padding: 24px 32px;
    margin-top: 20px;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    scroll-margin-top: 100px;

    &:hover {
        background: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const FamilyButton = styled(SignupButton)`
    margin-left: 10px;
    background: none;
    color: ${colors.dark};
    border: 1px solid ${colors.mutedBrown};

    &:hover {
        background: ${colors.darkGrayHover};
        transform: translateY(-1.5px);
    }
`;



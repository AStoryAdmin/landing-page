import styled, {keyframes} from 'styled-components';

const colors = {
    blurGold: 'rgba(199,162,78,0.15)',
    dark: '#120E08',
    darkGray: 'rgba(18, 14, 8, 0.4)',
    gray: 'rgba(254, 252, 248, 0.5)',
    orange: '#b45a2b',
    orangeHover: '#a14e22',
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    gold: '#C7A24E',
    green: '#5A9E6F',
    red: '#c0392b',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

const pulseDot = keyframes `
    0%, 100% {opacity: 1}
    50% {opacity: 0.3}
`;
export const SignupContainer = styled.div`
    text-align: center;
`;

export const Heading = styled.div`
    background: ${colors.dark};
    padding: 120px 30px;
    letter-spacing: 2px;
`;

export const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    background-color: ${colors.gold};
    border-radius: 50%; 
    display: inline-block;     
    margin-right: 10px;
    
    animation: ${pulseDot} 2s infinite;
`;

export const Intro = styled.p`
    display: inline-flex;
    align-items: center;
    color: ${colors.gold};
    border: 1px solid ${colors.blurGold};
    border-radius: 25px;
    padding: 4px 8px;
`;

export const Title = styled.h1`
    margin-top: 20px;
    font-family: ${fonts.display};
    font-size: 55px;
    font-weight: 100;
    line-height: 0.96;
    border: none;
    color: ${colors.cream};
`;

export const Highlight = styled.p`
    font-style: italic;
    color: ${colors.gold};
    margin: 0px 6px;
`;

export const Description = styled.p`
    max-width: 450px;
    margin: 0 auto;
    margin-bottom: 15px;
    font-size: 20px;
    line-height: 1.55;
    font-weight: 100;
    font-family: ${fonts.body};
    color: ${colors.gray};
`;

export const Stats = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${colors.gold};
    font-family: ${fonts.body};
    font-size: 14px;
`;

export const Form = styled.div`
    padding: 100px 0px;
    background-color: ${colors.cream};
`;

export const ActionIntro = styled.p`
    text-transform: uppercase;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 12.25px;
    font-weight: 1000;
    letter-spacing: 4px;
    padding-top: 6px;
`;

export const FormTitle = styled(Title)`
    color: ${colors.dark};
    font-size: 40px;
    max-width: 480px;
    margin: 30px auto;
    line-height: 1.2;

`;

export const Contact = styled.div`
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
`;

export const Name = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`;

export const First = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 2px;
        color: ${colors.darkGray};
        font-family: ${fonts.body};
    }

    input {
        padding: 16px 18px;
        border: 1px solid ${colors.gray};
        border-radius: 12px;
        background: ${colors.gray};
        font-size: 16px;
        font-family: ${fonts.body};
        color: ${colors.dark};
        outline: none;
        transition: border-color 0.2s ease;

        &::placeholder {
            color: ${colors.darkGray};
        }

        &:focus {
            border-color: ${colors.orange};
        }
    }
`;

export const Last = styled(First)`
`;

export const Email = styled(First)`
    margin-bottom: 20px;
`;

export const Phone = styled(Email)`
`;

export const SignupButton = styled.button`
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${colors.orange};
    color: ${colors.cream};
    border: none;
    padding: 24px 32px;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const Note = styled.p`
    text-align: center;
    color: ${colors.darkGray};
    font-size: 14.5px;
    font-weight: 100;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 0.1px solid ${colors.darkGray};
    margin: 50px 0px;
`;

export const CurrStatusDot = styled(StatusDot)`
    background-color: ${colors.green};
`;

export const MembershipIntro = styled(Intro)`
    color: ${colors.dark};
    border: none;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;
    max-width: 500px;

    background-color: ${colors.paper};
    border-left: 3px solid ${colors.orange};
    border-radius: 20px;
`;

export const Review = styled.p` 
    padding: 0px 20px;
    text-align: left;
    font-family: ${fonts.display};
    font-style: italic;
    font-size: 20px;
    line-height: 1.5;
    color: ${colors.dark};
`;

export const User = styled(Review)`
    font-family: ${fonts.body};
    font-size: 14px;
    color: ${colors.darkGray};
`;

export const ErrorMsg = styled.span`
    display: block;
    font-weight: bold;
    color: ${colors.red};
    font-size: 15px;
    font-family: ${fonts.body};
    margin-top: 6px;
`;
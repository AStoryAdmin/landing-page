import styled from 'styled-components';

const colors = {
    cream: '#EFE6D4',
    orange: '#B45A2B',
    orangeHover: '#a14e22',
    orangeText: '#f4ebe1',
    darkBrown: 'rgba(43, 33, 23, 0.72)',
    darkBrownHover: '#2B2117',
    mutedBrown: 'rgba(43, 33, 23, 0.5)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const FirstPageContainer = styled.section`
    background-color: ${colors.cream};
    text-align: center;
    width: auto;
    padding-top: 180px;
    padding-bottom: 100%;
    font-family: ${fonts.body};
`;

export const Intro = styled.p`
    text-transform: uppercase;
    color: ${colors.orange};
    font-size: 12.25px;
    font-weight: 1000;
    letter-spacing: 0.22em;
    padding-top: 6px;
`;

export const Title = styled.h1`
    font-family: ${fonts.display};
    font-size: 75px;
    font-weight: 300;
    line-height: 0.96;
    letter-spacing: -0.025em;
    border: none;
    margin: 30px;
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
    letter-spacing: 0.01em;
    line-height: 1.55;
`;

export const Highlight = styled.span`
    color: ${colors.orange};
    font-weight: bold;
`;

export const ExtraDescription = styled.p`
    max-width: 520px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 0.04em;
    line-height: 1.85;
    opacity: 50%;
`;

// ---- Buttons ----
export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
    padding: 10px;
`;

export const WaitlistButton = styled.button`
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: ${colors.orange};
    color: ${colors.orangeText};
    border: none;
    padding: 1.5rem 2rem;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.orangeHover};
        transform: translateY(-1px);
    }
`;

export const ActionButton = styled.button`
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: none;
    color: ${colors.darkBrown};
    border: 1px solid ${colors.darkBrown};
    padding: 1.5rem 3rem;
    border-radius: 3px;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;

    &:hover {
        color: ${colors.darkBrownHover};
        transform: translateY(-1.5px);
    }
`;

export const BulletPoints = styled.span`
    display: flex;
    gap: 1.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    color: ${colors.mutedBrown};
    font-size: 0.82rem;
`;

export const BulletIcon = styled.span`
    color: ${colors.orange};
`;
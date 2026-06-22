import styled from "styled-components";

const colors = {
    gold: '#C7A24E',
    darkBrown: '#231a12',
    cream: '#EFE6D4',

};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const SecondPageContainer = styled.div`
    padding: 180px 0;
    background-color: ${colors.darkBrown};
    color: ${colors.cream};
    text-align: center;
`;
export const Title = styled.h1`
    font-family: ${fonts.display};
    font-size: 75px;
    font-weight: 300;
    line-height: 0.96;
    letter-spacing: -0.025em;
`;

export const Highlight = styled.p`
    font-style: italic;
    margin: 1px;
    color: ${colors.gold};
`;

export const Description = styled.p`
    font-size: 15px;
    font-family: ${fonts.body};
    max-width: 500px;
    margin: 0 auto;
    font-size: 20px;
    opacity: 60%;
    font-weight: 100;
    letter-spacing: 0.04em;
    line-height: 1.85;
`;

export const StatsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 4rem;
    margin: 3rem 60px;
    font-family: ${fonts.body};
`;

export const CountBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CounterAnimation = styled.div`
    font-size: 75px;
    font-style: italic;
    color: ${colors.gold}
`;

export const CountLabel = styled.p`
    text-transform: uppercase;
    font-size: 12px;
    opacity: 50%;
    margin-bottom: 250px;

`;

export const MemTitle = styled.h1`
    text-transform: uppercase;
    color: ${colors.gold};
    font-size: 12.25px;
    font-weight: 1000;
    letter-spacing: 0.22em;
    font-family: ${fonts.body};
`;

export const MemHeading = styled(Title)`
    font-size: 35px;
`;

export const MemDescription = styled(Description)`
`;


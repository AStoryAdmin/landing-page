import styled, { keyframes, css } from 'styled-components';

export const FirstPageContaniner = styled.section`
    background-color: #EFE6D4;
    text-align: center;
    width: auto;
    padding-top: 180px;
    padding-bottom: 100%;
`;

export const Intro = styled.p`
    text-transform: uppercase;
    color: #B45A2B;
    font-family: 'Figtree', serif;
    font-size: 12.25px;
    font-weight: 1000;
    letter-spacing: 0.22em;
    padding-top: 6px;
`;

export const Title = styled.h1`
    background-color: #EFE6D4;
    font-family:'Cormorant Garamond',serif;
    font-size: 75px;
    font-weight: 300;
    line-height:0.96;
    letter-spacing:-0.025em;
    border: none;
    margin: 30px;
`;

export const ListenText = styled.span`
    font-style: italic;
    color: #B45A2B;
`;

export const Description1 = styled.h3`
    max-width: 650px;
    margin: 0 auto; //centers the block itself horizontally on the page
    margin-bottom: 20px;
    font-family: 'Figtree', serif;
    font-size: 20px;
    font-weight: 100;
    letter-spacing: 0.01em;
    line-height: 1.55;
`;

export const Highlight = styled.span`
    color: #B45A2B;
    font-weight: bold;
`;

export const Description2 = styled.p`
    max-width: 520px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-family: 'Figtree', serif;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 0.04em;
    line-height: 1.85;
    opacity: 50%;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center; /* Aligns buttons horizontally */
    padding: 10px;
`;

export const WaitlistButton = styled.button`
    font-family: 'Figtree', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: #b45a2b;
    color: #f4ebe1;
    border: none;
    padding: 1.5rem 2rem;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #a14e22;
        transform:translateY(-1px);
    }
`;

export const ActionButton = styled.button`
    font-family: 'Figtree', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: none;
    color: rgba(43,33,23,0.72);
    border: 0.8px solid;
    padding: 1.5rem 3rem;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
        border-color: #2B2117;
        border: 1.2px solid;
        color: #2B2117;
        transform:translateY(-1px);
    }
`;

export const BulletPoints = styled.span`
    display:flex;
    gap:1.75rem;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:2rem;
    color: rgba(43, 33, 23, 0.5);
    font-family: 'Figtree', sans-serif;
    font-size: 0.82rem;
`;

export const BulletIcon = styled.span`
    color: #b45a2b;
`;

// .trust-strip{}
// .trust-item{font-size:0.68rem;letter-spacing:0.04em;color:var(--ink-dim);display:flex;align-items:center;gap:0.35rem;white-space:nowrap;}
// .trust-item span{color:var(--ember);}
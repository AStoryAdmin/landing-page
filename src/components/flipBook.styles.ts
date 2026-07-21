
import styled from 'styled-components';

const colors = {
    cream: '#EFE6D4',
    orange: '#B45A2B'
};

const fonts = {
    title: "'Caveat', cursive",
    display: "'Cormorant Garamond', serif",
};

type PageProps = {
    $isFlipped: boolean;
};

export const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 30px;
    border-radius: 4px;
`;

export const BookWrapper = styled.div`
    position: relative;
    width: 800px;
    height: 500px;
    perspective: 2000px;
`;

export const LeftPage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: ${colors.cream};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    cursor: pointer;
    //stacking order
    z-index: 999;
    border-radius: 20px;
    border-right: 1px solid;
`;

export const Page = styled.div<PageProps>`
    position: absolute;
    top: 0;
    left: 50%;
    width: 45%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.6s ease-in-out;
    transform: ${(props) => (props.$isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)')};
`;

export const PageContent = styled.div`
    position: absolute;
    width: 80%;
    height: 92%;
    padding: 60px 55px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    backface-visibility: hidden;
    background: ${colors.cream};
    border-radius: 20px;
`;


export const PageImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const PageHeading = styled.h2`
    font-family: ${fonts.title};
    font-size: 32px;
    color: ${colors.orange};
    margin: 0;
    text-align: center;
`;

export const PageQuote = styled.p`
    font-family: ${fonts.display};
    font-size: 18px;
    line-height: 1.6;
    text-align: center;
`;

export const PageNumber = styled.p`
    font-family: ${fonts.display};
    font-style: italic;
    font-size: 14px;
    margin-top: auto;
    text-align: center;
`;
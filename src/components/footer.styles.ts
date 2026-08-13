import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  gold: '#C7A24E',
  darkBrown: '#2B2117',
  cream: '#EFE6D4',
  grayCream: 'rgba(254, 252, 248, 0.5)',
  paper: '#F6EFE2',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const FooterContainer = styled.footer`
    background-color: ${colors.darkBrown};
    padding: 80px 60px;
    color: ${colors.grayCream};
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 1px;
    line-height: 1.55;
    font-family: ${fonts.body};

    // Prevents accidental text-highlighting and the text-editing cursor on hover
    user-select: none;
`;

export const FooterLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.display};
  font-size: 25px;
  font-weight: 600;
  color: ${colors.gold};
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-decoration: none;

  img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }
`;

export const Grid = styled.div`
    display: flex;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
`;

export const HeaderColumn = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;

    &:last-child {
        border-right: none;
    }
`;

export const Column = styled(HeaderColumn)`
`;

export const Subtitle = styled.div`
    padding-top: 30px;
    max-width: 280px;
`;

export const Section = styled.div`
    color: ${colors.paper};
    text-transform: uppercase;
`;

export const Page = styled(Link)`
    padding-top: 30px;
    cursor: pointer;
    text-decoration: none;
    color: rgba(254, 252, 248, 0.5);   /* ← add this */
    transition: color 0.2s ease;

    &:hover {
        color: ${colors.gold};
    }
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${colors.grayCream};
`;

export const BottomRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 150px;
    padding-top: 32px;
`;

export const License = styled.p`
`;

export const Email = styled.p`
    cursor: pointer;
`;

export const Platform = styled.p`
    background-color: ${colors.grayCream};
    border-radius: 15px;
    padding: 2px 8px;
`;
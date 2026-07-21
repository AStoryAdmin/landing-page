import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  darkBrown: '#2B2117',
  orange: '#b45a2b',
  cream: '#EFE6D4',
  whiteGray: '#5e544a',

};

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  //stacking order: navbar always on top
  z-index: 2;
  padding: 21px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease-in-out;
  background-color: ${colors.cream};
  box-shadow: 0px 1px 10px 1px ${colors.whiteGray};

  // Prevents accidental text-highlighting and the text-editing cursor on hover
  user-select: none;
`;

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.display};
  font-size: 25px;
  font-weight: 600;
  color: ${colors.darkBrown};
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

export const NavActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavLink = styled(Link)`
  font-family: ${fonts.body};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  color: ${colors.whiteGray};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${colors.orange};
        
  }
  
  &:focus {
    text-underline-offset: 8px;
    text-decoration: underline ${colors.orange} 1.5px;
  }
`;

export const NavCta = styled(Link)`
  font-family: ${fonts.body};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${colors.cream};
  border: 1px solid ${colors.darkBrown};
  padding: 8px 20px;
  border-radius: 25px;
  cursor: pointer;
  background: ${colors.darkBrown};
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: ${colors.orange};
    border-color: ${colors.orange};
  }
`;
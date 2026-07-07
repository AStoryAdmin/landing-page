import styled from 'styled-components';

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
  padding: 1.3rem 3rem;
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

export const NavLogo = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.display};
  font-size: 1.55rem;
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
  gap: 1rem;
`;

export const NavLink = styled.button`
  font-family: ${fonts.body};
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: ${colors.whiteGray};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.orange};
        
  }
  
  &:focus {
    text-underline-offset: 8px;
    text-decoration: underline ${colors.orange} 1.5px;
  }
`;

export const NavCta = styled.button`
  font-family: ${fonts.body};
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${colors.cream};
  border: 1px solid ${colors.darkBrown};
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  cursor: pointer;
  background: ${colors.darkBrown};
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.orange};
    border-color: ${colors.orange};
  }
`;
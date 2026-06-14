import styled, { keyframes, css } from 'styled-components';

interface NavMusicButtonProps {
  $isPlaying: boolean;
}

export const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.3rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease-in-out;
  background: transparent;
`;

export const NavLogo = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem;
  font-weight: 600;
  color: #2b2117;
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

export const NavMusicButton = styled.button<NavMusicButtonProps>`
  width: 34px; 
  height: 34px;
  border-radius: 50%;
  border: 1px solid #dcd0c2;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  img {
    width: 16px;        /* Adjust this value down (e.g., 14px or 12px) to make it smaller! */
    height: 16px;       /* Keep this matching the width to maintain a 1:1 aspect ratio */
    object-fit: contain; /* Prevents the image aspect ratio from distorting */
    transition: filter 0.3s ease;
  }

  &:hover {
    border-color: #b45a2b66;
  }

  ${props => props.$isPlaying && css`
    border-color: #b45a2b;
    background: #b45a2b14;

    img {
      animation: ${keyframes`
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        `} 1.6s ease-in-out infinite;
    }
  `}
`;

export const NavLink = styled.button`
  font-family: 'Figtree', sans-serif;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #5e544a;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #b45a2b;
  }
`;

export const NavCta = styled.button`
  font-family: 'Figtree', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b45a2b;
  border: 1px solid #b45a2b66;
  padding: 0.5rem 1.25rem;
  border-radius: 3px;
  cursor: pointer;
  background: none;
  transition: all 0.3s ease;

  &:hover {
    background: #b45a2b;
    color: #f4ebe1;
    border-color: #b45a2b;
  }
`;
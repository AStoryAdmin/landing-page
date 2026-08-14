import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  darkBrown: '#2B2117',
  orange: '#b45a2b',
  cream: '#EFE6D4',
  whiteGray: '#5e544a',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

const breakpoint = '860px';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  z-index: 99;
  padding: 21px 48px;
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
  background-color: ${colors.cream};
  box-shadow: 0px 1px 10px 1px ${colors.whiteGray};
  user-select: none;

  @media (max-width: ${breakpoint}) {
    padding: 16px 24px;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
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

export const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;

  @media (max-width: ${breakpoint}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin-right: 0;
    padding: 8px 0 20px;
    background: ${colors.cream};
    border-bottom: 1px solid rgba(43, 33, 23, 0.1);
    box-shadow: 0px 8px 16px rgba(43, 33, 23, 0.08);
  }
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

  @media (max-width: ${breakpoint}) {
    display: block;
    padding: 14px 24px;
    font-size: 16px;
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

  @media (max-width: ${breakpoint}) {
    display: none;
  }
`;

export const NavMobileCtaItem = styled.div`
  display: none;

  @media (max-width: ${breakpoint}) {
    display: block;
    padding: 8px 24px 4px;
  }
`;

export const NavMobileCta = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.body};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${colors.cream};
  background: ${colors.darkBrown};
  border-radius: 25px;
  padding: 14px 20px;
  min-height: 48px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.orange};
  }
`;

export const NavHamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  margin-left: 12px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(43, 33, 23, 0.08);
  }

  span {
    display: block;
    width: 20px;
    height: 2px;
    background: ${colors.darkBrown};
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? 'translateY(7px) rotate(45deg)' : 'none')};
  }
  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? 'translateY(-7px) rotate(-45deg)' : 'none')};
  }

  @media (max-width: ${breakpoint}) {
    display: flex;
  }
`;

import { useEffect, useState } from 'react';
import { NavContainer, NavLogo, NavLinks, NavLink, NavCta, NavMobileCtaItem, NavMobileCta, NavHamburger } from './navbar.styles';

import logoImg from './../assets/lightLogo.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <NavContainer>
      <NavLogo to="/" onClick={closeMenu}>
        <img src={logoImg} alt="Light-mode Story Logo" />
        Story
      </NavLogo>

      <NavLinks $open={open}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/experience" onClick={closeMenu}>
          The Experience
        </NavLink>
        <NavLink to="/family" onClick={closeMenu}>
          For Families
        </NavLink>
        <NavLink to="/institution" onClick={closeMenu}>
          For Institutions
        </NavLink>
        <NavMobileCtaItem>
          <NavMobileCta to="/signup" onClick={closeMenu}>
            Get early access
          </NavMobileCta>
        </NavMobileCtaItem>
      </NavLinks>

      <NavCta to="/signup">
        Get early access
      </NavCta>

      <NavHamburger
        type="button"
        $open={open}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </NavHamburger>
    </NavContainer>
  );
};

export default Navbar;

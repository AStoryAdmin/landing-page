import { NavContainer, NavLogo, NavActionsContainer, NavLink, NavCta } from './navbar.styles';

import logoImg from './../assets/lightLogo.png'

const Navbar = () => {

  return (
    <NavContainer>
      <NavLogo to="/">
        <img src={logoImg} alt="Light-mode Story Logo" />
        Story
      </NavLogo>

      <NavActionsContainer>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink onClick={() => console.log("Open Experience")}>
          The Experience
        </NavLink>
        <NavLink onClick={() => console.log("Open For Families")}>
          For Families
        </NavLink>
        <NavLink onClick={() => console.log("Open For Instituitions")}>
          For Instituitions
        </NavLink>

        <NavCta to="/signup">
          Get early access
        </NavCta>
      </NavActionsContainer>
    </NavContainer>
  );
};

export default Navbar;
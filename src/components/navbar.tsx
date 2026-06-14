import { useState } from 'react';
import { NavContainer, NavLogo, NavActionsContainer, NavMusicButton, NavLink, NavCta } from './navbar.styles';

// Import your transparent PNG file here
import logoImg from './../assets/logo.png'
import musicOnImg from './../assets/music-on.png'
import musicOffImg from './../assets/music-off.png'

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
    console.log('play music')
  };

  return (
    <NavContainer>
      <NavLogo>
        <img src={logoImg} alt="Story Logo" />
        Story
      </NavLogo>

      <NavActionsContainer>
        <NavMusicButton
          $isPlaying={isPlaying}
          onClick={toggleMusic}
          aria-label="Toggle music"
        >
          {isPlaying ? <img src={musicOnImg} /> : <img src={musicOffImg} />}
        </NavMusicButton>

        <NavLink onClick={() => console.log("Open Our Story")}>
          Our Story
        </NavLink>

        <NavCta>
          Join Waitlist
        </NavCta>
      </NavActionsContainer>
    </NavContainer>
  );
};

export default Navbar;
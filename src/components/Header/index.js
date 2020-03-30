import React from 'react';
import { HeaderSection, Logo } from '../Styled';
import logoSrc from '../../Assets/y18.gif';

const Header = () => (
  <HeaderSection className="App-header">
    <Logo src={logoSrc} alt="Logo" />
    <nav>
      <button type="button" className="active">top</button>
      <button type="button" className="excludeBorder">new</button>
    </nav>
  </HeaderSection>
);

export default Header;

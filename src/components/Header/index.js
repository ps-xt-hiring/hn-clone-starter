import React from 'react';
import { HeaderSection, Logo } from '../Styled';
import logoSrc from '../../Assets/y18.gif';

const Header = () => (
  <HeaderSection className="App-header">
    <Logo src={logoSrc} />
    <nav>
      <span className="active">top</span>
      <span>new</span>
    </nav>
  </HeaderSection>
);

export default Header;

import React from 'react';

import Logo from '../../components/UI/Logo/Logo';
import Navigation from '../../components/UI/Navigation/Navigation';
import Classes from './Header.module.scss';

const header = () => (
  <header className={Classes.header}>
    <Logo />
    <nav>
      <Navigation />
    </nav>
  </header>
);

export default header;

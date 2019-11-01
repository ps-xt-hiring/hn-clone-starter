import React, { Component } from 'react';

import Logo from '../../components/UI/Logo/Logo';
import Navigation from '../../components/UI/Navigation/Navigation';
import Classes from './Header.module.scss';

class Header extends Component {
  render() {
    return (
      <header className={Classes.header}>
        <Logo />
        <nav>
          <Navigation />
        </nav>
      </header>
    );
  }
}

export default Header;
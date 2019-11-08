import React from 'react';
import { Link } from '@material-ui/core/';

const logo = require('../logo.png');

const Header = () => (
  <header className="header">
    <div className="header__child">
      <Link href="/">
        <img
          className="header__logo responsive-image"
          src={logo}
          alt="hacker news logo"
        />
      </Link>
    </div>
    <div className="header__child">
      <strong className="header__subchild--white">Top</strong>
    </div>
    <div className="header__child">|</div>
    <div className="header__child">
      <strong>New</strong>
    </div>
  </header>
);
export default Header;

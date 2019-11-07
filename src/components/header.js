import React from 'react';
import { Link } from '@material-ui/core/';

const logo = require('../logo.png');

const Header = () => (
  <header className="header">
    <div className="header-child">
      <Link href="/">
        <img
          className="logo responsive-image"
          src={logo}
          alt="hacker news logo"
        />
      </Link>
    </div>
    <div className="header-child">
      <strong className="white">Top</strong>
    </div>
    <div className="header-child">|</div>
    <div className="header-child">
      <strong>New</strong>
    </div>
  </header>
);
export default Header;

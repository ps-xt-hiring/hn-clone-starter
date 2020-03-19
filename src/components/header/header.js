import React from 'react';
import logo from '../../logo.gif';

const Header = () => (
  <header className="App-header">
    <div className="d-flex align-items-center header-wrap">
      <img src={logo} className="app-logo" alt="logo" />
      <ul className="nav-list">
        <li className="nav-list__item active">
          top
        </li>
        <li className="nav-list__item">
          new
        </li>
      </ul>
    </div>
  </header>
);

export default Header;

import React from 'react';
import Button from '../button';
import logo from '../../logo.gif';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__filter">
        <Button buttontype="button" value="Top" />
        <Button buttontype="button" value="New" />
      </div>
    </header>
  );
}

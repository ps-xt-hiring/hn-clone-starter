import React from 'react';
import Button from '../button';
import logo from '../../logo.gif';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <picture>
          <source media="(min-width: 768px)" srcSet={logo} />
          <source media="(min-width: 420px)" srcSet={logo} />
          <img src={logo} alt="Logo" />
        </picture>
      </div>
      <div className="header__filter">
        <Button value="Top" />
        <Button value="New" />
      </div>
    </header>
  );
}

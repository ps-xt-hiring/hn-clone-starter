import React from 'react';
import logo from '../../logo.gif';
import './header.css';

export default function Header() {
  return (
    <header className="App-header">
      <div className="App-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="App-filter">
        <button type="button">
          Top
        </button>
        <button type="button">
          New
        </button>
      </div>
    </header>
  );
}

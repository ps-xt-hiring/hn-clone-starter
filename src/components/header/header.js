import React from 'react';
import logo from '../../logo.gif';
import './header.css';

const Header = () => {
    return (
        <header className="App-header">
          <div className="App-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="App-filter">
            <button>
              Top
            </button>
            <button>
              New
            </button>
          </div>
        </header>
    );
};

export default Header;
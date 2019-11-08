import React from 'react';
import Link from 'next/link';
import Menu from './menu/Menu';
import './Navbar.css';

const Navbar = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark default-color navbar-black-link">
      <Link href="/news"><a href="/news" className="navbar-brand"><strong>Y</strong></a></Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <Menu />
    </nav>
  </header>
);

export default Navbar;

import React from 'react';
import Link from 'next/link';
import Menu from './menu/Menu';
import './navbar.css';

const Navbar = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link href="/news"><a href="/news" className="navbar-brand"><strong>Y</strong></a></Link>
      <Menu />
    </nav>
  </header>
);

export default Navbar;

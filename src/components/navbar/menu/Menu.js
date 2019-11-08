import React from 'react';
import Link from 'next/link';

const Menu = () => (
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link href="/"><a href="/" className="nav-link">top</a></Link>
      </li>
      <li className="vline" />
      <li className="nav-item">
        <Link href="/news"><a href="/news" className="nav-link news">new</a></Link>
      </li>
    </ul>
  </div>
);

export default Menu;

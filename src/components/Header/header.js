import React from 'react';
import { Link } from 'react-router-dom';

const logo = require('../../assets/images/y18.png');

const ListHeader = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} width="18" alt="Hacker News" className="image-border" />
      </Link>

      <span className="top">top</span>
      <span className="new">| new</span>
    </header>
  );
};

export default ListHeader;

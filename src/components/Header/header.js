import React from 'react';
import { Link } from 'react-router-dom';

const logo = require('../../assets/images/y18.png');

const ListHeader = () => (
  <header className="header">
    <Link to="/">
      <img src={logo} width="18" alt="Hacker News" className="header__imageBorder" />
    </Link>
    <strong className="header__top">top</strong>
    <strong className="header__new">| new</strong>
  </header>
);

export default ListHeader;

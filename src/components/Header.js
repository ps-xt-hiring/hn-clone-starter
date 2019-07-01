import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from '../resources/images/hacker-news-logo.gif';

function Header() {
  return (
    <div className = 'row px-2 py-1 hn-header'>
      <img src = {logo} className = 'hn-logo' alt = 'Hacker News' />
    </div>
  );
}

export default Header;

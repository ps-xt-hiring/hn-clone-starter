import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.gif';
import HeaderNav from '../headerNav/HeaderNav';
import { HEADER_TITLE } from '../../constants';
import './header.scss';

export default function Header(props) {
  const { sortType, setSortType } = props;

  return (
    <header className="header container-wrapper">
      <img src={logo} className="header__logo" alt="logo" />
      <h1 className="header__title">{HEADER_TITLE}</h1>
      <nav className="header__navigation">
        <HeaderNav sortType={sortType} setSortType={setSortType} />
      </nav>
    </header>
  );
}

Header.propTypes = {
  sortType: PropTypes.string,
  setSortType: PropTypes.func,
};

Header.defaultProps = {
  sortType: '',
  setSortType: () => { },
};

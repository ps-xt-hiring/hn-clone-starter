import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.gif';
import { HEADER_TITLE, HEADER_NEW_LABEL, HEADER_TOP_LABEL } from '../../constants';
import './header.scss';

export default function Header(props) {
  const { sortType, setSortType } = props;

  return (
    <header className="header container-wrapper">
      <img src={logo} className="header__logo" alt="logo" />
      <h1 className="header__title">{HEADER_TITLE}</h1>
      <nav className="header__navigation">
        <ul className="header__navigation__list">
          <li>
            <button
              type="button"
              className={`btn-empty header__navigation__list--${(sortType === HEADER_TOP_LABEL ? 'active' : 'deactive')}`}
              onClick={() => setSortType(HEADER_TOP_LABEL)}
            >
              {HEADER_TOP_LABEL}
            </button>
          </li>
          <li> | </li>
          <li>
            <button
              type="button"
              className={`btn-empty header__navigation__list--${(sortType === HEADER_NEW_LABEL ? 'active' : 'deactive')}`}
              onClick={() => setSortType(HEADER_NEW_LABEL)}
            >
              {HEADER_NEW_LABEL}
            </button>
          </li>
        </ul>
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

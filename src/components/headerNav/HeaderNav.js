import React from 'react';
import PropTypes from 'prop-types';

import { HEADER_NEW, HEADER_TOP } from '../../constants';
import './headerNav.scss';

export default function HeaderNav(props) {
  const { sortType, setSortType } = props;
  
  return (
    
        <ul className="header__navigation__list">
          <li>
            <button
              type="button"
              className={`btn-empty header__navigation__list--${(sortType === HEADER_TOP ? 'active' : 'deactive')}`}
              onClick={() => setSortType(HEADER_TOP)}
            >
              {HEADER_TOP}
            </button>
          </li>
          <li> | </li>
          <li>
            <button
              type="button"
              className={`btn-empty header__navigation__list--${(sortType === HEADER_NEW ? 'active' : 'deactive')}`}
              onClick={() => setSortType(HEADER_NEW)}
            >
              {HEADER_NEW}
            </button>
          </li>
        </ul>
      
  );
}

HeaderNav.propTypes = {
  sortType: PropTypes.string,
  setSortType: PropTypes.func,
};

HeaderNav.defaultProps = {
  sortType: '',
  setSortType: () => { },
};

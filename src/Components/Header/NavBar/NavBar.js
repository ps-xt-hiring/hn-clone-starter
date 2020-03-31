import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as S from './NavBar.style';

const NavBar = ({
  apiRequestHandler,
}) => {
  const isActive = useSelector(state => state.reducer.apiRequestType);

  return (
    <S.NavBar>
      <span className={isActive === 'top' ? 'active' : ''} onClick={() => apiRequestHandler('top')}>top</span>
      <span> | </span>
      <span className={isActive === 'new' ? 'active' : ''} onClick={() => apiRequestHandler('new')}>new</span>
    </S.NavBar>
  )
};

NavBar.propTypes = {
  apiRequestHandler: PropTypes.func,
}

export default NavBar;

/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHitsData } from '../../store/Actions/actions';

import HeaderContainer from './Header.style';
import Logo from './Logo';
import NavBar from './NavBar';

const Header = () => {
  const [isActive, setActive] = useState('top');
  const dispatch = useDispatch();

  const setActiveClass = (activeNavItem) => {
    setActive(activeNavItem);
  };

  const apiRequestHandler = (requestType) => {
    setActiveClass(requestType);
    dispatch(getHitsData(requestType, 0));
  };

  return (
    <HeaderContainer>
      <Logo />
      <NavBar isActive={isActive} apiRequestHandler={apiRequestHandler} />
    </HeaderContainer>
  );
};

export default Header;

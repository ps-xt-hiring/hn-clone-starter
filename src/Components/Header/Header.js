import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { getHitsData } from '../../store/Actions/actions';

import * as S from './Header.style';
import Logo from './Logo'
import NavBar from './NavBar';

const Header = () => {
  const [isActive, setActive] = useState('top');
  const dispatch = useDispatch();

  const apiRequestHandler = (requestType) => {
    setActiveClass(requestType);
    dispatch(getHitsData(requestType, 0))
  };

  const setActiveClass = (activeNavItem) => {
    setActive(activeNavItem);
  }

  return (
      <S.Container>
        <Logo />
        <NavBar isActive={isActive} apiRequestHandler={apiRequestHandler} />
      </S.Container>
  );
};

export default Header;

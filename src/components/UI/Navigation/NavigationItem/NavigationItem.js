import React from 'react';
import { NavLink } from 'react-router-dom';

import Classes from './NavigationItem.module.scss';

const navigationItem = props => (
  <li className={Classes.header__NavigationItem}>
    <NavLink
      to={props.link}
      activeClassName={Classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;

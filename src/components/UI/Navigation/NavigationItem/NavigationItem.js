import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
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

navigationItem.propTypes = {
  link: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.string
};

export default navigationItem;

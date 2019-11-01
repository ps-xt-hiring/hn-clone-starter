import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import Classes from './NavigationItem.module.scss';

const navigationItem = (props) => {
  const { link, exact, children } = props;

  return (
    <li className={Classes.header__NavigationItem}>
      <NavLink
        to={link}
        activeClassName={Classes.active}
        exact={exact}
      >
        {children}
      </NavLink>
    </li>
  );
};

navigationItem.defaultProps = {
  exact: undefined,
};

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default navigationItem;

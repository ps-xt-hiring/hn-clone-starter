import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import StyledNavBar from './NavBar.style';

const NavBar = ({
  apiRequestHandler,
}) => {
  const isActive = useSelector(state => state.reducer.apiRequestType);

  return (
    <StyledNavBar>
      <button
        type="button"
        className={isActive === 'top' ? 'active' : ''}
        onClick={() => apiRequestHandler('top')}
      >
        top
      </button>
      <span> | </span>
      <button
        type="button"
        className={isActive === 'new' ? 'active' : ''}
        onClick={() => apiRequestHandler('new')}
      >
        new
      </button>
    </StyledNavBar>
  );
};

NavBar.propTypes = {
  apiRequestHandler: PropTypes.func,
};

NavBar.defaultProps = {
  apiRequestHandler: () => {},
};

export default NavBar;

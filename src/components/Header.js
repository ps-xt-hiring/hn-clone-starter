import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <div className="header">
      <span
        role="button"
        tabIndex={0}
        className="logo"
        onClick={props.handleHomeClick}
        onKeyDown={() => {}}
      >
        Y
      </span>
      <span className="top-feeds">
        {' '}
        {'top'}
        {' '}
      </span>
      <span className="new-feeds">
        {'| new'}
        {' '}
      </span>
    </div>
  );
}

Header.propTypes = {
  handleHomeClick: PropTypes.func.isRequired,
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { handleHomeClick } = props;

  return (
    <div className="header">
      <span
        role="button"
        tabIndex={0}
        className="logo"
        onClick={handleHomeClick}
        onKeyDown={() => {}}
      >
        Y
      </span>
      <span className="top-link">
        {'top'}
      </span>
      <span className="new-link">
        {'| new'}
      </span>
    </div>
  );
}

Header.propTypes = {
  handleHomeClick: PropTypes.func.isRequired,
};

export default Header;

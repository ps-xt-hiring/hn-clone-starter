import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {

    return (
        <div className="header">
            <span className="logo" onClick={props.goToHome}> Y </span>
            <span className="top-feeds"> top </span>
            <span className="new-feeds">| new </span>
        </div>
    )
}

Header.propTypes = {
    goToHome: PropTypes.func.isRequired,
  };
export default Header;
import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  const { handleMoreClick } = props;

  return (
      <div
        className="click-more"
        tabIndex="0"
        role="button"
        onKeyUp={() => {}}
        onClick={handleMoreClick}
      >
      {'More'}
      </div>
  );
}

Footer.propTypes = {
  handleMoreClick: PropTypes.func.isRequired
};

export default Footer;

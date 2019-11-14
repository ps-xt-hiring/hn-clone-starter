import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  const { isLoading, articlesLength, handleMoreClick } = props;

  return (
    ( !isLoading && articlesLength ) ? (
      <div
        className="click-more"
        tabIndex="0"
        role="button"
        onKeyUp={() => {}}
        onClick={handleMoreClick}
      >
      {'More'}
      </div>
    ) : ''
  );
}

Footer.propTypes = {
  handleMoreClick: PropTypes.func.isRequired,
  articlesLength: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Footer;

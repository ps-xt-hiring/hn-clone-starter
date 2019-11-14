import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {

  const { articlesLength, handleMoreClick } = props;

  return (
    articlesLength ? <div className="click-more" onClick={handleMoreClick}>More</div> : ''
  );
}

Footer.propTypes = {
  handleMoreClick: PropTypes.func.isRequired,
  articlesLength: PropTypes.number.isRequired,
};

export default Footer;

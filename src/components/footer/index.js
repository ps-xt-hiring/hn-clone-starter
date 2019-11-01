import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = ({ changePage }) =>
  (<div className="footer-layout">
    <button className="footer-btn" onClick={changePage}>More</button>
  </div>);

Footer.propTypes = {
  changePage: PropTypes.string
};

export default Footer;

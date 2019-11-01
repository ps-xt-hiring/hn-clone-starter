import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = props => (<div className="footer-layout">
  <button className="footer-btn" onClick={props.changePage}>More</button>
</div>)

Footer.propTypes = {
  changePage: PropTypes.string
};

export default Footer;

import React from 'react';
import './Footer.css'

const Footer = (props) => {
  return (
    <div className="footer-layout">
      <button className="footer-btn" onClick={props.changePage}>More</button>
    </div>
  )
}

export default Footer;
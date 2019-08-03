import React from 'react';

import './style.scss';

function Footer({ page, handleMore }) {
    return (
        <footer className="footer-container">
            <span onClick={handleMore}>More
            </span>
        </footer>
    );
}

export default Footer;

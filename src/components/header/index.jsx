import React from 'react';

import './style.scss';

function Header() {
    return (
        <header className="header-container">
            <span className="header-items logo">Y</span>
            <span className="header-items top active">top</span>
            <span className="header-items new">new</span>
        </header>
    );
}

export default Header;

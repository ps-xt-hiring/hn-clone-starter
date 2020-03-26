import React from 'react';
import logo from '../logo.svg';

import './header.scss';

function Header() {
	return (
		<header className='App-header'>
			<img src={logo} className='App-logo' alt='logo' />
			<h1>Publicis Sapient - XT hiring challenge!!</h1>
		</header>
	);
}

export default Header;

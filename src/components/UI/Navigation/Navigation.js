import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './Navigation.module.scss';

const navigationItems = (props) => {
	return (
		<ul className={Classes.header__Navigation}>
			<NavigationItem link="/" exact>top</NavigationItem>
			<NavigationItem link="/new">new</NavigationItem>
		</ul>
	)
}

export default navigationItems;
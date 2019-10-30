import React from 'react';

import Classes from './NavigationItem.module.scss';

const navigationItem = (props) => (
    <li className={Classes.header__NavigationItem}>
        <a href={props.link} exact={props.exact}>{props.children}</a>
    </li>
)

export default navigationItem;
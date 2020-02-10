import React from 'react';
import classes from './NavBar.module.css';

const NavBar = (props) => (
<div className={classes.NavBarContainer}>
    <span className={classes.Logo}>
        <img src="https://news.ycombinator.com/y18.gif" alt="news hacker"/>
    </span>
    <ul>
        {props.navList.map((item, index) => (
            <li key={index}>
                {item}
            </li>
        ))}
    </ul>
</div>
)

export default NavBar;
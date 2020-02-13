import React from 'react';
import { Link } from "react-router-dom";
import classes from './NavBar.module.css';

const NavBar = (props) => (
<div className={classes.NavBarContainer}>
    <span className={classes.Logo}>
        <img src="https://news.ycombinator.com/y18.gif" alt="news hacker"/>
    </span>
    <ul>
        {props.navList.map((item, index) => (
            <li key={index}>
                <Link to={item.link} title={item.name}>{item.name}</Link>
            </li>
        ))}
    </ul>
</div>
)

export default NavBar;
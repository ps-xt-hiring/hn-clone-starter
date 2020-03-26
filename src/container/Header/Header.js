/* eslint-disable */
import React, { Component } from 'react';
import styles from './Header.module.css';
import logo from './source/y18.gif';

import FeedContext from '../../context/FeedsContext';

const navStyle = `${styles.links} ${styles.with_split_icon}`;

/**
 * Application Header Component
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img src={logo} alt="app-logo" className={styles.logo} />
        <nav className={styles.navBlock}>
          <ul className={navStyle}>
            <li
              className={styles.link}
              onClick={() => this.context.fetchNewFeeds(true)}
            >
              Top
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

// Due to lint move out of class
Header.contextType = FeedContext;

export default Header;

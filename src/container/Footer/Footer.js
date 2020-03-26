/* eslint-disable */
import React, { Component } from 'react';
import styles from './Footer.module.css';

import FeedContext from '../../context/FeedsContext';
import { Button } from '../../components';

/**
 * Application Footer Component
 *
 * @class Footer
 * @extends {Component}
 */
class Footer extends Component {
  static contextType = FeedContext;

  fetchNextFeeds = () => {
    this.context.fetchNewFeeds();
  };

  render() {
    return (
      <footer className={styles.footer}>
        <Button clickHandler={this.fetchNextFeeds} text="More" />
      </footer>
    );
  }
}

export default Footer;

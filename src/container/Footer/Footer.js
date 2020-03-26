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
  // eslint-disable-next-line
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

// Due to lint move out of class
Footer.contextType = FeedContext;

export default Footer;

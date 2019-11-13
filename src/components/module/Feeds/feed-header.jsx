import React from 'react';

const FeedHeader = () => (
  <header className="header-container">
    <nav>
      <i className="header-logo">Y</i>
      <button type="button" tabIndex="0" name="top button" className="top">top</button>
      {' '}
      <span>|</span>
      <button type="button" tabIndex="0" name="new button" className="new">new</button>
    </nav>
  </header>
);

export default FeedHeader;

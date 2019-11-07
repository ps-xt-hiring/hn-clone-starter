import React from 'react';

const FeedHeader = () => (
  <header>
    <nav>
      <i className="header-logo">Y</i>
      <button type="button" className="top">top</button>
      {' '}
      <span>|</span>
      <button type="button" className="new">new</button>
    </nav>
  </header>
);

export default FeedHeader;

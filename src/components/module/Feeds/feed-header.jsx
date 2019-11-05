import React from 'react';

const FeedHeader = () => (
  <div className="header-container">
    <div className="header-content">
      <i className="header-logo">Y</i>
      <button type="button" className="top">top</button>
      {' '}
      <span>|</span>
      <button type="button" className="new">new</button>
    </div>
  </div>
);

export default FeedHeader;
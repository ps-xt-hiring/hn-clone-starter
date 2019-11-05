import React from 'react';

const FeedFooter = props => (
  <div className="feed-footer">
    <button type="button" className="feed-more-btn" onClick={() => props.loadMore(props.pageNum)}>more</button>
  </div>
);

export default FeedFooter;
import React from 'react';

export const FeedFooter = (props) =>  {
    return (
      <div className="feed-footer">
        <a className="feed-more-btn" onClick={() => props.loadMore(props.pageNum)}>more</a>
      </div>
    );
}

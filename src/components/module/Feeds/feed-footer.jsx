import React from 'react';

export const FeedFooter = (props) =>  {
    return (
      <div className="feed-footer">
        <button className="feed-more-btn" onClick={() => props.loadMore(props.pageNum)}>more</button>
      </div>
    );
}

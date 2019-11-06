import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propsTypes = {
  feed: PropTypes.objectOf(PropTypes.object),
};

const defaultProps = {
  feed: {},
};

const Feeds = props => {
  const {feed} = props;
  const [upVoteCount, setUpVoteCount] = useState(0);

  return (
      <>
        <div className="feeds">
          <div className="comment">{feed.num_comments}</div>
          <div className="upvote">
            <div className="upvote-count">{upVoteCount}</div>
            <div role="button" tabIndex="0" className="upvotes-action arrow-up" onClick={() => setUpVoteCount(upVoteCount + 1)} onKeyDown={() => setUpVoteCount(upVoteCount + 1)}></div>
          </div>
          <div className="feed-content">
            <span className="feed-title"></span>
            <a href={feed.url} className="feed-domain">{feed.url}</a>
            <span>by</span>
            <a href="/">
              <span className="feed-author">{feed.author}</span>
            </a>
            <span className="feed-time">3 years ago</span>
            <span className="feed-hide">[ hide ]</span>
          </div>
        </div>
      </>
)};

Feeds.propTypes = propsTypes;
Feeds.defaultProps = defaultProps;

export default Feeds;

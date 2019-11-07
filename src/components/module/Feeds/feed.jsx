import React, { useState } from 'react';
import PropTypes from 'prop-types';

import fetchDomainName from '../../../utils/manipulate';

const propsTypes = {
  feed: PropTypes.objectOf(PropTypes.object),
};

const defaultProps = {
  feed: {},
};

const Feeds = (props) => {
  const { feed } = props;
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [feedStatus, setFeedStatus] = useState(true);

  return (
    <div className={`${feedStatus ? 'feedShow' : 'feedHide'}`}>
      <div className="feeds">
        <div className="comment">{feed.num_comments}</div>
        <div className="upvote">
          <div className="upvote-count">{upVoteCount}</div>
          <div role="button" tabIndex="0" className="upvotes-action arrow-up" onClick={() => setUpVoteCount(upVoteCount + 1)} onKeyDown={() => setUpVoteCount(upVoteCount + 1)} />
        </div>
        <div className="feed-content">
          <span className="feed-title">{feed.title}</span>
          <a href={feed.url} className="feed-domain">({fetchDomainName(feed.url)})</a>
          <span>by</span>
          <span className="feed-author">{feed.author}</span>
          <span className="feed-time">3 years ago</span>
          <button type="button" onClick={() => setFeedStatus()} onKeyDown={() => setFeedStatus()}>[ hide ]</button>
        </div>
      </div>
    </div>
  );
};

Feeds.propTypes = propsTypes;
Feeds.defaultProps = defaultProps;

export default Feeds;

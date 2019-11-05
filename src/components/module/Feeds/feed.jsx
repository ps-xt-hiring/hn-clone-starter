import React from 'react';
import PropTypes from 'prop-types';
import map from 'loadsh/map';

const propsTypes = {
  feeds: PropTypes.instanceOf(Array),
};

const defaultProps = {
  feeds: [],
};

const Feeds = props => {
  const {feeds} = props;

  return (
      <>
      {
       map(feeds, item => (
        <div className="feeds">
          <div className="comment">{item.num_comments}</div>
          <div className="upvote">
            <div className="upvote-count">2077</div>
            <div data-idx="0" role="button" className="upvotes-action arrow-up"></div>
          </div>
          <div className="feed-content">
            <span className="feed-title"></span>
            <a href={item.url} className="feed-domain">{item.url}</a>
            <span>by</span>
            <a href="/">
              <span className="feed-author">{item.author}</span>
            </a>
            <span className="feed-time">3 years ago</span>
            <span data-idx="0" role="button" className="feed-hide">[ hide ]</span>
          </div>
        </div>
       ))
      }
      </>
)};

Feeds.propTypes = propsTypes;
Feeds.defaultProps = defaultProps;

export default Feeds;

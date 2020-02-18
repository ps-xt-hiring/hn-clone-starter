import React from 'react';
import PropTypes from 'prop-types';

import { HIDE_LABEL } from '../../constants';
import './feedItem.scss';
import fromNow from '../../actions/timeDiff';

export default function FeedItem(props) {
  const {
    feedItem, order, hideFeedItem, upvoteFeedItem, isUpvoted,
  } = props;
  const getShade = () => {
    switch (true) {
      case feedItem.points > 150:
        return 'lightest';
      case feedItem.points > 100:
        return 'lighter';
      case feedItem.points > 75:
        return 'light';
      case feedItem.points > 50:
        return 'normal';
      default:
        return 'dark';
    }
  };
  const getDomain = (url) => {
    const arr = url.split('/');
    return arr[2];
  };
  const timeElapsed = fromNow(new Date(feedItem.created_at));
  return (
    <article className={`feed-item  ${(order % 2 === 0 ? 'even' : 'odd')}`}>
      <span className="feed-item__comment-count">{feedItem.num_comments}</span>
      <span className={`feed-item__points feed-item--${getShade()}`}>{feedItem.points}</span>
      <button type="button" className="btn-empty feed-item__upvote" onClick={() => upvoteFeedItem(feedItem)}>{isUpvoted}</button>
      <p className="feed-item__wrapper">
        {feedItem.title}
        <span className='feed-item__wrapper__content'>
          (
          {feedItem.url && <a target="_blank" rel="noopener noreferrer" href={feedItem.url}>{getDomain(feedItem.url)}</a>}
          ) by&nbsp;
          <b>{feedItem.author}</b>
          &nbsp;
         {timeElapsed}
        </span>
        &nbsp;[
        <button type="button" className="btn-empty feed-item__hide" onClick={() => hideFeedItem(feedItem)}>
          {HIDE_LABEL}
        </button>
        ]
      </p>
    </article>
  );
}

FeedItem.propTypes = {
  feedItem: PropTypes.shape({
    num_comments: PropTypes.number,
    title: PropTypes.string,
    points: PropTypes.number,
    url: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.string,
  }),
  order: PropTypes.number,
  hideFeedItem: PropTypes.func,
  upvoteFeedItem: PropTypes.func,
  isUpvoted: PropTypes.string,
};

FeedItem.defaultProps = {
  feedItem: {
    num_comments: 0,
    title: '',
    points: 0,
    url: '',
    author: '',
    created_at: '',
  },
  order: 0,
  hideFeedItem: () => { },
  upvoteFeedItem: () => { },
  isUpvoted: '',
};

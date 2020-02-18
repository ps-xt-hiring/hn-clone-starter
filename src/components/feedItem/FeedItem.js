import React from 'react';
import PropTypes from 'prop-types';

import { HIDE_LABEL } from '../../constants';
import './feedItem.scss';

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
  function fromNow(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var years = Math.floor(seconds / 31536000);
    var months = Math.floor(seconds / 2592000);
    var days = Math.floor(seconds / 86400);
  
    if (days > 548) {
      return years + ' years ago';
    }
    if (days >= 320 && days <= 547) {
      return 'a year ago';
    }
    if (days >= 45 && days <= 319) {
      return months + ' months ago';
    }
    if (days >= 26 && days <= 45) {
      return 'a month ago';
    }
  
    var hours = Math.floor(seconds / 3600);
  
    if (hours >= 36 && days <= 25) {
      return days + ' days ago';
    }
    if (hours >= 22 && hours <= 35) {
      return 'a day ago';
    }
    
    var minutes = Math.floor(seconds / 60);
  
    if (minutes >= 90 && hours <= 21) {
      return hours + ' hours ago';
    }
    if (minutes >= 45 && minutes <= 89) {
      return 'an hour ago';
    }
    if (seconds >= 90 && minutes <= 44) {
      return minutes + ' minutes ago';
    }
    if (seconds >= 45 && seconds <= 89) {
      return 'a minute ago';
    }
    if (seconds >= 0 && seconds <= 45) {
      return 'a few seconds ago';
    }
  }
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
         {fromNow(new Date(feedItem.created_at))}
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

import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { HIDE_LABEL } from '../../constants';
import './newsItem.scss';

export default function NewsItem(props) {
  const {
    newsItem, order, hideNewsItem, upvoteNewsItem, isUpvoted,
  } = props;
  const getShade = () => {
    if (newsItem.points > 150) {
      return 'lightest';
    }
    if (newsItem.points > 100) {
      return 'lighter';
    }
    if (newsItem.points > 75) {
      return 'light';
    }
    if (newsItem.points > 50) {
      return 'normal';
    }
    return 'dark';
  };

  return (
    <article className={`news-item  ${(order % 2 === 0 ? 'even' : 'odd')}`}>
      <span className="news-item__comment-count">{newsItem.num_comments}</span>
      <span className={`news-item__points ${getShade()}`}>{newsItem.points}</span>
      <button type="button" className="btn-empty news-item__upvote" onClick={() => upvoteNewsItem(newsItem)}>{isUpvoted}</button>
      <p className="news-item__title">
        {newsItem.title}
        <span>
          (
          <a target="_blank" rel="noopener noreferrer" href={newsItem.url}>{newsItem.url}</a>
          ) by&nbsp;
          <b>{newsItem.author}</b>
          &nbsp;
          <Moment fromNow>{newsItem.created_at}</Moment>
        </span>
        &nbsp;[
        <button type="button" className="btn-empty news-item__hide" onClick={() => hideNewsItem(newsItem)}>
          {HIDE_LABEL}
        </button>
        ]
      </p>
    </article>
  );
}

NewsItem.propTypes = {
  newsItem: PropTypes.shape({
    num_comments: PropTypes.number,
    title: PropTypes.string,
    points: PropTypes.number,
    url: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.number,
  }),
  order: PropTypes.number,
  hideNewsItem: PropTypes.func,
  upvoteNewsItem: PropTypes.func,
  isUpvoted: PropTypes.string,
};

NewsItem.defaultProps = {
  newsItem: {
    num_comments: 0,
    title: '',
    points: 0,
    url: '',
    author: '',
    created_at: 0,
  },
  order: 0,
  hideNewsItem: () => { },
  upvoteNewsItem: () => { },
  isUpvoted: '',
};

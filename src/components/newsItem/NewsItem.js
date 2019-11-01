import React from 'react';
import Moment from 'react-moment';
import './newsItem.scss';

export default function NewsItem(props) {
  const newsItem = { ...props.newsItem };
  const getShade = () => {
    if (newsItem.points > 150) {
      return 'lightest';
    } else if (newsItem.points > 100) {
      return 'lighter';
    } else if (newsItem.points > 75) {
      return 'light';
    } else if (newsItem.points > 50) {
      return 'normal';
    } else {
      return 'dark';
    }
  }

  return (
    <article className={"news-item " + (props.order % 2 === 0 ? 'even' : 'odd')}>
      <span className="news-item__comment-count">{newsItem.num_comments}</span>
      <span className={"news-item__points " + getShade()} >{newsItem.points}</span>
      <button className='btn-empty news-item__upvote' onClick={() => props.upvoteNewsItem(newsItem)}>{props.isUpvoted}</button>
      <p className="news-item__title">{newsItem.title}
        <span> (<a target="_blank" rel="noopener noreferrer" href={newsItem.url}>{newsItem.url}</a>) by <b>{newsItem.author}</b> <Moment fromNow>{newsItem.created_at}</Moment></span>
        &nbsp;[ <button className='btn-empty news-item__hide' onClick={() => props.hideNewsItem(newsItem)}>hide</button> ]
            </p>
    </article>
  )
}
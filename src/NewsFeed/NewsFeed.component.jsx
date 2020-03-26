import React from 'react';
import './news-feed.scss';

export function NewsFeed(props) {
  const { objectID, username, title, noOfComments, upvotes, upvoteClick, domain, postedTime, hideClick } = {
    ...props
  };

  return (
    <div id={objectID} className='feed-item'>
      <div className='feed-comment-count text-muted'>{noOfComments}</div>
      <div className='feed-content'>
        <div className='upvote-count'>{upvotes}</div>
        <div className='upvote-cta' onClick={upvoteClick}></div>
        <p>{title}</p>
        <section className='text-small'>
          <p className='text-muted d-inline'>
            (<a className="text-muted" href={domain}>{domain ? new URL(domain).hostname : domain})</a> by <span className='text-dark'>{username}</span> {postedTime}
          </p>
          <button className='feed-hide-cta' onClick={hideClick}>
            [hide]
          </button>
        </section>
      </div>
    </div>
  );
}

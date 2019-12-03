import React from 'react';
import './feed.css';

function getTime(dateStr) {
  const diff = Date.now() - Date.parse(dateStr);
  const sec = diff / 1000;
  const min = sec / 60;
  const hrs = min / 60;
  const days = hrs / 24;
  const months = days / 30;
  const yrs = months / 12;

  if (sec < 60) {
    return `${Math.ceil(sec)} seconds ago`;
  }
  if (min < 60) {
    return `${Math.ceil(min)} minutes ago`;
  }
  if (hrs < 24) {
    return `${Math.ceil(hrs)} hours ago`;
  }
  if (days < 30) {
    return `${Math.ceil(days)} days ago`;
  }
  if (months < 12) {
    return `${Math.ceil(months)} months ago`;
  }
  return `${Math.ceil(yrs)} days ago`;
}

function getPointsClass(points) {
  if (points > 100) { return 'high'; }
  if (points > 50) { return 'medium'; }
  return 'low';
}

function Feed(props) {
  const { isUpvoted, feed } = props;
  const {
    num_comments: numComments,
    points, title,
    url,
    author,
    created_at: cat,
    created_at_i: cati,
    objectID,
  } = feed;

  return (
    <React.Fragment>
      <td className="commentsNumber">
        {numComments || '-'}
      </td>
      <td className="upvoteContainer">
        <span className={getPointsClass(points)}>
          {points || '-'}
        </span>
        <button type="button" className={`upvoteAction ${isUpvoted ? 'upvoted' : ''}`} onClick={() => { props.upvote(objectID); }} title={`${isUpvoted ? 'unvote' : 'upvote'}`}>
          <span className="arrow" />
        </button>
      </td>
      <td className="content">
        <span className="title">
          {title || ''}
        </span>
        <span className="domain">
          {url ? `(${url.match(/:\/\/(.[^/]+)/)[1]})` : ''}
        </span>
        <span className="author">
                    by
          {' '}
          <span>{author || ''}</span>
        </span>
        <span className="time">
          {cat ? getTime(cat) : ''}
        </span>
        <button type="button" className="hideButton" onClick={() => { props.hide(cati); }} title="hide feed">
                    [
          {' '}
          <span>hide</span>
          {' '}
]
        </button>
      </td>
    </React.Fragment>
  );
}

export default Feed;

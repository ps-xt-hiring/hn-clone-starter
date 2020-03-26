/* eslint-disable */
import React, { memo } from 'react';
import styles from './Feed.module.css';
import voteArrow from './source/grayarrow.gif';

import { timeRange } from '../../util';
/**
 * Memoized Feed Component to show feed details
 *
 * @export
 * @param {*} {
 *   index : Number,
 *   objectID : Number,
 *   title : String,
 *   url : String,
 *   author : String,
 *   created_at : Date String,
 *   points : Number,
 *   hideFeed : ()=>{},
 *   upvote : ()=>{},
 *   num_comments : Number
 * }
 * @returns React Element
 */
export function Feed({
  index,
  objectID,
  title,
  url,
  author,
  created_at,
  points,
  hideFeed,
  upvote,
  num_comments
}) {
  if (!url || !url.includes('http')) url = `http://${url || '--'}`;

  url = url.replace(/www./i, '');

  const sourceHostName = (new URL(url) || {}).hostname;
  const postedTime = timeRange(created_at);

  const countStyle = `${styles.upvote} ${points > 99 ? styles.orangeTxt : ''}`;

  return (
    <article className={styles.feed}>
      {/* Comments, UpVote count, UpVote Icon */}
      <span className={styles.comment}>{num_comments}</span>
      <span className={countStyle}>{points}</span>
      <img
        src={voteArrow}
        alt="up vote icon"
        className={styles.upvoteIcon}
        onClick={() => upvote(objectID, index, points)}
      />

      {/* Feed Title */}
      <h4 className={styles.title}>{title}</h4>

      {/* Feed Details : Domain name, posted By, Time, Hide option */}
      <div className={styles.details}>
        <a
          className={styles.source}
          rel="noopener noreferrer"
          target="_blank"
          href={url}
        >
          {' '}
          {sourceHostName}{' '}
        </a>
        <span className={styles.auther}>
          posted by <i>{author}</i>
        </span>
        <time className={styles.time} dateTime={postedTime.dateTimeAttr}>
          {postedTime.label}
        </time>
        <a
          className={styles.hide}
          href="/"
          onClick={e => {
            e.preventDefault();
            hideFeed(objectID);
          }}
        >
          hide
        </a>
      </div>
    </article>
  );
}

export default memo(Feed, (prevProps, nextProps) => {
  const {
    title: prevTitle,
    url: prevUrl,
    author: prevAuthor,
    points: prevPoints
  } = prevProps;
  const {
    title: nxtTitle,
    url: nxtUrl,
    author: nxtAuthor,
    points: nxtPoints
  } = nextProps;
  return (
    prevTitle === nxtTitle &&
    prevUrl === nxtUrl &&
    prevAuthor === nxtAuthor &&
    prevPoints === nxtPoints
  );
});

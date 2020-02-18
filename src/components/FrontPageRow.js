import React, { useState } from 'react';
import { extractHostname, timeDifference } from './../utility/Helper';
import arrow from './../assets/grayarrow.gif';
import './FrontPage.css';

export default function FrontPageRow({
  num_comments,
  title,
  url,
  author,
  created_at
}) {
  const [vote, setVote] = useState(0);
  const [displayli, setDisplayli] = useState(true);

  return (
    <li style={{ display: displayli || 'none' }}>
      <span className="comments">{num_comments || '-'}</span>
      <span className={vote > 100 ? 'upvote upvote-red' : 'upvote'}>
        {vote}
        <img
          src={arrow}
          alt="upvote"
          className="votearrow"
          onClick={() => setVote(vote + 1)}
        ></img>
      </span>
      <span className="title">
        <strong>{title}</strong>
      </span>
      <span className="domain">(
          {
            extractHostname(url)
          }
        )</span>
      <span className="author">
        {' '}
        by <strong>{author}</strong>
      </span>
      <span className="createdat">
        {created_at && timeDifference(created_at)}
      </span>
      <span className="hide" onClick={() => setDisplayli(false)}>
        [hide]
      </span>
    </li>
  );
}

/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import arrow from '../../../assets/grayarrow.gif';
import './UpVote.css';

export default function UpVote({
  vote, upVoteHNewsHandler, objectID, isUpVoted,
}) {
  return (
    <span className={isUpVoted ? 'upvote upvote-red' : 'upvote'}>
      {vote}
      <img
        src={arrow}
        alt="upvote"
        className="upvotearrow"
        onClick={() => {
          !isUpVoted && upVoteHNewsHandler(objectID);
        }}
        onKeyDown={() => {
          !isUpVoted && upVoteHNewsHandler(objectID);
        }}
      />
    </span>
  );
}
UpVote.propTypes = {
  vote: PropTypes.number.isRequired,
  upVoteHNewsHandler: PropTypes.func.isRequired,
  objectID: PropTypes.string.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './UpvoteAction.css';

const UpvoteAction = ({ voteUp, objectID }) => <div role="button" tabIndex={0} className="upvote-arrow" onClick={() => voteUp(objectID)} onKeyPress={() => voteUp(objectID)} />;

UpvoteAction.propTypes = {
  voteUp: PropTypes.func.isRequired,
  objectID: PropTypes.string.isRequired,
};

export default UpvoteAction;

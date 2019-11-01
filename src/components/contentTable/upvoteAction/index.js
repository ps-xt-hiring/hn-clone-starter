import React from 'react';
import PropTypes from 'prop-types';
import './UpvoteAction.css';

const UpvoteAction = (props) => <div className="upvote-arrow" onClick={() => props.voteUp(props.objectID)}></div>

UpvoteAction.propTypes = {
  voteUp: PropTypes.func,
  objectID: PropTypes.string
};

export default UpvoteAction;

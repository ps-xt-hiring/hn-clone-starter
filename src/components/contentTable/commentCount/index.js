import React from 'react';
import PropTypes from 'prop-types';
import './CommentCount.css';

const CommentCount = ({ count }) => <div className="comments-count">{count === null ? '-' : count}</div>;

CommentCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CommentCount;

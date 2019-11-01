import React from 'react';
import PropTypes from 'prop-types';
import './UpvotesCount.css';

const UpvotesCount = ({ upvotesCount }) => {
  function color(val) {
    if (val <= 50) { return 'color-50-lesser'; }
    if (val > 50 && val < 74) { return 'color-50'; }
    if (val > 74 && val < 100) { return 'color-75'; }
    return 'color-100-plus';
  }
  return (
    <div className={`${color(upvotesCount)} upvotes-count`}>{upvotesCount}</div>
  );
};

UpvotesCount.propTypes = {
  upvotesCount: PropTypes.number.isRequired,
};

export default UpvotesCount;

import React from 'react';
import PropTypes from 'prop-types';
import './PostTime.css';

const currentDateObj = new Date();

const getPostTime = (createTime) => {
  const postDateObj = new Date(createTime);
  const diffTime = Math.abs(currentDateObj - postDateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
  return (diffDays <= 24 ? `${diffDays} hour${diffDays === 1 ? '' : 's'} ago` : `${Math.ceil(diffDays / 24)} day${diffDays <= 24 ? '' : 's'} ago`);
};

const PostTime = ({ postTime }) => <div className="post-time">{getPostTime(postTime)}</div>

PostTime.propTypes = {
  postTime: PropTypes.string
};

export default PostTime;

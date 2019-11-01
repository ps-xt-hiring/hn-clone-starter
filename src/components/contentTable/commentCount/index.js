import React from 'react';
import './CommentCount.css';

const CommentCount = ({ count }) => <div className="comments-count">{count === null ? '-' : count}</div>

export default CommentCount;
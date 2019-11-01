import React from 'react';
import './PostTime.css';

const currentDateObj = new Date();

const getPostTime = createTime => {
    let postDateObj = new Date(createTime);
    let diffTime = Math.abs(currentDateObj - postDateObj);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
    return (diffDays <= 24 ? `${diffDays} hour${diffDays === 1 ? "" : "s"} ago` : `${Math.ceil(diffDays / 24)} day${diffDays <= 24 ? "" : "s"} ago`)
}

const PostTime = (props) => {
    return (
        <div className="post-time">{getPostTime(props.postTime)}</div>
    );
}

export default PostTime;
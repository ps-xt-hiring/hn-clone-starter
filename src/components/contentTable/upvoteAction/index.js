import React from 'react';
import './UpvoteAction.css';

const UpvoteAction = (props) => {
    return (
        <div className="upvote-arrow" onClick={() => props.voteUp(props.objectID)}></div>
    );
}

export default UpvoteAction;
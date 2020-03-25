import React from 'react';
import Button from './shared/Button';
export default function NewsPoint({points, upvoteActivity, objectID, itemIndex, handleVoteClick}) {
    let iconProps = {
        src: upvoteActivity[objectID] ? "img/down.png" : "img/up.png",
        title: upvoteActivity[objectID] ? "downvote" : "upvote"
    };
    
    return (
        <span className="points">
            <label>{points}</label>
            <style jsx="true">{`
            .points {
                float: right;
            }
            `}</style>
            <Button className="btn vote-btn" onClick={() => {
                handleVoteClick(objectID, itemIndex);
            }} aria-label={iconProps.title}><img {...iconProps} width="16" alt={iconProps.title}/></Button>
        </span>
    )
}
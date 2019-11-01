import React from 'react';
import './UpvotesCount.css';

const UpvotesCount = ({upvotesCount}) => {
    const color = (val) => {
        if (val <= 50) {return 'color-50-lesser'}
        else if (val > 50 && val < 74 ) {return 'color-50'}
        else if (val > 74 && val < 100 ) {return 'color-75'}
        else if (val >= 100) {return 'color-100-plus'}
    }
    return (
        <div className={`${color(upvotesCount)} upvotes-count`}>{upvotesCount}</div>
    );
}

export default UpvotesCount;
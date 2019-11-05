import React from 'react';

export const FeedHeader = () =>  {
    return (
        <div className="header-container">
            <div className="header-content">
                <i className="header-logo">Y</i>
                <button className="top">top</button> <span>|</span> 
                <button className="new">new</button>
            </div>
        </div>
    );
}


import React from 'react';

import './style.scss';

function getTime(time = 0) {
    if (time) {
        const currentTime = (new Date()).getTime();
        const diff = currentTime - time;
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        return `${hours} Hours ago`;
    }
    return time;
}

function getLink(link = '') {
    if (link) {
        const protocolEnd = link.indexOf('://') + 3;
        const firstSlash = link.indexOf('/', protocolEnd);
        if (firstSlash === -1) return link.substring(protocolEnd);
        return link.substring(protocolEnd, firstSlash);
    }
    return link || '-';
}

function ListItem({ data, upvoteHandler, hideItemHandler }) {
    const {
        objectID = '',
        num_comments = 0,
        points = 0,
        voted = false,
        title = '',
        url = '',
        author = '',
        created_at_i = (new Date()).getTime()
    } = data;
    return (
        <div className="list-item-container">
            <div>
                <span className="comments">{num_comments}</span>
                <span className="points">{points}</span>
                <span onClick={() => {
                    if (!voted) {
                        upvoteHandler(objectID, points);
                    }
                }}>^</span>
                <span className="title">{title.substring(0, 50)}</span>
                <span className="url">({getLink(url)})</span>
                <span>{`by ${author}`}</span>
                <span className="time">{getTime(created_at_i)}</span>
                <span className="hide" onClick={() => { hideItemHandler(objectID); }}>[hide]</span>
            </div>
        </div>
    );
}

export default ListItem;

import React from 'react';
import './feed.css';

function getTime(dateStr) {
    const diff = Date.now() - Date.parse(dateStr);
    const sec = diff/1000;
    const min = sec/60;
    const hrs = min/60;
    const days = hrs/24;
    const months = days/30;
    const yrs = months/12;

    if(sec < 60) {
        return `${Math.ceil(sec)} seconds ago`
    } else if(min < 60) {
        return `${Math.ceil(min)} minutes ago`
    } else if(hrs < 24) {
        return `${Math.ceil(hrs)} hours ago`
    } else if(days < 30) {
        return `${Math.ceil(days)} days ago`
    } else if(months < 12) {
        return `${Math.ceil(months)} months ago`
    } else {
        return `${Math.ceil(yrs)} days ago`
    }
}

function Feed(props) {
    let {num_comments, points, title, url, author, created_at, created_at_i, objectID} = props.feed
    points = points || 0
    return (
        <React.Fragment>
            <td className="commentsNumber">
                {num_comments || "-"}
            </td>
            <td className="upvoteContainer">
                <span className={points > 100 ? "high" : points > 50 ? "medium" : "low"}>
                    {points || "-"}
                </span>
                <button className={`upvoteAction ${props.isUpvoted ? 'upvoted': ''}`} onClick={() => {props.upvote(objectID)}} title={`${props.isUpvoted ? 'unvote': 'upvote'}`}>
                    <span className="arrow"></span>
                </button>
            </td>
            <td className="content">
                <span className="title" tabIndex="0">
                    {title || ""}
                </span>
                <span className="domain" tabIndex="0">
                    {url ? `(${url.match(/:\/\/(.[^/]+)/)[1]})` : ""}
                </span>
                <span className="author" tabIndex="0">
                    by <span>{author || ""}</span>
                </span>
                <span className="time">
                    {created_at ? getTime(created_at) : ""}
                </span>
                <button className="hideButton" onClick={() => {props.hide(created_at_i)}} title="hide feed">
                    [ <span>hide</span> ]
                </button>
            </td>
        </React.Fragment>
    )
}

export default Feed
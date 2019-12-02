import React from 'react'
import './feed.css'

function Feed(props) {
    console.log("this --- ", props)
    let {num_comments, points, title, url, author, created_at_i} = props.feed
    return (
        <div className="feedContainer">
            <span className="commentsNumber">
                {num_comments || 0}
            </span>
            <span className="upvoteContainer">
                <span className="upvotesNumber">
                    <b>{points || 0}</b>
                </span>
                <button className="upvoteAction" onClick={() => {props.upvote(props.feedKey)}}>
                    up
                </button>
            </span>
            <span className="title">
                {title || ""}
            </span>
            <span className="domain">
                {url ? url.match(/:\/\/(.[^/]+)/)[1] : ""}
            </span>
            <span className="author">
                {author || ""}
            </span>
            <span className="time">
                {created_at_i || ""}
            </span>
            <button className="hideButton" onClick={() => {props.hide(props.feedKey)}}>
                hide
            </button>
        </div>
    )
}

export default Feed
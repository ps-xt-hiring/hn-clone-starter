import React from 'react';
import classes from './NewsItem.module.css';
import { getHostName, timeAgo } from '../utils/util';

const NewsItem = (props) => {
    const {heading:{objectID, num_comments, points, title, author, url, created_at_i, voteCount, isHide}, upVotePost, hidePost} = props;
    return !isHide && (<div className={classes.ListItem}>
        <div className={classes.MainInfo}>
            <div className={classes.CommentCount}>{num_comments}</div>
            <div className={classes.PointCount}>{voteCount || points}</div>
            <span className={classes.ArrowUp} onClick={() => upVotePost(objectID, (voteCount || points))}></span>
            <div className={classes.Title}>{title}</div>
        </div>
        <div className={classes.ExtraInfo}>
            <div className={classes.SpaceAround}>({getHostName(url)})</div>
            <div className={classes.SpaceAround}>by {author}</div>
            <div className={classes.SpaceAround}>{timeAgo(created_at_i)}</div>
            <button className={`${classes.SpaceAround} ${classes.HideButton}`} onClick={() => upVotePost(objectID, (voteCount || points), true)}>[hide]</button>
        </div>
    </div>)};

export default NewsItem;
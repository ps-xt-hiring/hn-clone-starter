import React, { useState } from 'react';
import utils from '../../../utils/utils';
import iconUp from '../../../assets/images/grayarrow2x.gif';

const FeedItem = props => {

    const item = props.data;

    const title = item.title ? item.title : item.story_title;
    const url = item.url ? item.url : item.story_url;
    const [downvote, setDownVote] = useState(item.downvote ? item.downvote : false);
    const [points, setPoints] = useState(item.points ? item.points : 0);

    /**
     * Sending the callback to parent component
     */
    const setHide = () => {
        props.hideItem(item);
    };

    /**
     * Upvote and Downvote functionality manager
     */
    const manageVote = () => {
        downvote ? setPoints(points-1) : setPoints(points+1)
        item.points = points;
        item.downvote = !downvote;
        setDownVote(!downvote);
        props.downvoteItem(item);
    }

    return (
        <div className="feed-item">
            <span className="item-count comment-count">{item.num_comments ? item.num_comments : 0}</span>
            <span className={"item-count vote-count " + (utils.getColorByRange(points))}>{points}</span>
            <img className={'vote-icon ' + (downvote ? 'hide-icon' : '')} src={iconUp} alt="upvote" onClick={manageVote}/>
            <div className="feed-content">
                <div className="feed-content-1">
                    <a className="title" href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                    {url && url.length > 0 ? <span className="host-name">({utils.getHostUrl(url)})</span> : null}
                </div>
                <div className="feed-content-2">
                    <span className="author">by <span className="name">{item.author}</span></span>
                    <span className="timestamp">{utils.getDateDiff(item.created_at_i)}</span>
                    { downvote ? <span className="hide-item" onClick={manageVote}>[ <span className="text">down vote</span> ]</span> : null }
                    <span className="hide-item" onClick={setHide}>[ <span className="text">hide</span> ]</span>
                </div>
            </div>
        </div>
    );
}

export default FeedItem;
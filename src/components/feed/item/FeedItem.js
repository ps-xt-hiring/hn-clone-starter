import React, { useState } from 'react';
import PropTypes from 'prop-types';
import utils from '../../../utils/utils';
import iconUp from '../../../assets/images/grayarrow2x.gif';

const FeedItem = (props) => {
  const { data, hideItem, downvoteItem } = props;
  const title = data.title ? data.title : data.story_title;
  const url = data.url ? data.url : data.story_url;
  const [downvote, setDownVote] = useState(data.downvote ? data.downvote : false);
  const [points, setPoints] = useState(data.points ? data.points : 0);

  /**
   * Sending the callback to parent component
   */
  const setHide = () => {
    hideItem(data);
  };

  /**
   * Upvote and Downvote functionality manager
   */
  function manageVote() {
    if (downvote) {
      setPoints(points - 1);
    } else {
      setPoints(points + 1);
    }

    data.points = points;
    data.downvote = !downvote;
    setDownVote(!downvote);
    downvoteItem(data);
  }

  return (
    <div className="feed-item">
      <span className="item-count comment-count">{data.num_comments ? data.num_comments : 0}</span>
      <span className={`item-count vote-count ${utils.getColorByRange(points)}`}>{points}</span>
      <img
        className={`vote-icon ${downvote ? 'hide-icon' : ''}`}
        role="presentation"
        src={iconUp}
        alt="upvote"
        onClick={manageVote}
        onKeyDown={manageVote}
      />
      <div className="feed-content">
        <div className="feed-content-1">
          <a className="title" href={url} target="_blank" rel="noopener noreferrer">{title}</a>
          {
            (url && url.length > 0)
              ? (
                <span className="host-name">
                  (
                  {utils.getHostUrl(url)}
                  )
                </span>
              )
              : null
          }
        </div>
        <div className="feed-content-2">
          <span className="author">
            by
            <span className="name">{data.author}</span>
          </span>
          <span className="timestamp">{utils.getDateDiff(data.created_at_i)}</span>
          {
            downvote
              ? (
                <span className="hide-item" role="button" tabIndex="-1" onClick={manageVote} onKeyDown={manageVote}>
                [
                  <span className="text">down vote</span>
                ]
                </span>
              )
              : null
          }
          <span className="hide-item" role="button" tabIndex="-2" onClick={setHide} onKeyDown={setHide}>
            [
            <span className="text">hide</span>
            ]
          </span>
        </div>
      </div>
    </div>
  );
};

FeedItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  hideItem: PropTypes.func.isRequired,
  downvoteItem: PropTypes.func.isRequired,
};

export default FeedItem;

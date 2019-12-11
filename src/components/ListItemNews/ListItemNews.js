import React from 'react';
import './ListItemNews.css';
import {urlShortner,timeConversion} from '../../utility/utility'
import PropTypes from 'prop-types';

const ListItemNews = ({
    num_comments: numComments,
    points,
    objectID,
    title,
    url,
    author,
    created_at: createdAt,
    upVoteClick,
    hideListClick
  }) => {
  return (
    <li className="listItemNews">
      <div className="comments">
      <span>{numComments}</span>
      </div>
      <div className="points">
      <span>{points}</span>
        <button type="button" onClick={() => upVoteClick(objectID)}>
          <span className="arrow-up" />
        </button>
      </div>
      <div className="details">
      <span className="title">{title}</span>
        <span className="url">
          <a href={url}>{urlShortner(url)}</a>
        </span>
        <span className="by"> by </span>
        <span className="author">{author}</span>
        <span className="createdAt">{timeConversion(createdAt)}</span>
        <button
          type="button"
          className="hide"
          onClick={() => hideListClick(objectID)}
        >
          <span>[ Hide ]</span>
        </button>
      </div>
    </li>
  );
};

ListItemNews.propTypes = {
    num_comments: PropTypes.string,
    points: PropTypes.string,
    author: PropTypes.string,
    objectID: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    created_at: PropTypes.string,
    upVoteClick: PropTypes.func,
    hideListClick: PropTypes.func
};

export default ListItemNews;
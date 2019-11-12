import React from "react";
import "./ListItemNews.css";
import {urlShortner,timeConversion} from '../../utility/utility'
import PropTypes from 'prop-types';

const ListItemNews = props => {
  return (
    <li className="listItemNews">
      <div className="comments">
        <span>{props.data.num_comments}</span>
      </div>
      <div className="points">
        <span>{props.data.points}</span>
        <span className="arrow-up" onClick={()=>props.upVoteClick(props.data.objectID)}></span>
      </div>
      <div className="details">
        <span className="title">{props.data.title} </span>
        <span className="url"> 
            <a href={props.data.url}>({urlShortner(props.data.url)})</a>
        </span> 
        <span className="by"> by</span>
        <span className="author"> {props.data.author}</span>
        <span className="createdAt"> {timeConversion(props.data.created_at)}</span>
        <span className="hide" onClick={()=>props.hideListClick(props.data.objectID)}> [ hide ]</span>
      </div>
    </li>
  );
};

ListItemNews.propTypes = {
  data: PropTypes.object
};

export default ListItemNews;

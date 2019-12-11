/* eslint-disable import/no-webpack-loader-syntax,   import/first */

import React from 'react';
import PropTypes from 'prop-types';
import { rootUrl, daysAgo } from '../common/utils';
import './Button.scss';
import './news.scss';


const NewsComponent = (props) => {
  
    const { item, hideMe, handleUpVote, isLiked } = props;
    const { title, num_comments: numberOfComments, points: votes, url, author, created_at: time, objectID } = item;
    return (
        <tr>
            <td className="bold">{numberOfComments}</td>
            <td className= "bold">{votes} </td>
            <td><p className= { `arrow-up ${isLiked ? "liked" : ""}`}  role="button" onClick={()=>handleUpVote(objectID)} onKeyUp={() => {}} tabIndex="0"> </p></td>
            <td><span className="bold">{title} </span> <a href={url}  target="_blank" rel="noopener noreferrer">{ url ? "(" + rootUrl(url)+ ")" : null} </a> <span className="basic-text"> by </span> <span className="bold"> {author} </span> <span className="basic-text">{daysAgo(time) }</span>
            <span className="tag-box">[</span><button className="link-button" onClick={()=>hideMe(objectID)}>hide</button><span className="tag-box">]</span></td>
        </tr>

    );
}

NewsComponent.propTypes = {
    item: PropTypes.object.isRequired,
    hideMe: PropTypes.func.isRequired,
    handleUpVote: PropTypes.func.isRequired,
    isLiked: PropTypes.bool
};
export default NewsComponent;
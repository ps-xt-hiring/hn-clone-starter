import React from 'react';
import { ReactComponent as Icon} from '../images/svg/up-arrow.svg';
import PropTypes from 'prop-types';
import * as helpers from '../utils/helpers';

function ArticleList(props) {
    const { data, handleUpVoteClick, handleHideClick } = props;

    const hostname =  helpers.getHostname( data.url );
    const postedTimeString = helpers.getPostedTimeString( data.created_at );

  return (
    <tr>
    <td className="article-comments"> {props.data.num_comments ? props.data.num_comments : 0} </td>
    <td className="article-votes"> {props.data.points}{' '} <Icon className="upvote-icon" onClick={() => handleUpVoteClick(props.index)} /> </td>
    <td className="article-info"> 
      <span className="title">{props.data.title}{' '}</span>
      <span className="hostname">({hostname}){' '}</span>
      <span className="posted-by">{'by '}</span>
      <span className="author">{props.data.author}</span>
      <span className="posted-time">{postedTimeString}</span>
      <span className="hide-post" onClick={() => handleHideClick(props.index)}>{' [hide] ' }</span>
    </td>
  </tr>
  )
}

ArticleList.propTypes = {
  data: PropTypes.object.isRequired,
  handleUpVoteClick: PropTypes.func.isRequired,
  handleHideClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
export default ArticleList;
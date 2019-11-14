import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Icon } from '../images/svg/up-arrow.svg';
import * as helpers from '../utils/helpers';

function ArticleList(props) {
  const {
    data, index, handleUpVoteClick, handleHideClick,
  } = props;

  const hostname = helpers.getHostname(data.url);
  const postedTimeString = helpers.getPostedTimeString(data.created_at);

  return (
    <tr>
      <td className="article-comments">
        {data.num_comments ? data.num_comments : 0}
      </td>
      <td className="article-votes">{data.points}
        <Icon className="upvote-icon" onClick={() => handleUpVoteClick(index)} />
      </td>
      <td className="article-info">
        <span className="title">{data.title}</span>
        <span className="hostname">({hostname})</span>
        <span className="posted-by">{' by '}</span>
        <span className="author">{data.author}{' '}</span>
        <span className="posted-time">{postedTimeString}</span>
        <span
          className="hide-post"
          role="button"
          tabIndex="0"
          onKeyUp={() => {}}
          onClick={() => handleHideClick(index)}
        >{' [hide] '}
        </span>
      </td>
    </tr>
  );
}

ArticleList.propTypes = {
  data: PropTypes.number.isRequired,
  handleUpVoteClick: PropTypes.func.isRequired,
  handleHideClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default ArticleList;

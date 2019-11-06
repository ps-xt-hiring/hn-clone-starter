import React from 'react';
import './ListItem.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { toBaseURL, getFormattedDate } from '../../common/utils';
import Button from '../Button/Button';

const ListItem = (props) => {
  const {
    handleUpVote, hideNews, dispatch, item, rowBgStyle,
  } = props;
  const {
    objectID, points, num_comments: numComments, title, url, author, created_at: createdAt,
  } = item;

  return (
    <tr className={rowBgStyle}>
      <td className="comments">{numComments}</td>
      <td className="points">
        {points}
        <span className="arrow-up" onClick={() => handleUpVote(objectID, dispatch)} role="button" onKeyUp={() => {}} tabIndex="0" />
      </td>
      <td className="info">
        <span className="list-item-title">{title}</span>
        <span className="list-item-url">
          <a href={url} className="list-item-link">
            (
            {toBaseURL(url)}
            )
          </a>
        </span>
        <span className="list-item-by">by</span>
        <span className="list-item-author">{author}</span>
        <span className="list-item-date">{getFormattedDate(createdAt)}</span>
        <span>
          [
          <Button variant="secondary" onClick={() => hideNews(objectID, dispatch)} title="hide" className="list-item-hide" />
          ]
        </span>
      </td>
    </tr>
  );
};

ListItem.propTypes = {
  handleUpVote: PropTypes.func.isRequired,
  hideNews: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  rowBgStyle: PropTypes.string.isRequired,
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ListItem;

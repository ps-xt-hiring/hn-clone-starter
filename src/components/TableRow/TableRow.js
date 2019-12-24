import React from 'react';
import './TableRow.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { toBaseURL, getFormattedDate } from '../../common/utils';
import Button from '../Button/Button';

const TableRow = (props) => {
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
        <span className="table-row-title">{title}</span>
        <span className="table-row-url">
          <a href={url} className="table-row-link">
            (
            {toBaseURL(url)}
            )
          </a>
        </span>
        <span className="table-row-by">by</span>
        <span className="table-row-author">{author}</span>
        <span className="table-row-date">{getFormattedDate(createdAt)}</span>
        <span>
          [
          <Button variant="secondary" onClick={() => hideNews(objectID, dispatch)} title="hide" className="table-row-hide" />
          ]
        </span>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  handleUpVote: PropTypes.func.isRequired,
  hideNews: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  rowBgStyle: PropTypes.string.isRequired,
  item: PropTypes.shape({
    objectID: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    num_comments: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    author: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRow;

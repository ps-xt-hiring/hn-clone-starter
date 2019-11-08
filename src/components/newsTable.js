import React from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core/';
import { getDomain, getColor } from '../functions/helper';
import EmptyTableCells from './emptyTableCells';

const NewsTable = ({
  newsList,
  handlePagination,
  handleVote,
  hideCurrentNews,
}) => (
  <>
    <Table aria-label="news list table" className="news-list">
      <TableBody>
        <TableRow className="news-list__empty-row" />
        {newsList.length ? (
          newsList.map(row => (
            <TableRow key={row.objectID} className="news-row">
              <TableCell size="small" align="center">
                <strong>{row.num_comments ? row.num_comments : 0}</strong>
              </TableCell>
              <TableCell size="small" className="news-row__cell" width={1}>
                <strong>{row.points}</strong>
              </TableCell>
              <TableCell size="small" className="news-row__cell" width={1}>
                <i
                  className={`material-icons news-row__arrow ${getColor(
                    row.num_comments,
                  )} pointer`}
                  onClick={() => handleVote(row)}
                  role="button"
                  tabIndex="0"
                  onKeyPress={() => handleVote(row)}
                >
                  {row.isVoted ? 'arrow_drop_down' : 'arrow_drop_up'}
                </i>
              </TableCell>
              <TableCell size="small" className="news-row__cell">
                <Link
                  href={row.url ? row.url : '/'}
                  className="news-row__title"
                >
                  {row.title ? `${row.title} ` : 'No Title Available '}
                </Link>
                <h4 className="grey news-row__subtitle news-row__subtitle--grey">
                  (
                  {getDomain(row.url)}
)
                </h4>
                <h4 className="grey news-row__subtitle"> by</h4>
                <strong className="news-row__subtitle">
                  {' '}
                  {row.author}
                  {' '}
                </strong>
                <h4 className="grey news-row__subtitle">
                  {moment(row.created_at).fromNow()}
                </h4>
                <button
                  className="news-row__subtitle pointer"
                  type="button"
                  onClick={() => hideCurrentNews(row)}
                >
                  [
                  {' '}
                  <strong>hide</strong>
                  {' '}
]
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyTableCells />
        )}
      </TableBody>
    </Table>
    <button
      onClick={handlePagination}
      type="button"
      className="pointer pagination-button"
    >
      More
    </button>
  </>
);

NewsTable.defaultProps = {
  newsList: [],
};

NewsTable.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  hideCurrentNews: PropTypes.func.isRequired,
  newsList: PropTypes.arrayOf(
    PropTypes.shape({
      num_comments: PropTypes.number,
      points: PropTypes.number,
      isVoted: PropTypes.boolean,
      title: PropTypes.string,
      url: PropTypes.string,
      author: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ),
};

export default NewsTable;

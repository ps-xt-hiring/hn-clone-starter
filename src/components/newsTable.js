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
        <TableRow className="empty-table-row" />
        {newsList.length ? (
          newsList.map(row => (
            <TableRow key={row.objectID}>
              <TableCell size="small" align="center">
                <strong>{row.num_comments ? row.num_comments : 0}</strong>
              </TableCell>
              <TableCell size="small" className="no-padding" width={1}>
                <strong>{row.points}</strong>
              </TableCell>
              <TableCell size="small" className="no-padding" width={1}>
                <i
                  className={`material-icons ${getColor(
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
              <TableCell size="small" className="no-padding">
                <Link href={row.url ? row.url : '/'} className="title">
                  {row.title ? `${row.title} ` : 'No Title Available '}
                </Link>
                <h4 className="grey sub-title">
(
                  {getDomain(row.url)}
)
                </h4>
                <h4 className="grey sub-title"> by</h4>
                <strong className="sub-title">
                  {' '}
                  {row.author}
                  {' '}
                </strong>
                <h4 className="grey sub-title">
                  {moment(row.created_at).fromNow()}
                </h4>
                <button
                  className="sub-title pointer"
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
  newsList: PropTypes.oneOfType([PropTypes.array]),
};

export default NewsTable;

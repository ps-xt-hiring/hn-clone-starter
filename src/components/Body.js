import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ArticleList from './ArticleList';
import { MESSAGES } from '../utils/constants';

const getBody = (payload) => {
  const {
    articles, handleHideClick, handleUpVoteClick,
  } = payload;

  return (
    <Table responsive striped>
      <tbody>
        {
              articles.length > 0
                ? articles.map((item, index) => (
                  <ArticleList
                    key={item.objectID}
                    data={item}
                    index={index}
                    handleHideClick={handleHideClick}
                    handleUpVoteClick={handleUpVoteClick}
                  />
                ))
                : (
                  <tr>
                    <td>
                      {MESSAGES.NO_RECORDS}
                    </td>
                  </tr>
                )
            }
      </tbody>
    </Table>
  );
};

function Body(props) {
  return (
    getBody(props)
  );
}

Body.propTypes = {
  articles: PropTypes.arrayOf,
  isLoading: PropTypes.bool,
  handleHideClick: PropTypes.func.isRequired,
  handleUpVoteClick: PropTypes.func.isRequired,
};

export default Body;

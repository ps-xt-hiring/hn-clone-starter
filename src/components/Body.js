import React from 'react';
import PropTypes from 'prop-types';
import ReactSpinner from 'react-loader-spinner';
import { Table } from 'react-bootstrap';
import ArticleList from './ArticleList';
import * as CONSTANTS from '../utils/constants';

const { MESSAGES, SPINNER_TYPES } = CONSTANTS;

function Body(props) {

    const getBody = ( props ) => {
        const { articles, isLoading, handleHideClick, handleUpVoteClick } = props;
    
        if( isLoading ) {
          return ( <div className="loader">
            <ReactSpinner 
              type={SPINNER_TYPES.TAIL_SPIN}
              color="#ff6600"/>
          </div> );
        }
    
        return (
          <Table responsive striped>
            <tbody>
              {
                articles.length ?
                  articles.map((item, index) => (
                    <ArticleList
                      key={item.objectID}
                      data={item}
                      index={index}
                      handleHideClick={handleHideClick}
                      handleUpVoteClick={handleUpVoteClick} />
                  )) :
                  <tr>
                    <td> {MESSAGES.NO_RECORDS} </td>
                  </tr>
              }
            </tbody>
          </Table>
        );
      };

    return (
        getBody( props )
    )
}

Body.propTypes = {
    articles: PropTypes.array,
    isLoading: PropTypes.bool
};

export default Body; 
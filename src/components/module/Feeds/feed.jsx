import React from 'react';
import PropTypes from 'prop-types';
import map from 'loadsh/map';

const propsTypes = {
  feeds: PropTypes.array,
};

const defaultProps = {
  feeds: [],
};

const Feeds = props => {
  const {feeds} = props;

  return (
  <table className="table table-striped">
    <tbody>
      {
       map(feeds, (item) => (
         <tr key={item.objectID}>
           <td>{item.num_comments}</td>
           <td><span className="glyphicon glyphicon-triangle-top" /></td>
           <td>{item.title}</td>
           <td className="text-style">
             <span>
               {item.url}
               {' '}
               <span>by</span>
               {' '}
               { item.author }
               {' '}
               <span>at</span>
               {' '}
               { item.created_at }
             </span>
           </td>
         </tr>
       ))
      }
    </tbody>
  </table>
)};

Feeds.propTypes = propsTypes;
Feeds.defaultProps = defaultProps;

export default Feeds;

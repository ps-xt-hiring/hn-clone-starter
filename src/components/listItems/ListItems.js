import React from 'react';
import classNames from 'classnames';
import Listitem from '../listitem/Listitem';

function ListItems(props) {
  return (
      <React.Fragment>
          {props.records.map((record, index) => (
              <Listitem record={record} recordIndex= {index} key={index} handleHide={props.handleHide} handleVote={props.handleVote} />
            ))}
        </React.Fragment>
  );
}

export default ListItems;

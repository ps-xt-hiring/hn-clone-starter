/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import helpers from '../../../utils/helpers';

const List = (props) => {
  let urlName = '';

  // eslint-disable-next-line react/destructuring-assignment
  if (props.data.url) urlName = helpers.getDomainByUrl(props.data.url);

  const formatedDate = helpers.getDateFormate(props.data.created_at);
  return (
    <div className="row no-margin list">
      <div className="col-2 no-padding">
        <div className="row no-margin">
          <div className="col-2 offset-md-3 total-comments">{props.data.num_comments}</div>
          <div className="col text-left offset-md-2 total-votes" style={{ color: '#D67' }}>
            {props.data.points}
.
            <span role="presentation" className="up-arrow" onClick={props.vote} />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="title">
            <a href="/">{props.data.title}</a>
          </div>
          <div className="newsUrl">
(
            <a href={props.data.url} target="_blank" rel="noopener noreferrer" className="url">{urlName}</a>
)
          </div>
          <div className="author">
                        by
            {' '}
            <span>{props.data.author}</span>
            {' '}
            {formatedDate}
            {' '}
[
            <span role="presentation" className="hide-news" onClick={props.hide}>hide</span>
]
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

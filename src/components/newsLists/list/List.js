import React from 'react';
import { PropTypes } from 'prop-types';
import { getDomainByUrl, getDateFormate } from '../../../utils/helpers';

const List = (props) => {
  let urlName = '';
  const {
    data: {
      url, created_at: createdAt, num_comments: numComments, points, title, author,
    }, vote, hide,
  } = props;

  if (url) urlName = getDomainByUrl(url);

  const formatedDate = getDateFormate(createdAt);
  return (
    <div className="row no-margin list">
      <div className="col-2 no-padding">
        <div className="row no-margin">
          <div className="col-2 offset-md-3 total-comments">{numComments}</div>
          <div className="col text-left offset-md-2 total-votes">
            {points}
.
            <span role="presentation" className="up-arrow" onClick={vote} />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="title">
            <a href="/">{title}</a>
          </div>
          <div className="newsUrl">
(
            <a href={url} target="_blank" rel="noopener noreferrer" className="url">{urlName}</a>
)
          </div>
          <div className="author">
                        by
            {' '}
            <span>{author}</span>
            {' '}
            {formatedDate}
            {' '}
[
            <span role="presentation" className="hide-news" onClick={hide}>hide</span>
]
          </div>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.shape(
    {
      url: PropTypes.string,
      created_at: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
    },
  ),
  vote: PropTypes.func,
  hide: PropTypes.func,
};

List.defaultProps = {
  data: {
    url: '',
    created_at: 0,
    num_comments: 0,
    points: '',
    title: '',
    author: '',
  },
  vote: () => {},
  hide: () => {},
};

export default List;

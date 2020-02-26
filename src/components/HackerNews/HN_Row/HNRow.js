import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extractHostname, timeDifference } from '../../../utility/Helper';
import './HNRow.css';
import UpVote from './UpVote';

export default class HNRow extends Component {
  constructor(props) {
    super(props);
    const { points } = this.props;
    this.state = {
      vote: points,
    };
  }

  render() {
    const {
      num_comments: numComments,
      title,
      url,
      author,
      created_at: createdAt,
      objectID,
      hideHNRowHandler,
      upVoteHNewsHandler,
      isUpVoted = false,
    } = this.props;
    const { vote } = this.state;
    return (
      <li>
        <span className="comments">{numComments || '-'}</span>
        <UpVote
          vote={vote}
          upVoteHNewsHandler={upVoteHNewsHandler}
          objectID={objectID}
          isUpVoted={isUpVoted}
        />
        <p className="details">
          <span className="title">{title}</span>
          <span className="domain margin-lr">
(
            {extractHostname(url)}
)
          </span>
          <span className="font-x-small margin-lr">by</span>
          <span className="author margin-lr">{author}</span>
          <span className="createdat margin-lr">
            {createdAt && timeDifference(createdAt)}
          </span>
          <span
            className="hide  margin-lr"
            role="link"
            onClick={() => hideHNRowHandler(objectID)}
            onKeyDown={() => hideHNRowHandler(objectID)}
          >
            [hide]
          </span>
        </p>
      </li>
    );
  }
}
HNRow.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  created_at: PropTypes.string,
  createdAt: PropTypes.string,
  num_comments: PropTypes.number,
  points: PropTypes.number,
  objectID: PropTypes.string,
  isUpVoted: PropTypes.bool,
  hideHNRowHandler: PropTypes.func.isRequired,
  upVoteHNewsHandler: PropTypes.func.isRequired,
};
HNRow.defaultProps = {
  title: '',
  url: '',
  author: '',
  num_comments: 0,
  points: 0,
  createdAt: '',
  objectID: '',
  isUpVoted: false,
  created_at: '',
};

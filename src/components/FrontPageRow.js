import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extractHostname, timeDifference } from '../utility/Helper';
import arrow from '../assets/grayarrow.gif';
import './FrontPage.css';

export default class FrontPageRow extends Component {
  constructor(props) {
    super(props);
    const { points } = this.props;
    this.state = {
      vote: points,
      displayli: true,
    };
  }

  render() {
    const {
      num_comments: numComments, title, url, author, createdAt,
    } = this.props;
    const { vote, displayli } = this.state;
    return (
      <li style={{ display: displayli || 'none' }}>
        <span className="comments">{numComments || '-'}</span>
        <span className={vote > 100 ? 'upvote upvote-red' : 'upvote'}>
          {vote}
          <img
            src={arrow}
            alt="upvote"
            className="votearrow"
            onClick={() => this.setState({ vote: vote + 1 })}
            onKeyDown={() => this.setState({ vote: vote + 1 })}
          />
        </span>
        <span className="title">
          <strong>{title}</strong>
        </span>
        <span className="domain">
            (
          {
                    extractHostname(url)
                }
            )
        </span>
        <span className="author">
          {' '}
            by
          {' '}
          <strong>{author}</strong>
        </span>
        <span className="createdat">
          {createdAt && timeDifference(createdAt)}
        </span>
        <span className="hide" role="link" onClick={() => this.setState({ displayli: false })} onKeyDown={() => this.setState({ displayli: false })}>
            [hide]
        </span>
      </li>
    );
  }
}
FrontPageRow.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.string,
  num_comments: PropTypes.number,
  points: PropTypes.number,
};
FrontPageRow.defaultProps = {
  title: '',
  url: '',
  author: '',
  num_comments: 0,
  points: 0,
  createdAt: '',
};

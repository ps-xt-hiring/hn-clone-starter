import React from 'react';
import { PropTypes } from 'prop-types';
import Constants from '../constants';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.sendHideRequest = this.sendHideRequest.bind(this);
    this.sendUpvoteRequest = this.sendUpvoteRequest.bind(this);
    this.sendDownvoteRequest = this.sendDownvoteRequest.bind(this);
  }

  sendHideRequest() {
    const { onHide, id } = this.props;
    onHide(id);
  }

  sendUpvoteRequest() {
    const { onUpvote, id } = this.props;
    onUpvote(id);
  }

  sendDownvoteRequest() {
    const { onDownvote, id } = this.props;
    onDownvote(id);
  }

  render() {
    const {
      sequenceNumber, author, title, age, commentsCount, shortUrl, upvoted, proxyPoints,
    } = this.props;
    const points = proxyPoints; // Switch to Points after Auth integration
    return (
      <tr className="post-item" key={sequenceNumber}>
        <td className="story-index">{commentsCount}</td>
        {' '}
        <td>
          <span>{points}</span>
          <span className="upvote-icon">
            {' '}
            {!upvoted && <img onClick={this.sendUpvoteRequest} src={Constants.Url.Grey_Arrow_Gif} alt={Constants.Text.rankUpAlt} aria-label={Constants.Text.rankUpDescription} />}
          </span>
          {' '}
          <span className="story-title">{title}</span>
          {' '}

          <span className="extra-info">
            {shortUrl && (
              <span className="light">
            (
                {shortUrl}
            )
              </span>
            )}
            {' '}
            <br className="break-for-mobile" />
            <span className="break-for-mobile">&nbsp;</span>
            <span className="lighter">
              {Constants.Text.by}
              <span className="dark">{author}</span>
            </span>
            {' '}
            <span className="light">
              {' '}
              {age}
            </span>
            {' '}
            <span className="hide-link" onClick={this.sendHideRequest} aria-hidden>{Constants.Text.hide}</span>
          </span>
        </td>
      </tr>
    );
  }
}

Post.propTypes = {
  sequenceNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  commentsCount: PropTypes.number,
  shortUrl: PropTypes.string,
  upvoted: PropTypes.bool,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  age: PropTypes.string,
  proxyPoints: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

Post.defaultProps = {
  commentsCount: 0,
  shortUrl: '',
  upvoted: false,
  age: 1,
  proxyPoints: 0,
};

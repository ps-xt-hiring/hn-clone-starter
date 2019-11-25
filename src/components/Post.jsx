import React from 'react';
import {PropTypes} from 'prop-types';
import ReactTimeAgo from 'react-time-ago';

import Constants from '../constants';

export default class Post extends React.Component {
    static propTypes = {
        sequenceNumber: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        points: PropTypes.number,
        upvoted: PropTypes.bool,
        hidden: PropTypes.bool,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        onHide: PropTypes.func.isRequired,
        onUpvote: PropTypes.func.isRequired
      }
    
      static defaultProps = {
        sequenceNumber: 1,
        id: '1',
        points: 0,
        upvoted: false,
        hidden: false,
      }
    
      constructor (props) {
        super(props);

        this.sendHideRequest = this.sendHideRequest.bind(this);
        this.sendUpvoteRequest = this.sendUpvoteRequest.bind(this);
        this.sendDownvoteRequest = this.sendDownvoteRequest.bind(this);
      }

      sendHideRequest() {
        this.props.onHide(this.props.id)
      }

      sendUpvoteRequest() {
        this.props.onUpvote(this.props.id)
      }

      sendDownvoteRequest() {
        this.props.onDownvote(this.props.id)
      }

      render () {
        const {sequenceNumber, author, title, age,commentsCount, shortUrl, upvoted} = this.props;
        const points = this.props.proxyPoints;    // Switch to Points after Auth integration
        return (
          <tr className="post-item" key={sequenceNumber}>
            <td className="story-index">{commentsCount}</td>{' '}
            <td> 
              <span>{points}</span>
              <span className="upvote-icon" > {/* For Easier Accessibility, onClick triggered from image container */}
                {!upvoted &&<img onClick={this.sendUpvoteRequest}  src="https://news.ycombinator.com/grayarrow.gif" alt={Constants.Text.rankUpAlt} aria-label={Constants.Text.rankUpDescription}></img>}
              </span>
              {/* /*Hiding Downvote Functionality /* <span onClick={this.sendDownvoteRequest}>[DOWNVOTE]</span> */}{' '}
              <span className="story-title">{title}</span>{' '}

              <span className="extra-info">
                {shortUrl && (<span className="light">({shortUrl})</span>)}{' '}
                <br className="break-for-mobile"/>
                <span className="break-for-mobile">&nbsp;</span>
                <span className="lighter">{Constants.Text.by}<span className="dark">{author}</span></span>{' '}
                <span className="light">  <ReactTimeAgo date={age}/></span>{' '}
                <span className="hide-link"onClick={this.sendHideRequest}>{Constants.Text.hide}</span>
              </span>
            </td>
          </tr>
        );
      }
  }
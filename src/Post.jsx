import React from 'react';
import {PropTypes} from 'prop-types';

export default class Post extends React.Component {
    static propTypes = {

        sequenceNumber: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,

        points: PropTypes.number,
        upvote: PropTypes.bool,
        hidden: PropTypes.bool,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,

        onHide: PropTypes.func.isRequired,
    
      }
    
      static defaultProps = {
        sequenceNumber: 1,
        id: '1',
        points: 0,
        upvote: false,
        author: "demo author",
        title: "demo-title",
        url: 'www.google.com'
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
        let {sequenceNumber, points,  author, title, age,commentsCount, shortUrl} = this.props;
        return (
          <tr className="post-item" key={sequenceNumber}>
            <td className="story-index">{commentsCount}</td>{' '}
            <td> 
              <span>{points}</span> <span onClick={this.sendUpvoteRequest}><img className="upvote-icon" src="https://news.ycombinator.com/grayarrow.gif" alt="Rank Up icon" aria-label="click here to improve story's popularity"></img></span>
              {/* /*Hiding Downvote Functionality /* <span onClick={this.sendDownvoteRequest}>[DOWNVOTE]</span> */}{' '}
              <span className="story-title">{title}</span>{' '}
              <span className="extra-info">
                {shortUrl && (<span className="light">({shortUrl})</span>)}{' '}
                <span className="lighter"> by <span className="dark">{author}</span></span>{' '}
                <span className="light"> {age}</span>{' '}
                <span className="hide-link"onClick={this.sendHideRequest}>[ hide ]</span>
              </span>
            </td>
          </tr>
        );
      }
  }
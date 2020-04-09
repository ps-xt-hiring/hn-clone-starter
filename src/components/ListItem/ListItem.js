import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

class ListItem extends React.Component {
  static propTypes = {
    updateVotesAction: PropTypes.func,
    index: PropTypes.number,
    item: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.getHostname = this.getHostname.bind(this);
    this.incrementUpvote = this.incrementUpvote.bind(this);
  }

  getHostname = url => {
    let hostname = '';
    if (url) {
      if (url.includes('www.')) {
        hostname = url.split('www.')[1].split('/')[0];
      }
      return hostname;
    }
  };

  incrementUpvote = () => {
    this.props.updateVotesAction(this.props.index);
  };

  render() {
    const {
      num_comments,
      points,
      title,
      url,
      author,
      created_at,
    } = this.props.item;
    const site = this.getHostname(url) || 'news.ycombinator.com';
    return (
      <li className="ListItem">
        <a>
          <a className="Comments"> {num_comments}</a>
          <button onClick={this.incrementUpvote}>
            <span className="UpVotes"> {points}</span>
          </button>
          <span className="Title">{title}</span>
          <span className="LinkDomain">({site})</span>
          <span className="author">by {author}</span>
          <span className="created">{created_at}</span>
          <button>hide</button>
        </a>
      </li>
    );
  }
}
export default ListItem;

import React from 'react';
import FeedsAPI from '../api/FeedsAPI';
import arrow from '../resources/images/arrow.gif';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: this.props.upvotes
    };
  }

  FeedsAPI = new FeedsAPI();

  getTime(time) {
    if (typeof time === 'number') {
      const currentTime = (new Date()).getTime();
      const diff = currentTime - time;
      let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;

      return `${hours} Hours ago`;
    }
    return time;
  }

  getLink(link) {
    if(typeof link === 'string') {
      const protocolEnd = link.indexOf('://') + 3;
      const firstSlash = link.indexOf('/', protocolEnd);
      if(firstSlash === -1) return link.substring(protocolEnd);
      return link.substring(protocolEnd, firstSlash);
    }
    return link;
  }

  addVote(e) {
    e.preventDefault();
    this.FeedsAPI.modifyVote(this.props.id, this.state.upvote + 1);

    this.setState({
      upvote: this.state.upvote + 1
    });
  }

  render() {
    return <>
      <div className = 'row hn-feed-row py-1'>
        <div className = 'col-1 text-center'><strong>{this.props.comments}</strong></div>
        <div className = 'col-1 text-center'>
          <strong>{this.state.upvote}</strong>
          <a href = "/" className = 'pl-1' onClick = {this.addVote.bind(this)}>
            <img src = {arrow} alt = 'Add Vote' />
          </a>
        </div>
        <div className = 'col-10'>{this.props.title} 
          <strong>
            <a href = {this.props.link} className = 'px-2 hn-link'>({this.getLink(this.props.link)})</a>
          </strong>
          <span className = 'hn-link'>by</span> 
          <span className = 'pl-2 hn-author'>{this.props.author}</span> 
          <strong className = 'pl-2 hn-time'>{this.getTime(this.props.time)}</strong>
          <span className='pl-2'>[<a href = '/' onClick = {this.hideFeed} className = 'hn-feed-hide'>hide</a>]</span>
        </div>
      </div>
    </>
  }
}

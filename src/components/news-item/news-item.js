import React from 'react';

export default class NewsItem extends React.Component {

  state = {
    upvoteCount: this.props.data.points
  }

  getDomainName = (url) => {
    if (url) {
      let urlParts = url.replace('http://', '').replace('https://', '').split(/[/?#]/);
      return urlParts[0];
    }
  };

  getDuration = (pastDate) => {
    var datePast = new Date(pastDate);
    var dateNow = new Date();

    var seconds = Math.floor(((dateNow) - datePast) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var years = Math.floor(days / 365);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    return years ? years + ' year' + (years > 1 ? 's' : '') : days ? days + ' day' + (days > 1 ? 's' : '') : hours ? hours + ' hour' + (hours > 1 ? 's' : '') : minutes ? minutes + ' minutes' + (minutes > 1 ? 's' : '') : seconds ? seconds + ' seconds' : ''
  }

  upgradeUpvote = () => {
    let newUpvote = this.state.upvoteCount + 1;
    this.setState({
      upvoteCount: newUpvote
    })
  }

  render() {
    let upvoteColor = this.state.upvoteCount > 100 ? '#ff6502' : this.state.upvoteCount > 80 && this.state.upvoteCount <= 100 ? '#ab4400' : '';
    return (
      <li className="news-list__item">
        <div className="comment-number">{this.props.data.num_comments}</div>
        <div className="title-wrap">
          <div className="upvotes" style={{ color: upvoteColor, }}>{this.state.upvoteCount}</div>
          <div className="carot-arrow" onClick={this.upgradeUpvote} />
          <div className="title">
            <span>
              {this.props.data.title ? this.props.data.title : this.props.data.story_title}
            </span>
            &nbsp;
            {
              this.props.data.url || this.props.data.story_url ? (<span className="small-text">
                (
                <a href={this.props.data.url ? this.props.data.url : this.props.data.story_url} className="grey-text">{this.getDomainName(this.props.data.url ? this.props.data.url : this.props.data.story_url)}</a>
              )
              </span>) : null
            }

            <span className="small-text"> by </span>
            <span className="username"> {this.props.data.author} </span>
            <span className="grey-text"> {this.getDuration(this.props.data.created_at)} ago </span>
            <span className="grey-text">[ </span>
            <span className="hide-btn" onClick={() => this.props.hideItem(this.props)}>hide</span>
            <span className="grey-text"> ]</span>
          </div>
        </div>
      </li>
    )
  }
}

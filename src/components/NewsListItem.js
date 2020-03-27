import React from "react";

class NewsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comments: "",
      vote: 0,
      domain: "",
      date: "",
      author: ""
    };
  }

  componentDidMount() {
    const {
      author = "",
      points = 0,
      url,
      created_at,
      title = "",
      num_comments = ""
    } = this.props.newsData;

    this.setState({
      title: title,
      comments: num_comments,
      author: author,
      vote: !this.isVoteGiven() ? points : points + 1,
      domain: url ? this.getDomainName(url) : "",
      date: this.getTime(created_at)
    });
  }

  getDomainForDisplay = () => {
    const { domain } = this.state;
    return domain ? (
      <a
        href={domain}
        title="Url"
        className="domain-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" (" + domain + ")"}
      </a>
    ) : null;
  };

  getDomainName(url) {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .split(/[/?#]/)[0];
  }

  getTime(creationTime) {
    const todayDate = new Date();
    const createdAt = new Date(creationTime);

    let seconds = Math.floor((todayDate - createdAt) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    hours -= days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    let finalDate = "";
    if (years) {
      finalDate = `${years} year`;
    } else if (days) {
      finalDate = `${days} days`;
    } else if (hours) {
      finalDate = `${hours} hours`;
    } else if (minutes) {
      finalDate = `${minutes} minute`;
    }
    return finalDate;
  }

  getUpvotedNews = () => {
    let upvotedNews = localStorage.getItem("upvotedNews");
    return upvotedNews ? JSON.parse(upvotedNews) : [];
  };

  addVote(event) {
    let { vote } = this.state;
    const { objectID } = this.props.newsData;
    let upvotedNews;
    vote = vote + 1;
    this.setState({
      vote
    });

    upvotedNews = this.getUpvotedNews();
    upvotedNews.push(objectID);
    localStorage.setItem("upvotedNews", JSON.stringify(upvotedNews));
  }

  removeVote = event => {
    let { vote } = this.state;
    const { objectID } = this.props.newsData;
    let upvotedNews;

    upvotedNews = this.getUpvotedNews();
    const index = upvotedNews.indexOf(objectID);
    if (index !== -1) {
      upvotedNews.splice(index, 1);
    }

    localStorage.setItem("upvotedNews", JSON.stringify(upvotedNews));
    event.target.style.visibility = "visible";

    vote = vote - 1;
    this.setState({
      vote
    });
  };

  isVoteGiven = () => {
    const { objectID } = this.props.newsData;
    let upvotedNews = localStorage.getItem("upvotedNews");
    if (upvotedNews) {
      upvotedNews = JSON.parse(upvotedNews);
      return upvotedNews.indexOf(objectID) === -1 ? false : true;
    }
    return false;
  };

  render() {
    const { vote, author, date, title, comments } = this.state;
    const voteGiven = this.isVoteGiven();
    return (
      <li className="feed-news__item">
        <span className="comment" title="No of comments">
          {comments ? comments : 0}
        </span>
        <span className="vote" title="No of votes">
          {vote ? vote : 0}
        </span>
        <div className="item-row">
          {!voteGiven ? (
            <button
              className="arrow"
              title="Click to upvote"
              onClick={e => this.addVote(e)}
            />
          ) : (
            <button className="hide-arrow" />
          )}
          <div className="title">
            <span className="black-color">{title}</span>
            {this.getDomainForDisplay()}

            <span>
              {" by "}
              <span className="black-color" title="Author">
                {" "}
                {author}{" "}
              </span>
              <span title="Age"> {date} ago </span>
            </span>

            <span
              className="hide-btn"
              onClick={() => this.props.hidePost(this.props)}
            >
              [ hide ]
            </span>

            {voteGiven ? (
              <span className="unvote" onClick={e => this.removeVote(e)}>
                {" "}
                [ unvote ]
              </span>
            ) : null}
          </div>
        </div>
      </li>
    );
  }
}

export default NewsListItem;

import React from "react";
import ReactDOM from "react-dom";
import "./News.css";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      pageCount: 1
    };
  }
  moreNews = () => {
    fetch(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" +
        this.state.pageCount
    )
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          return {
            hits: data.hits,
            pageCount: prevState.pageCount + 1
          };
        });
        localStorage.setItem("hits", JSON.stringify(data.hits));
      });
  };

  componentDidMount() {
    fetch(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" +
        this.state.pageCount,
    )
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          return {
            hits: data.hits,
            pageCount: prevState.pageCount + 1
          };
        });
        localStorage.setItem("hits", JSON.stringify(data.hits));
      });
  }
  upvote = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const increaseUpvote = hits => hits.objectID === event.currentTarget.id;
    const index = hits.findIndex(increaseUpvote);
    hits[index]["points"] = hits[index]["points"] + 1;
    localStorage.setItem("hits", JSON.stringify(hits));
    this.setState({ hits });
  };
  hideNews = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const shouldBeHidden = hits => hits.objectID === event.target.id;
    const index = hits.findIndex(shouldBeHidden);
    hits.splice(index, 1);
    localStorage.setItem("hits", JSON.stringify(hits));
    this.setState({ hits });
  };
  stalenessOfNews = news => {
    let date = new Date();
    let createdAt = new Date(news.created_at);
    let timeDiff = date.getTime() - createdAt.getTime();
    let seconds,
      minutes,
      hours,
      days = 0;
    seconds = Math.ceil(timeDiff / 1000);
    if (seconds > 60) minutes = Math.ceil(seconds / 60);
    if (minutes > 60) hours = Math.ceil(minutes / 60);
    if (hours > 24) days = Math.ceil(hours / 24);
    return (
      (days && days + " days ago ") ||
      (hours && hours + " hours ago ") ||
      (minutes && minutes + " minutes ago ") ||
      (seconds && seconds + " seconds ago ")
    );
  };
  render() {
    return (
      <div className="container">
        {this.state.hits.length === 0 ? (
          <p>Loading...</p>
        ) : (
          this.state.hits.map(news => (
            <div className="row" key={news.objectID}>
              <span className="comments">
                <strong>{news.num_comments}</strong>
              </span>
              <span className="upvotes">
                <strong>{news.points + " "}</strong>
                <button
                  type="button"
                  className="link-button"
                  onClick={this.upvote}
                  id={news.objectID}
                >
                  <FontAwesomeIcon id={news.objectID} icon={faCaretUp} />
                </button>
              </span>
              <div className="description">
                <a href={news.url} aria-label="Title of the news">
                  <strong>{news.title + " "}</strong>
                </a>
                <a href={news.url} aria-label="Link to the news">
                  <strong style={{ opacity: 0.5 }}>
                    ({news.url && news.url.split("/")[2]})
                  </strong>
                </a>
                <small style={{ opacity: 0.4 }}>{" by "}</small>
                <a href={news.url} aria-label="Author of this news">
                  <strong>{news.author}</strong>
                </a>{" "}
                <b style={{ opacity: 0.4 }}>{this.stalenessOfNews(news)}</b>
                <button
                  type="button"
                  className="link-button"
                  id={news.objectID}
                  onClick={this.hideNews}
                >
                  <small style={{ opacity: 0.4 }}>{"[ "}</small>
                  <strong id={news.objectID}>{" hide "}</strong>
                  <small style={{ opacity: 0.4 }}>{" ]"}</small>
                </button>
              </div>
            </div>
          ))
        )}
        <footer>
          <button type="button" className="link-button" onClick={this.moreNews}>
            {" More "}
          </button>
        </footer>
      </div>
    );
  }
}

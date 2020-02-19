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
      "https://hn.algolia.com/api/v1/search?tags=story&page=" +
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
      "https://hn.algolia.com/api/v1/search?tags=story&page=" +
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
  }
  upvote = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const increaseUpvote = hits => hits.objectID == event.currentTarget.id;
    const index = hits.findIndex(increaseUpvote);
    hits[index]["points"] = hits[index]["points"] + 1;
    localStorage.setItem("hits", JSON.stringify(hits));
    this.setState({ hits });
  };
  hideNews = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const shouldBeHidden = hits => hits.objectID == event.target.id;
    const index = hits.findIndex(shouldBeHidden);
    hits.splice(index, 1);
    localStorage.setItem("hits", JSON.stringify(hits));
    this.setState({ hits });
  };
  stalenessOfNews = news => {
    let date = new Date();
    let createdAt = new Date(news.created_at);
    let timeDiff = date.getTime() - createdAt.getTime();
    console.log();
    return Math.floor(timeDiff / 1000 / 3600 / 24) + " days ago ";
  };
  render() {
    return (
      <div className="container">
        {this.state.hits.map(news => (
          <div className="row" key={news.objectID}>
            <span className="comments">
              <strong>{news.num_comments}</strong>
            </span>
            <span className="upvotes">
              <strong>{news.points + " "}</strong>
              <a
                href="#"
                aria-label="Upvote this news"
                onClick={this.upvote}
                id={news.objectID}
              >
                <FontAwesomeIcon id={news.objectID} icon={faCaretUp} />
              </a>
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
              <a href="#" aria-label="Author of this news">
                <strong>{news.author}</strong>
              </a>{" "}
              <b style={{ opacity: 0.4 }}>{this.stalenessOfNews(news)}</b>
              <a
                href="#"
                aria-label="Hide this news"
                id={news.objectID}
                onClick={this.hideNews}
              >
                <small style={{ opacity: 0.4 }}>{"[ "}</small>
                <strong id={news.objectID}>{" hide "}</strong>
                <small style={{ opacity: 0.4 }}>{" ]"}</small>
              </a>
            </div>
          </div>
        ))}
        <footer>
          <a href="#" aria-label="Get more news" onClick={this.moreNews}>
            {" More "}
          </a>
        </footer>
      </div>
    );
  }
}

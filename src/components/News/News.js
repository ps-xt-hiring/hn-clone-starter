import React from "react";
import ReactDOM from "react-dom";
import "./News.css";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import {labelConstants} from "../../static/constants";
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
  render() {
    return (
      <div className="container">
        {this.state.hits.length === 0 ? (
          <Loading />
        ) : (
          this.state.hits.map(news => (
            <NewsItem
              key={news.objectID}
              news={news}
              hideNews={this.hideNews}
              upvote={this.upvote}
            />
          ))
        )}
        {this.state.hits.length > 0 ? (
          <Footer>
            <Button onClick={this.moreNews}>{labelConstants.MORE}</Button>
          </Footer>
        ) : null}
      </div>
    );
  }
}

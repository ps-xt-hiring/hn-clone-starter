import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./News.scss";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import { labelConstants } from "../../static/constants";
import { sendRequest } from "../../utility/serviceUtility";

function News() {
  const [state, setState] = useState({ hits: [], pageCount: 1 });
  useEffect(() => {
    sendRequest(state).then(data => {
      setState({ hits: data.hits, pageCount: state.pageCount + 1 });
      localStorage.setItem("hits", JSON.stringify(data.hits));
    });
  }, state.pageCount);
  const upvote = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const increaseUpvote = hits => hits.objectID === event.currentTarget.id;
    const index = hits.findIndex(increaseUpvote);
    hits[index]["points"] = hits[index]["points"] + 1;
    localStorage.setItem("hits", JSON.stringify(hits));
    setState({ ...state, hits: hits });
  };
  const hideNews = event => {
    let hits = JSON.parse(localStorage.getItem("hits"));
    const shouldBeHidden = hits => hits.objectID === event.target.id;
    const index = hits.findIndex(shouldBeHidden);
    hits.splice(index, 1);
    localStorage.setItem("hits", JSON.stringify(hits));
    setState({ ...state, hits: hits });
  };
  const moreNews = () => {
    sendRequest(state).then(data => {
      setState({ hits: data.hits, pageCount: state.pageCount + 1 });
      localStorage.setItem("hits", JSON.stringify(data.hits));
    });
  };

  return (
    <div className="container">
      {state.hits.length === 0 ? (
        <Loading />
      ) : (
        state.hits.map(news => (
          <NewsItem
            key={news.objectID}
            news={news}
            hideNews={hideNews}
            upvote={upvote}
          />
        ))
      )}
      {state.hits.length > 0 ? (
        <Footer>
          <Button onClick={moreNews}>{labelConstants.MORE}</Button>
        </Footer>
      ) : null}
    </div>
  );
}
export default News;

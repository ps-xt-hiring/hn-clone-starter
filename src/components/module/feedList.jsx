import React, { useState } from "react";
import getDomain from "../../utils/manipulate";
import PropTypes from "prop-types";

const propsTypes = {
  num_comments: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string
};

const defaultProps = {
  num_comments: "",
  title: "",
  url: "",
  author: ""
};
const FeedList = props => {
  const { num_comments, title, url, author } = props.feed;

  const [Count, setCount] = useState(0);
  const [hide, setHide] = useState(true);

  return (
    <article className={`${hide ? "feed" : "feed--hide"}`}>
      <span className="feed__comment">{num_comments}</span>
      <div className="feed__upvote">
        <span>{Count}</span>
        <button
          aria-label="UpVootCount"
          onClick={() => setCount(Count + 1)}
          onKeyDown={() => setCount(Count + 1)}
          className="feed__upvote-arrow"
        ></button>
      </div>
      <div className="feed__content">
        <span className="feed__title">{title}</span>
        <a rel="noopener noreferrer" target="_blank" href={url} title={url}>
          {`(${url ? getDomain(url) : ""})`}
        </a>
        <span>by</span>
        <span className="feed__author">{author}</span>
        <span>3 hours ago</span>
        <button
          type="button"
          aria-label="HideFeed"
          onClick={() => setHide()}
          onKeyDown={() => setHide()}
          className="feed__btn feed__btn--grey"
        >
          [Hide]
        </button>
      </div>
    </article>
  );
};
FeedList.propTypes = propsTypes;
FeedList.defaultProps = defaultProps;

export default FeedList;

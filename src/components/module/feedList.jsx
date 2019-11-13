import React, { useState } from "react";
import getDomain from "../../utils/manipulate";
import PropTypes from "prop-types";

const propsTypes = {
  feed: PropTypes.objectOf(PropTypes.object),
};

const defaultProps = {
  feed: {},
};
const FeedList = props => {
  const { feed } = props;

  const [Count, setCount] = useState(0);
  const [hide, setHide] = useState(true);

  return (
    <article className={`${hide ? "feed" : "feed--hide"}`}>
      <span className="feed__comment">{feed.num_comments}</span>
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
        <span className="feed__title">{feed.title}</span>
        <a rel="noopener noreferrer" target="_blank" href={feed.url} title={feed.url}>
          {`(${feed.url ? getDomain(feed.url) : ""})`}
        </a>
        <span>by</span>
        <span className="feed__author">{feed.author}</span>
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

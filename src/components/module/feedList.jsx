import React, { useState } from "react";
import getDomain from "../../utils/manipulate";
import PropTypes from "prop-types";
import FeedButton from "./feedButton";
import feedConstants from "../../constants/constants"

const propsTypes = {
  feed: PropTypes.objectOf(PropTypes.object),
};

const defaultProps = {
  feed: {},
};
const ListItem = props => {
  const { feed } = props;

  const [Count, setCount] = useState(0);
  const [hide, setHide] = useState(true);

  return (
    <article className={`${hide ? "feed" : "feed-hide"}`}>
      <span className="feed__comment">{feed.num_comments}</span>
      <div className="feed__upvote">
        <span>{Count}</span>
        <FeedButton
          event={() => setCount(Count + 1)}
          className="feed__upvote-arrow"
        />
      </div>
      <div className="feed__content">
        <span className="feed__title">{feed.title}</span>
        <a rel="noopener noreferrer" target="_blank" href={feed.url} title={feed.url}>
          {`(${feed.url ? getDomain(feed.url) : ""})`}
        </a>
        <span>{feedConstants.by}</span>
        <span className="feed__author">{feed.author}</span>
        <span>{feedConstants.timeDuration}</span>
        <FeedButton
          event={() => setHide()}
          className="feed__btn feed__btn--grey"
          btntext={feedConstants.hide} />



      </div>
    </article>
  );
};
ListItem.propTypes = propsTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

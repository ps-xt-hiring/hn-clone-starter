import React, { useState } from "react";
import getDomain from "../../utils/manipulate";
import PropTypes from "prop-types";
import Button from "./button";
import Constants from "../../constants/constants"

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
        <Button
          event={() => setCount(Count + 1)}
          className="feed__upvote-arrow"
        />
      </div>
      <div className="feed__content">
        <span className="feed__title">{feed.title}</span>
        <a rel="noopener noreferrer" target="_blank" href={feed.url} title={feed.url}>
          {`(${feed.url ? getDomain(feed.url) : ""})`}
        </a>
        <span>{Constants.by}</span>
        <span className="feed__author">{feed.author}</span>
        <span>{Constants.timeDuration}</span>
        <Button
          event={() => setHide()}
          className="feed__btn feed__btn--grey"
        >{Constants.hide}</Button>
      </div>
    </article>
  );
};
ListItem.propTypes = propsTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

import React from "react";
import PropTypes from "prop-types";

const propsTypes = {
  pageNum: PropTypes.number,
  loadMore: PropTypes.func
};
const FeedFooter = props => {
  const { loadMore, pageNum } = props;
  return (
    <footer className="footer">
      <nav id="footer-nav" aria-label="Footer">
        <button
          type="button"
          className="feed__btn"
          aria-label="MoreFeedLoad"
          onClick={() => loadMore(pageNum)}
        >
          More
        </button>
      </nav>
    </footer>
  );
};
FeedFooter.propTypes = propsTypes;

export default FeedFooter;

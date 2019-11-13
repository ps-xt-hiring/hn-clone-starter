import React from "react";
import PropTypes from "prop-types";

const propsTypes = {
  pageNum: PropTypes.number,
};
const defaultProps = {
  pageNum: 1,
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
FeedFooter.defaultProps = defaultProps;
FeedFooter.propTypes = propsTypes;

export default FeedFooter;

import React from "react";
import PropTypes from "prop-types";
import noop from 'loadsh/noop';

const propsTypes = {
  pageNum: PropTypes.number,
  loadMore: PropTypes.func
};
const defaultProps = {
  pageNum: 1,
  loadMore: noop,
};
const FeedFooter = props => {
  const { loadMore, pageNum } = props;
  return (
    <footer className="footer">
      <button
        type="button"
        className="feed__btn"
        aria-label="MoreFeedLoad"
        onClick={() => loadMore(pageNum)}
      >
        More
        </button>
    </footer>
  );
};
FeedFooter.defaultProps = defaultProps;
FeedFooter.propTypes = propsTypes;

export default FeedFooter;

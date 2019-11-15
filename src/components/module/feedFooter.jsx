import React from "react";
import PropTypes from "prop-types";
import noop from 'loadsh/noop';
import FeedButton from './feedButton';

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
      <FeedButton
        event={() => loadMore(pageNum)}
        className="feed__btn"
        btntext="More"
      />
    </footer>
  );
};
FeedFooter.defaultProps = defaultProps;
FeedFooter.propTypes = propsTypes;

export default FeedFooter;

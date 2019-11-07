import React from 'react';
import PropTypes from 'prop-types';
import noop from 'loadsh/noop';

const propsTypes = {
  pageNum: PropTypes.number,
  loadMore: PropTypes.func,
};

const defaultProps = {
  pageNum: 1,
  loadMore: noop,
};

const FeedFooter = props => (
  <footer className="feed-footer">
    <button type="button" className="feed-footer__more-btn" onClick={() => props.loadMore(props.pageNum)}>more</button>
  </footer>
);

FeedFooter.propTypes = propsTypes;
FeedFooter.defaultProps = defaultProps;

export default FeedFooter;

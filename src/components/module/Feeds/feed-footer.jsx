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
  <div className="feed-footer">
    <button type="button" className="feed-more-btn" onClick={() => props.loadMore(props.pageNum)}>more</button>
  </div>
);

FeedFooter.propTypes = propsTypes;
FeedFooter.defaultProps = defaultProps;

export default FeedFooter;
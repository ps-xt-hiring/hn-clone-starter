import React from 'react';
import PropTypes from 'prop-types';
import noop from 'loadsh/noop';
import FeedHeader from './feedHeader';
import ListItem from './feedList';
import FeedFooter from './feedFooter';

const propsTypes = {
  feeds: PropTypes.instanceOf(Array),
  loadMore: PropTypes.func,
  pageNum: PropTypes.number,
};

const defaultProps = {
  feeds: [],
  pageNum: 1,
  loadMore: noop
};

const FeedContainer = (props) => {

  const { feeds, pageNum, loadMore } = props;
  return (
    <main id="main">
      <FeedHeader />
      <div className="feedList">{feeds.map(feed => <ListItem feed={feed} key={feed.objectID} />)}</div>
      <FeedFooter loadMore={loadMore} pageNum={pageNum} />
    </main>
  );
}

FeedContainer.propTypes = propsTypes;
FeedContainer.defaultProps = defaultProps;

export default FeedContainer;

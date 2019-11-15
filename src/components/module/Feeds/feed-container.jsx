import React from 'react';
import PropTypes from 'prop-types';
import noop from 'loadsh/noop';
import map from 'loadsh/map';

import FeedHeader from './feed-header';
import FeedFooter from './feed-footer';
import Feeds from './feed';

const propsTypes = {
  feeds: PropTypes.instanceOf(Array),
  loadMore: PropTypes.func,
  pageNum: PropTypes.number,
};

const defaultProps = {
  feeds: [],
  loadMore: noop,
  pageNum: 1,
};

const FeedContainer = (props) => {
  const { feeds, loadMore, pageNum } = props;
  return (
    <div>
      <FeedHeader />
      {
       map(feeds, feed => (
         <Feeds feed={feed} key={feed.objectID} />
       ))
    }
      <FeedFooter
        loadMore={loadMore}
        pageNum={pageNum}
      />
    </div>
  );
};

FeedContainer.propTypes = propsTypes;
FeedContainer.defaultProps = defaultProps;

export default FeedContainer;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedHeader from './feedHeader';
import FeedList from './feedList';
import FeedFooter from './feedFooter';
import fetchFeed from '../../redux/action/action-fetchData';

const propsTypes = {
  isLoading: PropTypes.bool,
  feeds: PropTypes.instanceOf(Array),
  pageNum: PropTypes.number,
};

const defaultProps = {
  isLoading: false,
  feeds: [],
  pageNum: 1,
};

class FeedContainer extends React.Component {
  componentDidMount() {
    const { onFetchFeeds, pageNum } = this.props;
    onFetchFeeds(pageNum);
  }

  render() {
    const {
      feeds, pageNum, onFetchFeeds, isLoading,
    } = this.props;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
        <main id="main" aria-label="Main">
          <FeedHeader />
          {feeds.map(feed => <FeedList feed={feed} key={feed.objectID} />)}
          <FeedFooter loadMore={onFetchFeeds} pageNum={pageNum} />
        </main>
      );
  }
}
FeedContainer.propTypes = propsTypes;
FeedContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  feeds: state.feedReducer.feeds,
  pageNum: state.feedReducer.pageNum,
  isLoading: state.feedReducer.isLoading,
});
const mapDispatchToProps = dispatch => ({
  onFetchFeeds: (pageNum) => {
    dispatch(fetchFeed(pageNum));
  },
});

const ConnectedLanding = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer);

export default ConnectedLanding;

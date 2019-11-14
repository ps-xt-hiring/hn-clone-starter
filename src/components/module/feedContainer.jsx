import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from 'loadsh/noop';
import FeedHeader from './feedHeader';
import ListItem from './feedList';
import FeedFooter from './feedFooter';
import fetchFeed from '../../redux/action/action-fetchData';
import feedConstants from "../../constants/constants"

const propsTypes = {
  isLoading: PropTypes.bool,
  feeds: PropTypes.instanceOf(Array),
  onFetchFeeds: PropTypes.func,
  pageNum: PropTypes.number,
};

const defaultProps = {
  isLoading: false,
  feeds: [],
  pageNum: 1,
  onFetchFeeds: noop
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
      <h1 className="loader">{feedConstants.loading}</h1>
    ) : (
        <main id="main">
          <FeedHeader />
          <div className="feedList">{feeds.map(feed => <ListItem feed={feed} key={feed.objectID} />)}</div>
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

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer);

export default ConnectedContainer;

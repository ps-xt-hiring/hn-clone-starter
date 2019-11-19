import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'loadsh/noop';
import FeedContainer from './module/feedContainer';
import fetchFeed from '../redux/action/action-fetchData';
import feedConstants from '../constants/constants'

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

class LandingPage extends React.PureComponent {
  componentDidMount() {
    const { pageNum, onFetchFeeds } = this.props;
    onFetchFeeds(pageNum);
  }

  render() {
    const {
      isLoading, feeds, pageNum, onFetchFeeds,
    } = this.props;

    return (

      <div>

        {
          !isLoading

            ? (

              < FeedContainer
                feeds={feeds}
                loadMore={onFetchFeeds}
                pageNum={pageNum}
              />
            )

            : <h1 className="loader">{feedConstants.loading}</h1>
        }
      </div>
    );
  }
}

LandingPage.propTypes = propsTypes;
LandingPage.defaultProps = defaultProps;

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

const ConnectedList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);

export default ConnectedList;

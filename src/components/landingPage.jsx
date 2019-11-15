import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'loadsh/noop';

import FeedContainer from './module/Feeds/feed-container';
import getFeeds from '../actions/feed-actions';

const propsTypes = {
  isLoading: PropTypes.bool,
  feeds: PropTypes.instanceOf(Array),
  onFetchFeeds: PropTypes.func,
  pageNum: PropTypes.number,
};

const defaultProps = {
  isLoading: false,
  feeds: [],
  onFetchFeeds: noop,
  pageNum: 1,
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
              <FeedContainer
                feeds={feeds}
                loadMore={onFetchFeeds}
                pageNum={pageNum}
              />
            )

            : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

LandingPage.propTypes = propsTypes;
LandingPage.defaultProps = defaultProps;

// Map the component props to the aovob reducer state
const mapStateToProps = state => ({
  isLanding: state.appReducer.isLanding,
  feeds: state.appReducer.feeds,
  pageNum: state.appReducer.pageNum,
});

const mapDispatchToProps = dispatch => ({
  onFetchFeeds: (pageNum) => { dispatch(getFeeds(pageNum)); },
});

// Connect the component to gain access to state and dispatch
const ConnectedLanding = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);

export default ConnectedLanding;

/* eslint-disable */
import React, { Component } from 'react';
import FeedsContext from '../context/FeedsContext';

import { fetchFeeds } from '../service/httpApi';
import { localState } from '../util';

/**
 * Provider Class to handle data of Application
 * It uses Context Api to pass data into Application
 *
 * @class FeedsContextProvider
 * @extends {Component}
 */
class FeedsContextProvider extends Component {
  constructor(props) {
    super(props);
    this.ls_hidden_feeds = localState.create('hidded-feeds', {});
    this.ls_upvode_feeds = localState.create('upvoted-feeds', {});
    this.state = { feeds: [] };
    this.initApi = this.initApi.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.upvoteFeed = this.upvoteFeed.bind(this);
  }

  initApi(reset) {
    fetchFeeds(1, reset).then(data => {
      const vissibleFeeds = this.findVisibleFeeds(data.hits || []);
      this.setState({ feeds: vissibleFeeds });
    });
  }

  findVisibleFeeds = feeds => {
    const hiddenFeeds = this.ls_hidden_feeds.fetch();
    const upVotedFeeds = this.ls_upvode_feeds.fetch();

    return feeds.reduce((av, cv) => {
      if (hiddenFeeds[cv.objectID] === false) return av;

      if (upVotedFeeds[cv.objectID] !== undefined)
        cv['points'] = upVotedFeeds[cv.objectID];

      av.push(cv);

      return av;
    }, []);
  };

  removeFeed(feedId) {
    this.storeHiddenFeeds(feedId);

    const currentFeeds = [...this.state.feeds];
    const updatedFeed = currentFeeds.filter(feed => feed.objectID !== feedId);
    this.setState({ feeds: updatedFeed });
  }

  storeHiddenFeeds = feedId => {
    const parsedVal = this.ls_hidden_feeds.fetch();
    parsedVal[feedId] = false;
    this.ls_hidden_feeds.update(parsedVal);
  };

  upvoteFeed(feedId, index, vote) {
    this.storeUpVote(feedId, vote);

    const currentFeeds = [...this.state.feeds];
    currentFeeds[index]['points'] = currentFeeds[index]['points'] + 1;
    this.setState({ feeds: currentFeeds });
  }

  storeUpVote = (feedId, vote) => {
    const parsedVal = this.ls_upvode_feeds.fetch();
    parsedVal[feedId] = vote + 1;
    this.ls_upvode_feeds.update(parsedVal);
  };

  render() {
    return (
      <FeedsContext.Provider
        value={{
          feeds: this.state.feeds,
          fetchNewFeeds: this.initApi,
          hideFeedById: this.removeFeed,
          upvoteFeedById: this.upvoteFeed
        }}
      >
        {this.props.children}
      </FeedsContext.Provider>
    );
  }

  componentDidMount() {
    this.initApi(true);
  }
}

export default FeedsContextProvider;

import React from "react";

/**
 * React Context Implementaion
 *
 * @class FeedsContextProvider
 * @extends {Component}
 */
const FeedContext = React.createContext({
  feeds: [],
  fetchNewFeeds: () => {},
  hideFeedById: () => {},
  upvoteFeedById: () => {}
});

export default FeedContext;

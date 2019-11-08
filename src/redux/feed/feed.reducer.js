import FeedActionTypes from './feed.types';

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  feedItems: [],
  error: null
};

const feed = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FeedActionTypes.RECEIVE_FEED_START:
      return {
        ...state,
        fetching: true
      };
    case FeedActionTypes.RECEIVE_FEED_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case FeedActionTypes.RECEIVE_FEEDS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        feedItems: action.payload
      };

    default:
      return state;
  }
};

export default feed;

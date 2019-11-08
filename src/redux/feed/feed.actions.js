import FeedActionTypes from './feed.types';

export const fetchFeedStart = () => {
  return {
    type: FeedActionTypes.RECEIVE_FEED_START
  };
};

export const fetchFeedSuccess = feed => {
  return {
    type: FeedActionTypes.RECEIVE_FEEDS,
    payload: feed
  };
};

export const fetchFeedError = error => {
  return {
    type: FeedActionTypes.RECEIVE_FEED_ERROR,
    error
  };
};

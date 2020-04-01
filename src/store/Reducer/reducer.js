/* eslint-disable */
import * as actionTypes from '../ActionType/actionTypes';

const intitalState = {
  loading: false,
  page: 0,
  totalPages: 0,
  apiRequestType: 'top',
  data: [],
};

const saveFeedDetailsInLocalStorage = (feed) => {
  const feedDetails = localStorage.getItem('feedDetails')
    ? JSON.parse(localStorage.getItem('feedDetails')) : [];
  let feedFound = false;
  if (feedDetails.length) {
    feedDetails.filter((feedDetail) => {
      if (feedDetail.id === feed.objectID) {
        feedDetail.points = feed.points;
        feedFound = true;
        return feedDetail;
      }
    });
  }
  if (!feedDetails.length || !feedFound) {
    feedDetails.push({
      'id': feed.objectID,
      'points': feed.points,
    });
  }
  localStorage.setItem('feedDetails', JSON.stringify(feedDetails));
};

const updatePoints = (feedData, feedId) => {
  feedData.map((feed) => {
    if (feed.objectID === feedId) {
      feed.points = feed.points ? parseInt(feed.points, 10) + 1 : 1;
      saveFeedDetailsInLocalStorage(feed);
    }
    return feed;
  });
  return feedData;
};

const hideFeed = (feedData, feedId) => {
  const hiddenFeeds = localStorage.getItem('hiddenFeeds')
    ? JSON.parse(localStorage.getItem('hiddenFeeds')) : [];
  hiddenFeeds.push(feedId);
  localStorage.setItem('hiddenFeeds', JSON.stringify(hiddenFeeds));
  return feedData.filter(feed => feed.objectID !== feedId);
}

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.START_LOAD:
      return {
        ...state,
        loading: true,
        apiRequestType: action.data,
      };
    case actionTypes.LOAD_SUCCESS:
      return {
        ...state,
        data: [...action.data.res.data.hits],
        page: action.data.page,
        totalPages: action.data.res.data.nbPages,
        loading: false,
      };
    case actionTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UP_VOTE_FEED:
      return {
        ...state,
        data: [...updatePoints(state.data, action.data)],
      };
    case actionTypes.HIDE_FEED:
      return {
        ...state,
        data: [...hideFeed(state.data, action.data)],
      };
    default:
      return state;
  }
};

export default reducer;

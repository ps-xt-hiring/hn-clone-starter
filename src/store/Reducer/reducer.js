/* eslint-disable */
import * as actionTypes from '../ActionType/actionTypes';

const intitalState = {
  loading: false,
  page: 0,
  totalPages: 0,
  apiRequestType: 'top',
  data: [],
};

const updatePoints = (feedData, feedId) => {
  feedData.map((feed) => {
    if (feed.objectID === feedId) {
      const feedObj = { ...feed };
      feedObj.points = feedObj.points ? parseInt(feedObj.points, 10) + 1 : 1;
      return feedObj;
    }
    return feed;
  });
  return feedData;
};

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
        data: [...state.data.filter(feed => feed.objectID !== action.data)],
      };
    default:
      return state;
  }
};

export default reducer;

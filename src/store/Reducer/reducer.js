import * as actionTypes from '../ActionType/actionTypes';

const intitalState = {
  loading: false,
  page: 0,
  totalPages: 0,
  apiRequestType: 'top',
  data: [],
};

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.START_LOAD:
      return {
        ...state,
        loading: true,
        apiRequestType: action.data,
      }
    case actionTypes.LOAD_SUCCESS:
      console.log(action.data.res, state.data);
      return {
        ...state,
        data: [...action.data.res.data.hits],
        page: action.data.page,
        totalPages: action.data.res.data.nbPages,
        loading: false,
      }
    case actionTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.UP_VOTE_FEED:
      return {
        ...state,
        data: [...updatePoints(state.data, action.data)]
      }
    case actionTypes.HIDE_FEED:
      return {
        ...state,
        data: [...state.data.filter(feed => feed.objectID !== action.data)]
      }
    default:
      return state;
  }
};

const updatePoints = (feedData, feedId) => {
  console.log(feedData);
  console.log(feedId);
  feedData.map(feed => {
    if (feed.objectID === feedId) {
      feed.points = feed.points ? parseInt(feed.points) + 1 : 1;
    }
    return feed;
  });
  return feedData;
};

export default reducer;

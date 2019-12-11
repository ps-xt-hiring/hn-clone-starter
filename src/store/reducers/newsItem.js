import * as actionTypes from "../actions/actionTypes";

const initialState = {
  newsItems: null,
  pageNumber: 0
};

const updateNewsPoints = (updatedState, itemId) =>
  updatedState.newsItems.map(({ objectID, points, ...newsItems }) => {
  let newsPoints = points;
  if (objectID === itemId) {
    newsPoints += 1;
  }
  return {
    ...newsItems,
    objectID,
    points: newsPoints
  };
  });

const hideListItem = (updatedState, itemId) =>
  updatedState.newsItems.filter(newsItem => {
    return newsItem.objectID !== itemId;
  });

const reducer = (state = initialState, action) => {
  const id = action.itemId;
  const updatedState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.INIT_NEWSITEM:
      return {
        ...state,
        newsItems: action.newsItems.hits,
        pageNumber: action.pageNumber + 1
      };
    case actionTypes.UPVOTE_NEWSITEM:
      return {
        ...state,
        newsItems: updateNewsPoints(state, id)
      };
    case actionTypes.HIDE_NEWS_ITEM:
      return {
        ...state,
        newsItems: hideListItem(updatedState, id)
      };
    default:
      return state;
  }
};

export default reducer;
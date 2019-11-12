import * as actionTypes from "../actions/actionTypes";

const initialState = {
  newsItems: null,
  pageNumber: 0
};

const updateNewsPoints = (updatedState, itemId) =>
  updatedState.newsItems.map(newsItem => {
    if (newsItem.objectID === itemId) {
      newsItem.points += 1;
    }
    return newsItem;
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
      const newState = updateNewsPoints(updatedState, id);
      return {
        ...state,
        newsItems: newState
      };
    case actionTypes.HIDE_NEWS_ITEM:
      const listItems = hideListItem(updatedState, id);
      return {
        ...state,
        newsItems: listItems
      };
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from "../actions/actionTypes";
import { HEADER_NEW } from "../constants";

const initialState = {
  feeds:[],
  page:0,
  sortType:HEADER_NEW,
  hasMore: true
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
const setFeeds = (state, payload) => {
    let feeds = []
    if (state.feeds.length > 0) {
        feeds = state.feeds.concat(...payload);
    } else {
        feeds = payload;
    }
    console.log("[state]",state)
    return feeds

}
const reducer = (state = initialState, action) => {
  const id = action.itemId;
  const updatedState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.INIT_FEEDS:
      return {
        ...state,
        feeds: setFeeds(state,action.payload)
        
      };
      case actionTypes.UPDATE_PAGE:
          console.log("inside page",action.payload)
      return {
        ...state,
        page: action.payload
        
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
import * as constants from '../commonConstants';

const hideInfoNews = (objectID, dispatch) => {
  dispatch({ type: constants.HIDE_NEWS, objectID });
};

const handleMore = (activePageIndex, dispatch) => {
  dispatch({ type: constants.FETCH_NEWS_API, page: activePageIndex + 1 });
};

const handleUpVote = (objectID, dispatch) => {
  dispatch({ type: constants.RECORD_UPVOTE, objectID });
};

const handleGotoFirst = (dispatch) => {
  dispatch({ type: constants.FETCH_NEWS_API, page: 0 });
};

export {
  hideInfoNews,
  handleMore,
  handleUpVote,
  handleGotoFirst
}
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setNewsItem = (newsItems, pageNumber) => {
  return {
    type: actionTypes.INIT_NEWSITEM,
    newsItems,
    pageNumber
  };
};

export const initNewsItems = pageId => {
  return dispatch => {
    axios
      .get(
        "https://hn.algolia.com/api/v1/search?tags=front_page&page=" + pageId
      )
      .then(res => {
        dispatch(setNewsItem(res.data, pageId));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const upVoteClick = itemId => {
  return {
    type: actionTypes.UPVOTE_NEWSITEM,
    itemId
  };
};

export const hideListClick = itemId => {
  return {
    type: actionTypes.HIDE_NEWS_ITEM,
    itemId
  };
};

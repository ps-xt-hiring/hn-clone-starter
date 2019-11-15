import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setNewsItem = (newsItems, pageNumber) => ({
  type: actionTypes.INIT_NEWSITEM,
  newsItems,
  pageNumber,
});

export const initNewsItems = pageId => (dispatch) => {
  axios
    .get(
      `https://hn.algolia.com/api/v1/search?tags=front_page&page=${pageId}`,
    )
    .then((res) => {
      dispatch(setNewsItem(res.data, pageId));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};

export const upVoteClick = itemId => ({
  type: actionTypes.UPVOTE_NEWSITEM,
  itemId,
});

export const hideListClick = itemId => ({
  type: actionTypes.HIDE_NEWS_ITEM,
  itemId,
});

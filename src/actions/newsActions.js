/* eslint-disable import/no-webpack-loader-syntax,   import/first */
import * as actionTypes from '../constants/actionTypes';
import * as URL from '../constants/constantValue';

export function newsFetchSuccess(news, pageNumber) {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    payload: { news: news.hits, pageNumber: pageNumber + 1 }
  };
}

export function newsRequest() {
  return {
    type: actionTypes.FETCH_NEWS_REQUEST,
    payload: { loading: true }
  };
}

export function newsFetchRequest(pageNumber = 1) {
  return function (dispatch) {
    dispatch(newsRequest());
    fetch(URL.api_url + pageNumber).then(function (response) {
      response.json().then(body => {
        dispatch(newsFetchSuccess(body, pageNumber));
      })

    });
  }
}

export function hideItemRequest(arrHiddenIds) {
  return { type: actionTypes.HIDE_NEWS, payload: { hiddenIds: arrHiddenIds } };
}

export function upvoteNewsItem(upvotedNewsId, upVoteId) {
  return { type: actionTypes.UPVOTE_NEWS, payload: { upvoteIds: upvotedNewsId, upVoteId } };
}
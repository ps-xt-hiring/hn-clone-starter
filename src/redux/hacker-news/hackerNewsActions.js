import {
  FETCH_HACKER_NEWS_REQUEST,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_FAILURE,
  FETCH_HACKER_NEWS_UPDATE,
  UPVOTE_HACKER_NEWS,
} from './hackerNewsTypes';

export const fetchHackerNewsRequest = () => ({
  type: FETCH_HACKER_NEWS_REQUEST,
});

export const fetchHackerNewsSuccess = hnData => ({
  type: FETCH_HACKER_NEWS_SUCCESS,
  payload: hnData,
});

export const fetchHackerNewsFailure = error => ({
  type: FETCH_HACKER_NEWS_FAILURE,
  payload: error,
});

export const fetchHackerNewsUpdate = updatedHnList => ({
  type: FETCH_HACKER_NEWS_UPDATE,
  payload: updatedHnList,
});

export const upvoteHackerNews = updatedHnList => ({
  type: UPVOTE_HACKER_NEWS,
  payload: updatedHnList,
});

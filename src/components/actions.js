import hackerNewsApi from '../services/HackerNewsAPI';
import {
  FETCH_HACKER_NEWS,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_ERROR,
  UPDATE_HACKER_NEWS_VOTES,
} from './constants';

export const fetchHackerNews = pageNo => ({
  type: FETCH_HACKER_NEWS,
  pageNo,
});

export const fetchHackerNewsSuccess = (newsData, pageNo) => ({
  type: FETCH_HACKER_NEWS_SUCCESS,
  newsData,
  pageNo,
});

export const fetchHackerNewsError = error => ({
  type: FETCH_HACKER_NEWS_ERROR,
  error,
});

export const fetchNewsIds = pageNo => {
  return dispatch => {
    dispatch(fetchHackerNews(pageNo));
    return hackerNewsApi
      .getTopNewsIds(pageNo)
      .then(news => {
        const newsData = news.hits;
        const pageNo = news.page;
        dispatch(fetchHackerNewsSuccess(newsData, pageNo));
        return newsData;
      })
      .catch(err => dispatch(fetchHackerNewsError(err)));
  };
};

export const updateVotesAction = id => ({
  type: UPDATE_HACKER_NEWS_VOTES,
  id,
});

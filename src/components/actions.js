import hackerNewsApi from '../services/HackerNewsAPI';
import {
  FETCH_HACKER_NEWS,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_ERROR,
} from './constants';

export const fetchHackerNews = (pageNo) => ({
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

export const fetchNewsIds = (pageNo) => {
  return dispatch => {
    dispatch(fetchHackerNews(pageNo));
    return hackerNewsApi
      .getTopNewsIds(pageNo)
      .then(news => {
        const newsData = news.hits;
        const pageNo = news.page;
        dispatch(fetchHackerNewsSuccess({ newsData, pageNo }));
       // dispatch(fetchNews({ newsIds, page: 0 }));
        return newsData;
      })
      .catch(err => dispatch(fetchHackerNewsError(err)));
  };
};

import {
  FETCH_HACKER_NEWS,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_ERROR,
} from './constants';
//used selector to concat the news otherwise remove the selector and simply replace news with newsData.newsData
import {newsDataSelector} from './selector'

const initialState = () => ({
  news: [],
  pageNo: 0,
  isFetching: true,
  error: null,
});

const app = (state = initialState(), { type, newsData, error, pageNo }) => {
  switch (type) {
    case FETCH_HACKER_NEWS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_HACKER_NEWS_SUCCESS:
    const currentNews = newsDataSelector(state);
      return {
        ...state,
        news: currentNews.concat(newsData),
        isFetching: false,
        pageNo: pageNo+1,
      };
    case FETCH_HACKER_NEWS_ERROR:
      return {
        ...state,
        error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default app;

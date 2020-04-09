import {
  FETCH_HACKER_NEWS,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_ERROR,
  UPDATE_HACKER_NEWS_VOTES,
} from './constants';
// used selector to concat the news otherwise remove the selector and simply replace news with newsData.newsData
import { newsDataSelector } from './selector';

const initialState = () => ({
  news: [],
  pageNo: 0,
  isFetching: true,
  error: null,
  votes: '',
});

const app = (state = initialState(), { type, newsData, error, pageNo, id }) => {
  const currentNews = newsDataSelector(state);
  switch (type) {
    case FETCH_HACKER_NEWS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_HACKER_NEWS_SUCCESS:
      return {
        ...state,
        news: currentNews.concat(newsData),
        isFetching: false,
        pageNo: pageNo + 1,
      };
    case FETCH_HACKER_NEWS_ERROR:
      return {
        ...state,
        error,
        isFetching: false,
      };
    case UPDATE_HACKER_NEWS_VOTES:
      const newsList = currentNews
        .slice(0)
        .map(item => Object.assign({}, item));
      const updatedNews = newsList[id];
      updatedNews.points += 1;
      return {
        ...state,
        news: newsList,
      };
    default:
      return state;
  }
};

export default app;

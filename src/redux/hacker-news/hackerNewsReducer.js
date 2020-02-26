import {
  FETCH_HACKER_NEWS_REQUEST,
  FETCH_HACKER_NEWS_SUCCESS,
  FETCH_HACKER_NEWS_FAILURE,
  FETCH_HACKER_NEWS_UPDATE,
  UPVOTE_HACKER_NEWS,
} from './hackerNewsTypes';

const initialState = {
  loading: false,
  hnList: [],
  currentPage: 0,
  totalPage: 0,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HACKER_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HACKER_NEWS_SUCCESS: {
      const { hits, page, nbPages } = action.payload;
      return {
        loading: false,
        hnList: hits,
        currentPage: page,
        totalPage: nbPages,
        error: '',
      };
    }
    case FETCH_HACKER_NEWS_FAILURE:
      return {
        loading: false,
        hnList: [],
        error: action.payload,
      };
    case FETCH_HACKER_NEWS_UPDATE:
      return {
        ...state,
        hnList: action.payload,
      };
    case UPVOTE_HACKER_NEWS:
      return {
        ...state,
        hnList: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

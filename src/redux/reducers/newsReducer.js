import {
  FETCH_NEWS,
  HIDE_NEWS,
  UP_VOTES,
  SORT_NEWS
} from '../constants/actionType';

const initialState = {
  newsListingData: [],
  hideNews: false,
  page: 1,
  loading: true,
  sortBy: 2
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        newsListingData: state.newsListingData.concat(action.newsListingData.hits),
        page: action.page,
        loading: action.loading,
      };

    case HIDE_NEWS:
      return { ...state, newsListingData: action.newsListingData };

    case UP_VOTES:
      return { ...state, newsListingData: action.newsListingData };
    case SORT_NEWS:
        return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};

export default newsReducer;

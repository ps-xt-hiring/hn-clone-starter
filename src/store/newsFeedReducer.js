const initialState = {
  newsList: [],
  currentPage: 1,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEWS_FEED_SUCCESS':
      return {
        ...state,
        newsList: [...action.payload],
        currentPage: action.currentPage
      };
    case 'NEWS_FEED_FAILURE':
      return {
        ...state,
        newsList: [],
        currentPage: 1
      };
    default:
      return state;
  }
};
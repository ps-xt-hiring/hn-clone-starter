const initialState = {
  newsList: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEWS_FEED_SUCCESS':
      return {
        ...state,
        newsList: [...action.payload],
      };
    case 'NEWS_FEED_FAILURE':
      return {
        ...state,
        newsList: [],
      };
    default:
      return state;
  }
};
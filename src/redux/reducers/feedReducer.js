import ActionTypes from "../action/action-types";
import InitialState from "../store/initialState";

const feedReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FEED:
      return {
        isLoading: true,
        isLanding: true,
        feeds: []
      };
    case ActionTypes.GET_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLanding: true,
        feeds: [...state.feeds, ...action.value],
        pageNum: action.pageNum + 1
      };

    case ActionTypes.GET_FEED_FAILURE:
      return {
        ...state,
        isPageError: true,
        isLoading: false,
        isLanding: true
      };
    default:
      return state;
  }
};

export default feedReducer;

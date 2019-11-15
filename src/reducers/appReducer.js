import ActionTypes from '../constants/action-types';

import InitialState from '../store/initialState';

export default function appReducer(state = InitialState, action = '') {
  let nextState = state;

  switch (action.type) {
    case ActionTypes.GET_FEED:
      nextState = {
        ...state,
        isLoading: true,
        isLanding: true,
        pageNum: action.value + 1,
        feeds: [],
      };
      break;

    case ActionTypes.GET_FEED_SUCCESS:
      nextState = {
        ...state,
        feeds: [...action.value],
        isLoading: false,
        isLanding: true,
      };
      break;

    case ActionTypes.GET_FEED_FAILURE:
      nextState = {
        ...state,
        isPageError: true,
        isLoading: false,
        isLanding: true,
        error: action.error
      };
      break;

    default:
  }
  return nextState;
}

import * as types from './types';
import initialState from './initialState';
import { filteredNewsItems, updatePoints } from '../../common/utils';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEWS_API_CALL_REQUEST:
      return state.setIn(['fetching'], true)
        .setIn(['error'], false)
        .setIn(['activePage'], action.page);
    case types.GET_NEWS_API_CALL_SUCCESS:
      return state.setIn(['fetching'], false)
        .setIn(['error'], false)
        .setIn(['data'], action.data.hits);
    case types.GET_NEWS_API_CALL_FAILURE:
      return state.setIn(['fetching'], false)
        .setIn(['error'], action.error);

    case types.HIDE_NEWS:
      return state.updateIn(['data'], (data) => {
        const updatedData = filteredNewsItems(data, action.objectID);
        return updatedData;
      });

    case types.UP_VOTE:
      return state.updateIn(['data'], (data) => {
        const updatedPoints = updatePoints(data, action.objectID);
        return updatedPoints;
      });
    default:
      return state;
  }
};

// ACTION CREATORS
export const getNews = page => ({ type: types.GET_NEWS_API_CALL_REQUEST, page });

export const hideNews = objectID => ({ type: types.HIDE_NEWS, objectID });

export const upVote = objectID => ({ type: types.UP_VOTE, objectID });

export default reducer;

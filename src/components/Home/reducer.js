import * as constants from './commonConstants';
import { filteredNewsItems, updatePoints } from '../../common/utils';
import { fromJS } from 'immutable';

const initialState = fromJS({
  fetching: false,
  error: false,
  data: [],
  activePage: 0,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_NEWS_API:
      return state.setIn(['fetching'], true)
        .setIn(['error'], false)
        .setIn(['activePage'], action.page);
    case constants.FETCH_NEWS_API_SUCCESS:
      return state.setIn(['fetching'], false)
        .setIn(['error'], false)
        .setIn(['data'], action.data.hits);
    case constants.FETCH_NEWS_API_FAILURE:
      return state.setIn(['fetching'], false)
        .setIn(['error'], action.error);

    case constants.HIDE_NEWS:
      return state.updateIn(['data'], (data) => {
        const updatedData = filteredNewsItems(data, action.objectID);
        return updatedData;
      });

    case constants.RECORD_UPVOTE:
      return state.updateIn(['data'], (data) => {
        const updatedPoints = updatePoints(data, action.objectID);
        return updatedPoints;
      });
    default:
      return state;
  }
};

export default reducer;

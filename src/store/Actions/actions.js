import * as actionTypes from '../ActionType/actionTypes';
import topHitsApiCall from '../../helper/topHitsApi';
import newHitsApiCall from '../../helper/newHitsApi';

export const getHitsData = (apiType, pageNumber) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOAD,
    data: apiType,
  });
  const apiCall = apiType === 'new' ? newHitsApiCall : topHitsApiCall;
  const request = apiCall(pageNumber);
  request.then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.LOAD_SUCCESS,
      data: {res: response, page: pageNumber}
    });
  }).catch(error => {
    dispatch({
      type: actionTypes.LOAD_FAILURE
    });
  });
};

export const upVote = (feedId) => (dispatch) => {
  dispatch({
    type: actionTypes.UP_VOTE_FEED,
    data: feedId
  })
};

export const hideFeed = (feedId) => (dispatch) => {
  dispatch({
    type: actionTypes.HIDE_FEED,
    data: feedId
  })
};

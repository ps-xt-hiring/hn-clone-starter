import ActionTypes from '../constants/action-types';
import request from '../services/axiosHelper';

const getFeeds = pageNum => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_FEED,
    value: pageNum,
  });

  const requestObject = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `https://hn.algolia.com/api/v1/search?page=${pageNum}`,
  };

  return request(requestObject).then((response) => {
    dispatch({
      type: ActionTypes.GET_FEED_SUCCESS,
      value: response.data.hits,
    });
    return response;
  })
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_FEED_FAILURE,
        value: error,
      });
    });
};

export default getFeeds;

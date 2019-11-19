import ActionTypes from "./action-types";
import axios from "axios";

const fetchFeed = pageNum => dispatch => {
  dispatch({
    type: ActionTypes.GET_FEED,
    value: pageNum
  });
  const url = `https://hn.algolia.com/api/v1/search?page=${pageNum}`;
  return axios
    .get(url)
    .then(response => {
      dispatch({
        type: ActionTypes.GET_FEED_SUCCESS,
        value: response.data.hits,
        pageNum
      });
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_FEED_FAILURE,
        value: error
      });
    });
};

export default fetchFeed;

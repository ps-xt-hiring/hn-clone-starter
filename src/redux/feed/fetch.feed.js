import axios from 'axios';
import {
  fetchFeedStart,
  fetchFeedSuccess,
  fetchFeedError
} from './feed.actions';

function fetchFeed(num) {
  return dispatch => {
    dispatch(fetchFeedStart());
    axios
      .get(`https://hn.algolia.com/api/v1/search?tags=front_page&page=${num}`)
      .then(res => {
        dispatch(fetchFeedSuccess(res.data));
      })
      .catch(error => {
        dispatch(fetchFeedError(error));
      });
  };
}

export default fetchFeed;

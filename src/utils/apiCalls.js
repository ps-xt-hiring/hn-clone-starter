import axios from 'axios';

export default async function fetchFeeds (dispatch, state, page) {
  dispatch({ type: 'FETCH_FEEDS_INIT' });
  try {
    const result = await axios(`http://hn.algolia.com/api/v1/search?tags=story&page=${page}`);
    dispatch({ type: 'FETCH_FEEDS_SUCCESS', payload: result});
  } catch (error) {
    dispatch({ type: 'FETCH_FEEDS_FAILURE' });
  }

  return state;
};
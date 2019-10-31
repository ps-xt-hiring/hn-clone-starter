import axios from 'axios';

export const getNewsFeedAction = currentPage => dispatch => axios
  .get(`http://hn.algolia.com/api/v1/search?page=${currentPage}`)
  .then((response) => {
    if (
      response.status === 200
        && response.data
        && response.data.hits.length
    ) {
      dispatch({
        type: 'NEWS_FEED_SUCCESS',
        payload: response.data.hits,
        currentPage,
      });
    } else {
      dispatch({ type: 'NEWS_FEED_FAILURE', payload: response.data });
    }
  })
  .catch((err) => {
    dispatch({ type: 'USER_TYPE_FAILURE', payload: err });
  });

export const toggleVoteAction = item => ({
  type: 'Toggle_Vote',
  payload: item,
});

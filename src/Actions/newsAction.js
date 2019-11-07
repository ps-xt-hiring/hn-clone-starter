import ajax from '../functions/ajax';

export const getNewsFeedAction = currentPage => dispatch => ajax
  .get(`/search?page=${currentPage}`)
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
      dispatch({
        type: 'NEWS_FEED_FAILURE',
        payload: response.data,
        currentPage: 1,
      });
    }
  })
  .catch((err) => {
    dispatch({ type: 'NEWS_FEED_FAILURE', payload: err, currentPage: 1 });
  });

export const toggleVoteAction = item => ({
  type: 'Toggle_Vote',
  payload: item,
});

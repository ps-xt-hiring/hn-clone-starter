import axios from 'axios';

export const getNewsFeed = () => dispatch => axios
  .get('https://hn.algolia.com/api/v1/search?page=1')
  .then((response) => {
  	if (response.status === 200 && response.data && response.data.hits.length) {
       dispatch({ type: 'NEWS_FEED_SUCCESS', payload: response.data.hits });
     } else {
       dispatch({ type: 'NEWS_FEED_FAILURE', payload: response.data });
     }
  })
  .catch((err) => {
    //dispatch({ type: 'USER_TYPE_FAILURE', payload: err });
  });
import axios from 'axios';
import {
  fetchHackerNewsRequest,
  fetchHackerNewsSuccess,
  fetchHackerNewsFailure,
  fetchHackerNewsUpdate,
  upvoteHackerNews,
} from '../redux';

axios.defaults.baseURL = 'https://hn.algolia.com';

export function getHackerNewsData(pageNo = 1, hitsPerPage = 20) {
  return (dispatch) => {
    dispatch(fetchHackerNewsRequest());
    axios
      .get(`/api/v1/search?page=${pageNo}&hitsPerPage=${hitsPerPage}`)
      .then((res) => {
        if (res.data) {
          const { page, nbPages, hits } = res.data;
          dispatch(fetchHackerNewsSuccess({ page, nbPages, hits }));
        } else {
          dispatch(fetchHackerNewsFailure('Data is not present.'));
        }
      })
      .catch((err) => {
        dispatch(fetchHackerNewsFailure(err.message));
      });
  };
}

export function removeObjFromHNData(objArray, removeObjectID) {
  return (dispatch) => {
    const updatedObjArray = objArray.filter(
      item => item.objectID !== removeObjectID,
    );
    dispatch(fetchHackerNewsUpdate(updatedObjArray));
  };
}

export function upVoteHNews(objArray, removeObjectID) {
  return (dispatch) => {
    const updatedObjArray = objArray.map((item) => {
      if (item.objectID === removeObjectID) {
        const newItem = { ...item };
        newItem.points += 1;
        newItem.isUpVoted = true;
        return { ...newItem };
      }
      return item;
    });
    dispatch(upvoteHackerNews(updatedObjArray));
  };
}

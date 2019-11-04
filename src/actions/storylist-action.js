import { SET_STORY_LIST } from "../utils/constants";

export const fetchStoryList = pageNo => {
  return dispatch => {
    return fetch(`https://hn.algolia.com/api/v1/search?page=${pageNo}`)
      .then(response => response.json())
      .then(response => dispatch(setStoryList(response)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const setStoryList = payload => ({
  type: SET_STORY_LIST,
  payload
});

import {
  FETCH_PRODUCTS,
  HIDE_PRODUCTS,
  UP_VOTES,
} from '../constants/actionType';

export const fetchProducts = pagination => (dispatch) => {
  fetch(`https://hn.algolia.com/api/v1/search?page=${pagination}`)
    .then(response => response.json())
    .then(data =>
      // console.log(data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
        newItems: pagination,
      }));
};

export const hideItems = (objId, items) => (dispatch) => {
  const hideList = items.slice().filter(itema => itema.objectID !== objId);

  return dispatch({
    type: HIDE_PRODUCTS,
    payload: hideList,
  });
};

export const upVoteItems = (objId, items) => (dispatch) => {
  const vote = items.map((itemb) => {
    if (itemb.objectID === objId) {
      itemb.points++;
    }
    return itemb;
  });

  return dispatch({
    type: UP_VOTES,
    payload: vote,
  });
};

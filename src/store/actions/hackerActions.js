import * as types from '../types/actionTypes';
import { makeHttpRequestWithPage } from '../../api/mockApi';


export const loadMore = async () => {
  return {
    type: types.LOAD_START
  }
}

export const loadEnd = async () => {
    return {
      type: types.LOAD_END
    }
}

export const hideMe = (objectID) => (dispatch) => {
   dispatch({
      type: types.HIDE_IT,
      payload: objectID 
   })
}

export const voteMe = (objectID) => (dispatch) => {
    dispatch({
       type: types.VOTED,
       payload: objectID 
    })
 }

export const getData = (pageNum) => (dispatch, getState) => {

  dispatch({
    type: types.LOAD_START
  } );

  const request = makeHttpRequestWithPage(pageNum);
  request.then((response) => {

    console.log(response);
    
      dispatch({
          type: types.LOAD_DATA,
          payload: {res: response, page: pageNum }
      })
  }).catch( err => {

    dispatch({
      type: types.LOAD_END
    })

  })
};


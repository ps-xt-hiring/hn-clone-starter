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


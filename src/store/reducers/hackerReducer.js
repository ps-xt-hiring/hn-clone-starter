import * as types from '../types/actionTypes';
import initialState from './initialState';

export default function hackerReducer(state = initialState, action) {
  switch (action.type) {

    case types.LOAD_DATA:
      console.log(action.payload.res, state.data)
      return {
        ...state,
        data: [ ...state.data, ...action.payload.res.hits  ],
        page : action.payload.page,  loading: false,
      };
    case types.LOAD_START:
      return {
         ...state,
         loading: true,
      }; 
    case types.LOAD_END:
      return {
        ...state,
        loading: false,
     }; 
    default:
      return state;
  }
}

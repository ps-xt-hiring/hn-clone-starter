import * as actionTypes from "../actions/actionTypes";
import { HEADER_NEW, HEADER_TOP } from "../constants";

const initialState = {
  feeds:[],
  page:0,
  sortType:HEADER_TOP,
  hasMore: true
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.INIT_FEEDS:
      return {
        ...state,
        feeds: action.payload
        
      };
      case actionTypes.UPDATE_PAGE:
      return {
        ...state,
        page: action.payload
        
      };
      case actionTypes.SORT_TYPE:
          
      return {
        ...state,
        sortType: action.payload
        
      };
      case actionTypes.HAS_MORE:
      return {
        ...state,
        hasMore: action.payload
        
      };
    
    default:
      return state;
  }
};

export default reducer;
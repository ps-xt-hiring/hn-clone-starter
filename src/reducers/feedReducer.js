import * as actionTypes from "../actions/actionTypes";
import { HEADER_NEW } from "../constants";

const initialState = {
  feeds:[],
  page:0,
  sortType:HEADER_NEW,
  hasMore: true
};

const reducer = (state = initialState, action) => {
  const id = action.itemId;
  const updatedState = Object.assign({}, state);

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
          console.log("sort type",state,action)
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
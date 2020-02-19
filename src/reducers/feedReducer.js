import * as actionTypes from "../actions/actionTypes";
import {  HEADER_TOP } from "../constants";
import { fetchFeedsData } from "../actions/feedsData";

const initialState = {
  feeds:[],
  page:0,
  sortType:HEADER_TOP,
  hasMore: true
};
export const getInitialFeed = (page,order) => {
    return (dispatch,getState) => {
        let sortTag = order === HEADER_TOP?'front_page':'story';
       return fetchFeedsData(page, sortTag)
		.then(res => {
			let result = res.hits;
			result = result.filter(item => item.title);
				dispatch(initialiseFeeds(result,res));
		})
		.catch(err => {
			dispatch(initialiseFeeds([],null));
		});
    }
}
export const changeSortType = (page,order) => {
    let sortTag = order === HEADER_TOP?'front_page':'story';
    
    return (dispatch,getState) => {
        return fetchFeedsData(0,sortTag).then(
            res => dispatch(updateSortType(res,order,getState))
        )
    }
}
export const changeLoadMorePage = (page,order) => {
    let sortTag = order === HEADER_TOP?'front_page':'story';
    let newPage = page + 1;
    return (dispatch,getState) => {
        return fetchFeedsData(newPage,sortTag).then(
            res => dispatch(updatePage(res,page))
        )
    }
}

const updateSortType = (result,sortType,getState) => {
    const {_page} = getState();
    return {
        type: actionTypes.SORT_TYPE,
        payload: {
            feeds:result,
            sortType:sortType,
            hasMore: result.nbPages ===  _page+1?false:true,
            page: 0
        }
    }
}

const updatePage = (result,page)=> {
    return {
        type: actionTypes.UPDATE_PAGE,
        payload: {
            feeds:result,
            page: page + 1,
            hasMore: result.nbPages === page + 1?false:true
        }
    }
}
const initialiseFeeds = (feeds,result,getState) => {
    const page  = initialState.page;
    return {
        type: actionTypes.INIT_FEEDS,
        payload: {
            feeds: feeds.slice(),
            page: 0,
            hasMore: result?result.nbPages === page + 1?false:true:false
        }
    }
}
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.INIT_FEEDS:
      return {
        ...state,
        feeds: action.payload.feeds,
        page: action.payload.page,
        hasMore: action.payload.hasMore
        
      };
      case actionTypes.UPDATE_PAGE:
      return {
        ...state,
        feeds: [...state.feeds,...action.payload.feeds.hits.slice()],
        page: action.payload.page,
        hasMore: action.payload.hasMore
        
      };
      case actionTypes.SORT_TYPE:
        return {
            ...state,
            feeds: action.payload.feeds.hits.slice(),
            sortType: action.payload.sortType,
            hasMore: action.payload.hasMore,
            page: action.payload.page
        }   
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
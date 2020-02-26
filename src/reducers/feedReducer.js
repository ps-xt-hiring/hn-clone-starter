import * as actionTypes from "../actions/actionTypes";
import {  HEADER_TOP } from "../constants";
import { fetchFeedsData } from "../actions/feedsData";

const initialState = {
  feeds:[],
  page:0,
  sortType:HEADER_TOP,
  hasMore: true,
  isLoading: false
};
export const getInitialFeed = (page,order) => {
    return (dispatch,getState) => {
        let sortTag = order === HEADER_TOP?'front_page':'story';
        dispatch(requestInitiated(actionTypes.GET_FEEDS_INITIATED));
        fetchFeedsData(page, sortTag)
		.then(res => {
			let result = res.hits;
			result = result.filter(item => item.title);
				dispatch(initialiseFeeds(result,res));
		})
		.catch(err => {
			dispatch({type:actionTypes.ERROR_OCCURED});
		});
    }
}
export const changeSortType = (page=0,order) => {
    let sortTag = order === HEADER_TOP?'front_page':'story';
    
    return (dispatch,getState) => {
        dispatch(requestInitiated(actionTypes.UPDATE_SORT_TYPE_INITIATED));
        fetchFeedsData(page=0,sortTag).then(
            res => dispatch(updateSortType(res,order,getState))
        )
        .catch(err => {
            console.log(err);
			dispatch({type:actionTypes.ERROR_OCCURED});
		});
    }
}
export const changeLoadMorePage = (page,order) => {
    let sortTag = order === HEADER_TOP?'front_page':'story';
    let newPage = page + 1;
    return (dispatch,getState) => {
        dispatch(requestInitiated(actionTypes.LOAD_MORE_INITIATED));
        fetchFeedsData(newPage,sortTag).then(
            res => dispatch(updatePage(res,page))
        )
        .catch(err => {
            console.log(err);
			dispatch({type:actionTypes.ERROR_OCCURED});
		});
    }
}

const updateSortType = (result,sortType,getState) => {
    const {_page} = getState();
    return {
        type: actionTypes.UPDATE_SORT_TYPE,
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
const requestInitiated = (actionName) => {
    return {
        type: actionName
    }
}
const reducer = (state = initialState, {type,payload}) => {

  switch (type) {
    case actionTypes.INIT_FEEDS:
      return {
        ...state,
        feeds: payload.feeds,
        page: payload.page,
        hasMore: payload.hasMore,
        isLoading: false
        
      };
      case actionTypes.UPDATE_PAGE:
      return {
        ...state,
        feeds: [...state.feeds,...payload.feeds.hits.slice()],
        page: payload.page,
        hasMore: payload.hasMore,
        isLoading: false
        
      };
      case actionTypes.UPDATE_SORT_TYPE:
        return {
            ...state,
            feeds: payload.feeds.hits.slice(),
            sortType: payload.sortType,
            hasMore: payload.hasMore,
            page: payload.page,
            isLoading: false
        }   
      case actionTypes.HAS_MORE:
      return {
        ...state,
        hasMore: payload,
        isLoading: false
        
      };
      case actionTypes.GET_FEEDS_INITIATED:
      case actionTypes.UPDATE_SORT_TYPE_INITIATED:
      return {
        ...state,
        isLoading: true
      };
      case actionTypes.ERROR_OCCURED:
      case actionTypes.LOAD_MORE_INITIATED:
      return {
        ...state,
        isLoading: false
      };
    
    default:
      return state;
  }
};

export default reducer;
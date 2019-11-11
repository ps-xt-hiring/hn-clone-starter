// import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';


console.log("InitialState", initialState);
export default function newsReducer(state = initialState, action) {
    console.log("ACTION_DETAILS", state, action.type);
    switch (action.type) {
        case actionTypes.FETCH_NEWS_SUCCESS:
            console.log("State reducer", action);
            return {
                ...state,
                news: state.news.concat(action.payload.news)
            }
            return state;


        default:
            return state;

    }

}


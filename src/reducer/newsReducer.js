// import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';
import * as initalState from './initialState';


export default function newsReducer(state = initalState, action) {
    console.log("ACTION_DETAILS", action);
    switch (action.type) {

        case actionTypes.FETCH_NEWS_SUCCESS:
            return Object.assign(state, action.payload);
        default:
            return state;

    }

}


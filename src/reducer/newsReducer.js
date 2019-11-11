// import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';


console.log("InitialState", initialState);
export default function newsReducer(state = initialState, action) {
    console.log("ACTION_DETAILS", state, action.type);
    switch (action.type) {

        case actionTypes.FETCH_NEWS_SUCCESS:
            console.log("Reducer type", action.type);
            console.log("reducer state", state);
            console.log("reducer payload", action.payload);

            // Object.assign(state, action.payload);
            // console.log("final state", state);
            // let d = Object.assign(state, action.payload);
            // return [state.news, ...action.payload.news];
            // console.log("DDD", d);
            // return d;
            return { 
                ...state,
               news:   [...state.news, action.payload.news]
            }
        default:
            return state;

    }

}


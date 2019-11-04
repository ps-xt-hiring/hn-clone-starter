import * as actionTypes from "../constants/actionTypes";
import * as URL from '../constants/constantValue';

export function newsFetchSuccess(news){
    return {type: actionTypes.FETCH_NEWS_SUCCESS, payload: {news: news}};
}
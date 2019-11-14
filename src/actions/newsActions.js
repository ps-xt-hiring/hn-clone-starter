import * as actionTypes from "../constants/actionTypes";
import * as URL from '../constants/constantValue';

export function newsFetchSuccess(news, pageNumber) {
    console.log("Received News", news, news.hits);
    return { type: actionTypes.FETCH_NEWS_SUCCESS, payload: { news: news.hits, pageNumber: pageNumber + 1 } };
}
export function newsFetchRequest(pageNumber=1) {
    console.log("PageNUmber_here", pageNumber);
    return function (dispatch) {
        fetch(URL.api_url + pageNumber).then(function (response) {
            console.log("respons recd at call", response);
            response.json().then(body => {
                dispatch(newsFetchSuccess(body, pageNumber));
            })

        });
    }
}

export function hideItemRequest(Arr_hiddenIds){
    return { type: actionTypes.HIDE_NEWS, payload: { hiddenIds: Arr_hiddenIds} };
  
}

export function upvoteNewsItem(upvoted_news_id, upVoteId){
    return { type: actionTypes.UPVOTE_NEWS, payload: { upvoteIds: upvoted_news_id, upVoteId: upVoteId} };
}
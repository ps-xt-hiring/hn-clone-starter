import * as actionTypes from "../constants/actionTypes";
import * as URL from '../constants/constantValue';

export function newsFetchSuccess(news){
    console.log("Received News", news, news.hits);
    return {type: actionTypes.FETCH_NEWS_SUCCESS, payload: {news: news.hits}};
}
export function newsFetchRequest(){
    return function (dispatch){
        console.log("URL", URL.api_url);
        fetch(URL.api_url).then(function(response){
            console.log("respons recd at call",  response);
            response.json().then(body =>{
                return dispatch(newsFetchSuccess(body));
            })

        });
    }

}



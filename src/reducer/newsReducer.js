// import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';
import { stat } from 'fs';


console.log("InitialState", initialState);
export default function newsReducer(state = initialState, action) {
    console.log("ACTION_DETAILS", state, action.type);
    switch (action.type) {
        case actionTypes.FETCH_NEWS_SUCCESS:
            console.log("State reducer", action);
            let hidden_ids = JSON.parse(localStorage.getItem("hiddenIds"));
            let upvotedIds = JSON.parse(localStorage.getItem("upvotedIds"));
            let upDatedNewsList;
            if (hidden_ids) {
                upDatedNewsList = action.payload.news.filter((news) => !hidden_ids.includes(news.objectID));

            } else {
                upDatedNewsList = action.payload.news;
            }
            if (upvotedIds) {
                console.log("Upvoted iDS received", upvotedIds);
                upDatedNewsList = upDatedNewsList.map(newsItem => {
                    console.log("Upvoted ind item", newsItem);
                    if (upvotedIds.includes(newsItem.objectID)) {
                        console.log("Yes included");
                        newsItem.points = newsItem.points + 1;
                    }
                    return newsItem;
                })
            }
            return {
                ...state,
                news: upDatedNewsList,
                pageNumber: action.payload.pageNumber
            }
        case actionTypes.HIDE_NEWS:
            let upDatedNews = state.news.filter((news) => !action.payload.hiddenIds.includes(news.objectID));
            return { ...state, hiddenIds: action.payload.hiddenIds, news: upDatedNews }



        case actionTypes.UPVOTE_NEWS:
            let newsItems = state.news.map(newsItem => {
                if (newsItem.objectID === action.payload.upVoteId) {
                    newsItem.points = newsItem.points + 1;
                }
                return newsItem;
            })
            return { ...state, news: newsItems, upvoteIds: action.payload.upvoteIds, upVoteId: action.payload.upVoteId };
        default:
            return state;

    }

}


/* eslint-disable import/no-webpack-loader-syntax,   import/first*/
import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';

export default function newsReducer(state = initialState, action) {
    let hidden_ids;
    let upvotedIds;
    let upDatedNewsList;
    let upDatedNews;
    let newsItems;
    switch (action.type) {
        case actionTypes.FETCH_NEWS_SUCCESS:
        
             hidden_ids = JSON.parse(localStorage.getItem("hiddenIds"));
             upvotedIds = JSON.parse(localStorage.getItem("upvotedIds"));
           
            if (hidden_ids) {
                upDatedNewsList = action.payload.news.filter((news) => !hidden_ids.includes(news.objectID));

            } else {
                upDatedNewsList = action.payload.news;
            }
            if (upvotedIds) {
              
                upDatedNewsList = upDatedNewsList.map(newsItem => {
                  
                    if (upvotedIds.includes(newsItem.objectID)) {
                      
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
             upDatedNews = state.news.filter((news) => !action.payload.hiddenIds.includes(news.objectID));
            return { ...state, hiddenIds: action.payload.hiddenIds, news: upDatedNews }



        case actionTypes.UPVOTE_NEWS:
             newsItems = state.news.map(newsItem => {
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


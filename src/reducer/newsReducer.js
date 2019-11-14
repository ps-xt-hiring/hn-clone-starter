// import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';
import PropTypes from 'prop-types';




export default function newsReducer(state = initialState, action) {
  
    switch (action.type) {
        case actionTypes.FETCH_NEWS_SUCCESS:
        
            let hidden_ids = JSON.parse(localStorage.getItem("hiddenIds"));
            let upvotedIds = JSON.parse(localStorage.getItem("upvotedIds"));
            let upDatedNewsList;
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


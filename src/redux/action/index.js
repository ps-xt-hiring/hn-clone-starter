import {
  FETCH_NEWS,
  HIDE_NEWS,
  UP_VOTES,
  SORT_NEWS,
} from '../constants/actionType';

export const getNews = page => (dispatch) => {
  fetchNews(page)
    .then(newsListingData => dispatch({
      type: FETCH_NEWS,
      newsListingData,
      page,
      loading: false
    }));

};

async function fetchNews(page) {
  let response = await fetch(`https://hn.algolia.com/api/v1/search?page=${page}`);
  let newsListingData = await response.json();
  let removedHiddenNews = removeHiddenNews(newsListingData.hits);
  newsListingData["hits"] = removedHiddenNews;
  return newsListingData;
}
const getHiddenNewsFromLocalStorage = () => {
  let hiddenNewsArray = localStorage.getItem('hiddenNews') || [];
  if (hiddenNewsArray.length > 0) {
    hiddenNewsArray = hiddenNewsArray.split(',');
  }
  return hiddenNewsArray;
}
const removeHiddenNews = (newsList) => {
  let hiddenNewsArray = getHiddenNewsFromLocalStorage();
  return newsList.filter((news) => hiddenNewsArray.indexOf(news.objectID) < 0);
}
export const hideNews = (newsId, newsList) => (dispatch) => {
  let hiddenNewsArray = getHiddenNewsFromLocalStorage();
  hiddenNewsArray.push(newsId);
  localStorage.setItem('hiddenNews', hiddenNewsArray.toString());
  return dispatch({
    type: HIDE_NEWS,
    newsListingData: removeHiddenNews(newsList),
  });
};

export const increaseVoteCount = (newsId, newsList) => (dispatch) => {
  let newsListCopy = newsList.slice();
  let selectedNewsIndex = newsListCopy.findIndex(news => news.objectID === newsId);
  newsListCopy[selectedNewsIndex].points++
  return dispatch({
    type: UP_VOTES,
    newsListingData: newsListCopy,
  });
};
export const sortNews = (sortBy, newsList) => (dispatch) => {
  if (sortBy === 2) {
    newsList = newsList.sort((news, news1) => news.created_at_i > news1.created_at_i)
  }
  else {
    newsList = newsList.sort((news, news1) => news.points < news1.points)
  }
  return dispatch({
    type: SORT_NEWS,
    newsListingData: newsList,
    sortBy
  });
};

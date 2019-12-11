/* eslint-disable import/no-webpack-loader-syntax,   import/first */
import { formatDistance, subDays } from 'date-fns';

export const rootUrl = (url = '') => {

  const urlPath = url && url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];

  return urlPath;
}
export const daysAgo = (date = '12-01-2019') => formatDistance(subDays(new Date(date), 0), new Date());

export const hideMe = (objectId) => {
  let hide_id = [];
  let ids = JSON.parse(localStorage.getItem("hiddenIds"));

  if (ids === null) {
    hide_id.push(objectId);
  }
  if (ids !== null) {
    ids.push(objectId);
    hide_id = ids;
  }
  localStorage.setItem('hiddenIds', JSON.stringify(hide_id));
  return hide_id;

}

export const handleUpVote = (objectId) => {
  let upvoted_news_id = [];
  let upvoteIds = JSON.parse(localStorage.getItem("upvotedIds"));
  if (upvoteIds === null) {
    upvoted_news_id.push(objectId);
  }
  if (upvoteIds && upvoteIds.includes(objectId)) {
    alert("Already Upvoted. ");

    return;
  }
  if (upvoteIds !== null) {
    upvoteIds.push(objectId);
    upvoted_news_id = upvoteIds;
  }
  localStorage.setItem('upvotedIds', JSON.stringify(upvoted_news_id));
  return upvoted_news_id;

}
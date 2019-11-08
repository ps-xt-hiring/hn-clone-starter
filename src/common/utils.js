// eslint-disable-next-line import/no-unresolved
import { formatDistance, subDays } from 'date-fns';

export const toBaseURL = fullURL => fullURL && fullURL.replace(/(http(s)?:\/\/(www\.)?)|(\/.*){1}/g, '');

export const getFormattedDate = date => formatDistance(subDays(new Date(date), 0), new Date());

export const filteredNewsItems = (data, objectID) => {
  const filteredNewItems = data.filter(newsItem => newsItem.objectID !== objectID);
  return filteredNewItems;
};

export const updatePoints = (data, objectID) => data.map((newsItem) => {
  if (newsItem.objectID === objectID) {
    // eslint-disable-next-line no-param-reassign
    newsItem.points += 1;
  }
  return newsItem;
});

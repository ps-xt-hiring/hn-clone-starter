import fetch from 'isomorphic-unfetch';
import {
  formatDistance, subDays,
} from 'date-fns';

export const getDomainByUrl = url => url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
export const getDateFormate = date => formatDistance(subDays(new Date(date), 0), new Date());
export const getIntVal = val => parseInt(val, 10);
export const getNewsList = async (page) => {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`);
  const data = await res.json();

  return {
    data: data.hits,
    page: parseInt(page, 10),
  };
};

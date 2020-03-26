/* eslint-disable */
const formURL = pageNo =>
  `http://hn.algolia.com/api/v1/search_by_date?page=${pageNo}&numericFilters=num_comments>10,points>10`;

let lastPage = 0;
/**
 * HTTP Api implenation with using Fetch
 *
 * @param {Number} pageNo
 * @param {Boolean} reset
 * @returns Promise<response>
 */
export const fetchFeeds = async (pageNo, reset) => {
  reset && (lastPage = 0);
  lastPage += pageNo;
  const url = formURL(lastPage);
  const res = await fetch(url);
  return res.json();
};

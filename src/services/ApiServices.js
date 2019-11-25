/**
 * @returns A Promise which resolves with API response.
 * @param {Object} Query - the search query to be perfomed
 * @param {string} Query.param - query string
 * @param {string} Query.value - query value
 */
const serachNews = ({ param, value }) => new Promise((resolve, reject) => {
  resolve(
    fetch(
      `https://hn.algolia.com/api/v1/search?${param}=${value}`,
      {
        method: 'GET',
      },
    ),
  );
  reject(new Error('Error fetching search API response.'));
});

export default serachNews;

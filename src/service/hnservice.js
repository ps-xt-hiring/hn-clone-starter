import axios from "axios";

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=50`;

export const getNewStories = async (value, page) => {
  const result = await axios
    .get(getHackerNewsUrl(value, page))
    .then(data => data);
  return result;
};

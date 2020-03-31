import axios from 'axios';

const topHitsApiCall = (pageNumber) => {
  return axios.get(`http://hn.algolia.com/api/v1/search?tags=story&page=${pageNumber}`);
}

export default topHitsApiCall;
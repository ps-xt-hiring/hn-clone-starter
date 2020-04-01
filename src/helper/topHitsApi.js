/* eslint-disable */
import axios from 'axios';

const topHitsApiCall = pageNumber => (
  axios.get(`https://hn.algolia.com/api/v1/search?tags=story&page=${pageNumber}`)
);

export default topHitsApiCall;

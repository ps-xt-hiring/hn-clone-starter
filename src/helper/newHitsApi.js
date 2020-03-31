/* eslint-disable */
import axios from 'axios';

const newHitsApiCall = pageNumber => (
  axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`)
);

export default newHitsApiCall;

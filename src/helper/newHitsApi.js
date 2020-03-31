import axios from 'axios';

const newHitsApiCall = (pageNumber) => {
  return axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);
}

export default newHitsApiCall;
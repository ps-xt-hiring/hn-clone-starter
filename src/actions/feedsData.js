import axios from "axios";
// get all feeds
export function fetchFeedsData(selectedPage,order="") {
  
  return axios
    .get(`/api/v1/search?page=${selectedPage}&&tags=${order}`)
    .then(response => {
      return response.data;
    });
}

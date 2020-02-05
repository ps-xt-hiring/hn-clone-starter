import axios from "axios";
// get all feeds
export function fetchFeedsData(selectedPage, tagsForSelectedCat) {
  let tags = tagsForSelectedCat ? tagsForSelectedCat : "";
  return axios
    .get(`/api/v1/search?page=${selectedPage}&&tags=${tags}`)
    .then(response => {
      return response.data;
    });
}

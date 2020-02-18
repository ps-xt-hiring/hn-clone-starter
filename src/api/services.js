import axios from "axios";
import { setLocalStorage } from "./storage";
axios.defaults.baseURL = "http://hn.algolia.com";

export function getHits(page = 1, hitsPerPage = 30) {
  return axios
    .get(`/api/v1/search?page=${page}&hitsPerPage=${hitsPerPage}`)
    .then(res => {
      if (res.data) {
        setLocalStorage("currentPage", res.data.page);
        setLocalStorage("totalPage", res.data.nbPages);
        return res.data.hits;
      } else {
        throw new Error("Data is not present.");
      }
    })
    .catch(err => console.log(err));
}

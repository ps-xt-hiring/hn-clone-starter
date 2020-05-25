// utility to make service calls

import { urlConfilg } from "../static/constants";

function sendRequest({ pageCount }) {
  return fetch(urlConfilg.url + pageCount).then(res => res.json());
}

export { sendRequest };

import axios from 'axios';
import _ from 'lodash';

axios.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

export default (function () {
  const ajax = (method, url, option) => {
    const options = _.isUndefined(option) ? {} : option;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (_.has(options, 'headers')) {
      Object.keys(options.headers).forEach((item) => {
        headers[item] = options.headers[item];
      });
    }

    options.headers = headers;
    options.method = method;
    options.timeout = 300000;
    options.url = url;
    options.baseURL = 'http://hn.algolia.com/api/v1';

    return axios(options)
      .then(
        (response) => response,
        (error) => error.response,
      )
      .catch((error) => error.response);
  };

  ['get', 'put', 'post', 'delete'].forEach((method) => {
    ajax[method] = function (url, options) {
      return ajax(method, url, options);
    };
  });

  return ajax;
}());

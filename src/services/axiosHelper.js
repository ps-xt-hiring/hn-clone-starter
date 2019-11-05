import axios from 'axios';

const instance = axios.create();

const request = requestObject => new Promise((resolve, reject) => {
  instance.request(requestObject)
    .then(response => resolve(response))
    .catch((error) => {
      reject(error);
    });
});

export {
  request,
};

import axios from 'axios';

export default async function fetch(url, options = {}) {
  let response = {};
  let responseData;

  const reqOptions = {
    url,
    ...options,
  };

  try {
    response = await axios(reqOptions);
    responseData = response.data;
  } catch (error) {
    responseData = {
      status: 500,
      error,
    };
  }
  return responseData;
}

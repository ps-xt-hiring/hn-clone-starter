// eslint-disable-next-line import/prefer-default-export
export const toBaseURL = (fullURL) => {
  return fullURL && fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');
};
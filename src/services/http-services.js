import { getPageUrl } from '../utils/endpoints';
import { HTTP_METHODS } from '../utils/constants';

export const fetchPageArticles = (currentPage) => {
  const url = getPageUrl(currentPage);

  return fetch(url, { method: HTTP_METHODS.GET });
};

export const fetchArticle = (id) => {
  const url = getPageUrl(id);

  return fetch(url, { method: HTTP_METHODS.GET });
};

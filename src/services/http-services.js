import { getPageUrl } from '../utils/endpoints';
import { HTTP_METHODS } from '../utils/constants';

export const fetchPageArticles = ( currentPage ) => {
    
    const url = getPageUrl( currentPage );

    return fetch(url, { method: HTTP_METHODS.GET });
  }
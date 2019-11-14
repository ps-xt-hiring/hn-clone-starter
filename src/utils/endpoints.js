const _baseUrl = "https://hn.algolia.com/api/v1/";

export const getPageUrl = currentPage => `${_baseUrl}search?page=${currentPage}`;
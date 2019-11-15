const baseUrl = 'https://hn.algolia.com/api/v1/';

export const getPageUrl = currentPage => `${baseUrl}search?page=${currentPage}`;
export const justForNothing = () => 'Not Implemented';

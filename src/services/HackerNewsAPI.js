import ApiService from './ApiService';

const JSON_QUERY = '?page=';
const BASE_URL = 'https://hn.algolia.com/api';
const client = new ApiService({ baseURL: BASE_URL });

const hackerNewsApi = {};
hackerNewsApi.getTopNewsIds = (page) => client.get(`/v1/search${JSON_QUERY}${page}`);

export default hackerNewsApi;

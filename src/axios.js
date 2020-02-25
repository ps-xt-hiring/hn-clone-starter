import axios from 'axios';

const httpInstance = axios.create({
    baseURL: 'https://hn.algolia.com/api/v1/'
});

export default httpInstance;
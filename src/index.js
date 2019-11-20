import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// import { request } from 'https';

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

axios.interceptors.request.use((request) => request,
error => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => response,
error => {
  return Promise.reject(error);
});


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

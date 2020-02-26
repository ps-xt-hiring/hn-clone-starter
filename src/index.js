import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './config';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/feedReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

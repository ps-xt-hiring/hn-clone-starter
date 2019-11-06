
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';


import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {configureStore} from './store/configureStore';
const store = configureStore();
// store.dispatch(loadNews());



// ReactDOM.render(<App />, document.getElementById('root'));
render(
    <Provider store={store}>
       <App />
    </Provider>,

    document.getElementById('root')



);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();




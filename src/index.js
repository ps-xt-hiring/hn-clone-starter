import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './css/newsFeed.scss';
import * as serviceWorker from './serviceWorker';
import { store } from './store/configureStore';

function AppBundle() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
}

window.onload = () => {
  Loadable.preloadReady().then(() => {
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
    renderMethod(<AppBundle />, document.getElementById('root'));
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

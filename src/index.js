import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import store from './store';
import HackNewsHome from './components/Home/Container/Home.Wrapper';

ReactDOM.render(
  <Provider store={store}>
    <HackNewsHome />
  </Provider>,
  document.getElementById('root'),
);

/* eslint-disable */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './store/Reducer';
import Header from './Components/Header';
import HackerNewsPage from './Components/HackerNews';

import Container from './App.style';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <HackerNewsPage />
      </Container>
    </Provider>
  );
}

export default App;

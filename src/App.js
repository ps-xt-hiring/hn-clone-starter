import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './store/Reducer';
import Header from './Components/Header/Header';
import HackerNewsPage from './Components/HackerNews/HackerNews';

import * as S from './App.style';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <S.Container>
        <Header />
        <HackerNewsPage />
      </S.Container>
    </Provider>
  );
}

export default App;

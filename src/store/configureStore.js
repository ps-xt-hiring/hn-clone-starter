import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';

import ReduxThunk from 'redux-thunk';

import newsFeedReducer from './newsFeedReducer';

const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk))(
  createStore,
);

const rootReducer = combineReducers({
  newsFeed: newsFeedReducer,
});

function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

const store = module.hot
  ? configureStore(window.__REDUX_STATE__ || {})
  : configureStore({});

export { configureStore, store };

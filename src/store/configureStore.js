import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';

import ReduxThunk from 'redux-thunk';
// import axios from 'axios';

import newsFeedReducer from './newsFeedReducer';

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk))(
  createStore,
);

const rootReducer = combineReducers({
  newsFeed: newsFeedReducer,
});

function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

const store = configureStore({});

export { configureStore, store };

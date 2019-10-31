import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';

import ReduxThunk from 'redux-thunk';
// import axios from 'axios';

import newsFeedReducer from './newsFeedReducer';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk, logger))(
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

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from '../reducers';

export default function configureStore() {
  return createStore(combineReducer, applyMiddleware(thunk));
}

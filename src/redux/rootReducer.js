import { combineReducers } from 'redux';
import hackerNewsReducer from './hacker-news/hackerNewsReducer';

const rootReducer = combineReducers({
  hackerNews: hackerNewsReducer,
});

export default rootReducer;

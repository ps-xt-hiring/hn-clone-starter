import { combineReducers } from 'redux';
import news from './newsReducer';

const rootReducer = combineReducers({
   news: news 
});

export default rootReducer;
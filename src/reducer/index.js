import { combineReducers } from 'redux';
import news from './newsReducer';

const rootReducer = combineReducers({
    appData: news
});

export default rootReducer;
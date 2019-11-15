/* eslint-disable import/no-webpack-loader-syntax,   import/first*/
import { combineReducers } from 'redux';
import news from './newsReducer';

const rootReducer = combineReducers({
    appData: news
});

export default rootReducer;
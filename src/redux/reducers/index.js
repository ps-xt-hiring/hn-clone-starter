import {combineReducers} from 'redux';
import productReducer from './productReducer';

export const AllReducers = combineReducers({
  productReducer: productReducer, 
});
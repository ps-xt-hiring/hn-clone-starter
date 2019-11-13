
import { productReducer } from './productReducer';
import {combineReducers} from 'redux';


export const AllReducers = combineReducers({
    productReducer: productReducer,
  
});
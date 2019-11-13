import { combineReducers } from 'redux';
import productReducer from './productReducer';

const AllReducers = combineReducers({
  productReducer,
});

export default AllReducers;
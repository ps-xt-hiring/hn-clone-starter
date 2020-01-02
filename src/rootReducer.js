import { combineReducers } from 'redux';

import app from './components/Home/reducer';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;

import { combineReducers } from 'redux';

import app from './components/reducer';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;

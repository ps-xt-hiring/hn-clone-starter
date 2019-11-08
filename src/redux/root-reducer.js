import { combineReducers } from 'redux';

import feed from './feed/feed.reducer';

const rootReducer = combineReducers({
  feed
});

export default rootReducer;

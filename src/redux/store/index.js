import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AllReducers } from '../reducers';

const store = createStore(AllReducers, composeWithDevTools(
    applyMiddleware(thunk),
   ));

export default store; 
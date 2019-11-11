import { createStore, applyMiddleware, compose   } from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

export  function configureStore(initialState) {
    return createStore(
        rootReducer, 
        initialState,
        enhancers,
        applyMiddleware(thunk)
    );
}


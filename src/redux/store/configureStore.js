import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers/index";

const configureStore = () => {
  return createStore(rootReducers, applyMiddleware(thunk));
};

export default configureStore;

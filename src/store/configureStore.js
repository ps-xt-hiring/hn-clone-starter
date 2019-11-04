import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const configureStore = (initialState = {}) =>
  createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

export default configureStore;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers"; // /reducers/index.js

const initialState = {};
const middleware = [thunk];

// Reducer, Initial State, Middleware
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.navigator.userAgent.includes("Chrome") ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  )
);

export default store;
import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers/index";
import thunk from "redux-thunk";

const Store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default Store;

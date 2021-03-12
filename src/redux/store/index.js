import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../reducers";

const middlewares = [thunk];

const intialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const Store = createStore(
  RootReducer,
  intialState,
  applyMiddleware(...middlewares)
);

Store.subscribe(() => {
  const store = JSON.stringify(Store.getState());
  localStorage.setItem("reduxState", store);
});

window.store = Store;
export default Store;

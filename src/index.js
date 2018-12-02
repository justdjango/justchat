import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import authReducer from "./store/reducers/auth";
import navReducer from "./store/reducers/nav";
import messageReducer from "./store/reducers/message";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    nav: navReducer,
    message: messageReducer
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  //   if (module.hot) {
  //     module.hot.accept("./store/reducers", () => {
  //       const nextRootReducer = require("./store/reducers/auth");
  //       store.replaceReducer(nextRootReducer);
  //     });
  //   }

  return store;
}

const store = configureStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'antd/dist/antd.css';
import reducer from './store/reducers/auth';
import App from './App';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore() {
    const store = createStore(reducer, composeEnhances(
        applyMiddleware(thunk)
    ));
  
    if (module.hot) {
      module.hot.accept('./store/reducers', () => {
        const nextRootReducer = require('./store/reducers/auth');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
}

const store = configureStore();

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)


ReactDOM.render(app, document.getElementById("app"));
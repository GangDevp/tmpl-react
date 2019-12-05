import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import baseCfg from './../../kfront-base.json';

export default function configureStore(initialState) {
  let mode = baseCfg.webpack.mode;
  let store;
  if (mode === 'development') {
    const logger = createLogger({
      level: 'log'
    });
    store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)));
  } else {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
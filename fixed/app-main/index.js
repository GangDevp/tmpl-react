
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'app-main/app';
import configureStore from 'app-main/store/configure-store';

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app-main')
);
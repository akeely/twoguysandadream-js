import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';

import Auction from './pages/Auction';

import configureStores from './stores/configureStores';

const store = configureStores();

ReactDOM.render(
    <Provider store={store}>
        <Auction pollInterval="500" />
    </Provider>,
  document.getElementById('root')
);

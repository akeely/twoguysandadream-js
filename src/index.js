import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory'

import Auction from './pages/Auction';

import configureStores from './stores/configureStores';

const history = createHistory()

const store = configureStores(history);

ReactDOM.render(
    <Provider store={store}>
        <Auction pollInterval="500" />
    </Provider>,
  document.getElementById('root')
);

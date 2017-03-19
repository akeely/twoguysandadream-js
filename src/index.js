import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

import { Provider } from 'react-redux';

import { Route } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import Auction from './pages/Auction';

import configureStores from './stores/configureStores';

const history = createHistory()

const store = configureStores(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/auction" component={Auction} />
            </div>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

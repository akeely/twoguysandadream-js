import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import 'font-awesome/css/font-awesome.css';
import './index.css';

import { Provider } from 'react-redux';

import { Route } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import Auction from './pages/Auction';
import AddPlayer from './pages/AddPlayer';
import DraftResults from './pages/DraftResults';

import configureStores from './stores/configureStores';

window.jQuery = window.$ = $;

const history = createHistory()

const store = configureStores(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/league/:leagueId/auction" component={Auction} />
                <Route path="/league/:leagueId/availableplayers" component={AddPlayer} />
                <Route path="/league/:leagueId/results" component={DraftResults} />
            </div>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

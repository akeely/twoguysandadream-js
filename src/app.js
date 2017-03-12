
import Auction from './pages/Auction';

import TeamSidebar from './components/auction/TeamSummary';

import React from 'react';
import {
    render
} from 'react-dom';
import { Provider } from 'react-redux';

import configureStores from './stores/configureStores';

const store = configureStores();

render(
    <Provider store={store}>
        <Auction pollInterval="500" />
    </Provider>,
    document.getElementById('auctionBoard')
);

render(
    <TeamSidebar pollInterval="2000" />,
    document.getElementById('teamSidebar')
);

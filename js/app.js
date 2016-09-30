
import {
    App
} from './pages/Auction';

import TeamSidebar from './components/auction/TeamSummary';

import React from 'react';
import {
    render
} from 'react-dom';


render(
    <App pollInterval="500" />,
    document.getElementById('auctionBoard')
);

render(
    <TeamSidebar pollInterval="2000" />,
    document.getElementById('teamSidebar')
);

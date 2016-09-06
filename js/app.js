
import {
    App
} from './pages/Auction';

import React from 'react';
import {
    render
} from 'react-dom';


render(
    <App pollInterval="500" />,
    document.getElementById('auctionBoard')
);

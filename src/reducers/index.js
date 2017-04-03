import { combineReducers } from 'redux';

import auction from './auction/Auction';
import addPlayer from './addplayer/AddPlayer';

const rootReducer = combineReducers({
    auctionPlayers: auction,
    availablePlayers: addPlayer
});

export default rootReducer;

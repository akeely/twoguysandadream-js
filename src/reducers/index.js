import { combineReducers } from 'redux';

import auction from './auction/Auction';
import addPlayer from './addplayer/AddPlayer';
import draftResults from './draftresults/DraftResults';

const rootReducer = combineReducers({
    auctionPlayers: auction,
    availablePlayers: addPlayer,
    draftResults
});

export default rootReducer;

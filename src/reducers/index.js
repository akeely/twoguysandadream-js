import { combineReducers } from 'redux';

import auction from './auction/Auction';
import addPlayer from './addplayer/AddPlayer';
import draftResults from './draftresults/DraftResults';
import team from './Team';

const rootReducer = combineReducers({
    auctionPlayers: auction,
    availablePlayers: addPlayer,
    draftResults,
    activeTeam: team
});

export default rootReducer;

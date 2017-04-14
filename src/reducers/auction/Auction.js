import {
    RECEIVE_AUCTION_BOARD,
    RECEIVE_TEAM,
    REMOVE_BID
} from '../../actions/Auction';

export const initialState = {
    auctionPlayers: [],
    activeTeam: {id: -1}
};

export const State = {
    AVAILABLE: 'available',
    NEW: 'new',
    UPDATED: 'updated',
    EXPIRING: 'expiring',
    EXPIRED: 'expired'
};

/**
 * Find the updated bid for a given player.
 *
 * @param {Object} existing The existing player object to find in the list of bids.
 * @param {Object} bids The updated bids for all players.
 * @returns {*} The updated bid for the existing player, or null if no updated bid exists.
 */
const getMatchingBid = (existing, bids) => {
    var playerId = existing.player.id;
    var existingBid = existing.amount;

    for (let i = 0; i < bids.length; i++) {
        if (bids[i].player.id === playerId) {
            if (bids[i].amount !== existingBid) {
                bids[i].state = State.UPDATED;
            } else {
                bids[i].state = State.AVAILABLE;
            }
            return bids[i];
        }
    }

    return null;
};

/**
 * Get the auction board to display. Because the server only returns players that are currently available for auction,
 * this ensures that all players in the existing display remain, even if they are not included in the server response.
 * Any player not in the server response is marked as expired.
 *
 * @param {Object} existing The existing bids on the auction board.
 * @param {Object} updated The current bids returned by the server.
 * @returns {Object} The bids to display on the auction board.
 */
const getAuctionBoard = (existing, updated) => {

    let mergedBids = [];

    for (let i = 0; i < existing.length; i++) {
        const updatedBid = getMatchingBid(existing[i], updated);

        if (updatedBid === null) {
            existing[i].state = State.EXPIRED;
            //existing[i].secondsRemaining = EXPIRED;
            //existing[i].removeFunction = this.removePlayer.bind(this, existing[i].player.id);

            mergedBids.push(existing[i]);
        } else {
            mergedBids.push(updatedBid);
        }
    }

    for (let i = 0; i < updated.length; i++) {
        const existingBid = getMatchingBid(updated[i], existing);

        if (existingBid === null) {
            updated[i].state = State.NEW;
            mergedBids.push(updated[i]);
        }
    }

    return {auctionPlayers: mergedBids};
};

const removePlayer = (bids, playerId) => {

    const filteredBids = bids.filter((b) => b.player.id !== playerId);

    return {auctionPlayers: filteredBids};
};

export default function auction(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_AUCTION_BOARD:
            return {
              ...state,
              ...getAuctionBoard(state.auctionPlayers, action.auctionPlayers)
            };
        case RECEIVE_TEAM:
            return {
                ...state,
                activeTeam: action.activeTeam
            }
        case REMOVE_BID:
            return {
                ...state,
                ...removePlayer(state.auctionPlayers, action.playerId)
            };
        default:
            return state;
    }
}



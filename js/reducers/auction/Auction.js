import {
    RECEIVE_AUCTION_BOARD
} from '../../actions/Auction';

export const initialState = {
    auctionPlayers: []
};

const EXPIRED = 'EXPIRED';

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

    for (var i = 0; i < bids.length; i++) {
        if (bids[i].player.id === playerId) {
            if (bids[i].amount !== existingBid) {
                bids[i].isNew = true;
            } else {
                bids[i].isNew = false;
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
 * @returns {Array} The bids to display on the auction board.
 */
const getAuctionBoard = (existing, updated) => {

    let mergedBids = [];

    for (let i = 0; i < existing.length; i++) {
        const updatedBid = getMatchingBid(existing[i], updated);

        if (updatedBid === null) {
            existing[i].secondsRemaining = EXPIRED;
            existing[i].removeFunction = this.removePlayer.bind(this, existing[i].player.id);

            mergedBids = [
                ...mergedBids,
                existing[i]
            ];
        } else {
            mergedBids.push(updatedBid);
        }
    }

    for (let i = 0; i < updated.length; i++) {
        const existingBid = getMatchingBid(updated[i], existing);

        if (existingBid === null) {
            updated[i].isNew = true;
            mergedBids.push(updated[i]);
        }
    }

    return {auctionPlayers: mergedBids};
};

export default function auction(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_AUCTION_BOARD:
            return {
              ...state,
              ...getAuctionBoard(state, action.auctionPlayers)
            };
        default:
            return state;
    }
}



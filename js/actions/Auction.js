import axios from 'axios';

export const GET_AUCTION_BOARD = 'GET_AUCTION_BOARD';
export const REQUEST_AUCTION_BOARD = 'REQUEST_AUCTION_BOARD';
export const RECEIVE_AUCTION_BOARD = 'RECEIVE_AUCTION_BOARD';
export const ERROR_AUCTION_BOARD = 'ERROR_AUCTION_BOARD';

function requestAuctionBoard() {
    return {
        type: REQUEST_AUCTION_BOARD
    };
}

function receiveAuctionBoard(response) {
    return {
        type: RECEIVE_AUCTION_BOARD,
        auctionPlayers: response.data
    };
}

function errorAuctionBoard(response) {
    return {
        type: ERROR_AUCTION_BOARD,
        errorResponse: response
    };
}

export function getAuctionBoard() {

    return (dispatch) => {
        dispatch(requestAuctionBoard());

        const leagueId = $("meta[name='_league_id'").attr('content');

        axios.get(`/api/league/${leagueId}/bid`)
            .then((response)  => dispatch(receiveAuctionBoard(response)))
            .catch((response) => dispatch(errorAuctionBoard(response)));
    };
};

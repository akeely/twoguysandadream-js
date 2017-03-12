import axios from 'axios';

export const REQUEST_AUCTION_BOARD = 'REQUEST_AUCTION_BOARD';
export const RECEIVE_AUCTION_BOARD = 'RECEIVE_AUCTION_BOARD';
export const ERROR_AUCTION_BOARD = 'ERROR_AUCTION_BOARD';

export const ATTEMPT_BID = 'ATTEMPT_BID';
export const ACCEPT_BID = 'ACCEPT_BID';
export const FAILED_BID = 'FAILED_BID';
export const REMOVE_BID = 'REMOVE_BID';

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

        const leagueId = $("meta[name='_league_id']").attr('content');

        axios.get(`/api/league/${leagueId}/bid`)
            .then((response)  => dispatch(receiveAuctionBoard(response)))
            .catch((response) => dispatch(errorAuctionBoard(response)));
    };
}

function acceptBid(response) {

    return {
        type: ACCEPT_BID,
        updatedBid: response
    };
}

function failedBid(response) {

    return {
        type: FAILED_BID,
        errorResponse: response
    };
}

function attemptBid(playerId) {

    return {
        type: ATTEMPT_BID,
        playerId
    };
}

export function removeBid(playerId) {

    return {
        type: REMOVE_BID,
        playerId
    };
}

export function putBid(playerId, amount) {

    return (dispatch) => {
        dispatch(attemptBid());

        const leagueId = $("meta[name='_league_id']").attr('content');

        const token = $("meta[name='_csrf']").attr('content');
        const header = $("meta[name='_csrf_header']").attr('content');

        axios.put(`/api/league/${leagueId}/bid/${playerId}`, {amount}, {headers: {[header]: token}})
            .then((response)  => dispatch(acceptBid(response)))
            .catch((response) => dispatch(failedBid(response)));
    };
}

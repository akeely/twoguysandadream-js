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

export function getAuctionBoard(leagueId) {

    return (dispatch) => {
        dispatch(requestAuctionBoard());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/bid`)
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

export function putBid(leagueId, playerId, amount) {

    return (dispatch) => {
        dispatch(attemptBid());

        const token = document.querySelector("meta[name='_csrf']").getAttribute('content');
        const header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');

        axios.put(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/bid/${playerId}`, {amount}, {headers: {[header]: token}})
            .then((response)  => dispatch(acceptBid(response)))
            .catch((response) => dispatch(failedBid(response)));
    };
}

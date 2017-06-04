import axios from 'axios';

export const REQUEST_AVAILABLE = 'REQUEST_AVAILABLE';
export const RECEIVE_AVAILABLE = 'RECEIVE_AVAILABLE';
export const ERROR_AVAILABLE = 'ERROR_AVAILABLE';

export const ATTEMPT_ADD = 'ATTEMPT_BID';
export const ACCEPT_ADD = 'ACCEPT_ADD';
export const FAILED_ADD = 'FAILED_ADD';

function requestAvailablePlayers() {
    return {
        type: REQUEST_AVAILABLE
    };
}

function receiveAvailablePlayers(response) {
    return {
        type: RECEIVE_AVAILABLE,
        availablePlayers: response.data
    };
}

function errorAvailablePlayers(response) {
    return {
        type: ERROR_AVAILABLE,
        errorResponse: response
    };
}

export function getAvailablePlayers(leagueId) {

    return (dispatch) => {
        dispatch(requestAvailablePlayers());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/player?available=true`)
            .then((response)  => dispatch(receiveAvailablePlayers(response)))
            .catch((response) => dispatch(errorAvailablePlayers(response)));
    };
}

function acceptAdd(playerId, playerName) {

    return {
        type: ACCEPT_ADD,
        playerId,
        playerName
    };
}

function failedAdd(response, playerName) {

    return {
        type: FAILED_ADD,
        errorResponse: response,
        playerName
    };
}

function attemptAdd(playerId) {

    return {
        type: ATTEMPT_ADD,
        playerId
    };
}

export function addPlayer(leagueId, playerId, playerName) {

    return (dispatch) => {
        dispatch(attemptAdd(playerId));

        const token = document.querySelector("meta[name='_csrf']").getAttribute('content');
        const header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');

        axios.post(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/bid`, {playerId}, {headers: {[header]: token}})
            .then((response)  => dispatch(acceptAdd(playerId, playerName)))
            .catch((response) => dispatch(failedAdd(response, playerName)));
    };
}

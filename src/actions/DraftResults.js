import axios from 'axios';

export const REQUEST_WON = 'REQUEST_WON';
export const RECEIVE_WON = 'RECEIVE_WON';
export const ERROR_WON = 'ERROR_WON';

export const ATTEMPT_ADD = 'ATTEMPT_BID';
export const ACCEPT_ADD = 'ACCEPT_ADD';
export const FAILED_ADD = 'FAILED_ADD';

function requestPlayersWon() {
    return {
        type: REQUEST_WON
    };
}

function receivePlayersWon(response) {
    return {
        type: RECEIVE_WON,
        leagueData: response.data
    };
}

function errorPlayersWon(response) {
    return {
        type: ERROR_WON,
        errorResponse: response
    };
}

export function getPlayersWon(leagueId) {

    return (dispatch) => {
        dispatch(requestPlayersWon());

        axios.get(`http://localhost:8080/api/league/${leagueId}`)
            .then((response)  => dispatch(receivePlayersWon(response)))
            .catch((response) => dispatch(errorPlayersWon(response)));
    };
}


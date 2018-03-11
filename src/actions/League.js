import axios from 'axios';

export const REQUEST_LEAGUE = 'REQUEST_LEAGUE';
export const RECEIVE_LEAGUE = 'RECEIVE_LEAGUE';
export const ERROR_LEAGUE = 'ERROR_LEAGUE';

function requestLeague() {
    return {
        type: REQUEST_LEAGUE
    };
}

function receiveLeague(response) {
    return {
        type: RECEIVE_LEAGUE,
        league: response.data
    };
}

function errorLeague(response) {
    return {
        type: ERROR_LEAGUE,
        errorResponse: response
    };
}

export function getLeague(leagueId) {

    return (dispatch) => {
        dispatch(requestLeague());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/`)
            .then((response)  => dispatch(receiveLeague(response)))
            .catch((response) => dispatch(errorLeague(response)));
    };
}

export function updateDraftStatus(leagueId, status) {

    return (dispatch) => {

        const token = document.querySelector("meta[name='_csrf']").getAttribute('content');
        const header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');

        axios.put(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/draftstatus`, {status},
            {headers: {[header]: token}});
    }
}

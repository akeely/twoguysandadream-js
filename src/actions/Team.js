import axios from 'axios';

export const REQUEST_TEAM = 'REQUEST_TEAM';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const ERROR_TEAM = 'ERROR_TEAM';

export const REQUEST_OWNER = 'REQUEST_OWNER';
export const RECEIVE_OWNER = 'RECEIVE_OWNER';
export const ERROR_OWNER = 'ERROR_OWNER';

function requestTeam() {
    return {
        type: REQUEST_TEAM
    };
}

function receiveTeam(response) {
    return {
        type: RECEIVE_TEAM,
        activeTeam: response.data
    };
}

function errorTeam(response) {
    return {
        type: ERROR_TEAM,
        errorResponse: response
    };
}

function requestOwner() {
    return {
        type: REQUEST_OWNER
    };
}

function receiveOwner(response) {
    return {
        type: RECEIVE_OWNER,
        owner: response.data
    };
}

function errorOwner(response) {
    return {
        type: ERROR_OWNER,
        errorResponse: response
    };
}

export function getTeam(leagueId) {

    return (dispatch) => {
        dispatch(requestTeam());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/team/me`)
            .then((response)  => dispatch(receiveTeam(response)))
            .catch((response) => dispatch(errorTeam(response)));
    };
}

export function getOwner() {

    return (dispatch) => {
        dispatch(requestOwner());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/owner/me`)
            .then((response)  => dispatch(receiveOwner(response)))
            .catch((response) => dispatch(errorOwner(response)));
    };
}

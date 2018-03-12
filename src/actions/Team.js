import axios from 'axios';

export const REQUEST_TEAM = 'REQUEST_TEAM';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const ERROR_TEAM = 'ERROR_TEAM';

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

export function getTeam(leagueId) {

    return (dispatch) => {
        dispatch(requestTeam());

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/team/me`)
            .then((response)  => dispatch(receiveTeam(response)))
            .catch((response) => dispatch(errorTeam(response)));
    };
}

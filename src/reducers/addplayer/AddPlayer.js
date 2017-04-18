import {
    RECEIVE_AVAILABLE,
    ACCEPT_ADD,
    FAILED_ADD
} from '../../actions/AddPlayer';

export const initialState = {
    availablePlayers: []
};

const removePlayer = (availablePlayers, playerId) => {

    const filteredPlayers = availablePlayers.filter((p) => p.id !== playerId);

    return filteredPlayers;
};

export default function addPlayer(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_AVAILABLE:
            return {
                ...state,
                availablePlayers: action.availablePlayers
            };
        case ACCEPT_ADD:
            return {
                ...state,
                availablePlayers: removePlayer(state.availablePlayers, action.playerId)
            };
        default:
            return state;
    }
}



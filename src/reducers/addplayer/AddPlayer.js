import {
    RECEIVE_AVAILABLE,
    ACCEPT_ADD,
    FAILED_ADD
} from '../../actions/AddPlayer';

export const initialState = {
    availablePlayers: []
};

const removePlayer = (availablePlayers, playerId) => {

    const filteredPlayers = availablePlayers.filter((p) => p.player.id !== playerId);

    return {availablePlayers: filteredPlayers};
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
                ...removePlayer(state.availablePlayers, action.playerId)
            };
        default:
            return state;
    }
}



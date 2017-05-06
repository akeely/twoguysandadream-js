import {
    RECEIVE_AVAILABLE,
    ACCEPT_ADD,
    FAILED_ADD,
    CLEAR_ALERTS
} from '../../actions/AddPlayer';

export const initialState = {
    availablePlayers: [],
    addedPlayers: [],
    failedAdds: []
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

            state.addedPlayers.push(action.playerName);
            return {
                ...state,
                availablePlayers: removePlayer(state.availablePlayers, action.playerId)
            };
        case FAILED_ADD:

            state.failedAdds.push(action.playerName);
            return state;

        case CLEAR_ALERTS:
            state.addedPlayers = [];
            state.failedAdds = [];

            return state;
        default:
            return state;
    }
}



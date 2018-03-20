import {
    RECEIVE_TEAM,
    RECEIVE_OWNER
} from '../actions/Team';

export const initialState = {
    activeTeam: {id: -1, statistics: {adds: 0}},
    owner: ""
};

export default function team(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_TEAM:
            return {
                ...state,
                activeTeam: action.activeTeam
            };
        case RECEIVE_OWNER:
            return {
                ...state,
                owner: action.owner
            };
        default:
            return state;
    }
}
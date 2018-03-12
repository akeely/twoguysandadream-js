import {
    RECEIVE_TEAM
} from '../actions/Team';

export const initialState = {
    activeTeam: {id: -1, statistics: {adds: 0}}
};

export default function team(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_TEAM:
            return {
                ...state,
                activeTeam: action.activeTeam
            }
        default:
            return state;
    }
}
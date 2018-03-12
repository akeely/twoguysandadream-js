import {
    RECEIVE_LEAGUE
} from '../actions/League';

export const initialState = {
    league: {draftStatus: 'open'}
};

export default function league(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_LEAGUE:
            return {
                ...state,
                league: action.league
            }
        default:
            return state;
    }
}
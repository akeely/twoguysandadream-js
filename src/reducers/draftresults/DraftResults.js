import {
    RECEIVE_WON
} from '../../actions/DraftResults';

export const initialState = {
    playersWon: []
};

const flatten = arr => arr.reduce(
    (acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
    ),
    []
);

const getPlayersWonForTeam = (team) => {
    
    return team.roster.map((p) => {
        return {
            cost: p.cost,
            id: p.player.id,
            player: p.player,
            team: team.name
        }
    });
};

const getPlayersWon = (leagueData) => {

    const arrayWon = leagueData.teams.map(getPlayersWonForTeam);

    return flatten(arrayWon);
};

export default function draftResults(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_WON:
            return {
                ...state,
                playersWon: getPlayersWon(action.leagueData)
            };
        default:
            return state;
    }
}



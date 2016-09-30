import React from 'react';

import Roster from './Roster';

export default class Rosters extends React.Component {
    render() {

        var teams = this.props.teams.filter((team) => team.id === this.props.currentTeam);

        var rosters = teams.map((team) =>
            <Roster key={'roster.' + team.id} team={team} />
        );

        return (
            <div>
            {rosters}
            </div>
        );
    }
}

import React from 'react';

import Team from './Team';

export default class Teams extends React.Component {
    render() {
        var teams = this.props.teams.map((team) =>
            <Team
                currentTeam={this.props.currentTeam}
                key={'team.' + team.id}
                team={team}
                updateTeam={this.props.updateTeam}
            />
        );

        return (
            <table className="table table-striped table-condensed">
                <thead>
                <tr>
                    <th>Team</th>
                    <th>Money</th>
                    <th>Max</th>
                    <th>Roster</th>
                    <th>Adds</th>
                </tr>
                </thead>
                <tbody>
                {teams}
                </tbody>
            </table>
        );
    }
}

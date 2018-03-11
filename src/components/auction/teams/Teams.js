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
            <table className="table table-striped table-condensed small">
                <thead>
                    <tr>
                        <th colspan="4" className="success">League</th>
                    </tr>
                    <tr>
                        <th>Team</th>
                        <th>Budget</th>
                        <th>Max</th>
                        <th>Roster</th>
                    </tr>
                </thead>
                <tbody>
                    {teams}
                </tbody>
            </table>
        );
    }
}

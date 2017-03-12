import React from 'react';

import WonPlayer from './WonPlayer';

export default class Roster extends React.Component {

    render() {

        var playersWon = this.props.team.roster.map((entry) =>
            <WonPlayer key={'won.' + entry.player.id} rosterEntry={entry} />
        );

        return (
            <table className="table table-striped table-condensed">
                <thead>
                <tr>
                    <th colSpan="3">{this.props.team.name}</th>
                </tr>
                <tr>
                    <th>Player</th>
                    <th>Cost</th>
                    <th>Pos</th>
                </tr>
                </thead>
                <tbody>
                {playersWon}
                </tbody>
            </table>
        );
    }
}

import React from 'react';

export default class WonPlayer extends React.Component {

    render() {

        var player = this.props.rosterEntry.player;
        var cost = this.props.rosterEntry.cost;

        var positions = player.positions
            .map(function(pos) { return pos.name; })
            .join(', ');

        return (
            <tr>
                <td>{player.name} - <span className="text-muted small">{positions}</span></td>
                <td>${cost}</td>
            </tr>
        );
    }
}
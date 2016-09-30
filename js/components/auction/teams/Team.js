import React from 'react';

export default class Team extends React.Component {

    updateTeam() {
        this.props.updateTeam(this.props.team.id);
    }

    render() {

        var highlightClass= '';

        if (this.props.team.id === this.props.currentTeam) {
            highlightClass = 'info';
        }

        return (
            <tr className={highlightClass} id={'team.' + this.props.team.id}>
                <td><a href="#" onClick={this.updateTeam}>{this.props.team.name}</a></td>
                <td>{this.props.team.statistics.availableBudget}</td>
                <td>{this.props.team.statistics.maxBid}</td>
                <td>{this.props.team.statistics.openRosterSpots}</td>
                <td>{this.props.team.statistics.adds}</td>
            </tr>
        );
    }
}

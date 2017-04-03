import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import NavBar from '../components/NavBar';
import * as Actions from '../actions/AddPlayer';


class AddPlayer extends React.Component {

    loadPlayers() {

        this.props.actions.getAvailablePlayers(this.props.leagueId);
    };

    componentDidMount() {
        this.loadPlayers();
    };

    render() {

        const availablePlayers = this.props.availablePlayers;

        let Players = () => (
            <div>
                <p>Loading...</p>
            </div>
        );

        if (availablePlayers.length > 0) {
            Players = () => {
                const players = availablePlayers.map((player) =>
                    <tr key={`available.${player.id}`}>
                        <td>{player.rank}</td>
                        <td>{player.name}</td>
                        <td>{player.realTeam}</td>
                        <td>{player.positions.map(p => p.name).join('/')}</td>
                    </tr>
                );

                return (
                    <table className="table table-striped table-condensed">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Positions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players}
                        </tbody>
                    </table>
                );
            };
        }

        return (
            <div>
                <NavBar leagueId={this.props.leagueId} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="panel">
                                <Players />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };
}

function mapStateToProps(state, ownProps) {

    return {
        leagueId: ownProps.match.params.leagueId,
        ...state.root.availablePlayers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

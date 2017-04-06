import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'font-awesome/css/font-awesome.css';

import NavBar from '../components/NavBar';
import * as Actions from '../actions/DraftResults';


class AddPlayer extends React.Component {

    loadPlayers() {

        this.props.actions.getPlayersWon(this.props.leagueId);
    };

    componentDidMount() {
        this.loadPlayers();
    };

    render() {

        const playersWon = this.props.playersWon;

        const formatPositions = (cell, row) => (<span>{cell.positions.map(p => p.name).join('/')}</span>);

        const Players = () => (

            <BootstrapTable
                    bordered={false}
                    data={playersWon}
                    hover
                    keyField="id"
                    options={ { noDataText: 'Loading...' } }
                    pagination
                    striped>
                <TableHeaderColumn
                        dataField="player"
                        dataFormat={p => p.name}>
                    Player
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="player"
                        dataFormat={p => p.realTeam}>
                    Team
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="player"
                        dataFormat={formatPositions}>
                    Positions
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="team">
                    Owner
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="cost"
                        dataFormat={c => '$' + c.toFixed(2)}>
                    Price
                </TableHeaderColumn>
            </BootstrapTable>
        );

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
        ...state.root.draftResults
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

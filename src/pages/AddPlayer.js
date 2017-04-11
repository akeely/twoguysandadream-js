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

        const formatPositions = (cell, row) => (<span>{cell.map(p => p.name).join('/')}</span>);

        const addFunc = this.props.actions.addPlayer.bind(this, this.props.leagueId);

        const formatAdd = (cell, row) => (
                <i
                    className="fa fa-plus-circle fa-lg"
                    onClick={addFunc.bind(this, cell)}
                    style={{cursor: 'pointer', color: '#337ab7', textAlign: 'center'}}
                />
            );

        const Players = () => (

            <BootstrapTable
                    bordered={false}
                    data={availablePlayers}
                    hover
                    keyField="id"
                    options={ { noDataText: 'Loading...' } }
                    pagination
                    striped>
                <TableHeaderColumn dataField="rank">Rank</TableHeaderColumn>
                <TableHeaderColumn
                        dataField="name"
                        filter={{type: 'TextFilter'}}>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="realTeam"
                        filter={{type: 'TextFilter'}}>
                    Team
                </TableHeaderColumn>
                <TableHeaderColumn
                        dataField="positions"
                        dataFormat={formatPositions}
                        filter={{type: 'TextFilter'}}>
                    Positions
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataFormat={formatAdd}>

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
        ...state.root.availablePlayers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

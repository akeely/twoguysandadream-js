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
import * as TeamActions from '../actions/Team';


class AddPlayer extends React.Component {

    loadPlayers() {

        this.props.actions.getAvailablePlayers(this.props.leagueId);
        this.props.actions.getTeam(this.props.leagueId);
    };

    componentDidMount() {
        this.loadPlayers();
    };

    componentWillUnmount() {
        this.props.actions.clearAlerts();
    }

    render() {

        const availablePlayers = this.props.availablePlayers;

        const formatPositions = (cell, row) => (<span>{cell.map(p => p.name).join('/')}</span>);

        const addFunc = this.props.actions.addPlayer.bind(this, this.props.leagueId);

        const formatAdd = (cell, row) => (
            <i
                className="fa fa-plus-circle fa-lg"
                onClick={addFunc.bind(this, cell, row.name)}
                style={{cursor: 'pointer', color: '#337ab7', textAlign: 'center'}}
            />
        );

        const hasNotifications = this.props.addedPlayers.length > 0 || this.props.failedAdds.length > 0;

        const added = this.props.addedPlayers
            .map((name) => <div className="alert alert-success" key={name}>Added {name}</div>);
        const failed = this.props.failedAdds
            .map((name) => <div className="alert alert-danger" key={name}>Adding {name} failed.</div>);

        const Alerts = () => (
            <div>
                {added}
                {failed}
            </div>
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
                    dataAlign="center"
                    dataField="id"
                    dataFormat={formatAdd}>

                </TableHeaderColumn>
            </BootstrapTable>
        );

        return (
            <div>
                <NavBar
                    leagueId={this.props.leagueId}
                    numAdds={this.props.activeTeam.statistics.adds}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {hasNotifications && <Alerts />}
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
        ...state.root.availablePlayers,
        activeTeam: state.root.activeTeam.activeTeam
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, Actions, TeamActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);

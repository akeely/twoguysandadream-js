import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import AuctionBoard from '../components/auction/AuctionBoard';
import TeamSummary from '../components/auction/TeamSummary';
import NavBar from '../components/NavBar';
import * as Actions from '../actions/Auction';
import * as TeamActions from '../actions/Team';

let intervalId = null;

class Auction extends React.Component {

    loadBoard() {

        this.props.actions.getAuctionBoard(this.props.leagueId);
        this.props.actions.getTeam(this.props.leagueId);
    };

    componentDidMount() {
        this.loadBoard();
        intervalId = setInterval(this.loadBoard.bind(this), 1000);
    };

    componentWillUnmount() {

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    render() {

        return (
            <div>
                <NavBar
                    leagueId={this.props.leagueId}
                    numAdds={this.props.activeTeam.statistics.adds}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="panel">
                                <AuctionBoard
                                    activeTeam={this.props.activeTeam.id}
                                    auctionPlayers={this.props.auctionPlayers}
                                    bidFunction={this.props.actions.putBid}
                                    leagueId={this.props.leagueId}
                                    removeFunction={this.props.actions.removeBid}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel">
                                <TeamSummary
                                    activeTeam={this.props.activeTeam.id}
                                    leagueId={this.props.leagueId}
                                    pollInterval="2000"
                                />
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
        ...state.root.auctionPlayers,
        activeTeam: state.root.activeTeam.activeTeam
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, Actions, TeamActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);

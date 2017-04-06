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

let intervalId = null;

class Auction extends React.Component {

    loadBoard() {

        this.props.actions.getAuctionBoard(this.props.leagueId);
    };

    componentDidMount() {
        this.loadBoard();
        intervalId = setInterval(this.loadBoard.bind(this), 500);
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
                <NavBar leagueId={this.props.leagueId} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="panel">
                                <AuctionBoard
                                    auctionPlayers={this.props.auctionPlayers}
                                    bidFunction={this.props.actions.putBid}
                                    leagueId={this.props.leagueId}
                                    removeFunction={this.props.actions.removeBid}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel">
                                <TeamSummary pollInterval="2000" />
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
        ...state.root.auctionPlayers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);

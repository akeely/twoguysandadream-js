import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import AuctionBoard from '../components/auction/AuctionBoard';
import TeamSummary from '../components/auction/TeamSummary';
import CommissionerTools from '../components/auction/CommissionerTools';
import NavBar from '../components/NavBar';
import * as Actions from '../actions/Auction';
import * as TeamActions from '../actions/Team';
import * as LeagueActions from '../actions/League';

let intervalId = null;

class Auction extends React.Component {

    loadBoard() {

        this.props.actions.getAuctionBoard(this.props.leagueId);
        this.props.actions.getTeam(this.props.leagueId);
        this.props.actions.getLeague(this.props.leagueId);
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

        const updateDraftStatus = this.props.actions.updateDraftStatus.bind(null, this.props.leagueId);

        return (
            <div>
                <NavBar
                    leagueId={this.props.leagueId}
                    numAdds={this.props.activeTeam.statistics.adds}
                />
                <div className="container pageBlock" id="auctionBoard">
                    <CommissionerTools
                        isCommissioner={this.props.activeTeam.commissioner}
                        isPaused={this.props.league.paused}
                        updateDraftStatus={updateDraftStatus}
                    />
                    <div className="row equal">
                        <div className="col-md-6">
                            <AuctionBoard
                                activeTeam={this.props.activeTeam.id}
                                auctionPlayers={this.props.auctionPlayers}
                                bidFunction={this.props.actions.putBid}
                                leagueId={this.props.leagueId}
                                isPaused={this.props.league.paused}
                                removeFunction={this.props.actions.removeBid}
                            />
                        </div>
                        <div className="col-md-6">
                            <TeamSummary
                                activeTeam={this.props.activeTeam.id}
                                leagueId={this.props.leagueId}
                                pollInterval="2000"
                            />
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
        activeTeam: state.root.activeTeam.activeTeam,
        league: state.root.league.league
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, Actions, TeamActions, LeagueActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);

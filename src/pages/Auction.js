import React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

import AuctionBoard from '../components/auction/AuctionBoard';
import * as Actions from '../actions/Auction';

class Auction extends React.Component {

    loadBoard() {

        this.props.actions.getAuctionBoard(this.props.leagueId);
    };

    componentDidMount() {
        this.loadBoard();
        setInterval(this.loadBoard.bind(this), 500);
    };

    render() {

        return (
            <AuctionBoard
                auctionPlayers={this.props.auctionPlayers}
                bidFunction={this.props.actions.putBid}
                removeFunction={this.props.actions.removeBid}
            />
        );
    };
}

function mapStateToProps(state, ownProps) {

    return {
        auctionPlayers: state.auctionPlayers,
        leagueId: ownProps.match.params.leagueId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);


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

    componentDidMount() {
        this.props.actions.getAuctionBoard();
        setInterval(this.props.actions.getAuctionBoard, 500);
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

function mapStateToProps(state) {
  return {
      auctionPlayers: state.auctionPlayers
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
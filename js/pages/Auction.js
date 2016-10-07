
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
        setInterval(this.props.actions.getAuctionBoard, this.props.pollInterval);
    };

    render() {

        return (
            <AuctionBoard auctionPlayers={this.props.auctionPlayers} />
        );
    };
};

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

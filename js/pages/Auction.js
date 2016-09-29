
import React from 'react';

import AuctionBoard from '../components/auction/AuctionBoard';

var EXPIRED = 'EXPIRED';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auctionPlayers: []
        };

        this.mergePlayers = this.mergePlayers.bind(this);
        this.loadAuctionBoard = this.loadAuctionBoard.bind(this);
    };

    componentDidMount() {
        this.loadAuctionBoard();
        setInterval(this.loadAuctionBoard, this.props.pollInterval);
    };

    getMatchingBid(existing, bids) {
        var playerId = existing.player.id;
        var existingBid = existing.amount;

        for (var i = 0; i < bids.length; i++) {
            if (bids[i].player.id === playerId) {
                if (bids[i].amount !== existingBid) {
                    bids[i].isNew = true;
                } else {
                    bids[i].isNew = false;
                }
                return bids[i];
            }
        }

        return null;
    };

    mergePlayers(existing, updated) {

        var mergedBids = [];

        for (var i = 0; i < existing.length; i++) {
            var updatedBid = this.getMatchingBid(existing[i], updated);

            if (updatedBid === null) {
                existing[i].secondsRemaining = EXPIRED;
                existing[i].removeFunction = this.removePlayer.bind(this, existing[i].player.id);
                mergedBids.push(existing[i]);
            } else {
                mergedBids.push(updatedBid);
            }
        }

        for (var i = 0; i < updated.length; i++) {
            var existingBid = this.getMatchingBid(updated[i], existing);

            if (existingBid === null) {
                updated[i].isNew = true;
                mergedBids.push(updated[i]);
            }
        }

        return mergedBids;
    };

    filterOutPlayer(playerId, bid) {
        return playerId !== bid.player.id;
    };

    removePlayer(id) {

        var filterId = this.filterOutPlayer.bind(this, id);
        var updatedState = this.state.auctionPlayers.filter(filterId);

        this.setState({auctionPlayers: updatedState});
    };

    loadAuctionBoard() {

        var leagueId = $("meta[name='_league_id'").attr('content');

        $.ajax('/api/league/' + leagueId + '/bid').done((response) => {

            var merged = this.mergePlayers(this.state.auctionPlayers, response);

            this.setState({auctionPlayers: merged});
        });
    };

    render() {
        return (
            <AuctionBoard auctionPlayers={this.state.auctionPlayers} />
        );
    };
};

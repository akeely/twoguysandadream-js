
import React from 'react';

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

class AuctionBoard extends React.Component {
    render() {
        var bids = this.props.auctionPlayers.map((bid) =>
            <Bid bid={bid} key={'bid.' + bid.player.id} />
        );

        return (
            <table className="table table-striped table-condensed">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Current Bid</th>
                    <th>Bidder</th>
                    <th>Time Remaining</th>
                    <th>Bid</th>
                </tr>
                </thead>
                <tbody>
                {bids}
                </tbody>
            </table>
        );
    };
};

class BidEntry extends React.Component {

    minBid() {
        if (this.props.bid.amount < 10) {
            return this.props.bid.amount + 0.5;
        }

        return this.props.bid.amount + 1;
    };

    stepAmount() {

        if (this.props.bid.amount < 10) {
            return 0.5;
        }

        return 1;
    };

    bidId() {
        return this.props.bid.player.id + '.bid.amount';
    };

    bid() {

        var token = $("meta[name='_csrf']").attr('content');
        var header = $("meta[name='_csrf_header']").attr('content');

        $.ajax({
            'url': '/api/league/1/bid/' + this.props.bid.player.id,
            'data': JSON.stringify({ amount: document.getElementById(this.bidId()).value }),
            'type': 'PUT',
            'processData': false,
            'contentType': 'application/json',
            'headers': {
                [header]: token
            }
        });
    };

    render() {

        return (
            <div className="input-group input-group-sm">
                <input aria-label="Bid" className="form-control" id={this.bidId()} min={this.minBid()} step={this.stepAmount()} type="number" />
                <div className="input-group-btn">
                    <button aria-label="Bid" className="btn btn-default" onClick={this.bid} type="button">Bid</button>
                </div>
            </div>
        );
    };
};

class RemoveBid extends React.Component {
    render() {
        return (
            <a href="#" onClick={this.props.bid.removeFunction}>
                <i className="fa fa-times-circle fa-lg" />
            </a>
        );
    };
};

class BidColumn extends React.Component {
    render() {

        if (this.props.bid.secondsRemaining === EXPIRED) {
            return (<RemoveBid bid={this.props.bid} />);
        } else {
            return (<BidEntry bid={this.props.bid} />);
        }
    }
}

class Bid extends React.Component {

    toTimeString(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - (minutes * 60);

        if (seconds < 10) {seconds = '0'+seconds;}
        return minutes + ':' + seconds;
    }

    render() {

        var timeString = this.props.bid.secondsRemaining;

        if (timeString !== EXPIRED) {
            var timeString = this.toTimeString(this.props.bid.secondsRemaining);
        }

        var activeTeam = $("meta[name='_team_id'").attr('content');
        var teamId = this.props.bid.teamId;
        var secondsRemaining = this.props.bid.secondsRemaining;
        var isNew = this.props.bid.isNew;

        var highlightClass = '';

        if (secondsRemaining === EXPIRED) {
            highlightClass = 'danger';
        } else if (isNew === true) {
            highlightClass = 'warning';
        } else if (teamId === activeTeam) {
            highlightClass = 'success';
        }

        return (
            <tr className={highlightClass} id={'bid.' + this.props.bid.player.id}>
                <td>{this.props.bid.player.name}</td>
                <td>{this.props.bid.player.positions
                        .map(function(pos) { return pos.name; })
                        .join(', ')}
                </td>
                <td>{this.props.bid.amount}</td>
                <td>{this.props.bid.team}</td>
                <td className={this.props.bid.secondsRemaining < 21 ? 'warning' : ''}>{timeString}</td>
                <td className="text-center" width="110">
                    <BidColumn bid={this.props.bid} />
                </td>
            </tr>
        );
    }
}



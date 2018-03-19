import React from 'react';

export default class BidEntry extends React.Component {

    constructor(props) {
        super(props);
        this.bid = this.bid.bind(this);
    }

    minBid(currentBid) {
        if (currentBid < 10) {
            return currentBid + 0.5;
        }

        return currentBid + 1;
    };

    stepAmount(currentBid) {

        if (currentBid < 10) {
            return 0.5;
        }

        return 1;
    };

    bidId(playerId) {
        return `${playerId}.bid.amount`;
    };

    bid() {

        const playerId = this.props.bid.player.id;
        const amount = document.getElementById(this.bidId(playerId)).value;

        this.props.bidFunction(this.props.leagueId, playerId, amount);
    };

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.bid();
      }
    };

    render() {

        const currentBid = this.props.bid.amount;
        const playerId = this.props.bid.player.id;

        return (
            <div className="input-group">
                <input
                    aria-label="Bid"
                    className="form-control input-sm"
                    id={this.bidId(playerId)}
                    min={this.minBid(currentBid)}
                    step={this.stepAmount(currentBid)}
                    type="number"
                    onKeyPress={this.handleKeyPress}
                />
                <div className="input-group-btn">
                    <button aria-label="Bid" className="btn btn-success btn-sm" onClick={this.bid} type="button">Bid</button>
                </div>
            </div>
        );
    };
};

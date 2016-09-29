import React from 'react';

export default class BidEntry extends React.Component {

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

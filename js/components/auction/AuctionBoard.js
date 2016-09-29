import React from 'react';

import AuctionPlayer from './board/AuctionPlayer';

export default class AuctionBoard extends React.Component {
    render() {
        var bids = this.props.auctionPlayers.map((bid) =>
            <AuctionPlayer bid={bid} key={'bid.' + bid.player.id} />
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

import React, {
    Component,
    PropTypes
} from 'react';

import AuctionPlayer from './board/AuctionPlayer';

export default class AuctionBoard extends Component {

    static propTypes = {
        auctionPlayers: PropTypes.object
    };

    render() {

        const {
            auctionPlayers
        } = this.props;

        const bids = auctionPlayers.auctionPlayers.map((bid) =>
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

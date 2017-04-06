import React, {
    Component,
    PropTypes
} from 'react';

import AuctionPlayer from './board/AuctionPlayer';

export default class AuctionBoard extends Component {

    static propTypes = {
        auctionPlayers: PropTypes.object,
        bidFunction: PropTypes.func
    };

    render() {

        const {
            auctionPlayers,
            bidFunction,
            removeFunction
        } = this.props;

        const bids = auctionPlayers.map((bid) =>
            <AuctionPlayer
                bid={bid}
                bidFunction={bidFunction}
                key={'bid.' + bid.player.id}
                leagueId={this.props.leagueId}
                removeFunction={removeFunction.bind(undefined, bid.player.id)}
            />
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

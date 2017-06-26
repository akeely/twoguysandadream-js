import React, {
    Component,
    PropTypes
} from 'react';

import AuctionPlayer from './board/AuctionPlayer';

export default class AuctionBoard extends Component {

    static propTypes = {
        activeTeam: PropTypes.number,
        auctionPlayers: PropTypes.array,
        bidFunction: PropTypes.func
    };

    render() {

        const {
            activeTeam,
            auctionPlayers,
            bidFunction,
            isPaused,
            removeFunction
        } = this.props;

        const bids = auctionPlayers.map((bid) =>
            <AuctionPlayer
                activeTeam={activeTeam}
                bid={bid}
                bidFunction={bidFunction}
                isPaused={isPaused}
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

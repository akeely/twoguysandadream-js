import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
            <table className="table table-striped table-condensed small">
                <thead>
                    <tr>
                        <th colspan="4" className="success">Auction</th>
                    </tr>
                    <tr>
                        <th width="35%">Player</th>
                        <th width="33%">Current Bid</th>
                        <th width="12%" className="text-center">Time</th>
                        <th width="12%" className="text-center">Bid</th>
                    </tr>
                </thead>
                <tbody>
                    {bids}
                </tbody>
            </table>
        );
    };
};


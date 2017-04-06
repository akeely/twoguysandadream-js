import React from 'react';
import * as moment from 'moment';
import 'moment-duration-format';

import BidColumn from './BidColumn';

import {State} from '../../../reducers/auction/Auction';

export default class AuctionPlayer extends React.Component {

    toTimeString(time, state) {

        if (state === State.EXPIRED) {
            return 'EXPIRED';
        }

        return moment.duration(time, 'seconds').format('m:ss', {trim: false});
    }

    render() {

        const secondsRemaining = this.props.bid.secondsRemaining;
        const state = this.props.bid.state;
        const timeString = this.toTimeString(secondsRemaining, state);
        const activeTeam = "foo"; // TODO +$("meta[name='_team_id']").attr('content');
        const teamId = this.props.bid.teamId;

        let highlightClass = '';

        if (state === State.EXPIRED) {
            highlightClass = 'danger';
        } else if (state === State.NEW || state === State.UPDATED) {
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
                <td className={secondsRemaining < 21 ? 'warning' : ''}>{timeString}</td>
                <td className="text-center" width="110">
                    <BidColumn
                        bid={this.props.bid}
                        bidFunction={this.props.bidFunction}
                        leagueId={this.props.leagueId}
                        removeFunction={this.props.removeFunction}
                    />
                </td>
            </tr>
        );
    }
}

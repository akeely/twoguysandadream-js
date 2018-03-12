import React from 'react';
import * as moment from 'moment';
import 'moment-duration-format';

import BidColumn from './BidColumn';

import {State} from '../../../reducers/auction/Auction';

export default class AuctionPlayer extends React.Component {

    toTimeString(time, state, isPaused) {

        if (isPaused) {
            return "PAUSED";
        }

        if (state === State.EXPIRED) {
            return 'EXPIRED';
        }

        return moment.duration(time, 'seconds').format('m:ss', {trim: false});
    }

    render() {

        const secondsRemaining = this.props.bid.secondsRemaining;
        const state = this.props.bid.state;
        const timeString = this.toTimeString(secondsRemaining, state, this.props.isPaused);
        const activeTeam = this.props.activeTeam;
        const teamId = this.props.bid.teamId;

        let highlightClass = '';

        if (state === State.EXPIRED && !this.props.isPaused) {
            highlightClass = 'danger';
        } else if (state === State.NEW || state === State.UPDATED) {
            highlightClass = 'warning';
        } else if (teamId === activeTeam) {
            highlightClass = 'success';
        }

        return (
            <tr className={highlightClass} id={'bid.' + this.props.bid.player.id}>
                <td>
                    <p className="form-control-static">
                        {this.props.bid.player.name}&#160;
                        <span className="text-muted small">
                            - {this.props.bid.player.positions
                            .map(function(pos) { return pos.name; })
                            .join(', ')}
                        </span>
                    </p>
                </td>
                <td>
                    <p className="form-control-static">
                        <strong>${this.props.bid.amount}</strong> 
                        &#160;<span className="text-muted small">by</span> {this.props.bid.team}
                    </p>
                </td>
                <td className={secondsRemaining < 21 ? 'warning text-center' : 'text-center'}>
                    <p className="form-control-static">{timeString}</p>
                </td>
                <td>
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

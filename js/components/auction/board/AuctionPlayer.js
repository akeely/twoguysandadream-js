import React from 'react';

import BidColumn from './BidColumn';

var EXPIRED = 'EXPIRED';

export default class AuctionPlayer extends React.Component {

    toTimeString(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - (minutes * 60);

        if (seconds < 10) {seconds = '0'+seconds;}
        return minutes + ':' + seconds;
    }

    render() {

        let timeString = this.props.bid.secondsRemaining;

        if (timeString !== EXPIRED) {
            timeString = this.toTimeString(this.props.bid.secondsRemaining);
        }

        const activeTeam = $("meta[name='_team_id']").attr('content');
        const teamId = this.props.bid.teamId;
        const secondsRemaining = this.props.bid.secondsRemaining;
        const isNew = this.props.bid.isNew;

        let highlightClass = '';

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
                    <BidColumn
                        bid={this.props.bid}
                        bidFunction={this.props.bidFunction}
                    />
                </td>
            </tr>
        );
    }
}

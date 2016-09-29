import React from 'react';

import BidEntry  from './BidEntry';
import RemoveBid from './RemoveBid';

var EXPIRED = 'EXPIRED';

export default class BidColumn extends React.Component {
    render() {

        if (this.props.bid.secondsRemaining === EXPIRED) {
            return (<RemoveBid bid={this.props.bid} />);
        } else {
            return (<BidEntry bid={this.props.bid} />);
        }
    }
}

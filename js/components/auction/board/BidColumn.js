import React from 'react';

import BidEntry  from './BidEntry';
import RemoveBid from './RemoveBid';

import {State} from '../../../reducers/auction/Auction';

export default class BidColumn extends React.Component {
    render() {

        if (this.props.bid.state === State.EXPIRED) {
            return (<RemoveBid bid={this.props.bid} />);
        } else {
            return (
                <BidEntry
                    bid={this.props.bid}
                    bidFunction={this.props.bidFunction}
                />
            );
        }
    }
}

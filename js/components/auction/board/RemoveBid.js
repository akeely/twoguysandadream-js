import React from 'react';

export default class RemoveBid extends React.Component {
    render() {
        return (
            <a href="#" onClick={this.props.bid.removeFunction}>
                <i className="fa fa-times-circle fa-lg" />
            </a>
        );
    };
};

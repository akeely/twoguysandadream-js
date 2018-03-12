import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {

    render() {

        const leagueId = this.props.leagueId;

        const adds = this.props.numAdds;
        let Badge = () => (<span></span>);
        if (adds > 0) {
            Badge = () => (<span className="badge">{adds}</span>);
        }
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a className="navbar-brand" href="#">Two Guys and a Dream</a>
                    </div>
                    <div id="navbar" className="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><NavLink activeClassName="active" to={`/league/${leagueId}/auction`}>Auction</NavLink></li>
                            <li><NavLink activeClassName="active" to={`/league/${leagueId}/availableplayers`}>Add Player <Badge/></NavLink></li>
                            <li><NavLink activeClassName="active" to={`/league/${leagueId}/results`}>Draft Results</NavLink></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{padding: 11 + 'px'}}><i className="fa fa-cog fa-2x" /></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink activeClassName="active" to="/logout">Logout</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };
}
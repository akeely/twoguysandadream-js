import React, { Component } from 'react';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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

            <Navbar collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">Two Guys and a Dream</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href='#'>
                        <NavLink to={`/league/${leagueId}/auction`}>
                            Auction
                        </NavLink>
                    </NavItem>
                    <NavItem eventKey={2} href='#'>
                        <NavLink to={`/league/${leagueId}/availableplayers`}>
                            Add Player <Badge/>
                        </NavLink>
                    </NavItem>
                    <NavItem eventKey={3} href='#'>
                        <NavLink to={`/league/${leagueId}/results`}>
                            Draft Results
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown 
                      eventKey='1' 
                      title={
                        <span><i className="fa fa-cog fa-2x" /></span>
                      }
                    >
                        <MenuItem eventKey='1.1' activeClassName="active" to="/logout">Logout</MenuItem>
                    </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

        );
    };
}
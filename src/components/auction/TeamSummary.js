
import React from 'react';

import axios from 'axios';

import Rosters from './teams/Rosters';
import Teams from './teams/Teams';

let intervalId = null;

export default class TeamSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {teams: [], currentTeam: this.props.activeTeam, leagueId: this.props.leagueId};

        this.loadTeams = this.loadTeams.bind(this);
        this.updateCurrentTeam = this.updateCurrentTeam.bind(this);
    }

    componentDidMount() {
        this.loadTeams();
        intervalId = setInterval(this.loadTeams, this.props.pollInterval);
    }

    componentWillUnmount() {

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    compareTeams(a, b) {
        return a.name.localeCompare(b.name);
    }

    loadTeams() {

        const leagueId = this.state.leagueId;

        axios.get(`${process.env.REACT_APP_SERVER}:8080/api/league/${leagueId}/team/`)
            .then((response)  => this.setState({teams: response.data.sort(this.compareTeams)}));

    }

    updateCurrentTeam(newTeam) {

        this.setState({currentTeam: newTeam});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-7">
                    <Teams
                        currentTeam={this.state.currentTeam}
                        teams={this.state.teams}
                        updateTeam={this.updateCurrentTeam}
                    />
                </div>
                <div className="col-md-5">
                    <Rosters
                        currentTeam={this.state.currentTeam}
                        teams={this.state.teams}
                    />
                </div>
            </div>
        );
    }
}



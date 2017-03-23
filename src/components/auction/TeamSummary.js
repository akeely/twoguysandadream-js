
import React from 'react';

import axios from 'axios';

import Rosters from './teams/Rosters';
import Teams from './teams/Teams';

let intervalId = null;

export default class TeamSummary extends React.Component {

    constructor(props) {
        super(props);

        // TODO
        //var activeTeam = $("meta[name='_team_id'").attr('content');

        this.state = {teams: [], currentTeam: 314};

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

        // TODO
        const leagueId = 27;

        axios.get(`http://localhost:8080/api/league/${leagueId}/team`)
            .then((response)  => this.setState({teams: response.data.sort(this.compareTeams)}));

    }

    updateCurrentTeam(newTeam) {

        this.setState({currentTeam: newTeam});
    }

    render() {
        return (
            <div>
                <Teams
                    currentTeam={this.state.currentTeam}
                    teams={this.state.teams}
                    updateTeam={this.updateCurrentTeam}
                />
                <Rosters
                    currentTeam={this.state.currentTeam}
                    teams={this.state.teams}
                />
            </div>
        );
    }
}



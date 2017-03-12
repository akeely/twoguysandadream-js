
import React from 'react';

import Rosters from './teams/Rosters';
import Teams from './teams/Teams';

export default class TeamSidebar extends React.Component {

    constructor(props) {
        super(props);

        var activeTeam = $("meta[name='_team_id'").attr('content');

        this.state = {teams: [], currentTeam: activeTeam};

        this.loadTeams = this.loadTeams.bind(this);
        this.updateCurrentTeam = this.updateCurrentTeam.bind(this);
    }

    componentDidMount() {
        this.loadTeams();
        setInterval(this.loadTeams, this.props.pollInterval);
    }

    compareTeams(a, b) {
        return a.name.localeCompare(b.name);
    }

    loadTeams() {

        var leagueId = $("meta[name='_league_id'").attr('content');

        $.ajax('/api/league/' + leagueId + '/team').done((response) => {

            this.setState({teams: response.sort(this.compareTeams)});
        });
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



import React from "react";
import TeamCard from "./TeamCard.js";
import { getTeams, getEmployees, getProjects } from "../teams.js";

class TeamsCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errored: false,
      teams: [],
      employees: [],
      projects: []
    };
  }
  componentDidMount() {
    // We're about to start loading our data, set this in our state.
    this.setState({ loading: true });

    // Use our  function to talk to the REST API.
    getTeams()
      .then(teams => this.setState({ teams: teams }))
      .catch(err => {
        console.error("Unable to load teams data", err.message);
        this.setState({ errored: true });
      });

    getEmployees()
      .then(employees => this.setState({ employees: employees }))
      .catch(err => {
        console.error("Unable to load employees data", err.message);
        this.setState({ errored: true });
      });

    getProjects()
      .then(projects => this.setState({ projects: projects }))
      .catch(err => {
        console.error("Unable to load projects data", err.message);
        this.setState({ errored: true });
      });
    this.setState({ loading: false });
  }

  render() {
    // Are we in an error state? If so show an error message.
    if (this.state.errored) {
      return (
        <div>
          <p>Error: unable to load teams data</p>
        </div>
      );
    }

    // If we aren't in error state, are we in a loading state?
    if (this.state.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return this.state.teams
      .sort((a, b) => a.TeamNameNumber - b.TeamNameNumber)
      .map(team => (
        <TeamCard
          key={team._id}
          team={team}
          teams={this.state.teams}
          employees={this.state.employees}
          projects={this.state.projects}
        />
      ));
  }
}

export default TeamsCards;

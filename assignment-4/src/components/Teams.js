import React, { Component } from "react";
import MainContainer from "./MainContainer";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    fetch("https://sleepy-inlet-82147.herokuapp.com/teams")
      .then(response => response.json())
      .then(teams => {
        this.setState({ teams: teams });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <MainContainer sidebar="Teams">
         <h1 className="page-header">Teams</h1>
        <table className="table table-striped tablebordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Projects</th>
              <th scope="col">Employees</th>
              <th scope="col">Team Lead</th>
            </tr>
          </thead>
          <tbody>
            {this.state.teams.map(team => {
              return (
                <tr key={team._id}>
                  <td>{team.TeamName}</td>
                  <td>
                    <ul>
                      {team.Projects.map(proj => {
                        return <li>{proj.ProjectName}</li>;
                      })}
                    </ul>
                  </td>
                  <td>{team.Employees.length} employees</td>
                  <td>{team.TeamLead.FirstName + team.TeamLead.LastName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainContainer>
    );
  }
}

export default Teams;

import React from "react";
import { Form, Card, Button, Col } from "react-bootstrap";
import Select from "react-select";
class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.team,
      leadValue: this.props.team.TeamLead._id,
      teamMembers: this.props.team.Employees
        ? this.props.team.Employees.map(emp => emp._id)
        : null,
      teamProjects: this.props.team.Projects
        ? this.props.team.Projects.map(proj => proj._id)
        : null
    };
    this.handleTeamLeadChange = this.handleTeamLeadChange.bind(this);
    this.handleTeamMembersChange = this.handleTeamMembersChange.bind(this);
    this.handleTeamProjectsChange = this.handleTeamProjectsChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleTeamLeadChange(selected) {
    this.setState({ leadValue: selected });
  }

  handleTeamMembersChange(selected) {
    this.setState({ teamMembers: selected });
  }

  handleTeamProjectsChange(selected) {
    this.setState({ teamProjects: selected });
  }

  handleSave(event) {
    event.preventDefault();
    var url =
      "https://sleepy-inlet-82147.herokuapp.com/team/" + this.props.team._id;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        TeamLead: this.state.leadValue.value,
        Projects: this.state.teamProjects
          ? this.state.teamProjects.map(teamProject => teamProject.value)
          : null,
        Employees: this.state.teamMembers
          ? this.state.teamMembers.map(teamMember => teamMember.value)
          : null
      }),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(function(data) {
        alert(data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    function getOption(employees) {
      return employees.map(emp => {
        var obj = {
          value: "",
          label: ""
        };
        obj.value = emp._id;
        obj.label = emp.FirstName + " " + emp.LastName;
        return obj;
      });
    }

    function getProjectOption(projects) {
      return projects.map(proj => {
        var obj = {
          value: "",
          label: ""
        };
        obj.value = proj._id;
        obj.label = proj.ProjectName;
        return obj;
      });
    }
    function getTeamLeadOptions(teams) {
      let teamLeads = teams.map(team => team.TeamLead);
      return getOption(teamLeads);
    }
    function getTeamLeadOption(team) {
      var obj = {
        value: "",
        label: ""
      };
      obj.value = team.TeamLead._id;
      obj.label = team.TeamLead.FirstName + " " + team.TeamLead.LastName;
      return obj;
    }

    return (
      <Col xs={12} sm={6} md={4}>
        <div class="p-3">
          <Form onSubmit={this.handleSave}>
            <Card className="text-left" border="primary">
              <Card.Header>
                <nav className="d-flex justify-content-between">
                  <h3>{this.props.team.TeamName}</h3>
                  <Button as="input" type="submit" value="Save" />
                </nav>
              </Card.Header>
              <Card.Body>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="lead">Team Lead</Form.Label>

                  <Select
                    onChange={this.handleTeamLeadChange}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={getTeamLeadOption(this.props.team)}
                    name="leader"
                    options={getTeamLeadOptions(this.props.teams)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="lead">Team Members</Form.Label>

                  <Select
                    onChange={this.handleTeamMembersChange}
                    defaultValue={getOption(this.props.team.Employees)}
                    isMulti
                    name="teamMembers"
                    options={getOption(this.props.employees)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="lead">Projects</Form.Label>

                  <Select
                    onChange={this.handleTeamProjectsChange}
                    defaultValue={getProjectOption(this.props.team.Projects)}
                    isMulti
                    name="projects"
                    options={getProjectOption(this.props.projects)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Form>
        </div>
      </Col>
    );
  }
}

export default TeamCard;

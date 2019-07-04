import React from "react";
import {Link} from "react-router-dom";

import moment from "moment";
// import {Card, Table } from "react-bootstrap";

class ProjectsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []

    };
  }

  componentDidMount() {
    const projectsUrl = "https://sleepy-inlet-82147.herokuapp.com/projects";
    fetch(projectsUrl)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(projects => {
        this.setState({ projects: projects });
      })
      .catch(error=>console.log(error));
  }

  render() {
      return (
        <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Projects</h3>
        </div>
        <div className="panel-body">
            <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
                <tbody>
                {this.state.projects.map(project=>{
                    
               
                
                    let active= moment().diff(project.ProjectStartDate, 'days');
                    return (
                        <tr>
                            <td>{project.ProjectName}</td>
                            <td>Active {active} days</td>
                        </tr>
                    );
                })}
          
               
                </tbody>
            </table>
            </div>
            <Link to="/projects" className="btn btn-primary form-control">
            View All Project Data
            </Link>
        </div>
        </div>
      )
  }
}

export default ProjectsPanel;

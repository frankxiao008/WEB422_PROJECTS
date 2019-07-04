import React, { Component } from "react";
import moment from "moment";
import MainContainer from "./MainContainer";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }


  componentDidMount() {

        fetch("https://sleepy-inlet-82147.herokuapp.com/projects")
        .then(response=>{
            return response.json();
        })
        .then(projects=>{
  
            this.setState({ projects: projects });
        })
        .catch(error=>console.log(error));
  }

  render() {
    return (
        <MainContainer sidebar="Projects">
         <h1 className="page-header">Projects</h1>

            <table className="table table-striped tablebordered">
                <h>there are {this.state.projects.length}</h>
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                </tr>
                </thead>
                <tbody>
                {this.state.projects.map(project => {

                    let EndDate = project.ProjectEndDate
                    ? moment(project.ProjectEndDate).format("LL")
                    : "n/a";

                    return (

                        <tr>
                          
                            <td>{project.ProjectName}</td>
                            <td>{project.ProjectDescription}</td>
                            <td>{moment(project.ProjectStartDate).format("LL")}</td>
                            <td>{EndDate}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </MainContainer>
    );
  }
}

export default Projects;

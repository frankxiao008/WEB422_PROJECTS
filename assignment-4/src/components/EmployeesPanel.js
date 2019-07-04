import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeesPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    fetch("https://sleepy-inlet-82147.herokuapp.com/employees")
      .then(response => response.json())
      .then(data => {
        this.setState({ employees: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                {this.state.employees.map(emp => {
                  return (
                    <tr>
                      <td>{emp.FirstName + emp.LastName}</td>
                      <td>{emp.Position.PositionName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/employees" className="btn btn-primary form-control">
            View All Employee Data
          </Link>
        </div>
      </div>
    );
  }
}

export default EmployeesPanel;

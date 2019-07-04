import React, { Component } from "react";
import moment from 'moment';
import MainContainer from './MainContainer';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }


  componentDidMount() {
    fetch("https://sleepy-inlet-82147.herokuapp.com/employees")
      .then(res => res.json())
      .then(employees => this.setState({ employees: employees }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <MainContainer sidebar="Employees">
           <h1 className="page-header">Employees</h1> 
        <table className="table table-striped tablebordered">
          <thead>
            <tr>
              <th scope="col">Name & Position</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Num</th>
              <th scope="col">Hire Date</th>
              <th scope="col">Salary Bonus</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => {
              return (
                <tr key={employee._id}>
                  <td>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                  <td>
                  {employee.AddressStreet}, {employee.AddressCity} {employee.AddressState}, {employee.AddressZip}                  
                  </td>
                  <td>{employee.PhoneNum}</td>
                  <td>{moment(employee.HireDate).utc().format('LL')}</td>
                  <td>$ {employee.SalaryBonus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainContainer>
    );
  }
}

export default Employees;

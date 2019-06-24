// Import jQuery, which will also expose $ on the global `window` Object.
import $ from './jquery-es';
// After jQuery is loaded, we can load the Bootstrap JS, which depends on jQuery.
import 'bootstrap';
//import  { initializeEmployeesModel } from './employeesArray';

// Place your imports for Moment.js and Lodash here...
import moment from 'moment';
import _ from 'lodash';
// The rest of your code can go here.  You're also welcome to split
// your code up into multiple files using ES modules and import/export.
$(function() {
  let employeesModel = [];
  function initializeEmployeesModel() {
    $.ajax({
      url: 'https://sleepy-inlet-82147.herokuapp.com/employees',
      type: 'GET',
      contentType: 'application/json'
    })
      .done(function(data) {
        employeesModel = data;
        refreshEmployeeRows(employeesModel);
      })
      .fail(function(err) {
        console.log('error: ' + err.statusText);
        showGenericModal('Error', 'Unable to get Employees' + err);
      });
  }

  function showGenericModal(title, message) {
    $('#genericModal .modal-title')
      .empty()
      .append(title);
    $('#genericModal .modal-body')
      .empty()
      .append(message);
    $('#genericModal').modal('show');
  }

  function refreshEmployeeRows(employees) {
    let rowTemplate = _.template(
      '<% _.forEach(employees, function(employee){ %>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
        ' <div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
        ' <div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
        '</div>' +
        '<% }); %>'
    );

    let rows = rowTemplate({ employees: employees });
    $('#employees-table').empty();
    $('#employees-table').append(rows);
  }

  function getFilteredEmployeesModel(filterString) {
    filterString = filterString.toUpperCase();
    let filtered = _.filter(employeesModel, function(employee) {
      return (
        employee.FirstName.toUpperCase() == filterString ||
        employee.LastName.toUpperCase() == filterString ||
        employee.Position.PositionName.toUpperCase() == filterString
      );
    });
    return filtered;
  }

  function getEmployeeModelById(id) {
    let found = _.find(employeesModel, function(e) {
      return e._id == id;
    });
    if (found == null) {
      return null;
    } else {
      let foundcopy = _.cloneDeep(found);
      return foundcopy;
    }
  }

  initializeEmployeesModel();

  $('#employee-search').on('keyup', function() {
    if (this.value === '') {
      initializeEmployeesModel();
    } else {
      let filteredEmployee = getFilteredEmployeesModel(this.value);
      refreshEmployeeRows(filteredEmployee);
    }
  });

  $(document.body).on('click', '.body-row', function() {
    let employee = getEmployeeModelById($(this).attr('data-id'));
    let copyEmp = _.cloneDeep(employee);

    copyEmp.HireDate = moment(copyEmp.HireDate).format('LL');

    let template = _.template(
      '<strong>Address:</strong><%- employee.AddressStreet %> <%- employee.AddressState  %><%- employee.AddressCity %><%- employee.AddressZip %><br>' +
        '<strong>Phone Number:</strong><%- employee.PhoneNum %>-<%- employee.Extension %> <br>' +
        '<strong>Hire Date:</strong><%- employee.HireDate %>'
    );
    let result = template({ employee: copyEmp });
    showGenericModal(copyEmp.FirstName + ' ' + copyEmp.LastName, result);
  });
});

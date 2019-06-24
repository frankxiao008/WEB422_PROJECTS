import { encode } from "he";
export function getTeams() {
  const teamsUrl = "https://sleepy-inlet-82147.herokuapp.com/teams";
  return fetch(teamsUrl)
    .then(response => {
      // If we don't get a 200 OK response, throw an error to the .catch()
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Parse the response body from JSON to JS (an Array)
      return response.json();
    })
    .then(teams => {
      teams.forEach(team => {
        team.TeamNameNumber = team.TeamName.replace(/[^\d.-]/g, "");
        team.TeamNameNumber = parseInt(team.TeamNameNumber);
        team.Employees.forEach(emp => {
          emp.FullName = emp.FisrtName + emp.LastName;
        });
      });
      return teams;
    });
}

export function getEmployees() {
  const Url = "https://sleepy-inlet-82147.herokuapp.com/employees";
  return fetch(Url)
    .then(response => {
      // If we don't get a 200 OK response, throw an error to the .catch()
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Parse the response body from JSON to JS (an Array)
      return response.json();
    })
    .then(datas => {
      datas.forEach(data => {
        data.fullName = encode(data.FisrtName + " " + data.LastName);
      });
      return datas;
    });
}

export function getProjects() {
  const Url = "https://sleepy-inlet-82147.herokuapp.com/projects";
  return fetch(Url)
    .then(response => {
      // If we don't get a 200 OK response, throw an error to the .catch()
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Parse the response body from JSON to JS (an Array)
      return response.json();
    })
    .then(datas => {
      return datas;
    });
}

export default { getTeams, getEmployees, getProjects };

function Model(projectId, accessToken) {
  // common root URL for getting project info from the API
  this.apiRootUrl = 'https://app.asana.com/api/1.0/projects/' + projectId;

  // create standard authorization header for requests to API
  // pass access_token from successful oauth redirect param into header
  function createAuthHeader(accessToken) {
    var header = new Headers();
    header.append('Authorization', 'Bearer ' + accessToken);
    return header;
  }
  this.header = createAuthHeader(accessToken);

  // fetch the project's name from API
  this.fetchProjectName = function() {
    return fetch(this.apiRootUrl, {
      method: 'GET',
      headers: this.header,
    })
    // standard protocol of es6 fetch to convert response object
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var projectName = json.data.name;
      return projectName;
    });
  }

  // fetch the project's list of tasks from API
  this.fetchTasks = function() {
    return fetch(this.apiRootUrl + '/tasks?limit=100', {
        method: 'GET',
        headers: this.header,
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var tasks = json.data;
        return tasks;
      });
  }

}

export default Model;
class Model {
  constructor(projectId, accessToken) {
    this.apiRootUrl = 'https://app.asana.com/api/1.0/projects/' + projectId;
    this.createAuthHeader(accessToken);
  }

  // pass access_token from oauth as a header to the API
  createAuthHeader(accessToken) {
    this.header = new Headers();
    this.header.append('Authorization', 'Bearer ' + accessToken);
    return false;
  }

  // fetch the project's name
  fetchTitle() {
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
      return projectName
    });
  }

  // fetch the project's list of tasks that contain id's and titles for each task
  fetchTasks() {
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
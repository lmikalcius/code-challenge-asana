import getParameterByName from "./modules/query-param";
import Model from "./modules/Model";
import View from "./modules/View";

// If this is an initial entry (user enters URL with query param for the project ID) redirect to begin oauth implicit grant process
// This is the project ID number entered into the URL by the user
var projectParam = getParameterByName("project")
if (projectParam) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=579903436341269&" +
                    "redirect_uri=https://lmikalcius.github.io/code-challenge-asana/" +
                    "&response_type=token&" +
                    "state=" + projectParam;
}

// If this is after an oauth redirect, create variables for access_token and project id (stored in state query param from oauth redirect) to pass to the model
var projectId = getParameterByName("state");
var accessToken = getParameterByName("access_token");

// Instantiate model and view
var model = new Model(projectId, accessToken);
var view = new View();


// Perform get requests for project name and paint it
model.fetchProjectName().then(function(projectName) {
  view.populateHeaderTitle(projectName);
});

// Perform get requests for tasks data and paint those along with adding event listeners
model.fetchTasks().then(function(tasks) {
  view.renderTasks(tasks, projectId);
  view.bindTaskVisibility();
  view.bindCloseIcons();
});









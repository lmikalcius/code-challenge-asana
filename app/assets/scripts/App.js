import Task from "./modules/Task";
import getParameterByName from "./modules/query-param";

console.log(getParameterByName("project"));
// http://localhost:3000/?project=568228076648642

var projectNumber = getParameterByName("project");
if (projectNumber) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=123&" +
                    "redirect_uri=https://myapp.com/oauth&" +
                    "response_type=token&" +
                    "state=projectNumber"
}








var firstTask = new Task("Code a lot", 234189);
console.log(firstTask.task, firstTask.id);

// fetch('http://echo.jsontest.com/title/ipsum/content/blah')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

import Task from "./modules/Task";

var firstTask = new Task("Code a lot", 234189);
console.log(firstTask.task, firstTask.id);

fetch('http://echo.jsontest.com/title/ipsum/content/blah')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });

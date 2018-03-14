import Task from "./modules/Task";

alert("testing ABC!@#");
var firstTask = new Task("Code a lot", 234189);
var secondTask = new Task("Code a little", 123221);
console.log(secondTask.task, secondTask.id);
console.log(firstTask.task, firstTask.id);

fetch('http://httpbin.org/get')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
